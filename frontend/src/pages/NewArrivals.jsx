import DealProductCard from "../components/deals/DealProductCard.jsx";
import { NEW_ARRIVALS_PRODUCTS } from "../data/newArrivalsProducts.js";

const NewArrivalsPage = () => {
  return (
    <section className="bg-white py-10 font-Poppins lg:py-14">
      <div className="container mx-auto px-4 lg:px-6">
        <div className="mb-8">
          <h1 className="text-2xl font-bold tracking-tight text-black/70">
            New <span className="text-primary">Arrivals</span>
          </h1>
          <p className="mt-1 text-sm text-neutral-400 sm:text-base">
            Shop online for new arrivals and get free shipping!
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 min-[700px]:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {NEW_ARRIVALS_PRODUCTS.map((product) => (
            <DealProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default NewArrivalsPage;
