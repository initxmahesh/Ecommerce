import { createContext, useContext } from "react";

export const FinanceUiContext = createContext(null);

export function useFinanceUi() {
  const ctx = useContext(FinanceUiContext);
  if (!ctx) {
    throw new Error("useFinanceUi must be used within FinanceLayout");
  }
  return ctx;
}
