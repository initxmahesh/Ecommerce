import { Link } from "react-router-dom";
import {
  HOME_KPIS,
  LOW_STOCK,
  PRODUCT_STATUS,
  RECENT_ORDERS,
  SALES_BARS,
  STATUS_STYLES,
  VENDOR_PROFILE,
} from "../../data/vendorOwnerData.js";
import { useVendorOwnerUi } from "../../context/vendorOwnerUiContext.js";
import MaterialIcon from "../../components/superadmin/MaterialIcon.jsx";
import StatusBadge from "../../components/superadmin/StatusBadge.jsx";

function DashboardHome() {
  const { isMobile, isTablet } = useVendorOwnerUi();
  const wideGrid = isMobile || isTablet;

  return (
    <div className="flex-1 p-4 md:p-4">
      <div className="mb-5 flex flex-wrap items-start justify-between gap-3">
        <div>
          <div className="text-xl font-bold">{VENDOR_PROFILE.greeting}</div>
          <div className="text-[13px] text-slate-500">
            Here&apos;s what&apos;s happening with your store today
          </div>
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            className="cursor-pointer rounded-md border border-slate-200 bg-white px-3 py-1.5 text-[13px] text-gray-700 hover:border-slate-300"
          >
            Today
          </button>
          <Link
            to="/vendor/products/new"
            className="flex cursor-pointer items-center gap-1.5 rounded-md bg-emerald-500 px-3.5 py-1.5 text-[13px] font-medium text-white hover:bg-emerald-600"
          >
            <MaterialIcon name="add" size={16} />
            Add product
          </Link>
        </div>
      </div>

      <div className="mb-5 grid grid-cols-[repeat(auto-fill,minmax(180px,1fr))] gap-3.5">
        {HOME_KPIS.map((kpi) => (
          <div
            key={kpi.label}
            className="rounded-lg border border-slate-200 bg-white p-4"
          >
            <div className="mb-2 flex items-center justify-between">
              <div className="text-xs font-medium text-slate-500">
                {kpi.label}
              </div>
              <div
                className="flex h-8 w-8 items-center justify-center rounded-lg"
                style={{ background: kpi.iconBg }}
              >
                <MaterialIcon
                  name={kpi.icon}
                  size={18}
                  style={{ color: kpi.iconColor }}
                />
              </div>
            </div>
            <div className="mb-1 font-mono text-2xl font-bold tracking-tight">
              {kpi.value}
            </div>
            <div className="flex items-center gap-1">
              <span
                className="text-[11px] font-semibold"
                style={{ color: kpi.changeColor }}
              >
                {kpi.change}
              </span>
              <span className="text-[10px] text-slate-400">vs yesterday</span>
            </div>
          </div>
        ))}
      </div>

      <div
        className={`mb-5 grid gap-3.5 ${wideGrid ? "grid-cols-1" : "grid-cols-[3fr_2fr]"}`}
      >
        <div className="rounded-lg border border-slate-200 bg-white px-5 py-4">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <div className="text-sm font-semibold">Sales</div>
              <div className="text-[11px] text-slate-400">Last 7 days</div>
            </div>
            <div className="text-right">
              <div className="font-mono text-xl font-bold">$12,842</div>
              <div className="text-[11px] font-semibold text-emerald-500">
                +23.1%
              </div>
            </div>
          </div>
          <div className="flex h-[140px] items-end gap-2.5">
            {SALES_BARS.map((bar) => (
              <div
                key={bar.l}
                className="flex h-full flex-1 flex-col items-center gap-1.5"
              >
                <div className="flex w-full flex-1 items-end">
                  <div
                    className="w-full cursor-pointer rounded-t opacity-85 hover:opacity-100"
                    style={{
                      height: bar.h,
                      background: "linear-gradient(180deg, #10b981, #34d399)",
                    }}
                  />
                </div>
                <div className="text-[11px] font-medium text-slate-500">
                  {bar.l}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="overflow-hidden rounded-lg border border-slate-200 bg-white">
          <div className="flex items-center justify-between border-b border-slate-200 px-4 py-3.5">
            <div className="text-sm font-semibold">Recent Orders</div>
            <Link
              to="/vendor/orders"
              className="cursor-pointer text-xs font-medium text-emerald-500 hover:text-emerald-600"
            >
              View all →
            </Link>
          </div>
          {RECENT_ORDERS.map((ro) => {
            const st = STATUS_STYLES[ro.status] || {};
            return (
              <Link
                key={ro.id}
                to="/vendor/orders"
                className="flex cursor-pointer items-center gap-3 border-b border-slate-50 px-4 py-2.5 hover:bg-slate-50/80 last:border-0"
              >
                <div className="w-14 font-mono text-xs font-medium text-emerald-500">
                  {ro.id}
                </div>
                <div className="flex-1 text-[13px] text-gray-700">
                  {ro.customer}
                </div>
                <div className="font-mono text-xs font-medium">{ro.total}</div>
                <StatusBadge status={ro.status} color={st.sc} bg={st.sb} />
              </Link>
            );
          })}
        </div>
      </div>

      <div
        className={`grid gap-3.5 ${wideGrid ? "grid-cols-1" : "grid-cols-[3fr_2fr]"}`}
      >
        <div className="overflow-hidden rounded-lg border border-slate-200 bg-white">
          <div className="flex items-center gap-1.5 border-b border-slate-200 px-4 py-3.5">
            <MaterialIcon
              name="inventory"
              size={18}
              className="text-amber-500"
            />
            <span className="text-sm font-semibold">Low Stock Alerts</span>
            <span className="ml-auto rounded-[10px] bg-amber-500 px-1.5 py-px text-[11px] font-semibold text-white">
              4
            </span>
          </div>
          {LOW_STOCK.map((ls) => (
            <Link
              key={ls.sku}
              to="/vendor/inventory"
              className="flex cursor-pointer items-center justify-between border-b border-slate-50 px-4 py-2.5 hover:bg-slate-50/80 last:border-0"
            >
              <div>
                <div className="text-[13px] text-gray-700">{ls.name}</div>
                <div className="text-[11px] text-slate-400">SKU: {ls.sku}</div>
              </div>
              <div className="text-right">
                <div
                  className="font-mono text-[13px] font-semibold"
                  style={{ color: ls.qtyC }}
                >
                  {ls.qty} left
                </div>
                <div className="text-[10px] text-slate-400">
                  Reorder: {ls.reorder}
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="rounded-lg border border-slate-200 bg-white p-4">
          <div className="mb-3.5 text-sm font-semibold">Product Status</div>
          {PRODUCT_STATUS.map((ps) => (
            <div
              key={ps.label}
              className="flex items-center justify-between border-b border-slate-50 py-1.5 last:border-0"
            >
              <div className="flex items-center gap-2">
                <div
                  className="h-2 w-2 rounded-sm"
                  style={{ background: ps.dot }}
                />
                <span className="text-[13px] text-gray-700">{ps.label}</span>
              </div>
              <span className="font-mono text-sm font-semibold">{ps.count}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default DashboardHome;
