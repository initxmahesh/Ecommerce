import { SUPPORT_KPIS, SUPPORT_ROWS } from "../../data/superadminData.js";
import MaterialIcon from "../../components/superadmin/MaterialIcon.jsx";
import StatusBadge from "../../components/superadmin/StatusBadge.jsx";

function SupportPage() {
  return (
    <div className="flex-1 p-4 md:p-6">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div className="text-xl font-bold">Support Tickets</div>
        <button
          type="button"
          className="cursor-pointer rounded-md border border-slate-200 bg-white px-3 py-1.5 text-[13px] text-gray-700 hover:border-slate-300"
        >
          Assign agent ▾
        </button>
      </div>

      <div className="mb-4 grid grid-cols-[repeat(auto-fill,minmax(150px,1fr))] gap-3">
        {SUPPORT_KPIS.map((sk) => (
          <div
            key={sk.label}
            className="rounded-lg border border-slate-200 bg-white px-3.5 py-3"
          >
            <div className="mb-1 text-[11px] text-slate-500">{sk.label}</div>
            <div
              className="font-mono text-xl font-bold"
              style={{ color: sk.vc }}
            >
              {sk.value}
            </div>
          </div>
        ))}
      </div>

      <div className="overflow-hidden rounded-lg border border-slate-200 bg-white">
        {SUPPORT_ROWS.map((sr) => (
          <div
            key={sr.subject}
            className="flex cursor-pointer items-center gap-3 border-b border-slate-50 px-5 py-3 hover:bg-slate-50/80"
          >
            <div
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg"
              style={{ background: sr.priBg }}
            >
              <MaterialIcon
                name={sr.priIcon}
                size={18}
                style={{ color: sr.priC }}
              />
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-[13px] font-medium">{sr.subject}</div>
              <div className="text-xs text-slate-500">
                {sr.customer} · {sr.time}
              </div>
            </div>
            <StatusBadge status={sr.status} />
            <span className="text-[11px] font-medium text-slate-500">
              {sr.agent}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SupportPage;
