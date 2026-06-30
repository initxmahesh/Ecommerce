import { Role, Permission, RolePermission } from "../models/index.js";
import { ROLES } from "./data/roles.js";
import { PERMISSIONS } from "./data/permissions.js";
import {
  ROLE_PERMISSIONS,
  permissionKey,
} from "./data/role-permissions.js";

export const seedRoles = async () => {
  const roleMap = new Map();

  for (const role of ROLES) {
    const doc = await Role.findOneAndUpdate(
      { name: role.name },
      { $set: role },
      { upsert: true, returnDocument: "after" }
    );
    roleMap.set(role.name, doc);
  }

  return roleMap;
};

export const seedPermissions = async () => {
  const permissionMap = new Map();

  for (const permission of PERMISSIONS) {
    const doc = await Permission.findOneAndUpdate(
      {
        module: permission.module,
        action: permission.action,
        resource: permission.resource,
      },
      { $set: permission },
      { upsert: true, returnDocument: "after" }
    );
    permissionMap.set(permissionKey(permission), doc);
  }

  return permissionMap;
};

export const seedRolePermissions = async (roleMap, permissionMap) => {
  let linked = 0;

  for (const [roleName, permissionKeys] of Object.entries(ROLE_PERMISSIONS)) {
    const role = roleMap.get(roleName);
    if (!role) continue;

    for (const key of permissionKeys) {
      const permission = permissionMap.get(key);
      if (!permission) continue;

      await RolePermission.findOneAndUpdate(
        { role: role._id, permission: permission._id },
        { role: role._id, permission: permission._id },
        { upsert: true, returnDocument: "after" }
      );
      linked += 1;
    }
  }

  return linked;
};

export const runSeeds = async () => {
  const roleMap = await seedRoles();
  const permissionMap = await seedPermissions();
  const linked = await seedRolePermissions(roleMap, permissionMap);

  return {
    roles: roleMap.size,
    permissions: permissionMap.size,
    rolePermissions: linked,
  };
};
