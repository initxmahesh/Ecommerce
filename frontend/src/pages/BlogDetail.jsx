import { Link, useParams } from "react-router-dom";
import BlogSidebar from "../components/blog/BlogSidebar.jsx";
import {
  getBlogPostBySlug,
  getRecentPosts,
} from "../data/blogData.js";

const BlogDetail = () => {
  const { slug } = useParams();
  const post = getBlogPostBySlug(slug);
  const recentPosts = getRecentPosts(slug);

  if (!post) {
    return (
      <section className="bg-white py-1 font-Poppins lg:py-2">
        <div className="page-container text-center">
          <h1 className="text-xl font-bold text-black/70 md:text-2xl">
            Blog post not found
          </h1>
          <p className="mt-2 text-sm text-neutral-400 md:text-base">
            The article you are looking for does not exist or has been removed.
          </p>
          <Link
            to="/blogs"
            className="mt-6 inline-flex h-10 items-center rounded-md bg-primary px-5 text-sm font-medium text-white transition hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary/30"
          >
            Back to Blogs
          </Link>
        </div>
      </section>
    );
  }

  const [introParagraph, ...remainingParagraphs] = post.content;
  const midPoint = Math.ceil(remainingParagraphs.length / 2);
  const paragraphsBeforeGallery = remainingParagraphs.slice(0, midPoint);
  const paragraphsAfterGallery = remainingParagraphs.slice(midPoint);

  return (
    <section className="bg-white py-1 font-Poppins lg:py-2">
      <div className="page-container">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3 lg:gap-10">
          <article className="min-w-0 lg:col-span-2">
            <div className="overflow-hidden rounded-xl">
              <img
                src={post.image}
                alt={post.title}
                className="aspect-[16/9] w-full object-cover sm:aspect-[21/9]"
              />
            </div>

            <p className="mt-4 text-xs text-neutral-400 sm:text-sm">
              {post.date} -{" "}
              <span className="text-primary">{post.category}</span>
            </p>

            <h1 className="mt-2 text-2xl font-bold tracking-tight text-black/80 md:text-3xl lg:text-4xl">
              {post.title}
            </h1>

            <div className="mt-5 space-y-4 text-sm text-justify leading-relaxed text-neutral-500 md:text-base">
              <p>{introParagraph}</p>

              {paragraphsBeforeGallery.map((paragraph, index) => (
                <p key={`before-${index}`}>{paragraph}</p>
              ))}
            </div>

            {post.gallery?.length > 0 && (
              <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
                {post.gallery.map((image, index) => (
                  <div
                    key={`gallery-${index}`}
                    className="overflow-hidden rounded-xl"
                  >
                    <img
                      src={image}
                      alt={`${post.title} gallery ${index + 1}`}
                      loading="lazy"
                      className="aspect-[4/3] w-full object-cover"
                    />
                  </div>
                ))}
              </div>
            )}

            <div className="mt-6 space-y-4 text-sm text-justify leading-relaxed text-neutral-500 md:text-base">
              {paragraphsAfterGallery.map((paragraph, index) => (
                <p key={`after-${index}`}>{paragraph}</p>
              ))}
            </div>

            <p className="mt-5 border-t border-neutral-100 py-5 text-sm text-neutral-500 md:text-base">
              Please{" "}
              <Link
                to="/login"
                className="font-medium text-primary transition hover:text-primary/80 focus:outline-none focus:ring-2 focus:ring-primary/20"
              >
                login
              </Link>{" "}
              or{" "}
              <Link
                to="/register"
                className="font-medium text-primary transition hover:text-primary/80 focus:outline-none focus:ring-2 focus:ring-primary/20"
              >
                register
              </Link>{" "}
              to review the blog comments.
            </p>
          </article>

          <div className="lg:col-span-1">
            <BlogSidebar recentPosts={recentPosts} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default BlogDetail;
