import { Link, useLocation } from "react-router-dom";
import { PAGE_TITLES, VENDOR_PROFILE } from "../../data/vendorOwnerData.js";
import { VENDOR_SEARCH_GROUPS } from "../../data/dashboardSearchConfig.js";
import { useVendorOwnerUi } from "../../context/vendorOwnerUiContext.js";
import MaterialIcon from "../superadmin/MaterialIcon.jsx";
import DashboardSearch from "../dashboard/DashboardSearch.jsx";

function VendorOwnerTopBar() {
  const { isMobile, pageId, pageTitle, openSidebar } = useVendorOwnerUi();
  const location = useLocation();

  const isAddProduct = pageId === "add-product";
  const editName = location.state?.productName;

  return (
    <header className="sticky top-0 z-40 flex h-[52px] items-center gap-2.5 border-b border-slate-200 bg-white px-4 md:px-6">
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

      <nav className="flex min-w-0 items-center gap-1.5 text-[13px] text-slate-500">
        {isAddProduct ? (
          <>
            <Link
              to="/vendor/products"
              className="cursor-pointer text-slate-500 hover:text-slate-900"
            >
              Products
            </Link>
            <span className="text-slate-300">/</span>
            <span className="font-medium text-slate-900">
              {editName ? "Edit Product" : "Add Product"}
            </span>
          </>
        ) : (
          <span className="font-medium text-slate-900">
            {pageTitle || PAGE_TITLES[pageId]}
          </span>
        )}
      </nav>

      <div className="flex-1" />

      <DashboardSearch
        groups={VENDOR_SEARCH_GROUPS}
        placeholder="Search…"
        triggerWidthClass="w-[140px] sm:w-[200px]"
      />

      <div className="hidden items-center gap-1.5 rounded-md bg-emerald-500/10 px-2.5 py-1 sm:flex">
        <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
        <span className="text-xs font-medium text-emerald-600">Live</span>
      </div>

      <button
        type="button"
        aria-label="Notifications"
        className="relative flex h-[34px] w-[34px] cursor-pointer items-center justify-center rounded-md hover:bg-slate-100"
      >
        <MaterialIcon name="notifications" size={20} className="text-slate-500" />
        <span className="absolute right-[5px] top-[5px] h-[7px] w-[7px] rounded-full border-[1.5px] border-white bg-red-500" />
      </button>

      <div className="flex h-7 w-7 cursor-pointer items-center justify-center rounded-full bg-gradient-to-br from-emerald-500 to-emerald-400">
        <span className="text-[11px] font-semibold text-white">
          {VENDOR_PROFILE.initials}
        </span>
      </div>
    </header>
  );
}

export default VendorOwnerTopBar;
