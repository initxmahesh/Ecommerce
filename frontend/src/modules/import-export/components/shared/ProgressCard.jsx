import MaterialIcon from "../../../../components/superadmin/MaterialIcon.jsx";

function ProgressCard({ progress = 0, status, message }) {
  return (
    <div className="rounded-lg border border-slate-200 bg-white p-5">
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <MaterialIcon
            name={status === "failed" ? "error" : "hourglass_top"}
            size={20}
            className={status === "failed" ? "text-red-500" : "text-emerald-500"}
          />
          <span className="text-sm font-semibold capitalize">{status}</span>
        </div>
        <span className="font-mono text-sm font-semibold">{progress}%</span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-slate-100">
        <div
          className={`h-full rounded-full transition-all ${
            status === "failed" ? "bg-red-500" : "bg-emerald-500"
          }`}
          style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
        />
      </div>
      {message ? (
        <p className="mt-3 text-[13px] text-slate-500">{message}</p>
      ) : null}
    </div>
  );
}

export default ProgressCard;
