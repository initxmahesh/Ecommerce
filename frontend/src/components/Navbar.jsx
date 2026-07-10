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
import { useCallback, useEffect, useMemo, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../hooks/useAuth.js";
import {
  ACCOUNT_LINKS,
  CURRENCIES,
  LANGUAGES,
  MOCK_CART_ITEMS,
  MOCK_WISHLIST_ITEMS,
} from "../data/navbarData.js";
import CartDrawer from "./navbar/CartDrawer.jsx";
import IconActionButton from "./navbar/IconActionButton.jsx";
import SearchOverlay from "./navbar/SearchOverlay.jsx";
import TopBarSelect from "./navbar/TopBarSelect.jsx";
import WishlistDrawer from "./navbar/WishlistDrawer.jsx";

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

const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activePanel, setActivePanel] = useState(null);
  const [language, setLanguage] = useState("en");
  const [currency, setCurrency] = useState("USD");
  const [cartItems, setCartItems] = useState(MOCK_CART_ITEMS);
  const [wishlistItems, setWishlistItems] = useState(MOCK_WISHLIST_ITEMS);

  const cartCount = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.quantity, 0),
    [cartItems],
  );

  const accountLinks = useMemo(() => {
    if (!isAuthenticated) {
      return ACCOUNT_LINKS;
    }

    return [
      {
        label: user?.fullName || "My Account",
        to: "/account",
        description: user?.email,
      },
      {
        label: "Sign Out",
        description: "Log out of your account",
        onClick: () => {
          logout();
        },
      },
    ];
  }, [isAuthenticated, user, logout]);

  const accountLabel = isAuthenticated
    ? user?.firstName || "Account"
    : "Account";

  const isOverlayOpen = isMenuOpen || activePanel !== null;

  useEffect(() => {
    document.body.style.overflow = isOverlayOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOverlayOpen]);

  const closeMenu = useCallback(() => setIsMenuOpen(false), []);

  const openPanel = useCallback((panel) => {
    setActivePanel(panel);
    setIsMenuOpen(false);
  }, []);

  const closePanel = useCallback(() => setActivePanel(null), []);

  const handleUpdateCartQuantity = useCallback((id, quantity) => {
    setCartItems((current) =>
      current.map((item) =>
        item.id === id ? { ...item, quantity } : item,
      ),
    );
  }, []);

  const handleRemoveFromCart = useCallback((id) => {
    setCartItems((current) => current.filter((item) => item.id !== id));
  }, []);

  const handleRemoveFromWishlist = useCallback((id) => {
    setWishlistItems((current) => current.filter((item) => item.id !== id));
  }, []);

  const handleMoveToCart = useCallback((item) => {
    setCartItems((current) => {
      const existing = current.find((cartItem) => cartItem.id === item.id);
      if (existing) {
        return current.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem,
        );
      }
      return [...current, { ...item, quantity: 1 }];
    });
    setWishlistItems((current) =>
      current.filter((wishlistItem) => wishlistItem.id !== item.id),
    );
  }, []);

  const selectedLanguage =
    LANGUAGES.find((option) => option.code === language)?.label ?? "English";

  const selectedCurrency =
    CURRENCIES.find((option) => option.code === currency)?.label ?? "USD ($)";

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
            <TopBarSelect
              label={selectedLanguage}
              options={LANGUAGES}
              value={language}
              onChange={setLanguage}
              className="text-white focus:ring-white/50"
            />
            <TopBarSelect
              label={selectedCurrency}
              options={CURRENCIES}
              value={currency}
              onChange={setCurrency}
              className="text-white focus:ring-white/50"
            />
            <TopBarSelect
              label={accountLabel}
              options={accountLinks}
              value="account"
              variant="links"
              className="text-white focus:ring-white/50"
            />
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
            <IconActionButton
              label="Search"
              onClick={() => openPanel("search")}
              icon={
                <HugeiconsIcon
                  icon={Search01Icon}
                  size={22}
                  primaryColor="currentColor"
                  strokeWidth={2}
                />
              }
            />

            <IconActionButton
              label="Wishlist"
              count={wishlistItems.length}
              onClick={() => openPanel("wishlist")}
              className="hidden sm:block"
              icon={
                <HugeiconsIcon
                  icon={FavouriteIcon}
                  size={22}
                  primaryColor="currentColor"
                  strokeWidth={2}
                />
              }
            />

            <IconActionButton
              label="Cart"
              count={cartCount}
              onClick={() => openPanel("cart")}
              className="hidden sm:block"
              icon={
                <HugeiconsIcon
                  icon={ShoppingCartAdd02Icon}
                  size={22}
                  primaryColor="currentColor"
                  strokeWidth={2}
                />
              }
            />

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
                    onClick={() => openPanel("wishlist")}
                    className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-base font-medium text-neutral-700 hover:bg-neutral-50"
                  >
                    <HugeiconsIcon
                      icon={FavouriteIcon}
                      size={20}
                      primaryColor="currentColor"
                      strokeWidth={2}
                    />
                    Wishlist
                    {wishlistItems.length > 0 && (
                      <span className="ml-auto rounded-full bg-primary px-2 py-0.5 text-xs font-semibold text-white">
                        {wishlistItems.length}
                      </span>
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={() => openPanel("cart")}
                    className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-base font-medium text-neutral-700 hover:bg-neutral-50"
                  >
                    <HugeiconsIcon
                      icon={ShoppingCartAdd02Icon}
                      size={20}
                      primaryColor="currentColor"
                      strokeWidth={2}
                    />
                    Cart
                    {cartCount > 0 && (
                      <span className="ml-auto rounded-full bg-primary px-2 py-0.5 text-xs font-semibold text-white">
                        {cartCount}
                      </span>
                    )}
                  </button>
                </div>

                <div className="mt-4 flex flex-wrap items-center gap-4 border-t border-neutral-100 pt-4 sm:hidden">
                  <TopBarSelect
                    label={selectedLanguage}
                    options={LANGUAGES}
                    value={language}
                    onChange={setLanguage}
                    className="text-neutral-700"
                  />
                  <TopBarSelect
                    label={selectedCurrency}
                    options={CURRENCIES}
                    value={currency}
                    onChange={setCurrency}
                    className="text-neutral-700"
                  />
                  <TopBarSelect
                    label={accountLabel}
                    options={accountLinks}
                    value="account"
                    variant="links"
                    className="text-neutral-700"
                  />
                </div>
              </div>
            </div>
          </>
        )}
      </nav>

      <SearchOverlay
        isOpen={activePanel === "search"}
        onClose={closePanel}
      />
      <WishlistDrawer
        isOpen={activePanel === "wishlist"}
        onClose={closePanel}
        items={wishlistItems}
        onRemove={handleRemoveFromWishlist}
        onMoveToCart={handleMoveToCart}
      />
      <CartDrawer
        isOpen={activePanel === "cart"}
        onClose={closePanel}
        items={cartItems}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemove={handleRemoveFromCart}
      />
    </header>
  );
};

export default Navbar;
