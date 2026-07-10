import { useState } from "react";
import {
  ANALYTICS_KPIS,
  FUNNEL,
  REV_TREND,
  TOP_CATS,
} from "../../data/superadminData.js";
import { useSuperAdminUi } from "../../context/superAdminUiContext.js";

const RANGES = ["7d", "30d", "90d", "1y"];

function AnalyticsPage() {
  const { isMobile, isTablet } = useSuperAdminUi();
  const [range, setRange] = useState("7d");
  const twoCol = isMobile || isTablet;

  return (
    <div className="flex-1 p-4 md:p-6">
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <div className="text-xl font-bold">Analytics</div>
        <div className="flex gap-0.5 rounded-md bg-slate-100 p-0.5">
          {RANGES.map((r) => (
            <button
              key={r}
              type="button"
              onClick={() => setRange(r)}
              className={`cursor-pointer rounded px-3 py-1.5 text-xs ${
                range === r
                  ? "bg-white font-medium shadow-sm"
                  : "text-slate-500 hover:bg-white/60"
              }`}
            >
              {r}
            </button>
          ))}
        </div>
      </div>

      <div className="mb-5 grid grid-cols-[repeat(auto-fill,minmax(180px,1fr))] gap-3">
        {ANALYTICS_KPIS.map((ak) => (
          <div
            key={ak.label}
            className="rounded-lg border border-slate-200 bg-white p-4"
          >
            <div className="mb-2 text-xs text-slate-500">{ak.label}</div>
            <div className="mb-1 font-mono text-[22px] font-bold">{ak.value}</div>
            <span
              className="text-[11px] font-semibold"
              style={{ color: ak.cc }}
            >
              {ak.change}
            </span>
          </div>
        ))}
      </div>

      <div
        className={`mb-5 grid gap-3.5 ${twoCol ? "grid-cols-1" : "grid-cols-[3fr_2fr]"}`}
      >
        <div className="rounded-lg border border-slate-200 bg-white px-5 py-4">
          <div className="mb-4 text-sm font-semibold">Revenue Trend</div>
          <div className="flex h-40 items-end gap-1.5">
            {REV_TREND.map((rt, i) => (
              <div key={i} className="flex h-full flex-1 items-end">
                <div
                  className="w-full cursor-pointer rounded-t-sm hover:opacity-80"
                  style={{ height: rt.h, background: rt.color }}
                />
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-lg border border-slate-200 bg-white px-5 py-4">
          <div className="mb-4 text-sm font-semibold">Top Categories</div>
          {TOP_CATS.map((tc) => (
            <div key={tc.name} className="mb-3.5">
              <div className="mb-1 flex justify-between">
                <span className="text-[13px] text-gray-700">{tc.name}</span>
                <span className="font-mono text-xs font-semibold">{tc.pct}</span>
              </div>
              <div className="h-1.5 overflow-hidden rounded-[3px] bg-slate-100">
                <div
                  className="h-full rounded-[3px]"
                  style={{ width: tc.w, background: tc.color }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-lg border border-slate-200 bg-white px-5 py-4">
        <div className="mb-4 text-sm font-semibold">Platform Funnel</div>
        <div className="flex items-center gap-0">
          {FUNNEL.map((f) => (
            <div key={f.label} className="flex-1 text-center">
              <div className="mb-1 font-mono text-[22px] font-bold">{f.value}</div>
              <div className="mb-2 text-xs text-slate-500">{f.label}</div>
              <div
                className="mx-2 h-2 rounded"
                style={{ background: f.barBg }}
              >
                <div
                  className="h-full rounded"
                  style={{ width: f.barW, background: f.barC }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AnalyticsPage;
