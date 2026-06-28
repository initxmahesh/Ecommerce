import AdBanner from "./ads/AdBanner.jsx";

const gridClasses = {
  1: "grid-cols-1",
  2: "grid-cols-1 md:grid-cols-2",
};

const AdsSection = ({ ads = [], columns }) => {
  if (!ads.length) return null;

  const columnCount = columns ?? (ads.length === 1 ? 1 : 2);

  return (
    <section className="bg-white font-Poppins">
      <div className="container mx-auto px-4 lg:px-6">
        <div className={`grid gap-4 ${gridClasses[columnCount] ?? gridClasses[2]}`}>
          {ads.map((ad) => (
            <AdBanner key={ad.id} {...ad} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default AdsSection;
