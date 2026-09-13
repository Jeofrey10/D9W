"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FAQS } from "@/lib/constants";
import ScrollReveal from "@/components/ui/ScrollReveal";

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faqs" className="py-16 sm:py-24 lg:py-32 bg-[var(--color-ivory-warm)]">
      <div className="section-container">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16">
          {/* Left heading */}
          <div className="lg:col-span-4">
            <ScrollReveal>
              <span className="eyebrow block mb-3 sm:mb-4">Questions & Answers</span>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <h2 className="mb-4 lg:mb-0">
                Frequently asked<br className="hidden sm:block" /> questions.
              </h2>
            </ScrollReveal>
          </div>

          {/* Right — Accordion */}
          <div className="lg:col-span-8">
            <div className="divide-y divide-[var(--color-stone-light)]">
              {FAQS.map((faq, i) => (
                <ScrollReveal key={i} delay={0.04 * i}>
                  <div className="border-t-0 first:border-t border-[var(--color-stone-light)]">
                    <button
                      onClick={() => toggle(i)}
                      className="w-full flex items-start justify-between gap-4 py-4 sm:py-6 text-left cursor-pointer group"
                      aria-expanded={openIndex === i}
                      aria-controls={`faq-answer-${i}`}
                      id={`faq-question-${i}`}
                    >
                      <span className="font-[var(--font-serif)] text-base sm:text-lg lg:text-xl font-bold text-[var(--color-charcoal)] group-hover:text-[var(--color-accent)] transition-colors duration-300 pr-2 sm:pr-4">
                        {faq.question}
                      </span>
                      <span
                        className={`shrink-0 mt-1.5 w-5 h-5 flex items-center justify-center transition-transform duration-300 ${
                          openIndex === i ? "rotate-45" : ""
                        }`}
                      >
                        <svg
                          width="14"
                          height="14"
                          viewBox="0 0 14 14"
                          fill="none"
                          stroke="var(--color-charcoal)"
                          strokeWidth="1.5"
                          aria-hidden="true"
                        >
                          <line x1="7" y1="0" x2="7" y2="14" />
                          <line x1="0" y1="7" x2="14" y2="7" />
                        </svg>
                      </span>
                    </button>
                    <AnimatePresence>
                      {openIndex === i && (
                        <motion.div
                          id={`faq-answer-${i}`}
                          role="region"
                          aria-labelledby={`faq-question-${i}`}
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{
                            height: { duration: 0.35, ease: [0.22, 1, 0.36, 1] },
                            opacity: { duration: 0.25 },
                          }}
                          className="overflow-hidden"
                        >
                          <p className="pb-6 text-[var(--color-charcoal-soft)] leading-relaxed max-w-xl">
                            {faq.answer}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
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
