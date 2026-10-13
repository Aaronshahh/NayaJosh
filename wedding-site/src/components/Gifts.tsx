"use client";

import Image from "next/image";
import { FloralDivider } from "./Florals";
import { Parallax, SceneFrame } from "./ui/motion-primitives";
import { useScrollReveal, useSectionLayout } from "./hooks";

export function Gifts() {
  const { ref, isVisible } = useScrollReveal({ threshold: 0.2, triggerOnce: true });
  const layout = useSectionLayout();

  return (
    <section
      id="gifts"
      ref={ref}
      className="relative w-full overflow-hidden bg-bg py-16 md:py-24"
      style={{ scrollMarginTop: layout.navHeight }}
      aria-labelledby="gifts-title"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(227,209,203,0.5),transparent_58%)]" />
      <SceneFrame>
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
            With Love and Thanks
          </p>
          <div className="flex w-full justify-center">
            <FloralDivider draw="scroll" className="mt-3 h-7 w-48 text-rose/55" />
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
          <figure
            className={`photo-frame mx-auto mt-10 max-w-[16rem] bg-bg reveal-scale md:max-w-[18rem] ${
              isVisible ? "is-visible" : ""
            }`}
            style={{ transitionDelay: "180ms" }}
          >
            <div className="relative aspect-[2/3] overflow-hidden rounded-[2px]">
              <Parallax drift={18} scale={1.12} className="absolute inset-0" innerClassName="h-full w-full">
                <Image
                  src="/images/gifts.jpg"
                  alt="A brass Ganesh statue garlanded with pink flowers"
                  fill
                  sizes="(max-width: 768px) 16rem, 18rem"
                  className="object-cover"
                />
              </Parallax>
            </div>
          </figure>
          <p
            className={`mx-auto mt-10 max-w-3xl text-center text-base leading-8 text-text-muted reveal md:text-lg ${
              isVisible ? "is-visible" : ""
            }`}
            style={{ marginInline: "auto", transitionDelay: "260ms" }}
          >
            We are so grateful to have friends and family traveling from near and far to celebrate with
            us. Your presence is truly the greatest gift. For those who wish to give something more, we
            would be grateful for a contribution toward our house fund as we begin this next chapter
            together. A card box will be available at the wedding.
          </p>
      </div>
      </SceneFrame>
    </section>
  );
}
