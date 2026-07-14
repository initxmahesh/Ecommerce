/** Frontend resource configs mirroring backend schemas (for UI only). */
export const PRODUCT_IE_CONFIG = {
  key: "products",
  label: "Products",
  importEnabled: true,
  exportEnabled: true,
  supportedFormats: ["csv", "xlsx", "json"],
  columns: [
    { key: "name", label: "Name", required: true },
    { key: "sku", label: "SKU", required: true },
    { key: "description", label: "Description" },
    { key: "brand", label: "Brand" },
    { key: "category", label: "Category" },
    { key: "price", label: "Price", required: true },
    { key: "compare_at_price", label: "Compare At Price" },
    { key: "cost", label: "Cost" },
    { key: "stock", label: "Stock" },
    { key: "reorder_point", label: "Reorder Point" },
    { key: "status", label: "Status" },
    { key: "tags", label: "Tags" },
    { key: "barcode", label: "Barcode" },
    { key: "weight_kg", label: "Weight (kg)" },
  ],
};

export const INVENTORY_IE_CONFIG = {
  key: "inventory",
  label: "Inventory",
  importEnabled: true,
  exportEnabled: true,
  supportedFormats: ["csv", "xlsx", "json"],
  columns: [
    { key: "sku", label: "SKU", required: true },
    { key: "name", label: "Name" },
    { key: "on_hand", label: "On Hand", required: true },
    { key: "reserved", label: "Reserved" },
    { key: "reorder_point", label: "Reorder Point" },
  ],
};
