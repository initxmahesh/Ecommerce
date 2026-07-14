import asyncHandler from "../../utils/asyncHandler.js";
import AppError from "../../utils/AppError.js";
import { getRequestMeta } from "../../utils/request.js";
import ImportExportJob from "../../models/ImportExportJob.js";
import {
  resolveVendorContext,
  assertVendorOwnership,
} from "../../services/tenant.service.js";
import { readFileBuffer } from "../../services/file.service.js";
import {
  requireResource,
  listResources,
  buildTemplate,
  createImportUpload,
  updateImportMapping,
  previewImport,
  runImport,
  runExport,
  cancelJob,
  retryImport,
} from "../../modules/import-export/engines/jobEngine.js";
import { getResourcePermission } from "../../modules/import-export/registry.js";

function serializeJob(job) {
  const obj = job.toObject ? job.toObject({ virtuals: true }) : job;
  return {
    id: String(obj._id),
    type: obj.type,
    resource: obj.resource,
    status: obj.status,
    format: obj.format,
    originalFileName: obj.originalFileName,
    filename: obj.filename,
    progress: obj.progress,
    totalRows: obj.totalRows,
    processedRows: obj.processedRows,
    successRows: obj.successRows,
    errorRows: obj.errorRows,
    warningRows: obj.warningRows,
    errors: obj.validationErrors || [],
    preview: obj.preview || [],
    headers: obj.headers || [],
    columnMapping:
      obj.columnMapping instanceof Map
        ? Object.fromEntries(obj.columnMapping.entries())
        : obj.columnMapping || {},
    selectedColumns: obj.selectedColumns || [],
    filters: obj.filters || {},
    message: obj.message,
    startedAt: obj.startedAt,
    completedAt: obj.completedAt,
    downloadedAt: obj.downloadedAt,
    downloadExpiresAt: obj.downloadExpiresAt,
    durationMs: obj.durationMs ?? null,
    hasErrorReport: Boolean(obj.errorReportPath),
    hasResultFile: Boolean(obj.resultFilePath),
    meta: obj.meta || {},
    createdAt: obj.createdAt,
    updatedAt: obj.updatedAt,
  };
}

function assertResourcePermission(req, resource, action) {
  const key = getResourcePermission(resource, action);
  if (!key) return;
  const perms = req.permissions || [];
  const [module, , resName] = key.split(":");
  const allowed =
    perms.includes(key) || perms.includes(`${module}:manage:${resName}`);
  if (!allowed) {
    throw new AppError("Insufficient permissions", 403, "FORBIDDEN");
  }
}

async function loadScopedJob(req) {
  const job = await ImportExportJob.findById(req.params.jobId);
  if (!job) {
    throw new AppError("Job not found", 404, "JOB_NOT_FOUND");
  }
  const { vendor, isGlobal } = await resolveVendorContext(req.user, {
    vendorId: req.query.vendorId || req.body?.vendorId,
  });
  assertVendorOwnership(job, vendor, { isGlobal });
  return { job, vendor, isGlobal };
}

export const listAvailableResources = asyncHandler(async (req, res) => {
  const resources = listResources().map((r) => ({
    key: r.key,
    label: r.label,
    importEnabled: r.importEnabled,
    exportEnabled: r.exportEnabled,
    supportedFormats: r.supportedFormats,
    columns: r.columns.map((c) => ({
      key: c.key,
      label: c.label,
      type: c.type,
      required: Boolean(c.required),
      description: c.description || "",
      example: c.example || "",
    })),
    permissions: r.permissions,
  }));

  res.json({ success: true, resources });
});

export const downloadTemplate = asyncHandler(async (req, res) => {
  const resource = requireResource(req.params.resource);
  assertResourcePermission(req, resource, "import");
  const format = (req.query.format || "csv").toLowerCase();
  const template = buildTemplate(resource, format);

  res.setHeader("Content-Type", template.contentType);
  res.setHeader(
    "Content-Disposition",
    `attachment; filename="${template.filename}"`,
  );
  res.send(template.content);
});

export const uploadImport = asyncHandler(async (req, res) => {
  const resource = requireResource(req.params.resource);
  assertResourcePermission(req, resource, "import");

  const { vendor } = await resolveVendorContext(req.user, {
    vendorId: req.body?.vendorId,
  });

  const job = await createImportUpload({
    resource,
    file: req.file,
    user: req.user,
    vendor,
    reqMeta: getRequestMeta(req),
  });

  res.status(201).json({ success: true, job: serializeJob(job) });
});

export const mapImportColumns = asyncHandler(async (req, res) => {
  const { job } = await loadScopedJob(req);
  if (job.type !== "import") {
    throw new AppError("Not an import job", 400, "INVALID_JOB_TYPE");
  }
  const resource = requireResource(job.resource);
  assertResourcePermission(req, resource, "import");

  const mapping = req.body?.mapping;
  if (!mapping || typeof mapping !== "object") {
    throw new AppError("mapping object is required", 400, "VALIDATION_ERROR");
  }

  const updated = await updateImportMapping(job, mapping, resource);
  res.json({ success: true, job: serializeJob(updated) });
});

export const previewImportJob = asyncHandler(async (req, res) => {
  const { job } = await loadScopedJob(req);
  if (job.type !== "import") {
    throw new AppError("Not an import job", 400, "INVALID_JOB_TYPE");
  }
  const resource = requireResource(job.resource);
  assertResourcePermission(req, resource, "import");

  const updated = await previewImport(job, resource);
  res.json({ success: true, job: serializeJob(updated) });
});

export const confirmImportJob = asyncHandler(async (req, res) => {
  const { job, vendor } = await loadScopedJob(req);
  if (job.type !== "import") {
    throw new AppError("Not an import job", 400, "INVALID_JOB_TYPE");
  }
  const resource = requireResource(job.resource);
  assertResourcePermission(req, resource, "import");

  const updated = await runImport(job, resource, {
    user: req.user,
    vendor,
    reqMeta: getRequestMeta(req),
  });

  res.json({ success: true, job: serializeJob(updated) });
});

export const createExportJob = asyncHandler(async (req, res) => {
  const resource = requireResource(req.params.resource);
  assertResourcePermission(req, resource, "export");

  const { vendor } = await resolveVendorContext(req.user, {
    vendorId: req.body?.vendorId,
  });

  const job = await runExport({
    resource,
    user: req.user,
    vendor,
    format: (req.body?.format || "csv").toLowerCase(),
    selectedColumns: req.body?.columns || [],
    filters: req.body?.filters || {},
    filename: req.body?.filename,
    reqMeta: getRequestMeta(req),
  });

  res.status(201).json({ success: true, job: serializeJob(job) });
});

export const getJob = asyncHandler(async (req, res) => {
  const { job } = await loadScopedJob(req);
  res.json({ success: true, job: serializeJob(job) });
});

export const listJobs = asyncHandler(async (req, res) => {
  const { vendor, isGlobal } = await resolveVendorContext(req.user, {
    vendorId: req.query.vendorId,
  });

  const filter = {};
  if (vendor) filter.vendor = vendor._id;
  else if (!isGlobal) {
    throw new AppError("Vendor context required", 403, "VENDOR_CONTEXT_REQUIRED");
  }

  if (req.query.type) filter.type = req.query.type;
  if (req.query.resource) filter.resource = req.query.resource;
  if (req.query.status) filter.status = req.query.status;

  const limit = Math.min(Number(req.query.limit) || 20, 100);
  const jobs = await ImportExportJob.find(filter)
    .sort({ createdAt: -1 })
    .limit(limit);

  res.json({ success: true, jobs: jobs.map(serializeJob) });
});

export const cancelImportExportJob = asyncHandler(async (req, res) => {
  const { job } = await loadScopedJob(req);
  const updated = await cancelJob(job);
  res.json({ success: true, job: serializeJob(updated) });
});

export const retryImportJob = asyncHandler(async (req, res) => {
  const { job, vendor } = await loadScopedJob(req);
  const resource = requireResource(job.resource);
  assertResourcePermission(req, resource, "import");
  const updated = await retryImport(job, resource, {
    user: req.user,
    vendor,
    reqMeta: getRequestMeta(req),
  });
  res.json({ success: true, job: serializeJob(updated) });
});

export const downloadJobFile = asyncHandler(async (req, res) => {
  const { job } = await loadScopedJob(req);
  const kind = req.params.kind;

  if (job.downloadExpiresAt && job.downloadExpiresAt.getTime() < Date.now()) {
    throw new AppError("Download link has expired", 410, "DOWNLOAD_EXPIRED");
  }

  let filePath = null;
  let filename = job.filename || `${job.resource}-${job.type}.${job.format}`;

  if (kind === "result") {
    filePath = job.resultFilePath;
  } else if (kind === "errors") {
    filePath = job.errorReportPath;
    filename = `${job.resource}-errors.csv`;
  } else if (kind === "source") {
    filePath = job.storedFilePath;
    filename = job.originalFileName || filename;
  } else {
    throw new AppError("Unknown download kind", 400, "INVALID_DOWNLOAD_KIND");
  }

  if (!filePath) {
    throw new AppError("File not available", 404, "FILE_NOT_FOUND");
  }

  const buffer = await readFileBuffer(filePath);
  job.downloadedAt = new Date();
  await job.save();

  res.setHeader("Content-Type", "application/octet-stream");
  res.setHeader("Content-Disposition", `attachment; filename="${filename}"`);
  res.send(buffer);
});
