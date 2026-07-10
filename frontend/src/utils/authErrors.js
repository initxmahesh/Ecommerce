import { ApiError } from "../services/apiClient.js";

export function getAuthErrorMessage(error, fallback = "Something went wrong") {
  if (error instanceof ApiError) {
    return error.message;
  }

  if (error instanceof Error) {
    return error.message;
  }

  return fallback;
}
