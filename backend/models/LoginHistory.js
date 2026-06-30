import mongoose from "mongoose";
import { LOGIN_STATUS } from "../constants/auth.js";

const loginHistorySchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    ipAddress: {
      type: String,
      trim: true,
      default: null,
    },
    userAgent: {
      type: String,
      default: null,
    },
    status: {
      type: String,
      enum: Object.values(LOGIN_STATUS),
      required: true,
    },
    failureReason: {
      type: String,
      default: null,
    },
    attempts: {
      type: Number,
      default: 1,
    },
  },
  {
    timestamps: { createdAt: true, updatedAt: false },
  }
);

loginHistorySchema.index({ user: 1, createdAt: -1 });
loginHistorySchema.index({ email: 1, createdAt: -1 });

const LoginHistory = mongoose.model("LoginHistory", loginHistorySchema);

export default LoginHistory;
