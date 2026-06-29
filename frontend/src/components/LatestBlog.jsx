import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { BLOG_POSTS, HOME_BLOG_COUNT } from "../data/blogData.js";
import BlogCard from "./blog/BlogCard.jsx";

const LatestBlog = ({
  posts = BLOG_POSTS,
  limit = HOME_BLOG_COUNT,
  allBlogsLink = "/blogs",
}) => {
  const previewPosts = posts.slice(0, limit);

  return (
    <section className="bg-white py-8 font-Poppins lg:py-12">
      <div className="page-container">
        <div className="mb-6 flex flex-col gap-4 sm:mb-8 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h2 className="text-xl font-bold tracking-tight text-black/70 md:text-2xl">
              Latest <span className="text-primary">Blog</span>
            </h2>
            <p className="mt-1 text-sm text-neutral-400 md:text-base">
              We tackle interesting topics every day in 2023.
            </p>
          </div>

          <Link
            to={allBlogsLink}
            className="inline-flex shrink-0 items-center gap-1.5 text-sm font-medium text-black/70 transition hover:text-primary"
          >
            All Blogs
            <ArrowRight className="h-4 w-4" strokeWidth={2} />
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
          {previewPosts.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default LatestBlog;
