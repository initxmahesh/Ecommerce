import { DEAL_PRODUCTS } from "./dealsProducts.js";
import { NEW_ARRIVALS_PRODUCTS } from "./newArrivalsProducts.js";
import pro1 from "../assets/Deals/Pro1.jpg";
import pro2 from "../assets/Deals/Pro2.jpg";
import pro3 from "../assets/Deals/Pro3.jpg";
import pro4 from "../assets/Deals/Pro4.jpg";
import pro5 from "../assets/Deals/Pro5.jpg";

const GALLERY_IMAGES = [pro1, pro2, pro3, pro4, pro5];

const DEFAULT_DESCRIPTION =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";

const DEFAULT_ATTRIBUTES = [
  "Closure : Lace-Ups",
  "Sole : Polyvinyl Chloride",
  "Width : Medium",
  "Outer Material : A-Grade Standard Quality",
];

const DEFAULT_WEIGHTS = ["250g", "500g", "1kg", "2kg"];

const DEFAULT_SPECIFICATIONS = [
  { label: "Brand", value: "Cartify Fresh" },
  { label: "Item Form", value: "Packaged" },
  { label: "Diet Type", value: "Vegetarian" },
  { label: "Package Weight", value: "250g - 2kg" },
  { label: "Shelf Life", value: "12 Months" },
  { label: "Country of Origin", value: "India" },
];

const DEFAULT_VENDOR = {
  name: "Cartify Fresh Foods",
  rating: 4.6,
  products: 128,
  since: "2019",
  description:
    "Cartify Fresh Foods is a trusted vendor offering premium quality snacks, dried fruits, and organic groceries with fast delivery across the region.",
};

const DEFAULT_REVIEWS = [
  {
    id: 1,
    author: "Sarah M.",
    rating: 5,
    date: "March 12, 2026",
    comment:
      "Excellent quality and freshness. Packaging was secure and delivery was on time. Will definitely order again!",
  },
  {
    id: 2,
    author: "James K.",
    rating: 4,
    date: "February 28, 2026",
    comment:
      "Good product overall. Taste is great and value for money. Slightly smaller pack than expected but still worth it.",
  },
  {
    id: 3,
    author: "Priya R.",
    rating: 5,
    date: "February 15, 2026",
    comment:
      "My family loves this! Fresh, crunchy, and perfectly seasoned. Highly recommended for snack lovers.",
  },
];

const ALL_PRODUCTS = [...DEAL_PRODUCTS, ...NEW_ARRIVALS_PRODUCTS];

const ratingCountById = {
  "deal-1": 842,
  "deal-2": 615,
  "deal-3": 992,
  "deal-4": 478,
  "deal-5": 731,
  "deal-6": 389,
  "deal-7": 556,
  "deal-8": 267,
  "deal-9": 904,
  "deal-10": 412,
  "new-1": 842,
  "new-2": 615,
  "new-3": 992,
  "new-4": 478,
  "new-5": 731,
  "new-6": 523,
  "new-7": 198,
  "new-8": 267,
  "new-9": 904,
  "new-10": 345,
  "new-11": 556,
  "new-12": 412,
};

function getDiscountPercent(price, originalPrice) {
  if (!originalPrice || originalPrice <= price) return 0;
  return Math.round(((originalPrice - price) / originalPrice) * 100);
}

function enrichProduct(product) {
  const galleryOffset = ALL_PRODUCTS.findIndex((item) => item.id === product.id);
  const gallery = GALLERY_IMAGES.map(
    (_, index) => GALLERY_IMAGES[(galleryOffset + index) % GALLERY_IMAGES.length],
  );

  return {
    ...product,
    sku: product.sku ?? `WH${String(product.id).replace(/\D/g, "").padStart(2, "0").slice(-2)}`,
    inStock: product.inStock ?? true,
    ratingCount: product.ratingCount ?? ratingCountById[product.id] ?? 500,
    discount: getDiscountPercent(product.price, product.originalPrice),
    description: product.description ?? DEFAULT_DESCRIPTION,
    detailContent:
      product.detailContent ??
      `${DEFAULT_DESCRIPTION} Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`,
    attributes: product.attributes ?? DEFAULT_ATTRIBUTES,
    weights: product.weights ?? DEFAULT_WEIGHTS,
    gallery: product.gallery ?? gallery,
    specifications: product.specifications ?? DEFAULT_SPECIFICATIONS,
    vendor: product.vendor ?? DEFAULT_VENDOR,
    reviews: product.reviews ?? DEFAULT_REVIEWS,
  };
}

export function getAllProducts() {
  return ALL_PRODUCTS.map(enrichProduct);
}

export function getProductById(id) {
  const product = ALL_PRODUCTS.find((item) => item.id === id);
  return product ? enrichProduct(product) : null;
}

export function getRelatedProducts(productId, limit = 3) {
  const current = ALL_PRODUCTS.find((item) => item.id === productId);
  if (!current) return [];

  const sameCategory = ALL_PRODUCTS.filter(
    (item) => item.id !== productId && item.category === current.category,
  );

  const pool = sameCategory.length >= limit
    ? sameCategory
    : [
        ...sameCategory,
        ...ALL_PRODUCTS.filter(
          (item) => item.id !== productId && item.category !== current.category,
        ),
      ];

  return pool.slice(0, limit).map(enrichProduct);
}
