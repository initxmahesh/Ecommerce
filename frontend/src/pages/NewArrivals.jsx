import DealProductCard from "../components/deals/DealProductCard.jsx";
import { NEW_ARRIVALS_PRODUCTS } from "../data/newArrivalsProducts.js";

const NewArrivalsPage = () => {
  return (
    <section className="bg-white py-8 font-Poppins lg:py-12">
      <div className="page-container">
        <div className="mb-6 sm:mb-8">
          <h1 className="text-xl font-bold tracking-tight text-black/70 md:text-2xl">
            New <span className="text-primary">Arrivals</span>
          </h1>
          <p className="mt-1 text-sm text-neutral-400 md:text-base">
            Shop online for new arrivals and get free shipping!
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
          {NEW_ARRIVALS_PRODUCTS.map((product) => (
            <DealProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default NewArrivalsPage;
