import { Router } from "express";
import authRoutes from "./auth.routes.js";
import importExportRoutes from "./import-export.routes.js";
import productRoutes from "./product.routes.js";
import inventoryRoutes from "./inventory.routes.js";

const router = Router();

router.use("/auth", authRoutes);
router.use("/import-export", importExportRoutes);
router.use("/products", productRoutes);
router.use("/inventory", inventoryRoutes);

export default router;
