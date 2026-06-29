import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { DEAL_PRODUCTS, HOME_DEALS_COUNT } from "../data/dealsProducts.js";
import DealProductCard from "./deals/DealProductCard.jsx";

const DayOfTheDeal = () => {
  const previewProducts = DEAL_PRODUCTS.slice(0, HOME_DEALS_COUNT);
  const hasMore = DEAL_PRODUCTS.length > HOME_DEALS_COUNT;

  return (
    <section className="bg-white py-8 font-Poppins lg:py-12">
      <div className="page-container">
        <div className="mb-6 flex flex-col gap-4 sm:mb-8 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h2 className="text-xl font-bold tracking-tight text-black/70 md:text-2xl">
              Day Of The <span className="text-primary">Deal</span>
            </h2>
            <p className="mt-1 text-sm text-neutral-400 md:text-base">
              Don&apos;t wait. The time will never be just right.
            </p>
          </div>

          {hasMore && (
            <Link
              to="/deal-and-offers"
              className="inline-flex shrink-0 items-center gap-1.5 text-sm font-medium text-black/70 transition hover:text-primary"
            >
              Show More
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

export default DayOfTheDeal;
