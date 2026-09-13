"use client";

import ScrollReveal from "@/components/ui/ScrollReveal";
import Button from "@/components/ui/Button";
import { CONTACT } from "@/lib/constants";

export default function FinalCTA() {
  return (
    <section className="py-24 lg:py-32">
      <div className="section-container">
        <div className="text-center max-w-2xl mx-auto">
          <ScrollReveal>
            <span className="eyebrow block mb-5">Ready to begin?</span>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <h2 className="mb-6 text-[clamp(2rem,4.5vw,3.5rem)]">
              Your German journey<br className="hidden sm:block" /> starts here.
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <p className="text-lg text-[var(--color-charcoal-soft)] mb-10 max-w-lg mx-auto">
              Whether you&apos;re starting from scratch or preparing for a Goethe exam, D9W is here to guide you — at your pace, on your schedule.
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.3}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button variant="primary" href="#contact">
                Start Your German Journey
              </Button>
              <Button variant="secondary" href={CONTACT.phoneHref}>
                Talk to D9W
              </Button>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
