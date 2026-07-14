import asyncHandler from "../../utils/asyncHandler.js";
import AppError from "../../utils/AppError.js";
import Product from "../../models/Product.js";
import { resolveVendorContext } from "../../services/tenant.service.js";

function serializeProduct(p) {
  const stock = p.stock ?? 0;
  return {
    id: String(p._id),
    name: p.name,
    sku: p.sku,
    category: p.category || "",
    brand: p.brand || "",
    price: p.price,
    compareAtPrice: p.compareAtPrice,
    stock,
    status: p.status,
    tags: p.tags || [],
    description: p.description || "",
    updatedAt: p.updatedAt,
  };
}

export const listVendorProducts = asyncHandler(async (req, res) => {
  const { vendor } = await resolveVendorContext(req.user, {
    vendorId: req.query.vendorId,
  });

  if (!vendor) {
    throw new AppError("Vendor context required", 403, "VENDOR_CONTEXT_REQUIRED");
  }

  const filter = { vendor: vendor._id };
  if (req.query.status && req.query.status !== "all") {
    const statusMap = {
      published: "published",
      draft: "draft",
      pending: "pending_review",
      out_of_stock: "published",
    };
    if (req.query.status === "out_of_stock") {
      filter.stock = 0;
    } else if (statusMap[req.query.status]) {
      filter.status = statusMap[req.query.status];
    }
  }

  if (req.query.search) {
    const q = new RegExp(String(req.query.search).trim(), "i");
    filter.$or = [{ name: q }, { sku: q }, { category: q }];
  }

  const products = await Product.find(filter).sort({ updatedAt: -1 }).limit(200);

  const all = await Product.find({ vendor: vendor._id }).select("status stock");
  const counts = {
    all: all.length,
    published: all.filter((p) => p.status === "published").length,
    draft: all.filter((p) => p.status === "draft").length,
    pending: all.filter((p) => p.status === "pending_review").length,
    out_of_stock: all.filter((p) => p.stock === 0).length,
  };

  res.json({
    success: true,
    counts,
    products: products.map(serializeProduct),
  });
});
