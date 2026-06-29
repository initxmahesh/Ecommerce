import BlogCard from "../components/blog/BlogCard.jsx";
import { BLOG_POSTS } from "../data/blogData.js";

const Blogs = () => {
  return (
    <section className="bg-white py-8 font-Poppins lg:py-12">
      <div className="page-container">
        <div className="mb-6 sm:mb-8">
          <h1 className="text-xl font-bold tracking-tight text-black/70 md:text-2xl">
            Latest <span className="text-primary">Blog</span>
          </h1>
          <p className="mt-1 text-sm text-neutral-400 md:text-base">
            We tackle interesting topics every day in 2023.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
          {BLOG_POSTS.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Blogs;
