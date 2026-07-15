import RoleRoute from "./RoleRoute.jsx";
import { ROLE_GROUPS } from "../../utils/roles.js";

export default function FinanceRoute() {
  return (
    <RoleRoute
      allowedRoles={ROLE_GROUPS.FINANCE}
      loadingClassName="bg-zinc-50"
      loadingTextClassName="text-zinc-500"
    />
  );
}
