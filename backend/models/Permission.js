import mongoose from "mongoose";

const permissionSchema = new mongoose.Schema(
  {
    module: {
      type: String,
      required: [true, "Module is required"],
      trim: true,
      lowercase: true,
    },
    action: {
      type: String,
      required: [true, "Action is required"],
      trim: true,
      lowercase: true,
    },
    name: {
      type: String,
      required: [true, "Permission name is required"],
      trim: true,
    },
    description: {
      type: String,
      trim: true,
      default: "",
    },
    resource: {
      type: String,
      required: [true, "Resource is required"],
      trim: true,
      lowercase: true,
    },
  },
  {
    timestamps: { createdAt: true, updatedAt: false },
  }
);

permissionSchema.index({ module: 1, action: 1, resource: 1 }, { unique: true });

const Permission = mongoose.model("Permission", permissionSchema);

export default Permission;
