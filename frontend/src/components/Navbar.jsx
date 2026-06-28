import {
  ArrowDown01Icon,
  BadgePercentIcon,
  FavouriteIcon,
  Search01Icon,
  ShoppingBag03Icon,
  ShoppingCartAdd02Icon,
  WhatsappIcon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { Phone } from "lucide-react";
import { Link, NavLink } from "react-router-dom";

const navItems = [
  { label: "Home", to: "/", hasDropdown: false },
  { label: "Categories", to: "/products", hasDropdown: true },
  { label: "New Arrivals", to: "/new-arrivals", hasDropdown: false },
  { label: "Brand", to: "/events", hasDropdown: true },
  { label: "Pages", to: "/faq", hasDropdown: true },
  {
    label: "Offers",
    to: "/best-selling",
    hasDropdown: false,
    icon: BadgePercentIcon,
  },
];

const topBarDropdowns = ["English", "Dollar", "Account"];

const navLinkClassName = ({ isActive }) =>
  `flex items-center gap-1 font-Poppins text-sm font-medium transition-colors ${
    isActive ? "text-primary" : "text-primary/80 hover:text-primary"
  }`;

const TopBarDropdown = ({ label }) => (
  <button
    type="button"
    className="flex items-center gap-1 font-Poppins text-xs transition-opacity hover:opacity-80 sm:text-sm"
  >
    {label}
    <HugeiconsIcon
      icon={ArrowDown01Icon}
      size={14}
      primaryColor="currentColor"
      strokeWidth={2}
    />
  </button>
);

const Navbar = () => {
  return (
    <header className="font-Poppins">
      {/* Top utility bar */}
      <div className="bg-primary text-white">
        <div className="container mx-auto flex flex-wrap items-center justify-between gap-3 px-4 py-2 lg:px-6">
          <div className="flex flex-wrap items-center gap-4">
            <a
              href="tel:+919876543210"
              className="flex items-center gap-1.5 text-xs sm:text-sm"
            >
              <Phone className="h-3.5 w-3.5 shrink-0" strokeWidth={2} />
              +91 987 654 3210
            </a>
            <a
              href="https://wa.me/919876543210"
              className="flex items-center gap-1.5 text-xs sm:text-sm"
              target="_blank"
              rel="noreferrer"
            >
              <HugeiconsIcon
                icon={WhatsappIcon}
                size={14}
                primaryColor="currentColor"
                strokeWidth={2}
              />
              +91 987 654 3210
            </a>
          </div>

          <p className="hidden flex-1 text-center text-xs sm:text-sm md:block">
            World&apos;s Fastest Online Shopping Destination
          </p>

          <div className="flex items-center gap-4 sm:gap-5">
            {topBarDropdowns.map((label) => (
              <TopBarDropdown key={label} label={label} />
            ))}
          </div>
        </div>
      </div>

      {/* Main navigation */}
      <nav className="border-b border-neutral-200 bg-white">
        <div className="container relative mx-auto flex items-center justify-between px-4 py-4 lg:px-6">
          <Link to="/" className="flex shrink-0 items-center gap-2.5">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl text-white">
              <HugeiconsIcon
                icon={ShoppingBag03Icon}
                size={30}
                className="text-primary object-contain"
                strokeWidth={2}
              />
            </span>
            <span className="text-xl font-bold text-brand">Cartify</span>
          </Link>

          <ul className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-6 xl:flex">
            {navItems.map(({ label, to, hasDropdown, icon }) => (
              <li key={label}>
                <NavLink to={to} end={to === "/"} className={navLinkClassName}>
                  {icon && (
                    <HugeiconsIcon
                      icon={icon}
                      size={16}
                      primaryColor="currentColor"
                      strokeWidth={2}
                    />
                  )}
                  {label}
                  {hasDropdown && (
                    <HugeiconsIcon
                      icon={ArrowDown01Icon}
                      size={14}
                      primaryColor="currentColor"
                      strokeWidth={2}
                    />
                  )}
                </NavLink>
              </li>
            ))}
          </ul>

          <div className="flex shrink-0 items-center gap-4 sm:gap-5">
            <button
              type="button"
              aria-label="Search"
              className="text-primary transition-opacity hover:opacity-80"
            >
              <HugeiconsIcon
                icon={Search01Icon}
                size={22}
                primaryColor="currentColor"
                strokeWidth={2}
              />
            </button>
            <button
              type="button"
              aria-label="Wishlist"
              className="text-primary transition-opacity hover:opacity-80"
            >
              <HugeiconsIcon
                icon={FavouriteIcon}
                size={22}
                primaryColor="currentColor"
                strokeWidth={2}
              />
            </button>
            <button
              type="button"
              aria-label="Cart"
              className="text-primary transition-opacity hover:opacity-80"
            >
              <HugeiconsIcon
                icon={ShoppingCartAdd02Icon}
                size={22}
                primaryColor="currentColor"
                strokeWidth={2}
              />
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
