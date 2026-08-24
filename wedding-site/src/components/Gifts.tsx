"use client";

import { FloralDivider } from "./Florals";
import { useScrollReveal, useSectionLayout } from "./hooks";

export function Gifts() {
  const { ref, isVisible } = useScrollReveal({ threshold: 0.2, triggerOnce: true });
  const layout = useSectionLayout();

  return (
    <section
      id="gifts"
      ref={ref}
      className="relative w-full overflow-hidden bg-bg py-24 md:py-32"
      style={{ scrollMarginTop: layout.navHeight }}
      aria-labelledby="gifts-title"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(227,209,203,0.5),transparent_58%)]" />
      <div
        className="relative border-y border-rose/25 py-14 text-center md:py-16"
        style={{
          width: `calc(100% - ${layout.gutter * 2}px)`,
          maxWidth: 896,
          marginInline: "auto",
        }}
      >
          <p
            className={`text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-rose-deep reveal ${
              isVisible ? "is-visible" : ""
            }`}
          >
            No boxed gifts
          </p>
          <div className="flex w-full justify-center">
            <FloralDivider
              className={`mt-3 h-5 w-40 text-rose/55 reveal ${isVisible ? "is-visible" : ""}`}
            />
          </div>
          <h2
            id="gifts-title"
            className={`mt-4 font-display text-4xl font-medium text-text reveal md:text-5xl ${
              isVisible ? "is-visible" : ""
            }`}
            style={{ transitionDelay: "100ms" }}
          >
            Gifts &amp; Well Wishes
          </h2>
          <p
            className={`mx-auto mt-6 max-w-3xl text-center text-base leading-8 text-text-muted reveal md:text-lg ${
              isVisible ? "is-visible" : ""
            }`}
            style={{ marginInline: "auto", transitionDelay: "180ms" }}
          >
            Many of you are traveling from across the globe to celebrate with us, so your presence truly
            means the world to us and is more than enough. However, for those of you who insist on giving
            a gift (we know some of you are wonderfully stubborn!), we would gratefully accept a small
            contribution toward our house fund. A card box will be available at the wedding.
          </p>
      </div>
    </section>
  );
}
