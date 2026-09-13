"use client";

import { LEARNING_FORMATS } from "@/lib/constants";
import ScrollReveal from "@/components/ui/ScrollReveal";

export default function LearningFormats() {
  return (
    <section className="py-16 sm:py-24 lg:py-32 bg-[var(--color-ivory-warm)]">
      <div className="section-container">
        <ScrollReveal>
          <span className="eyebrow block mb-3 sm:mb-4">How you learn</span>
        </ScrollReveal>
        <ScrollReveal delay={0.1}>
          <h2 className="max-w-lg mb-3 sm:mb-4">
            Choose the format<br className="hidden sm:block" /> that fits your life.
          </h2>
        </ScrollReveal>
        <ScrollReveal delay={0.15}>
          <p className="text-[var(--color-charcoal-soft)] max-w-lg mb-10 sm:mb-16">
            Learn online or offline, at your own pace on D9W&apos;s learning platform, with individual guidance from an experienced German teacher.
          </p>
        </ScrollReveal>

        {/* Asymmetric editorial grid — NOT four identical cards */}
        <div className="border-t border-[var(--color-stone-light)]">
          {/* Row 1: 5 + 7 */}
          <div className="grid grid-cols-1 md:grid-cols-12">
            {LEARNING_FORMATS.slice(0, 2).map((format, i) => {
              const colSpan = i === 0 ? "md:col-span-5" : "md:col-span-7";
              return (
                <ScrollReveal
                  key={format.name}
                  delay={0.1 + i * 0.08}
                  className={`${colSpan} border-b border-[var(--color-stone-light)] ${
                    i === 1 ? "md:border-l md:border-[var(--color-stone-light)]" : ""
                  }`}
                >
                  <div className="py-7 sm:py-8 md:py-10 md:px-8 group">
                    <div className="flex items-baseline gap-3 sm:gap-4 mb-2 sm:mb-3">
                      <span className="text-[0.65rem] sm:text-[0.7rem] font-mono text-[var(--color-stone)] tracking-wider">
                        0{i + 1}
                      </span>
                      <h3 className="text-[1.5rem] sm:text-[1.75rem] lg:text-[2.25rem] font-[var(--font-serif)] font-bold text-[var(--color-charcoal)] group-hover:text-[var(--color-accent)] transition-colors duration-500">
                        {format.name}
                      </h3>
                    </div>
                    <p className="text-[var(--color-charcoal-soft)] text-[0.9rem] sm:text-[0.95rem] leading-relaxed max-w-md pl-8 sm:pl-10">
                      {format.description}
                    </p>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>

          {/* Row 2: 4 + 8 */}
          <div className="grid grid-cols-1 md:grid-cols-12">
            {LEARNING_FORMATS.slice(2, 4).map((format, i) => {
              const colSpan = i === 0 ? "md:col-span-4" : "md:col-span-8";
              return (
                <ScrollReveal
                  key={format.name}
                  delay={0.26 + i * 0.08}
                  className={`${colSpan} border-b border-[var(--color-stone-light)] ${
                    i === 1 ? "md:border-l md:border-[var(--color-stone-light)]" : ""
                  }`}
                >
                  <div className="py-7 sm:py-8 md:py-10 md:px-8 group">
                    <div className="flex items-baseline gap-3 sm:gap-4 mb-2 sm:mb-3">
                      <span className="text-[0.65rem] sm:text-[0.7rem] font-mono text-[var(--color-stone)] tracking-wider">
                        0{i + 3}
                      </span>
                      <h3 className="text-[1.5rem] sm:text-[1.75rem] lg:text-[2.25rem] font-[var(--font-serif)] font-bold text-[var(--color-charcoal)] group-hover:text-[var(--color-accent)] transition-colors duration-500">
                        {format.name}
                      </h3>
                    </div>
                    <p className="text-[var(--color-charcoal-soft)] text-[0.9rem] sm:text-[0.95rem] leading-relaxed max-w-md pl-8 sm:pl-10">
                      {format.description}
                    </p>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
