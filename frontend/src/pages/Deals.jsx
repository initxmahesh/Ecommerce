import { useEffect, useState } from "react";
import DealProductCard from "../components/deals/DealProductCard.jsx";
import { fetchDeals } from "../services/dealsApi.js";

const Deals = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    fetchDeals()
      .then((data) => {
        if (isMounted) {
          setProducts(data);
        }
      })
      .finally(() => {
        if (isMounted) {
          setIsLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <section className="bg-white py-8 font-Poppins lg:py-12">
      <div className="page-container">
        <div className="mb-6 sm:mb-8">
          <h1 className="text-xl font-bold tracking-tight text-black/70 md:text-2xl">
            Day Of The <span className="text-primary">Deal</span>
          </h1>
          <p className="mt-1 text-sm text-neutral-400 md:text-base">
            Don&apos;t wait. The time will never be just right.
          </p>
        </div>

        {isLoading ? (
          <p className="text-sm text-neutral-500">Loading deals...</p>
        ) : (
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
            {products.map((product) => (
              <DealProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Deals;
