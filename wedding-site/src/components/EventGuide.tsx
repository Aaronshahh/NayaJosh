"use client";

import type { ReactNode } from "react";
import Image from "next/image";
import type { EventKey } from "@/lib/events";
import { useAccess } from "./AccessProvider";
import { FloralDivider } from "./Florals";
import { Parallax, SceneFrame } from "./ui/motion-primitives";
import { useScrollReveal, useSectionLayout } from "./hooks";

function InlineLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="underline decoration-rose/50 underline-offset-4 transition-colors duration-300 hover:text-rose-deep hover:decoration-rose-deep focus:outline-none focus-visible:ring-2 focus-visible:ring-rose"
    >
      {children}
    </a>
  );
}

const events: Array<{
  key: EventKey;
  name: string;
  eyebrow: string;
  image: string;
  alt: string;
  paragraphs: ReactNode[];
  details: Array<{ label: string; value: ReactNode }>;
}> = [
  {
    key: "sangeet",
    name: "Mehndi & Welcome Dinner",
    eyebrow: "Henna, family & festivities",
    image: "/images/events/mehndi.jpg",
    alt: "Guests in colourful festive attire dancing at a mehndi celebration",
    paragraphs: [
      <>
        The <InlineLink href="https://en.wikipedia.org/wiki/Mehndi">Mehndi</InlineLink> is a
        traditional pre-wedding celebration featuring henna, food, music, and time with family
        and friends.
      </>,
      "Our Mehndi & Welcome Dinner is a chance for everyone to come together, mingle, and catch up before the wedding celebrations begin.",
    ],
    details: [
      { label: "Attire", value: "Semi-formal or Festive Casual" },
      {
        label: "Location",
        value: (
          <InlineLink href="https://www.google.com/maps/search/?api=1&query=Saffron+Cuisine%2C+450+Hespeler+Road%2C+Cambridge%2C+ON+N1R+0E3">
            Saffron Cuisine, Cambridge, ON
          </InlineLink>
        ),
      },
      {
        label: "When",
        value: (
          <>
            Saturday, June 12, 2027 · 4:00 PM – 8:00 PM EDT ·{" "}
            <InlineLink href="https://calendar.google.com/calendar/render?action=TEMPLATE&text=Naya+%26+Josh+%E2%80%94+Mehndi+%26+Welcome+Dinner&dates=20270612T160000/20270612T200000&ctz=America/Toronto&location=Saffron+Cuisine%2C+450+Hespeler+Road%2C+Unit+101%2C+Cambridge%2C+ON+N1R+0E3">
              Add to calendar
            </InlineLink>
          </>
        ),
      },
    ],
  },
  {
    key: "wedding",
    name: "Indian Wedding",
    eyebrow: "Tradition, family & new beginnings",
    image: "/images/events/indian-wedding.jpg",
    alt: "A bride and groom holding hands, adorned with henna, bangles, and garlands, their garments tied together",
    paragraphs: [
      "An Indian wedding ceremony is a celebration filled with colour, music, family, and tradition. Throughout the ceremony, you’ll see a series of rituals that represent the couple’s commitment to one another and the joining of their families.",
      <>
        Some of the traditions you’ll see include the{" "}
        <InlineLink href="https://en.wikipedia.org/wiki/Baraat">Baraat</InlineLink>, where the
        groom arrives in a lively procession of music and dancing; the exchange of garlands
        between the couple; and the{" "}
        <InlineLink href="https://en.wikipedia.org/wiki/Saptapadi">Pheras</InlineLink>, where the
        couple circles the sacred fire together while making promises for their life ahead. The
        ceremony also includes blessings from family and loved ones, bringing everyone together
        to celebrate the couple.
      </>,
      "Ceremony programs will be provided with details about the traditions and the meaning behind each part of the ceremony.",
    ],
    details: [
      { label: "Attire", value: "Formal or Festive" },
      {
        label: "Location",
        value: (
          <InlineLink href="https://www.google.com/maps/search/?api=1&query=Mississauga+Convention+Centre%2C+75+Derry+Road+West%2C+Mississauga%2C+ON+L5W+1G3">
            Mississauga Convention Centre, Mississauga, ON
          </InlineLink>
        ),
      },
      {
        label: "When",
        value: (
          <>
            Sunday, June 13, 2027 · 3:00 PM – 12:00 AM EDT ·{" "}
            <InlineLink href="https://calendar.google.com/calendar/render?action=TEMPLATE&text=Naya+%26+Josh+%E2%80%94+Indian+Wedding&dates=20270613T150000/20270614T000000&ctz=America/Toronto&location=Mississauga+Convention+Centre%2C+75+Derry+Road+West%2C+Mississauga%2C+ON+L5W+1G3">
              Add to calendar
            </InlineLink>
          </>
        ),
      },
    ],
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
      style={layout.section}
      aria-labelledby="celebrations-title"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_25%,rgba(194,168,131,0.18),transparent_28%),radial-gradient(circle_at_90%_75%,rgba(192,153,154,0.2),transparent_30%)]" />

      <SceneFrame>
      <div className="section-header">
        <p className={`section-eyebrow text-rose-deep reveal ${isVisible ? "is-visible" : ""}`}>
          A little context
        </p>
        <FloralDivider draw="scroll" className="mt-3 h-7 w-52 text-rose/60" />
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
                  <figure className="photo-frame group mx-auto max-w-[27rem] bg-bg">
                    <div className="relative aspect-[4/5] overflow-hidden rounded-[2px]">
                      <Parallax drift={20} scale={1.12} className="absolute inset-0" innerClassName="h-full w-full">
                        <Image
                          src={event.image}
                          alt={event.alt}
                          fill
                          sizes="(max-width: 1024px) 90vw, 27rem"
                          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.025]"
                        />
                      </Parallax>
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
                    {event.paragraphs.map((paragraph, paragraphIndex) =>
                      paragraphIndex === 0 ? (
                        <p key={paragraphIndex} className="text-lg leading-8 text-text">
                          {paragraph}
                        </p>
                      ) : (
                        <p key={paragraphIndex} className="mt-4 leading-7 text-text-muted">
                          {paragraph}
                        </p>
                      )
                    )}

                    <dl
                      className="mt-8 space-y-4 border-t border-rose/25 pt-6"
                      aria-label={`Details for the ${event.name}`}
                    >
                      {event.details.map((detail) => (
                        <div key={detail.label} className="grid gap-1 sm:grid-cols-[6.5rem_1fr] sm:gap-6">
                          <dt className="text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-rose-deep sm:pt-1">
                            {detail.label}
                          </dt>
                          <dd className="text-sm leading-6 text-text-muted md:text-base">
                            {detail.value}
                          </dd>
                        </div>
                      ))}
                    </dl>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
      </SceneFrame>
    </section>
  );
}
