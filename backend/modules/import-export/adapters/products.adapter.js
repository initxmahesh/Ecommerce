import Product from "../../../models/Product.js";
import InventoryItem from "../../../models/InventoryItem.js";

function parseTags(value) {
  if (!value) return [];
  if (Array.isArray(value)) return value.map(String);
  return String(value)
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean);
}

export const productsAdapter = {
  async importRows(rows, { vendor }) {
    let created = 0;
    let updated = 0;

    for (const row of rows) {
      const payload = {
        vendor: vendor._id,
        name: row.name,
        sku: String(row.sku).toUpperCase(),
        description: row.description || "",
        brand: row.brand || "",
        category: row.category || "",
        price: row.price,
        compareAtPrice: row.compare_at_price ?? null,
        cost: row.cost ?? null,
        stock: row.stock ?? 0,
        reorderPoint: row.reorder_point ?? 0,
        status: row.status || "draft",
        tags: parseTags(row.tags),
        barcode: row.barcode || "",
        weightKg: row.weight_kg ?? null,
      };

      const existing = await Product.findOne({
        vendor: vendor._id,
        sku: payload.sku,
      });

      let productDoc = existing;
      if (existing) {
        Object.assign(existing, payload);
        await existing.save();
        updated += 1;
      } else {
        productDoc = await Product.create(payload);
        created += 1;
      }

      await InventoryItem.findOneAndUpdate(
        { vendor: vendor._id, sku: payload.sku },
        {
          $set: {
            name: payload.name,
            onHand: payload.stock,
            reorderPoint: payload.reorderPoint,
            product: productDoc._id,
          },
          $setOnInsert: {
            vendor: vendor._id,
            sku: payload.sku,
            reserved: 0,
          },
        },
        { upsert: true, new: true },
      );
    }

    return { created, updated };
  },

  async exportRows({ vendor, filters = {}, selectedColumns }) {
    const query = { vendor: vendor._id };
    if (filters.status) query.status = filters.status;
    if (filters.search) {
      query.$or = [
        { name: new RegExp(filters.search, "i") },
        { sku: new RegExp(filters.search, "i") },
      ];
    }

    const sort = filters.sort || { updatedAt: -1 };
    const products = await Product.find(query).sort(sort).lean();

    const keys =
      selectedColumns?.length > 0
        ? selectedColumns
        : [
            "name",
            "sku",
            "description",
            "brand",
            "category",
            "price",
            "compare_at_price",
            "cost",
            "stock",
            "reorder_point",
            "status",
            "tags",
            "barcode",
            "weight_kg",
          ];

    const rows = products.map((p) => ({
      name: p.name,
      sku: p.sku,
      description: p.description,
      brand: p.brand,
      category: p.category,
      price: p.price,
      compare_at_price: p.compareAtPrice ?? "",
      cost: p.cost ?? "",
      stock: p.stock,
      reorder_point: p.reorderPoint,
      status: p.status,
      tags: (p.tags || []).join(","),
      barcode: p.barcode || "",
      weight_kg: p.weightKg ?? "",
    }));

    return { headers: keys, rows: rows.map((r) => {
      const out = {};
      keys.forEach((k) => {
        out[k] = r[k] ?? "";
      });
      return out;
    }) };
  },
};
