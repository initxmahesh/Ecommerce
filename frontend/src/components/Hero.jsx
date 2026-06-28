import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  animate,
  motion,
  useMotionValue,
  useReducedMotion,
} from "motion/react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import product1 from "../assets/Product1.png";
import product2 from "../assets/Product2.png";
import product3 from "../assets/Product3.png";
import product4 from "../assets/Product4.png";
import product5 from "../assets/Product5.png";
import product6 from "../assets/Product6.png";
import product7 from "../assets/Product7.png";
import product8 from "../assets/Product8.png";

const SLIDES = [
  { id: "slide-1", image: product1, alt: "Smart watches promotion" },
  { id: "slide-2", image: product2, alt: "Summer collection sale" },
  { id: "slide-3", image: product3, alt: "New arrivals showcase" },
  { id: "slide-4", image: product4, alt: "Electronics deals" },
  { id: "slide-5", image: product5, alt: "Fashion week specials" },
  { id: "slide-6", image: product6, alt: "Home essentials offer" },
  { id: "slide-7", image: product7, alt: "Premium brands discount" },
  { id: "slide-8", image: product8, alt: "Limited time flash sale" },
];

const AUTOPLAY_MS = 3000;
const RESUME_MS = 8000;
const SWIPE_OFFSET = 50;
const SWIPE_VELOCITY = 400;

const wrapIndex = (index, length) => ((index % length) + length) % length;

const Hero = () => {
  const reducedMotion = useReducedMotion();
  const containerRef = useRef(null);
  const isDraggingRef = useRef(false);
  const resumeTimeoutRef = useRef(null);
  const isHoveredRef = useRef(false);
  const [page, setPage] = useState(0);
  const [slideWidth, setSlideWidth] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const x = useMotionValue(0);

  const activeIndex = wrapIndex(page, SLIDES.length);

  const springTransition = useMemo(
    () =>
      reducedMotion
        ? { duration: 0 }
        : { type: "spring", stiffness: 280, damping: 32 },
    [reducedMotion],
  );

  const snapToIndex = useCallback(
    (index, transition = springTransition) => {
      if (!slideWidth) return;
      animate(x, -index * slideWidth, transition);
    },
    [slideWidth, springTransition, x],
  );

  const snapToPage = useCallback(
    (targetPage, transition = springTransition) => {
      snapToIndex(wrapIndex(targetPage, SLIDES.length), transition);
    },
    [snapToIndex, springTransition],
  );

  const paginate = useCallback((step) => {
    setPage((current) => current + step);
  }, []);

  const goToSlide = useCallback(
    (index) => {
      if (index === activeIndex) return;
      setPage((current) => current + (index - activeIndex));
    },
    [activeIndex],
  );

  const pause = useCallback(() => {
    setIsPaused(true);
  }, []);

  const resume = useCallback(() => {
    setIsPaused(false);
  }, []);

  const pauseTemporarily = useCallback(() => {
    pause();
    if (resumeTimeoutRef.current) {
      clearTimeout(resumeTimeoutRef.current);
    }
    resumeTimeoutRef.current = setTimeout(() => {
      if (!isHoveredRef.current) {
        resume();
      }
    }, RESUME_MS);
  }, [pause, resume]);

  const handleMouseEnter = useCallback(() => {
    isHoveredRef.current = true;
    pause();
  }, [pause]);

  const handleMouseLeave = useCallback(() => {
    isHoveredRef.current = false;
    if (resumeTimeoutRef.current) {
      clearTimeout(resumeTimeoutRef.current);
    }
    resume();
  }, [resume]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return undefined;

    const updateWidth = () => setSlideWidth(container.offsetWidth);

    updateWidth();

    const observer = new ResizeObserver(updateWidth);
    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!slideWidth || isDraggingRef.current) return;
    snapToPage(page);
  }, [page, slideWidth, snapToPage]);

  useEffect(() => {
    if (isPaused || reducedMotion || SLIDES.length <= 1) {
      return undefined;
    }

    const timer = setInterval(() => {
      setPage((current) => current + 1);
    }, AUTOPLAY_MS);

    return () => clearInterval(timer);
  }, [isPaused, reducedMotion, page]);

  useEffect(
    () => () => {
      if (resumeTimeoutRef.current) {
        clearTimeout(resumeTimeoutRef.current);
      }
    },
    [],
  );

  const dragConstraints = useMemo(() => {
    if (!slideWidth || SLIDES.length <= 1) {
      return { left: 0, right: 0 };
    }

    return {
      left: -(SLIDES.length - 1) * slideWidth,
      right: 0,
    };
  }, [slideWidth]);

  const handleDragStart = useCallback(() => {
    isDraggingRef.current = true;
    pause();
  }, [pause]);

  const handleDragEnd = useCallback(
    (_, { offset, velocity }) => {
      isDraggingRef.current = false;
      if (!slideWidth) return;

      const swipedLeft =
        offset.x <= -SWIPE_OFFSET || velocity.x <= -SWIPE_VELOCITY;
      const swipedRight =
        offset.x >= SWIPE_OFFSET || velocity.x >= SWIPE_VELOCITY;

      let nextPage;

      if (swipedLeft) {
        nextPage = page + 1;
      } else if (swipedRight) {
        nextPage = page - 1;
      } else {
        const draggedIndex = Math.round(-x.get() / slideWidth);
        const clampedIndex = Math.max(
          0,
          Math.min(SLIDES.length - 1, draggedIndex),
        );
        nextPage = page + (clampedIndex - activeIndex);
      }

      setPage(nextPage);
      snapToPage(nextPage);
      pauseTemporarily();
    },
    [activeIndex, page, pauseTemporarily, slideWidth, snapToPage, x],
  );

  const handleKeyDown = useCallback(
    (event) => {
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        paginate(-1);
        pauseTemporarily();
      }
      if (event.key === "ArrowRight") {
        event.preventDefault();
        paginate(1);
        pauseTemporarily();
      }
    },
    [paginate, pauseTemporarily],
  );

  return (
    <section className="font-Poppins">
      <div className="container mx-auto px-4 lg:px-6">
        <div
          className="group relative aspect-[21/9] overflow-hidden bg-neutral-100 shadow-lg ring-1 ring-black/5 sm:aspect-[2.4/1]"
          aria-roledescription="carousel"
          aria-label="Featured promotions"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div
            ref={containerRef}
            className="absolute inset-0 overflow-hidden"
            tabIndex={0}
            onKeyDown={handleKeyDown}
          >
            <motion.div
              className="flex h-full cursor-grab touch-pan-y active:cursor-grabbing"
              style={{ x, width: slideWidth ? slideWidth * SLIDES.length : "100%" }}
              drag={SLIDES.length > 1 && slideWidth > 0 ? "x" : false}
              dragConstraints={dragConstraints}
              dragElastic={0.08}
              dragMomentum={false}
              onDragStart={handleDragStart}
              onDragEnd={handleDragEnd}
            >
              {SLIDES.map((slide, index) => (
                <div
                  key={slide.id}
                  className="h-full shrink-0"
                  style={{ width: slideWidth || "100%" }}
                  aria-hidden={index !== activeIndex}
                >
                  <motion.img
                    src={slide.image}
                    alt={slide.alt}
                    className="h-full w-full select-none"
                    draggable={false}
                    loading={index === 0 ? "eager" : "lazy"}
                    initial={false}
                    animate={{
                      scale:
                        index === activeIndex &&
                        !isPaused &&
                        !reducedMotion
                          ? 1.06
                          : 1,
                    }}
                    transition={{
                      duration: isPaused ? 0.3 : AUTOPLAY_MS / 1000,
                      ease: "linear",
                    }}
                  />
                </div>
              ))}
            </motion.div>
          </div>

          <div
            className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/50 via-black/20 to-transparent"
            aria-hidden="true"
          />

          {SLIDES.length > 1 && (
            <>
              <motion.button
                type="button"
                aria-label="Previous slide"
                onClick={() => paginate(-1)}
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.94 }}
                className="pointer-events-none absolute left-4 top-1/2 z-10 hidden -translate-y-1/2 rounded-full bg-white/80 p-2 text-brand opacity-0 shadow-md backdrop-blur-sm transition-opacity duration-200 group-hover:pointer-events-auto group-hover:opacity-100 sm:flex"
              >
                <ChevronLeft className="h-5 w-5" strokeWidth={2} />
              </motion.button>

              <motion.button
                type="button"
                aria-label="Next slide"
                onClick={() => paginate(1)}
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.94 }}
                className="pointer-events-none absolute right-4 top-1/2 z-10 hidden -translate-y-1/2 rounded-full bg-white/80 p-2 text-brand opacity-0 shadow-md backdrop-blur-sm transition-opacity duration-200 group-hover:pointer-events-auto group-hover:opacity-100 sm:flex"
              >
                <ChevronRight className="h-5 w-5" strokeWidth={2} />
              </motion.button>

              <div
                className="absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 items-center gap-2"
                role="tablist"
                aria-label="Carousel pagination"
              >
                {SLIDES.map((slide, index) => {
                  const isActive = index === activeIndex;

                  return (
                    <button
                      key={slide.id}
                      type="button"
                      role="tab"
                      aria-selected={isActive}
                      aria-label={`Go to slide ${index + 1}`}
                      onClick={() => {
                        goToSlide(index);
                        pauseTemporarily();
                      }}
                      className="relative h-2 overflow-hidden rounded-full bg-white/25 transition-all hover:bg-white/60"
                      style={{ width: isActive ? "0.5rem" : "0.5rem" }}
                    >
                      {isActive && !reducedMotion && (
                        <motion.span
                          key={`progress-${page}-${isPaused}`}
                          className="absolute inset-0 origin-left rounded-full bg-white"
                          initial={{ scaleX: 1 }}
                          animate={{ scaleX: isPaused ? 1 : 1 }}
                        />
                      )}
                      {isActive && reducedMotion && (
                        <span className="absolute inset-0 rounded-full bg-white" />
                      )}
                    </button>
                  );
                })}
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default Hero;
