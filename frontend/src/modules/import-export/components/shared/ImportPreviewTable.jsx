function ImportPreviewTable({ columns = [], rows = [] }) {
  const keys = columns.map((c) => c.key).slice(0, 8);

  if (!rows.length) {
    return (
      <div className="rounded-lg border border-slate-200 bg-slate-50 px-4 py-6 text-center text-[13px] text-slate-500">
        No preview rows
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-lg border border-slate-200">
      <div className="overflow-x-auto">
        <table className="min-w-full text-left text-[12px]">
          <thead className="bg-slate-50 text-[10px] uppercase text-slate-500">
            <tr>
              {keys.map((k) => (
                <th key={k} className="whitespace-nowrap px-3 py-2 font-semibold">
                  {k}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.slice(0, 20).map((row, idx) => (
              <tr key={idx} className="border-t border-slate-50">
                {keys.map((k) => (
                  <td key={k} className="max-w-[160px] truncate px-3 py-2">
                    {String(row[k] ?? "")}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ImportPreviewTable;
