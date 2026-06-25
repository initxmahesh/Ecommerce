import { Sparkles } from "lucide-react";
import { Link, NavLink } from "react-router-dom";
const linkClassName = ({ isActive }) =>
  `font-Poppins text-[14px] font-medium transition-colors ${
    isActive ? "text-neutral-900" : "text-neutral-500 hover:text-neutral-900"
  }`;

const Navbar = () => {
  return (
    <nav className="relative mx-auto flex max-w-full items-center justify-between bg-[#f3f2ee] px-5 py-4">
      <Link to="/" className="flex shrink-0 items-center gap-2.5">
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-neutral-900">
          <Sparkles className="h-4 w-4 text-white" strokeWidth={2.25} />
        </span>
        <span className="font-Poppins text-[15px] font-semibold tracking-tight text-neutral-900">
          VendorFlow
        </span>
      </Link>

      <ul className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-7 lg:flex">
        <NavLink to="/" end={true} className={linkClassName}>
          Home
        </NavLink>
        <NavLink to="/best-selling" className={linkClassName}>
          Best Selling
        </NavLink>
        <NavLink to="/products" className={linkClassName}>
          Products
        </NavLink>
        <NavLink to="/events" className={linkClassName}>
          Events
        </NavLink>
        <NavLink to="/faq" className={linkClassName}>
          FAQ
        </NavLink>
      </ul>

      <div className="flex shrink-0 items-center gap-5">
        <Link
          to="/login"
          className="font-Poppins text-[14px] font-medium text-neutral-500 transition-colors hover:text-neutral-900"
        >
          Login
        </Link>
        <Link
          to="/register"
          className="rounded-full bg-neutral-900 px-5 py-2 font-Poppins text-[14px] font-medium text-white transition-colors hover:bg-neutral-800"
        >
          Get Started
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
