import { ShoppingBag, Sparkles, Store } from "lucide-react";
import { useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { useAuth } from "../hooks/useAuth.js";
import { getAuthErrorMessage } from "../utils/authErrors.js";

const GoogleIcon = () => (
  <svg className="h-5 w-5" viewBox="0 0 24 24" aria-hidden="true">
    <path
      fill="#4285F4"
      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
    />
    <path
      fill="#34A853"
      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
    />
    <path
      fill="#FBBC05"
      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
    />
    <path
      fill="#EA4335"
      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
    />
  </svg>
);

const ACCOUNT_TYPES = [
  {
    id: "buyer",
    label: "I'm a buyer",
    icon: ShoppingBag,
  },
  {
    id: "seller",
    label: "I'm a vendor",
    icon: Store,
  },
];

const inputClassName =
  "h-10 w-full rounded-xl border border-transparent bg-[#f5efe6] px-4 font-Poppins text-sm text-neutral-900 placeholder:text-neutral-400 focus:border-[#1a2b3c]/20 focus:outline-none focus:ring-2 focus:ring-[#1a2b3c]/10";

function resolveInitialType(searchParams) {
  const raw = (searchParams.get("type") || "").toLowerCase();
  if (raw === "seller" || raw === "vendor") return "seller";
  return "buyer";
}

function Signup() {
  const { register } = useAuth();
  const [searchParams] = useSearchParams();

  const [userType, setUserType] = useState(() =>
    resolveInitialType(searchParams),
  );
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [typeError, setTypeError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(null);

  const selectedType = useMemo(
    () => ACCOUNT_TYPES.find((type) => type.id === userType),
    [userType],
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setTypeError("");

    if (!ACCOUNT_TYPES.some((type) => type.id === userType)) {
      setTypeError("Select whether you are a buyer or a vendor.");
      return;
    }

    setIsSubmitting(true);

    try {
      const data = await register({ name, email, password, userType });
      setSuccess({
        message:
          data.message ||
          "Account created. Please check your email to verify your account.",
        devVerifyUrl: data.devVerifyUrl,
        userType,
      });
    } catch (err) {
      setError(getAuthErrorMessage(err, "Unable to create account."));
    } finally {
      setIsSubmitting(false);
    }
  };

  if (success) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#fdfbf7] px-4 py-8">
        <div className="w-full max-w-md rounded-2xl border border-neutral-200 bg-white p-8 shadow-sm">
          <h2 className="font-Serif text-2xl font-semibold text-[#1a2b3c]">
            Check your email
          </h2>
          <p className="mt-3 font-Poppins text-sm leading-relaxed text-neutral-600">
            {success.message}
          </p>
          <p className="mt-2 font-Poppins text-xs text-neutral-500">
            {success.userType === "seller"
              ? "After verification, sign in to open your vendor dashboard."
              : "After verification, sign in to shop, save favorites, and checkout."}
          </p>

          {success.devVerifyUrl && (
            <div className="mt-4 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3">
              <p className="font-Poppins text-xs font-medium text-amber-900">
                Development mode
              </p>
              <a
                href={success.devVerifyUrl}
                className="mt-1 break-all font-Poppins text-sm text-[#1a2b3c] underline underline-offset-2"
              >
                Click here to verify your email
              </a>
            </div>
          )}

          <Link
            to="/login"
            className="mt-6 inline-flex h-10 w-full items-center justify-center rounded-xl bg-[#1a2b3c] px-4 font-Poppins text-sm font-medium text-white transition-colors hover:bg-[#243b55]"
          >
            Go to sign in
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen">
      <div className="relative hidden w-1/2 flex-col justify-between bg-[#1a2b3c] px-8 py-8 lg:flex lg:px-12 lg:py-10">
        <Link to="/" className="flex items-center gap-2.5">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10">
            <Sparkles className="h-4 w-4 text-white" strokeWidth={2.25} />
          </span>
          <span className="font-Poppins text-sm font-semibold tracking-tight text-white sm:text-base">
            VendorFlow
          </span>
        </Link>

        <div className="max-w-md">
          <h1 className="font-Serif text-2xl font-semibold leading-tight tracking-tight text-white sm:text-3xl lg:text-4xl">
            The marketplace OS built for ambitious operators.
          </h1>
          <p className="mt-4 font-Poppins text-sm leading-relaxed text-white/70 sm:text-base">
            Buyers shop. Vendors sell. Admins orchestrate.
          </p>
        </div>
      </div>

      <div className="flex w-full flex-col items-center justify-center bg-[#fdfbf7] px-4 py-8 sm:px-6 sm:py-12 lg:w-1/2">
        <div className="w-full max-w-md">
          <div className="mb-6 flex items-center gap-2.5 sm:mb-8 lg:hidden">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-neutral-900">
              <Sparkles className="h-4 w-4 text-white" strokeWidth={2.25} />
            </span>
            <span className="font-Poppins text-sm font-semibold tracking-tight text-neutral-900 sm:text-base">
              VendorFlow
            </span>
          </div>

          <h2 className="font-Serif text-2xl font-semibold leading-tight text-[#1a2b3c] sm:text-3xl">
            Create your account
          </h2>
          <p className="mt-2 font-Poppins text-sm text-neutral-500">
            Start in seconds. Free to begin.
          </p>

          <div className="mt-6 grid grid-cols-1 gap-3 min-[400px]:grid-cols-2 sm:mt-8">
            {ACCOUNT_TYPES.map(({ id, label, icon: Icon }) => {
              const isSelected = userType === id;
              return (
                <button
                  key={id}
                  type="button"
                  onClick={() => setUserType(id)}
                  className={`flex h-10 items-center justify-center gap-2 rounded-xl border px-3 font-Poppins text-xs font-medium transition-colors sm:text-sm ${
                    isSelected
                      ? "border-[#1a2b3c] bg-white text-[#1a2b3c]"
                      : "border-neutral-200 bg-white text-neutral-500 hover:border-neutral-300"
                  }`}
                >
                  <Icon className="h-4 w-4" strokeWidth={2} />
                  {label}
                </button>
              );
            })}
          </div>

          <button
            type="button"
            disabled
            title="Google sign-in is not available yet"
            className="mt-5 flex h-10 w-full cursor-not-allowed items-center justify-center gap-3 rounded-xl border border-neutral-200 bg-neutral-50 px-4 font-Poppins text-sm font-medium text-neutral-400 sm:mt-6"
          >
            <GoogleIcon />
            Continue with Google
          </button>

          <div className="my-6 flex items-center gap-4">
            <div className="h-px flex-1 bg-neutral-200" />
            <span className="font-Poppins text-xs font-medium uppercase tracking-wider text-neutral-400">
              or
            </span>
            <div className="h-px flex-1 bg-neutral-200" />
          </div>

          <form onSubmit={handleSubmit} className="space-y-5" noValidate>
            {error && (
              <p
                role="alert"
                className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 font-Poppins text-sm text-red-700"
              >
                {error}
              </p>
            )}

            <div>
              <label
                htmlFor="name"
                className="mb-1.5 block font-Poppins text-xs font-medium text-neutral-600 sm:text-sm"
              >
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Jane Doe"
                className={inputClassName}
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="mb-1.5 block font-Poppins text-xs font-medium text-neutral-600 sm:text-sm"
              >
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@gmail.com"
                className={inputClassName}
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="mb-1.5 block font-Poppins text-xs font-medium text-neutral-600 sm:text-sm"
              >
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                required
                minLength={8}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="***********"
                className={inputClassName}
              />
              <p className="mt-1.5 font-Poppins text-xs text-neutral-500">
                Must be at least 8 characters.
              </p>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="h-12 w-full rounded-xl bg-[#1a2b3c] px-4 font-Poppins text-sm font-medium text-white transition-colors hover:bg-[#243b55] disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isSubmitting
                ? "Creating account..."
                : userType === "seller"
                  ? "Create vendor account"
                  : "Create buyer account"}
            </button>
          </form>

          <p className="mt-6 text-center font-Poppins text-xs text-neutral-500 sm:mt-8 sm:text-sm">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-medium text-[#1a2b3c] underline underline-offset-2 transition-colors hover:text-[#243b55]"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signup;
