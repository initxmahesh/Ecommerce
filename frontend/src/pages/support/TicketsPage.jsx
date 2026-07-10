import { useMemo, useState } from "react";
import { TICKET_ROWS, TICKET_TABS } from "../../data/supportAgentData.js";
import MaterialIcon from "../../components/superadmin/MaterialIcon.jsx";

function TicketsPage() {
  const [activeTab, setActiveTab] = useState("all");
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    let rows = TICKET_ROWS;
    if (activeTab !== "all") {
      rows = rows.filter((t) => t.tab === activeTab);
    }
    if (search.trim()) {
      const q = search.toLowerCase();
      rows = rows.filter(
        (t) =>
          t.subject.toLowerCase().includes(q) ||
          t.customer.toLowerCase().includes(q) ||
          t.id.toLowerCase().includes(q) ||
          t.category.toLowerCase().includes(q),
      );
    }
    return rows;
  }, [activeTab, search]);

  return (
    <div className="flex-1 p-4 md:p-5">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div className="text-lg font-bold">Ticket Queue</div>
        <button
          type="button"
          className="cursor-pointer rounded-md bg-sky-500 px-3.5 py-1.5 text-[13px] font-medium text-white hover:bg-sky-600"
        >
          + New Ticket
        </button>
      </div>

      <div className="mb-4 flex gap-0 overflow-x-auto border-b border-slate-200">
        {TICKET_TABS.map((tt) => {
          const active = activeTab === tt.id;
          return (
            <button
              key={tt.id}
              type="button"
              onClick={() => setActiveTab(tt.id)}
              className={`shrink-0 cursor-pointer whitespace-nowrap border-b-2 px-4 py-2 text-[13px] font-medium transition-colors ${
                active
                  ? "border-sky-500 text-sky-500"
                  : "border-transparent text-slate-500 hover:text-slate-900"
              }`}
            >
              {tt.label}{" "}
              <span className="rounded-[10px] bg-slate-100 px-1.5 py-px text-[11px] text-slate-500">
                {tt.count}
              </span>
            </button>
          );
        })}
      </div>

      <div className="mb-4 flex flex-wrap gap-2">
        <label className="flex max-w-[260px] flex-1 items-center gap-1.5 rounded-md border border-slate-200 bg-white px-3 py-1.5">
          <MaterialIcon name="search" size={18} className="text-slate-400" />
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search tickets…"
            className="w-full bg-transparent text-[13px] text-slate-700 outline-none placeholder:text-slate-400"
          />
        </label>
        <button
          type="button"
          className="cursor-pointer rounded-md border border-slate-200 bg-white px-3 py-1.5 text-[13px] text-gray-700 hover:border-slate-300"
        >
          Priority ▾
        </button>
        <button
          type="button"
          className="cursor-pointer rounded-md border border-slate-200 bg-white px-3 py-1.5 text-[13px] text-gray-700 hover:border-slate-300"
        >
          Category ▾
        </button>
        <button
          type="button"
          className="cursor-pointer rounded-md border border-slate-200 bg-white px-3 py-1.5 text-[13px] text-gray-700 hover:border-slate-300"
        >
          Agent ▾
        </button>
      </div>

      <div className="overflow-hidden rounded-lg border border-slate-200 bg-white">
        {filtered.length === 0 ? (
          <div className="px-5 py-10 text-center text-sm text-slate-400">
            No tickets match your filters
          </div>
        ) : (
          filtered.map((tr) => (
            <div
              key={tr.id}
              className="flex cursor-pointer items-center gap-3 border-b border-slate-50 px-5 py-3 hover:bg-slate-50/80"
            >
              <div
                className="h-9 w-1 shrink-0 rounded-sm"
                style={{ background: tr.priBar }}
              />
              <div className="min-w-0 flex-1">
                <div className="mb-0.5 flex items-center gap-2">
                  <span className="shrink-0 font-mono text-xs font-medium text-sky-500">
                    {tr.id}
                  </span>
                  <span className="truncate text-[13px] font-medium">
                    {tr.subject}
                  </span>
                </div>
                <div className="text-xs text-slate-500">
                  {tr.customer} · {tr.category} · {tr.time}
                </div>
              </div>
              <span
                className="hidden whitespace-nowrap rounded-[10px] px-2 py-0.5 text-[11px] font-medium sm:inline"
                style={{ color: tr.sc, background: tr.sb }}
              >
                {tr.status}
              </span>
              {tr.sla ? (
                <span
                  className="hidden whitespace-nowrap rounded px-1.5 py-0.5 font-mono text-[10px] font-semibold md:inline"
                  style={{ color: tr.slaC, background: tr.slaBg }}
                >
                  {tr.sla}
                </span>
              ) : null}
              <div
                className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full"
                style={{ background: tr.agentBg }}
                title={tr.agent}
              >
                <span className="text-[9px] font-semibold text-white">
                  {tr.agentInit}
                </span>
              </div>
            </div>
          ))
        )}

        <div className="flex items-center justify-between border-t border-slate-200 px-5 py-3">
          <div className="text-xs text-slate-500">
            1–{filtered.length} of 47 tickets
          </div>
          <div className="flex gap-1">
            <span className="rounded bg-sky-500 px-2.5 py-1 text-xs font-medium text-white">
              1
            </span>
            <button
              type="button"
              className="cursor-pointer rounded bg-slate-100 px-2.5 py-1 text-xs text-gray-700 hover:bg-slate-200"
            >
              2
            </button>
            <button
              type="button"
              className="cursor-pointer rounded bg-slate-100 px-2.5 py-1 text-xs text-gray-700 hover:bg-slate-200"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TicketsPage;
