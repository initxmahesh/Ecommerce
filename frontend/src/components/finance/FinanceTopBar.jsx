import { useFinanceUi } from "../../context/financeUiContext.js";
import MaterialIcon from "../superadmin/MaterialIcon.jsx";

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

      <button
        type="button"
        className="flex w-[120px] cursor-pointer items-center gap-1.5 rounded-md border border-zinc-200 bg-zinc-50 px-3 py-1.5 hover:border-zinc-300 sm:w-[200px]"
      >
        <MaterialIcon name="search" size={16} className="text-zinc-400" />
        <span className="text-[13px] text-zinc-400">Search…</span>
      </button>
    </header>
  );
}

export default FinanceTopBar;
