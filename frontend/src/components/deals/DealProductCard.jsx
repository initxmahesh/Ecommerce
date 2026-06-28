import { Star } from "lucide-react";

const badgeStyles = {
  SALE: "bg-[#f4a4a4] text-white",
  NEW: "bg-primary text-white",
};

const StarRating = ({ rating }) => (
  <div className="flex items-center gap-0.5" aria-label={`${rating} out of 5 stars`}>
    {Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`h-3.5 w-3.5 ${
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
    <div className="relative flex h-44 items-center justify-center bg-white p-4 sm:h-56">
      {product.badge && (
        <span
          className={`absolute right-3 top-3 rounded px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide ${badgeStyles[product.badge]}`}
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

    <div className="space-y-2 p-4">
      <p className="text-xs text-neutral-600">{product.category}</p>
      <h3 className="line-clamp-2 text-sm font-semibold leading-snug text-black/70">
        {product.name}
      </h3>

      <div className="flex items-center justify-between gap-2">
        <StarRating rating={product.rating} />
        {product.unit && (
          <span className="text-xs text-neutral-600">{product.unit}</span>
        )}
      </div>

      <div className="flex items-baseline gap-2">
        <span className="text-sm text-neutral-600 line-through">
          ${product.originalPrice.toFixed(2)}
        </span>
        <span className="text-base font-bold text-black/70">
          ${product.price.toFixed(2)}
        </span>
      </div>
    </div>
  </article>
);

export default DealProductCard;
