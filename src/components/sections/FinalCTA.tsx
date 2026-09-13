"use client";

import ScrollReveal from "@/components/ui/ScrollReveal";
import Button from "@/components/ui/Button";
import { CONTACT } from "@/lib/constants";

export default function FinalCTA() {
  return (
    <section className="py-16 sm:py-24 lg:py-32">
      <div className="section-container">
        <div className="text-center max-w-2xl mx-auto">
          <ScrollReveal>
            <span className="eyebrow block mb-4 sm:mb-5">Ready to begin?</span>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <h2 className="mb-4 sm:mb-6 text-[clamp(2rem,4.5vw,3.5rem)]">
              Your German journey<br className="hidden sm:block" /> starts here.
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <p className="text-base sm:text-lg text-[var(--color-charcoal-soft)] mb-8 sm:mb-10 max-w-lg mx-auto">
              Whether you&apos;re starting from scratch or preparing for a Goethe exam, D9W is here to guide you — at your pace, on your schedule.
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.3}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
              <Button variant="primary" href="#contact" className="w-full sm:w-auto text-center justify-center">
                Start Your German Journey
              </Button>
              <Button variant="secondary" href={CONTACT.phoneHref} className="w-full sm:w-auto text-center justify-center">
                Talk to D9W
              </Button>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
