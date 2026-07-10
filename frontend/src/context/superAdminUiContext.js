import { createContext, useContext } from "react";

export const SuperAdminUiContext = createContext(null);

export function useSuperAdminUi() {
  const ctx = useContext(SuperAdminUiContext);
  if (!ctx) {
    throw new Error("useSuperAdminUi must be used within SuperAdminLayout");
  }
  return ctx;
}
