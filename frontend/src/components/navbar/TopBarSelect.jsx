import { ArrowDown01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

const TopBarSelect = ({
  label,
  options,
  value,
  onChange,
  className = "",
  variant = "select",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return undefined;

    const handleClickOutside = (event) => {
      if (!containerRef.current?.contains(event.target)) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (event) => {
      if (event.key === "Escape") setIsOpen(false);
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  const selected =
    options.find((option) => option.code === value || option.label === value) ??
    options[0];

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        onClick={() => setIsOpen((open) => !open)}
        className={`flex items-center gap-1 font-Poppins text-xs transition-opacity hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-primary sm:text-sm ${className}`}
      >
        {variant === "select" ? selected.label : label}
        <HugeiconsIcon
          icon={ArrowDown01Icon}
          size={14}
          primaryColor="currentColor"
          strokeWidth={2}
          className={`transition-transform ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      {isOpen && (
        <ul
          role="listbox"
          className={`absolute right-0 top-full z-50 mt-2 overflow-hidden rounded-lg border border-neutral-200 bg-white py-1 shadow-lg ${
            variant === "links" ? "min-w-52" : "min-w-44"
          }`}
        >
          {options.map((option) => {
            const isSelected =
              option.code === value || option.label === value || option.to === value;

            if (variant === "links") {
              if (option.onClick) {
                return (
                  <li key={option.label} role="option" aria-selected={isSelected}>
                    <button
                      type="button"
                      onClick={() => {
                        option.onClick();
                        setIsOpen(false);
                      }}
                      className="block w-full px-4 py-2.5 text-left transition-colors hover:bg-neutral-50"
                    >
                      <span className="block text-sm font-medium text-neutral-800">
                        {option.label}
                      </span>
                      {option.description && (
                        <span className="mt-0.5 block text-xs text-neutral-500">
                          {option.description}
                        </span>
                      )}
                    </button>
                  </li>
                );
              }

              return (
                <li key={option.label} role="option" aria-selected={isSelected}>
                  <Link
                    to={option.to}
                    onClick={() => setIsOpen(false)}
                    className="block px-4 py-2.5 transition-colors hover:bg-neutral-50"
                  >
                    <span className="block text-sm font-medium text-neutral-800">
                      {option.label}
                    </span>
                    {option.description && (
                      <span className="mt-0.5 block text-xs text-neutral-500">
                        {option.description}
                      </span>
                    )}
                  </Link>
                </li>
              );
            }

            return (
              <li key={option.code} role="option" aria-selected={isSelected}>
                <button
                  type="button"
                  onClick={() => {
                    onChange(option.code);
                    setIsOpen(false);
                  }}
                  className={`flex w-full items-center px-4 py-2 text-left text-sm transition-colors hover:bg-neutral-50 ${
                    isSelected ? "bg-primary/5 font-medium text-primary" : "text-neutral-700"
                  }`}
                >
                  {option.label}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default TopBarSelect;
