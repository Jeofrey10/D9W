"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Button from "@/components/ui/Button";
import ScrollReveal from "@/components/ui/ScrollReveal";

export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-[100dvh] flex items-center overflow-hidden pt-[72px]"
    >
      <div className="section-container w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-center min-h-[calc(100dvh-72px)] py-8 sm:py-12 lg:py-0">
          {/* Text — Left 7 columns */}
          <div className="lg:col-span-7 xl:col-span-6 flex flex-col justify-center order-1">
            <ScrollReveal delay={0.1}>
              <span className="eyebrow inline-block mb-3 sm:mb-5">
                German Language · Madurai
              </span>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <h1 className="mb-4 sm:mb-6 max-w-[600px]">
                Learn German with
                <span className="block text-[var(--color-accent)]">confidence.</span>
              </h1>
            </ScrollReveal>

            <ScrollReveal delay={0.35}>
              <p className="text-base sm:text-lg text-[var(--color-charcoal-soft)] max-w-[520px] mb-6 sm:mb-8 leading-relaxed">
                From complete beginner to advanced fluency — D9W guides you through every level of German, online or in person, preparing you for study, career, and life in Germany.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.45}>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <Button variant="primary" href="#contact" className="w-full sm:w-auto text-center justify-center">
                  Start Learning German
                </Button>
                <Button variant="secondary" href="#courses" className="w-full sm:w-auto text-center justify-center">
                  Explore Courses
                </Button>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.55}>
              <div className="grid grid-cols-3 gap-2 sm:gap-6 mt-8 sm:mt-10 pt-6 sm:pt-8 border-t border-[var(--color-stone-light)]">
                <div>
                  <span className="block font-[var(--font-serif)] text-lg sm:text-2xl lg:text-3xl font-bold text-[var(--color-charcoal)]">
                    A1–C2
                  </span>
                  <span className="text-[0.65rem] sm:text-xs text-[var(--color-stone)] tracking-wide block leading-tight mt-0.5">
                    CEFR levels
                  </span>
                </div>
                <div className="border-l border-[var(--color-stone-light)] pl-3 sm:pl-6">
                  <span className="block font-[var(--font-serif)] text-lg sm:text-2xl lg:text-3xl font-bold text-[var(--color-charcoal)]">
                    1000+
                  </span>
                  <span className="text-[0.65rem] sm:text-xs text-[var(--color-stone)] tracking-wide block leading-tight mt-0.5">
                    Learners worldwide
                  </span>
                </div>
                <div className="border-l border-[var(--color-stone-light)] pl-3 sm:pl-6">
                  <span className="block font-[var(--font-serif)] text-lg sm:text-2xl lg:text-3xl font-bold text-[var(--color-charcoal)]">
                    4-in-1
                  </span>
                  <span className="text-[0.65rem] sm:text-xs text-[var(--color-stone)] tracking-wide block leading-tight mt-0.5">
                    Learning formats
                  </span>
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Image — Right 5 columns */}
          <div className="lg:col-span-5 xl:col-span-6 order-2 flex justify-center lg:justify-end">
            <motion.div
              className="relative w-full max-w-[360px] sm:max-w-[440px] lg:max-w-none aspect-[4/3] sm:aspect-[3/4] lg:aspect-auto lg:h-[calc(100dvh-140px)] overflow-hidden"
              initial={{ clipPath: "inset(0 100% 0 0)" }}
              animate={{ clipPath: "inset(0 0% 0 0)" }}
              transition={{ duration: 1.2, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            >
              <Image
                src="/images/brandenburg-gate.jpg"
                alt="The Brandenburg Gate (Brandenburger Tor) in Berlin, the iconic gateway of Germany at golden hour"
                fill
                className="object-cover object-center"
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              {/* Landmark caption badge */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/65 via-black/25 to-transparent p-4 sm:p-5 pt-12">
                <span className="text-white/80 text-[0.65rem] sm:text-[0.7rem] font-medium tracking-[0.12em] uppercase block">
                  The Gateway of Germany
                </span>
                <p className="text-white font-[var(--font-serif)] text-sm sm:text-base font-semibold tracking-wide mt-0.5">
                  Brandenburger Tor · Berlin
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
