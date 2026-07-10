import { useSupportAgentUi } from "../../context/supportAgentUiContext.js";
import MaterialIcon from "../superadmin/MaterialIcon.jsx";

function SupportAgentTopBar() {
  const { isMobile, pageTitle, openSidebar } = useSupportAgentUi();

  return (
    <header className="sticky top-0 z-40 flex h-[52px] items-center gap-2.5 border-b border-slate-200 bg-white px-4 md:px-5">
      {isMobile ? (
        <button
          type="button"
          aria-label="Open menu"
          onClick={openSidebar}
          className="flex h-[34px] w-[34px] cursor-pointer items-center justify-center rounded-md hover:bg-slate-100"
        >
          <MaterialIcon name="menu" size={22} className="text-gray-700" />
        </button>
      ) : null}

      <span className="text-sm font-semibold text-slate-900">{pageTitle}</span>

      <div className="flex-1" />

      <div className="flex items-center gap-1.5 rounded-md bg-emerald-500/10 px-2.5 py-1">
        <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
        <span className="text-xs font-medium text-emerald-600">Available</span>
      </div>

      <button
        type="button"
        className="flex cursor-pointer items-center gap-1.5 rounded-md border border-slate-200 bg-slate-50 px-3 py-1.5 hover:border-slate-300"
      >
        <MaterialIcon name="search" size={16} className="text-slate-400" />
        <span className="hidden text-[13px] text-slate-400 sm:inline">
          Search tickets…
        </span>
      </button>
    </header>
  );
}

export default SupportAgentTopBar;
