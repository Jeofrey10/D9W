"use client";

import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary";
  href?: string;
  children: React.ReactNode;
}

export default function Button({
  variant = "primary",
  href,
  children,
  className,
  ...props
}: ButtonProps) {
  const baseClasses =
    "group relative inline-flex items-center justify-center gap-2 px-6 sm:px-7 py-3 sm:py-3.5 min-h-[44px] text-[0.875rem] sm:text-[0.9rem] font-medium tracking-wide transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] cursor-pointer no-underline select-none";

  const variants = {
    primary:
      "bg-[var(--color-accent)] text-white hover:bg-[var(--color-accent-hover)] border border-transparent",
    secondary:
      "bg-transparent text-[var(--color-charcoal)] border border-[var(--color-charcoal)] hover:bg-[var(--color-charcoal)] hover:text-white",
  };

  const classes = cn(baseClasses, variants[variant], className);

  const arrow = (
    <svg
      className="w-4 h-4 transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-1"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
      aria-hidden="true"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
    </svg>
  );

  if (href) {
    return (
      <a href={href} className={classes}>
        <span>{children}</span>
        {arrow}
      </a>
    );
  }

  return (
    <button className={classes} {...props}>
      <span>{children}</span>
      {arrow}
    </button>
  );
}
