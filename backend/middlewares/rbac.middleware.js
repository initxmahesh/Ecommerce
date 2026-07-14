import AppError from "../utils/AppError.js";
import { getUserPermissionKeys } from "../services/tenant.service.js";

export async function loadPermissions(req, _res, next) {
  try {
    if (!req.userId) {
      return next(new AppError("Authentication required", 401, "UNAUTHORIZED"));
    }
    req.permissions = await getUserPermissionKeys(req.userId);
    next();
  } catch (error) {
    next(error);
  }
}

/**
 * Require any of the given permission keys.
 * Also accepts "manage" equivalents: products:manage:product covers products:import:product
 * when the manage key shares module+resource.
 */
export function requirePermission(...requiredKeys) {
  return (req, _res, next) => {
    const perms = req.permissions || [];

    const allowed = requiredKeys.some((key) => {
      if (perms.includes(key)) return true;
      const [module, , resource] = key.split(":");
      return perms.includes(`${module}:manage:${resource}`);
    });

    if (!allowed) {
      return next(
        new AppError("Insufficient permissions", 403, "FORBIDDEN"),
      );
    }
    next();
  };
}
