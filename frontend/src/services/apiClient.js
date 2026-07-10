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

async function parseResponse(response) {
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

  const data = await parseResponse(response);
  setAccessToken(data.accessToken);
  return data;
}

export async function apiRequest(path, options = {}) {
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
      return apiRequest(path, { ...options, retry: false });
    } catch {
      clearAccessToken();
      throw new ApiError(
        errorData.message || "Session expired. Please sign in again.",
        401,
        errorData.code || "UNAUTHORIZED",
      );
    }
  }

  return parseResponse(response);
}
