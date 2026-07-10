import { REFUND_KPIS, REFUND_ROWS } from "../../data/financeData.js";
import MaterialIcon from "../../components/superadmin/MaterialIcon.jsx";

function RefundsPage() {
  return (
    <div className="flex-1 p-4 md:p-6">
      <div className="mb-4 text-xl font-bold">Refunds</div>

      <div className="mb-4 grid grid-cols-[repeat(auto-fill,minmax(160px,1fr))] gap-3">
        {REFUND_KPIS.map((rk) => (
          <div
            key={rk.label}
            className="rounded-lg border border-zinc-200 bg-white px-3.5 py-3"
          >
            <div className="mb-1 text-[11px] text-zinc-500">{rk.label}</div>
            <div
              className="font-mono text-xl font-bold"
              style={{ color: rk.vc }}
            >
              {rk.value}
            </div>
          </div>
        ))}
      </div>

      <div className="overflow-hidden rounded-lg border border-zinc-200 bg-white">
        {REFUND_ROWS.map((rr) => (
          <button
            key={rr.order}
            type="button"
            className="flex w-full cursor-pointer items-center gap-3 border-b border-zinc-50 px-5 py-2.5 text-left hover:bg-zinc-50/80 last:border-0"
          >
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-red-500/[0.08]">
              <MaterialIcon name="replay" size={16} className="text-red-500" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-[13px] font-medium">
                {rr.order} · {rr.customer}
              </div>
              <div className="text-[11px] text-zinc-400">
                {rr.reason} · {rr.date}
              </div>
            </div>
            <div className="font-mono text-[13px] font-semibold text-red-500">
              -{rr.amount}
            </div>
            <span
              className="rounded-[10px] px-2 py-0.5 text-[11px] font-medium"
              style={{ color: rr.sc, background: rr.sb }}
            >
              {rr.status}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}

export default RefundsPage;
