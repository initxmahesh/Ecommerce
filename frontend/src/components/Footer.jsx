import {
  CallIcon,
  CustomerService01Icon,
  DeliveryTruck01Icon,
  MailAtSign01Icon,
  MapPinCheckIcon,
  RotateClockwiseIcon,
  ShieldUserIcon,
  SquareLock01Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";

const accent = "#5cae8f";

const categoryLinks = [
  { label: "Fashion", to: "/products" },
  { label: "Electronics", to: "/products" },
  { label: "Home & Kitchen", to: "/products" },
  { label: "Beauty & Personal Care", to: "/products" },
  { label: "Groceries", to: "/products" },
  { label: "View All Categories", to: "/products" },
];

const companyLinks = [
  { label: "About Us", to: "/about" },
  { label: "Delivery", to: "#" },
  { label: "Legal Notice", to: "#" },
  { label: "Terms & Conditions", to: "#" },
  { label: "Secure Payment", to: "#" },
];

const accountLinks = [
  { label: "Sign In", to: "/login" },
  { label: "View Cart", to: "#" },
  { label: "Return Policy", to: "#" },
  { label: "Become A Vendor", to: "/register" },
  { label: "Affiliate Program", to: "#" },
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
        className="h-5 w-5 fill-current"
        aria-hidden="true"
      >
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
  },
  {
    label: "Twitter",
    href: "#",
    icon: (
      <svg
        viewBox="0 0 24 24"
        className="h-5 w-5 fill-current"
        aria-hidden="true"
      >
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "#",
    icon: (
      <svg
        viewBox="0 0 24 24"
        className="h-5 w-5 fill-current"
        aria-hidden="true"
      >
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    label: "Instagram",
    href: "#",
    icon: (
      <svg
        viewBox="0 0 24 24"
        className="h-5 w-5 fill-current"
        aria-hidden="true"
      >
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
      </svg>
    ),
  },
];

const ColumnHeader = ({ children }) => (
  <h3 className="mb-3 text-[17px] font-semibold" style={{ color: accent }}>
    {children}
  </h3>
);

const FooterLink = ({ to, children }) => (
  <Link
    to={to}
    className="text-[14px] text-neutral-500 transition-colors hover:text-neutral-800"
  >
    {children}
  </Link>
);

const Footer = () => {
  return (
    <footer className="font-Poppins">
      <div className="border-t border-neutral-100 bg-white px-6 py-12">
        <div className="mx-auto flex max-w-full flex-col gap-10 lg:flex-row lg:gap-60">
          {/* Branding */}
          <div className="shrink-0 lg:max-w-xs">
            <Link to="/" className="mb-4 flex items-center gap-2">
              <span
                className="flex h-9 w-9 items-center justify-center rounded-md"
                style={{ backgroundColor: accent }}
              >
                <ShoppingBag className="h-5 w-5 text-white" strokeWidth={2} />
              </span>
              <span className="text-xl font-bold text-[#2c3e6b]">
                VendorFlow
              </span>
            </Link>

            <p className="mb-6 text-[14px] text-justify leading-relaxed text-neutral-500">
              VendorFlow is the biggest marketplace for products. Get your daily
              needs from our store.
            </p>

            <div className="flex flex-wrap gap-3">
              <a
                href="#"
                className="flex items-center gap-2 rounded-md bg-[#4c5966] px-3 py-2 transition-colors hover:bg-[#4c5966]/90"
              >
                <svg
                  viewBox="0 0 448 512"
                  className="h-5 w-5 shrink-0 fill-white"
                  aria-hidden="true"
                >
                  <path d="M293.6 234.3L72.9 13 353.7 174.2 293.6 234.3zM15.3 0C2.3 6.8-6.4 19.2-6.4 35.3l0 441.3c0 16.1 8.7 28.5 21.7 35.3L271.9 255.9 15.3 0zM440.5 225.6l-58.9-34.1-65.7 64.5 65.7 64.5 60.1-34.1c18-14.3 18-46.5-1.2-60.8zM72.9 499L353.7 337.8 293.6 277.7 72.9 499z" />
                </svg>

                <span className="text-left leading-tight">
                  <span className="block text-[9px] uppercase text-white">
                    Get it on
                  </span>
                  <span className="block text-[12px] font-semibold text-white">
                    Google Play
                  </span>
                </span>
              </a>

              <a
                href="#"
                className="flex items-center gap-2 rounded-md bg-[#4c5966] px-3 py-2 transition-colors hover:bg-[#4c5966]/90"
              >
                <svg
                  viewBox="0 0 400 512"
                  className="h-6 w-5 shrink-0 fill-white"
                  aria-hidden="true"
                >
                  <path d="M319.1 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7-55.8 .9-115.1 44.5-115.1 133.2 0 26.2 4.8 53.3 14.4 81.2 12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zM262.5 104.5c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z" />
                </svg>
                <span className="text-left leading-tight">
                  <span className="block text-[9px] uppercase text-white">
                    Download on the
                  </span>
                  <span className="block text-[12px] font-semibold text-white">
                    App Store
                  </span>
                </span>
              </a>
            </div>
          </div>

          {/* Link columns */}
          <div className="grid flex-1 grid-cols-2 gap-10 sm:grid-cols-2 lg:grid-cols-[0.5fr_0.5fr_0.5fr_0.5fr] lg:gap-10">
            <div>
              <ColumnHeader>Category</ColumnHeader>
              <ul className="space-y-2.5">
                {categoryLinks.map((link) => (
                  <li key={link.label}>
                    <FooterLink to={link.to}>{link.label}</FooterLink>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <ColumnHeader>Company</ColumnHeader>
              <ul className="space-y-2.5">
                {companyLinks.map((link) => (
                  <li key={link.label}>
                    <FooterLink to={link.to}>{link.label}</FooterLink>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <ColumnHeader>Account</ColumnHeader>
              <ul className="space-y-2.5">
                {accountLinks.map((link) => (
                  <li key={link.label}>
                    <FooterLink to={link.to}>{link.label}</FooterLink>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <ColumnHeader>Contact</ColumnHeader>
              <ul className="mb-6 space-y-3">
                <li className="flex gap-2.5 text-[14px] text-neutral-500">
                  <HugeiconsIcon
                    icon={MapPinCheckIcon}
                    size={32}
                    primaryColor={accent}
                    strokeWidth={2}
                  />
                  <span className="text-justify">
                    2548 Broaddus Maple Court, Madisonville KY 4783, USA.
                  </span>
                </li>
                <li className="flex items-center gap-2.5 text-[14px] text-neutral-500">
                  <HugeiconsIcon
                    icon={CallIcon}
                    size={20}
                    primaryColor={accent}
                    strokeWidth={2}
                  />
                  <a
                    href="tel:+919876543210"
                    className="hover:text-neutral-800"
                  >
                    +91 9876543210
                  </a>
                </li>
                <li className="flex items-center gap-2.5 text-[14px] text-neutral-500">
                  <HugeiconsIcon
                    icon={MailAtSign01Icon}
                    size={20}
                    primaryColor={accent}
                    strokeWidth={2}
                  />
                  <a
                    href="mailto:cartify@email.com"
                    className="hover:text-neutral-800"
                  >
                    cartify@email.com
                  </a>
                </li>
              </ul>

              <div className="flex gap-2">
                {socialLinks.map(({ label, href, icon }) => (
                  <a
                    key={label}
                    href={href}
                    aria-label={label}
                    className="flex h-8 w-8 items-center justify-center rounded-md text-white transition-opacity hover:opacity-90"
                    style={{ backgroundColor: accent }}
                  >
                    {icon}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Trust highlights */}
      <div className="border-t border-b border-neutral-200 px-4 py-5">
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
                strokeWidth={1.5}
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
