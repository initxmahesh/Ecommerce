import { useState } from "react";
import { Link } from "react-router-dom";
import {
  HOME_KPIS,
  HOME_TXNS,
  PERIOD_OPTIONS,
  REV_BREAKDOWN,
  VOL_BARS,
} from "../../data/financeData.js";
import { useFinanceUi } from "../../context/financeUiContext.js";
import MaterialIcon from "../../components/superadmin/MaterialIcon.jsx";

function DashboardHome() {
  const { isMobile } = useFinanceUi();
  const [period, setPeriod] = useState("7d");

  const todayDate = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="flex-1 p-4 md:p-6">
      <div className="mb-5 flex flex-wrap items-start justify-between gap-3">
        <div>
          <div className="text-xl font-bold">Financial Overview</div>
          <div className="text-[13px] text-zinc-500">{todayDate}</div>
        </div>
        <div className="flex gap-2">
          <div className="flex gap-0.5 rounded-md bg-zinc-100 p-0.5">
            {PERIOD_OPTIONS.map((opt) => (
              <button
                key={opt}
                type="button"
                onClick={() => setPeriod(opt)}
                className={`cursor-pointer rounded px-3 py-1.5 text-xs transition-colors ${
                  period === opt
                    ? "bg-white font-medium text-zinc-900 shadow-sm"
                    : "text-zinc-500 hover:bg-white/60"
                }`}
              >
                {opt}
              </button>
            ))}
          </div>
          <button
            type="button"
            className="flex cursor-pointer items-center gap-1 rounded-md bg-[#635bff] px-3.5 py-1.5 text-[13px] font-medium text-white hover:bg-indigo-600"
          >
            <MaterialIcon name="download" size={14} />
            Export
          </button>
        </div>
      </div>

      <div className="mb-5 grid grid-cols-[repeat(auto-fill,minmax(180px,1fr))] gap-3">
        {HOME_KPIS.map((k) => (
          <div
            key={k.label}
            className="rounded-lg border border-zinc-200 bg-white px-[18px] py-4"
          >
            <div className="mb-2 text-xs text-zinc-500">{k.label}</div>
            <div
              className="mb-1 font-mono text-[26px] font-bold tracking-tight"
              style={{ color: k.vc }}
            >
              {k.value}
            </div>
            <div className="flex items-center gap-1">
              <span
                className="text-[11px] font-semibold"
                style={{ color: k.cc }}
              >
                {k.change}
              </span>
              <span className="text-[10px] text-zinc-400">vs prior period</span>
            </div>
          </div>
        ))}
      </div>

      <div
        className={`mb-5 grid gap-3.5 ${isMobile ? "grid-cols-1" : "grid-cols-[3fr_2fr]"}`}
      >
        <div className="rounded-lg border border-zinc-200 bg-white px-5 py-4">
          <div className="mb-1 text-sm font-semibold">Gross Volume</div>
          <div className="mb-4 text-[11px] text-zinc-400">
            Daily transaction volume
          </div>
          <div className="flex h-[140px] items-end gap-1">
            {VOL_BARS.map((vb, i) => (
              <div
                key={i}
                className="flex h-full flex-1 items-end"
                title={`Day ${i + 1}`}
              >
                <div
                  className="w-full cursor-pointer rounded-t-sm transition-opacity hover:opacity-80"
                  style={{ height: vb.h, background: vb.c }}
                />
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-lg border border-zinc-200 bg-white px-5 py-4">
          <div className="mb-4 text-sm font-semibold">Revenue Breakdown</div>
          {REV_BREAKDOWN.map((rb) => (
            <div key={rb.label} className="mb-3.5 last:mb-0">
              <div className="mb-1 flex justify-between">
                <span className="text-[13px] text-zinc-700">{rb.label}</span>
                <span className="font-mono text-[13px] font-semibold">
                  {rb.value}
                </span>
              </div>
              <div className="h-1.5 overflow-hidden rounded-sm bg-zinc-100">
                <div
                  className="h-full rounded-sm"
                  style={{ width: rb.w, background: rb.color }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="overflow-hidden rounded-lg border border-zinc-200 bg-white">
        <div className="flex items-center justify-between border-b border-zinc-200 px-5 py-3.5">
          <span className="text-sm font-semibold">Recent Transactions</span>
          <Link
            to="/finance/transactions"
            className="cursor-pointer text-xs font-medium text-[#635bff] hover:text-indigo-600"
          >
            View all →
          </Link>
        </div>
        {HOME_TXNS.map((tx) => (
          <button
            key={tx.desc + tx.time}
            type="button"
            className="flex w-full cursor-pointer items-center gap-3 border-b border-zinc-50 px-5 py-2.5 text-left hover:bg-zinc-50/80 last:border-0"
          >
            <div
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md"
              style={{ background: tx.iconBg }}
            >
              <MaterialIcon
                name={tx.icon}
                size={16}
                style={{ color: tx.iconC }}
              />
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-[13px] font-medium">{tx.desc}</div>
              <div className="text-[11px] text-zinc-400">{tx.meta}</div>
            </div>
            <div className="text-right">
              <div
                className="font-mono text-[13px] font-semibold"
                style={{ color: tx.amtC }}
              >
                {tx.amount}
              </div>
              <div className="text-[10px] text-zinc-400">{tx.time}</div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

export default DashboardHome;
