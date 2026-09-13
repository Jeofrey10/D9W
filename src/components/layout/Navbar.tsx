"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { NAV_LINKS } from "@/lib/constants";
import Button from "@/components/ui/Button";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [isMobileMenuOpen]);

  const handleNavClick = (href: string) => {
    setIsMobileMenuOpen(false);
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          isScrolled
            ? "bg-[var(--color-ivory)]/95 backdrop-blur-sm shadow-[0_1px_0_var(--color-stone-light)]"
            : "bg-transparent"
        }`}
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="section-container flex items-center justify-between h-[72px]">
          {/* Logo */}
          <a
            href="#home"
            onClick={(e) => { e.preventDefault(); handleNavClick("#home"); }}
            className="flex items-center gap-2 no-underline"
            aria-label="D9W German Language Institution - Home"
          >
            <span className="font-[var(--font-serif)] text-2xl font-bold text-[var(--color-charcoal)] tracking-tight">
              D9W
            </span>
            <span className="hidden sm:block text-[11px] font-medium tracking-[0.08em] uppercase text-[var(--color-stone)] leading-tight border-l border-[var(--color-stone-light)] pl-2 ml-1">
              German Language<br />Institution
            </span>
          </a>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => { e.preventDefault(); handleNavClick(link.href); }}
                className="relative text-[0.85rem] font-medium text-[var(--color-charcoal-soft)] hover:text-[var(--color-charcoal)] transition-colors duration-300 no-underline after:content-[''] after:absolute after:bottom-[-2px] after:left-0 after:w-0 after:h-[1px] after:bg-[var(--color-charcoal)] after:transition-all after:duration-300 hover:after:w-full"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden lg:block">
            <Button
              variant="primary"
              href="#contact"
              className="text-[0.8rem] px-5 py-2.5"
            >
              Start Learning German
            </Button>
          </div>

          {/* Mobile Hamburger */}
          <button
            className="lg:hidden relative w-10 h-10 flex flex-col items-center justify-center gap-1.5 cursor-pointer"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMobileMenuOpen}
          >
            <span
              className={`block w-6 h-[1.5px] bg-[var(--color-charcoal)] transition-all duration-300 ${
                isMobileMenuOpen ? "rotate-45 translate-y-[4.5px]" : ""
              }`}
            />
            <span
              className={`block w-6 h-[1.5px] bg-[var(--color-charcoal)] transition-all duration-300 ${
                isMobileMenuOpen ? "-rotate-45 -translate-y-[4.5px]" : ""
              }`}
            />
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="fixed inset-0 z-40 bg-[var(--color-ivory)] lg:hidden overflow-y-auto"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex flex-col justify-center items-start min-h-full px-6 sm:px-10 py-24">
              {NAV_LINKS.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + i * 0.05, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                >
                  <a
                    href={link.href}
                    onClick={(e) => { e.preventDefault(); handleNavClick(link.href); }}
                    className="block text-2xl sm:text-3xl font-[var(--font-serif)] font-bold text-[var(--color-charcoal)] py-2.5 sm:py-3 no-underline hover:text-[var(--color-accent)] transition-colors duration-300"
                  >
                    {link.label}
                  </a>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.4 }}
                className="mt-6 sm:mt-8"
              >
                <Button
                  variant="primary"
                  href="#contact"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Start Learning German
                </Button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
