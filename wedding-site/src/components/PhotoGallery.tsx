"use client";

import { FloralDivider } from "./Florals";
import { SceneFrame } from "./ui/motion-primitives";
import { useScrollReveal, useSectionLayout } from "./hooks";
import ThumbnailCarousel from "./ui/thumbnail-carousel";

export function PhotoGallery() {
  const { ref, isVisible } = useScrollReveal({ threshold: 0.12, triggerOnce: true });
  const layout = useSectionLayout();

  return (
    <section
      id="photo-gallery"
      ref={ref}
      className="section bg-bg-alt"
      style={layout.section}
      aria-labelledby="photo-gallery-title"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(192,153,154,0.28),transparent_58%)]" />

      <SceneFrame>
      <div className="section-header">
        <p className={`section-eyebrow text-rose-deep reveal ${isVisible ? "is-visible" : ""}`}>
          Moments we love
        </p>
        <FloralDivider draw="scroll" className="mt-3 h-7 w-52 text-rose/60" />
        <h2
          id="photo-gallery-title"
          className={`section-title mt-4 text-text reveal ${isVisible ? "is-visible" : ""}`}
          style={{ transitionDelay: "100ms" }}
        >
          Photo Gallery
        </h2>
        <p
          className={`section-subtitle text-text-muted reveal ${isVisible ? "is-visible" : ""}`}
          style={{ transitionDelay: "200ms" }}
        >
          A few favorite frames from the road to this celebration.
        </p>
      </div>

      <div className="section-inner" style={layout.inner}>
        <div
          className={`reveal flex w-full justify-center ${isVisible ? "is-visible" : ""}`}
          style={{ transitionDelay: "260ms" }}
        >
          <div className="w-full max-w-[32rem]">
            <ThumbnailCarousel />
          </div>
        </div>
      </div>
      </SceneFrame>
    </section>
  );
}
