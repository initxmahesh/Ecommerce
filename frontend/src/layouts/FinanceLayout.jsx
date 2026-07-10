import { useEffect, useMemo, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { NAV_GROUPS, PAGE_TITLES } from "../data/financeData.js";
import FinanceSidebar from "../components/finance/FinanceSidebar.jsx";
import FinanceTopBar from "../components/finance/FinanceTopBar.jsx";
import { FinanceUiContext } from "../context/financeUiContext.js";

function resolvePageId(pathname) {
  if (pathname === "/finance" || pathname === "/finance/") {
    return "dashboard";
  }
  const segment = pathname.replace(/^\/finance\/?/, "").split("/")[0];
  return segment || "dashboard";
}

function FinanceLayout() {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [readBadges, setReadBadges] = useState(() => new Set());
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

  const pageId = resolvePageId(location.pathname);

  useEffect(() => {
    setReadBadges((prev) => {
      if (prev.has(pageId)) return prev;
      const next = new Set(prev);
      next.add(pageId);
      return next;
    });
  }, [pageId]);

  const isMobile = vw < 768;
  const isTablet = vw >= 768 && vw < 1024;
  const expanded = isMobile ? true : !collapsed;
  const sidebarW = isMobile ? 200 : collapsed ? 56 : 200;
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
    ],
  );

  return (
    <FinanceUiContext.Provider value={value}>
      <div className="flex min-h-screen bg-zinc-50 font-admin text-zinc-950 antialiased">
        {isMobile && sidebarOpen ? (
          <button
            type="button"
            aria-label="Close sidebar"
            className="fixed inset-0 z-[45] bg-black/40"
            onClick={() => setSidebarOpen(false)}
          />
        ) : null}

        <FinanceSidebar />

        <div
          className="flex min-h-screen min-w-0 flex-1 flex-col overflow-x-hidden transition-[margin] duration-200 ease-out"
          style={{ marginLeft: mainML }}
        >
          <FinanceTopBar />
          <Outlet />
        </div>
      </div>
    </FinanceUiContext.Provider>
  );
}

export default FinanceLayout;
