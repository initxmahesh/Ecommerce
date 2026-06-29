import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import {
  HOME_NEW_ARRIVALS_COUNT,
  NEW_ARRIVALS_PRODUCTS,
} from "../data/newArrivalsProducts.js";
import DealProductCard from "./deals/DealProductCard.jsx";

const NewArrivals = ({
  products = NEW_ARRIVALS_PRODUCTS,
  limit = HOME_NEW_ARRIVALS_COUNT,
  showMore,
  moreLink = "/new-arrivals",
  moreLabel = "Show More",
}) => {
  const previewProducts = products.slice(0, limit);
  const shouldShowMore = showMore ?? products.length > limit;

  return (
    <section className="bg-white py-10 font-Poppins">
      <div className="container mx-auto px-4 lg:px-6">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-black/70">
              New <span className="text-primary">Arrivals</span>
            </h2>
            <p className="mt-1 text-sm text-neutral-400 sm:text-base">
              Shop online for new arrivals and get free shipping!
            </p>
          </div>

          {shouldShowMore && (
            <Link
              to={moreLink}
              className="inline-flex shrink-0 items-center gap-1.5 text-sm font-medium text-black/70 transition hover:text-primary"
            >
              {moreLabel}
              <ArrowRight className="h-4 w-4" strokeWidth={2} />
            </Link>
          )}
        </div>

        <div className="grid grid-cols-1 gap-4 min-[500px]:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {previewProducts.map((product) => (
            <DealProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default NewArrivals;
