import { DEAL_PRODUCTS } from "../data/dealsProducts.js";

const DEALS_API_ROUTE = "/api/deals";

export async function fetchDeals() {
  try {
    const response = await fetch(DEALS_API_ROUTE);

    if (!response.ok) {
      throw new Error("Failed to fetch deals");
    }

    return response.json();
  } catch {
    return DEAL_PRODUCTS;
  }
}
