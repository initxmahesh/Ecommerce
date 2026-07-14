import mongoose from "mongoose";

export const JOB_TYPES = ["import", "export"];

export const JOB_STATUSES = [
  "pending",
  "validating",
  "queued",
  "running",
  "completed",
  "failed",
  "cancelled",
];

const errorRowSchema = new mongoose.Schema(
  {
    row: Number,
    column: String,
    invalidValue: mongoose.Schema.Types.Mixed,
    expectedValue: String,
    reason: String,
    suggestedFix: String,
    severity: {
      type: String,
      enum: ["error", "warning"],
      default: "error",
    },
  },
  { _id: false },
);

const importExportJobSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: JOB_TYPES,
      required: true,
      index: true,
    },
    resource: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    status: {
      type: String,
      enum: JOB_STATUSES,
      default: "pending",
      index: true,
    },
    vendor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Vendor",
      default: null,
      index: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    format: {
      type: String,
      enum: ["csv", "xlsx", "json"],
      default: "csv",
    },
    originalFileName: {
      type: String,
      default: null,
    },
    storedFilePath: {
      type: String,
      default: null,
    },
    resultFilePath: {
      type: String,
      default: null,
    },
    errorReportPath: {
      type: String,
      default: null,
    },
    columnMapping: {
      type: Map,
      of: String,
      default: {},
    },
    selectedColumns: {
      type: [String],
      default: [],
    },
    filters: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
    },
    sort: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
    },
    filename: {
      type: String,
      default: null,
    },
    progress: {
      type: Number,
      default: 0,
      min: 0,
      max: 100,
    },
    totalRows: {
      type: Number,
      default: 0,
    },
    processedRows: {
      type: Number,
      default: 0,
    },
    successRows: {
      type: Number,
      default: 0,
    },
    errorRows: {
      type: Number,
      default: 0,
    },
    warningRows: {
      type: Number,
      default: 0,
    },
    validationErrors: {
      type: [errorRowSchema],
      default: [],
    },
    preview: {
      type: [mongoose.Schema.Types.Mixed],
      default: [],
    },
    headers: {
      type: [String],
      default: [],
    },
    message: {
      type: String,
      default: null,
    },
    startedAt: {
      type: Date,
      default: null,
    },
    completedAt: {
      type: Date,
      default: null,
    },
    downloadedAt: {
      type: Date,
      default: null,
    },
    downloadExpiresAt: {
      type: Date,
      default: null,
    },
    meta: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
    },
  },
  { timestamps: true },
);

importExportJobSchema.index({ vendor: 1, type: 1, createdAt: -1 });
importExportJobSchema.index({ user: 1, createdAt: -1 });
importExportJobSchema.index({ status: 1, createdAt: -1 });

importExportJobSchema.virtual("durationMs").get(function durationMs() {
  if (!this.startedAt || !this.completedAt) return null;
  return this.completedAt.getTime() - this.startedAt.getTime();
});

importExportJobSchema.set("toJSON", { virtuals: true });
importExportJobSchema.set("toObject", { virtuals: true });

const ImportExportJob = mongoose.model("ImportExportJob", importExportJobSchema);

export default ImportExportJob;
