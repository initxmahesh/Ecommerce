import { FINANCE_KPIS, FIN_BARS, FIN_TXNS } from "../../data/superadminData.js";
import MaterialIcon from "../../components/superadmin/MaterialIcon.jsx";

function RevenuePage() {
  return (
    <div className="flex-1 p-4 md:p-6">
      <div className="mb-4 text-xl font-bold">Revenue & Finance</div>

      <div className="mb-5 grid grid-cols-[repeat(auto-fill,minmax(155px,1fr))] gap-3">
        {FINANCE_KPIS.map((fk) => (
          <div
            key={fk.label}
            className="rounded-lg border border-slate-200 bg-white px-4 py-3.5"
          >
            <div className="mb-1.5 text-[11px] text-slate-500">{fk.label}</div>
            <div
              className="font-mono text-[22px] font-bold"
              style={{ color: fk.vc }}
            >
              {fk.value}
            </div>
          </div>
        ))}
      </div>

      <div className="mb-3.5 rounded-lg border border-slate-200 bg-white px-5 py-4">
        <div className="mb-4 text-sm font-semibold">Revenue Breakdown</div>
        <div className="flex h-[140px] items-end gap-2">
          {FIN_BARS.map((fb) => (
            <div
              key={fb.l}
              className="flex h-full flex-1 flex-col items-center gap-1.5"
            >
              <div className="flex w-full flex-1 items-end">
                <div
                  className="w-full cursor-pointer rounded-t-[3px] hover:opacity-80"
                  style={{ height: fb.h, background: fb.c }}
                />
              </div>
              <div className="text-[10px] text-slate-400">{fb.l}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="overflow-hidden rounded-lg border border-slate-200 bg-white">
        <div className="border-b border-slate-200 px-5 py-3.5 text-sm font-semibold">
          Recent Transactions
        </div>
        {FIN_TXNS.map((tx) => (
          <div
            key={tx.desc}
            className="flex cursor-pointer items-center gap-3 border-b border-slate-50 px-5 py-2.5 hover:bg-slate-50/80"
          >
            <div
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md"
              style={{ background: tx.bg }}
            >
              <MaterialIcon name={tx.icon} size={16} style={{ color: tx.ic }} />
            </div>
            <div className="flex-1">
              <div className="text-[13px] font-medium">{tx.desc}</div>
              <div className="text-[11px] text-slate-400">{tx.time}</div>
            </div>
            <div
              className="font-mono text-[13px] font-semibold"
              style={{ color: tx.amtC }}
            >
              {tx.amount}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RevenuePage;
