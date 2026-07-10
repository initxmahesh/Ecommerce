import { MODERATION_ROWS } from "../../data/superadminData.js";
import MaterialIcon from "../../components/superadmin/MaterialIcon.jsx";

function ModerationPage() {
  return (
    <div className="flex-1 p-4 md:p-6">
      <div className="mb-4 text-xl font-bold">Content Moderation</div>

      <div className="mb-4 grid grid-cols-[repeat(auto-fill,minmax(155px,1fr))] gap-3">
        {[
          { label: "Pending Review", value: "18", color: "#f59e0b" },
          { label: "Flagged", value: "5", color: "#ef4444" },
          { label: "Approved Today", value: "42", color: "#10b981" },
          { label: "Rejected", value: "7", color: "#0f172a" },
        ].map((k) => (
          <div
            key={k.label}
            className="rounded-lg border border-slate-200 bg-white px-3.5 py-3"
          >
            <div className="mb-1 text-[11px] text-slate-500">{k.label}</div>
            <div
              className="font-mono text-xl font-bold"
              style={{ color: k.color }}
            >
              {k.value}
            </div>
          </div>
        ))}
      </div>

      <div className="overflow-hidden rounded-lg border border-slate-200 bg-white">
        <div className="border-b border-slate-200 px-5 py-3.5 text-sm font-semibold">
          Moderation Queue
        </div>
        {MODERATION_ROWS.map((mr) => (
          <div
            key={mr.title}
            className="flex cursor-pointer items-center gap-3 border-b border-slate-50 px-5 py-3 hover:bg-slate-50/80"
          >
            <div
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md"
              style={{ background: mr.imgBg }}
            >
              <MaterialIcon
                name={mr.imgIcon}
                size={20}
                style={{ color: mr.imgC }}
              />
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-[13px] font-medium">{mr.title}</div>
              <div className="text-xs text-slate-500">
                {mr.vendor} · {mr.type}
              </div>
            </div>
            <span
              className="rounded-[10px] px-2 py-0.5 text-[11px] font-medium"
              style={{ color: mr.sc, background: mr.sb }}
            >
              {mr.reason}
            </span>
            <div className="flex gap-1.5">
              <button
                type="button"
                className="cursor-pointer rounded bg-emerald-500 px-2.5 py-1 text-xs font-medium text-white hover:bg-emerald-600"
              >
                Approve
              </button>
              <button
                type="button"
                className="cursor-pointer rounded bg-red-100 px-2.5 py-1 text-xs font-medium text-red-600 hover:bg-red-200"
              >
                Reject
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ModerationPage;
