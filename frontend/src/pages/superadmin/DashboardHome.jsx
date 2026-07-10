import { Link } from "react-router-dom";
import {
  ACTIVITIES,
  DASH_KPIS,
  DASH_ORDERS,
  ORDER_STATUSES,
  REV_BARS,
  SYS_HEALTH,
} from "../../data/superadminData.js";
import { useSuperAdminUi } from "../../context/superAdminUiContext.js";
import KpiCard from "../../components/superadmin/KpiCard.jsx";
import MaterialIcon from "../../components/superadmin/MaterialIcon.jsx";
import StatusBadge from "../../components/superadmin/StatusBadge.jsx";

function DashboardHome() {
  const { isMobile, isTablet } = useSuperAdminUi();
  const wideGrid = isMobile || isTablet;
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
          <div className="text-xl font-bold">Platform Overview</div>
          <div className="text-[13px] text-slate-500">{todayDate}</div>
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            className="flex cursor-pointer items-center gap-1.5 rounded-md border border-slate-200 bg-white px-3 py-1.5 text-[13px] text-gray-700 hover:border-slate-300"
          >
            Last 30 days ▾
          </button>
          <button
            type="button"
            className="flex cursor-pointer items-center gap-1.5 rounded-md bg-indigo-500 px-3.5 py-1.5 text-[13px] font-medium text-white hover:bg-indigo-600"
          >
            <MaterialIcon name="download" size={16} />
            Export
          </button>
        </div>
      </div>

      <div className="mb-5 flex flex-wrap gap-2.5">
        <Link
          to="/superadmin/vendors"
          className="flex min-w-[240px] flex-1 cursor-pointer items-center gap-2.5 rounded-md border border-amber-500/20 bg-amber-500/[0.07] px-3.5 py-2.5"
        >
          <MaterialIcon name="pending_actions" size={18} className="text-amber-600" />
          <span className="text-[13px] text-amber-900">
            12 vendor applications pending
          </span>
          <span className="ml-auto text-xs font-semibold text-amber-600">
            Review →
          </span>
        </Link>
        <Link
          to="/superadmin/moderation"
          className="flex min-w-[240px] flex-1 cursor-pointer items-center gap-2.5 rounded-md border border-red-500/15 bg-red-500/[0.05] px-3.5 py-2.5"
        >
          <MaterialIcon name="flag" size={18} className="text-red-600" />
          <span className="text-[13px] text-red-900">
            5 products flagged for moderation
          </span>
          <span className="ml-auto text-xs font-semibold text-red-600">
            Review →
          </span>
        </Link>
      </div>

      <div className="mb-5 grid grid-cols-[repeat(auto-fill,minmax(155px,1fr))] gap-3">
        {DASH_KPIS.map((k) => (
          <KpiCard
            key={k.label}
            label={k.label}
            value={k.value}
            change={k.change}
            changeColor={k.cc}
          />
        ))}
      </div>

      <div
        className={`mb-5 grid gap-3.5 ${wideGrid ? "grid-cols-1" : "grid-cols-[7fr_3fr]"}`}
      >
        <div className="rounded-lg border border-slate-200 bg-white px-5 py-4">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <div className="text-sm font-semibold">Revenue Overview</div>
              <div className="text-[11px] text-slate-400">Monthly · current year</div>
            </div>
            <div className="flex gap-0.5">
              <span className="rounded bg-indigo-500 px-2.5 py-1 text-[11px] font-medium text-white">
                Revenue
              </span>
              <button
                type="button"
                className="cursor-pointer rounded bg-slate-100 px-2.5 py-1 text-[11px] text-slate-500 hover:bg-slate-200"
              >
                Orders
              </button>
            </div>
          </div>
          <div className="flex h-[150px] items-end gap-2">
            {REV_BARS.map((b) => (
              <div
                key={b.l}
                className="flex h-full flex-1 flex-col items-center gap-1.5"
              >
                <div className="flex w-full flex-1 items-end">
                  <div
                    className="w-full cursor-pointer rounded-t-[3px] hover:opacity-80"
                    style={{ height: b.h, background: b.bg }}
                  />
                </div>
                <div className="text-[10px] font-medium text-slate-400">{b.l}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-lg border border-slate-200 bg-white px-5 py-4">
          <div className="mb-4 text-sm font-semibold">Order Status</div>
          <div className="mb-4 flex justify-center">
            <div
              className="relative h-[110px] w-[110px] rounded-full"
              style={{
                background:
                  "conic-gradient(#10b981 0% 35%, #3b82f6 35% 55%, #f59e0b 55% 75%, #6366f1 75% 90%, #ef4444 90% 100%)",
              }}
            >
              <div className="absolute left-1/2 top-1/2 flex h-[66px] w-[66px] -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full bg-white">
                <div className="font-mono text-base font-bold">8,432</div>
                <div className="text-[9px] text-slate-400">Total</div>
              </div>
            </div>
          </div>
          {ORDER_STATUSES.map((s) => (
            <div
              key={s.label}
              className="flex items-center justify-between py-1"
            >
              <div className="flex items-center gap-2">
                <div
                  className="h-2 w-2 rounded-sm"
                  style={{ background: s.color }}
                />
                <span className="text-xs text-gray-700">{s.label}</span>
              </div>
              <span className="font-mono text-xs font-semibold">{s.value}</span>
            </div>
          ))}
        </div>
      </div>

      <div className={`grid gap-3.5 ${wideGrid ? "grid-cols-1" : "grid-cols-[7fr_3fr]"}`}>
        <div className="overflow-hidden rounded-lg border border-slate-200 bg-white">
          <div className="flex items-center justify-between border-b border-slate-200 px-5 py-3.5">
            <div className="text-sm font-semibold">Recent Orders</div>
            <Link
              to="/superadmin/orders"
              className="cursor-pointer text-xs font-medium text-indigo-500 hover:text-indigo-600"
            >
              View all →
            </Link>
          </div>
          {DASH_ORDERS.map((o) => (
            <div
              key={o.id}
              className="flex cursor-pointer items-center gap-3 border-b border-slate-50 px-5 py-2.5 hover:bg-slate-50/80"
            >
              <div className="w-14 shrink-0 font-mono text-xs font-medium text-indigo-500">
                {o.id}
              </div>
              <div className="flex-1 text-[13px] text-gray-700">{o.customer}</div>
              <div className="w-[68px] font-mono text-xs font-medium">{o.amount}</div>
              <StatusBadge status={o.status} />
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-3.5">
          <div className="overflow-hidden rounded-lg border border-slate-200 bg-white">
            <div className="border-b border-slate-200 px-4 py-3.5 text-sm font-semibold">
              Activity
            </div>
            {ACTIVITIES.map((a) => (
              <div
                key={a.text}
                className="flex cursor-pointer gap-2.5 px-4 py-2 hover:bg-slate-50/80"
              >
                <div
                  className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md"
                  style={{ background: a.bg }}
                >
                  <MaterialIcon name={a.icon} size={15} style={{ color: a.c }} />
                </div>
                <div>
                  <div className="text-xs text-gray-700">{a.text}</div>
                  <div className="text-[10px] text-slate-400">{a.time}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="rounded-lg border border-slate-200 bg-white px-4 py-3.5">
            <div className="mb-2.5 text-sm font-semibold">System Health</div>
            {SYS_HEALTH.map((h) => (
              <div
                key={h.label}
                className="flex items-center justify-between border-b border-slate-50 py-1.5 last:border-0"
              >
                <div className="flex items-center gap-2">
                  <div
                    className="h-1.5 w-1.5 rounded-full"
                    style={{ background: h.dot }}
                  />
                  <span className="text-xs text-gray-700">{h.label}</span>
                </div>
                <span
                  className="font-mono text-[11px] font-medium"
                  style={{ color: h.vc }}
                >
                  {h.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardHome;
