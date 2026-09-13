"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { COURSE_LEVELS } from "@/lib/constants";
import ScrollReveal from "@/components/ui/ScrollReveal";

export default function CourseLevels() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 80%", "end 20%"],
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section id="courses" className="py-16 sm:py-24 lg:py-32" ref={containerRef}>
      <div className="section-container">
        <ScrollReveal>
          <span className="eyebrow block mb-3 sm:mb-4">Course Levels</span>
        </ScrollReveal>
        <ScrollReveal delay={0.1}>
          <h2 className="max-w-2xl mb-4 sm:mb-6">
            Your path from first word<br className="hidden sm:block" /> to full fluency.
          </h2>
        </ScrollReveal>
        <ScrollReveal delay={0.15}>
          <p className="text-[var(--color-charcoal-soft)] max-w-lg mb-10 sm:mb-16 lg:mb-24">
            All D9W courses follow the Common European Framework of Reference
            for Languages (CEFR), from A1 beginner through C2 mastery.
          </p>
        </ScrollReveal>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical progress line — desktop */}
          <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px bg-[var(--color-stone-light)] -translate-x-1/2">
            <motion.div
              className="absolute top-0 left-0 w-full bg-[var(--color-accent)]"
              style={{ height: lineHeight }}
            />
          </div>

          {/* Mobile vertical line */}
          <div className="lg:hidden absolute left-5 sm:left-6 top-0 bottom-0 w-px bg-[var(--color-stone-light)]">
            <motion.div
              className="absolute top-0 left-0 w-full bg-[var(--color-accent)]"
              style={{ height: lineHeight }}
            />
          </div>

          <div className="space-y-0">
            {COURSE_LEVELS.map((course, i) => {
              const isEven = i % 2 === 0;

              return (
                <div
                  key={course.level}
                  className="relative grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-16 py-5 sm:py-8 lg:py-12"
                >
                  {/* Level node on timeline — desktop */}
                  <div className="hidden lg:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
                    <ScrollReveal delay={0.1} direction="none">
                      <div className="w-14 h-14 rounded-full bg-[var(--color-ivory)] border-2 border-[var(--color-stone-light)] flex items-center justify-center hover:border-[var(--color-accent)] transition-colors duration-500">
                        <span className="font-[var(--font-serif)] text-lg font-bold text-[var(--color-charcoal)]">
                          {course.level}
                        </span>
                      </div>
                    </ScrollReveal>
                  </div>

                  {/* Mobile level node */}
                  <div className="lg:hidden absolute left-5 sm:left-6 top-5 sm:top-8 -translate-x-1/2 z-10">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[var(--color-ivory)] border-2 border-[var(--color-stone-light)] flex items-center justify-center shadow-xs">
                      <span className="font-[var(--font-serif)] text-xs sm:text-sm font-bold text-[var(--color-charcoal)]">
                        {course.level}
                      </span>
                    </div>
                  </div>

                  {/* Content panel — alternating sides on desktop */}
                  <ScrollReveal
                    delay={0.15}
                    direction={isEven ? "left" : "right"}
                    className={`pl-12 sm:pl-16 lg:pl-0 ${
                      isEven
                        ? "lg:col-start-1 lg:text-right lg:pr-16"
                        : "lg:col-start-2 lg:pl-16"
                    }`}
                  >
                    <div
                      className={`${
                        isEven ? "lg:ml-auto" : ""
                      } max-w-md`}
                    >
                      <div className={`flex items-baseline gap-2 sm:gap-3 mb-1 sm:mb-2 ${isEven ? "lg:justify-end" : ""}`}>
                        <span className="eyebrow text-[var(--color-accent)]">
                          {course.title}
                        </span>
                      </div>
                      <p className="text-[var(--color-charcoal-soft)] text-[0.88rem] sm:text-[0.95rem] leading-relaxed">
                        {course.description}
                      </p>
                    </div>
                  </ScrollReveal>

                  {/* Empty column for alternating layout */}
                  {isEven && <div className="hidden lg:block" />}
                  {!isEven && <div className="hidden lg:block lg:col-start-1 lg:row-start-1" />}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
