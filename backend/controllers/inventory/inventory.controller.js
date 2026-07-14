import asyncHandler from "../../utils/asyncHandler.js";
import AppError from "../../utils/AppError.js";
import InventoryItem from "../../models/InventoryItem.js";
import { resolveVendorContext } from "../../services/tenant.service.js";

function stockStatus(item) {
  const available = Math.max(0, (item.onHand || 0) - (item.reserved || 0));
  if (available <= 0) return "Out of Stock";
  if (available <= (item.reorderPoint || 0) || available <= 5) return "Low Stock";
  return "In Stock";
}

function serializeItem(item) {
  const available = Math.max(0, (item.onHand || 0) - (item.reserved || 0));
  return {
    id: String(item._id),
    name: item.name,
    sku: item.sku,
    onHand: item.onHand,
    reserved: item.reserved,
    available,
    reorderPoint: item.reorderPoint,
    status: stockStatus(item),
    updatedAt: item.updatedAt,
  };
}

export const listVendorInventory = asyncHandler(async (req, res) => {
  const { vendor } = await resolveVendorContext(req.user, {
    vendorId: req.query.vendorId,
  });

  if (!vendor) {
    throw new AppError("Vendor context required", 403, "VENDOR_CONTEXT_REQUIRED");
  }

  const filter = { vendor: vendor._id };
  if (req.query.search) {
    const q = new RegExp(String(req.query.search).trim(), "i");
    filter.$or = [{ name: q }, { sku: q }];
  }

  const items = await InventoryItem.find(filter).sort({ updatedAt: -1 }).limit(200);

  const totalSkus = items.length;
  let inStockQty = 0;
  let lowStock = 0;
  let outOfStock = 0;

  items.forEach((item) => {
    const available = Math.max(0, item.onHand - item.reserved);
    inStockQty += item.onHand;
    const status = stockStatus(item);
    if (status === "Out of Stock") outOfStock += 1;
    else if (status === "Low Stock") lowStock += 1;
  });

  res.json({
    success: true,
    kpis: {
      totalSkus,
      inStock: inStockQty,
      lowStock,
      outOfStock,
    },
    items: items.map(serializeItem),
  });
});
