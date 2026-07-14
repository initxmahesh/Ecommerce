import { NAV_GROUPS as VENDOR_NAV } from "../data/vendorOwnerData.js";
import { NAV_GROUPS as FINANCE_NAV } from "../data/financeData.js";
import { NAV_GROUPS as SUPPORT_NAV } from "../data/supportAgentData.js";
import { NAV_GROUPS as SUPERADMIN_NAV } from "../data/superadminData.js";

function flattenNav(navGroups, extras = []) {
  const items = [];
  navGroups.forEach((group) => {
    group.items.forEach((item) => {
      items.push({
        id: item.id,
        label: item.label,
        path: item.path,
        icon: item.icon,
        description: `${group.label} · Go to ${item.label}`,
        keywords: [group.label, item.label, item.id],
      });
    });
  });
  return [...items, ...extras];
}

export const VENDOR_SEARCH_GROUPS = [
  {
    id: "pages",
    label: "Pages",
    items: flattenNav(VENDOR_NAV, [
      {
        id: "add-product",
        label: "Add product",
        path: "/vendor/products/new",
        icon: "add",
        description: "Create a new product",
        keywords: ["create", "new product"],
      },
      {
        id: "import-products",
        label: "Import products",
        path: "/vendor/products",
        icon: "upload",
        description: "Bulk import product catalog",
        keywords: ["csv", "excel", "import"],
      },
      {
        id: "import-inventory",
        label: "Import inventory",
        path: "/vendor/inventory",
        icon: "upload",
        description: "Bulk update stock levels",
        keywords: ["stock", "csv", "import"],
      },
    ]),
  },
];

export const FINANCE_SEARCH_GROUPS = [
  {
    id: "pages",
    label: "Pages",
    items: flattenNav(FINANCE_NAV),
  },
];

export const SUPPORT_SEARCH_GROUPS = [
  {
    id: "pages",
    label: "Pages",
    items: flattenNav(SUPPORT_NAV),
  },
];

export const SUPERADMIN_SEARCH_GROUPS = [
  {
    id: "pages",
    label: "Pages",
    items: flattenNav(SUPERADMIN_NAV),
  },
];
