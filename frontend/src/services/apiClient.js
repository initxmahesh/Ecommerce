const API_BASE = import.meta.env.VITE_API_URL ?? "";

let accessToken = null;
let refreshPromise = null;

export class ApiError extends Error {
  constructor(message, status, code) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.code = code;
  }
}

export function setAccessToken(token) {
  accessToken = token;
}

export function getAccessToken() {
  return accessToken;
}

export function clearAccessToken() {
  accessToken = null;
}

async function parseJsonResponse(response) {
  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new ApiError(
      data.message || "Request failed",
      response.status,
      data.code,
    );
  }

  return data;
}

export async function refreshSession() {
  const response = await fetch(`${API_BASE}/api/auth/refresh`, {
    method: "POST",
    credentials: "include",
  });

  const data = await parseJsonResponse(response);
  setAccessToken(data.accessToken);
  return data;
}

async function withAuthRetry(path, options = {}) {
  const { skipAuth = false, retry = true, ...fetchOptions } = options;
  const headers = new Headers(fetchOptions.headers ?? {});

  if (
    fetchOptions.body &&
    typeof fetchOptions.body === "string" &&
    !headers.has("Content-Type")
  ) {
    headers.set("Content-Type", "application/json");
  }

  if (!skipAuth && accessToken) {
    headers.set("Authorization", `Bearer ${accessToken}`);
  }

  const response = await fetch(`${API_BASE}${path}`, {
    ...fetchOptions,
    headers,
    credentials: "include",
  });

  const shouldRetry =
    response.status === 401 &&
    retry &&
    !skipAuth &&
    path !== "/api/auth/refresh" &&
    path !== "/api/auth/login";

  if (shouldRetry) {
    const errorData = await response.clone().json().catch(() => ({}));

    try {
      if (!refreshPromise) {
        refreshPromise = refreshSession().finally(() => {
          refreshPromise = null;
        });
      }

      await refreshPromise;
      return withAuthRetry(path, { ...options, retry: false });
    } catch {
      clearAccessToken();
      throw new ApiError(
        errorData.message || "Session expired. Please sign in again.",
        401,
        errorData.code || "UNAUTHORIZED",
      );
    }
  }

  return response;
}

export async function apiRequest(path, options = {}) {
  const response = await withAuthRetry(path, options);
  return parseJsonResponse(response);
}

/** Multipart upload (do not set Content-Type — browser sets boundary). */
export async function apiUpload(path, formData, options = {}) {
  const response = await withAuthRetry(path, {
    ...options,
    method: options.method || "POST",
    body: formData,
  });
  return parseJsonResponse(response);
}

/** Binary download with auth + refresh. */
export async function apiDownload(path, options = {}) {
  const response = await withAuthRetry(path, options);
  if (!response.ok) {
    const data = await response.json().catch(() => ({}));
    throw new ApiError(
      data.message || "Download failed",
      response.status,
      data.code,
    );
  }

  const blob = await response.blob();
  const disposition = response.headers.get("Content-Disposition") || "";
  const match = disposition.match(/filename="?([^"]+)"?/i);
  return {
    blob,
    filename: match?.[1] || "download",
  };
}

export function triggerBrowserDownload(blob, filename) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}
