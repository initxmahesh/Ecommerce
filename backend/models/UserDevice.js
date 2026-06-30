import mongoose from "mongoose";
import { DEVICE_TYPE } from "../constants/auth.js";

const userDeviceSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    deviceName: {
      type: String,
      trim: true,
      default: "Unknown Device",
    },
    deviceType: {
      type: String,
      enum: Object.values(DEVICE_TYPE),
      default: DEVICE_TYPE.OTHER,
    },
    browser: {
      type: String,
      trim: true,
      default: null,
    },
    operatingSystem: {
      type: String,
      trim: true,
      default: null,
    },
    ipAddress: {
      type: String,
      trim: true,
      default: null,
    },
    isTrusted: {
      type: Boolean,
      default: false,
    },
    lastUsedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: { createdAt: true, updatedAt: false },
  }
);

userDeviceSchema.index({ user: 1 });
userDeviceSchema.index({ user: 1, lastUsedAt: -1 });

const UserDevice = mongoose.model("UserDevice", userDeviceSchema);

export default UserDevice;
