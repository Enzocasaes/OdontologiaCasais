"use client";

import { useCallback, useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { cn } from "@/lib/utils";
import type { GoogleReview } from "@/lib/reviews/types";
import { GoogleReviewCard } from "./review-card";

const AUTOPLAY_INTERVAL_MS = 6000;

export function GoogleReviewsCarousel({ reviews, autoplay = true }: { reviews: GoogleReview[]; autoplay?: boolean }) {
  const [perView, setPerView] = useState(1);
  const [page, setPage] = useState(0);
  const [paused, setPaused] = useState(false);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const query = window.matchMedia("(min-width: 768px)");
    const update = () => {
      setPerView(query.matches ? 3 : 1);
      setPage(0);
    };
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  const pageCount = Math.max(1, Math.ceil(reviews.length / perView));

  useEffect(() => {
    if (!autoplay || paused || reducedMotion || pageCount <= 1) return;

    const timer = window.setInterval(() => {
      setPage((current) => (current + 1) % pageCount);
    }, AUTOPLAY_INTERVAL_MS);

    return () => window.clearInterval(timer);
  }, [autoplay, paused, reducedMotion, pageCount]);

  const goTo = useCallback(
    (index: number) => {
      setPage(((index % pageCount) + pageCount) % pageCount);
    },
    [pageCount],
  );

  if (reviews.length === 0) return null;

  return (
    <motion.div
      variants={{ hidden: { opacity: 0, y: 26 }, visible: { opacity: 1, y: 0, transition: { duration: 0.7 } } }}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-10% 0px" }}
      className="relative"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div className="overflow-hidden rounded-[32px]">
        <motion.div
          className="flex"
          animate={{ x: `-${page * 100}%` }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          {Array.from({ length: pageCount }).map((_, pageIndex) => (
            <div
              key={pageIndex}
              className="grid w-full shrink-0 auto-rows-fr gap-5 px-1"
              style={{ gridTemplateColumns: `repeat(${perView}, minmax(0, 1fr))` }}
            >
              {reviews.slice(pageIndex * perView, pageIndex * perView + perView).map((review, index) => (
                <motion.div
                  key={review.id}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-10% 0px" }}
                  transition={{ duration: 0.4, delay: index * 0.06 }}
                  whileHover={{ y: -6 }}
                  className="h-full"
                >
                  <GoogleReviewCard review={review} className="h-full" />
                </motion.div>
              ))}
            </div>
          ))}
        </motion.div>
      </div>

      {pageCount > 1 && (
        <>
          <button
            type="button"
            onClick={() => goTo(page - 1)}
            aria-label="Avaliações anteriores"
            className="absolute left-1 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-[#18191c]/10 bg-white/85 text-[#18191c] shadow-[0_10px_26px_rgba(23,24,26,0.12)] backdrop-blur-sm transition hover:bg-white md:-left-4"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => goTo(page + 1)}
            aria-label="Próximas avaliações"
            className="absolute right-1 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-[#18191c]/10 bg-white/85 text-[#18191c] shadow-[0_10px_26px_rgba(23,24,26,0.12)] backdrop-blur-sm transition hover:bg-white md:-right-4"
          >
            <ChevronRight className="h-4 w-4" />
          </button>

          <div className="mt-7 flex items-center justify-center gap-2">
            {Array.from({ length: pageCount }).map((_, index) => (
              <button
                key={index}
                type="button"
                aria-label={`Ir para o grupo ${index + 1}`}
                onClick={() => goTo(index)}
                className={cn(
                  "h-2.5 rounded-full transition-all duration-200",
                  index === page ? "w-8 bg-[#18191c]" : "w-2.5 bg-[#aca29a] hover:bg-[#8d8077]",
                )}
              />
            ))}
          </div>
        </>
      )}
    </motion.div>
  );
}
