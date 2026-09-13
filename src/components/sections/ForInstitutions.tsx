"use client";

import ScrollReveal from "@/components/ui/ScrollReveal";
import Button from "@/components/ui/Button";

export default function ForInstitutions() {
  return (
    <section className="py-14 sm:py-16 lg:py-20 bg-[var(--color-charcoal)]">
      <div className="section-container">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-center">
          <ScrollReveal className="lg:col-span-8">
            <span className="text-[0.65rem] sm:text-[0.7rem] font-medium tracking-[0.12em] uppercase text-[var(--color-stone)] block mb-2 sm:mb-3">
              For Institutions & Companies
            </span>
            <h3 className="text-white font-[var(--font-serif)] text-xl sm:text-2xl lg:text-3xl font-bold mb-3 sm:mb-4 max-w-xl leading-tight">
              Integrate D9W into your own German programme.
            </h3>
            <p className="text-[var(--color-stone)] max-w-xl text-sm sm:text-base leading-relaxed">
              D9W&apos;s learning platform can be integrated into your institution&apos;s or company&apos;s own German lessons — as a supplement to existing courses, or as an independent flexible course taught by D9W&apos;s own experienced teachers.
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.15} className="lg:col-span-4 lg:text-right">
            <Button
              variant="secondary"
              href="#contact"
              className="w-full sm:w-auto text-center border-white/30 text-white hover:bg-white hover:text-[var(--color-charcoal)]"
            >
              Get in Touch
            </Button>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
