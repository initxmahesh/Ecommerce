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
    <section className="bg-white py-8 font-Poppins lg:py-12">
      <div className="page-container">
        <div className="mb-6 flex flex-col gap-4 sm:mb-8 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h2 className="text-xl font-bold tracking-tight text-black/70 md:text-2xl">
              New <span className="text-primary">Arrivals</span>
            </h2>
            <p className="mt-1 text-sm text-neutral-400 md:text-base">
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

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
          {previewProducts.map((product) => (
            <DealProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default NewArrivals;
