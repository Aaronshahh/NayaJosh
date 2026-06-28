"use client";

import { useState } from "react";
import { useScrollReveal, useSectionLayout } from "./hooks";
import { FloralDivider, CornerSprig } from "./Florals";

const faqs = [
  {
    question: "What should I wear?",
    answer: "Wedding Ceremony: Formal / Black-tie optional. Mehendi/Sangeet: Festive cocktail / Semi-formal with a touch of color (traditional Indian attire welcome!). Comfortable shoes recommended for dancing.",
  },
  {
    question: "Is there parking at the venue?",
    answer: "Yes, valet parking will be available at The Geraghty for the wedding ceremony and reception. For the Mehendi/Sangeet at the Chicago Cultural Center, there are several paid parking garages within walking distance.",
  },
  {
    question: "Can I bring a plus one?",
    answer: "Please check your invitation — the envelope indicates whether a plus one is included. If you're unsure, please reach out to us directly.",
  },
  {
    question: "Are children invited?",
    answer: "We love kids! However, due to venue capacity, this is an adults-only celebration (18+). We appreciate your understanding.",
  },
  {
    question: "What dietary options will be available?",
    answer: "We'll have vegetarian, vegan, and gluten-free options available. Please indicate any dietary restrictions or allergies in your RSVP form so we can accommodate you.",
  },
  {
    question: "Is there a gift registry?",
    answer: "Your presence is our present! If you'd like to give a gift, we've set up a small registry and a honeymoon fund. Details will be shared closer to the date.",
  },
  {
    question: "What's the weather like in Chicago in late October?",
    answer: "Expect crisp fall weather — highs around 55-65°F (13-18°C), lows around 40-50°F (4-10°C). Layers are recommended. The venue is indoors and heated.",
  },
  {
    question: "How do I get from the airport to the venue/hotels?",
    answer: "From O'Hare (ORD): Blue Line CTA to downtown (~45 min) or rideshare (~30 min). From Midway (MDW): Orange Line CTA (~35 min) or rideshare (~25 min). Both airports have readily available Uber/Lyft/taxi service.",
  },
  {
    question: "What if I need to cancel my RSVP?",
    answer: "Life happens! Please let us know as soon as possible by emailing us or updating your RSVP through the form. We'd appreciate a heads-up by October 1st for final headcounts.",
  },
  {
    question: "Will there be a photographer/videographer?",
    answer: "Yes, we have professional photographers and videographers capturing the day. We'll share a link to the photos after the wedding. Feel free to take your own photos too — just please be present during the ceremony!",
  },
];

export function QA() {
  const { ref, isVisible } = useScrollReveal({ threshold: 0.15 });
  const layout = useSectionLayout();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section
      id="qa"
      ref={ref}
      className="section bg-bg-dark text-text-light"
      style={layout.section}
      aria-labelledby="qa-title"
    >
      <CornerSprig className="pointer-events-none absolute -left-4 bottom-10 h-72 w-52 text-rose/25" />

      <div className="section-header">
        <p className={`section-eyebrow text-rose reveal ${isVisible ? "is-visible" : ""}`}>
          In case you were wondering
        </p>
        <FloralDivider className={`mt-3 h-5 w-44 text-rose/55 reveal ${isVisible ? "is-visible" : ""}`} />
        <h2
          id="qa-title"
          className={`section-title mt-4 text-text-light reveal ${isVisible ? "is-visible" : ""}`}
          style={{ transitionDelay: "100ms" }}
        >
          Questions &amp; Answers
        </h2>
      </div>

      <div className="section-inner" style={layout.inner}>
        <div className="grid items-center gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          {/* Framed photo */}
          <div className={`reveal-left ${isVisible ? "is-visible" : ""}`}>
            <div className="photo-frame mx-auto aspect-[4/5] max-w-xs">
              <img src="/images/couple-last.1620" alt="Naya and Josh" />
            </div>
            <p className="mt-5 text-center font-display text-2xl italic text-rose">
              Can&rsquo;t wait to celebrate
            </p>
          </div>

          {/* Accordion */}
          <div className="space-y-3" role="list">
            {faqs.map((faq, index) => (
              <details
                key={index}
                className={`card-dark group overflow-hidden reveal ${isVisible ? "is-visible" : ""}`}
                style={{ transitionDelay: `${Math.min(index, 6) * 50}ms` }}
                open={openIndex === index}
                onToggle={() => toggleFAQ(index)}
              >
                <summary
                  className="flex cursor-pointer list-none items-center justify-between p-6 focus:outline-none focus-visible:ring-2 focus-visible:ring-rose/50"
                  aria-expanded={openIndex === index}
                >
                  <h3 className="pr-10 font-display text-lg font-medium text-text-light md:text-xl">
                    {faq.question}
                  </h3>
                  <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center text-rose transition-transform duration-300 group-open:rotate-180">
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </span>
                </summary>
                <div className="animate-scale-in px-6 pb-6 leading-relaxed text-text-light/70">
                  {faq.answer}
                </div>
              </details>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}