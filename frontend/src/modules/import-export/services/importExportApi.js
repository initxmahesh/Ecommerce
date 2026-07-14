import {
  apiRequest,
  apiUpload,
  apiDownload,
  triggerBrowserDownload,
} from "../../../services/apiClient.js";

const BASE = "/api/import-export";

export async function fetchImportExportResources() {
  const data = await apiRequest(`${BASE}/resources`);
  return data.resources;
}

export async function downloadResourceTemplate(resource, format = "csv") {
  const { blob, filename } = await apiDownload(
    `${BASE}/resources/${resource}/template?format=${encodeURIComponent(format)}`,
  );
  triggerBrowserDownload(blob, filename);
}

export async function uploadImportFile(resource, file) {
  const form = new FormData();
  form.append("file", file);
  const data = await apiUpload(
    `${BASE}/resources/${resource}/import/upload`,
    form,
  );
  return data.job;
}

export async function updateJobMapping(jobId, mapping) {
  const data = await apiRequest(`${BASE}/jobs/${jobId}/mapping`, {
    method: "POST",
    body: JSON.stringify({ mapping }),
  });
  return data.job;
}

export async function previewJob(jobId) {
  const data = await apiRequest(`${BASE}/jobs/${jobId}/preview`, {
    method: "POST",
    body: JSON.stringify({}),
  });
  return data.job;
}

export async function confirmImport(jobId) {
  const data = await apiRequest(`${BASE}/jobs/${jobId}/confirm`, {
    method: "POST",
    body: JSON.stringify({}),
  });
  return data.job;
}

export async function createExport(resource, payload) {
  const data = await apiRequest(`${BASE}/resources/${resource}/export`, {
    method: "POST",
    body: JSON.stringify(payload),
  });
  return data.job;
}

export async function getJob(jobId) {
  const data = await apiRequest(`${BASE}/jobs/${jobId}`);
  return data.job;
}

export async function listJobs(params = {}) {
  const qs = new URLSearchParams();
  Object.entries(params).forEach(([k, v]) => {
    if (v != null && v !== "") qs.set(k, v);
  });
  const data = await apiRequest(`${BASE}/jobs?${qs.toString()}`);
  return data.jobs;
}

export async function cancelJob(jobId) {
  const data = await apiRequest(`${BASE}/jobs/${jobId}/cancel`, {
    method: "POST",
    body: JSON.stringify({}),
  });
  return data.job;
}

export async function retryJob(jobId) {
  const data = await apiRequest(`${BASE}/jobs/${jobId}/retry`, {
    method: "POST",
    body: JSON.stringify({}),
  });
  return data.job;
}

export async function downloadJobFile(jobId, kind = "result") {
  const { blob, filename } = await apiDownload(
    `${BASE}/jobs/${jobId}/download/${kind}`,
  );
  triggerBrowserDownload(blob, filename);
}
