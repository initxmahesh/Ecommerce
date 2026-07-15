import { useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "./useAuth.js";

/**
 * Returns a guard that redirects guests to login, preserving the current URL.
 * Authenticated callers get `true`; guests are navigated away and get `false`.
 */
export function useRequireAuth() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  return useCallback(
    (intent) => {
      if (isAuthenticated) return true;

      navigate("/login", {
        replace: false,
        state: {
          from: `${location.pathname}${location.search}`,
          intent: intent ?? "continue",
        },
      });
      return false;
    },
    [isAuthenticated, navigate, location.pathname, location.search],
  );
}
