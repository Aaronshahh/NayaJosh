"use client";

import { useScrollReveal, useSectionLayout } from "./hooks";
import { FloralDivider, CornerSprig } from "./Florals";

const scheduleItems = [
  {
    date: "OCTOBER 25, 2026",
    events: [
      { time: "6:00 PM", title: "Mehendi Ceremony", desc: "Traditional henna with music & dance", location: "Chicago Cultural Center" },
      { time: "8:30 PM", title: "Sangeet Celebration", desc: "An evening of performances, dinner & celebration", location: "Chicago Cultural Center" },
    ],
  },
  {
    date: "OCTOBER 26, 2026",
    events: [
      { time: "3:00 PM", title: "Guest Arrival & Welcome Drinks", desc: "Light refreshments & mingling", location: "The Geraghty" },
      { time: "4:00 PM", title: "Wedding Ceremony", desc: "Vows & traditional ceremony", location: "The Geraghty" },
      { time: "5:30 PM", title: "Cocktail Hour", desc: "Signature drinks & hors d'oeuvres", location: "The Geraghty — Garden" },
      { time: "7:00 PM", title: "Reception & Dinner", desc: "Dinner, toasts & dancing", location: "The Geraghty" },
      { time: "10:00 PM", title: "Late Night Celebration", desc: "Dessert bar & after-party", location: "The Geraghty" },
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
          Weekend Schedule
        </h2>
      </div>

      <div className="section-inner" style={layout.inner}>
        <div className="grid items-center gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          {/* Framed feature photo */}
          <div className={`reveal-left ${isVisible ? "is-visible" : ""}`}>
            <div className="photo-frame mx-auto aspect-[3/4] max-w-sm">
              <img src="/images/story-4.avif" alt="Naya and Josh" />
            </div>
            <p className="mt-5 text-center font-display text-2xl italic text-rose-deep">
              The beginning of forever
            </p>
          </div>

          {/* Timeline */}
          <div className="space-y-14">
            {scheduleItems.map((day, dayIndex) => (
              <div key={day.date}>
                <div
                  className={`mb-9 flex items-center gap-4 reveal ${isVisible ? "is-visible" : ""}`}
                  style={{ transitionDelay: `${dayIndex * 120}ms` }}
                >
                  <span className="h-px flex-1 bg-rose/30" />
                  <span className="whitespace-nowrap text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-rose-deep md:text-xs">
                    {day.date}
                  </span>
                  <span className="h-px flex-1 bg-rose/30" />
                </div>

                <ol className="relative ml-1 space-y-5 border-l border-rose/25 pl-8">
                  {day.events.map((event, eventIndex) => (
                    <li
                      key={`${day.date}-${event.time}`}
                      className={`relative reveal ${isVisible ? "is-visible" : ""}`}
                      style={{ transitionDelay: `${dayIndex * 120 + eventIndex * 70}ms` }}
                    >
                      <span
                        className="absolute -left-8 top-2 h-2.5 w-2.5 -translate-x-1/2 rounded-full bg-rose ring-4 ring-bg-alt"
                        aria-hidden="true"
                      />
                      <article className="card-light p-5 md:p-6">
                        <div className="mb-2 flex flex-wrap items-baseline gap-x-3 gap-y-1">
                          <time className="font-display text-lg font-medium text-rose-deep md:text-xl">{event.time}</time>
                          <h3 className="font-display text-lg font-medium tracking-tight text-text md:text-xl">{event.title}</h3>
                        </div>
                        <p className="mb-3 text-sm leading-relaxed text-text-muted">{event.desc}</p>
                        <div className="flex items-center gap-2 text-sm text-text-muted">
                          <svg className="h-4 w-4 flex-shrink-0 text-rose/70" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          <span>{event.location}</span>
                        </div>
                      </article>
                    </li>
                  ))}
                </ol>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
