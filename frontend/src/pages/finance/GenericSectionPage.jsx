import { useParams } from "react-router-dom";
import { GENERIC_PAGES } from "../../data/financeData.js";
import MaterialIcon from "../../components/superadmin/MaterialIcon.jsx";

function GenericSectionPage() {
  const { section } = useParams();
  const page = GENERIC_PAGES[section] || GENERIC_PAGES.settings;

  return (
    <div className="flex-1 p-4 md:p-6">
      <div className="mb-5 text-xl font-bold">{page.title}</div>
      {page.sections.map((gs) => (
        <div
          key={gs.title}
          className="mb-3.5 overflow-hidden rounded-lg border border-zinc-200 bg-white"
        >
          <div className="flex items-center gap-2 border-b border-zinc-200 px-5 py-3.5">
            <MaterialIcon name={gs.icon} size={20} style={{ color: gs.iconC }} />
            <span className="text-sm font-semibold">{gs.title}</span>
          </div>
          {gs.items.map((gi) => (
            <button
              key={gi.title}
              type="button"
              className="flex w-full cursor-pointer items-center gap-3 border-b border-zinc-50 px-5 py-3 text-left hover:bg-zinc-50/80 last:border-0"
            >
              <div
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg"
                style={{ background: gi.bg }}
              >
                <MaterialIcon
                  name={gi.icon}
                  size={18}
                  style={{ color: gi.ic }}
                />
              </div>
              <div className="flex-1">
                <div className="text-[13px] font-medium">{gi.title}</div>
                <div className="text-xs text-zinc-500">{gi.sub}</div>
              </div>
              {gi.value ? (
                <div className="font-mono text-[13px] font-semibold">
                  {gi.value}
                </div>
              ) : null}
              <MaterialIcon
                name="chevron_right"
                size={18}
                className="text-zinc-300"
              />
            </button>
          ))}
        </div>
      ))}
    </div>
  );
}

export default GenericSectionPage;
