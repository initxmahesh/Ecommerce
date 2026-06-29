import { Search } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { getBlogCategories } from "../../data/blogData.js";

const BlogSidebar = ({ recentPosts = [] }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const categories = getBlogCategories();

  const toggleCategory = (name) => {
    setSelectedCategories((prev) =>
      prev.includes(name)
        ? prev.filter((category) => category !== name)
        : [...prev, name],
    );
  };

  const handleSearch = (e) => {
    e.preventDefault();
  };

  const handleFilter = () => {
    // Category filter UI placeholder for future blog listing integration
  };

  return (
    <aside className="rounded-xl border border-neutral-200 bg-white p-4 sm:p-5 lg:sticky lg:top-24">
      <form onSubmit={handleSearch} className="relative">
        <label htmlFor="blog-search" className="sr-only">
          Search our blog
        </label>
        <input
          id="blog-search"
          type="search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search Our Blog"
          className="h-10 w-full rounded-md border border-neutral-200 bg-white pr-10 pl-3 text-sm text-black/70 placeholder:text-neutral-400 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
        />
        <button
          type="submit"
          className="absolute top-1/2 right-2 -translate-y-1/2 rounded p-1 text-neutral-400 transition hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
          aria-label="Search blog"
        >
          <Search className="h-4 w-4" strokeWidth={2} />
        </button>
      </form>

      <div className="mt-6 border-t border-neutral-100 pt-6">
        <h2 className="text-base font-bold text-black/70 md:text-lg">
          Recent Articles
        </h2>

        <ul className="mt-4 space-y-4">
          {recentPosts.map((post) => (
            <li key={post.id}>
              <Link
                to={`/blogs/${post.slug}`}
                className="group flex gap-3 rounded-lg transition hover:bg-neutral-50 focus:outline-none focus:ring-2 focus:ring-primary/20"
              >
                <div className="aspect-square h-14 w-14 shrink-0 overflow-hidden rounded-md sm:h-16 sm:w-16">
                  <img
                    src={post.image}
                    alt={post.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                  />
                </div>

                <div className="min-w-0 flex-1">
                  <h3 className="line-clamp-2 text-xs font-semibold text-black/70 transition group-hover:text-primary sm:text-sm">
                    {post.title}
                  </h3>
                  <p className="mt-1 text-[10px] text-neutral-400 sm:text-xs">
                    {post.date}
                  </p>
                  <p className="mt-0.5 text-[10px] text-primary sm:text-xs">
                    - {post.category}
                  </p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-6 border-t border-neutral-100 pt-6">
        <h2 className="text-base font-bold text-black/70 md:text-lg">
          Categories
        </h2>

        <ul className="mt-4 space-y-3">
          {categories.map(({ name, count }) => (
            <li key={name}>
              <label className="flex cursor-pointer items-center justify-between gap-3 text-sm text-black/70">
                <span className="flex items-center gap-2.5">
                  <input
                    type="checkbox"
                    checked={selectedCategories.includes(name)}
                    onChange={() => toggleCategory(name)}
                    className="h-4 w-4 rounded border-neutral-300 text-primary focus:ring-primary/30"
                  />
                  {name}
                </span>
                <span className="text-xs text-neutral-400">{count}</span>
              </label>
            </li>
          ))}
        </ul>

        <div className="mt-5 flex justify-end">
          <button
            type="button"
            onClick={handleFilter}
            className="h-9 rounded-md bg-primary px-5 text-sm font-medium text-white transition hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary/30"
          >
            Filter
          </button>
        </div>
      </div>
    </aside>
  );
};

export default BlogSidebar;
