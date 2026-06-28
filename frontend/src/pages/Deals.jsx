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
    <section className="bg-white py-10 font-Poppins lg:py-14">
      <div className="container mx-auto px-4 lg:px-6">
        <div className="mb-8">
          <h1 className="text-2xl font-bold tracking-tight text-black/70">
            Day Of The <span className="text-primary">Deal</span>
          </h1>
          <p className="mt-1 text-sm text-neutral-400 sm:text-base">
            Don&apos;t wait. The time will never be just right.
          </p>
        </div>

        {isLoading ? (
          <p className="text-sm text-neutral-500">Loading deals...</p>
        ) : (
          <div className="grid grid-cols-1 gap-4 min-[700px]:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
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
