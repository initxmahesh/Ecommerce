import { PRODUCT_KPIS, PRODUCT_ROWS } from "../../data/superadminData.js";
import KpiCard from "../../components/superadmin/KpiCard.jsx";
import MaterialIcon from "../../components/superadmin/MaterialIcon.jsx";
import StatusBadge from "../../components/superadmin/StatusBadge.jsx";

function ProductsPage() {
  return (
    <div className="flex-1 p-4 md:p-6">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div className="text-xl font-bold">Products</div>
        <div className="flex gap-2">
          {["Import", "Export"].map((label) => (
            <button
              key={label}
              type="button"
              className="cursor-pointer rounded-md border border-slate-200 bg-white px-3 py-1.5 text-[13px] text-gray-700 hover:border-slate-300"
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <div className="mb-4 grid grid-cols-[repeat(auto-fill,minmax(155px,1fr))] gap-3">
        {PRODUCT_KPIS.map((pk) => (
          <KpiCard key={pk.label} label={pk.label} value={pk.value} compact />
        ))}
      </div>

      <div className="mb-4 flex flex-wrap gap-2">
        <div className="flex max-w-[280px] flex-1 items-center gap-1.5 rounded-md border border-slate-200 bg-white px-3 py-1.5 text-[13px] text-slate-500">
          <MaterialIcon name="search" size={18} />
          Search products…
        </div>
        {["Category ▾", "Vendor ▾", "Status ▾"].map((label) => (
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
          <div className="grid min-w-[680px] grid-cols-[40px_1fr_1fr_80px_80px_80px_90px_50px] border-b border-slate-100 bg-slate-50 px-4 py-2">
            <div>
              <div className="h-4 w-4 rounded-[3px] border-[1.5px] border-slate-300" />
            </div>
            {["Product", "Vendor", "Price", "Stock", "Sales", "Status"].map((h) => (
              <div
                key={h}
                className="text-[10px] font-semibold uppercase text-slate-500"
              >
                {h}
              </div>
            ))}
            <div />
          </div>
          {PRODUCT_ROWS.map((p) => (
            <div
              key={p.sku}
              className="grid min-w-[680px] cursor-pointer grid-cols-[40px_1fr_1fr_80px_80px_80px_90px_50px] items-center border-b border-slate-50 px-4 py-2.5 hover:bg-slate-50/80"
            >
              <div>
                <div className="h-4 w-4 rounded-[3px] border-[1.5px] border-slate-300" />
              </div>
              <div className="flex items-center gap-2.5">
                <div
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md"
                  style={{ background: p.imgBg }}
                >
                  <MaterialIcon
                    name={p.imgIcon}
                    size={18}
                    style={{ color: p.imgC }}
                  />
                </div>
                <div>
                  <div className="text-[13px] font-medium">{p.name}</div>
                  <div className="text-[11px] text-slate-400">{p.sku}</div>
                </div>
              </div>
              <div className="text-[13px] text-slate-500">{p.vendor}</div>
              <div className="font-mono text-xs font-medium">{p.price}</div>
              <div
                className="font-mono text-xs"
                style={{ color: p.stockC }}
              >
                {p.stock}
              </div>
              <div className="font-mono text-xs">{p.sales}</div>
              <div>
                <StatusBadge status={p.status} />
              </div>
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
      </div>
    </div>
  );
}

export default ProductsPage;
