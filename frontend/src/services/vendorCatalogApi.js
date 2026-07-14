import { apiRequest } from "./apiClient.js";

export async function fetchVendorProducts(params = {}) {
  const qs = new URLSearchParams();
  Object.entries(params).forEach(([k, v]) => {
    if (v != null && v !== "") qs.set(k, v);
  });
  const data = await apiRequest(`/api/products?${qs.toString()}`);
  return data;
}

export async function fetchVendorInventory(params = {}) {
  const qs = new URLSearchParams();
  Object.entries(params).forEach(([k, v]) => {
    if (v != null && v !== "") qs.set(k, v);
  });
  const data = await apiRequest(`/api/inventory?${qs.toString()}`);
  return data;
}
