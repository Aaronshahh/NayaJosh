"use client";

import Image from "next/image";
import { useRef } from "react";
import { FloralDivider } from "./Florals";
import { Parallax, SceneFrame, ScrollDraw } from "./ui/motion-primitives";
import { useScrollReveal, useSectionLayout } from "./hooks";

const chapters = [
  {
    number: "01",
    title: "The beginning",
    image: "/images/story/chapter-1.png",
    width: 667,
    height: 749,
    alt: "Naya and Josh sitting together while holding squirrel monkeys",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus vel sem at sapien posuere tincidunt, et tempor justo.",
  },
  {
    number: "02",
    title: "Growing together",
    image: "/images/story/chapter-2.png",
    width: 749,
    height: 668,
    alt: "Josh carrying Naya in a garden filled with spring tulips",
    description:
      "Praesent commodo, justo sed cursus facilisis, neque libero malesuada nibh, vitae consequat erat lorem in augue.",
  },
  {
    number: "03",
    title: "Making traditions",
    image: "/images/story/chapter-3.png",
    width: 749,
    height: 557,
    alt: "Naya and Josh standing in front of a snowy Christmas tree",
    description:
      "Curabitur vitae mi vitae lectus faucibus volutpat. Integer feugiat, massa a feugiat dapibus, velit nisl interdum erat.",
  },
  {
    number: "04",
    title: "The next chapter",
    image: "/images/story/chapter-4.png",
    width: 749,
    height: 611,
    alt: "Naya and Josh dressed for a formal celebration",
    description:
      "Suspendisse potenti. Donec euismod, nisl eget facilisis vulputate, urna arcu dignissim lorem, sed varius ante sapien.",
  },
];

function StoryChapter({
  chapter,
  index,
}: {
  chapter: (typeof chapters)[number];
  index: number;
}) {
  const { ref, isVisible } = useScrollReveal({
    threshold: 0.18,
    rootMargin: "0px 0px -60px 0px",
    triggerOnce: true,
  });
  const imageFirst = index % 2 === 0;

  return (
    <article
      ref={ref}
      className="relative grid items-center gap-10 md:grid-cols-2 md:gap-16 lg:gap-24"
    >
      <div
        className={`${imageFirst ? "md:order-1" : "md:order-2"} ${
          imageFirst ? "reveal-left" : "reveal-right"
        } ${isVisible ? "is-visible" : ""}`}
      >
        <figure
          className={`photo-frame mx-auto max-w-[34rem] bg-bg ${
            imageFirst ? "md:-rotate-1" : "md:rotate-1"
          }`}
        >
          <Parallax clip drift={16} scale={1.12} className="rounded-[2px]">
            <Image
              src={chapter.image}
              alt={chapter.alt}
              width={chapter.width}
              height={chapter.height}
              sizes="(max-width: 768px) 100vw, 50vw"
              className="h-auto w-full"
            />
          </Parallax>
        </figure>
      </div>

      <div
        className={`${imageFirst ? "md:order-2" : "md:order-1"} reveal ${
          isVisible ? "is-visible" : ""
        }`}
        style={{ transitionDelay: "140ms" }}
      >
        <div className="mx-auto max-w-md text-center md:text-left">
          <p className="font-body text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-rose-deep">
            Chapter {chapter.number}
          </p>
          <h3 className="mt-3 font-display text-4xl font-medium leading-tight text-text md:text-5xl">
            {chapter.title}
          </h3>
          <div className="mx-auto my-6 h-px w-16 bg-rose/60 md:mx-0" />
          <p className="text-base leading-8 text-text-muted md:text-lg">
            {chapter.description}
          </p>
        </div>
      </div>

      {/* Rail dot pops once the chapter reveals; outer span keeps the centering
          translate out of reveal-scale's transform. */}
      <span
        className="pointer-events-none absolute left-1/2 top-1/2 z-10 hidden -translate-x-1/2 -translate-y-1/2 md:block"
        aria-hidden="true"
      >
        <span
          className={`reveal-scale ${isVisible ? "is-visible" : ""} block size-3 rounded-full border-[3px] border-bg bg-rose shadow-[0_0_0_1px_rgba(168,123,126,0.45)]`}
          style={{ transitionDelay: "260ms" }}
        />
      </span>
    </article>
  );
}

export function OurStory() {
  const { ref, isVisible } = useScrollReveal({ threshold: 0.08, triggerOnce: true });
  const layout = useSectionLayout();
  const chaptersRef = useRef<HTMLDivElement>(null);

  return (
    <section
      id="our-story"
      ref={ref}
      className="section bg-bg"
      style={{ ...layout.section, paddingTop: "clamp(6rem, 10vw, 9rem)" }}
      aria-labelledby="our-story-title"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(192,153,154,0.18),transparent_42%)]" />

      <SceneFrame>
      <div className="section-header">
        <p className={`section-eyebrow text-rose-deep reveal ${isVisible ? "is-visible" : ""}`}>
          From then to now
        </p>
        <FloralDivider draw="scroll" className="mt-3 h-7 w-52 text-rose/60" />
        <h2
          id="our-story-title"
          className={`section-title mt-4 text-text reveal ${isVisible ? "is-visible" : ""}`}
          style={{ transitionDelay: "100ms" }}
        >
          Our Story
        </h2>
        <p
          className={`section-subtitle text-text-muted reveal ${isVisible ? "is-visible" : ""}`}
          style={{ transitionDelay: "200ms" }}
        >
          Four chapters from the life we have built together.
        </p>
      </div>

      <div className="section-inner mt-20 md:mt-28" style={layout.inner}>
        {/* Hairline track; the rose fill draws down in step with reading progress. */}
        <div
          className="pointer-events-none absolute bottom-24 left-1/2 top-24 hidden w-px -translate-x-1/2 bg-rose/15 md:block"
          aria-hidden="true"
        >
          <ScrollDraw targetRef={chaptersRef} className="bg-rose/45" />
        </div>
        <div ref={chaptersRef} className="relative space-y-24 md:space-y-36 lg:space-y-44">
          {chapters.map((chapter, index) => (
            <StoryChapter key={chapter.number} chapter={chapter} index={index} />
          ))}
        </div>
      </div>
      </SceneFrame>
    </section>
  );
}
