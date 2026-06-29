import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { CATEGORIES, HOME_CATEGORIES_COUNT } from "../data/categoriesData.js";
import CategoryCard from "./categories/CategoryCard.jsx";

const Categories = () => {
  const previewCategories = CATEGORIES.slice(0, HOME_CATEGORIES_COUNT);

  return (
    <section className="bg-white pb-8 font-Poppins lg:pb-12">
      <div className="page-container">
        <div className="mb-6 flex flex-col gap-4 sm:mb-8 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="text-xl font-bold tracking-tight text-black/80 md:text-2xl">
            Shop by Categories
          </h2>

          <Link
            to="/products"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-black/70 transition hover:text-primary"
          >
            View All Categories
            <ArrowRight className="h-5 w-5" strokeWidth={2} />
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 md:gap-5 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
          {previewCategories.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;
