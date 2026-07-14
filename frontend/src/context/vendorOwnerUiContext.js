import { createContext, useContext } from "react";

export const VendorOwnerUiContext = createContext(null);

export function useVendorOwnerUi() {
  const ctx = useContext(VendorOwnerUiContext);
  if (!ctx) {
    throw new Error("useVendorOwnerUi must be used within VendorOwnerLayout");
  }
  return ctx;
}
