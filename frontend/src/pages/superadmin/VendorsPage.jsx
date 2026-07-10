import { useState } from "react";
import { VENDOR_KPIS, VENDOR_ROWS } from "../../data/superadminData.js";
import KpiCard from "../../components/superadmin/KpiCard.jsx";
import MaterialIcon from "../../components/superadmin/MaterialIcon.jsx";
import StatusBadge from "../../components/superadmin/StatusBadge.jsx";

const TABS = [
  { id: "all", label: "All", count: "342" },
  { id: "active", label: "Active", count: "298" },
  { id: "pending", label: "Pending", count: "12" },
  { id: "suspended", label: "Suspended", count: "32" },
];

function VendorsPage() {
  const [tab, setTab] = useState("all");

  const rows =
    tab === "all"
      ? VENDOR_ROWS
      : VENDOR_ROWS.filter((v) => v.status.toLowerCase() === tab);

  return (
    <div className="flex-1 p-4 md:p-6">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div className="text-xl font-bold">Vendors</div>
        <div className="flex gap-2">
          <button
            type="button"
            className="cursor-pointer rounded-md border border-slate-200 bg-white px-3 py-1.5 text-[13px] text-gray-700 hover:border-slate-300"
          >
            Export
          </button>
          <button
            type="button"
            className="cursor-pointer rounded-md bg-indigo-500 px-3.5 py-1.5 text-[13px] font-medium text-white hover:bg-indigo-600"
          >
            + Invite vendor
          </button>
        </div>
      </div>

      <div className="mb-4 flex gap-0 border-b border-slate-200">
        {TABS.map((t) => {
          const active = tab === t.id;
          return (
            <button
              key={t.id}
              type="button"
              onClick={() => setTab(t.id)}
              className={`cursor-pointer border-b-2 px-4 py-2 text-[13px] font-medium hover:text-slate-900 ${
                active
                  ? "border-indigo-500 text-indigo-500"
                  : "border-transparent text-slate-500"
              }`}
            >
              {t.label}{" "}
              <span className="rounded-[10px] bg-slate-100 px-1.5 py-px text-[11px] text-slate-500">
                {t.count}
              </span>
            </button>
          );
        })}
      </div>

      <div className="mb-4 grid grid-cols-[repeat(auto-fill,minmax(155px,1fr))] gap-3">
        {VENDOR_KPIS.map((vk) => (
          <KpiCard key={vk.label} label={vk.label} value={vk.value} compact />
        ))}
      </div>

      <div className="overflow-hidden rounded-lg border border-slate-200 bg-white">
        <div className="overflow-x-auto">
          <div className="grid min-w-[640px] grid-cols-[40px_1fr_1fr_90px_90px_100px_60px] border-b border-slate-100 bg-slate-50 px-4 py-2">
            <div className="flex items-center">
              <div className="h-4 w-4 rounded-[3px] border-[1.5px] border-slate-300" />
            </div>
            {["Vendor", "Owner", "Products", "Revenue", "Status"].map((h) => (
              <div
                key={h}
                className="text-[10px] font-semibold uppercase tracking-wide text-slate-500"
              >
                {h}
              </div>
            ))}
            <div />
          </div>
          {rows.map((v) => (
            <div
              key={v.name}
              className="grid min-w-[640px] cursor-pointer grid-cols-[40px_1fr_1fr_90px_90px_100px_60px] items-center border-b border-slate-50 px-4 py-2.5 hover:bg-slate-50/80"
            >
              <div>
                <div className="h-4 w-4 rounded-[3px] border-[1.5px] border-slate-300" />
              </div>
              <div className="flex items-center gap-2.5">
                <div
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg"
                  style={{ background: v.avatarBg }}
                >
                  <MaterialIcon
                    name="storefront"
                    size={16}
                    style={{ color: v.avatarC }}
                  />
                </div>
                <div>
                  <div className="text-[13px] font-medium">{v.name}</div>
                  <div className="text-[11px] text-slate-400">{v.domain}</div>
                </div>
              </div>
              <div className="text-[13px] text-slate-500">{v.owner}</div>
              <div className="font-mono text-[13px]">{v.products}</div>
              <div className="font-mono text-[13px] font-medium">{v.revenue}</div>
              <div>
                <StatusBadge status={v.status} />
              </div>
              <div className="flex justify-center">
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
          <div className="text-xs text-slate-500">1-10 of 342 vendors</div>
          <div className="flex gap-1">
            <span className="rounded bg-indigo-500 px-2.5 py-1 text-xs font-medium text-white">
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

export default VendorsPage;
