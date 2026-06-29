import { Search01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { Clock, Search, TrendingUp, X } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  SEARCH_PRODUCTS,
  TRENDING_SEARCHES,
} from "../../data/navbarData.js";

const SearchOverlay = ({ isOpen, onClose }) => {
  const inputRef = useRef(null);
  const [query, setQuery] = useState("");
  const [recentSearches, setRecentSearches] = useState([
    "Mixed nuts",
    "Cookies",
  ]);

  useEffect(() => {
    if (!isOpen) return undefined;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleKeyDown);
    inputRef.current?.focus();

    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  const results = useMemo(() => {
    const trimmed = query.trim().toLowerCase();
    if (!trimmed) return [];

    return SEARCH_PRODUCTS.filter(
      (product) =>
        product.name.toLowerCase().includes(trimmed) ||
        product.category.toLowerCase().includes(trimmed),
    ).slice(0, 6);
  }, [query]);

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    const trimmed = query.trim();
    if (!trimmed) return;

    setRecentSearches((current) => {
      const next = [trimmed, ...current.filter((item) => item !== trimmed)];
      return next.slice(0, 5);
    });
  };

  const handleSuggestionClick = (term) => {
    setQuery(term);
    inputRef.current?.focus();
  };

  if (!isOpen) return null;

  return (
    <>
      <button
        type="button"
        aria-label="Close search overlay"
        className="fixed inset-0 z-[60] bg-black/40"
        onClick={onClose}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Search products"
        className="fixed inset-x-0 top-0 z-[61] border-b border-neutral-200 bg-white shadow-lg"
      >
        <div className="page-container py-4 sm:py-5">
          <form onSubmit={handleSearchSubmit} className="flex items-center gap-3">
            <div className="relative flex-1">
              <Search
                className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-neutral-400"
                strokeWidth={2}
              />
              <input
                ref={inputRef}
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search products, categories, brands..."
                className="h-11 w-full rounded-xl border border-neutral-200 bg-neutral-50 pl-10 pr-4 text-sm text-neutral-900 placeholder:text-neutral-400 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 sm:h-12 sm:text-base"
              />
            </div>
            <button
              type="button"
              aria-label="Close search"
              onClick={onClose}
              className="rounded-lg p-2 text-neutral-500 transition-colors hover:bg-neutral-100 hover:text-neutral-800 focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <X className="h-5 w-5" strokeWidth={2} />
            </button>
          </form>

          <div className="mt-4 max-h-[60vh] overflow-y-auto sm:mt-5">
            {query.trim() ? (
              results.length > 0 ? (
                <div>
                  <p className="mb-3 text-xs font-medium uppercase tracking-wide text-neutral-500">
                    Products
                  </p>
                  <ul className="divide-y divide-neutral-100">
                    {results.map((product) => (
                      <li key={product.id}>
                        <Link
                          to="/products"
                          onClick={onClose}
                          className="flex items-center gap-3 rounded-lg px-2 py-3 transition-colors hover:bg-neutral-50"
                        >
                          <img
                            src={product.image}
                            alt={product.name}
                            className="h-12 w-12 shrink-0 rounded-lg object-contain"
                          />
                          <div className="min-w-0 flex-1">
                            <p className="truncate text-sm font-medium text-neutral-800">
                              {product.name}
                            </p>
                            <p className="text-xs text-neutral-500">
                              {product.category}
                            </p>
                          </div>
                          <span className="shrink-0 text-sm font-semibold text-primary">
                            ${product.price.toFixed(2)}
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : (
                <div className="flex flex-col items-center py-10 text-center">
                  <HugeiconsIcon
                    icon={Search01Icon}
                    size={40}
                    className="text-neutral-300"
                    strokeWidth={1.5}
                  />
                  <p className="mt-3 text-sm font-medium text-neutral-700">
                    No results for &ldquo;{query}&rdquo;
                  </p>
                  <p className="mt-1 text-xs text-neutral-500">
                    Try a different keyword or browse categories
                  </p>
                </div>
              )
            ) : (
              <div className="grid gap-6 sm:grid-cols-2">
                <div>
                  <p className="mb-3 flex items-center gap-1.5 text-xs font-medium uppercase tracking-wide text-neutral-500">
                    <TrendingUp className="h-3.5 w-3.5" strokeWidth={2} />
                    Trending
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {TRENDING_SEARCHES.map((term) => (
                      <button
                        key={term}
                        type="button"
                        onClick={() => handleSuggestionClick(term)}
                        className="rounded-full border border-neutral-200 bg-white px-3 py-1.5 text-xs font-medium text-neutral-700 transition-colors hover:border-primary hover:text-primary sm:text-sm"
                      >
                        {term}
                      </button>
                    ))}
                  </div>
                </div>

                {recentSearches.length > 0 && (
                  <div>
                    <p className="mb-3 flex items-center gap-1.5 text-xs font-medium uppercase tracking-wide text-neutral-500">
                      <Clock className="h-3.5 w-3.5" strokeWidth={2} />
                      Recent
                    </p>
                    <ul className="space-y-1">
                      {recentSearches.map((term) => (
                        <li key={term}>
                          <button
                            type="button"
                            onClick={() => handleSuggestionClick(term)}
                            className="w-full rounded-lg px-2 py-2 text-left text-sm text-neutral-700 transition-colors hover:bg-neutral-50 hover:text-primary"
                          >
                            {term}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchOverlay;
