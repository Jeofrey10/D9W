"use client";

import { WHY_D9W_REASONS } from "@/lib/constants";
import ScrollReveal from "@/components/ui/ScrollReveal";

export default function WhyD9W() {
  return (
    <section id="why-d9w" className="py-16 sm:py-24 lg:py-32 bg-[var(--color-ivory-warm)]">
      <div className="section-container">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 lg:gap-16">
          {/* Left — Editorial pullquote */}
          <div className="lg:col-span-5 lg:sticky lg:top-32 lg:self-start">
            <ScrollReveal>
              <span className="eyebrow block mb-3 sm:mb-4">Why D9W</span>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <h2 className="mb-6 sm:mb-8">
                Built for students<br /> with a German future.
              </h2>
            </ScrollReveal>
            <ScrollReveal delay={0.2}>
              <blockquote className="border-l-2 border-[var(--color-accent)] pl-5 sm:pl-6 py-1">
                <p className="font-[var(--font-serif)] text-lg sm:text-xl lg:text-2xl text-[var(--color-charcoal)] leading-snug italic">
                  &ldquo;Whether you&apos;re starting from zero or sharpening advanced skills, D9W prepares you specifically and continuously for study and work in Germany.&rdquo;
                </p>
              </blockquote>
            </ScrollReveal>
          </div>

          {/* Right — Numbered editorial grid */}
          <div className="lg:col-span-7">
            <div className="space-y-0 border-t border-[var(--color-stone-light)] lg:border-t-0">
              {WHY_D9W_REASONS.map((reason, i) => (
                <ScrollReveal key={reason.number} delay={0.05 + i * 0.06}>
                  <div className="py-5 sm:py-7 border-b border-[var(--color-stone-light)] group">
                    <div className="flex gap-4 sm:gap-5">
                      <span className="text-[0.65rem] sm:text-[0.7rem] font-mono text-[var(--color-stone)] tracking-wider pt-1 sm:pt-1.5 shrink-0">
                        {reason.number}
                      </span>
                      <div>
                        <h3 className="text-lg sm:text-xl lg:text-[1.4rem] font-[var(--font-serif)] font-bold text-[var(--color-charcoal)] mb-1.5 sm:mb-2 group-hover:text-[var(--color-accent)] transition-colors duration-500">
                          {reason.title}
                        </h3>
                        <p className="text-[var(--color-charcoal-soft)] text-[0.88rem] sm:text-[0.92rem] leading-relaxed max-w-lg">
                          {reason.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
