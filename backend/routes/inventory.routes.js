import { Router } from "express";
import { authenticate, loadUser } from "../middlewares/auth.middleware.js";
import { loadPermissions, requirePermission } from "../middlewares/rbac.middleware.js";
import { listVendorInventory } from "../controllers/inventory/inventory.controller.js";

const router = Router();

router.use(authenticate, loadUser, loadPermissions);

router.get(
  "/",
  requirePermission("inventory:read:inventory"),
  listVendorInventory,
);

export default router;
