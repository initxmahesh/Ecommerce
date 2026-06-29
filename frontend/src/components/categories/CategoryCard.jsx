import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const CategoryCard = ({ category, to = "/products" }) => (
  <Link
    to={to}
    className="group flex aspect-square flex-col overflow-hidden rounded-lg bg-white sm:rounded-xl"
  >
    <div className="relative min-h-0 flex-1 overflow-hidden">
      <img
        src={category.image}
        alt={category.title}
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        loading="lazy"
      />
    </div>

    <div className="rounded-b-lg border-x border-b border-gray-300 bg-white px-2 py-2 sm:rounded-b-xl sm:px-3 sm:py-3">
      <h3 className="text-sm font-semibold text-black/80 sm:text-base">
        {category.title}
      </h3>
      <div className="mt-1 flex items-center justify-between gap-1">
        <span className="text-xs text-neutral-500 transition-colors group-hover:text-primary sm:text-sm">
          Shop Now
        </span>
        <ArrowRight
          className="h-4 w-4 text-black/70 transition-transform group-hover:translate-x-0.5 group-hover:text-primary"
          strokeWidth={2}
        />
      </div>
    </div>
  </Link>
);

export default CategoryCard;
