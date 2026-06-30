import { Star } from "lucide-react";
import { useState } from "react";

const TABS = [
  { id: "detail", label: "Detail" },
  { id: "specifications", label: "Specifications" },
  { id: "vendor", label: "Vendor" },
  { id: "reviews", label: "Reviews" },
];

const StarRating = ({ rating, size = "sm" }) => {
  const sizeClass = size === "sm" ? "h-3.5 w-3.5" : "h-4 w-4";

  return (
    <div className="flex items-center gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }, (_, index) => (
        <Star
          key={index}
          className={`${sizeClass} ${
            index < rating
              ? "fill-amber-400 text-amber-400"
              : "fill-neutral-300 text-neutral-300"
          }`}
          strokeWidth={0}
        />
      ))}
    </div>
  );
};

const ProductTabs = ({ product }) => {
  const [activeTab, setActiveTab] = useState("detail");

  return (
    <div className="mt-5 lg:mt-8">
      <div className="flex flex-wrap gap-2">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id)}
            className={`rounded-md px-4 py-2 text-sm font-medium transition focus:outline-none focus:ring-2 focus:ring-primary/30 ${
              activeTab === tab.id
                ? "bg-primary text-white"
                : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="mt-6 min-h-[200px] rounded-xl border border-neutral-200 bg-white p-5 sm:p-6">
        {activeTab === "detail" && (
          <div className="space-y-4 text-sm text-justify leading-relaxed text-neutral-500 md:text-base">
            <p>{product.detailContent}</p>
            <ul className="list-disc space-y-2 pl-5">
              {product.attributes.map((attribute) => (
                <li key={attribute}>{attribute}</li>
              ))}
            </ul>
          </div>
        )}

        {activeTab === "specifications" && (
          <dl className="divide-y divide-neutral-100">
            {product.specifications.map((spec) => (
              <div
                key={spec.label}
                className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4"
              >
                <dt className="text-sm font-medium text-black/70">{spec.label}</dt>
                <dd className="text-sm text-neutral-500 sm:col-span-2">{spec.value}</dd>
              </div>
            ))}
          </dl>
        )}

        {activeTab === "vendor" && (
          <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-3">
              <h3 className="text-lg font-semibold text-black/80">{product.vendor.name}</h3>
              <StarRating rating={Math.round(product.vendor.rating)} />
              <span className="text-sm text-neutral-500">
                {product.vendor.rating} / 5
              </span>
            </div>
            <p className="text-sm text-neutral-500 md:text-base">
              {product.vendor.description}
            </p>
            <div className="flex flex-wrap gap-4 text-sm text-neutral-500">
              <span>{product.vendor.products} Products</span>
              <span>Since {product.vendor.since}</span>
            </div>
          </div>
        )}

        {activeTab === "reviews" && (
          <div className="space-y-5">
            {product.reviews.map((review) => (
              <article
                key={review.id}
                className="border-b border-neutral-100 pb-5 last:border-0 last:pb-0"
              >
                <div className="flex flex-wrap items-center gap-2">
                  <p className="text-sm font-semibold text-black/70">{review.author}</p>
                  <StarRating rating={review.rating} />
                  <span className="text-xs text-neutral-400">{review.date}</span>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-neutral-500">
                  {review.comment}
                </p>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductTabs;
