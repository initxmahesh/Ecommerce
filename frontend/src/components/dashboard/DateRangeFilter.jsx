import { useEffect, useRef, useState } from "react";
import MaterialIcon from "../superadmin/MaterialIcon.jsx";

export const DATE_RANGE_PRESETS = [
  { id: "all", label: "All time" },
  { id: "today", label: "Today" },
  { id: "7d", label: "Last 7 days" },
  { id: "30d", label: "Last 30 days" },
  { id: "custom", label: "Custom range" },
];

/**
 * Reusable date-range filter dropdown.
 * value: { preset, from?: 'YYYY-MM-DD', to?: 'YYYY-MM-DD' }
 */
function DateRangeFilter({
  value = { preset: "all" },
  onChange,
  presets = DATE_RANGE_PRESETS,
  buttonClassName = "",
}) {
  const [open, setOpen] = useState(false);
  const [draftFrom, setDraftFrom] = useState(value.from || "");
  const [draftTo, setDraftTo] = useState(value.to || "");
  const rootRef = useRef(null);

  useEffect(() => {
    const onDoc = (e) => {
      if (!rootRef.current?.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  const activePreset = presets.find((p) => p.id === value.preset) || presets[0];
  const label =
    value.preset === "custom" && value.from && value.to
      ? `${value.from} → ${value.to}`
      : activePreset.label;

  const selectPreset = (preset) => {
    if (preset.id === "custom") {
      onChange?.({
        preset: "custom",
        from: draftFrom || value.from || "",
        to: draftTo || value.to || "",
      });
      return;
    }
    onChange?.({ preset: preset.id, from: undefined, to: undefined });
    setOpen(false);
  };

  const applyCustom = () => {
    if (!draftFrom || !draftTo) return;
    onChange?.({ preset: "custom", from: draftFrom, to: draftTo });
    setOpen(false);
  };

  return (
    <div ref={rootRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className={`flex cursor-pointer items-center gap-1.5 rounded-md border border-slate-200 bg-white px-3 py-1.5 text-[13px] text-gray-700 hover:border-slate-300 ${buttonClassName}`}
      >
        <MaterialIcon
          name="calendar_month"
          size={16}
          className="text-slate-400"
        />
        {label}
        <MaterialIcon name="expand_more" size={16} className="text-slate-400" />
      </button>

      {open ? (
        <div className="absolute right-0 z-30 mt-1.5 w-56 rounded-lg border border-slate-200 bg-white p-2 shadow-lg">
          {presets.map((preset) => (
            <button
              key={preset.id}
              type="button"
              onClick={() => selectPreset(preset)}
              className={`flex w-full cursor-pointer items-center justify-between rounded-md px-3 py-2 text-left text-[13px] ${
                value.preset === preset.id
                  ? "bg-emerald-50 font-medium text-emerald-700"
                  : "text-slate-700 hover:bg-slate-50"
              }`}
            >
              {preset.label}
              {value.preset === preset.id ? (
                <MaterialIcon name="check" size={16} />
              ) : null}
            </button>
          ))}

          {value.preset === "custom" ||
          presets.some((p) => p.id === "custom") ? (
            <div className="mt-2 space-y-2 border-t border-slate-100 px-2 pt-2">
              <label className="block text-[11px] font-medium text-slate-500">
                From
                <input
                  type="date"
                  value={draftFrom}
                  onChange={(e) => setDraftFrom(e.target.value)}
                  className="mt-1 w-full rounded-md border border-slate-200 px-2 py-1.5 text-[13px] outline-none focus:border-emerald-500"
                />
              </label>
              <label className="block text-[11px] font-medium text-slate-500">
                To
                <input
                  type="date"
                  value={draftTo}
                  onChange={(e) => setDraftTo(e.target.value)}
                  className="mt-1 w-full rounded-md border border-slate-200 px-2 py-1.5 text-[13px] outline-none focus:border-emerald-500"
                />
              </label>
              <button
                type="button"
                onClick={applyCustom}
                disabled={!draftFrom || !draftTo}
                className="w-full cursor-pointer rounded-md bg-emerald-500 px-3 py-1.5 text-[13px] font-medium text-white hover:bg-emerald-600 disabled:opacity-50"
              >
                Apply range
              </button>
            </div>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}

/** Returns true if ISO date or relative label matches the selected range. */
export function matchesDateRange(dateValue, range, now = new Date()) {
  if (!range || range.preset === "all") return true;

  const parse = (v) => {
    if (!v) return null;
    if (v === "Today") {
      const d = new Date(now);
      d.setHours(0, 0, 0, 0);
      return d;
    }
    const d = new Date(v);
    return Number.isNaN(d.getTime()) ? null : d;
  };

  const date = parse(dateValue);
  if (!date) return true;

  const startOfDay = (d) => {
    const x = new Date(d);
    x.setHours(0, 0, 0, 0);
    return x;
  };
  const endOfDay = (d) => {
    const x = new Date(d);
    x.setHours(23, 59, 59, 999);
    return x;
  };

  if (range.preset === "today") {
    return date >= startOfDay(now) && date <= endOfDay(now);
  }

  const days = { "7d": 7, "30d": 30, "90d": 90 }[range.preset];
  if (days) {
    const from = startOfDay(now);
    from.setDate(from.getDate() - (days - 1));
    return date >= from && date <= endOfDay(now);
  }

  if (range.preset === "custom" && range.from && range.to) {
    return date >= startOfDay(range.from) && date <= endOfDay(range.to);
  }

  return true;
}

export default DateRangeFilter;
