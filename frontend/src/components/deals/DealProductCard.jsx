import { Star } from "lucide-react";

const badgeStyles = {
  SALE: "bg-[#f4a4a4] text-white",
  NEW: "bg-primary text-white",
};

const StarRating = ({ rating }) => (
  <div
    className="flex items-center gap-0.5"
    aria-label={`${rating} out of 5 stars`}
  >
    {Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`h-3 w-3 sm:h-3.5 sm:w-3.5 ${
          index < rating
            ? "fill-amber-400 text-amber-400"
            : "fill-neutral-600 text-neutral-600"
        }`}
        strokeWidth={0}
      />
    ))}
  </div>
);

const DealProductCard = ({ product }) => (
  <article className="overflow-hidden rounded-lg border border-neutral-200 bg-white transition-shadow hover:shadow-lg hover:shadow-black/30">
    <div className="relative flex aspect-square items-center justify-center bg-white p-2 sm:p-4">
      {product.badge && (
        <span
          className={`absolute right-1.5 top-1.5 rounded px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-wide sm:right-3 sm:top-3 sm:px-2 sm:text-[10px] ${badgeStyles[product.badge]}`}
        >
          {product.badge}
        </span>
      )}
      <img
        src={product.image}
        alt={product.name}
        className="max-h-full max-w-full object-contain"
        loading="lazy"
      />
    </div>

    <div className="h-px bg-neutral-200" aria-hidden="true" />

    <div className="space-y-1.5 p-2.5 sm:space-y-2 sm:p-4">
      <p className="truncate text-[10px] text-neutral-600 sm:text-xs">
        {product.category}
      </p>
      <h3 className="line-clamp-2 text-xs font-semibold leading-snug text-black/70 sm:text-sm">
        {product.name}
      </h3>

      <div className="flex items-center justify-between gap-1">
        <StarRating rating={product.rating} />
        {product.unit && (
          <span className="shrink-0 text-[10px] text-neutral-600 sm:text-xs">
            {product.unit}
          </span>
        )}
      </div>

      <div className="flex flex-wrap items-baseline gap-1.5 sm:gap-2">
        <span className="text-xs text-neutral-600 line-through sm:text-sm">
          ${product.originalPrice.toFixed(2)}
        </span>
        <span className="text-sm font-bold text-black/70 sm:text-base">
          ${product.price.toFixed(2)}
        </span>
      </div>
    </div>
  </article>
);

export default DealProductCard;
