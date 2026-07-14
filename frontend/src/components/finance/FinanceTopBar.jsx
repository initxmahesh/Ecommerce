import { useFinanceUi } from "../../context/financeUiContext.js";
import { FINANCE_SEARCH_GROUPS } from "../../data/dashboardSearchConfig.js";
import MaterialIcon from "../superadmin/MaterialIcon.jsx";
import DashboardSearch from "../dashboard/DashboardSearch.jsx";

function FinanceTopBar() {
  const { isMobile, pageTitle, openSidebar } = useFinanceUi();

  return (
    <header className="sticky top-0 z-40 flex h-[52px] items-center gap-2.5 border-b border-zinc-200 bg-white px-4 md:px-6">
      {isMobile ? (
        <button
          type="button"
          aria-label="Open menu"
          onClick={openSidebar}
          className="flex h-[34px] w-[34px] cursor-pointer items-center justify-center rounded-md hover:bg-zinc-100"
        >
          <MaterialIcon name="menu" size={22} className="text-gray-700" />
        </button>
      ) : null}

      <span className="text-sm font-semibold text-zinc-900">{pageTitle}</span>

      <div className="flex-1" />

      <DashboardSearch
        groups={FINANCE_SEARCH_GROUPS}
        placeholder="Search…"
        triggerClassName="border-zinc-200 bg-zinc-50 hover:border-zinc-300"
        triggerWidthClass="w-[120px] sm:w-[200px]"
      />
    </header>
  );
}

export default FinanceTopBar;
