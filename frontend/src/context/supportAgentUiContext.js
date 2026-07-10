import { createContext, useContext } from "react";

export const SupportAgentUiContext = createContext(null);

export function useSupportAgentUi() {
  const ctx = useContext(SupportAgentUiContext);
  if (!ctx) {
    throw new Error("useSupportAgentUi must be used within SupportAgentLayout");
  }
  return ctx;
}
