import { Link } from "react-router-dom";
import {
  HOME_KPIS,
  MY_TICKETS,
  QUICK_ACTIONS,
  RECENT_ACTIVITY,
  SLA_METRICS,
} from "../../data/supportAgentData.js";
import { useSupportAgentUi } from "../../context/supportAgentUiContext.js";
import MaterialIcon from "../../components/superadmin/MaterialIcon.jsx";

function DashboardHome() {
  const { isMobile } = useSupportAgentUi();

  return (
    <div className="flex-1 p-4 md:p-5">
      <div className="mb-1 text-lg font-bold">Welcome back, Agent Miller</div>
      <div className="mb-5 text-[13px] text-slate-500">
        Here&apos;s your workload for today
      </div>

      <div className="mb-5 grid grid-cols-[repeat(auto-fill,minmax(155px,1fr))] gap-3">
        {HOME_KPIS.map((k) => (
          <div
            key={k.label}
            className="rounded-lg border border-slate-200 bg-white px-4 py-3.5"
          >
            <div className="mb-1.5 flex items-center gap-1.5">
              <MaterialIcon name={k.icon} size={18} style={{ color: k.ic }} />
              <span className="text-[11px] text-slate-500">{k.label}</span>
            </div>
            <div
              className="font-mono text-2xl font-bold"
              style={{ color: k.vc }}
            >
              {k.value}
            </div>
          </div>
        ))}
      </div>

      <div
        className={`mb-5 grid gap-3.5 ${isMobile ? "grid-cols-1" : "grid-cols-[3fr_2fr]"}`}
      >
        <div className="overflow-hidden rounded-lg border border-slate-200 bg-white">
          <div className="flex items-center justify-between border-b border-slate-200 px-5 py-3.5">
            <span className="text-sm font-semibold">My Open Tickets</span>
            <Link
              to="/support/tickets"
              className="cursor-pointer text-xs font-medium text-sky-500 hover:text-sky-600"
            >
              View all →
            </Link>
          </div>
          {MY_TICKETS.map((t) => (
            <div
              key={t.subject}
              className="flex cursor-pointer items-center gap-3 border-b border-slate-50 px-5 py-2.5 hover:bg-slate-50/80"
            >
              <div
                className="h-2 w-2 shrink-0 rounded-full"
                style={{ background: t.priDot }}
              />
              <div className="min-w-0 flex-1">
                <div className="truncate text-[13px] font-medium">
                  {t.subject}
                </div>
                <div className="text-[11px] text-slate-400">
                  {t.customer} · {t.time}
                </div>
              </div>
              {t.sla ? (
                <span
                  className="whitespace-nowrap rounded px-1.5 py-0.5 font-mono text-[10px] font-semibold"
                  style={{ color: t.slaC, background: t.slaBg }}
                >
                  {t.sla}
                </span>
              ) : null}
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-3.5">
          <div className="rounded-lg border border-slate-200 bg-white p-4">
            <div className="mb-3 text-sm font-semibold">SLA Performance</div>
            {SLA_METRICS.map((s) => (
              <div key={s.label} className="mb-3 last:mb-0">
                <div className="mb-1 flex justify-between">
                  <span className="text-xs text-gray-700">{s.label}</span>
                  <span
                    className="font-mono text-xs font-semibold"
                    style={{ color: s.vc }}
                  >
                    {s.value}
                  </span>
                </div>
                <div className="h-1.5 overflow-hidden rounded-sm bg-slate-100">
                  <div
                    className="h-full rounded-sm"
                    style={{ width: s.barW, background: s.barC }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="rounded-lg border border-slate-200 bg-white p-4">
            <div className="mb-3 text-sm font-semibold">Quick Actions</div>
            <div className="flex flex-wrap gap-2">
              {QUICK_ACTIONS.map((qa) => (
                <Link
                  key={qa.label}
                  to={qa.path}
                  className="flex cursor-pointer items-center gap-1.5 rounded-md border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-gray-700 hover:border-slate-300 hover:bg-slate-100"
                >
                  <MaterialIcon
                    name={qa.icon}
                    size={16}
                    style={{ color: qa.ic }}
                  />
                  {qa.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="overflow-hidden rounded-lg border border-slate-200 bg-white">
        <div className="border-b border-slate-200 px-5 py-3.5 text-sm font-semibold">
          Recent Activity
        </div>
        {RECENT_ACTIVITY.map((ra) => (
          <div
            key={ra.text}
            className="flex gap-3 border-b border-slate-50 px-5 py-2.5 last:border-0"
          >
            <div
              className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md"
              style={{ background: ra.bg }}
            >
              <MaterialIcon name={ra.icon} size={15} style={{ color: ra.ic }} />
            </div>
            <div>
              <div className="text-[13px] text-gray-700">{ra.text}</div>
              <div className="text-[11px] text-slate-400">{ra.time}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DashboardHome;
