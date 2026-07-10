import { useMemo, useState } from "react";
import { CUSTOMER_ROWS } from "../../data/supportAgentData.js";
import MaterialIcon from "../../components/superadmin/MaterialIcon.jsx";

function CustomersPage() {
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    if (!search.trim()) return CUSTOMER_ROWS;
    const q = search.toLowerCase();
    return CUSTOMER_ROWS.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.email.toLowerCase().includes(q),
    );
  }, [search]);

  return (
    <div className="flex-1 p-4 md:p-5">
      <div className="mb-4 text-lg font-bold">Customer Lookup</div>

      <label className="mb-5 flex max-w-md items-center gap-1.5 rounded-md border border-slate-200 bg-white px-3.5 py-2">
        <MaterialIcon name="search" size={18} className="text-slate-400" />
        <input
          type="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by name, email, order ID…"
          className="w-full bg-transparent text-[13px] text-slate-700 outline-none placeholder:text-slate-400"
        />
      </label>

      <div className="overflow-hidden rounded-lg border border-slate-200 bg-white">
        {filtered.length === 0 ? (
          <div className="px-5 py-10 text-center text-sm text-slate-400">
            No customers found
          </div>
        ) : (
          filtered.map((cr) => (
            <button
              key={cr.email}
              type="button"
              className="flex w-full cursor-pointer items-center gap-3 border-b border-slate-50 px-5 py-3 text-left hover:bg-slate-50/80 last:border-0"
            >
              <div
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full"
                style={{ background: cr.bg }}
              >
                <span className="text-[11px] font-semibold text-white">
                  {cr.init}
                </span>
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-[13px] font-medium">{cr.name}</div>
                <div className="text-xs text-slate-500">{cr.email}</div>
              </div>
              <div className="text-right">
                <div className="font-mono text-xs font-medium">
                  {cr.orders} orders
                </div>
                <div className="text-[11px] text-slate-400">
                  {cr.tickets} tickets
                </div>
              </div>
              <MaterialIcon
                name="chevron_right"
                size={18}
                className="text-slate-300"
              />
            </button>
          ))
        )}
      </div>
    </div>
  );
}

export default CustomersPage;
