import Vendor from "../models/Vendor.js";
import UserRole from "../models/UserRole.js";
import RolePermission from "../models/RolePermission.js";
import AppError from "../utils/AppError.js";

/**
 * Resolve (or create) the vendor tenant for the current user.
 * Vendor owners get an auto-provisioned shop; global roles may omit vendor.
 */
export async function resolveVendorContext(user, { vendorId } = {}) {
  const roles = await UserRole.find({ user: user._id }).populate("role");
  const roleNames = roles.map((ur) => ur.role?.name).filter(Boolean);
  const isGlobal = roleNames.some((r) =>
    ["super_admin", "admin", "finance", "warehouse_staff"].includes(r),
  );
  const isVendorRole = roleNames.some((r) =>
    ["vendor_owner", "vendor_manager", "vendor_staff"].includes(r),
  );

  if (vendorId) {
    const vendor = await Vendor.findById(vendorId);
    if (!vendor) {
      throw new AppError("Vendor not found", 404, "VENDOR_NOT_FOUND");
    }
    if (!isGlobal && String(vendor.owner) !== String(user._id)) {
      throw new AppError("Access denied to this vendor", 403, "VENDOR_FORBIDDEN");
    }
    return { vendor, roleNames, isGlobal };
  }

  if (isVendorRole) {
    let vendor = await Vendor.findOne({ owner: user._id });
    if (!vendor) {
      const base =
        `${user.firstName || "vendor"}-${user.lastName || "shop"}`
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/(^-|-$)/g, "") || "shop";
      const slug = `${base}-${String(user._id).slice(-6)}`;
      vendor = await Vendor.create({
        owner: user._id,
        name: `${user.firstName || "My"} Store`,
        slug,
        status: "active",
      });
    }
    return { vendor, roleNames, isGlobal };
  }

  if (isGlobal) {
    return { vendor: null, roleNames, isGlobal };
  }

  throw new AppError(
    "No vendor context available for this user",
    403,
    "VENDOR_CONTEXT_REQUIRED",
  );
}

export async function getUserPermissionKeys(userId) {
  const userRoles = await UserRole.find({ user: userId }).populate("role");
  const roleIds = userRoles.map((ur) => ur.role?._id).filter(Boolean);

  const links = await RolePermission.find({ role: { $in: roleIds } }).populate(
    "permission",
  );

  return [
    ...new Set(
      links
        .map((link) => {
          const p = link.permission;
          if (!p) return null;
          return `${p.module}:${p.action}:${p.resource}`;
        })
        .filter(Boolean),
    ),
  ];
}

export function assertVendorOwnership(job, vendor, { isGlobal = false } = {}) {
  if (isGlobal && !vendor) return;
  if (!job.vendor) return;
  if (!vendor) {
    throw new AppError("Vendor context required", 403, "VENDOR_CONTEXT_REQUIRED");
  }
  if (String(job.vendor) !== String(vendor._id)) {
    throw new AppError("Access denied to this job", 403, "JOB_FORBIDDEN");
  }
}
