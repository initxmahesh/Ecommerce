import { NavLink } from "react-router-dom";
import { useSuperAdminUi } from "../../context/superAdminUiContext.js";
import MaterialIcon from "./MaterialIcon.jsx";

function SuperAdminSidebar() {
  const {
    expanded,
    isMobile,
    sidebarOpen,
    sidebarW,
    navGroups,
    toggleCollapsed,
    closeSidebar,
  } = useSuperAdminUi();

  const transform =
    isMobile && !sidebarOpen ? "translateX(-100%)" : "translateX(0)";

  return (
    <aside
      className="fixed bottom-0 left-0 top-0 z-50 flex flex-col overflow-hidden bg-slate-900 transition-[transform,width] duration-200 ease-out"
      style={{ width: sidebarW, transform }}
    >
      <div className="flex h-[60px] shrink-0 items-center gap-2.5 border-b border-white/[0.06] px-3.5">
        <div className="flex h-[30px] w-[30px] shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 to-indigo-400">
          <span className="text-[13px] font-bold text-white">M</span>
        </div>
        {expanded ? (
          <div className="min-w-0 flex-1">
            <div className="whitespace-nowrap text-[13px] font-semibold text-slate-100">
              Cartify
            </div>
            <div className="text-[10px] text-slate-500">Super Admin</div>
          </div>
        ) : null}
      </div>

      <nav className="flex-1 overflow-y-auto scrollbar-hide p-2">
        {navGroups.map((group) => (
          <div key={group.label} className="mb-3.5">
            {expanded ? (
              <div className="whitespace-nowrap px-2 py-1 text-[10px] font-semibold uppercase tracking-[1px] text-slate-600">
                {group.label}
              </div>
            ) : null}
            {group.items.map((item) => (
              <NavLink
                key={item.id}
                to={item.path}
                end={item.id === "dashboard"}
                onClick={closeSidebar}
                className={({ isActive }) =>
                  `mb-px flex cursor-pointer items-center rounded-md py-1.5 transition-colors ${
                    expanded ? "gap-2.5 px-2" : "justify-center px-0"
                  } ${
                    isActive
                      ? "bg-indigo-500/15"
                      : "bg-transparent hover:bg-white/5"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <span className="relative shrink-0">
                      <MaterialIcon
                        name={item.icon}
                        size={26}
                        className="block"
                        style={{ color: isActive ? "#a5b4fc" : "#94a3b8" }}
                      />
                      {!expanded && item.badge ? (
                        <span className="absolute -right-1.5 -top-1.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-red-500 px-0.5 text-[8px] font-bold leading-none text-white ring-2 ring-slate-900">
                          {item.badge}
                        </span>
                      ) : null}
                    </span>
                    {expanded ? (
                      <>
                        <span
                          className={`flex-1 whitespace-nowrap text-[13px] ${
                            isActive
                              ? "font-semibold text-indigo-100"
                              : "font-normal text-slate-400"
                          }`}
                        >
                          {item.label}
                        </span>
                        {item.badge ? (
                          <span className="rounded-[10px] bg-indigo-500/25 px-1.5 py-px text-[10px] font-semibold text-indigo-300">
                            {item.badge}
                          </span>
                        ) : null}
                      </>
                    ) : null}
                  </>
                )}
              </NavLink>
            ))}
          </div>
        ))}
      </nav>

      {!isMobile ? (
        <div className="shrink-0 border-t border-white/[0.06] p-2">
          <button
            type="button"
            onClick={toggleCollapsed}
            className="flex w-full cursor-pointer items-center gap-2.5 rounded-md px-2 py-1.5 hover:bg-white/[0.06]"
          >
            <MaterialIcon
              name={collapsedIcon(expanded)}
              size={20}
              className="shrink-0 px-1 text-slate-500"
            />
            {expanded ? (
              <span className="whitespace-nowrap text-xs text-slate-500">
                Collapse
              </span>
            ) : null}
          </button>
        </div>
      ) : null}
    </aside>
  );
}

function collapsedIcon(expanded) {
  return expanded ? "chevron_left" : "chevron_right";
}

export default SuperAdminSidebar;
