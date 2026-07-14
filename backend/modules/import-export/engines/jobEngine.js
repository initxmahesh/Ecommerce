import path from "path";
import { registerResource } from "../registry.js";
import { productsResource } from "../config/products.resource.js";
import { inventoryResource } from "../config/inventory.resource.js";
import { productsAdapter } from "../adapters/products.adapter.js";
import { inventoryAdapter } from "../adapters/inventory.adapter.js";
import {
  parseFileBuffer,
  serializeRows,
  rowsToCsv,
} from "../parsers/index.js";
import {
  autoMapColumns,
  applyColumnMapping,
  validateHeaders,
  validateRows,
} from "../validators/index.js";
import {
  assertAllowedUpload,
  persistUpload,
  readFileBuffer,
  writeBufferFile,
  writeTextFile,
  detectCsvInjection,
  buildDownloadExpiry,
} from "../../../services/file.service.js";
import ImportExportJob from "../../../models/ImportExportJob.js";
import AppError from "../../../utils/AppError.js";
import { AuditLog } from "../../../models/index.js";
import env from "../../../config/env.js";

registerResource({ ...productsResource, adapter: productsAdapter });
registerResource({ ...inventoryResource, adapter: inventoryAdapter });

export { requireResource, listResources, getResource } from "../registry.js";

async function audit(userId, action, resourceId, reqMeta, extra = {}) {
  await AuditLog.create({
    user: userId,
    action,
    module: "import_export",
    resource: "job",
    resourceId,
    newValues: extra,
    ipAddress: reqMeta?.ipAddress,
    userAgent: reqMeta?.userAgent,
  });
}

function mappingObject(job) {
  if (!job.columnMapping) return {};
  if (job.columnMapping instanceof Map) {
    return Object.fromEntries(job.columnMapping.entries());
  }
  return { ...job.columnMapping };
}

export function buildTemplate(resource, format = "csv") {
  const headers = resource.columns.map((c) => c.key);
  const example = {};
  resource.columns.forEach((c) => {
    example[c.key] = c.example ?? "";
  });

  if (format === "json") {
    return {
      content: Buffer.from(JSON.stringify([example], null, 2), "utf8"),
      contentType: "application/json",
      filename: `${resource.key}-template.json`,
    };
  }

  const guideHeaders = ["column", "required", "type", "description", "example"];
  const guideRows = resource.columns.map((c) => ({
    column: c.key,
    required: c.required ? "yes" : "no",
    type: c.type,
    description: c.description || "",
    example: c.example || "",
  }));

  const sample = rowsToCsv(headers, [example]);
  const guide = rowsToCsv(guideHeaders, guideRows);
  const content = Buffer.from(
    `# ${resource.label} import template\n# --- Column guide ---\n${guide}\n# --- Sample row ---\n${sample}`,
    "utf8",
  );

  return {
    content,
    contentType: "text/csv; charset=utf-8",
    filename: `${resource.key}-template.csv`,
  };
}

export async function createImportUpload({
  resource,
  file,
  user,
  vendor,
  reqMeta,
}) {
  if (!resource.importEnabled) {
    throw new AppError("Import is disabled for this resource", 400, "IMPORT_DISABLED");
  }

  const format = assertAllowedUpload(file);
  if (!resource.supportedFormats.includes(format === "xls" ? "xlsx" : format) && format !== "xls") {
    if (!resource.supportedFormats.includes(format)) {
      throw new AppError(
        `Format .${format} is not supported for ${resource.key}`,
        400,
        "UNSUPPORTED_FORMAT",
      );
    }
  }

  const job = await ImportExportJob.create({
    type: "import",
    resource: resource.key,
    status: "pending",
    vendor: vendor?._id || null,
    user: user._id,
    format: format === "xls" ? "xlsx" : format,
    originalFileName: file.originalname,
    progress: 5,
  });

  const storedPath = await persistUpload(file, {
    vendorId: vendor?._id,
    jobId: job._id,
  });
  job.storedFilePath = storedPath;

  const buffer = file.buffer;
  const parsed = await parseFileBuffer(buffer, job.format);
  const mapping = autoMapColumns(parsed.headers, resource.columns);
  job.headers = parsed.headers;
  job.columnMapping = mapping;
  job.totalRows = parsed.rows.length;
  job.preview = parsed.rows.slice(0, 20).map((row) =>
    applyColumnMapping(row, mapping),
  );
  job.status = "validating";
  job.progress = 20;
  await job.save();

  await audit(user._id, "import.upload", job._id, reqMeta, {
    resource: resource.key,
    rows: parsed.rows.length,
  });

  return job;
}

export async function updateImportMapping(job, mapping, resource) {
  const headerErrors = validateHeaders(job.headers, resource.columns, mapping);
  job.columnMapping = mapping;
  job.validationErrors = headerErrors;
  job.errorRows = headerErrors.filter((e) => e.severity === "error").length;
  job.warningRows = headerErrors.filter((e) => e.severity === "warning").length;
  job.status = headerErrors.some((e) => e.severity === "error")
    ? "validating"
    : "pending";
  job.progress = 30;
  await job.save();
  return job;
}

export async function previewImport(job, resource) {
  if (!job.storedFilePath) {
    throw new AppError("Import file missing", 400, "FILE_MISSING");
  }

  const buffer = await readFileBuffer(job.storedFilePath);
  const parsed = await parseFileBuffer(buffer, job.format);
  const mapping = mappingObject(job);
  const mappedRows = parsed.rows.map((row) => applyColumnMapping(row, mapping));

  const headerErrors = validateHeaders(parsed.headers, resource.columns, mapping);
  const injection = detectCsvInjection(mappedRows);
  const { rows, errors: rowErrors } = validateRows(mappedRows, resource.columns, {
    uniqueKeys: resource.uniqueKeys || [],
  });

  const allErrors = [...headerErrors, ...injection, ...rowErrors].slice(0, 500);

  job.preview = mappedRows.slice(0, 25);
  job.totalRows = mappedRows.length;
  job.validationErrors = allErrors;
  job.errorRows = allErrors.filter((e) => e.severity === "error").length;
  job.warningRows = allErrors.filter((e) => e.severity === "warning").length;
  job.successRows = rows.length;
  job.status = "validating";
  job.progress = 45;
  job.meta = { ...(job.meta || {}), validRowCount: rows.length };
  await job.save();

  return job;
}

export async function runImport(job, resource, { user, vendor, reqMeta }) {
  if (!vendor) {
    throw new AppError("Vendor context required for import", 400, "VENDOR_REQUIRED");
  }
  if (!resource.adapter?.importRows) {
    throw new AppError("Resource adapter missing importRows", 500, "ADAPTER_MISSING");
  }

  job.status = "running";
  job.startedAt = new Date();
  job.progress = 55;
  await job.save();

  try {
    const buffer = await readFileBuffer(job.storedFilePath);
    const parsed = await parseFileBuffer(buffer, job.format);
    const mapping = mappingObject(job);
    const mappedRows = parsed.rows.map((row) => applyColumnMapping(row, mapping));

    const headerErrors = validateHeaders(parsed.headers, resource.columns, mapping);
    if (headerErrors.some((e) => e.severity === "error")) {
      throw new AppError("Column mapping is invalid", 400, "INVALID_MAPPING");
    }

    const { rows, errors } = validateRows(mappedRows, resource.columns, {
      uniqueKeys: resource.uniqueKeys || [],
    });

    if (errors.some((e) => e.severity === "error") && rows.length === 0) {
      job.status = "failed";
      job.validationErrors = errors.slice(0, 500);
      job.errorRows = errors.length;
      job.completedAt = new Date();
      job.progress = 100;
      job.message = "No valid rows to import";
      await job.save();
      return job;
    }

    const result = await resource.adapter.importRows(rows, { vendor, user });

    const errorCsv = rowsToCsv(
      ["row", "column", "invalidValue", "expectedValue", "reason", "suggestedFix", "severity"],
      errors.map((e) => ({
        row: e.row,
        column: e.column,
        invalidValue: e.invalidValue,
        expectedValue: e.expectedValue,
        reason: e.reason,
        suggestedFix: e.suggestedFix,
        severity: e.severity,
      })),
    );

    if (errors.length) {
      const errPath = path.join(
        env.upload.importExportDir,
        String(vendor._id),
        `${job._id}-errors.csv`,
      );
      await writeTextFile(errPath, errorCsv);
      job.errorReportPath = errPath;
    }

    job.processedRows = mappedRows.length;
    job.successRows = rows.length;
    job.errorRows = errors.filter((e) => e.severity === "error").length;
    job.warningRows = errors.filter((e) => e.severity === "warning").length;
    job.validationErrors = errors.slice(0, 200);
    job.status = "completed";
    job.progress = 100;
    job.completedAt = new Date();
    job.downloadExpiresAt = buildDownloadExpiry();
    job.message = `Imported ${result.created} created, ${result.updated} updated`;
    job.meta = { ...(job.meta || {}), ...result };
    await job.save();

    await audit(user._id, "import.complete", job._id, reqMeta, {
      resource: resource.key,
      ...result,
    });

    return job;
  } catch (error) {
    job.status = "failed";
    job.progress = 100;
    job.completedAt = new Date();
    job.message = error.message || "Import failed";
    await job.save();
    throw error;
  }
}

export async function runExport({
  resource,
  user,
  vendor,
  format = "csv",
  selectedColumns = [],
  filters = {},
  filename,
  reqMeta,
}) {
  if (!resource.exportEnabled) {
    throw new AppError("Export is disabled for this resource", 400, "EXPORT_DISABLED");
  }
  if (!resource.supportedFormats.includes(format)) {
    throw new AppError(`Unsupported export format: ${format}`, 400, "UNSUPPORTED_FORMAT");
  }
  if (!vendor) {
    throw new AppError("Vendor context required for export", 400, "VENDOR_REQUIRED");
  }
  if (!resource.adapter?.exportRows) {
    throw new AppError("Resource adapter missing exportRows", 500, "ADAPTER_MISSING");
  }

  const job = await ImportExportJob.create({
    type: "export",
    resource: resource.key,
    status: "running",
    vendor: vendor._id,
    user: user._id,
    format,
    selectedColumns,
    filters,
    filename,
    startedAt: new Date(),
    progress: 20,
  });

  try {
    const { headers, rows } = await resource.adapter.exportRows({
      vendor,
      filters,
      selectedColumns,
    });

    const serialized = await serializeRows(headers, rows, format);
    const outName =
      filename ||
      `${resource.key}-export-${new Date().toISOString().slice(0, 10)}.${serialized.extension}`;
    const outPath = path.join(
      env.upload.importExportDir,
      String(vendor._id),
      `${job._id}-${outName}`,
    );

    await writeBufferFile(outPath, serialized.content);

    job.resultFilePath = outPath;
    job.filename = outName;
    job.totalRows = rows.length;
    job.processedRows = rows.length;
    job.successRows = rows.length;
    job.status = "completed";
    job.progress = 100;
    job.completedAt = new Date();
    job.downloadExpiresAt = buildDownloadExpiry();
    job.message = `Exported ${rows.length} rows`;
    await job.save();

    await audit(user._id, "export.complete", job._id, reqMeta, {
      resource: resource.key,
      rows: rows.length,
      format,
    });

    return job;
  } catch (error) {
    job.status = "failed";
    job.progress = 100;
    job.completedAt = new Date();
    job.message = error.message || "Export failed";
    await job.save();
    throw error;
  }
}

export async function cancelJob(job) {
  if (["completed", "failed", "cancelled"].includes(job.status)) {
    throw new AppError("Job can no longer be cancelled", 400, "JOB_NOT_CANCELLABLE");
  }
  job.status = "cancelled";
  job.completedAt = new Date();
  job.progress = 100;
  job.message = "Cancelled by user";
  await job.save();
  return job;
}

export async function retryImport(job, resource, ctx) {
  if (job.type !== "import") {
    throw new AppError("Only import jobs can be retried", 400, "INVALID_RETRY");
  }
  if (!["failed", "cancelled"].includes(job.status)) {
    throw new AppError("Only failed or cancelled jobs can be retried", 400, "INVALID_RETRY");
  }
  job.status = "pending";
  job.progress = 10;
  job.message = null;
  job.completedAt = null;
  job.validationErrors = [];
  await job.save();
  return runImport(job, resource, ctx);
}
