function ColumnMapper({ columns = [], headers = [], mapping = {}, onChange }) {
  return (
    <div className="space-y-2">
      <div className="grid grid-cols-[1fr_1fr] gap-3 px-1 text-[10px] font-semibold uppercase text-slate-500">
        <div>System field</div>
        <div>File column</div>
      </div>
      {columns.map((col) => (
        <div
          key={col.key}
          className="grid grid-cols-[1fr_1fr] items-center gap-3 rounded-md border border-slate-100 bg-white px-3 py-2"
        >
          <div>
            <div className="text-[13px] font-medium">
              {col.label || col.key}
              {col.required ? <span className="text-red-500"> *</span> : null}
            </div>
            <div className="text-[11px] text-slate-400">{col.key}</div>
          </div>
          <select
            value={mapping[col.key] || ""}
            onChange={(e) =>
              onChange({ ...mapping, [col.key]: e.target.value || null })
            }
            className="w-full rounded-md border border-slate-200 bg-white px-2 py-1.5 text-[13px] outline-none focus:border-emerald-500"
          >
            <option value="">— Not mapped —</option>
            {headers.map((h) => (
              <option key={h} value={h}>
                {h}
              </option>
            ))}
          </select>
        </div>
      ))}
    </div>
  );
}

export default ColumnMapper;
