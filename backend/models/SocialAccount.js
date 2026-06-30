import mongoose from "mongoose";
import { SOCIAL_PROVIDER } from "../constants/auth.js";

const socialAccountSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    provider: {
      type: String,
      enum: Object.values(SOCIAL_PROVIDER),
      required: true,
    },
    providerUserId: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      lowercase: true,
      trim: true,
      default: null,
    },
    avatar: {
      type: String,
      default: null,
    },
    accessToken: {
      type: String,
      select: false,
      default: null,
    },
    refreshToken: {
      type: String,
      select: false,
      default: null,
    },
  },
  {
    timestamps: { createdAt: true, updatedAt: false },
  }
);

socialAccountSchema.index({ provider: 1, providerUserId: 1 }, { unique: true });
socialAccountSchema.index({ user: 1 });

const SocialAccount = mongoose.model("SocialAccount", socialAccountSchema);

export default SocialAccount;
