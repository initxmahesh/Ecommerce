import { Link } from "react-router-dom";
import {
  DEAL_PRODUCTS,
  HOME_DEALS_COUNT,
} from "../data/dealsProducts.js";
import DealProductCard from "./deals/DealProductCard.jsx";

const DayOfTheDeal = () => {
  const previewProducts = DEAL_PRODUCTS.slice(0, HOME_DEALS_COUNT);
  const hasMore = DEAL_PRODUCTS.length > HOME_DEALS_COUNT;

  return (
    <section className="bg-white py-10 font-Poppins">
      <div className="container mx-auto px-4 lg:px-6">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-black/70">
              Day Of The <span className="text-primary">Deal</span>
            </h2>
            <p className="mt-1 text-sm text-neutral-400 sm:text-base">
              Don&apos;t wait. The time will never be just right.
            </p>
          </div>

          {hasMore && (
            <Link
              to="/deal-and-offers"
              className="inline-flex shrink-0 items-center justify-center rounded-md border border-neutral-200 bg-white px-5 py-2.5 text-sm font-medium text-black/70 shadow-sm transition hover:border-primary hover:text-primary"
            >
              Show More
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

export default DayOfTheDeal;
