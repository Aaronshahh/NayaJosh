"use client";

import { useState } from "react";
import { useScrollReveal, useSectionLayout } from "./hooks";
import { FloralDivider, CornerSprig } from "./Florals";
import { SectionTabs, TabPanel, Collapse, Chevron, SceneFrame } from "./ui/motion-primitives";

type ScheduleEvent = {
  time: string;
  title: string;
  paragraphs: string[];
};

type ScheduleDay = {
  key: string;
  tabDate: string;
  tabTitle: string;
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
    key: "mehendi",
    tabDate: "Sat · June 12",
    tabTitle: "Mehendi",
    date: "Saturday, June 12, 2027",
    headline: "Mehndi Ceremony / Welcome Dinner!",
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
    key: "wedding",
    tabDate: "Sun · June 13",
    tabTitle: "Wedding Day",
    date: "Sunday, June 13, 2027",
    headline: "Wedding Day!",
    location: "Mississauga Convention Centre, 75 Derry Road West, Mississauga, ON, L5W 1G3",
    attire: {
      label: "Dress Code: Formal or Festive Indian Attire",
      paragraphs: [
        "We encourage guests to embrace festive colours and kindly ask that all-black, all-white, and black-and-white attire be avoided. For more details, please refer to our Dress Guide.",
        "For anyone wearing Western attire who would like to add a touch of Indian tradition, we'll have a selection of traditional jewelry and bindis available to enjoy.",
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
          "Join Joshua, his family, and friends as they make their way to Naya's family, who will be waiting to welcome the baraat with prayers and blessings.",
          "This is no ordinary walk! The baraat is a lively celebration filled with music, dancing, and dhol drums as Joshua makes his grand entrance. Everyone is invited to join, so bring your best dance moves!",
          "Joshua has been warned that his shoes are bound to be stolen by Naya's side. If he wants them back, he'll have to pay the ransom!",
        ],
      },
      {
        time: "4:00 pm – 5:30 pm",
        title: "The Wedding",
        paragraphs: [
          "Join us as our two families come together to celebrate our union and shower us with flowers, love, and blessings as we begin this next chapter together.",
          "To help everyone feel included, ceremony programs will be provided with details about the traditions and meaning behind each part of the ceremony.",
        ],
      },
      {
        time: "5:30 pm – 6:30 pm",
        title: "Cocktail & Photo Hour",
        paragraphs: [
          "After the wedding ceremony, join us for cocktails, appetizers, and an open bar!",
          "We'd love the chance to chat, take photos, and spend time with all of you. We know many of you will have travelled from near and far to celebrate with us, and we want to make the most of every moment together.",
        ],
      },
      {
        time: "6:30 pm – 11:30 pm",
        title: "Reception",
        paragraphs: [
          "Now it's time to celebrate!",
          "Join us for an evening of delicious Indian and Western cuisine, an open bar, great music, and plenty of dancing. We'll also have a few games and surprises throughout the evening, with prizes to be won.",
          "Think you know Joshua & Naya? Yes, there will be trivia! If you want a chance at winning, make sure to look through the website carefully... you never know what details might come in handy.",
        ],
      },
    ],
  },
];

export function Schedule() {
  const { ref, isVisible } = useScrollReveal({ threshold: 0.08 });
  const layout = useSectionLayout();
  const [activeDay, setActiveDay] = useState(scheduleItems[0].key);
  // First event of each day starts open; the rest are a tap away.
  const [openEvents, setOpenEvents] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(scheduleItems.map((day) => [`${day.key}-0`, true]))
  );

  const toggleEvent = (eventId: string) =>
    setOpenEvents((prev) => ({ ...prev, [eventId]: !prev[eventId] }));

  return (
    <section id="schedule" ref={ref} className="section bg-bg-alt" style={layout.section} aria-labelledby="schedule-title">
      <CornerSprig scrub className="pointer-events-none absolute -right-4 top-16 h-72 w-52 -scale-x-100 text-sage/40" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(227,209,203,0.45),transparent_60%)]" />

      <SceneFrame>
      <div className="section-header">
        <p className={`section-eyebrow text-rose-deep reveal ${isVisible ? "is-visible" : ""}`}>
          Two days of celebration
        </p>
        <FloralDivider draw="scroll" className="mt-3 h-7 w-52 text-rose/60" />
        <h2
          id="schedule-title"
          className={`section-title mt-4 text-text reveal ${isVisible ? "is-visible" : ""}`}
          style={{ transitionDelay: "100ms" }}
        >
          Schedule
        </h2>
      </div>

      <div className="section-inner" style={layout.inner}>
        <div className="mx-auto w-full max-w-3xl">
          <div
            className={`flex justify-center reveal ${isVisible ? "is-visible" : ""}`}
            style={{ transitionDelay: "200ms" }}
          >
            <SectionTabs
              idBase="schedule"
              aria-label="Celebration days"
              value={activeDay}
              onChange={setActiveDay}
              tabs={scheduleItems.map((day) => ({
                value: day.key,
                label: (
                  <>
                    <span className="block text-[0.65rem] font-semibold uppercase tracking-[0.16em]">
                      {day.tabDate}
                    </span>
                    <span className="mt-0.5 block font-display text-lg font-medium leading-tight">
                      {day.tabTitle}
                    </span>
                  </>
                ),
              }))}
            />
          </div>

          <div className={`reveal ${isVisible ? "is-visible" : ""}`} style={{ transitionDelay: "280ms" }}>
            {scheduleItems.map((day) => (
              <TabPanel key={day.key} value={day.key} activeValue={activeDay} idBase="schedule" className="mt-10">
                <h3 className="text-center font-display text-3xl font-medium text-text md:text-4xl">
                  {day.headline}
                </h3>

                <div className="mt-4 flex items-start justify-center gap-2 text-sm text-text-muted md:text-base">
                  <svg
                    className="mt-0.5 h-4 w-4 flex-shrink-0 text-rose/70"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span className="max-w-2xl text-center">{day.location}</span>
                </div>

                {/* The day's agenda as a single program card: hairline-divided
                    rows, a fixed time column, expandable detail per event. */}
                <div className="card-light mt-10 overflow-hidden">
                  <ol className="divide-y divide-rose/15">
                    {day.events.map((event, eventIndex) => {
                      const eventId = `${day.key}-${eventIndex}`;
                      const open = Boolean(openEvents[eventId]);
                      return (
                        <li key={eventId}>
                          <button
                            type="button"
                            onClick={() => toggleEvent(eventId)}
                            aria-expanded={open}
                            aria-controls={`schedule-event-${eventId}`}
                            className="grid w-full gap-x-6 gap-y-1 px-6 py-5 text-left transition-colors duration-300 hover:bg-blush/30 sm:grid-cols-[8.5rem_1fr] sm:items-baseline md:px-8"
                          >
                            <time className="text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-rose-deep">
                              {event.time}
                            </time>
                            <span className="flex items-center justify-between gap-4">
                              <span className="font-display text-xl font-medium tracking-tight text-text md:text-2xl">
                                {event.title}
                              </span>
                              <Chevron open={open} className="text-rose-deep/70" />
                            </span>
                          </button>
                          <Collapse open={open} id={`schedule-event-${eventId}`}>
                            <div className="px-6 pb-6 md:px-8">
                              <div className="space-y-3 text-sm leading-relaxed text-text-muted sm:ml-40 md:text-base">
                                {event.paragraphs.map((paragraph) => (
                                  <p key={paragraph.slice(0, 40)}>{paragraph}</p>
                                ))}
                              </div>
                            </div>
                          </Collapse>
                        </li>
                      );
                    })}
                  </ol>
                </div>

                {day.attire && (
                  <div className="card-light mt-6 border-l-2 border-l-gold px-6 py-5 md:px-8 md:py-6">
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
              </TabPanel>
            ))}
          </div>
        </div>
      </div>
      </SceneFrame>
    </section>
  );
}
