"use client";

import { FloralDivider } from "./Florals";
import { useScrollReveal, useSectionLayout } from "./hooks";

const storyMoments = [
  {
    title: "A Chance Hello",
    image: "/images/couple-story-1.jpg",
    text: "Naya and Josh first found each other in the middle of an ordinary day that somehow refused to stay ordinary.",
  },
  {
    title: "The Easy Middle",
    image: "/images/couple-story2.jpg",
    text: "What started as long conversations became weekend rituals, shared playlists, and the quiet comfort of being known.",
  },
  {
    title: "Forever, Gently",
    image: "/images/couple-story3.jpg",
    text: "Their story has grown in small, beautiful ways: with family, laughter, patience, and a home they keep choosing together.",
  },
];

export function OurStory() {
  const { ref, isVisible } = useScrollReveal({ threshold: 0.12 });
  const layout = useSectionLayout();

  return (
    <section
      id="our-story"
      ref={ref}
      className="section bg-bg-alt"
      style={layout.section}
      aria-labelledby="our-story-title"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(192,153,154,0.28),transparent_58%)]" />

      <div className="section-header">
        <p className={`section-eyebrow text-rose-deep reveal ${isVisible ? "is-visible" : ""}`}>
          How it began
        </p>
        <FloralDivider className={`mt-3 h-5 w-44 text-rose/60 reveal ${isVisible ? "is-visible" : ""}`} />
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
          Three little chapters from the road to this celebration.
        </p>
      </div>

      <div className="section-inner" style={layout.inner}>
        <div
          className={`flex flex-col gap-5 md:h-[32rem] md:flex-row md:items-stretch md:gap-6 reveal ${
            isVisible ? "is-visible" : ""
          }`}
          style={{ transitionDelay: "260ms" }}
        >
          {storyMoments.map((moment) => (
            <article
              key={moment.title}
              tabIndex={0}
              className="group relative min-h-[24rem] flex-1 overflow-hidden rounded-[12rem] border border-rose/25 bg-blush/40 shadow-[0_26px_70px_-38px_rgba(58,46,52,0.6)] outline-none transition-[flex,border-radius,box-shadow] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] hover:flex-[3.4] hover:rounded-[24px] focus-visible:flex-[3.4] focus-visible:rounded-[24px] focus-visible:ring-2 focus-visible:ring-rose/55 md:min-h-0"
            >
              <img
                src={moment.image}
                alt={`${moment.title} placeholder photo of Naya and Josh`}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105 group-focus-visible:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-bg-dark/78 via-bg-dark/12 to-transparent opacity-80 transition-opacity duration-500 group-hover:opacity-95 group-focus-visible:opacity-95" />
              <div className="absolute inset-x-8 bottom-10 text-text-light transition-all duration-500 md:inset-x-12 md:bottom-12 md:translate-y-10 md:opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100 md:group-focus-visible:translate-y-0 md:group-focus-visible:opacity-100">
                <h3 className="font-display text-3xl font-medium tracking-tight md:text-4xl">{moment.title}</h3>
                <p className="mt-4 max-w-lg text-sm leading-relaxed text-text-light/82 md:text-base">{moment.text}</p>
              </div>
              <span className="absolute bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap font-display text-2xl italic text-text-light transition-opacity duration-300 group-hover:opacity-0 group-focus-visible:opacity-0 md:text-3xl">
                {moment.title}
              </span>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
