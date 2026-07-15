import RoleRoute from "./RoleRoute.jsx";
import { ROLE_GROUPS } from "../../utils/roles.js";

export default function VendorOwnerRoute() {
  return (
    <RoleRoute
      allowedRoles={ROLE_GROUPS.VENDOR}
      loadingClassName="bg-slate-50"
      loadingTextClassName="text-slate-500"
    />
  );
}
