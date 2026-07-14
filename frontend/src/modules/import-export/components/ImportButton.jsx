import { useState } from "react";
import MaterialIcon from "../../../components/superadmin/MaterialIcon.jsx";
import ImportWizard from "./ImportWizard.jsx";

function ImportButton({
  resourceKey,
  resourceConfig,
  label = "Import",
  onComplete,
  onNotify,
  className = "",
}) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={`cursor-pointer rounded-md border border-slate-200 bg-white px-3 py-1.5 text-[13px] text-gray-700 hover:border-slate-300 ${className}`}
      >
        <MaterialIcon name="upload" size={14} className="align-[-2px]" /> {label}
      </button>
      <ImportWizard
        open={open}
        onClose={() => setOpen(false)}
        resourceKey={resourceKey}
        resourceConfig={resourceConfig}
        onComplete={onComplete}
        onNotify={onNotify}
      />
    </>
  );
}

export default ImportButton;
