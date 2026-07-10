import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth.js";

function AuthLoadingScreen() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50">
      <p className="font-admin text-sm text-zinc-500">Loading...</p>
    </div>
  );
}

export default function FinanceRoute() {
  const { isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return <AuthLoadingScreen />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }

  return <Outlet />;
}
