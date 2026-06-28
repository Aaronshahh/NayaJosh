"use client";

import { useScrollReveal, useSectionLayout } from "./hooks";
import { FloralDivider } from "./Florals";

const travelItems = [
  {
    title: "Where to Stay",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 21V9" />
      </svg>
    ),
    items: [
      { name: "The Langham Chicago", desc: "Luxury hotel with river views, 10 min from venue" },
      { name: "Hotel Indigo Chicago Downtown", desc: "Boutique hotel, walking distance to venue" },
      { name: "Airbnb / VRBO Options", desc: "Many rentals available in Lincoln Park & Gold Coast" },
    ],
  },
  {
    title: "Things to Do",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
      </svg>
    ),
    items: [
      { name: "Millennium Park & Cloud Gate", desc: "Iconic bean sculpture, gardens, and outdoor art" },
      { name: "Art Institute of Chicago", desc: "World-class museum, 15 min from venue" },
      { name: "Riverwalk & Architecture Tour", desc: "Scenic boat tour of Chicago's famous architecture" },
      { name: "Lincoln Park Zoo", desc: "Free admission, beautiful grounds" },
      { name: "Magnificent Mile Shopping", desc: "Premier shopping district" },
    ],
  },
  {
    title: "Getting Around",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
      </svg>
    ),
    items: [
      { name: "From O'Hare (ORD)", desc: "Blue Line CTA (~45 min) or taxi/rideshare (~30 min)" },
      { name: "From Midway (MDW)", desc: "Orange Line CTA (~35 min) or taxi/rideshare (~25 min)" },
      { name: "CTA Public Transit", desc: "Red/Brown/Purple Lines serve venue area; Ventra card recommended" },
      { name: "Rideshare", desc: "Uber/Lyft readily available throughout city" },
      { name: "Parking", desc: "Valet available at venue; street parking limited" },
    ],
  },
];

export function Travel() {
  const { ref, isVisible } = useScrollReveal({ threshold: 0.15 });
  const layout = useSectionLayout();

  return (
    <section
      id="travel"
      ref={ref}
      className="section bg-bg-dark text-text-light"
      style={layout.section}
      aria-labelledby="travel-title"
    >
      {/* atmospheric background photo */}
      <div className="absolute inset-0 z-0">
        <img src="/images/scene.avif" alt="" className="h-full w-full object-cover opacity-25" />
        <div className="absolute inset-0 bg-gradient-to-b from-bg-dark via-bg-dark/85 to-bg-dark" />
      </div>

      <div className="section-header">
        <p className={`section-eyebrow text-rose reveal ${isVisible ? "is-visible" : ""}`}>
          Come stay a while
        </p>
        <FloralDivider className={`mt-3 h-5 w-44 text-rose/55 reveal ${isVisible ? "is-visible" : ""}`} />
        <h2
          id="travel-title"
          className={`section-title mt-4 text-text-light reveal ${isVisible ? "is-visible" : ""}`}
          style={{ transitionDelay: "100ms" }}
        >
          Travel &amp; Stay
        </h2>
        <p
          className={`section-subtitle text-text-light/65 reveal ${isVisible ? "is-visible" : ""}`}
          style={{ transitionDelay: "200ms" }}
        >
          Everything you need for a smooth weekend in Chicago.
        </p>
      </div>

      <div className="section-inner" style={layout.inner}>
        <div className="grid gap-6 md:grid-cols-3 lg:gap-8">
          {travelItems.map((category, catIndex) => (
            <article
              key={category.title}
              className={`card-dark p-8 backdrop-blur-sm reveal ${isVisible ? "is-visible" : ""}`}
              style={{ transitionDelay: `${catIndex * 120}ms` }}
            >
              <div className="mb-7 flex items-center gap-4">
                <div className="rounded-full border border-rose/30 bg-rose/10 p-3 text-rose">{category.icon}</div>
                <h3 className="font-display text-xl font-medium tracking-tight text-text-light md:text-2xl">{category.title}</h3>
              </div>

              <ul className="space-y-5" role="list">
                {category.items.map((item) => (
                  <li
                    key={item.name}
                    className="group border-l border-rose/25 pl-4 transition-colors duration-200 hover:border-rose"
                  >
                    <h4 className="font-medium text-text-light transition-colors duration-200 group-hover:text-rose">
                      {item.name}
                    </h4>
                    <p className="mt-1 text-sm leading-relaxed text-text-light/55">{item.desc}</p>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}