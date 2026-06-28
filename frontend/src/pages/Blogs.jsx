import BlogCard from "../components/blog/BlogCard.jsx";
import { BLOG_POSTS } from "../data/blogData.js";

const Blogs = () => {
  return (
    <section className="bg-white py-10 font-Poppins lg:py-14">
      <div className="container mx-auto px-4 lg:px-6">
        <div className="mb-8">
          <h1 className="text-2xl font-bold tracking-tight text-black/70">
            Latest <span className="text-primary">Blog</span>
          </h1>
          <p className="mt-1 text-sm text-neutral-400 sm:text-base">
            We tackle interesting topics every day in 2023.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 min-[500px]:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {BLOG_POSTS.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Blogs;
