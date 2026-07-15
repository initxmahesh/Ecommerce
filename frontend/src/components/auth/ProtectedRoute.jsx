import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth.js";

function AuthLoadingScreen() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#fdfbf7]">
      <p className="font-Poppins text-sm text-neutral-500">Loading...</p>
    </div>
  );
}

export default function ProtectedRoute() {
  const { isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return <AuthLoadingScreen />;
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

  return <Outlet />;
}
