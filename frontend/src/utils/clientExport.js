import {
  apiDownload,
  triggerBrowserDownload,
} from "../services/apiClient.js";

function escapeCsv(value) {
  const str = value == null ? "" : String(value);
  if (/[",\n\r]/.test(str)) return `"${str.replace(/"/g, '""')}"`;
  return str;
}

export function downloadCsv(filename, headers, rows) {
  const lines = [headers.join(",")];
  rows.forEach((row) => {
    lines.push(headers.map((h) => escapeCsv(row[h])).join(","));
  });
  const blob = new Blob([`${lines.join("\n")}\n`], {
    type: "text/csv;charset=utf-8",
  });
  triggerBrowserDownload(blob, filename.endsWith(".csv") ? filename : `${filename}.csv`);
}

export function downloadJson(filename, rows) {
  const blob = new Blob([`${JSON.stringify(rows, null, 2)}\n`], {
    type: "application/json;charset=utf-8",
  });
  triggerBrowserDownload(
    blob,
    filename.endsWith(".json") ? filename : `${filename}.json`,
  );
}

export async function exportViaApi(resource, payload = {}) {
  const { createExport, downloadJobFile } = await import(
    "../modules/import-export/services/importExportApi.js"
  );
  const job = await createExport(resource, payload);
  await downloadJobFile(job.id, "result");
  return job;
}

export async function downloadTemplate(resource, format = "csv") {
  const { blob, filename } = await apiDownload(
    `/api/import-export/resources/${resource}/template?format=${encodeURIComponent(format)}`,
  );
  triggerBrowserDownload(blob, filename);
}
