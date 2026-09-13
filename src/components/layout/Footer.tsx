import { CONTACT, NAV_LINKS } from "@/lib/constants";

export default function Footer() {
  return (
    <footer className="bg-[var(--color-charcoal)] text-[var(--color-stone)] pt-12 sm:pt-16 pb-8">
      <div className="section-container">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 lg:gap-8 pb-10 sm:pb-12 border-b border-white/10">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <span className="font-[var(--font-serif)] text-2xl font-bold text-white tracking-tight">
                D9W
              </span>
            </div>
            <p className="text-sm leading-relaxed text-[var(--color-stone)] max-w-xs">
              German Language Institution based in Madurai, Tamil Nadu.
              Preparing students from A1 to C2 for study and work in Germany.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-white text-xs font-medium tracking-[0.1em] uppercase mb-5">
              Navigation
            </h4>
            <ul className="space-y-2.5">
              {NAV_LINKS.slice(0, 5).map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-[var(--color-stone)] hover:text-white transition-colors duration-300 no-underline"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white text-xs font-medium tracking-[0.1em] uppercase mb-5">
              Services
            </h4>
            <ul className="space-y-2.5">
              <li>
                <a href="#courses" className="text-sm text-[var(--color-stone)] hover:text-white transition-colors duration-300 no-underline">
                  German Courses
                </a>
              </li>
              <li>
                <a href="#faqs" className="text-sm text-[var(--color-stone)] hover:text-white transition-colors duration-300 no-underline">
                  FAQs
                </a>
              </li>
              <li>
                <a href={CONTACT.instagram} target="_blank" rel="noopener noreferrer" className="text-sm text-[var(--color-stone)] hover:text-white transition-colors duration-300 no-underline">
                  Instagram
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white text-xs font-medium tracking-[0.1em] uppercase mb-5">
              Contact
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a
                  href={CONTACT.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[var(--color-stone)] hover:text-white transition-colors duration-300 no-underline"
                >
                  {CONTACT.address}
                </a>
              </li>
              <li>
                <a
                  href={CONTACT.phoneHref}
                  className="text-[var(--color-stone)] hover:text-white transition-colors duration-300 no-underline"
                >
                  {CONTACT.phone}
                </a>
              </li>
              <li>
                <a
                  href={CONTACT.emailHref}
                  className="text-[var(--color-stone)] hover:text-white transition-colors duration-300 no-underline"
                >
                  {CONTACT.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-[var(--color-stone)]">
          <p>&copy; {new Date().getFullYear()} {CONTACT.name}. All rights reserved.</p>
          <a
            href={CONTACT.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors duration-300 no-underline flex items-center gap-1.5"
            aria-label="Follow D9W on Instagram"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
            </svg>
            <span>Instagram</span>
          </a>
        </div>
      </div>
    </footer>
  );
}
