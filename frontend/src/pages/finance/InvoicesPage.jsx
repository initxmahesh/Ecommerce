import { INVOICE_ROWS } from "../../data/financeData.js";
import MaterialIcon from "../../components/superadmin/MaterialIcon.jsx";

function InvoicesPage() {
  return (
    <div className="flex-1 p-4 md:p-6">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div className="text-xl font-bold">Invoices</div>
        <button
          type="button"
          className="cursor-pointer rounded-md bg-[#635bff] px-3.5 py-1.5 text-[13px] font-medium text-white hover:bg-indigo-600"
        >
          + Create Invoice
        </button>
      </div>

      <div className="overflow-hidden rounded-lg border border-zinc-200 bg-white">
        {INVOICE_ROWS.map((ir) => (
          <button
            key={ir.id}
            type="button"
            className="flex w-full cursor-pointer items-center gap-3 border-b border-zinc-50 px-5 py-2.5 text-left hover:bg-zinc-50/80 last:border-0"
          >
            <MaterialIcon
              name="receipt"
              size={20}
              style={{ color: ir.ic }}
            />
            <div className="min-w-0 flex-1">
              <div className="text-[13px] font-medium">
                {ir.id} · {ir.vendor}
              </div>
              <div className="text-[11px] text-zinc-400">
                {ir.date} · {ir.period}
              </div>
            </div>
            <div className="font-mono text-sm font-semibold">{ir.amount}</div>
            <span
              className="rounded-[10px] px-2 py-0.5 text-[11px] font-medium"
              style={{ color: ir.sc, background: ir.sb }}
            >
              {ir.status}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}

export default InvoicesPage;
