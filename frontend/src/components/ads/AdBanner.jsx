import { Link } from "react-router-dom";

const AdBanner = ({ image, imageAlt = "", link, className = "" }) => {
  const imageElement = (
    <img
      src={image}
      alt={imageAlt}
      className="h-auto w-full rounded-md object-cover shadow-sm ring-1 ring-black/5 transition hover:shadow-md"
      loading="lazy"
    />
  );

  if (link) {
    return (
      <Link
        to={link}
        className={`block overflow-hidden rounded-md ${className}`}
      >
        {imageElement}
      </Link>
    );
  }

  return (
    <article className={`overflow-hidden rounded-md ${className}`}>
      {imageElement}
    </article>
  );
};

export default AdBanner;
