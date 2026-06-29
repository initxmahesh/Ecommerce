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
import { Menu, Phone, X } from "lucide-react";
import { useEffect, useState } from "react";
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
  `flex items-center gap-1 font-Poppins text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${
    isActive ? "text-primary" : "text-primary/80 hover:text-primary"
  }`;

const mobileNavLinkClassName = ({ isActive }) =>
  `flex items-center gap-2 rounded-lg px-3 py-2.5 font-Poppins text-base font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-primary ${
    isActive
      ? "bg-primary/10 text-primary"
      : "text-neutral-700 hover:bg-neutral-50 hover:text-primary"
  }`;

const TopBarDropdown = ({ label, className = "" }) => (
  <button
    type="button"
    className={`flex items-center gap-1 font-Poppins text-xs transition-opacity hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-primary sm:text-sm ${className}`}
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
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className="font-Poppins">
      {/* Top utility bar */}
      <div className="bg-primary text-white">
        <div className="page-container flex flex-wrap items-center justify-between gap-2 py-2 sm:gap-3">
          <div className="flex flex-wrap items-center gap-3 sm:gap-4">
            <a
              href="tel:+919876543210"
              className="flex items-center gap-1.5 text-xs sm:text-sm"
            >
              <Phone className="h-3.5 w-3.5 shrink-0" strokeWidth={2} />
              <span className="hidden min-[400px]:inline">
                +91 987 654 3210
              </span>
              <span className="min-[400px]:hidden">Call Us</span>
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
              <span className="hidden sm:inline">+91 987 654 3210</span>
              <span className="sm:hidden">WhatsApp</span>
            </a>
          </div>

          <p className="hidden flex-1 text-center text-xs sm:text-sm md:block">
            World&apos;s Fastest Online Shopping Destination
          </p>

          <div className="hidden items-center gap-4 sm:flex sm:gap-5">
            {topBarDropdowns.map((label) => (
              <TopBarDropdown
                key={label}
                label={label}
                className="text-white focus:ring-white/50"
              />
            ))}
          </div>
        </div>
      </div>

      {/* Main navigation */}
      <nav className="relative border-b border-neutral-200 bg-white">
        <div className="page-container flex items-center justify-between gap-4 py-3 sm:py-4">
          <Link
            to="/"
            className="flex shrink-0 items-center gap-2 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            onClick={closeMenu}
          >
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl text-white">
              <HugeiconsIcon
                icon={ShoppingBag03Icon}
                size={30}
                className="text-primary object-contain"
                strokeWidth={2}
              />
            </span>
            <span className="text-lg font-bold text-brand sm:text-xl">
              Cartify
            </span>
          </Link>

          <ul className="hidden items-center gap-6 xl:flex">
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

          <div className="flex shrink-0 items-center gap-3 sm:gap-4">
            <button
              type="button"
              aria-label="Search"
              className="text-primary transition-opacity hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
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
              className="hidden text-primary transition-opacity hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 sm:block"
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
              className="hidden text-primary transition-opacity hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 sm:block"
            >
              <HugeiconsIcon
                icon={ShoppingCartAdd02Icon}
                size={22}
                primaryColor="currentColor"
                strokeWidth={2}
              />
            </button>

            <button
              type="button"
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMenuOpen}
              onClick={() => setIsMenuOpen((open) => !open)}
              className="rounded-lg p-1 text-primary transition-colors hover:bg-neutral-50 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 xl:hidden"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" strokeWidth={2} />
              ) : (
                <Menu className="h-6 w-6" strokeWidth={2} />
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <>
            <button
              type="button"
              aria-label="Close menu overlay"
              className="fixed inset-0 z-40 bg-black/40 xl:hidden"
              onClick={closeMenu}
            />
            <div className="absolute left-0 right-0 top-full z-50 max-h-[calc(100dvh-8rem)] overflow-y-auto border-b border-neutral-200 bg-white shadow-lg xl:hidden">
              <div className="page-container py-4">
                <ul className="flex flex-col gap-1">
                  {navItems.map(({ label, to, hasDropdown, icon }) => (
                    <li key={label}>
                      <NavLink
                        to={to}
                        end={to === "/"}
                        className={mobileNavLinkClassName}
                        onClick={closeMenu}
                      >
                        {icon && (
                          <HugeiconsIcon
                            icon={icon}
                            size={18}
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
                            className="ml-auto"
                          />
                        )}
                      </NavLink>
                    </li>
                  ))}
                </ul>

                <div className="mt-4 flex flex-col gap-2 border-t border-neutral-100 pt-4 sm:hidden">
                  <button
                    type="button"
                    className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-base font-medium text-neutral-700 hover:bg-neutral-50"
                  >
                    <HugeiconsIcon
                      icon={FavouriteIcon}
                      size={20}
                      primaryColor="currentColor"
                      strokeWidth={2}
                    />
                    Wishlist
                  </button>
                  <button
                    type="button"
                    className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-base font-medium text-neutral-700 hover:bg-neutral-50"
                  >
                    <HugeiconsIcon
                      icon={ShoppingCartAdd02Icon}
                      size={20}
                      primaryColor="currentColor"
                      strokeWidth={2}
                    />
                    Cart
                  </button>
                </div>

                <div className="mt-4 flex flex-wrap gap-3 border-t border-neutral-100 pt-4 sm:hidden">
                  {topBarDropdowns.map((label) => (
                    <TopBarDropdown
                      key={label}
                      label={label}
                      className="text-neutral-700"
                    />
                  ))}
                </div>
              </div>
            </div>
          </>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
