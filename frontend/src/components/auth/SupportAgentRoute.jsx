import RoleRoute from "./RoleRoute.jsx";
import { ROLE_GROUPS } from "../../utils/roles.js";

export default function SupportAgentRoute() {
  return (
    <RoleRoute
      allowedRoles={ROLE_GROUPS.SUPPORT}
      loadingClassName="bg-slate-50"
      loadingTextClassName="text-slate-500"
    />
  );
}
