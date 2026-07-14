import mongoose from "mongoose";

const vendorSchema = new mongoose.Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    status: {
      type: String,
      enum: ["active", "suspended", "pending"],
      default: "active",
    },
  },
  { timestamps: true },
);

vendorSchema.index({ owner: 1, status: 1 });

const Vendor = mongoose.model("Vendor", vendorSchema);

export default Vendor;
