function ErrorTable({ errors = [], maxRows = 50 }) {
  if (!errors.length) {
    return (
      <div className="rounded-lg border border-slate-200 bg-slate-50 px-4 py-6 text-center text-[13px] text-slate-500">
        No validation errors
      </div>
    );
  }

  const rows = errors.slice(0, maxRows);

  return (
    <div className="overflow-hidden rounded-lg border border-slate-200">
      <div className="overflow-x-auto">
        <table className="min-w-full text-left text-[12px]">
          <thead className="bg-slate-50 text-[10px] uppercase text-slate-500">
            <tr>
              <th className="px-3 py-2 font-semibold">Row</th>
              <th className="px-3 py-2 font-semibold">Column</th>
              <th className="px-3 py-2 font-semibold">Value</th>
              <th className="px-3 py-2 font-semibold">Reason</th>
              <th className="px-3 py-2 font-semibold">Severity</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((err, idx) => (
              <tr key={`${err.row}-${err.column}-${idx}`} className="border-t border-slate-50">
                <td className="px-3 py-2 font-mono">{err.row}</td>
                <td className="px-3 py-2">{err.column}</td>
                <td className="max-w-[140px] truncate px-3 py-2 font-mono text-slate-600">
                  {String(err.invalidValue ?? "")}
                </td>
                <td className="px-3 py-2 text-slate-600">{err.reason}</td>
                <td className="px-3 py-2">
                  <span
                    className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${
                      err.severity === "warning"
                        ? "bg-amber-50 text-amber-700"
                        : "bg-red-50 text-red-600"
                    }`}
                  >
                    {err.severity}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {errors.length > maxRows ? (
        <div className="border-t border-slate-100 px-3 py-2 text-[11px] text-slate-400">
          Showing {maxRows} of {errors.length} issues
        </div>
      ) : null}
    </div>
  );
}

export default ErrorTable;
