import multer from "multer";
import env from "../config/env.js";
import AppError from "../utils/AppError.js";

const storage = multer.memoryStorage();

export const uploadImportFile = multer({
  storage,
  limits: {
    fileSize: env.upload.maxFileBytes,
    files: 1,
  },
  fileFilter(_req, file, cb) {
    const name = (file.originalname || "").toLowerCase();
    const okExt = env.upload.allowedExtensions.some((ext) => name.endsWith(ext));
    if (!okExt) {
      return cb(
        new AppError("Unsupported file type", 400, "INVALID_FILE_EXTENSION"),
      );
    }
    cb(null, true);
  },
}).single("file");
