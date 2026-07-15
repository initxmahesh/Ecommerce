import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth.js";
import { hasAnyRole } from "../../utils/roles.js";

function AuthLoadingScreen({ className = "bg-[#fdfbf7]", textClass = "text-neutral-500" }) {
  return (
    <div className={`flex min-h-screen items-center justify-center ${className}`}>
      <p className={`font-Poppins text-sm ${textClass}`}>Loading...</p>
    </div>
  );
}

/**
 * Requires authentication and at least one of `allowedRoles`.
 * Unauthenticated users → /login. Authenticated without role → /forbidden.
 */
export default function RoleRoute({
  allowedRoles,
  loadingClassName,
  loadingTextClassName,
}) {
  const { user, isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return (
      <AuthLoadingScreen
        className={loadingClassName}
        textClass={loadingTextClassName}
      />
    );
  }

  if (!isAuthenticated) {
    return (
      <Navigate
        to="/login"
        replace
        state={{ from: `${location.pathname}${location.search}` }}
      />
    );
  }

  if (!hasAnyRole(user, allowedRoles)) {
    return (
      <Navigate
        to="/forbidden"
        replace
        state={{ from: `${location.pathname}${location.search}` }}
      />
    );
  }

  return <Outlet />;
}
