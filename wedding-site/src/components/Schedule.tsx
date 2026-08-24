"use client";

import { useScrollReveal, useSectionLayout } from "./hooks";
import { FloralDivider, CornerSprig } from "./Florals";

type ScheduleEvent = {
  time: string;
  title: string;
  paragraphs: string[];
};

type ScheduleDay = {
  date: string;
  headline: string;
  location: string;
  attire?: {
    label: string;
    paragraphs: string[];
  };
  events: ScheduleEvent[];
};

const scheduleItems: ScheduleDay[] = [
  {
    date: "Saturday, June 12, 2027",
    headline: "Mehendi Ceremony / Welcome Dinner!",
    location: "Saffron Cuisine, 450 Hespeler Road, Unit 101, Cambridge, ON, N1R 0E3",
    attire: {
      label: "Wedding Attire: Semi-formal or Festive Indian Attire",
      paragraphs: [
        "Mehndi is a celebration of colour, joy, and togetherness! We encourage guests to embrace bright, festive colours and have fun with their outfits. As a small request, we kindly ask that guests avoid all-white or all-black attire.",
      ],
    },
    events: [
      {
        time: "4:00 pm – 8:00 pm",
        title: "Arrival Window",
        paragraphs: [
          "Come celebrate with us for an evening filled with laughter, love, and togetherness, surrounded by our closest family and friends. We'll be serving a delicious spread of Indian cuisine, featuring a variety of flavours for you to enjoy. Henna artists will also be available throughout the evening for guests who would like to partake in this beautiful tradition.",
        ],
      },
    ],
  },
  {
    date: "Sunday, June 13, 2027",
    headline: "Wedding Day!",
    location: "Mississauga Convention Centre, 75 Derry Road West, Mississauga, ON, L5W 1G3",
    attire: {
      label: "Wedding Attire: Formal or Festive Indian Attire",
      paragraphs: [
        "Indian weddings are a celebration of colour, joy, and togetherness! We encourage guests to embrace bright, festive colours and have fun with their outfits. As a small request, we kindly ask that guests avoid all-white or all-black attire.",
        "For anyone wearing Western attire who would like to add a touch of Indian tradition, we'll have a selection of traditional jewelry and bindis available to enjoy. Whether you'd like to try something new or simply join in the festive spirit, we hope you'll enjoy taking part in the experience!",
      ],
    },
    events: [
      {
        time: "2:00 pm – 3:00 pm",
        title: "Arrival Window",
        paragraphs: ["Please arrive before 2:45 pm."],
      },
      {
        time: "3:00 pm – 4:00 pm",
        title: "The Baraat",
        paragraphs: [
          "Join Joshua, his family, and friends as they make their way to the ceremony, where Naya's family will be waiting to welcome them with prayers and blessings.",
          "This is no ordinary walk! The baraat is a lively celebration filled with music, dancing, and dhol drums as Joshua makes his grand entrance. Everyone is invited to join, so bring your best dance moves!",
          "Joshua has been warned that his shoes are bound to be stolen by Naya's side. If he wants them back, he'll have to pay the ransom!",
        ],
      },
      {
        time: "4:00 pm – 5:30 pm",
        title: "The Wedding",
        paragraphs: [
          "Join us as our two families come together to celebrate our union and shower us with flowers, love, and blessings as we begin this next chapter together. To help everyone feel included, ceremony programs will be provided with details about the traditions and meaning behind each part of the ceremony.",
        ],
      },
      {
        time: "5:30 pm – 6:30 pm",
        title: "Cocktail & Photo Hour",
        paragraphs: [
          "After the wedding ceremony, join us for cocktails, a variety of appetizers, and an open bar!",
          "We'd love the chance to chat, take photos, and spend time with all of you. We know many of you will have travelled from near and far to celebrate with us, and we want to make the most of every moment together.",
        ],
      },
      {
        time: "6:30 pm – 11:30 pm",
        title: "Reception",
        paragraphs: [
          "Now it's time for food, drinks and celebration.",
          "Get ready for a night full of delicious Indian and Western cuisine served buffet-style, an open bar, great music, and lots of dancing! We'll also have games for guests of all ages, with prizes to be won, so whether you're young or young at heart, come ready to play!",
          "Let's eat, drink, dance, and make the best memories together!",
          "Yes, there will be trivia! If you want a chance at winning, make sure to look through the website carefully... you never know what details might come in handy.",
        ],
      },
    ],
  },
];

export function Schedule() {
  const { ref, isVisible } = useScrollReveal({ threshold: 0.08 });
  const layout = useSectionLayout();

  return (
    <section id="schedule" ref={ref} className="section bg-bg-alt" style={layout.section} aria-labelledby="schedule-title">
      <CornerSprig className="pointer-events-none absolute -right-4 top-16 h-72 w-52 -scale-x-100 text-sage/40" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(227,209,203,0.45),transparent_60%)]" />

      <div className="section-header">
        <p className={`section-eyebrow text-rose-deep reveal ${isVisible ? "is-visible" : ""}`}>
          Two days of celebration
        </p>
        <FloralDivider className={`mt-3 h-5 w-44 text-rose/60 reveal ${isVisible ? "is-visible" : ""}`} />
        <h2
          id="schedule-title"
          className={`section-title mt-4 text-text reveal ${isVisible ? "is-visible" : ""}`}
          style={{ transitionDelay: "100ms" }}
        >
          Schedule
        </h2>
      </div>

      <div className="section-inner" style={layout.inner}>
        <div className="mx-auto grid max-w-6xl gap-14 lg:grid-cols-2 lg:gap-16 lg:items-start">
          {scheduleItems.map((day, dayIndex) => (
            <div key={day.date}>
              <div
                className={`mb-8 flex items-center gap-4 reveal ${isVisible ? "is-visible" : ""}`}
                style={{ transitionDelay: `${dayIndex * 120}ms` }}
              >
                <span className="h-px flex-1 bg-rose/30" />
                <span className="whitespace-nowrap text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-rose-deep md:text-xs">
                  {day.date}
                </span>
                <span className="h-px flex-1 bg-rose/30" />
              </div>

              <h3
                className={`mb-8 font-display text-3xl font-medium text-text reveal md:text-4xl ${
                  isVisible ? "is-visible" : ""
                }`}
                style={{ transitionDelay: `${dayIndex * 120 + 60}ms` }}
              >
                {day.headline}
              </h3>

              <ol className="relative ml-1 space-y-6 border-l border-rose/25 pl-8">
                {day.events.map((event, eventIndex) => (
                  <li
                    key={`${day.date}-${event.title}-${event.time}`}
                    className={`relative reveal ${isVisible ? "is-visible" : ""}`}
                    style={{ transitionDelay: `${dayIndex * 120 + eventIndex * 70}ms` }}
                  >
                    <span
                      className="absolute -left-8 top-2 h-2.5 w-2.5 -translate-x-1/2 rounded-full bg-rose ring-4 ring-bg-alt"
                      aria-hidden="true"
                    />
                    <article className="card-light p-5 md:p-6">
                      <div className="mb-3 flex flex-wrap items-baseline gap-x-3 gap-y-1">
                        <time className="font-display text-lg font-medium text-rose-deep md:text-xl">{event.time}</time>
                        <h4 className="font-display text-lg font-medium tracking-tight text-text md:text-xl">{event.title}</h4>
                      </div>
                      <div className="space-y-3 text-sm leading-relaxed text-text-muted md:text-base">
                        {event.paragraphs.map((paragraph) => (
                          <p key={paragraph.slice(0, 40)}>{paragraph}</p>
                        ))}
                      </div>
                    </article>
                  </li>
                ))}
              </ol>

              {day.attire && (
                <div
                  className={`mt-8 card-light border-l-4 border-l-gold p-5 md:p-6 reveal ${isVisible ? "is-visible" : ""}`}
                  style={{ transitionDelay: `${dayIndex * 120 + day.events.length * 70}ms` }}
                >
                  <p className="mb-3 text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-rose-deep">
                    {day.attire.label}
                  </p>
                  <div className="space-y-3 text-sm leading-relaxed text-text-muted md:text-base">
                    {day.attire.paragraphs.map((paragraph) => (
                      <p key={paragraph.slice(0, 40)}>{paragraph}</p>
                    ))}
                  </div>
                </div>
              )}

              <div
                className={`mt-6 flex items-start gap-2 text-sm text-text-muted reveal md:text-base ${
                  isVisible ? "is-visible" : ""
                }`}
                style={{ transitionDelay: `${dayIndex * 120 + day.events.length * 70 + 40}ms` }}
              >
                <svg className="mt-0.5 h-4 w-4 flex-shrink-0 text-rose/70" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>{day.location}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
