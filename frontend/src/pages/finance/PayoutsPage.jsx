import { PAYOUT_KPIS, PAYOUT_ROWS } from "../../data/financeData.js";
import MaterialIcon from "../../components/superadmin/MaterialIcon.jsx";

function PayoutsPage() {
  return (
    <div className="flex-1 p-4 md:p-6">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div className="text-xl font-bold">Vendor Payouts</div>
        <div className="flex gap-2">
          <button
            type="button"
            className="cursor-pointer rounded-md border border-zinc-200 bg-white px-3.5 py-1.5 text-[13px] hover:border-zinc-300"
          >
            Schedule payout
          </button>
          <button
            type="button"
            className="cursor-pointer rounded-md bg-[#635bff] px-3.5 py-1.5 text-[13px] font-medium text-white hover:bg-indigo-600"
          >
            Process all
          </button>
        </div>
      </div>

      <div className="mb-4 grid grid-cols-[repeat(auto-fill,minmax(160px,1fr))] gap-3">
        {PAYOUT_KPIS.map((pk) => (
          <div
            key={pk.label}
            className="rounded-lg border border-zinc-200 bg-white px-3.5 py-3"
          >
            <div className="mb-1 text-[11px] text-zinc-500">{pk.label}</div>
            <div
              className="font-mono text-xl font-bold"
              style={{ color: pk.vc }}
            >
              {pk.value}
            </div>
          </div>
        ))}
      </div>

      <div className="overflow-hidden rounded-lg border border-zinc-200 bg-white">
        <div className="border-b border-zinc-200 px-5 py-3.5 text-sm font-semibold">
          Upcoming Payouts
        </div>
        {PAYOUT_ROWS.map((pr) => (
          <button
            key={pr.vendor}
            type="button"
            className="flex w-full cursor-pointer items-center gap-3 border-b border-zinc-50 px-5 py-2.5 text-left hover:bg-zinc-50/80 last:border-0"
          >
            <div
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg"
              style={{ background: pr.bg }}
            >
              <MaterialIcon
                name="storefront"
                size={16}
                style={{ color: pr.ic }}
              />
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-[13px] font-medium">{pr.vendor}</div>
              <div className="text-[11px] text-zinc-400">
                {pr.period} · {pr.method}
              </div>
            </div>
            <div className="font-mono text-sm font-semibold">{pr.amount}</div>
            <span
              className="rounded-[10px] px-2 py-0.5 text-[11px] font-medium"
              style={{ color: pr.sc, background: pr.sb }}
            >
              {pr.status}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}

export default PayoutsPage;
