"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import ScrollReveal from "@/components/ui/ScrollReveal";

export default function FutureInGermany() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ["-5%", "5%"]);

  return (
    <section ref={sectionRef} className="relative py-16 sm:py-28 lg:py-40 overflow-hidden">
      {/* Full-bleed background with parallax */}
      <motion.div
        className="absolute inset-0 z-0"
        style={{ y: imageY }}
      >
        <Image
          src="/images/neuschwanstein-castle.jpg"
          alt="The famous Neuschwanstein Castle in the Bavarian Alps of Germany during golden sunrise"
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black/55" />
      </motion.div>

      {/* Aesthetic landmark location watermark */}
      <div className="hidden sm:flex items-center gap-2 absolute bottom-6 right-8 text-white/50 text-[0.7rem] font-medium tracking-[0.1em] uppercase z-10 pointer-events-none">
        <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-accent)] inline-block" />
        Schloss Neuschwanstein · Bavaria
      </div>

      {/* Content */}
      <div className="section-container relative z-10">
        <div className="max-w-2xl">
          <ScrollReveal>
            <span className="text-[0.65rem] sm:text-[0.7rem] font-medium tracking-[0.12em] uppercase text-white/60 block mb-3 sm:mb-4">
              Your German Future
            </span>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <h2 className="text-white mb-4 sm:mb-6 text-[clamp(1.75rem,4.5vw,3.5rem)] leading-tight">
              Learn German today.<br />
              <span className="text-white/70">Live your future in Germany.</span>
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <p className="text-white/75 text-base sm:text-lg leading-relaxed max-w-lg mb-6 sm:mb-8">
              Every level you complete brings you closer to a real life in Germany — study at a German university, build a career, or simply feel at home in a new country. D9W walks this path with you, from your first &ldquo;Guten Tag&rdquo; to confident, fluent conversations.
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.3}>
            <div className="grid grid-cols-3 gap-3 sm:gap-8 pt-5 sm:pt-6 border-t border-white/20">
              <div>
                <span className="block font-[var(--font-serif)] text-lg sm:text-2xl font-bold text-white">
                  University
                </span>
                <span className="text-white/50 text-[0.7rem] sm:text-sm block mt-0.5">Study programmes</span>
              </div>
              <div>
                <span className="block font-[var(--font-serif)] text-lg sm:text-2xl font-bold text-white">
                  Career
                </span>
                <span className="text-white/50 text-[0.7rem] sm:text-sm block mt-0.5">Work opportunities</span>
              </div>
              <div>
                <span className="block font-[var(--font-serif)] text-lg sm:text-2xl font-bold text-white">
                  Everyday
                </span>
                <span className="text-white/50 text-[0.7rem] sm:text-sm block mt-0.5">Daily confidence</span>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
