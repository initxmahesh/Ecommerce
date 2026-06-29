import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const CategoryCard = ({ category, to = "/products" }) => (
  <Link
    to={to}
    className="group flex aspect-[2/2] flex-col overflow-hidden rounded-xl bg-white"
  >
    <div className="relative min-h-0 flex-1 overflow-hidden">
      <img
        src={category.image}
        alt={category.title}
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        loading="lazy"
      />
    </div>

    <div className="border-x border-b rounded-b-xl border-gray-300 bg-white px-3 py-3">
      <h3 className="text-base font-semibold text-black/80">{category.title}</h3>
      <div className="mt-1 flex items-center justify-between">
        <span className="text-sm text-neutral-500 transition-colors group-hover:text-primary">
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
