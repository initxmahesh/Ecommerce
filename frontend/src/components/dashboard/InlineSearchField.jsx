import MaterialIcon from "../superadmin/MaterialIcon.jsx";

/**
 * Compact inline search field for page toolbars (not the global palette).
 */
function InlineSearchField({
  value,
  onChange,
  placeholder = "Search…",
  className = "",
}) {
  return (
    <div
      className={`flex max-w-[280px] flex-1 items-center gap-1.5 rounded-md border border-slate-200 bg-white px-3 py-1.5 text-[13px] text-slate-500 focus-within:border-emerald-500 focus-within:ring-[3px] focus-within:ring-emerald-500/10 ${className}`}
    >
      <MaterialIcon name="search" size={18} className="shrink-0 text-slate-400" />
      <input
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full min-w-0 bg-transparent text-[13px] text-slate-800 outline-none placeholder:text-slate-400"
      />
      {value ? (
        <button
          type="button"
          aria-label="Clear search"
          onClick={() => onChange("")}
          className="cursor-pointer text-slate-400 hover:text-slate-600"
        >
          <MaterialIcon name="close" size={16} />
        </button>
      ) : null}
    </div>
  );
}

export default InlineSearchField;
