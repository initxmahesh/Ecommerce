import {
  CustomerService01Icon,
  DeliveryTruck01Icon,
  RotateClockwiseIcon,
  ShieldUserIcon,
  ShoppingBag03Icon,
  SquareLock01Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { Link } from "react-router-dom";

const accent = "#5cae8f";

const shopLinks = [
  { label: "Browse Categories", to: "/products" },
  { label: "New Arrivals", to: "/new-arrivals" },
  { label: "Best Sellers", to: "/best-selling" },
  { label: "Trending Products", to: "/trending-products" },
  { label: "Deals & Offers", to: "/deal-and-offers" },
];

const sellWithUsLinks = [
  { label: "Become a Seller", to: "/register" },
  { label: "Seller Dashboard", to: "#" },
  { label: "Seller Resources", to: "/seller-resources" },
  { label: "Seller Policies", to: "/seller-policies" },
  { label: "Seller Support", to: "/seller-support" },
];

const customerCareLinks = [
  { label: "Help Center", to: "#" },
  { label: "Track Your Order", to: "#" },
  { label: "Shipping Information", to: "#" },
  { label: "Returns & Refunds", to: "#" },
  { label: "FAQs", to: "#" },
];

const companyLinks = [
  { label: "About Us", to: "/about" },
  { label: "Contact Us", to: "#" },
  { label: "Careers", to: "#" },
  { label: "Marketplace Blog", to: "#" },
];

const resourcesLinks = [
  { label: "Buying Guide", to: "#" },
  { label: "Trust & Safety", to: "#" },
  { label: "Payment Methods", to: "#" },
  { label: "Community Guidelines", to: "#" },
  { label: "Developer API", to: "#" },
];

const linkColumns = [
  { title: "Shop", links: shopLinks },
  { title: "Sell with Us", links: sellWithUsLinks },
  {
    title: "Customer Care",
    links: customerCareLinks,
  },
  { title: "Company", links: companyLinks },
  { title: "Resources", links: resourcesLinks },
];

const trustHighlights = [
  {
    icon: DeliveryTruck01Icon,
    title: "Fast & Reliable",
    subtitle: "Delivery",
  },
  { icon: SquareLock01Icon, title: "100% Secure", subtitle: "Checkout" },
  { icon: ShieldUserIcon, title: "Verified", subtitle: "Sellers" },
  { icon: RotateClockwiseIcon, title: "Hassle-Free", subtitle: "Returns" },
  {
    icon: CustomerService01Icon,
    title: "Dedicated",
    subtitle: "Customer Support",
  },
];

const paymentMethods = [
  { name: "VISA", src: "/visa.svg" },
  { name: "Mastercard", src: "/mastercard.svg" },
  { name: "PayPal", src: "/paypal.svg" },
  { name: "Skrill", src: "/skrill.svg" },
  { name: "Visa Electron", src: "/visa-electron.svg" },
];

const socialLinks = [
  {
    label: "Facebook",
    href: "#",
    icon: (
      <svg
        viewBox="0 0 24 24"
        className="h-4 w-4 fill-current"
        aria-hidden="true"
      >
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
  },
  {
    label: "Instagram",
    href: "#",
    icon: (
      <svg
        viewBox="0 0 24 24"
        className="h-4 w-4 fill-current"
        aria-hidden="true"
      >
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "#",
    icon: (
      <svg
        viewBox="0 0 24 24"
        className="h-4 w-4 fill-current"
        aria-hidden="true"
      >
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    label: "X",
    href: "#",
    icon: (
      <svg
        viewBox="0 0 24 24"
        className="h-4 w-4 fill-current"
        aria-hidden="true"
      >
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    label: "YouTube",
    href: "#",
    icon: (
      <svg
        viewBox="0 0 24 24"
        className="h-4 w-4 fill-current"
        aria-hidden="true"
      >
        <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    ),
  },
];

const FooterLink = ({ to, children }) => (
  <Link
    to={to}
    className="text-[13px] text-neutral-600 transition-colors hover:text-neutral-900"
  >
    {children}
  </Link>
);

const LinkColumn = ({title, links }) => (
  <div>
    <h3
      className="mt-2.5 mb-3 text-[15px] font-bold decoration-neutral-300 underline-offset-4"
      style={{ color: accent }}
    >
      {title}
    </h3>
    <ul className="space-y-2">
      {links.map((link) => (
        <li key={link.label} className="flex items-start gap-2">
          <FooterLink to={link.to}>{link.label}</FooterLink>
        </li>
      ))}
    </ul>
  </div>
);

const Footer = () => {
  return (
    <footer className="font-Poppins">
      <div className="border-t border-neutral-200 bg-neutral-50 px-6 py-6">
        <div className="mx-auto grid max-w-full grid-cols-1 gap-10 xl:grid-cols-[22%_11%_70%] xl:gap-0">
          {/* Brand & engagement — 20% */}
          <div className="flex flex-col">
            <Link to="/" className="mb-4 flex items-center gap-2">
              <span
                className="flex h-9 w-9 items-center justify-center rounded-xl"
                style={{ backgroundColor: accent }}
              >
                <HugeiconsIcon
                  icon={ShoppingBag03Icon}
                  size={20}
                  primaryColor="#ffffff"
                  strokeWidth={2}
                />
              </span>
              <span className="text-xl font-bold text-[#2c3e6b]">
                Cartify
              </span>
            </Link>

            <p className="mb-6 text-[13px] text-justify leading-relaxed text-neutral-600">
              Connecting trusted sellers with customers through a secure, modern
              marketplace designed for effortless shopping.
            </p>

            <div className="mb-6">
              <h4 className="mb-3 text-[14px] font-bold text-neutral-800">
                Follow Us
              </h4>
              <div className="flex flex-wrap gap-2.5">
                {socialLinks.map(({ label, href, icon }) => (
                  <a
                    key={label}
                    href={href}
                    aria-label={label}
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-neutral-300 text-neutral-600 transition-colors hover:border-neutral-400 hover:text-neutral-800 object-contain"
                    style={{ justifyContent: "center" }}
                  >
                    {icon}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Spacer — 10% */}
          <div aria-hidden="true" className="hidden xl:block" />

          {/* Link columns — 70% */}
          <div className="grid grid-cols-1 gap-20 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 xl:gap-x-10 xl:gap-y-0">
            {linkColumns.map((column) => (
              <LinkColumn key={column.title} {...column} />
            ))}
          </div>
        </div>
      </div>

      {/* Trust highlights */}
      <div className="border-t border-b border-neutral-200 bg-white py-3">
        <div className="mx-auto grid max-w-full grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 lg:gap-0 lg:divide-x lg:divide-neutral-200">
          {trustHighlights.map(({ icon, title, subtitle }) => (
            <div
              key={title}
              className="flex items-center justify-center gap-3 px-4"
            >
              <HugeiconsIcon
                icon={icon}
                className="h-8 w-8 shrink-0"
                primaryColor={accent}
                strokeWidth={2}
              />
              <div className="text-[13px] leading-tight text-neutral-800">
                <span className="block font-medium">{title}</span>
                <span className="block">{subtitle}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="px-4 py-4" style={{ backgroundColor: accent }}>
        <div className="mx-auto flex max-w-full flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-center text-[13px] text-white sm:text-left">
            Copyright © VendorFlow all rights reserved.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-10">
            <Link to="/privacy-policy" className="text-[13px] text-white">
              Privacy Policy
            </Link>
            <Link to="/terms-of-service" className="text-[13px] text-white">
              Terms & Conditions
            </Link>
            <Link to="/refund-policy" className="text-[13px] text-white">
              Refund Policy
            </Link>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4">
            {paymentMethods.map((method) => (
              <span
                key={method.name}
                className="block h-7 w-10 overflow-hidden rounded bg-white"
              >
                <img
                  src={method.src}
                  alt={method.name}
                  className="block h-full w-full object-cover"
                />
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
