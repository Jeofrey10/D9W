"use client";

import { useState, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { TESTIMONIALS } from "@/lib/constants";
import StarRating from "@/components/ui/StarRating";
import ScrollReveal from "@/components/ui/ScrollReveal";

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const current = TESTIMONIALS[currentIndex];

  const navigate = useCallback(
    (newIndex: number) => {
      setDirection(newIndex > currentIndex ? 1 : -1);
      setCurrentIndex(newIndex);
    },
    [currentIndex]
  );

  const next = () => navigate((currentIndex + 1) % TESTIMONIALS.length);
  const prev = () =>
    navigate((currentIndex - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);

  const variants = {
    enter: (dir: number) => ({ x: dir > 0 ? 60 : -60, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({ x: dir > 0 ? -60 : 60, opacity: 0 }),
  };

  return (
    <section id="testimonials" className="py-16 sm:py-24 lg:py-32">
      <div className="section-container">
        <ScrollReveal>
          <span className="eyebrow block mb-3 sm:mb-4">What our learners say</span>
        </ScrollReveal>
        <ScrollReveal delay={0.1}>
          <h2 className="max-w-lg mb-8 sm:mb-16 lg:mb-20">
            Trusted by learners<br className="hidden sm:block" /> around the world.
          </h2>
        </ScrollReveal>

        {/* Featured testimonial */}
        <div className="relative max-w-3xl mx-auto">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="border-t border-[var(--color-stone-light)] pt-8 sm:pt-10"
            >
              {/* Quote */}
              {current.quote ? (
                <blockquote className="font-[var(--font-serif)] text-lg sm:text-2xl lg:text-[1.85rem] text-[var(--color-charcoal)] leading-snug italic mb-8 sm:mb-10 min-h-[100px] sm:min-h-[120px]">
                  &ldquo;{current.quote}&rdquo;
                </blockquote>
              ) : (
                <div className="min-h-[100px] sm:min-h-[120px] flex items-center">
                  <p className="text-[var(--color-stone)] italic text-base sm:text-lg">
                    No written review available.
                  </p>
                </div>
              )}

              {/* Attribution */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
                <div>
                  <p className="font-medium text-[var(--color-charcoal)] text-base sm:text-lg">
                    {current.name}
                  </p>
                  <p className="text-xs sm:text-sm text-[var(--color-stone)]">
                    {current.role}
                    {current.location && ` · ${current.location}`}
                  </p>
                </div>
                <StarRating rating={current.rating} size={18} />
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex items-center justify-between mt-10 sm:mt-12 pt-6 sm:pt-8 border-t border-[var(--color-stone-light)]">
            {/* Dots */}
            <div className="flex items-center gap-1.5 sm:gap-2">
              {TESTIMONIALS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => navigate(i)}
                  className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                    i === currentIndex
                      ? "bg-[var(--color-accent)] w-5 sm:w-6"
                      : "bg-[var(--color-stone-light)] hover:bg-[var(--color-stone)] w-2"
                  }`}
                  aria-label={`View testimonial from ${TESTIMONIALS[i].name}`}
                />
              ))}
            </div>

            {/* Arrows */}
            <div className="flex items-center gap-2 sm:gap-3">
              <button
                onClick={prev}
                className="w-9 h-9 sm:w-10 sm:h-10 border border-[var(--color-stone-light)] flex items-center justify-center hover:border-[var(--color-charcoal)] transition-colors duration-300 cursor-pointer"
                aria-label="Previous testimonial"
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 12H5m0 0l7-7m-7 7l7 7" />
                </svg>
              </button>
              <button
                onClick={next}
                className="w-9 h-9 sm:w-10 sm:h-10 border border-[var(--color-stone-light)] flex items-center justify-center hover:border-[var(--color-charcoal)] transition-colors duration-300 cursor-pointer"
                aria-label="Next testimonial"
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14m0 0l-7-7m7 7l-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
