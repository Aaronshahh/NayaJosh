"use client";

import { useMountReveal, useViewport } from "./hooks";
import { FloralDivider } from "./Florals";

export function Hero() {
  const isVisible = useMountReveal();
  const { height } = useViewport();
  const reveal = isVisible ? "reveal is-visible" : "reveal";

  return (
    <section
      id="hero"
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 text-center"
      style={{ minHeight: height ? `${height}px` : undefined }}
      aria-labelledby="hero-title"
    >
      {/* Background photo + dusty-mauve wash */}
      <div className="absolute inset-0 z-0">
        <img src="/images/hero.jpeg" alt="Naya and Josh" className="h-full w-full object-cover" />
        {/* mauve tint */}
        <div className="absolute inset-0 bg-mauve/45 mix-blend-multiply" />
        {/* soft dusty gradient for legibility */}
        <div className="absolute inset-0 bg-gradient-to-b from-bg-dark/30 via-rose/20 to-bg-dark/55" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_35%,rgba(58,46,52,0.45)_100%)]" />
      </div>

      {/* Date watermark, anchored to section behind content */}
      <div
        className={`reveal ${isVisible ? "is-visible" : ""} pointer-events-none absolute inset-x-0 bottom-5 z-10 select-none px-6`}
        style={{ transitionDelay: "1100ms" }}
        aria-hidden="true"
      >
        <span className="block font-display text-[17vw] font-light leading-none tracking-[0.06em] text-text-light/12 lg:text-[11rem]">
          10&nbsp;26&nbsp;2026
        </span>
      </div>

      {/* Foreground content */}
      <div className="relative z-20 flex flex-col items-center">
        <p className={`${reveal} section-eyebrow text-text-light/90`} style={{ transitionDelay: "150ms" }}>
          We&rsquo;re getting married
        </p>

        <FloralDivider className={`${reveal} mt-4 h-5 w-44 text-text-light/70 md:w-52`} />

        <h1
          id="hero-title"
          className={`${reveal} mt-6 font-display text-6xl font-medium tracking-[-0.02em] text-text-light md:text-8xl lg:text-[8.5rem]`}
          style={{ transitionDelay: "300ms" }}
        >
          Naya <span className="italic text-blush">&amp;</span> Josh
        </h1>

        <div className={`${reveal} mt-8 flex flex-col items-center gap-4`} style={{ transitionDelay: "450ms" }}>
          <span className="h-px w-14 bg-blush/60" />
          <time className="flex flex-col items-center font-display text-text-light">
            <span className="text-xs font-semibold uppercase tracking-[0.42em] md:text-sm">October</span>
            <span className="my-1 text-6xl font-medium leading-none md:text-7xl">26</span>
            <span className="text-xs font-semibold uppercase tracking-[0.42em] md:text-sm">2026</span>
          </time>
          <span className="h-px w-14 bg-blush/60" />
        </div>

        <div className={`${reveal} mt-10`} style={{ transitionDelay: "600ms" }}>
          <a href="#rsvp" className="btn-primary">
            Save the Date
          </a>
        </div>
      </div>

      {/* Scroll cue */}
      <div className="absolute bottom-8 left-1/2 z-20 -translate-x-1/2">
        <a
          href="#rsvp"
          aria-label="Scroll to RSVP"
          className={`block reveal ${isVisible ? "is-visible" : ""}`}
          style={{ transitionDelay: "900ms" }}
        >
          <svg
            className="h-6 w-6 animate-bounce text-text-light/70"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </a>
      </div>
    </section>
  );
}
