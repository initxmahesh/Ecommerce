import { DEAL_PRODUCTS } from "./dealsProducts.js";
import { NEW_ARRIVALS_PRODUCTS } from "./newArrivalsProducts.js";

export const LANGUAGES = [
  { code: "en", label: "English" },
  { code: "es", label: "Spanish" },
  { code: "fr", label: "French" },
  { code: "hi", label: "Hindi" },
  { code: "de", label: "German" },
];

export const CURRENCIES = [
  { code: "USD", label: "USD ($)", symbol: "$" },
  { code: "EUR", label: "EUR (€)", symbol: "€" },
  { code: "GBP", label: "GBP (£)", symbol: "£" },
  { code: "INR", label: "INR (₹)", symbol: "₹" },
  { code: "AUD", label: "AUD (A$)", symbol: "A$" },
];

export const ACCOUNTS_LINKS = [
  { label: "Sign In", to: "/login", description: "Access your account" },
  {
    label: "Create Account",
    to: "/register",
    description: "Shop as a buyer or sell as a vendor",
  },
  { label: "Help Center", to: "/faq", description: "FAQs and support" },
];

/** @deprecated Use GUEST_ACCOUNT_LINKS */
export const ACCOUNT_LINKS = ACCOUNTS_LINKS;

export const TRENDING_SEARCHES = [
  "Organic snacks",
  "Summer sale",
  "Gift cards",
  "New arrivals",
  "Best sellers",
];

export const SEARCH_PRODUCTS = [...DEAL_PRODUCTS, ...NEW_ARRIVALS_PRODUCTS].filter(
  (product, index, list) =>
    list.findIndex((item) => item.id === product.id) === index,
);
