import { useMemo, useState } from "react";
import {
  ORDER_ROWS,
  ORDER_TABS,
  STATUS_STYLES,
} from "../../data/vendorOwnerData.js";
import { useVendorOwnerUi } from "../../context/vendorOwnerUiContext.js";
import MaterialIcon from "../../components/superadmin/MaterialIcon.jsx";
import StatusBadge from "../../components/superadmin/StatusBadge.jsx";
import InlineSearchField from "../../components/dashboard/InlineSearchField.jsx";
import DateRangeFilter, {
  matchesDateRange,
} from "../../components/dashboard/DateRangeFilter.jsx";
import { downloadCsv, downloadJson } from "../../utils/clientExport.js";
import ModalShell from "../../modules/import-export/components/shared/ModalShell.jsx";

function parseOrderDate(label) {
  if (!label) return null;
  if (label === "Today") {
    const d = new Date();
    d.setHours(12, 0, 0, 0);
    return d;
  }
  const withYear = `${label} ${new Date().getFullYear()}`;
  const d = new Date(withYear);
  return Number.isNaN(d.getTime()) ? null : d;
}

function OrdersExportModal({ open, onClose, rows, onNotify }) {
  const [format, setFormat] = useState("csv");

  const run = () => {
    const headers = ["id", "customer", "items", "total", "status", "date"];
    const mapped = rows.map((r) => ({
      id: r.id,
      customer: r.customer,
      items: r.items,
      total: r.total,
      status: r.status,
      date: r.date,
    }));

    if (format === "json") {
      downloadJson(`orders-export-${Date.now()}`, mapped);
    } else {
      downloadCsv(`orders-export-${Date.now()}`, headers, mapped);
    }
    onNotify?.(`Exported ${mapped.length} orders`);
    onClose?.();
  };

  return (
    <ModalShell
      open={open}
      onClose={onClose}
      title="Export orders"
      subtitle="Download the currently filtered order list"
      footer={
        <>
          <button
            type="button"
            onClick={onClose}
            className="cursor-pointer rounded-md border border-slate-200 px-3.5 py-1.5 text-[13px]"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={run}
            className="cursor-pointer rounded-md bg-emerald-500 px-3.5 py-1.5 text-[13px] font-medium text-white hover:bg-emerald-600"
          >
            Export {rows.length} orders
          </button>
        </>
      }
    >
      <div className="mb-1 text-xs font-medium text-slate-700">Format</div>
      <div className="flex gap-2">
        {[
          { id: "csv", label: "CSV" },
          { id: "json", label: "JSON" },
        ].map((fmt) => (
          <button
            key={fmt.id}
            type="button"
            onClick={() => setFormat(fmt.id)}
            className={`cursor-pointer rounded-md px-3 py-1.5 text-[13px] ${
              format === fmt.id
                ? "bg-emerald-500 text-white"
                : "border border-slate-200 bg-white"
            }`}
          >
            {fmt.label}
          </button>
        ))}
      </div>
    </ModalShell>
  );
}

function OrdersPage() {
  const [activeTab, setActiveTab] = useState("all");
  const [search, setSearch] = useState("");
  const [dateRange, setDateRange] = useState({ preset: "all" });
  const [exportOpen, setExportOpen] = useState(false);
  const { showToast } = useVendorOwnerUi();

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return ORDER_ROWS.filter((o) => {
      if (activeTab !== "all" && o.status.toLowerCase() !== activeTab) {
        return false;
      }
      if (q) {
        const hay = `${o.id} ${o.customer} ${o.items} ${o.status}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      const parsed = parseOrderDate(o.date);
      if (parsed && !matchesDateRange(parsed.toISOString(), dateRange)) {
        return false;
      }
      if (!parsed && dateRange.preset !== "all") {
        // Keep "Today" label rows when filtering today
        if (dateRange.preset === "today" && o.date === "Today") return true;
        if (dateRange.preset !== "today") return o.date === "Today" ? false : true;
      }
      return true;
    });
  }, [activeTab, search, dateRange]);

  return (
    <div className="flex-1 p-4 md:p-4">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div className="text-xl font-bold">Orders</div>
        <button
          type="button"
          onClick={() => setExportOpen(true)}
          className="cursor-pointer rounded-md border border-slate-200 bg-white px-3 py-1.5 text-[13px] text-gray-700 hover:border-slate-300"
        >
          <MaterialIcon name="download" size={14} className="align-[-2px]" />{" "}
          Export
        </button>
      </div>

      <div className="mb-4 flex gap-0 overflow-x-auto border-b border-slate-200">
        {ORDER_TABS.map((tab) => {
          const active = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`cursor-pointer whitespace-nowrap border-b-2 px-4 py-2 text-[13px] font-medium transition-colors ${
                active
                  ? "border-emerald-500 text-emerald-500"
                  : "border-transparent text-slate-500 hover:text-slate-900"
              }`}
            >
              {tab.label}{" "}
              <span className="rounded-[10px] bg-slate-100 px-1.5 py-px text-[11px] text-slate-500">
                {tab.count}
              </span>
            </button>
          );
        })}
      </div>

      <div className="mb-4 flex flex-wrap gap-2">
        <InlineSearchField
          value={search}
          onChange={setSearch}
          placeholder="Search orders…"
        />
        <DateRangeFilter value={dateRange} onChange={setDateRange} />
      </div>

      <div className="overflow-hidden rounded-lg border border-slate-200 bg-white">
        {filtered.length === 0 ? (
          <div className="px-4 py-12 text-center text-[13px] text-slate-500">
            No orders match your filters
          </div>
        ) : (
          filtered.map((o) => {
            const st = STATUS_STYLES[o.status] || {};
            return (
              <div
                key={o.id}
                className="flex cursor-pointer flex-wrap items-center gap-3 border-b border-slate-50 px-5 py-3 hover:bg-slate-50/80 last:border-0"
              >
                <div className="w-14 font-mono text-xs font-medium text-emerald-500">
                  {o.id}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-[13px] font-medium">{o.customer}</div>
                  <div className="text-[11px] text-slate-400">
                    {o.items} · {o.date}
                  </div>
                </div>
                <div className="w-[68px] font-mono text-xs font-semibold">
                  {o.total}
                </div>
                <StatusBadge status={o.status} color={st.sc} bg={st.sb} />
                {o.canFulfill ? (
                  <button
                    type="button"
                    onClick={() =>
                      showToast(`Order ${o.id} marked as fulfilled`)
                    }
                    className="cursor-pointer whitespace-nowrap rounded bg-emerald-500 px-3 py-1 text-xs font-medium text-white hover:bg-emerald-600"
                  >
                    Fulfill
                  </button>
                ) : null}
                {o.canShip ? (
                  <button
                    type="button"
                    onClick={() =>
                      showToast(`Tracking added for order ${o.id}`)
                    }
                    className="cursor-pointer whitespace-nowrap rounded bg-blue-500 px-3 py-1 text-xs font-medium text-white hover:bg-blue-600"
                  >
                    Add Tracking
                  </button>
                ) : null}
                {o.canView ? (
                  <button
                    type="button"
                    aria-label={`View order ${o.id}`}
                    className="cursor-pointer text-slate-400 hover:text-gray-700"
                  >
                    <MaterialIcon name="visibility" size={18} />
                  </button>
                ) : null}
              </div>
            );
          })
        )}
        <div className="flex items-center justify-between border-t border-slate-200 px-5 py-3">
          <div className="text-xs text-slate-500">
            Showing {filtered.length} of {ORDER_ROWS.length} orders
          </div>
        </div>
      </div>

      <OrdersExportModal
        open={exportOpen}
        onClose={() => setExportOpen(false)}
        rows={filtered}
        onNotify={showToast}
      />
    </div>
  );
}

export default OrdersPage;
