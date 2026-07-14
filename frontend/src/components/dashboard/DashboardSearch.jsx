import { useCallback, useEffect, useId, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import MaterialIcon from "../superadmin/MaterialIcon.jsx";

/**
 * Reusable admin command-palette search.
 * Pass `groups: [{ id, label, items: [{ id, label, description?, path?, keywords?, onSelect? }] }]`
 */
function DashboardSearch({
  groups = [],
  placeholder = "Search…",
  shortcutLabel = "⌘K",
  triggerClassName = "",
  triggerWidthClass = "w-[140px] sm:w-[200px]",
  onQueryChange,
}) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef(null);
  const listId = useId();
  const navigate = useNavigate();

  const flatItems = useMemo(() => {
    const q = query.trim().toLowerCase();
    const out = [];
    groups.forEach((group) => {
      (group.items || []).forEach((item) => {
        const hay = [item.label, item.description, ...(item.keywords || [])]
          .filter(Boolean)
          .join(" ")
          .toLowerCase();
        if (!q || hay.includes(q)) {
          out.push({ ...item, groupLabel: group.label });
        }
      });
    });
    return out;
  }, [groups, query]);

  useEffect(() => {
    onQueryChange?.(query);
  }, [query, onQueryChange]);

  useEffect(() => {
    const onKey = (e) => {
      const isMod = e.metaKey || e.ctrlKey;
      if (isMod && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen(true);
      }
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    if (open) {
      setQuery("");
      setActiveIndex(0);
      requestAnimationFrame(() => inputRef.current?.focus());
    }
  }, [open]);

  useEffect(() => {
    setActiveIndex(0);
  }, [query]);

  const runSelect = useCallback(
    (item) => {
      if (!item) return;
      setOpen(false);
      if (item.onSelect) item.onSelect(item);
      else if (item.path) navigate(item.path);
    },
    [navigate],
  );

  const onInputKeyDown = (e) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((i) => Math.min(i + 1, Math.max(flatItems.length - 1, 0)));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      runSelect(flatItems[activeIndex]);
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={`flex cursor-pointer items-center gap-1.5 rounded-md border border-slate-200 bg-slate-50 px-3 py-1.5 hover:border-slate-300 ${triggerWidthClass} ${triggerClassName}`}
      >
        <MaterialIcon name="search" size={18} className="shrink-0 text-slate-400" />
        <span className="truncate text-[13px] text-slate-400">{placeholder}</span>
        {shortcutLabel ? (
          <span className="ml-auto hidden rounded border border-slate-200 bg-white px-1.5 py-px text-[10px] font-medium text-slate-400 sm:inline">
            {shortcutLabel}
          </span>
        ) : null}
      </button>

      {open ? (
        <div className="fixed inset-0 z-[90] flex items-start justify-center px-4 pt-[12vh]">
          <button
            type="button"
            aria-label="Close search"
            className="absolute inset-0 bg-black/40"
            onClick={() => setOpen(false)}
          />
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Dashboard search"
            className="relative z-[91] w-full max-w-xl overflow-hidden rounded-xl border border-slate-200 bg-white shadow-2xl"
          >
            <div className="flex items-center gap-2 border-b border-slate-100 px-4 py-3">
              <MaterialIcon name="search" size={20} className="text-slate-400" />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={onInputKeyDown}
                placeholder={placeholder}
                className="w-full bg-transparent text-sm text-slate-900 outline-none placeholder:text-slate-400"
                aria-controls={listId}
                aria-autocomplete="list"
              />
              <kbd className="rounded border border-slate-200 px-1.5 py-0.5 text-[10px] text-slate-400">
                ESC
              </kbd>
            </div>

            <div id={listId} role="listbox" className="max-h-[50vh] overflow-y-auto p-2">
              {flatItems.length === 0 ? (
                <div className="px-3 py-8 text-center text-[13px] text-slate-500">
                  No matches for “{query}”
                </div>
              ) : (
                flatItems.map((item, idx) => (
                  <button
                    key={item.id || `${item.label}-${idx}`}
                    type="button"
                    role="option"
                    aria-selected={idx === activeIndex}
                    onMouseEnter={() => setActiveIndex(idx)}
                    onClick={() => runSelect(item)}
                    className={`flex w-full cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5 text-left ${
                      idx === activeIndex ? "bg-emerald-50" : "hover:bg-slate-50"
                    }`}
                  >
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-slate-100">
                      <MaterialIcon
                        name={item.icon || "search"}
                        size={18}
                        className="text-slate-500"
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="truncate text-[13px] font-medium text-slate-900">
                        {item.label}
                      </div>
                      <div className="truncate text-[11px] text-slate-500">
                        {item.description || item.groupLabel}
                      </div>
                    </div>
                    {item.path ? (
                      <span className="truncate text-[10px] text-slate-400">
                        {item.path}
                      </span>
                    ) : null}
                  </button>
                ))
              )}
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}

export default DashboardSearch;
