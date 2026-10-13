"use client";

import Link from "next/link";
import { useScrollNav, useViewport } from "./hooks";

const leftLinks = [
  { href: "#our-story", label: "Story" },
  { href: "#rsvp", label: "RSVP" },
  { href: "#celebrations", label: "Events" },
  { href: "#travel", label: "Travel" },
];

const rightLinks = [
  { href: "#schedule", label: "Schedule" },
  { href: "#gifts", label: "Gifts" },
  { href: "#qa", label: "Q&A" },
];

function viewportGutter(width: number) {
  if (width === 0) return 24;
  if (width < 640) return 24;
  if (width < 1024) return 48;
  return 80;
}

export function Navigation() {
  const { scrolled } = useScrollNav();
  const { width } = useViewport();
  const edgePad = viewportGutter(width);

  const linkClass = `text-[0.58rem] lg:text-[0.65rem] xl:text-[0.7rem] font-semibold tracking-[0.1em] lg:tracking-[0.16em] xl:tracking-[0.2em] uppercase transition-colors duration-200 hover:text-rose ${
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
        {/*
          One full-viewport nav container.
          Horizontal padding is computed from the viewport width (same gutters
          as page sections), so both ends sit the same distance from the
          screen edge — not derived from the center monogram.
        */}
        <nav
          className="grid h-16 w-full grid-cols-3 items-center md:h-20"
          style={{ paddingLeft: edgePad, paddingRight: edgePad }}
          aria-label="Wedding sections"
        >
          <div className="flex items-center justify-start gap-2 lg:gap-4 xl:gap-7">
            {leftLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`${linkClass} hidden md:inline-flex`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center justify-center">
            <Link
              href="#hero"
              className={`font-display text-2xl font-medium tracking-[0.12em] transition-colors duration-500 md:text-3xl ${
                scrolled ? "text-text" : "text-text-light"
              }`}
              aria-label="Back to top"
            >
              N &amp; J
            </Link>
          </div>

          <div className="flex items-center justify-end gap-2 lg:gap-4 xl:gap-7">
            {rightLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`${linkClass} hidden md:inline-flex`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </nav>
      </div>
    </header>
  );
}
