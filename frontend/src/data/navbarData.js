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

export const ACCOUNT_LINKS = [
  { label: "Sign In", to: "/login", description: "Access your account" },
  { label: "Create Account", to: "/register", description: "Join Cartify today" },
  { label: "My Orders", to: "#", description: "Track and manage orders" },
  { label: "Wishlist", to: "#", description: "Saved items" },
  { label: "Help Center", to: "/faq", description: "FAQs and support" },
];

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

export const MOCK_CART_ITEMS = [
  { ...DEAL_PRODUCTS[0], quantity: 2 },
  { ...NEW_ARRIVALS_PRODUCTS[1], quantity: 1 },
  { ...DEAL_PRODUCTS[2], quantity: 1 },
];

export const MOCK_WISHLIST_ITEMS = [
  NEW_ARRIVALS_PRODUCTS[0],
  DEAL_PRODUCTS[3],
  NEW_ARRIVALS_PRODUCTS[3],
];
