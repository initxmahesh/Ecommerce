import { useState } from "react";
import { ORDER_ROWS } from "../../data/superadminData.js";
import MaterialIcon from "../../components/superadmin/MaterialIcon.jsx";
import StatusBadge from "../../components/superadmin/StatusBadge.jsx";

const TABS = ["All", "Processing", "Shipped", "Delivered", "Cancelled"];

function OrdersPage() {
  const [tab, setTab] = useState("All");

  const rows =
    tab === "All"
      ? ORDER_ROWS
      : ORDER_ROWS.filter((o) => o.status === tab);

  return (
    <div className="flex-1 p-4 md:p-6">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div className="text-xl font-bold">Orders</div>
        <button
          type="button"
          className="cursor-pointer rounded-md border border-slate-200 bg-white px-3 py-1.5 text-[13px] text-gray-700 hover:border-slate-300"
        >
          <MaterialIcon name="download" size={14} className="align-[-2px]" />{" "}
          Export
        </button>
      </div>

      <div className="mb-4 flex gap-0 border-b border-slate-200">
        {TABS.map((t) => {
          const active = tab === t;
          return (
            <button
              key={t}
              type="button"
              onClick={() => setTab(t)}
              className={`cursor-pointer border-b-2 px-4 py-2 text-[13px] font-medium hover:text-slate-900 ${
                active
                  ? "border-indigo-500 text-indigo-500"
                  : "border-transparent text-slate-500"
              }`}
            >
              {t}
            </button>
          );
        })}
      </div>

      <div className="mb-4 flex flex-wrap gap-2">
        <div className="flex max-w-[280px] flex-1 items-center gap-1.5 rounded-md border border-slate-200 bg-white px-3 py-1.5 text-[13px] text-slate-500">
          <MaterialIcon name="search" size={18} />
          Search orders…
        </div>
        {["Date range ▾", "Vendor ▾", "Status ▾"].map((label) => (
          <button
            key={label}
            type="button"
            className="cursor-pointer rounded-md border border-slate-200 bg-white px-3 py-1.5 text-[13px] text-gray-700 hover:border-slate-300"
          >
            {label}
          </button>
        ))}
      </div>

      <div className="overflow-hidden rounded-lg border border-slate-200 bg-white">
        <div className="overflow-x-auto">
          <div className="grid min-w-[720px] grid-cols-[40px_80px_1fr_1fr_1fr_80px_90px_70px_50px] border-b border-slate-100 bg-slate-50 px-4 py-2">
            <div>
              <div className="h-4 w-4 rounded-[3px] border-[1.5px] border-slate-300" />
            </div>
            {["Order", "Customer", "Vendor", "Items", "Total", "Status", "Date"].map(
              (h) => (
                <div
                  key={h}
                  className="text-[10px] font-semibold uppercase tracking-wide text-slate-500"
                >
                  {h}
                </div>
              ),
            )}
            <div />
          </div>
          {rows.map((o) => (
            <div
              key={o.id}
              className="grid min-w-[720px] cursor-pointer grid-cols-[40px_80px_1fr_1fr_1fr_80px_90px_70px_50px] items-center border-b border-slate-50 px-4 py-2.5 hover:bg-slate-50/80"
            >
              <div>
                <div className="h-4 w-4 rounded-[3px] border-[1.5px] border-slate-300" />
              </div>
              <div className="font-mono text-xs font-medium text-indigo-500">
                {o.id}
              </div>
              <div className="text-[13px] text-gray-700">{o.customer}</div>
              <div className="text-[13px] text-slate-500">{o.vendor}</div>
              <div className="text-[13px] text-slate-500">{o.items}</div>
              <div className="font-mono text-xs font-semibold">{o.total}</div>
              <div>
                <StatusBadge status={o.status} />
              </div>
              <div className="text-[11px] text-slate-400">{o.date}</div>
              <div className="text-center">
                <MaterialIcon
                  name="more_horiz"
                  size={18}
                  className="cursor-pointer text-slate-400 hover:text-gray-700"
                />
              </div>
            </div>
          ))}
        </div>
        <div className="flex items-center justify-between border-t border-slate-200 px-4 py-3">
          <div className="text-xs text-slate-500">1–10 of 8,432 orders</div>
          <div className="flex gap-1">
            <span className="rounded bg-indigo-500 px-2.5 py-1 text-xs font-medium text-white">
              1
            </span>
            {["2", "3", "Next"].map((p) => (
              <button
                key={p}
                type="button"
                className="cursor-pointer rounded bg-slate-100 px-2.5 py-1 text-xs text-gray-700 hover:bg-slate-200"
              >
                {p}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrdersPage;
