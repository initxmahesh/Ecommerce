import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import {
  CATEGORIES,
  HOME_CATEGORIES_COUNT,
} from "../data/categoriesData.js";
import CategoryCard from "./categories/CategoryCard.jsx";

const Categories = () => {
  const previewCategories = CATEGORIES.slice(0, HOME_CATEGORIES_COUNT);

  return (
    <section className="bg-white pb-10 font-Poppins">
      <div className="container mx-auto px-4 lg:px-6">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="text-2xl font-bold tracking-tight text-black/80">
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

        <div className="grid grid-cols-1 gap-5 min-[500px]:grid-cols-2 md:grid-cols-3 xl:grid-cols-6">
          {previewCategories.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;
