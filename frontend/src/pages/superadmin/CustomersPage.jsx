import { CUSTOMER_KPIS, CUSTOMER_ROWS } from "../../data/superadminData.js";
import KpiCard from "../../components/superadmin/KpiCard.jsx";
import MaterialIcon from "../../components/superadmin/MaterialIcon.jsx";

function CustomersPage() {
  return (
    <div className="flex-1 p-4 md:p-6">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div className="text-xl font-bold">Customers</div>
        <button
          type="button"
          className="cursor-pointer rounded-md border border-slate-200 bg-white px-3 py-1.5 text-[13px] text-gray-700 hover:border-slate-300"
        >
          Export
        </button>
      </div>

      <div className="mb-4 grid grid-cols-[repeat(auto-fill,minmax(155px,1fr))] gap-3">
        {CUSTOMER_KPIS.map((ck) => (
          <KpiCard key={ck.label} label={ck.label} value={ck.value} compact />
        ))}
      </div>

      <div className="overflow-hidden rounded-lg border border-slate-200 bg-white">
        <div className="overflow-x-auto">
          <div className="grid min-w-[560px] grid-cols-[1fr_1fr_80px_90px_90px_50px] border-b border-slate-100 bg-slate-50 px-4 py-2">
            {["Customer", "Email", "Orders", "Spent", "Joined"].map((h) => (
              <div
                key={h}
                className="text-[10px] font-semibold uppercase text-slate-500"
              >
                {h}
              </div>
            ))}
            <div />
          </div>
          {CUSTOMER_ROWS.map((cr) => (
            <div
              key={cr.email}
              className="grid min-w-[560px] cursor-pointer grid-cols-[1fr_1fr_80px_90px_90px_50px] items-center border-b border-slate-50 px-4 py-2.5 hover:bg-slate-50/80"
            >
              <div className="flex items-center gap-2.5">
                <div
                  className="flex h-[30px] w-[30px] shrink-0 items-center justify-center rounded-full"
                  style={{ background: cr.bg }}
                >
                  <span className="text-[11px] font-semibold text-white">
                    {cr.init}
                  </span>
                </div>
                <span className="text-[13px] font-medium">{cr.name}</span>
              </div>
              <div className="text-[13px] text-slate-500">{cr.email}</div>
              <div className="font-mono text-[13px]">{cr.orders}</div>
              <div className="font-mono text-[13px] font-medium">{cr.spent}</div>
              <div className="text-xs text-slate-400">{cr.joined}</div>
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

export default CustomersPage;
