import { Router } from "express";
import { authenticate, loadUser } from "../middlewares/auth.middleware.js";
import { loadPermissions, requirePermission } from "../middlewares/rbac.middleware.js";
import { listVendorProducts } from "../controllers/product/product.controller.js";

const router = Router();

router.use(authenticate, loadUser, loadPermissions);

router.get(
  "/",
  requirePermission("products:read:product"),
  listVendorProducts,
);

export default router;
