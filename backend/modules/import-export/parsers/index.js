import { parse } from "csv-parse/sync";
import ExcelJS from "exceljs";
import AppError from "../../../utils/AppError.js";
import { sanitizeCellValue } from "../../../services/file.service.js";

function normalizeHeader(header) {
  return String(header || "")
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "_");
}

export function parseCsvBuffer(buffer) {
  const text = buffer.toString("utf8").replace(/^\uFEFF/, "");
  const records = parse(text, {
    columns: (headers) => headers.map(normalizeHeader),
    skip_empty_lines: true,
    trim: true,
    relax_column_count: true,
  });

  const headers =
    records.length > 0
      ? Object.keys(records[0])
      : parse(text, { to_line: 1, relax_column_count: true })[0]?.map(
          normalizeHeader,
        ) || [];

  return { headers, rows: records };
}

export async function parseXlsxBuffer(buffer) {
  const workbook = new ExcelJS.Workbook();
  await workbook.xlsx.load(buffer);
  const sheet = workbook.worksheets[0];
  if (!sheet) {
    throw new AppError("Spreadsheet has no sheets", 400, "EMPTY_SPREADSHEET");
  }

  const headerRow = sheet.getRow(1);
  const headers = [];
  headerRow.eachCell({ includeEmpty: false }, (cell, colNumber) => {
    headers[colNumber - 1] = normalizeHeader(cell.text || cell.value);
  });

  const rows = [];
  sheet.eachRow({ includeEmpty: false }, (row, rowNumber) => {
    if (rowNumber === 1) return;
    const obj = {};
    headers.forEach((header, idx) => {
      if (!header) return;
      const cell = row.getCell(idx + 1);
      let value = cell.value;
      if (value && typeof value === "object") {
        if (value.text) value = value.text;
        else if (value.result != null) value = value.result;
        else if (value.richText) {
          value = value.richText.map((t) => t.text).join("");
        }
      }
      obj[header] = value == null ? "" : String(value).trim();
    });
    if (Object.values(obj).some((v) => String(v).trim() !== "")) {
      rows.push(obj);
    }
  });

  return { headers: headers.filter(Boolean), rows };
}

export function parseJsonBuffer(buffer) {
  let data;
  try {
    data = JSON.parse(buffer.toString("utf8"));
  } catch {
    throw new AppError("Invalid JSON file", 400, "INVALID_JSON");
  }

  const rows = Array.isArray(data)
    ? data
    : Array.isArray(data?.rows)
      ? data.rows
      : null;

  if (!rows) {
    throw new AppError(
      "JSON must be an array of objects or { rows: [] }",
      400,
      "INVALID_JSON_SHAPE",
    );
  }

  const headers = [
    ...new Set(rows.flatMap((row) => Object.keys(row || {}).map(normalizeHeader))),
  ];

  const normalized = rows.map((row) => {
    const out = {};
    Object.entries(row || {}).forEach(([k, v]) => {
      out[normalizeHeader(k)] = v == null ? "" : String(v).trim();
    });
    return out;
  });

  return { headers, rows: normalized };
}

export async function parseFileBuffer(buffer, format) {
  if (format === "csv" || format === "txt") {
    return parseCsvBuffer(buffer);
  }
  if (format === "xlsx" || format === "xls") {
    return parseXlsxBuffer(buffer);
  }
  if (format === "json") {
    return parseJsonBuffer(buffer);
  }
  throw new AppError(`Unsupported format: ${format}`, 400, "UNSUPPORTED_FORMAT");
}

export function rowsToCsv(headers, rows) {
  const escape = (value) => {
    const safe = sanitizeCellValue(value == null ? "" : String(value));
    if (/[",\n\r]/.test(safe)) {
      return `"${safe.replace(/"/g, '""')}"`;
    }
    return safe;
  };

  const lines = [headers.join(",")];
  rows.forEach((row) => {
    lines.push(headers.map((h) => escape(row[h])).join(","));
  });
  return `${lines.join("\n")}\n`;
}

export async function rowsToXlsx(headers, rows) {
  const workbook = new ExcelJS.Workbook();
  const sheet = workbook.addWorksheet("Export");
  sheet.addRow(headers);
  rows.forEach((row) => {
    sheet.addRow(headers.map((h) => sanitizeCellValue(row[h] ?? "")));
  });
  const buffer = await workbook.xlsx.writeBuffer();
  return Buffer.from(buffer);
}

export function rowsToJson(headers, rows) {
  const data = rows.map((row) => {
    const obj = {};
    headers.forEach((h) => {
      obj[h] = row[h] ?? "";
    });
    return obj;
  });
  return `${JSON.stringify(data, null, 2)}\n`;
}

export async function serializeRows(headers, rows, format) {
  if (format === "csv") {
    return {
      content: Buffer.from(rowsToCsv(headers, rows), "utf8"),
      contentType: "text/csv; charset=utf-8",
      extension: "csv",
    };
  }
  if (format === "xlsx") {
    return {
      content: await rowsToXlsx(headers, rows),
      contentType:
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      extension: "xlsx",
    };
  }
  if (format === "json") {
    return {
      content: Buffer.from(rowsToJson(headers, rows), "utf8"),
      contentType: "application/json; charset=utf-8",
      extension: "json",
    };
  }
  throw new AppError(`Unsupported format: ${format}`, 400, "UNSUPPORTED_FORMAT");
}
