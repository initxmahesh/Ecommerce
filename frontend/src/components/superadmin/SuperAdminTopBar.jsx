import { useSuperAdminUi } from "../../context/superAdminUiContext.js";
import { SUPERADMIN_SEARCH_GROUPS } from "../../data/dashboardSearchConfig.js";
import MaterialIcon from "./MaterialIcon.jsx";
import DashboardSearch from "../dashboard/DashboardSearch.jsx";

function SuperAdminTopBar() {
  const { isMobile, pageTitle, openSidebar } = useSuperAdminUi();

  return (
    <header className="sticky top-0 z-40 flex h-[60px] items-center gap-2.5 border-b border-slate-200 bg-white px-4 md:px-6">
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

      <div className="flex items-center gap-1.5 text-[13px] text-slate-500">
        <span>Platform</span>
        <span className="text-slate-300">/</span>
        <span className="font-medium text-slate-900">{pageTitle}</span>
      </div>

      <div className="flex-1" />

      <DashboardSearch
        groups={SUPERADMIN_SEARCH_GROUPS}
        placeholder="Search…"
        shortcutLabel="⌘K"
        triggerWidthClass="w-[120px] md:w-[240px]"
      />

      <button
        type="button"
        aria-label="Notifications"
        className="relative flex h-[34px] w-[34px] cursor-pointer items-center justify-center rounded-md hover:bg-slate-100"
      >
        <MaterialIcon name="notifications" size={20} className="text-slate-500" />
        <span className="absolute right-[5px] top-[5px] h-[7px] w-[7px] rounded-full border-[1.5px] border-white bg-red-500" />
      </button>

      <button
        type="button"
        className="flex cursor-pointer items-center gap-1.5 rounded-md px-1.5 py-1 hover:bg-slate-100"
      >
        <div className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-indigo-400">
          <span className="text-[11px] font-semibold text-white">R</span>
        </div>
        {!isMobile ? (
          <span className="text-[13px] font-medium text-slate-900">Ramesh</span>
        ) : null}
      </button>
    </header>
  );
}

export default SuperAdminTopBar;
