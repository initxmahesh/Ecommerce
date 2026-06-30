import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

const VISIBLE_THUMBNAILS = 4;

const ProductImageGallery = ({ images, alt }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [thumbOffset, setThumbOffset] = useState(0);
  const total = images.length;
  const hasOverflow = total > VISIBLE_THUMBNAILS;
  const maxThumbOffset = Math.max(0, total - VISIBLE_THUMBNAILS);
  const visibleImages = images.slice(thumbOffset, thumbOffset + VISIBLE_THUMBNAILS);

  const selectImage = (index) => {
    setActiveIndex(index);

    if (!hasOverflow) return;

    if (index < thumbOffset) {
      setThumbOffset(index);
    } else if (index >= thumbOffset + VISIBLE_THUMBNAILS) {
      setThumbOffset(Math.min(index - VISIBLE_THUMBNAILS + 1, maxThumbOffset));
    }
  };

  const scrollThumbsLeft = () => {
    setThumbOffset((current) => Math.max(0, current - 1));
  };

  const scrollThumbsRight = () => {
    setThumbOffset((current) => Math.min(maxThumbOffset, current + 1));
  };

  return (
    <div className="relative flex aspect-square flex-col overflow-hidden rounded-xl border border-neutral-200 bg-white">
      <div className="flex min-h-0 flex-1 items-center justify-center p-4 sm:p-8">
        <img
          src={images[activeIndex]}
          alt={alt}
          className="max-h-full max-w-full object-contain"
        />
      </div>

      <div className="flex items-center gap-2 border-t border-neutral-100 px-3 py-3 sm:px-4 sm:py-4">
        {hasOverflow && (
          <button
            type="button"
            aria-label="Previous thumbnails"
            onClick={scrollThumbsLeft}
            disabled={thumbOffset === 0}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-neutral-200 text-neutral-600 transition hover:border-primary hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary/30 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-neutral-200 disabled:hover:text-neutral-600"
          >
            <ChevronLeft className="h-4 w-4" strokeWidth={2} />
          </button>
        )}

        <div className="grid min-w-0 flex-1 grid-cols-4 gap-2 overflow-hidden">
          {visibleImages.map((image, visibleIndex) => {
            const index = thumbOffset + visibleIndex;

            return (
              <button
                key={`${image}-${index}`}
                type="button"
                aria-label={`View image ${index + 1}`}
                onClick={() => selectImage(index)}
                className={`flex aspect-square items-center justify-center overflow-hidden rounded-md border bg-white p-1.5 transition focus:outline-none focus:ring-2 focus:ring-primary/30 sm:p-2 ${
                  index === activeIndex
                    ? "border-primary ring-1 ring-primary/30"
                    : "border-neutral-200 hover:border-primary/50"
                }`}
              >
                <img
                  src={image}
                  alt={`${alt} thumbnail ${index + 1}`}
                  className="max-h-full max-w-full object-contain"
                />
              </button>
            );
          })}
        </div>

        {hasOverflow && (
          <button
            type="button"
            aria-label="Next thumbnails"
            onClick={scrollThumbsRight}
            disabled={thumbOffset >= maxThumbOffset}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-neutral-200 text-neutral-600 transition hover:border-primary hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary/30 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-neutral-200 disabled:hover:text-neutral-600"
          >
            <ChevronRight className="h-4 w-4" strokeWidth={2} />
          </button>
        )}
      </div>
    </div>
  );
};

export default ProductImageGallery;
