/** Platform role names returned by the auth API (`user.roles[].name`). */
export const ROLES = {
  SUPER_ADMIN: "super_admin",
  ADMIN: "admin",
  VENDOR_OWNER: "vendor_owner",
  VENDOR_MANAGER: "vendor_manager",
  VENDOR_STAFF: "vendor_staff",
  FINANCE: "finance",
  SUPPORT_AGENT: "support_agent",
  CUSTOMER: "customer",
};

export const ROLE_GROUPS = {
  SUPERADMIN: [ROLES.SUPER_ADMIN, ROLES.ADMIN],
  VENDOR: [ROLES.VENDOR_OWNER, ROLES.VENDOR_MANAGER, ROLES.VENDOR_STAFF],
  FINANCE: [ROLES.FINANCE],
  SUPPORT: [ROLES.SUPPORT_AGENT],
};

export function getRoleNames(user) {
  if (!user?.roles?.length) return [];
  return user.roles.map((role) => role.name).filter(Boolean);
}

export function hasAnyRole(user, allowedRoles = []) {
  if (!allowedRoles.length) return false;
  const names = new Set(getRoleNames(user));
  return allowedRoles.some((role) => names.has(role));
}

export function getHomePathForUser(user) {
  if (!user) return "/";
  if (hasAnyRole(user, ROLE_GROUPS.SUPERADMIN)) return "/superadmin";
  if (hasAnyRole(user, ROLE_GROUPS.VENDOR)) return "/vendor";
  if (hasAnyRole(user, ROLE_GROUPS.FINANCE)) return "/finance";
  if (hasAnyRole(user, ROLE_GROUPS.SUPPORT)) return "/support";
  return "/";
}

export function getDashboardLinkForUser(user) {
  if (hasAnyRole(user, ROLE_GROUPS.SUPERADMIN)) {
    return { label: "Admin Dashboard", to: "/superadmin" };
  }
  if (hasAnyRole(user, ROLE_GROUPS.VENDOR)) {
    return { label: "Seller Dashboard", to: "/vendor" };
  }
  if (hasAnyRole(user, ROLE_GROUPS.FINANCE)) {
    return { label: "Finance Dashboard", to: "/finance" };
  }
  if (hasAnyRole(user, ROLE_GROUPS.SUPPORT)) {
    return { label: "Support Dashboard", to: "/support" };
  }
  return null;
}
