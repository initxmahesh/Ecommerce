import { Eye, Heart, Minus, Plus, Star } from "lucide-react";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import ProductImageGallery from "../components/product/ProductImageGallery.jsx";
import ProductTabs from "../components/product/ProductTabs.jsx";
import RelatedProducts from "../components/product/RelatedProducts.jsx";
import { getProductById, getRelatedProducts } from "../data/productsData.js";
import { useCart } from "../hooks/useCart.js";
import { useRequireAuth } from "../hooks/useRequireAuth.js";

const StarRating = ({ rating }) => (
  <div
    className="flex items-center gap-0.5"
    aria-label={`${rating} out of 5 stars`}
  >
    {Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`h-4 w-4 ${
          index < rating
            ? "fill-amber-400 text-amber-400"
            : "fill-neutral-300 text-neutral-300"
        }`}
        strokeWidth={0}
      />
    ))}
  </div>
);

const ProductDetailView = ({ product, relatedProducts }) => {
  const requireAuth = useRequireAuth();
  const { addToCart, toggleWishlist, isInWishlist } = useCart();

  const [selectedWeight, setSelectedWeight] = useState(product.weights[0]);
  const [quantity, setQuantity] = useState(1);
  const [cartFeedback, setCartFeedback] = useState("");

  const wishlisted = isInWishlist(product.id);

  const decreaseQuantity = () => {
    setQuantity((current) => Math.max(1, current - 1));
  };

  const increaseQuantity = () => {
    setQuantity((current) => current + 1);
  };

  const handleAddToCart = () => {
    if (!requireAuth("cart")) return;
    const ok = addToCart(
      {
        ...product,
        image: product.image ?? product.gallery?.[0],
      },
      quantity,
    );
    if (ok) {
      setCartFeedback("Added to cart");
      window.setTimeout(() => setCartFeedback(""), 2000);
    }
  };

  const handleToggleWishlist = () => {
    if (!requireAuth("wishlist")) return;
    toggleWishlist({
      ...product,
      image: product.image ?? product.gallery?.[0],
    });
  };

  return (
    <section className="bg-white py-6 font-Poppins sm:py-8 lg:py-10">
      <div className="page-container">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-10 xl:gap-14">
          <ProductImageGallery images={product.gallery} alt={product.name} />

          <div className="min-w-0">
            <h1 className="text-xl font-bold leading-snug text-black/80 md:text-2xl lg:text-3xl">
              {product.name}
            </h1>

            <div className="mt-3 flex flex-wrap items-center gap-3">
              <StarRating rating={product.rating} />
              <span className="text-sm text-neutral-500">
                {product.ratingCount} Ratings
              </span>
            </div>

            <div className="mt-4 flex flex-wrap items-baseline gap-2 sm:gap-3">
              <span className="text-2xl font-bold text-black/80 md:text-3xl">
                ${product.price.toFixed(2)}
              </span>
              {product.discount > 0 && (
                <span className="rounded bg-primary/15 px-2 py-0.5 text-sm font-semibold text-primary">
                  -{product.discount}%
                </span>
              )}
            </div>

            <p className="mt-1 text-sm text-neutral-500">
              M.R.P.:{" "}
              <span className="line-through">
                ${product.originalPrice.toFixed(2)}
              </span>
            </p>

            <div className="mt-4 flex flex-wrap items-center gap-4 text-sm">
              <span className="text-neutral-600">
                SKU#:{" "}
                <span className="font-medium text-black/70">{product.sku}</span>
              </span>
              <span
                className={`font-semibold uppercase tracking-wide ${
                  product.inStock ? "text-primary" : "text-red-500"
                }`}
              >
                {product.inStock ? "In Stock" : "Out of Stock"}
              </span>
            </div>

            <p className="mt-5 text-sm leading-relaxed text-neutral-500 md:text-base">
              {product.description}
            </p>

            <ul className="mt-4 list-disc space-y-1.5 pl-5 text-sm text-neutral-500">
              {product.attributes.map((attribute) => (
                <li key={attribute}>{attribute}</li>
              ))}
            </ul>

            <div className="mt-6">
              <p className="text-xs font-semibold uppercase tracking-wide text-neutral-600">
                Weight
              </p>
              <div className="mt-2 flex flex-wrap gap-2">
                {product.weights.map((weight) => (
                  <button
                    key={weight}
                    type="button"
                    onClick={() => setSelectedWeight(weight)}
                    className={`min-w-[4.5rem] rounded-md border px-4 py-2 text-sm font-medium transition ${
                      selectedWeight === weight
                        ? "border-primary bg-primary text-white"
                        : "border-neutral-200 bg-white text-neutral-600 hover:border-primary/50"
                    }`}
                  >
                    {weight}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <div className="flex h-11 items-center rounded-md border border-neutral-200">
                <button
                  type="button"
                  aria-label="Decrease quantity"
                  onClick={decreaseQuantity}
                  className="flex h-full w-8 items-center justify-center text-neutral-600 transition hover:text-primary"
                >
                  <Minus className="h-4 w-4" strokeWidth={2} />
                </button>
                <span className="min-w-[1.5rem] text-center text-sm font-medium text-black/70">
                  {quantity}
                </span>
                <button
                  type="button"
                  aria-label="Increase quantity"
                  onClick={increaseQuantity}
                  className="flex h-full w-8 items-center justify-center text-neutral-600 transition hover:text-primary"
                >
                  <Plus className="h-4 w-4" strokeWidth={2} />
                </button>
              </div>

              <button
                type="button"
                onClick={handleAddToCart}
                disabled={!product.inStock}
                className="h-11 flex-1 rounded-md bg-brand px-6 text-sm font-semibold uppercase tracking-wide text-white transition hover:bg-brand/90 disabled:cursor-not-allowed disabled:opacity-60 sm:flex-none sm:min-w-[200px]"
              >
                Add to Cart
              </button>

              <button
                type="button"
                aria-label={
                  wishlisted ? "Remove from wishlist" : "Add to wishlist"
                }
                aria-pressed={wishlisted}
                onClick={handleToggleWishlist}
                className={`flex h-11 w-11 items-center justify-center rounded-md border transition ${
                  wishlisted
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-neutral-200 text-neutral-600 hover:border-primary hover:text-primary"
                }`}
              >
                <Heart
                  className={`h-5 w-5 ${wishlisted ? "fill-current" : ""}`}
                  strokeWidth={2}
                />
              </button>
            </div>

            {cartFeedback && (
              <p
                role="status"
                className="mt-3 text-sm font-medium text-primary"
              >
                {cartFeedback}
              </p>
            )}
          </div>
        </div>

        <ProductTabs product={product} />
        <RelatedProducts products={relatedProducts} />
      </div>
    </section>
  );
};

const ProductDetail = () => {
  const { id } = useParams();
  const product = getProductById(id);
  const relatedProducts = getRelatedProducts(id);

  if (!product) {
    return (
      <section className="bg-white py-8 font-Poppins lg:py-12">
        <div className="page-container text-center">
          <h1 className="text-xl font-bold text-black/70 md:text-2xl">
            Product not found
          </h1>
          <p className="mt-2 text-sm text-neutral-400 md:text-base">
            The product you are looking for does not exist or has been removed.
          </p>
          <Link
            to="/"
            className="mt-6 inline-flex h-10 items-center rounded-md bg-primary px-5 text-sm font-medium text-white transition hover:bg-primary/90"
          >
            Back to Home
          </Link>
        </div>
      </section>
    );
  }

  return (
    <ProductDetailView
      key={id}
      product={product}
      relatedProducts={relatedProducts}
    />
  );
};

export default ProductDetail;
