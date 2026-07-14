import fs from "fs/promises";
import path from "path";
import crypto from "crypto";
import env from "../config/env.js";
import AppError from "../utils/AppError.js";

const FORMULA_INJECTION_RE = /^[=+\-@\t\r]/;

export async function ensureUploadDirs() {
  await fs.mkdir(env.upload.importExportDir, { recursive: true });
}

export function sanitizeCellValue(value) {
  if (value == null) return value;
  const str = String(value);
  if (FORMULA_INJECTION_RE.test(str)) {
    return `'${str}`;
  }
  return value;
}

export function detectCsvInjection(rows) {
  const issues = [];
  rows.forEach((row, index) => {
    Object.entries(row).forEach(([key, value]) => {
      if (typeof value === "string" && FORMULA_INJECTION_RE.test(value.trim())) {
        issues.push({
          row: index + 2,
          column: key,
          invalidValue: value,
          expectedValue: "Plain text without leading = + - @",
          reason: "Possible CSV/Excel formula injection",
          suggestedFix: "Remove leading formula characters or quote the value",
          severity: "warning",
        });
      }
    });
  });
  return issues;
}

export function assertAllowedUpload(file) {
  if (!file) {
    throw new AppError("File is required", 400, "FILE_REQUIRED");
  }

  if (file.size > env.upload.maxFileBytes) {
    throw new AppError(
      `File exceeds maximum size of ${Math.round(env.upload.maxFileBytes / (1024 * 1024))}MB`,
      400,
      "FILE_TOO_LARGE",
    );
  }

  const ext = path.extname(file.originalname || "").toLowerCase();
  if (!env.upload.allowedExtensions.includes(ext)) {
    throw new AppError(
      `Unsupported file extension: ${ext || "(none)"}`,
      400,
      "INVALID_FILE_EXTENSION",
    );
  }

  if (
    file.mimetype &&
    !env.upload.allowedMimeTypes.includes(file.mimetype) &&
    file.mimetype !== "application/octet-stream"
  ) {
    throw new AppError(
      `Unsupported MIME type: ${file.mimetype}`,
      400,
      "INVALID_MIME_TYPE",
    );
  }

  return ext.replace(".", "");
}

export async function persistUpload(file, { vendorId, jobId }) {
  await ensureUploadDirs();
  const ext = path.extname(file.originalname || "").toLowerCase() || ".bin";
  const safeVendor = vendorId ? String(vendorId) : "global";
  const dir = path.join(env.upload.importExportDir, safeVendor);
  await fs.mkdir(dir, { recursive: true });

  const name = `${jobId || crypto.randomUUID()}-${Date.now()}${ext}`;
  const dest = path.join(dir, name);
  await fs.writeFile(dest, file.buffer);
  return dest;
}

export async function writeTextFile(relativeOrAbsolute, content) {
  await ensureUploadDirs();
  const full = path.isAbsolute(relativeOrAbsolute)
    ? relativeOrAbsolute
    : path.join(env.upload.importExportDir, relativeOrAbsolute);
  await fs.mkdir(path.dirname(full), { recursive: true });
  await fs.writeFile(full, content, "utf8");
  return full;
}

export async function writeBufferFile(absolutePath, buffer) {
  await ensureUploadDirs();
  await fs.mkdir(path.dirname(absolutePath), { recursive: true });
  await fs.writeFile(absolutePath, buffer);
  return absolutePath;
}

export async function readFileBuffer(filePath) {
  try {
    return await fs.readFile(filePath);
  } catch {
    throw new AppError("File not found", 404, "FILE_NOT_FOUND");
  }
}

export async function removeFileSafe(filePath) {
  if (!filePath) return;
  try {
    await fs.unlink(filePath);
  } catch {
    // ignore missing files
  }
}

export function buildDownloadExpiry() {
  return new Date(Date.now() + env.upload.downloadTtlMs);
}
