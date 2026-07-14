import { useEffect, useMemo, useState } from "react";
import { IMPORT_STEPS } from "../config/constants.js";
import {
  uploadImportFile,
  updateJobMapping,
  previewJob,
  confirmImport,
  downloadResourceTemplate,
  downloadJobFile,
} from "../services/importExportApi.js";
import ModalShell from "./shared/ModalShell.jsx";
import UploadZone from "./shared/UploadZone.jsx";
import ColumnMapper from "./shared/ColumnMapper.jsx";
import ImportPreviewTable from "./shared/ImportPreviewTable.jsx";
import ErrorTable from "./shared/ErrorTable.jsx";
import ProgressCard from "./shared/ProgressCard.jsx";
import ResultSummary from "./shared/ResultSummary.jsx";
import MaterialIcon from "../../../components/superadmin/MaterialIcon.jsx";

function StepRail({ stepId }) {
  const activeIdx = IMPORT_STEPS.findIndex((s) => s.id === stepId);
  return (
    <div className="mb-5 flex flex-wrap gap-1.5">
      {IMPORT_STEPS.map((step, idx) => {
        const done = idx < activeIdx;
        const active = idx === activeIdx;
        return (
          <span
            key={step.id}
            className={`rounded-full px-2.5 py-1 text-[11px] font-medium ${
              active
                ? "bg-emerald-500 text-white"
                : done
                  ? "bg-emerald-50 text-emerald-700"
                  : "bg-slate-100 text-slate-500"
            }`}
          >
            {idx + 1}. {step.label}
          </span>
        );
      })}
    </div>
  );
}

function ImportWizard({
  open,
  onClose,
  resourceKey,
  resourceConfig,
  onComplete,
  onNotify,
}) {
  const [step, setStep] = useState("upload");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [job, setJob] = useState(null);
  const [mapping, setMapping] = useState({});

  useEffect(() => {
    if (!open) {
      setStep("upload");
      setBusy(false);
      setError("");
      setJob(null);
      setMapping({});
    }
  }, [open]);

  const columns = resourceConfig?.columns || [];

  const hardErrors = useMemo(
    () => (job?.errors || []).filter((e) => e.severity === "error"),
    [job],
  );

  const notify = (msg) => {
    if (onNotify) onNotify(msg);
  };

  const handleUpload = async (file) => {
    setBusy(true);
    setError("");
    try {
      const uploaded = await uploadImportFile(resourceKey, file);
      setJob(uploaded);
      setMapping(uploaded.columnMapping || {});
      setStep("validate");
    } catch (err) {
      setError(err.message || "Upload failed");
    } finally {
      setBusy(false);
    }
  };

  const runValidate = async () => {
    if (!job) return;
    setBusy(true);
    setError("");
    try {
      const previewed = await previewJob(job.id);
      setJob(previewed);
      setStep("mapping");
    } catch (err) {
      setError(err.message || "Validation failed");
    } finally {
      setBusy(false);
    }
  };

  const saveMapping = async () => {
    if (!job) return;
    setBusy(true);
    setError("");
    try {
      const updated = await updateJobMapping(job.id, mapping);
      setJob(updated);
      const previewed = await previewJob(job.id);
      setJob(previewed);
      setStep("preview");
    } catch (err) {
      setError(err.message || "Mapping failed");
    } finally {
      setBusy(false);
    }
  };

  const goConfirm = () => setStep("confirm");

  const runImport = async () => {
    if (!job) return;
    setStep("processing");
    setBusy(true);
    setError("");
    try {
      const completed = await confirmImport(job.id);
      setJob(completed);
      setStep("completed");
      notify(completed.message || "Import completed");
      if (onComplete) onComplete(completed);
    } catch (err) {
      setError(err.message || "Import failed");
      setStep("confirm");
    } finally {
      setBusy(false);
    }
  };

  const footer = (() => {
    if (step === "upload") {
      return (
        <>
          <button
            type="button"
            onClick={() => downloadResourceTemplate(resourceKey).catch((e) => setError(e.message))}
            className="mr-auto cursor-pointer rounded-md border border-slate-200 px-3 py-1.5 text-[13px] hover:border-slate-300"
          >
            Download template
          </button>
          <button
            type="button"
            onClick={onClose}
            className="cursor-pointer rounded-md border border-slate-200 px-3.5 py-1.5 text-[13px]"
          >
            Cancel
          </button>
        </>
      );
    }

    if (step === "validate") {
      return (
        <>
          <button
            type="button"
            onClick={() => setStep("upload")}
            className="cursor-pointer rounded-md border border-slate-200 px-3.5 py-1.5 text-[13px]"
          >
            Back
          </button>
          <button
            type="button"
            disabled={busy}
            onClick={runValidate}
            className="cursor-pointer rounded-md bg-emerald-500 px-3.5 py-1.5 text-[13px] font-medium text-white hover:bg-emerald-600 disabled:opacity-60"
          >
            Continue
          </button>
        </>
      );
    }

    if (step === "mapping") {
      return (
        <>
          <button
            type="button"
            onClick={() => setStep("validate")}
            className="cursor-pointer rounded-md border border-slate-200 px-3.5 py-1.5 text-[13px]"
          >
            Back
          </button>
          <button
            type="button"
            disabled={busy}
            onClick={saveMapping}
            className="cursor-pointer rounded-md bg-emerald-500 px-3.5 py-1.5 text-[13px] font-medium text-white hover:bg-emerald-600 disabled:opacity-60"
          >
            Apply mapping
          </button>
        </>
      );
    }

    if (step === "preview") {
      return (
        <>
          <button
            type="button"
            onClick={() => setStep("mapping")}
            className="cursor-pointer rounded-md border border-slate-200 px-3.5 py-1.5 text-[13px]"
          >
            Back
          </button>
          <button
            type="button"
            onClick={goConfirm}
            className="cursor-pointer rounded-md bg-emerald-500 px-3.5 py-1.5 text-[13px] font-medium text-white hover:bg-emerald-600"
          >
            Continue
          </button>
        </>
      );
    }

    if (step === "confirm") {
      return (
        <>
          <button
            type="button"
            onClick={() => setStep("preview")}
            className="cursor-pointer rounded-md border border-slate-200 px-3.5 py-1.5 text-[13px]"
          >
            Back
          </button>
          <button
            type="button"
            disabled={busy || (hardErrors.length > 0 && (job?.successRows || 0) === 0)}
            onClick={runImport}
            className="cursor-pointer rounded-md bg-emerald-500 px-3.5 py-1.5 text-[13px] font-medium text-white hover:bg-emerald-600 disabled:opacity-60"
          >
            Start import
          </button>
        </>
      );
    }

    if (step === "completed") {
      return (
        <>
          {job?.hasErrorReport ? (
            <button
              type="button"
              onClick={() =>
                downloadJobFile(job.id, "errors").catch((e) => setError(e.message))
              }
              className="mr-auto cursor-pointer rounded-md border border-slate-200 px-3 py-1.5 text-[13px]"
            >
              Download error report
            </button>
          ) : null}
          <button
            type="button"
            onClick={onClose}
            className="cursor-pointer rounded-md bg-emerald-500 px-3.5 py-1.5 text-[13px] font-medium text-white hover:bg-emerald-600"
          >
            Done
          </button>
        </>
      );
    }

    return null;
  })();

  return (
    <ModalShell
      open={open}
      onClose={onClose}
      wide
      title={`Import ${resourceConfig?.label || resourceKey}`}
      subtitle="Upload, map columns, preview, then import"
      footer={footer}
    >
      <StepRail stepId={step} />

      {error ? (
        <div className="mb-4 rounded-md border border-red-200 bg-red-50 px-3 py-2 text-[13px] text-red-700">
          {error}
        </div>
      ) : null}

      {step === "upload" ? (
        <UploadZone onFileSelected={handleUpload} disabled={busy} />
      ) : null}

      {step === "validate" && job ? (
        <div className="space-y-4">
          <div className="rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-[13px]">
            <div className="font-medium">{job.originalFileName}</div>
            <div className="mt-1 text-slate-500">
              Detected {job.totalRows} rows · format {job.format}
            </div>
          </div>
          <p className="text-[13px] text-slate-500">
            Click continue to validate headers and sample rows before mapping.
          </p>
        </div>
      ) : null}

      {step === "mapping" && job ? (
        <ColumnMapper
          columns={columns}
          headers={job.headers || []}
          mapping={mapping}
          onChange={setMapping}
        />
      ) : null}

      {step === "preview" && job ? (
        <div className="space-y-4">
          <ResultSummary job={job} />
          <ImportPreviewTable columns={columns} rows={job.preview || []} />
          <ErrorTable errors={job.errors || []} />
        </div>
      ) : null}

      {step === "confirm" && job ? (
        <div className="space-y-4">
          <div className="rounded-lg border border-emerald-100 bg-emerald-50 px-4 py-3 text-[13px] text-emerald-800">
            Ready to import <strong>{job.successRows || 0}</strong> valid rows
            into {resourceConfig?.label || resourceKey}.
            {hardErrors.length ? (
              <span>
                {" "}
                {hardErrors.length} error(s) will be skipped and listed in the
                error report.
              </span>
            ) : null}
          </div>
          <ResultSummary job={job} />
        </div>
      ) : null}

      {step === "processing" ? (
        <ProgressCard
          progress={job?.progress || 60}
          status="running"
          message="Importing rows…"
        />
      ) : null}

      {step === "completed" && job ? (
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-emerald-600">
            <MaterialIcon name="check_circle" size={22} />
            <span className="text-sm font-semibold">
              {job.message || "Import completed"}
            </span>
          </div>
          <ProgressCard
            progress={100}
            status={job.status}
            message={job.message}
          />
          <ResultSummary job={job} />
          <ErrorTable errors={job.errors || []} />
        </div>
      ) : null}
    </ModalShell>
  );
}

export default ImportWizard;
