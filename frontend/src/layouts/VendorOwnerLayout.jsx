import { useEffect, useMemo, useState, useCallback } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { NAV_GROUPS, PAGE_TITLES } from "../data/vendorOwnerData.js";
import VendorOwnerSidebar from "../components/vendor/VendorOwnerSidebar.jsx";
import VendorOwnerTopBar from "../components/vendor/VendorOwnerTopBar.jsx";
import { VendorOwnerUiContext } from "../context/vendorOwnerUiContext.js";
import MaterialIcon from "../components/superadmin/MaterialIcon.jsx";

function resolvePageId(pathname) {
  if (pathname === "/vendor" || pathname === "/vendor/") {
    return "home";
  }
  if (pathname.includes("/products/new")) {
    return "add-product";
  }
  const segment = pathname.replace(/^\/vendor\/?/, "").split("/")[0];
  return segment || "home";
}

function VendorOwnerLayout() {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [readBadges, setReadBadges] = useState(() => new Set());
  const [toast, setToast] = useState("");
  const [toastTimer, setToastTimer] = useState(null);
  const [vw, setVw] = useState(() =>
    typeof window !== "undefined" ? window.innerWidth : 1200,
  );

  useEffect(() => {
    const onResize = () => setVw(window.innerWidth);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    setSidebarOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    return () => {
      if (toastTimer) clearTimeout(toastTimer);
    };
  }, [toastTimer]);

  const pageId = resolvePageId(location.pathname);

  useEffect(() => {
    setReadBadges((prev) => {
      if (prev.has(pageId)) return prev;
      const next = new Set(prev);
      next.add(pageId);
      return next;
    });
  }, [pageId]);

  const showToast = useCallback(
    (msg) => {
      if (toastTimer) clearTimeout(toastTimer);
      const t = setTimeout(() => {
        setToast("");
        setToastTimer(null);
      }, 3000);
      setToast(msg);
      setToastTimer(t);
    },
    [toastTimer],
  );

  const dismissToast = useCallback(() => {
    if (toastTimer) clearTimeout(toastTimer);
    setToast("");
    setToastTimer(null);
  }, [toastTimer]);

  const isMobile = vw < 768;
  const isTablet = vw >= 768 && vw < 1024;
  const expanded = isMobile ? true : !collapsed;
  const sidebarW = isMobile ? 220 : collapsed ? 64 : 220;
  const mainML = isMobile ? 0 : sidebarW;
  const pageTitle = PAGE_TITLES[pageId] || pageId;

  const navGroups = useMemo(
    () =>
      NAV_GROUPS.map((group) => ({
        ...group,
        items: group.items.map((item) =>
          item.badge && readBadges.has(item.id)
            ? { ...item, badge: undefined }
            : item,
        ),
      })),
    [readBadges],
  );

  const value = useMemo(
    () => ({
      collapsed,
      expanded,
      isMobile,
      isTablet,
      sidebarOpen,
      sidebarW,
      pageId,
      pageTitle,
      navGroups,
      showToast,
      toggleCollapsed: () => setCollapsed((c) => !c),
      openSidebar: () => setSidebarOpen(true),
      closeSidebar: () => setSidebarOpen(false),
    }),
    [
      collapsed,
      expanded,
      isMobile,
      isTablet,
      sidebarOpen,
      sidebarW,
      pageId,
      pageTitle,
      navGroups,
      showToast,
    ],
  );

  return (
    <VendorOwnerUiContext.Provider value={value}>
      <div className="flex min-h-screen bg-[#f8fafb] font-admin text-slate-900 antialiased">
        {isMobile && sidebarOpen ? (
          <button
            type="button"
            aria-label="Close sidebar"
            className="fixed inset-0 z-[45] bg-black/40"
            onClick={() => setSidebarOpen(false)}
          />
        ) : null}

        <VendorOwnerSidebar />

        <div
          className="flex min-h-screen min-w-0 flex-1 flex-col overflow-x-hidden transition-[margin] duration-200 ease-out"
          style={{ marginLeft: mainML }}
        >
          <VendorOwnerTopBar />
          <Outlet />
        </div>

        {toast ? (
          <div className="fixed bottom-6 right-6 z-[100] flex items-center gap-2.5 rounded-lg bg-slate-900 px-5 py-3 shadow-lg">
            <MaterialIcon
              name="check_circle"
              size={20}
              className="text-emerald-500"
            />
            <span className="text-[13px] font-medium text-white">{toast}</span>
            <button
              type="button"
              aria-label="Dismiss"
              onClick={dismissToast}
              className="ml-2 cursor-pointer text-slate-500 hover:text-white"
            >
              <MaterialIcon name="close" size={18} />
            </button>
          </div>
        ) : null}
      </div>
    </VendorOwnerUiContext.Provider>
  );
}

export default VendorOwnerLayout;
