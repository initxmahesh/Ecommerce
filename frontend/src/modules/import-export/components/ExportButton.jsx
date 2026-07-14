import { useState } from "react";
import MaterialIcon from "../../../components/superadmin/MaterialIcon.jsx";
import {
  createExport,
  downloadJobFile,
} from "../services/importExportApi.js";

/**
 * One-click CSV export of all resource columns. No format or column pickers.
 */
function ExportButton({
  resourceKey,
  resourceConfig,
  label = "Export",
  onNotify,
  className = "",
}) {
  const [busy, setBusy] = useState(false);

  const handleExport = async () => {
    if (busy) return;
    setBusy(true);
    try {
      const job = await createExport(resourceKey, {
        format: "csv",
        columns: [],
      });
      await downloadJobFile(job.id, "result");
      onNotify?.(
        job.message ||
          `Exported ${resourceConfig?.label || resourceKey} as CSV`,
      );
    } catch (err) {
      onNotify?.(err.message || "Export failed");
    } finally {
      setBusy(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleExport}
      disabled={busy}
      className={`cursor-pointer rounded-md border border-slate-200 bg-white px-3 py-1.5 text-[13px] text-gray-700 hover:border-slate-300 disabled:opacity-60 ${className}`}
    >
      <MaterialIcon name="download" size={14} className="align-[-2px]" />{" "}
      {busy ? "Exporting…" : label}
    </button>
  );
}

export default ExportButton;
