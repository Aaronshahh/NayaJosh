"use client";

import Image from "next/image";
import type { EventKey } from "@/lib/events";
import { useAccess } from "./AccessProvider";
import { FloralDivider } from "./Florals";
import { useScrollReveal, useSectionLayout } from "./hooks";

const events: Array<{
  key: EventKey;
  name: string;
  eyebrow: string;
  image: string;
  alt: string;
  description: string;
  note: string;
  highlights: string[];
}> = [
  {
    key: "sangeet",
    name: "Sangeet",
    eyebrow: "Music, movement & celebration",
    image: "/images/events/sangeet.png",
    alt: "A bride displaying intricate mehendi with friends",
    description:
      "Sangeet means “music” in Sanskrit. This joyful pre-wedding gathering brings both families together for songs, choreographed dances, stories, dinner, and plenty of time on the dance floor.",
    note:
      "It is often celebrated alongside Mehendi—the henna tradition pictured here—when intricate designs are applied to the bride’s hands and arms.",
    highlights: ["Family performances", "Dinner and dancing", "Colorful festive attire"],
  },
  {
    key: "wedding",
    name: "Indian Wedding",
    eyebrow: "Tradition, family & new beginnings",
    image: "/images/events/indian-wedding.png",
    alt: "A newly married Indian couple celebrating beneath a flower-covered pavilion",
    description:
      "An Indian wedding is a vibrant union of two people and two families. The ceremony blends meaningful rituals, blessings, flowers, music, and joyful celebration, with each tradition representing a promise for married life.",
    note:
      "Customs differ across regions, religions, and families. Guests may see a lively entrance procession, an exchange of garlands, ceremonial vows, and blessings from loved ones.",
    highlights: ["A celebratory procession", "Ceremony and blessings", "Reception festivities"],
  },
];

export function EventGuide() {
  const { ref, isVisible } = useScrollReveal({ threshold: 0.08, triggerOnce: true });
  const layout = useSectionLayout();
  const { events: allowedEvents } = useAccess();
  const visibleEvents = events.filter((event) => allowedEvents.includes(event.key));

  if (visibleEvents.length === 0) return null;

  return (
    <section
      id="celebrations"
      ref={ref}
      className="section bg-bg-alt"
      style={{ ...layout.section, paddingTop: "clamp(6rem, 10vw, 9rem)" }}
      aria-labelledby="celebrations-title"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_25%,rgba(194,168,131,0.18),transparent_28%),radial-gradient(circle_at_90%_75%,rgba(192,153,154,0.2),transparent_30%)]" />

      <div className="section-header">
        <p className={`section-eyebrow text-rose-deep reveal ${isVisible ? "is-visible" : ""}`}>
          A little context
        </p>
        <FloralDivider className={`mt-3 h-5 w-44 text-rose/60 reveal ${isVisible ? "is-visible" : ""}`} />
        <h2
          id="celebrations-title"
          className={`section-title mt-4 text-text reveal ${isVisible ? "is-visible" : ""}`}
          style={{ transitionDelay: "100ms" }}
        >
          {visibleEvents.length > 1 ? "The Celebrations" : "The Celebration"}
        </h2>
        <p
          className={`section-subtitle text-text-muted reveal ${isVisible ? "is-visible" : ""}`}
          style={{ transitionDelay: "200ms" }}
        >
          What to expect, what it means, and how we will celebrate together.
        </p>
      </div>

      <div className="section-inner" style={layout.inner}>
        <div className="space-y-20 md:space-y-28">
          {visibleEvents.map((event, index) => {
            const imageFirst = index % 2 === 0;

            return (
              <article
                key={event.key}
                className="grid items-center gap-10 lg:grid-cols-2 lg:gap-20"
              >
                <div
                  className={`${imageFirst ? "lg:order-1" : "lg:order-2"} ${
                    imageFirst ? "reveal-left" : "reveal-right"
                  } ${isVisible ? "is-visible" : ""}`}
                  style={{ transitionDelay: `${260 + index * 120}ms` }}
                >
                  <figure className="photo-frame group mx-auto max-w-[36rem] bg-bg">
                    <div className="relative aspect-[3/2] overflow-hidden">
                      <Image
                        src={event.image}
                        alt={event.alt}
                        fill
                        sizes="(max-width: 1024px) 100vw, 50vw"
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.025]"
                      />
                    </div>
                  </figure>
                </div>

                <div
                  className={`${imageFirst ? "lg:order-2" : "lg:order-1"} reveal ${
                    isVisible ? "is-visible" : ""
                  }`}
                  style={{ transitionDelay: `${360 + index * 120}ms` }}
                >
                  <div className="mx-auto max-w-xl">
                    <p className="text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-rose-deep">
                      {event.eyebrow}
                    </p>
                    <h3 className="mt-3 font-display text-5xl font-medium leading-none text-text md:text-6xl">
                      {event.name}
                    </h3>
                    <div className="my-6 h-px w-20 bg-gold" />
                    <p className="text-lg leading-8 text-text">{event.description}</p>
                    <p className="mt-4 leading-7 text-text-muted">{event.note}</p>

                    <ul className="mt-8 grid gap-3 sm:grid-cols-3" aria-label={`What to expect at the ${event.name}`}>
                      {event.highlights.map((highlight) => (
                        <li
                          key={highlight}
                          className="border-l-2 border-rose/50 bg-bg/45 px-4 py-3 text-sm leading-5 text-text-muted"
                        >
                          {highlight}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
