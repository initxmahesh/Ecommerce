import DealProductCard from "../deals/DealProductCard.jsx";

const RelatedProducts = ({ products }) => {
  if (!products.length) return null;

  return (
    <section className="mt-10 border-t border-neutral-200 pt-8 lg:mt-12">
      <h2 className="text-lg font-bold text-black/70 md:text-xl">
        Related <span className="text-primary">Products</span>
      </h2>

      <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4">
        {products.map((product) => (
          <DealProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
};

export default RelatedProducts;
