import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const env = {
  port: process.env.PORT || 5000,
  nodeEnv: process.env.NODE_ENV || "development",
  mongoUri: process.env.MONGO_URI,
  clientUrl: process.env.CLIENT_URL,

  jwt: {
    accessSecret: process.env.JWT_ACCESS_SECRET,
    refreshSecret: process.env.JWT_REFRESH_SECRET,
    accessExpires: process.env.JWT_ACCESS_EXPIRES || "15m",
    refreshExpires: process.env.JWT_REFRESH_EXPIRES || "7d",
  },

  email: {
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT) || 587,
    secure: process.env.SMTP_SECURE === "true",
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
    from: process.env.EMAIL_FROM || "noreply@cartify.com",
  },

  upload: {
    rootDir: process.env.UPLOAD_DIR || path.join(__dirname, "..", "uploads"),
    importExportDir:
      process.env.IMPORT_EXPORT_DIR ||
      path.join(__dirname, "..", "uploads", "import-export"),
    maxFileBytes: Number(process.env.MAX_UPLOAD_BYTES) || 10 * 1024 * 1024,
    allowedMimeTypes: [
      "text/csv",
      "application/csv",
      "application/vnd.ms-excel",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "application/json",
      "text/plain",
    ],
    allowedExtensions: [".csv", ".xlsx", ".xls", ".json"],
    downloadTtlMs: Number(process.env.DOWNLOAD_TTL_MS) || 60 * 60 * 1000,
  },
};

export default env;
