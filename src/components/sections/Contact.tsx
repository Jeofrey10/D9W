"use client";

import { useState, type FormEvent } from "react";
import { CONTACT } from "@/lib/constants";
import ScrollReveal from "@/components/ui/ScrollReveal";

interface FormData {
  name: string;
  email: string;
  phone: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

export default function Contact() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = (): boolean => {
    const newErrors: FormErrors = {};
    if (!formData.name.trim()) newErrors.name = "Please enter your name.";
    if (!formData.email.trim()) {
      newErrors.email = "Please enter your email.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address.";
    }
    if (!formData.message.trim()) newErrors.message = "Please enter a message.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setIsSubmitting(true);
    // Simulate submission — replace with real backend integration
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1000);
  };

  const inputClasses =
    "w-full px-4 py-3 sm:py-3.5 bg-white border border-[var(--color-stone-light)] text-[var(--color-charcoal)] text-[16px] sm:text-[0.95rem] placeholder:text-[var(--color-stone)] focus:outline-none focus:border-[var(--color-accent)] transition-colors duration-300";

  return (
    <section id="contact" className="py-16 sm:py-24 lg:py-32 bg-[var(--color-ivory-warm)]">
      <div className="section-container">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
          {/* Left — Contact info */}
          <div className="lg:col-span-5">
            <ScrollReveal>
              <span className="eyebrow block mb-3 sm:mb-4">Get in touch</span>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <h2 className="mb-6 sm:mb-8">
                Let&apos;s start a<br className="hidden sm:block" /> conversation.
              </h2>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <div className="space-y-4 sm:space-y-6 mb-6 sm:mb-10">
                {/* Address */}
                <div>
                  <span className="text-xs font-medium tracking-[0.1em] uppercase text-[var(--color-stone)] block mb-1">
                    Office
                  </span>
                  <a
                    href={CONTACT.mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm sm:text-base text-[var(--color-charcoal)] hover:text-[var(--color-accent)] transition-colors duration-300 no-underline"
                  >
                    {CONTACT.address}
                  </a>
                </div>

                {/* Phone */}
                <div>
                  <span className="text-xs font-medium tracking-[0.1em] uppercase text-[var(--color-stone)] block mb-1.5">
                    Phone
                  </span>
                  <a
                    href={CONTACT.phoneHref}
                    className="text-[var(--color-charcoal)] hover:text-[var(--color-accent)] transition-colors duration-300 no-underline"
                  >
                    {CONTACT.phone}
                  </a>
                </div>

                {/* Email */}
                <div>
                  <span className="text-xs font-medium tracking-[0.1em] uppercase text-[var(--color-stone)] block mb-1.5">
                    Email
                  </span>
                  <a
                    href={CONTACT.emailHref}
                    className="text-[var(--color-charcoal)] hover:text-[var(--color-accent)] transition-colors duration-300 no-underline"
                  >
                    {CONTACT.email}
                  </a>
                </div>

                {/* Instagram */}
                <div>
                  <span className="text-xs font-medium tracking-[0.1em] uppercase text-[var(--color-stone)] block mb-1.5">
                    Social
                  </span>
                  <a
                    href={CONTACT.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[var(--color-charcoal)] hover:text-[var(--color-accent)] transition-colors duration-300 no-underline inline-flex items-center gap-1.5"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                    </svg>
                    @d9wgermanlanguage
                  </a>
                </div>
              </div>
            </ScrollReveal>

            {/* Map embed */}
            <ScrollReveal delay={0.3}>
              <div className="aspect-[16/9] sm:aspect-[4/3] w-full overflow-hidden border border-[var(--color-stone-light)]">
                <iframe
                  src={CONTACT.mapEmbed}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={false}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="D9W German Language Institution location on Google Maps"
                />
              </div>
            </ScrollReveal>
          </div>

          {/* Right — Contact form */}
          <div className="lg:col-span-7">
            <ScrollReveal delay={0.15}>
              {isSubmitted ? (
                <div className="flex flex-col items-center justify-center h-full min-h-[360px] text-center p-6">
                  <div className="w-16 h-16 rounded-full bg-[var(--color-accent)]/10 flex items-center justify-center mb-6">
                    <svg
                      width="28"
                      height="28"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="var(--color-accent)"
                      strokeWidth="2"
                      aria-hidden="true"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-[var(--font-serif)] font-bold text-[var(--color-charcoal)] mb-3">
                    Message sent.
                  </h3>
                  <p className="text-[var(--color-charcoal-soft)] max-w-sm">
                    Thank you for reaching out. We&apos;ll get back to you as soon as possible.
                  </p>
                  <button
                    onClick={() => {
                      setIsSubmitted(false);
                      setFormData({ name: "", email: "", phone: "", message: "" });
                    }}
                    className="mt-6 text-sm text-[var(--color-accent)] hover:underline cursor-pointer"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="space-y-4 sm:space-y-5">
                  <div>
                    <label htmlFor="contact-name" className="text-xs font-medium tracking-[0.08em] uppercase text-[var(--color-stone)] block mb-2">
                      Name <span className="text-[var(--color-accent)]">*</span>
                    </label>
                    <input
                      type="text"
                      id="contact-name"
                      name="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className={inputClasses}
                      placeholder="Your full name"
                      required
                    />
                    {errors.name && (
                      <p className="text-sm text-[var(--color-accent)] mt-1.5">{errors.name}</p>
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                    <div>
                      <label htmlFor="contact-email" className="text-xs font-medium tracking-[0.08em] uppercase text-[var(--color-stone)] block mb-2">
                        Email <span className="text-[var(--color-accent)]">*</span>
                      </label>
                      <input
                        type="email"
                        id="contact-email"
                        name="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className={inputClasses}
                        placeholder="you@example.com"
                        required
                      />
                      {errors.email && (
                        <p className="text-sm text-[var(--color-accent)] mt-1.5">{errors.email}</p>
                      )}
                    </div>
                    <div>
                      <label htmlFor="contact-phone" className="text-xs font-medium tracking-[0.08em] uppercase text-[var(--color-stone)] block mb-2">
                        Phone
                      </label>
                      <input
                        type="tel"
                        id="contact-phone"
                        name="phone"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className={inputClasses}
                        placeholder="+91 000 000 0000"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="contact-message" className="text-xs font-medium tracking-[0.08em] uppercase text-[var(--color-stone)] block mb-2">
                      Message <span className="text-[var(--color-accent)]">*</span>
                    </label>
                    <textarea
                      id="contact-message"
                      name="message"
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className={`${inputClasses} resize-y min-h-[120px]`}
                      placeholder="Tell us about your learning goals..."
                      required
                    />
                    {errors.message && (
                      <p className="text-sm text-[var(--color-accent)] mt-1.5">{errors.message}</p>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full sm:w-auto justify-center group inline-flex items-center gap-2 px-8 py-3.5 sm:py-4 bg-[var(--color-accent)] text-white text-[0.9rem] font-medium tracking-wide hover:bg-[var(--color-accent-hover)] transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
                  >
                    <span>{isSubmitting ? "Sending..." : "Send Message"}</span>
                    {!isSubmitting && (
                      <svg
                        className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                        aria-hidden="true"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    )}
                  </button>
                </form>
              )}
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
