import {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { AuthContext } from "./authContext.js";
import * as authApi from "../services/authApi.js";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const bootstrap = useCallback(async () => {
    try {
      const data = await authApi.refreshSession();
      setUser(data.user);
    } catch {
      authApi.clearAccessToken();
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    let active = true;

    authApi
      .refreshSession()
      .then((data) => {
        if (active) {
          setUser(data.user);
        }
      })
      .catch(() => {
        if (active) {
          authApi.clearAccessToken();
          setUser(null);
        }
      })
      .finally(() => {
        if (active) {
          setIsLoading(false);
        }
      });

    return () => {
      active = false;
    };
  }, []);

  const login = useCallback(async (credentials) => {
    const data = await authApi.login(credentials);
    setUser(data.user);
    return data;
  }, []);

  const register = useCallback(async (payload) => {
    return authApi.register(payload);
  }, []);

  const logout = useCallback(async () => {
    await authApi.logout();
    setUser(null);
  }, []);

  const resendVerification = useCallback(async (email) => {
    return authApi.resendVerification(email);
  }, []);

  const value = useMemo(
    () => ({
      user,
      isLoading,
      isAuthenticated: Boolean(user),
      login,
      register,
      logout,
      resendVerification,
      refreshSession: bootstrap,
    }),
    [user, isLoading, login, register, logout, resendVerification, bootstrap],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
