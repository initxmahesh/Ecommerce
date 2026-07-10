import { useMemo, useState } from "react";
import { TXN_ROWS } from "../../data/financeData.js";
import MaterialIcon from "../../components/superadmin/MaterialIcon.jsx";

function TransactionsPage() {
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    if (!search.trim()) return TXN_ROWS;
    const q = search.toLowerCase();
    return TXN_ROWS.filter(
      (t) =>
        t.id.toLowerCase().includes(q) ||
        t.desc.toLowerCase().includes(q) ||
        t.vendor.toLowerCase().includes(q) ||
        t.amount.toLowerCase().includes(q) ||
        t.status.toLowerCase().includes(q),
    );
  }, [search]);

  return (
    <div className="flex-1 p-4 md:p-6">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div className="text-xl font-bold">Transactions</div>
        <button
          type="button"
          className="flex cursor-pointer items-center gap-1 rounded-md border border-zinc-200 bg-white px-3.5 py-1.5 text-[13px] hover:border-zinc-300"
        >
          <MaterialIcon name="download" size={14} />
          Export CSV
        </button>
      </div>

      <div className="mb-4 flex flex-wrap gap-2">
        <label className="flex max-w-[260px] flex-1 items-center gap-1.5 rounded-md border border-zinc-200 bg-white px-3 py-1.5">
          <MaterialIcon name="search" size={18} className="text-zinc-400" />
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by ID, vendor, amount…"
            className="w-full bg-transparent text-[13px] text-zinc-700 outline-none placeholder:text-zinc-400"
          />
        </label>
        <button
          type="button"
          className="cursor-pointer rounded-md border border-zinc-200 bg-white px-3 py-1.5 text-[13px] text-zinc-500 hover:border-zinc-300"
        >
          Type ▾
        </button>
        <button
          type="button"
          className="cursor-pointer rounded-md border border-zinc-200 bg-white px-3 py-1.5 text-[13px] text-zinc-500 hover:border-zinc-300"
        >
          Date ▾
        </button>
        <button
          type="button"
          className="cursor-pointer rounded-md border border-zinc-200 bg-white px-3 py-1.5 text-[13px] text-zinc-500 hover:border-zinc-300"
        >
          Status ▾
        </button>
      </div>

      <div className="overflow-hidden rounded-lg border border-zinc-200 bg-white">
        <div className="overflow-x-auto">
          <div className="grid min-w-[640px] grid-cols-[100px_1fr_100px_90px_90px_80px_50px] border-b border-zinc-100 bg-zinc-50 px-4 py-2">
            <div className="text-[10px] font-semibold uppercase tracking-wide text-zinc-500">
              ID
            </div>
            <div className="text-[10px] font-semibold uppercase text-zinc-500">
              Description
            </div>
            <div className="text-[10px] font-semibold uppercase text-zinc-500">
              Amount
            </div>
            <div className="text-[10px] font-semibold uppercase text-zinc-500">
              Fee
            </div>
            <div className="text-[10px] font-semibold uppercase text-zinc-500">
              Net
            </div>
            <div className="text-[10px] font-semibold uppercase text-zinc-500">
              Status
            </div>
            <div />
          </div>

          {filtered.length === 0 ? (
            <div className="px-5 py-10 text-center text-sm text-zinc-400">
              No transactions match your search
            </div>
          ) : (
            filtered.map((t) => (
              <div
                key={t.id}
                className="grid min-w-[640px] cursor-pointer grid-cols-[100px_1fr_100px_90px_90px_80px_50px] items-center border-b border-zinc-50 px-4 py-2.5 hover:bg-zinc-50/80"
              >
                <div className="font-mono text-xs text-[#635bff]">{t.id}</div>
                <div>
                  <div className="text-[13px] font-medium">{t.desc}</div>
                  <div className="text-[11px] text-zinc-400">
                    {t.vendor} · {t.date}
                  </div>
                </div>
                <div className="font-mono text-xs font-medium">{t.amount}</div>
                <div className="font-mono text-xs text-zinc-400">{t.fee}</div>
                <div
                  className="font-mono text-xs font-semibold"
                  style={{ color: t.netC }}
                >
                  {t.net}
                </div>
                <div>
                  <span
                    className="rounded-[10px] px-2 py-0.5 text-[11px] font-medium"
                    style={{ color: t.sc, background: t.sb }}
                  >
                    {t.status}
                  </span>
                </div>
                <div className="text-center">
                  <button
                    type="button"
                    aria-label="More actions"
                    className="cursor-pointer text-zinc-400 hover:text-zinc-700"
                  >
                    <MaterialIcon name="more_horiz" size={18} />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="flex items-center justify-between border-t border-zinc-200 px-4 py-3">
          <div className="text-xs text-zinc-500">
            1–{filtered.length} of 1,247
          </div>
          <div className="flex gap-1">
            <span className="rounded bg-[#635bff] px-2.5 py-1 text-xs font-medium text-white">
              1
            </span>
            <button
              type="button"
              className="cursor-pointer rounded bg-zinc-100 px-2.5 py-1 text-xs hover:bg-zinc-200"
            >
              2
            </button>
            <button
              type="button"
              className="cursor-pointer rounded bg-zinc-100 px-2.5 py-1 text-xs hover:bg-zinc-200"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TransactionsPage;
