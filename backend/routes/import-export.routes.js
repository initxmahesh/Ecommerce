import { Router } from "express";
import { authenticate, loadUser } from "../middlewares/auth.middleware.js";
import { loadPermissions } from "../middlewares/rbac.middleware.js";
import { uploadImportFile } from "../middlewares/upload.middleware.js";
import * as ctrl from "../controllers/import-export/importExport.controller.js";

const router = Router();

router.use(authenticate, loadUser, loadPermissions);

router.get("/resources", ctrl.listAvailableResources);
router.get("/resources/:resource/template", ctrl.downloadTemplate);

router.post(
  "/resources/:resource/import/upload",
  uploadImportFile,
  ctrl.uploadImport,
);
router.post("/jobs/:jobId/mapping", ctrl.mapImportColumns);
router.post("/jobs/:jobId/preview", ctrl.previewImportJob);
router.post("/jobs/:jobId/confirm", ctrl.confirmImportJob);

router.post("/resources/:resource/export", ctrl.createExportJob);

router.get("/jobs", ctrl.listJobs);
router.get("/jobs/:jobId", ctrl.getJob);
router.post("/jobs/:jobId/cancel", ctrl.cancelImportExportJob);
router.post("/jobs/:jobId/retry", ctrl.retryImportJob);
router.get("/jobs/:jobId/download/:kind", ctrl.downloadJobFile);

export default router;
