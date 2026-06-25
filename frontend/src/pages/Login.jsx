import { Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";

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

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="flex min-h-screen">
      {/* Left panel */}
      <div className="relative hidden w-1/2 flex-col justify-between bg-[#1a2b3c] px-12 py-10 lg:flex">
        <Link to="/" className="flex items-center gap-2.5">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10">
            <Sparkles className="h-4 w-4 text-white" strokeWidth={2.25} />
          </span>
          <span className="font-Poppins text-[15px] font-semibold tracking-tight text-white">
            VendorFlow
          </span>
        </Link>

        <div className="max-w-md">
          <h1 className="font-Serif text-[42px] font-semibold leading-[1.15] tracking-tight text-white">
            The marketplace OS built for ambitious operators.
          </h1>
          <p className="mt-4 font-Poppins text-[15px] leading-relaxed text-white/70">
            Buyers shop. Sellers sell. Admins orchestrate.
          </p>
        </div>
      </div>

      {/* Right panel */}
      <div className="flex w-full flex-col items-center justify-center bg-[#fdfbf7] px-6 py-12 lg:w-1/2">
        <div className="w-full max-w-[400px]">
          <div className="mb-8 flex items-center gap-2.5 lg:hidden">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-neutral-900">
              <Sparkles className="h-4 w-4 text-white" strokeWidth={2.25} />
            </span>
            <span className="font-Poppins text-[15px] font-semibold tracking-tight text-neutral-900">
              VendorFlow
            </span>
          </div>

          <h2 className="font-Serif text-[36px] font-semibold leading-tight text-[#1a2b3c]">
            Welcome back
          </h2>
          <p className="mt-2 font-Poppins text-[14px] text-neutral-500">
            Sign in to your VendorFlow account.
          </p>

          <button
            type="button"
            className="mt-8 flex w-full items-center justify-center gap-3 rounded-xl border border-neutral-200 bg-white px-4 py-3 font-Poppins text-[14px] font-medium text-neutral-700 transition-colors hover:bg-neutral-50"
          >
            <GoogleIcon />
            Continue with Google
          </button>

          <div className="my-6 flex items-center gap-4">
            <div className="h-px flex-1 bg-neutral-200" />
            <span className="font-Poppins text-[12px] font-medium uppercase tracking-wider text-neutral-400">
              or
            </span>
            <div className="h-px flex-1 bg-neutral-200" />
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label
                htmlFor="email"
                className="mb-1.5 block font-Poppins text-[13px] font-medium text-neutral-600"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@company.com"
                className="w-full rounded-xl border border-transparent bg-[#f5efe6] px-4 py-3 font-Poppins text-[14px] text-neutral-900 placeholder:text-neutral-400 focus:border-[#1a2b3c]/20 focus:outline-none focus:ring-2 focus:ring-[#1a2b3c]/10"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="mb-1.5 block font-Poppins text-[13px] font-medium text-neutral-600"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="***********"
                className="w-full rounded-xl border border-transparent bg-[#f5efe6] px-4 py-3 font-Poppins text-[14px] text-neutral-900 placeholder:text-neutral-400 focus:border-[#1a2b3c]/20 focus:outline-none focus:ring-2 focus:ring-[#1a2b3c]/10"
              />
            </div>

            <button
              type="submit"
              className="w-full rounded-xl bg-[#1a2b3c] px-4 py-3.5 font-Poppins text-[14px] font-medium text-white transition-colors hover:bg-[#243b55]"
            >
              Sign in
            </button>
          </form>

          <p className="mt-8 text-center font-Poppins text-[13px] text-neutral-500">
            New to VendorFlow?{" "}
            <Link
              to="/register"
              className="font-medium text-[#1a2b3c] underline underline-offset-2 transition-colors hover:text-[#243b55]"
            >
              Create an account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
