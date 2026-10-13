"use client";

import { useScrollReveal, useSectionLayout } from "./hooks";
import { FloralDivider } from "./Florals";
import { SceneFrame } from "./ui/motion-primitives";

const faqCategories = [
  {
    id: "before-the-wedding",
    title: "Before the Wedding",
    questions: [
      {
        question: "How do I RSVP?",
        answer: [
          "Enter a name from your invitation into the RSVP search bar and select the option that matches your party. Please RSVP for each member of your party and indicate which celebrations they will attend.",
        ],
      },
      {
        question: "When is the RSVP deadline?",
        answer: ["Please RSVP by February 1, 2027."],
      },
      {
        question: "Can I bring a guest?",
        answer: [
          "Please check the RSVP section to see whether a guest has been included with your invitation. We kindly ask that only guests named on the invitation attend.",
        ],
      },
      {
        question: "Are children invited?",
        answer: [
          "Children included on your invitation are warmly welcome! Due to venue capacity, we kindly ask that only guests listed on the invitation attend.",
        ],
      },
      {
        question: "What should I wear?",
        answer: [
          "Please visit our Schedule page for attire recommendations for each celebration.",
          "You do not need to purchase traditional Indian clothing for our wedding. Western formalwear is absolutely welcome! We encourage bright, festive colours and kindly ask that guests avoid all-black, all-white, or black-and-white outfits.",
          "For those who would like to add a touch of Indian tradition, traditional jewelry, bindis, and henna will be available to enjoy.",
        ],
      },
      {
        question: "Is there a gift registry?",
        answer: [
          "Your presence is truly the greatest gift. We kindly ask that you do not feel obligated to bring a physical gift.",
          "For those who wish to give, a contribution toward our future home fund would be sincerely appreciated. A card box will be available at the reception.",
        ],
      },
      {
        question: "Is the ceremony and reception at the same place?",
        answer: ["Yes! All celebrations will take place at the Mississauga Convention Centre."],
      },
    ],
  },
  {
    id: "arriving-at-the-venue",
    title: "Arriving at the Venue",
    questions: [
      {
        question: "What time should I arrive?",
        answer: [
          "We recommend arriving between 2:00 PM and 3:00 PM, unless you have been asked to arrive earlier as part of the bridal or groom's party.",
        ],
      },
      {
        question: "Is there parking?",
        answer: ["Yes! Complimentary parking is available on the venue property."],
      },
      {
        question: "Where can I leave my coat or belongings?",
        answer: [
          "A designated coat room will be available for coats, shoes, and similar items. We recommend keeping valuables such as phones, wallets, and purses with you.",
        ],
      },
    ],
  },
  {
    id: "during-the-ceremony",
    title: "During the Ceremony",
    questions: [
      {
        question: "Will the ceremony be indoors or outdoors?",
        answer: ["The ceremony is planned to take place outdoors, weather permitting."],
      },
      {
        question: "Where should I sit?",
        answer: [
          "Please sit wherever you'd like. We simply ask that families with young children sit together and consider choosing seats toward the back if they may need to step out during the ceremony.",
        ],
      },
      {
        question: "Can I take photos during the ceremony?",
        answer: [
          "Absolutely! We just ask that you remain seated, turn off your flash, and avoid stepping into the aisle or in front of our photographer. After the ceremony, feel free to take as many photos as you'd like.",
        ],
      },
      {
        question: "Are there any traditions or things I should know about?",
        answer: [
          "Indian wedding ceremonies include many meaningful traditions and rituals. Both sets of parents will join us at the altar to support and bless our union, and the priest will guide everyone throughout the ceremony.",
          "Ceremony programs will also be provided with details about the traditions and their meaning.",
        ],
      },
    ],
  },
  {
    id: "reception",
    title: "Reception",
    questions: [
      {
        question: "Where will I sit?",
        answer: [
          "Dinner seating will be assigned, with place cards provided to help you find your table. After dinner, feel free to mingle and visit with family and friends.",
        ],
      },
      {
        question: "What if I have dietary restrictions?",
        answer: [
          "Both vegetarian and non-vegetarian options will be available at cocktail hour and the reception. If you have dietary restrictions that we may not be aware of, please let us know in advance and we'll do our best to accommodate them.",
        ],
      },
      {
        question: "Can I bring my own food or alcohol?",
        answer: [
          "Outside food and alcohol are not permitted by the venue. We simply ask that everyone enjoy the evening responsibly.",
        ],
      },
      {
        question: "What if I don't know many people?",
        answer: [
          "We've arranged seating to help everyone feel comfortable and surrounded by familiar faces. We also hope you'll have the chance to meet some new friends and family along the way!",
        ],
      },
      {
        question: "What if I need to leave early?",
        answer: [
          "If you know in advance that you'll need to leave early, we'd appreciate a heads-up so we can plan accordingly.",
        ],
      },
      {
        question: "Who should I contact on the wedding day if I have a question?",
        answer: [
          "To help us stay focused on enjoying the day, please contact Swati or Rajiv, Sarah Parent at +1 (613) 795-1106, or Matt Reid at +1 (613) 581-2825 with any questions or for assistance.",
        ],
      },
    ],
  },
  {
    id: "photos-and-sharing",
    title: "Photos & Sharing Memories",
    questions: [
      {
        question: "Can I share photos from the wedding?",
        answer: [
          "Absolutely! We'd love to see the day through your eyes. We'll share a Google Photos album after the wedding where everyone can upload and enjoy photos from the celebrations.",
        ],
      },
    ],
  },
];

export function QA() {
  const { ref, isVisible } = useScrollReveal({ threshold: 0.15 });
  const layout = useSectionLayout();
  const stickySidebarHeight = layout.height
    ? `${layout.height - layout.stickyNavTop}px`
    : `calc(100vh - ${layout.stickyNavTop}px)`;

  return (
    <section
      id="qa"
      ref={ref}
      className="section !overflow-visible bg-bg-dark text-text-light"
      style={{ ...layout.section, paddingBottom: layout.blockGap }}
      aria-labelledby="qa-title"
    >
      <SceneFrame>
      <div className="section-header">
        <p className={`section-eyebrow text-rose reveal ${isVisible ? "is-visible" : ""}`}>
          In case you were wondering
        </p>
        <FloralDivider draw="scroll" className="mt-3 h-7 w-52 text-rose/55" />
        <h2
          id="qa-title"
          className={`section-title mt-4 text-text-light reveal ${isVisible ? "is-visible" : ""}`}
          style={{ transitionDelay: "100ms" }}
        >
          Questions &amp; Answers
        </h2>
        <p
          className={`section-subtitle text-text-light/70 reveal ${isVisible ? "is-visible" : ""}`}
          style={{ transitionDelay: "200ms" }}
        >
          We&rsquo;ve done our best to answer any questions you might have below, but if there&rsquo;s
          anything we&rsquo;ve missed or if you need any clarification, please don&rsquo;t hesitate to
          message either of us, email us at{" "}
          <a
            href="mailto:joshandnayaparent@gmail.com"
            className="underline decoration-rose/50 underline-offset-4 transition-colors duration-300 hover:text-rose focus:outline-none focus-visible:ring-2 focus-visible:ring-rose"
          >
            joshandnayaparent@gmail.com
          </a>
          , or contact Swati &amp; Rajiv. We&rsquo;d be happy to help!
        </p>
      </div>

      <div className="section-inner" style={layout.inner}>
        <div className="mx-auto grid max-w-5xl items-start gap-16 lg:grid-cols-[13rem_minmax(0,1fr)] lg:gap-20">
          {/* Persistent bookmark rail on desktop */}
          <nav
            className={`sticky hidden self-start reveal lg:flex lg:flex-col ${isVisible ? "is-visible" : ""}`}
            style={{
              top: layout.stickyNavTop,
              height: stickySidebarHeight,
              paddingTop: Math.round(layout.blockGap * 0.4),
              paddingBottom: Math.round(layout.blockGap * 0.5),
            }}
            aria-label="Questions and answers categories"
          >
            <p className="mb-5 shrink-0 text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-rose">
              Jump to
            </p>
            <div className="flex min-h-0 flex-1 flex-col justify-evenly border-l border-rose/30 py-1">
              {faqCategories.map((category) => (
                <a
                  key={category.id}
                  href={`#${category.id}`}
                  className="group relative block border-b border-white/10 py-2.5 pl-5 font-display text-lg leading-tight text-text-light/60 transition-colors hover:text-text-light focus:outline-none focus-visible:text-text-light focus-visible:ring-2 focus-visible:ring-rose"
                >
                  {category.title}
                  <span
                    className="absolute -left-px top-0 h-full w-px origin-center scale-y-0 bg-rose transition-transform group-hover:scale-y-100"
                    aria-hidden="true"
                  />
                </a>
              ))}
            </div>
          </nav>

          <div>
            {faqCategories.map((category, categoryIndex) => (
              <section
                id={category.id}
                key={category.id}
                className={`last:pb-0 reveal ${isVisible ? "is-visible" : ""}`}
                style={{
                  scrollMarginTop: layout.scrollAnchorOffset,
                  paddingBottom: categoryIndex === faqCategories.length - 1 ? 0 : layout.categoryGap,
                  transitionDelay: `${Math.min(categoryIndex, 4) * 70}ms`,
                }}
                aria-labelledby={`${category.id}-title`}
              >
                <div className="mb-12 border-b border-rose/25 pb-6">
                  <p className="mb-2 text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-text-light/40">
                    {String(categoryIndex + 1).padStart(2, "0")}
                  </p>
                  <h3
                    id={`${category.id}-title`}
                    className="font-display text-4xl font-medium leading-none text-rose md:text-5xl"
                  >
                    {category.title}
                  </h3>
                </div>

                <div className="space-y-14 md:space-y-16">
                  {category.questions.map((faq) => (
                    <div key={faq.question} className="group/faq flex gap-8 md:gap-10">
                      <span
                        className="mt-1 w-px flex-shrink-0 self-stretch bg-rose/60 transition-colors group-has-[:open]/faq:bg-rose"
                        aria-hidden="true"
                      />
                      <details className="group min-w-0 flex-1">
                        <summary className="flex cursor-pointer list-none items-start justify-between gap-6 rounded-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-rose focus-visible:ring-offset-4 focus-visible:ring-offset-bg-dark">
                          <h4 className="max-w-2xl font-display text-2xl font-medium leading-snug text-text-light transition-colors group-hover:text-rose md:text-[1.75rem]">
                            {faq.question}
                          </h4>
                          <span className="mt-1 flex h-8 w-8 flex-none items-center justify-center rounded-full border border-rose/40 text-rose transition-transform duration-300 group-open:rotate-45">
                            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
                              <path d="M12 5v14M5 12h14" strokeWidth="1.5" strokeLinecap="round" />
                            </svg>
                          </span>
                        </summary>
                        <div className="mt-6 max-w-2xl space-y-5 pb-2 leading-[1.8] text-text-light/70">
                          {faq.answer.map((paragraph) => (
                            <p key={paragraph}>{paragraph}</p>
                          ))}
                        </div>
                      </details>
                    </div>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </div>
      </div>

      <div
        className={`flex w-full justify-center reveal ${isVisible ? "is-visible" : ""}`}
        style={{
          marginTop: layout.blockGap,
          paddingLeft: layout.gutter,
          paddingRight: layout.gutter,
        }}
      >
        <aside
          className="card-dark w-full"
          style={{
            maxWidth: layout.cardMaxWidth,
            paddingLeft: layout.cardPaddingX,
            paddingRight: layout.cardPaddingX,
            paddingTop: layout.cardPaddingY,
            paddingBottom: layout.cardPaddingY,
          }}
          aria-label="Contact us with additional questions"
        >
          <p className="leading-[1.8] text-text-light/75">
            If there&rsquo;s anything we&rsquo;ve missed or you need any clarification, reach out using any
            of the following:
          </p>

          <ul className="mt-8 space-y-4 border-t border-white/10 pt-8">
            <li className="grid gap-1 sm:grid-cols-[10rem_1fr] sm:gap-6">
              <span className="text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-rose">Naya &amp; Josh</span>
              <span className="text-text-light/75">Send either of us a direct message</span>
            </li>
            <li className="grid gap-1 sm:grid-cols-[10rem_1fr] sm:gap-6">
              <span className="text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-rose">Email</span>
              <a
                href="mailto:joshandnayaparent@gmail.com"
                className="text-text-light/75 transition-colors hover:text-rose focus:outline-none focus-visible:ring-2 focus-visible:ring-rose"
              >
                joshandnayaparent@gmail.com
              </a>
            </li>
            <li className="grid gap-1 sm:grid-cols-[10rem_1fr] sm:gap-6">
              <span className="text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-rose">Swati &amp; Rajiv</span>
              <span className="text-text-light/75">WhatsApp</span>
            </li>
            <li className="grid gap-1 sm:grid-cols-[10rem_1fr] sm:gap-6">
              <span className="text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-rose">Sarah Parent</span>
              <a
                href="tel:+16137951106"
                className="text-text-light/75 transition-colors hover:text-rose focus:outline-none focus-visible:ring-2 focus-visible:ring-rose"
              >
                +1 (613) 795-1106
              </a>
            </li>
            <li className="grid gap-1 sm:grid-cols-[10rem_1fr] sm:gap-6">
              <span className="text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-rose">Matt Reid</span>
              <a
                href="tel:+16135812825"
                className="text-text-light/75 transition-colors hover:text-rose focus:outline-none focus-visible:ring-2 focus-visible:ring-rose"
              >
                +1 (613) 581-2825
              </a>
            </li>
          </ul>

          <p className="mt-[calc(2rem+2px)] border-t border-white/10 pt-[calc(2rem+2px)] leading-[1.8] text-text-light/75">
            We&rsquo;d be happy to help!
          </p>
        </aside>
      </div>
      </SceneFrame>
    </section>
  );
}