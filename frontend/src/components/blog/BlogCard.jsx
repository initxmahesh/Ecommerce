import { Link } from "react-router-dom";

const BlogCard = ({ post }) => {
  const postLink = `/blogs/${post.slug}`;

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-xl border border-neutral-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-primary/35 hover:shadow-lg hover:shadow-black/10">
      <Link to={postLink} className="relative block overflow-hidden">
        <img
          src={post.image}
          alt={post.title}
          loading="lazy"
          className="aspect-[4/3] w-full object-cover transition duration-500 group-hover:scale-105"
        />

        <span className="absolute left-3 top-3 rounded-full border border-white/40 bg-white/90 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-primary shadow-sm backdrop-blur-sm">
          {post.category}
        </span>

        <div
          className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-black/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          aria-hidden="true"
        />
      </Link>

      <div className="h-px bg-neutral-100" aria-hidden="true" />

      <div className="flex flex-1 flex-col p-3 sm:p-4">
        <p className="text-[10px] text-neutral-400 sm:text-xs">{post.date}</p>

        <h3 className="mt-1.5 line-clamp-2 text-xs font-semibold leading-snug text-black/70 transition-colors group-hover:text-primary sm:mt-2 sm:text-sm">
          <Link to={postLink}>{post.title}</Link>
        </h3>

        <Link
          to={postLink}
          className="mt-auto inline-flex items-center gap-1 pt-3 text-[10px] font-medium text-neutral-400 transition-colors group-hover:text-primary sm:pt-4 sm:text-xs"
        >
          Read More
          <span
            aria-hidden="true"
            className="inline-block transition-transform duration-300 group-hover:translate-x-1"
          >
            »
          </span>
        </Link>
      </div>
    </article>
  );
};

export default BlogCard;
