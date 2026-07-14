import InventoryItem from "../../../models/InventoryItem.js";
import Product from "../../../models/Product.js";
import AppError from "../../../utils/AppError.js";

export const inventoryAdapter = {
  async importRows(rows, { vendor }) {
    let created = 0;
    let updated = 0;

    for (const row of rows) {
      const sku = String(row.sku).toUpperCase();
      const product = await Product.findOne({ vendor: vendor._id, sku });
      const name = row.name || product?.name || sku;

      const existing = await InventoryItem.findOne({
        vendor: vendor._id,
        sku,
      });

      const payload = {
        vendor: vendor._id,
        sku,
        name,
        onHand: row.on_hand,
        reserved: row.reserved ?? existing?.reserved ?? 0,
        reorderPoint: row.reorder_point ?? existing?.reorderPoint ?? 0,
        product: product?._id || null,
      };

      if (payload.reserved > payload.onHand) {
        throw new AppError(
          `Reserved cannot exceed on_hand for SKU ${sku}`,
          400,
          "INVALID_INVENTORY",
        );
      }

      if (existing) {
        Object.assign(existing, payload);
        await existing.save();
        updated += 1;
      } else {
        await InventoryItem.create(payload);
        created += 1;
      }

      if (product) {
        product.stock = payload.onHand;
        product.reorderPoint = payload.reorderPoint;
        if (row.name) product.name = row.name;
        await product.save();
      }
    }

    return { created, updated };
  },

  async exportRows({ vendor, filters = {}, selectedColumns }) {
    const query = { vendor: vendor._id };
    if (filters.search) {
      query.$or = [
        { name: new RegExp(filters.search, "i") },
        { sku: new RegExp(filters.search, "i") },
      ];
    }

    const items = await InventoryItem.find(query)
      .sort(filters.sort || { updatedAt: -1 })
      .lean();

    const keys =
      selectedColumns?.length > 0
        ? selectedColumns
        : ["sku", "name", "on_hand", "reserved", "available", "reorder_point"];

    const rows = items.map((item) => ({
      sku: item.sku,
      name: item.name,
      on_hand: item.onHand,
      reserved: item.reserved,
      available: Math.max(0, item.onHand - item.reserved),
      reorder_point: item.reorderPoint,
    }));

    return {
      headers: keys,
      rows: rows.map((r) => {
        const out = {};
        keys.forEach((k) => {
          out[k] = r[k] ?? "";
        });
        return out;
      }),
    };
  },
};
