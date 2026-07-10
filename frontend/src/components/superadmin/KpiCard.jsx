function KpiCard({ label, value, change, changeColor, valueColor, compact = false }) {
  return (
    <div
      className={`rounded-lg border border-slate-200 bg-white ${
        compact ? "px-3.5 py-3" : "px-4 py-3.5"
      }`}
    >
      <div
        className={`font-medium uppercase tracking-[0.3px] text-slate-500 ${
          compact ? "mb-1 text-[11px] normal-case tracking-normal" : "mb-1.5 text-[11px]"
        }`}
      >
        {label}
      </div>
      <div
        className={`font-mono font-bold tracking-tight ${
          compact ? "text-xl" : "mb-1 text-[22px]"
        }`}
        style={{ color: valueColor || "#0f172a" }}
      >
        {value}
      </div>
      {change ? (
        <div className="flex items-center gap-1">
          <span className="text-[11px] font-semibold" style={{ color: changeColor }}>
            {change}
          </span>
          <span className="text-[10px] text-slate-400">vs last month</span>
        </div>
      ) : null}
    </div>
  );
}

export default KpiCard;
