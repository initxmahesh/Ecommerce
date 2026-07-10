import { useMemo, useState } from "react";
import { KB_CATEGORIES } from "../../data/supportAgentData.js";
import MaterialIcon from "../../components/superadmin/MaterialIcon.jsx";

function KnowledgeBasePage() {
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    if (!search.trim()) return KB_CATEGORIES;
    const q = search.toLowerCase();
    return KB_CATEGORIES.filter(
      (kb) =>
        kb.title.toLowerCase().includes(q) ||
        kb.desc.toLowerCase().includes(q),
    );
  }, [search]);

  return (
    <div className="flex-1 p-4 md:p-5">
      <div className="mb-4 text-lg font-bold">Knowledge Base</div>

      <label className="mb-5 flex max-w-md items-center gap-1.5 rounded-md border border-slate-200 bg-white px-3.5 py-2">
        <MaterialIcon name="search" size={18} className="text-slate-400" />
        <input
          type="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search articles, macros, FAQs…"
          className="w-full bg-transparent text-[13px] text-slate-700 outline-none placeholder:text-slate-400"
        />
      </label>

      <div className="grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-3.5">
        {filtered.map((kb) => (
          <button
            key={kb.title}
            type="button"
            className="cursor-pointer rounded-lg border border-slate-200 bg-white p-5 text-left transition-shadow hover:shadow-md"
          >
            <div
              className="mb-3 flex h-10 w-10 items-center justify-center rounded-[10px]"
              style={{ background: kb.bg }}
            >
              <MaterialIcon
                name={kb.icon}
                size={22}
                style={{ color: kb.ic }}
              />
            </div>
            <div className="mb-1 text-sm font-semibold">{kb.title}</div>
            <div className="mb-2 text-xs text-slate-500">{kb.desc}</div>
            <div className="text-[11px] text-slate-400">
              {kb.articles} articles
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

export default KnowledgeBasePage;
