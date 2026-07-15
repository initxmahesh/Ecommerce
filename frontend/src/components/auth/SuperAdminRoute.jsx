import RoleRoute from "./RoleRoute.jsx";
import { ROLE_GROUPS } from "../../utils/roles.js";

export default function SuperAdminRoute() {
  return (
    <RoleRoute
      allowedRoles={ROLE_GROUPS.SUPERADMIN}
      loadingClassName="bg-slate-100"
      loadingTextClassName="text-slate-500"
    />
  );
}
