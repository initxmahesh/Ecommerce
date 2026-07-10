import { CheckCircle2, Loader2, XCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { getAuthErrorMessage } from "../utils/authErrors.js";
import { verifyEmail } from "../services/authApi.js";

function VerifyEmail() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const [status, setStatus] = useState(token ? "loading" : "missing");
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!token) return undefined;

    let cancelled = false;

    async function runVerification() {
      try {
        const data = await verifyEmail(token);
        if (!cancelled) {
          setStatus("success");
          setMessage(data.message || "Your email has been verified.");
        }
      } catch (error) {
        if (!cancelled) {
          setStatus("error");
          setMessage(getAuthErrorMessage(error, "Verification failed."));
        }
      }
    }

    runVerification();

    return () => {
      cancelled = true;
    };
  }, [token]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#fdfbf7] px-4 py-8">
      <div className="w-full max-w-md rounded-2xl border border-neutral-200 bg-white p-8 text-center shadow-sm">
        {status === "loading" && (
          <>
            <Loader2 className="mx-auto h-10 w-10 animate-spin text-[#1a2b3c]" />
            <h1 className="mt-4 font-Serif text-2xl font-semibold text-[#1a2b3c]">
              Verifying your email
            </h1>
            <p className="mt-2 font-Poppins text-sm text-neutral-500">
              Please wait while we confirm your account.
            </p>
          </>
        )}

        {status === "success" && (
          <>
            <CheckCircle2 className="mx-auto h-10 w-10 text-emerald-600" />
            <h1 className="mt-4 font-Serif text-2xl font-semibold text-[#1a2b3c]">
              Email verified
            </h1>
            <p className="mt-2 font-Poppins text-sm text-neutral-500">{message}</p>
            <button
              type="button"
              onClick={() => navigate("/login", { state: { verified: true } })}
              className="mt-6 inline-flex h-10 items-center justify-center rounded-xl bg-[#1a2b3c] px-6 font-Poppins text-sm font-medium text-white transition-colors hover:bg-[#243b55]"
            >
              Sign in
            </button>
          </>
        )}

        {status === "error" && (
          <>
            <XCircle className="mx-auto h-10 w-10 text-red-500" />
            <h1 className="mt-4 font-Serif text-2xl font-semibold text-[#1a2b3c]">
              Verification failed
            </h1>
            <p className="mt-2 font-Poppins text-sm text-neutral-500">{message}</p>
            <Link
              to="/login"
              className="mt-6 inline-flex h-10 items-center justify-center rounded-xl border border-neutral-200 px-6 font-Poppins text-sm font-medium text-neutral-700 transition-colors hover:bg-neutral-50"
            >
              Back to sign in
            </Link>
          </>
        )}

        {status === "missing" && (
          <>
            <XCircle className="mx-auto h-10 w-10 text-amber-500" />
            <h1 className="mt-4 font-Serif text-2xl font-semibold text-[#1a2b3c]">
              Missing verification link
            </h1>
            <p className="mt-2 font-Poppins text-sm text-neutral-500">
              Open the link from your verification email, or sign in to request a
              new one.
            </p>
            <Link
              to="/login"
              className="mt-6 inline-flex h-10 items-center justify-center rounded-xl bg-[#1a2b3c] px-6 font-Poppins text-sm font-medium text-white transition-colors hover:bg-[#243b55]"
            >
              Sign in
            </Link>
          </>
        )}
      </div>
    </div>
  );
}

export default VerifyEmail;
