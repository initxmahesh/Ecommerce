import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    vendor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Vendor",
      required: true,
      index: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    sku: {
      type: String,
      required: true,
      trim: true,
      uppercase: true,
    },
    description: {
      type: String,
      default: "",
      trim: true,
    },
    brand: {
      type: String,
      default: "",
      trim: true,
    },
    category: {
      type: String,
      default: "",
      trim: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    compareAtPrice: {
      type: Number,
      default: null,
      min: 0,
    },
    cost: {
      type: Number,
      default: null,
      min: 0,
    },
    stock: {
      type: Number,
      default: 0,
      min: 0,
    },
    reorderPoint: {
      type: Number,
      default: 0,
      min: 0,
    },
    status: {
      type: String,
      enum: ["draft", "published", "archived", "pending_review"],
      default: "draft",
      index: true,
    },
    tags: {
      type: [String],
      default: [],
    },
    barcode: {
      type: String,
      default: "",
      trim: true,
    },
    weightKg: {
      type: Number,
      default: null,
      min: 0,
    },
  },
  { timestamps: true },
);

productSchema.index({ vendor: 1, sku: 1 }, { unique: true });
productSchema.index({ vendor: 1, name: 1 });

const Product = mongoose.model("Product", productSchema);

export default Product;
