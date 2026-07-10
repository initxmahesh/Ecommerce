import { NavLink } from "react-router-dom";
import { AGENT_PROFILE } from "../../data/supportAgentData.js";
import { useSupportAgentUi } from "../../context/supportAgentUiContext.js";
import MaterialIcon from "../superadmin/MaterialIcon.jsx";

function SupportAgentSidebar() {
  const {
    expanded,
    isMobile,
    sidebarOpen,
    sidebarW,
    navGroups,
    toggleCollapsed,
    closeSidebar,
  } = useSupportAgentUi();

  const transform =
    isMobile && !sidebarOpen ? "translateX(-100%)" : "translateX(0)";

  return (
    <aside
      className="fixed bottom-0 left-0 top-0 z-50 flex flex-col overflow-hidden bg-[#0c4a6e] transition-[transform,width] duration-200 ease-out"
      style={{ width: sidebarW, transform }}
    >
      <div className="flex h-[52px] shrink-0 items-center gap-2.5 border-b border-white/[0.08] px-3.5">
        <div className="flex h-[30px] w-[30px] shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-sky-500 to-sky-400">
          <MaterialIcon name="support_agent" size={18} className="text-white" />
        </div>
        {expanded ? (
          <div className="min-w-0 flex-1">
            <div className="whitespace-nowrap text-[13px] font-semibold text-sky-50">
              Support Center
            </div>
            <div className="text-[10px] text-sky-300">MarketBase</div>
          </div>
        ) : null}
      </div>

      <nav className="flex-1 overflow-y-auto scrollbar-hide p-2">
        {navGroups.map((group) => (
          <div key={group.label} className="mb-3.5">
            {expanded ? (
              <div className="whitespace-nowrap px-2 py-1 text-[10px] font-semibold uppercase tracking-[1px] text-sky-300">
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
                      ? "bg-sky-500/15"
                      : "bg-transparent hover:bg-white/[0.06]"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <span className="relative shrink-0">
                      <MaterialIcon
                        name={item.icon}
                        size={20}
                        className="block"
                        style={{ color: isActive ? "#7dd3fc" : "#bae6fd" }}
                      />
                      {!expanded && item.badge ? (
                        <span className="absolute -right-1.5 -top-1.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-sky-500 px-0.5 text-[8px] font-bold leading-none text-white ring-2 ring-[#0c4a6e]">
                          {item.badge}
                        </span>
                      ) : null}
                    </span>
                    {expanded ? (
                      <>
                        <span
                          className={`flex-1 whitespace-nowrap text-[13px] ${
                            isActive
                              ? "font-semibold text-sky-100"
                              : "font-normal text-sky-200"
                          }`}
                        >
                          {item.label}
                        </span>
                        {item.badge ? (
                          <span className="rounded-[10px] bg-sky-500/30 px-1.5 py-px text-[10px] font-semibold text-sky-300">
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

      <div className="shrink-0 border-t border-white/[0.08] p-2">
        {!isMobile ? (
          <button
            type="button"
            onClick={toggleCollapsed}
            className="mb-1 flex w-full cursor-pointer items-center gap-2.5 rounded-md px-2 py-1.5 hover:bg-white/[0.06]"
          >
            <MaterialIcon
              name={expanded ? "chevron_left" : "chevron_right"}
              size={20}
              className="shrink-0 px-1 text-sky-400"
            />
            {expanded ? (
              <span className="whitespace-nowrap text-xs text-sky-400">
                Collapse
              </span>
            ) : null}
          </button>
        ) : null}

        <div className="flex items-center gap-2.5 px-2 py-1.5">
          <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-sky-500">
            <span className="text-[11px] font-semibold text-white">
              {AGENT_PROFILE.initials}
            </span>
          </div>
          {expanded ? (
            <div className="min-w-0">
              <div className="truncate text-xs font-medium text-sky-100">
                {AGENT_PROFILE.name}
              </div>
              <div className="text-[10px] text-sky-300">
                {AGENT_PROFILE.status}
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </aside>
  );
}

export default SupportAgentSidebar;
