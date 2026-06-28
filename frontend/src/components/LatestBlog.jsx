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
    <section className="bg-white py-10 font-Poppins">
      <div className="container mx-auto px-4 lg:px-6">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-black/70">
              Latest <span className="text-primary">Blog</span>
            </h2>
            <p className="mt-1 text-sm text-neutral-400 sm:text-base">
              We tackle interesting topics every day in 2023.
            </p>
          </div>

          <Link
            to={allBlogsLink}
            className="inline-flex shrink-0 items-center justify-center rounded-md border border-neutral-200 bg-white px-5 py-2.5 text-sm font-medium text-black/70 shadow-sm transition hover:border-primary hover:text-primary"
          >
            All Blogs
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-4 min-[500px]:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {previewPosts.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default LatestBlog;
