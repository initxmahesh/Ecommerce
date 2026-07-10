import {
  apiRequest,
  clearAccessToken,
  refreshSession,
  setAccessToken,
} from "./apiClient.js";

export async function register(payload) {
  return apiRequest("/api/auth/register", {
    method: "POST",
    skipAuth: true,
    body: JSON.stringify(payload),
  });
}

export async function login(payload) {
  const data = await apiRequest("/api/auth/login", {
    method: "POST",
    skipAuth: true,
    body: JSON.stringify(payload),
  });

  setAccessToken(data.accessToken);
  return data;
}

export async function logout() {
  try {
    await apiRequest("/api/auth/logout", { method: "POST" });
  } finally {
    clearAccessToken();
  }
}

export async function getCurrentUser() {
  return apiRequest("/api/auth/me");
}

export async function verifyEmail(token) {
  return apiRequest("/api/auth/verify-email", {
    method: "POST",
    skipAuth: true,
    body: JSON.stringify({ token }),
  });
}

export async function resendVerification(email) {
  return apiRequest("/api/auth/resend-verification", {
    method: "POST",
    skipAuth: true,
    body: JSON.stringify({ email }),
  });
}

export { refreshSession, clearAccessToken, setAccessToken };
