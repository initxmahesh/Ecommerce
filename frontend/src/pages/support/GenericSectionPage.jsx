import { useParams } from "react-router-dom";
import { GENERIC_PAGES } from "../../data/supportAgentData.js";
import MaterialIcon from "../../components/superadmin/MaterialIcon.jsx";

function GenericSectionPage() {
  const { section } = useParams();
  const page = GENERIC_PAGES[section] || GENERIC_PAGES.settings;

  return (
    <div className="flex-1 p-4 md:p-5">
      <div className="mb-5 text-lg font-bold">{page.title}</div>
      {page.sections.map((gs) => (
        <div
          key={gs.title}
          className="mb-3.5 overflow-hidden rounded-lg border border-slate-200 bg-white"
        >
          <div className="flex items-center gap-2 border-b border-slate-200 px-5 py-3.5">
            <MaterialIcon name={gs.icon} size={20} style={{ color: gs.iconC }} />
            <div className="text-sm font-semibold">{gs.title}</div>
            {gs.action ? (
              <button
                type="button"
                className="ml-auto cursor-pointer text-xs font-medium text-sky-500 hover:text-sky-600"
              >
                {gs.action}
              </button>
            ) : null}
          </div>
          {gs.items.map((gi) => (
            <button
              key={gi.title}
              type="button"
              className="flex w-full cursor-pointer items-center gap-3 border-b border-slate-50 px-5 py-3 text-left hover:bg-slate-50/80 last:border-0"
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
                <div className="text-xs text-slate-500">{gi.sub}</div>
              </div>
              <MaterialIcon
                name="chevron_right"
                size={18}
                className="text-slate-300"
              />
            </button>
          ))}
        </div>
      ))}
    </div>
  );
}

export default GenericSectionPage;
