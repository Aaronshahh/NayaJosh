"use client";

import Link from "next/link";
import { useScrollNav } from "./hooks";

const leftLinks = [
  { href: "#rsvp", label: "RSVP" },
  { href: "#travel", label: "Travel" },
];

const rightLinks = [
  { href: "#schedule", label: "Schedule" },
  { href: "#qa", label: "Q&A" },
];

export function Navigation() {
  const { scrolled } = useScrollNav();

  const linkClass = `text-[0.7rem] font-semibold tracking-[0.2em] uppercase transition-colors duration-200 hover:text-rose ${
    scrolled ? "text-text" : "text-text-light"
  }`;

  return (
    <header
      className="fixed inset-x-0 top-0 z-50"
      role="navigation"
      aria-label="Main navigation"
    >
      <div
        className={`transition-colors duration-500 ${
          scrolled
            ? "bg-bg/85 backdrop-blur-md border-b border-rose/15 shadow-[0_1px_24px_rgba(58,46,52,0.07)]"
            : "bg-transparent border-b border-transparent"
        }`}
      >
        <nav
          className="mx-auto grid h-16 max-w-6xl translate-x-4 grid-cols-[1fr_auto_1fr] items-center gap-8 px-6 md:h-20 md:translate-x-8 md:px-12 lg:translate-x-12 lg:px-20"
          aria-label="Wedding sections"
        >
          {/* Left links — evenly spaced */}
          <div className="hidden items-center justify-start gap-12 md:flex">
            {leftLinks.map((link) => (
              <Link key={link.href} href={link.href} className={linkClass}>
                {link.label}
              </Link>
            ))}
          </div>

          {/* Center monogram */}
          <Link
            href="#hero"
            className={`justify-self-center font-display text-2xl font-medium tracking-[0.12em] transition-colors duration-500 md:text-3xl ${
              scrolled ? "text-text" : "text-text-light"
            }`}
            aria-label="Back to top"
          >
            N &amp; J
          </Link>

          {/* Right links — evenly spaced */}
          <div className="hidden items-center justify-end gap-12 md:flex">
            {rightLinks.map((link) => (
              <Link key={link.href} href={link.href} className={linkClass}>
                {link.label}
              </Link>
            ))}
          </div>
        </nav>
      </div>
    </header>
  );
}
