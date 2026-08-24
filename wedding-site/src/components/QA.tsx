"use client";

import { useScrollReveal, useSectionLayout } from "./hooks";
import { FloralDivider } from "./Florals";

const faqCategories = [
  {
    id: "before-the-wedding",
    title: "Before the Wedding",
    questions: [
      {
        question: "How do I RSVP?",
        answer: [
          "To RSVP, enter one of the names listed on your invitation into the RSVP search bar on our website and select the option that matches your party.",
          "Please let us know which celebration(s) each member of your party will be attending. We truly appreciate it and can't wait to celebrate with you!",
        ],
      },
      {
        question: "When is the RSVP deadline?",
        answer: ["Please RSVP by February 1, 2027."],
      },
      {
        question: "Can I bring a guest?",
        answer: [
          "Please refer to the RSVP section of our website to see whether a guest has been included with your invitation. To help us accommodate everyone comfortably, we kindly ask that only the guests named on the invitation attend.",
        ],
      },
      {
        question: "Are children invited?",
        answer: [
          "We're delighted to celebrate with the little ones included on your invitation! Due to venue capacity, we kindly ask that only the guests listed on the invitation attend.",
        ],
      },
      {
        question: "What should I wear?",
        answer: [
          "Please refer to our Schedule page for attire recommendations for each celebration.",
          "We don't want anyone to feel they need to purchase traditional Indian clothing just for our wedding. You're more than welcome to wear what you would normally choose for a formal wedding celebration.",
          "Indian weddings are a celebration of colour, joy, and togetherness, so we encourage bright, festive colours whenever possible. As a small request, we kindly ask that guests avoid wearing all-white or all-black outfits.",
          "For guests wearing Western attire who would like to add a touch of Indian tradition, we'll have traditional jewelry, bindis, and henna available to enjoy. Whether you're excited to try something new or simply want to join in the festive spirit, we hope you'll have fun embracing the experience in whatever way feels comfortable for you!",
        ],
      },
      {
        question: "Is there a gift registry?",
        answer: [
          "Your presence is truly the greatest gift we could ask for. We kindly ask that you do not feel obligated to bring a physical gift.",
          "We've been fortunate to collect many of the things we need over the years. For those who have asked about gifts, a contribution toward our future home fund would be sincerely appreciated. A card box will be available at the reception.",
          "Most importantly, we're simply looking forward to celebrating with you!",
        ],
      },
    ],
  },
  {
    id: "arriving-at-the-venue",
    title: "Arriving at the Venue",
    questions: [
      {
        question: "Is there parking?",
        answer: ["Yes! There is plenty of complimentary parking available on the venue property."],
      },
      {
        question: "What time should I arrive?",
        answer: [
          "We recommend arriving between 2:00 PM and 3:00 PM, unless you've been asked to arrive earlier as part of the bridal party or groom's party.",
        ],
      },
      {
        question: "Where can I leave my coat or belongings?",
        answer: [
          "A designated coat room will be available for our guests. You're welcome to leave coats, shoes, or similar items there if needed. However, we recommend keeping valuables such as phones, wallets, and purses with you, as many guests will be accessing the area throughout the day.",
        ],
      },
      {
        question: "Is the ceremony and reception at the same place?",
        answer: ["Yes, everything will take place at Mississauga Convention Centre."],
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
          "Please feel free to sit wherever you're most comfortable.",
          "We kindly ask guests to be mindful of families with young children and avoid separating children from their parents or guardians. If your little one may need a break during the ceremony, we recommend choosing a seat toward the back so you can step out if needed with minimal disruption.",
        ],
      },
      {
        question: "Can I take photos during the ceremony?",
        answer: [
          "We'd love for you to capture memories throughout the day! During the ceremony, however, we kindly ask that you remain seated, disable your camera flash, and avoid stepping into the aisle or in front of our professional photographer. After the ceremony, feel free to take as many photos as you'd like!",
        ],
      },
      {
        question: "Are there any traditions or things I should know about during the ceremony?",
        answer: [
          "Indian wedding ceremonies are rich in tradition and include many meaningful rituals and moments. We will be joined at the altar by both of our parents, as they play an important role in supporting and blessing our union. The priest will guide everyone throughout the ceremony and let you know if any participation is needed.",
          "Ceremony programs will also be provided with details about the traditions and meaning behind each part of the ceremony.",
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
          "Dinner seating will be assigned, and place cards will help you find your table.",
          "Once dinner is over, we encourage everyone to mingle, visit with family and friends, and enjoy the evening together. If you'd like to move chairs or tables, please ask a member of the venue staff for assistance.",
        ],
      },
      {
        question: "What if I have dietary restrictions?",
        answer: [
          "Our cocktail hour and reception will feature both vegetarian and non-vegetarian buffet options. We've done our best to accommodate any dietary needs we're aware of. If you have additional dietary restrictions, please let us know in advance and we'll do our best to help.",
        ],
      },
      {
        question: "Can I bring my own food or alcohol?",
        answer: [
          "Outside food and alcohol are not permitted by the venue.",
          "We hope everyone enjoys celebrating with us, and simply ask that all guests drink responsibly and respectfully.",
        ],
      },
      {
        question: "What if I don't know many people?",
        answer: [
          "Don't worry! We've carefully planned our seating arrangements to help everyone feel comfortable and seated with familiar faces. We hope you'll also take the opportunity to meet some new friends and family throughout the evening!",
        ],
      },
      {
        question: "What if I need to leave early?",
        answer: [
          "If you know in advance that you'll need to leave before the end of the evening, we'd appreciate it if you could let us know so we can plan accordingly.",
        ],
      },
      {
        question: "Who should I contact on the wedding day if I have a question?",
        answer: [
          "To help us stay focused on enjoying the day, please contact Swati or Rajiv, Sarah Parent at [phone number], or Matt Reid at [phone number] if you have any questions or need assistance on the day of the wedding.",
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
          "Absolutely! We'd love to see the day through your eyes. We'll be sharing a Google Photos album after the wedding where everyone can upload and enjoy photos from throughout the celebrations.",
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
            We&rsquo;ve done our best to answer any questions you may have above, but if there&rsquo;s anything
            we&rsquo;ve missed or you need further clarification, please don&rsquo;t hesitate to reach out! Contact us using any of the following:
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
              <span className="text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-rose">Matt Ried</span>
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
    </section>
  );
}