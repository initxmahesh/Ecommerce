import MaterialIcon from "../../../../components/superadmin/MaterialIcon.jsx";

function UploadZone({
  onFileSelected,
  accept = ".csv,.xlsx,.xls,.json",
  disabled = false,
  hint = "CSV, Excel, or JSON · Max 10MB",
}) {
  const onChange = (e) => {
    const file = e.target.files?.[0];
    if (file) onFileSelected(file);
    e.target.value = "";
  };

  const onDrop = (e) => {
    e.preventDefault();
    if (disabled) return;
    const file = e.dataTransfer.files?.[0];
    if (file) onFileSelected(file);
  };

  return (
    <label
      onDragOver={(e) => e.preventDefault()}
      onDrop={onDrop}
      className={`flex w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-slate-200 bg-slate-50 px-6 py-10 text-center transition-colors hover:border-emerald-500 hover:bg-emerald-500/[0.02] ${
        disabled ? "pointer-events-none opacity-60" : ""
      }`}
    >
      <MaterialIcon name="cloud_upload" size={36} className="text-slate-300" />
      <div className="mt-3 text-[13px] font-medium text-slate-700">
        Drag & drop a file, or click to browse
      </div>
      <div className="mt-1 text-[11px] text-slate-400">{hint}</div>
      <input
        type="file"
        className="hidden"
        accept={accept}
        disabled={disabled}
        onChange={onChange}
      />
    </label>
  );
}

export default UploadZone;
