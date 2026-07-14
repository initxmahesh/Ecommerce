import mongoose from "mongoose";

const inventoryItemSchema = new mongoose.Schema(
  {
    vendor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Vendor",
      required: true,
      index: true,
    },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      default: null,
      index: true,
    },
    sku: {
      type: String,
      required: true,
      trim: true,
      uppercase: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    onHand: {
      type: Number,
      default: 0,
      min: 0,
    },
    reserved: {
      type: Number,
      default: 0,
      min: 0,
    },
    reorderPoint: {
      type: Number,
      default: 0,
      min: 0,
    },
  },
  { timestamps: true },
);

inventoryItemSchema.virtual("available").get(function available() {
  return Math.max(0, this.onHand - this.reserved);
});

inventoryItemSchema.set("toJSON", { virtuals: true });
inventoryItemSchema.set("toObject", { virtuals: true });

inventoryItemSchema.index({ vendor: 1, sku: 1 }, { unique: true });

const InventoryItem = mongoose.model("InventoryItem", inventoryItemSchema);

export default InventoryItem;
