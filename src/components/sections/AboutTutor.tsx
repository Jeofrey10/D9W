"use client";

import Image from "next/image";
import ScrollReveal from "@/components/ui/ScrollReveal";

export default function AboutTutor() {
  return (
    <section id="about" className="py-16 sm:py-24 lg:py-32">
      <div className="section-container">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 lg:gap-16 items-center">
          {/* Portrait — Left */}
          <ScrollReveal direction="left" className="lg:col-span-5">
            <div className="relative aspect-[4/5] sm:aspect-[3/4] max-w-[320px] sm:max-w-[420px] mx-auto lg:mx-0 overflow-hidden">
              <Image
                src="/images/tutor.jpg"
                alt="Patharnisha, founder and tutor at D9W German Language Institution"
                fill
                className="object-cover object-top"
                sizes="(max-width: 768px) 85vw, 420px"
              />
              {/* Small editorial label overlapping the image bottom */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/50 to-transparent p-5 sm:p-6 pt-14 sm:pt-16">
                <span className="text-white/70 text-[0.65rem] sm:text-[0.7rem] font-medium tracking-[0.1em] uppercase">
                  Founder & Tutor
                </span>
                <p className="text-white font-[var(--font-serif)] text-lg sm:text-xl font-bold mt-0.5 sm:mt-1">
                  Patharnisha
                </p>
              </div>
            </div>
          </ScrollReveal>

          {/* Text — Right */}
          <div className="lg:col-span-7">
            <ScrollReveal>
              <span className="eyebrow block mb-3 sm:mb-4">About the tutor</span>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <h2 className="mb-6 sm:mb-8">
                I help students build<br className="hidden sm:block" /> their dreams.
              </h2>
            </ScrollReveal>
            <ScrollReveal delay={0.2}>
              <div className="space-y-4 sm:space-y-5 text-[var(--color-charcoal-soft)]">
                <p className="text-base sm:text-lg leading-relaxed">
                  D9W is your companion to study in Germany, A1 to C1. From everyday language to specialist language — whether before or during your studies, you learn the language you need.
                </p>
                <p className="text-sm sm:text-base leading-relaxed">
                  For study, for work, for a study visit in Germany, and for your subject — from a first greeting in German through participation in a specialist workshop.
                </p>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.3}>
              <div className="mt-8 sm:mt-10 pt-6 sm:pt-8 border-t border-[var(--color-stone-light)]">
                <blockquote className="font-[var(--font-serif)] text-xl sm:text-2xl lg:text-[1.75rem] text-[var(--color-charcoal)] leading-snug italic">
                  &ldquo;I&apos;m Patharnisha. Whether you need German for study, work, or daily life in Germany — I&apos;ll guide you from your very first word.&rdquo;
                </blockquote>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
