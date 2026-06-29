"use client";

import { useState, FormEvent } from "react";
import { useScrollReveal, useSectionLayout } from "./hooks";
import { FloralDivider, CornerSprig } from "./Florals";

interface EventData {
  name: string;
  date: string;
  time: string;
  location: string;
  description: string;
  image: string;
  icon: React.ReactNode;
}

const events: EventData[] = [
  {
    name: "Mehendi / Sangeet",
    date: "October 25, 2026",
    time: "6:00 PM",
    location: "Chicago Cultural Center",
    description: "An evening of music, dance, and henna before the big day.",
    image: "/images/sangeet.jpeg",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.805.547 3.508 1.494 4.89M9 19s4.803.95 5.367 2.238m0-2.238A11.51 11.51 0 009 19m9.367-2.238A62.768 62.768 0 019 19m0 0l-2.514-.927A60.09 60.09 0 004.59 21.13" />
      </svg>
    ),
  },
  {
    name: "Wedding Ceremony",
    date: "October 26, 2026",
    time: "4:00 PM",
    location: "The Geraghty, Chicago",
    description: "Join us as we exchange vows surrounded by family and friends.",
    image: "/images/story-3.jpg",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    ),
  },
];

export function RSVP() {
  const { ref, isVisible } = useScrollReveal({ threshold: 0.1 });
  const layout = useSectionLayout();
  const [submitted, setSubmitted] = useState<string | null>(null);
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

  const toggleExpanded = (eventName: string) =>
    setExpanded((prev) => ({ ...prev, [eventName]: !prev[eventName] }));

  const handleSubmit = (e: FormEvent, eventName: string) => {
    e.preventDefault();
    setSubmitted(eventName);
  };

  return (
    <section id="rsvp" ref={ref} className="section bg-bg" style={layout.section} aria-labelledby="rsvp-title">
      {/* decorative botanicals */}
      <CornerSprig className="pointer-events-none absolute -left-6 top-10 h-72 w-52 text-sage/40" />
      <CornerSprig className="pointer-events-none absolute -right-6 bottom-10 h-72 w-52 -scale-x-100 text-rose/30" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(227,209,203,0.4),transparent_60%)]" />

      <div className="section-header">
        <p className={`section-eyebrow text-rose-deep reveal ${isVisible ? "is-visible" : ""}`}>
          Together with their families
        </p>
        <FloralDivider className={`mt-3 h-5 w-44 text-rose/60 reveal ${isVisible ? "is-visible" : ""}`} />
        <h2
          id="rsvp-title"
          className={`section-title mt-4 text-text reveal ${isVisible ? "is-visible" : ""}`}
          style={{ transitionDelay: "100ms" }}
        >
          Kindly RSVP
        </h2>
        <p
          className={`section-subtitle text-text-muted reveal ${isVisible ? "is-visible" : ""}`}
          style={{ transitionDelay: "200ms" }}
        >
          Please let us know if you can join us for each celebration. We&rsquo;d love to have you there.
        </p>
      </div>

      <div className="section-inner flex justify-center" style={layout.inner}>
        <div className="grid w-full max-w-5xl justify-center gap-7 md:grid-cols-2 lg:gap-9">
          {events.map((event, index) => (
            <article
              key={event.name}
              className={`card-light w-full max-w-[30rem] overflow-hidden ${index === 0 ? "reveal-left" : "reveal-right"} ${
                isVisible ? "is-visible" : ""
              }`}
              style={{ transitionDelay: `${index * 120}ms` }}
            >
              {/* photo banner */}
              <div
                className={`relative overflow-hidden transition-all duration-500 ${
                  expanded[event.name] ? "h-44" : "h-80 md:h-96"
                }`}
              >
                <img
                  src={event.image}
                  alt=""
                  className={`h-full w-full object-cover transition-opacity duration-500 ${
                    expanded[event.name] ? "opacity-60" : "opacity-100"
                  }`}
                />
                {/* slight wash that appears once the form is open */}
                <div
                  className={`absolute inset-0 transition-colors duration-500 ${
                    expanded[event.name] ? "bg-bg/40" : "bg-transparent"
                  }`}
                />
                {/* bottom gradient keeps the event name legible */}
                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-bg/90 to-transparent" />
                <div className="absolute bottom-4 left-6 right-6 flex items-center gap-3 text-rose-deep">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-bg/80 text-rose-deep shadow-sm">
                    {event.icon}
                  </span>
                  <h3 className="font-display text-2xl font-medium tracking-tight text-text md:text-3xl">
                    {event.name}
                  </h3>
                </div>
              </div>

              <div className="p-7 md:p-9">
                {!expanded[event.name] ? (
                  <button
                    type="button"
                    onClick={() => toggleExpanded(event.name)}
                    className="btn-primary w-full"
                    aria-expanded={false}
                    aria-controls={`rsvp-form-${event.name}`}
                  >
                    RSVP
                  </button>
                ) : (
                  <div id={`rsvp-form-${event.name}`} className="animate-scale-in">
                    <p className="mb-7 leading-relaxed text-text-muted">{event.description}</p>

                    <form onSubmit={(e) => handleSubmit(e, event.name)} className="space-y-5" noValidate>
                      <div className="grid gap-4 sm:grid-cols-2">
                        <div>
                          <label htmlFor={`name-${event.name}`} className="label-field">Full Name</label>
                          <input type="text" id={`name-${event.name}`} name="name" className="input-field" placeholder="Your name" required autoComplete="name" />
                        </div>
                        <div>
                          <label htmlFor={`email-${event.name}`} className="label-field">Email</label>
                          <input type="email" id={`email-${event.name}`} name="email" className="input-field" placeholder="your@email.com" required autoComplete="email" />
                        </div>
                      </div>

                      <fieldset className="space-y-3">
                        <legend className="label-field">Will you be attending?</legend>
                        <div className="flex flex-wrap gap-4">
                          <label className="flex items-center gap-2 cursor-pointer">
                            <input type="radio" name={`attending-${event.name}`} value="yes" className="w-4 h-4 accent-rose" required />
                            <span className="text-sm font-medium text-text">Joyfully accept</span>
                          </label>
                          <label className="flex items-center gap-2 cursor-pointer">
                            <input type="radio" name={`attending-${event.name}`} value="no" className="w-4 h-4 accent-rose" />
                            <span className="text-sm font-medium text-text">Regretfully decline</span>
                          </label>
                        </div>
                      </fieldset>

                      <div>
                        <label htmlFor={`guests-${event.name}`} className="label-field">Number of Guests</label>
                        <select id={`guests-${event.name}`} name="guests" className="input-field appearance-none" defaultValue="1">
                          {[1, 2, 3, 4, 5, 6].map((n) => (
                            <option key={n} value={n}>{n} {n === 1 ? "guest" : "guests"}</option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label htmlFor={`message-${event.name}`} className="label-field">Message (optional)</label>
                        <textarea id={`message-${event.name}`} name="message" rows={2} className="input-field resize-y min-h-[64px]" placeholder="Dietary notes, song requests, or a note for us..." />
                      </div>

                      <button type="submit" className="btn-primary w-full" disabled={submitted === event.name}>
                        {submitted === event.name ? "RSVP Received" : "Submit RSVP"}
                      </button>
                    </form>

                    {submitted === event.name && (
                      <div className="mt-5 rounded-[3px] border border-rose/30 bg-rose/10 p-4 animate-scale-in" role="status">
                        <p className="text-center font-medium text-rose-deep">Thank you! Your RSVP for {event.name} is in.</p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
