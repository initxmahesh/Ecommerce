import { ShieldOff } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/useAuth.js";
import { getHomePathForUser } from "../utils/roles.js";

function Forbidden() {
  const { user, isAuthenticated } = useAuth();
  const location = useLocation();
  const homePath = isAuthenticated ? getHomePathForUser(user) : "/";
  const attempted = location.state?.from;

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#fdfbf7] px-4 py-12">
      <div className="w-full max-w-md text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-red-50 text-red-600">
          <ShieldOff className="h-7 w-7" strokeWidth={1.75} />
        </div>
        <p className="mt-6 font-Poppins text-xs font-semibold uppercase tracking-wider text-red-600">
          403 — Access denied
        </p>
        <h1 className="mt-2 font-Serif text-2xl font-semibold text-[#1a2b3c] sm:text-3xl">
          You don&apos;t have permission
        </h1>
        <p className="mt-3 font-Poppins text-sm leading-relaxed text-neutral-600">
          This area is restricted to authorized roles. If you believe this is a
          mistake, contact your platform administrator.
        </p>
        {attempted && (
          <p className="mt-2 font-Poppins text-xs text-neutral-400">
            Requested path: {attempted}
          </p>
        )}
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Link
            to={homePath}
            className="inline-flex h-11 items-center justify-center rounded-xl bg-[#1a2b3c] px-6 font-Poppins text-sm font-medium text-white transition-colors hover:bg-[#243b55]"
          >
            Go to home
          </Link>
          {!isAuthenticated && (
            <Link
              to="/login"
              className="inline-flex h-11 items-center justify-center rounded-xl border border-neutral-200 bg-white px-6 font-Poppins text-sm font-medium text-[#1a2b3c] transition-colors hover:bg-neutral-50"
            >
              Sign in
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

export default Forbidden;
