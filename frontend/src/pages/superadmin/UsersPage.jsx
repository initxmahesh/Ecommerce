import { USER_ROWS } from "../../data/superadminData.js";
import MaterialIcon from "../../components/superadmin/MaterialIcon.jsx";

function UsersPage() {
  return (
    <div className="flex-1 p-4 md:p-6">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div className="text-xl font-bold">Users & Roles</div>
        <div className="flex gap-2">
          <button
            type="button"
            className="cursor-pointer rounded-md border border-slate-200 bg-white px-3 py-1.5 text-[13px] text-gray-700 hover:border-slate-300"
          >
            Manage roles
          </button>
          <button
            type="button"
            className="cursor-pointer rounded-md bg-indigo-500 px-3.5 py-1.5 text-[13px] font-medium text-white hover:bg-indigo-600"
          >
            + Invite user
          </button>
        </div>
      </div>

      <div className="mb-4 grid grid-cols-[repeat(auto-fill,minmax(155px,1fr))] gap-3">
        {[
          { label: "Total Users", value: "1,247" },
          { label: "Admins", value: "8" },
          { label: "Active Now", value: "342", color: "#10b981" },
          { label: "Roles Defined", value: "12" },
        ].map((k) => (
          <div
            key={k.label}
            className="rounded-lg border border-slate-200 bg-white px-3.5 py-3"
          >
            <div className="mb-1 text-[11px] text-slate-500">{k.label}</div>
            <div
              className="font-mono text-xl font-bold"
              style={{ color: k.color || "#0f172a" }}
            >
              {k.value}
            </div>
          </div>
        ))}
      </div>

      <div className="overflow-hidden rounded-lg border border-slate-200 bg-white">
        {USER_ROWS.map((ur) => (
          <div
            key={ur.email}
            className="flex cursor-pointer items-center gap-3 border-b border-slate-50 px-5 py-2.5 hover:bg-slate-50/80"
          >
            <div
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full"
              style={{ background: ur.bg }}
            >
              <span className="text-[11px] font-semibold text-white">
                {ur.init}
              </span>
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-[13px] font-medium">{ur.name}</div>
              <div className="text-xs text-slate-500">{ur.email}</div>
            </div>
            <span
              className="rounded-[10px] px-2 py-0.5 text-[11px] font-medium"
              style={{ color: ur.roleC, background: ur.roleBg }}
            >
              {ur.role}
            </span>
            <div className="flex items-center gap-1.5">
              <div
                className="h-1.5 w-1.5 rounded-full"
                style={{ background: ur.statusDot }}
              />
              <span className="text-xs text-slate-500">{ur.statusLabel}</span>
            </div>
            <MaterialIcon
              name="more_horiz"
              size={18}
              className="cursor-pointer text-slate-400 hover:text-gray-700"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default UsersPage;
