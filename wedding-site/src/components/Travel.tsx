"use client";

import { useState, type ReactNode } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { useScrollReveal, useSectionLayout } from "./hooks";
import { FloralDivider } from "./Florals";
import { SectionTabs, TabPanel, Parallax, SceneFrame, EASE } from "./ui/motion-primitives";

type Hotel = {
  key: string;
  name: string;
  blurb: string;
  image: string;
  imageAlt: string;
  stars: number; // guest rating rounded to the nearest star
  ratingNote: string;
  price: 1 | 2 | 3;
  distance: string;
  address: string;
  phone: string;
  phoneHref: string;
  amenities: string[];
  website: string;
};

const hotels: Hotel[] = [
  {
    key: "comfort-inn",
    name: "Comfort Inn Toronto Airport West",
    blurb: "Simple, budget-friendly rooms just around the corner from the venue.",
    image: "/images/travel/comfort-inn.avif",
    imageAlt: "Exterior of the Comfort Inn Toronto Airport West at dusk",
    stars: 4,
    ratingNote: "3.9 / 5 · 1,059 guest reviews",
    price: 1,
    distance: "2 min drive · 0.7 km from the wedding venue",
    address: "31 Topflight Drive, Mississauga, ON L5S 1Y1",
    phone: "(905) 564-5152",
    phoneHref: "tel:+19055645152",
    amenities: ["Free breakfast", "Free Wi-Fi", "Flat-screen TVs", "Kitchen rooms available"],
    website: "https://www.choicehotels.com/en-ca/ontario/mississauga/comfort-inn-hotels/cn900",
  },
  {
    key: "glo-best-western",
    name: "GLō Best Western Toronto Mississauga",
    blurb: "A bright, boutique-style Best Western a short hop from the celebrations.",
    image: "/images/travel/glo-best-western.jpg",
    imageAlt: "King guest room at the GLō Best Western Toronto Mississauga Corporate Centre",
    stars: 4,
    ratingNote: "4.2 / 5 guest rating · AAA 3-star",
    price: 2,
    distance: "2 min drive · 0.6 km from the wedding venue",
    address: "40 Admiral Boulevard, Mississauga, ON L5T 2W1",
    phone: "(905) 795-1011",
    phoneHref: "tel:+19057951011",
    amenities: ["Free hot buffet breakfast", "Free Wi-Fi", "Free parking", "Business centre"],
    website: "https://www.bestwestern.com/en_US/book/hotel-details.66130.html",
  },
  {
    key: "homewood-suites",
    name: "Homewood Suites by Hilton Toronto Mississauga",
    blurb: "Roomy all-suite stays with full kitchens — great for families and longer visits.",
    image: "/images/travel/homewood-suites.jpg",
    imageAlt: "Exterior of the Homewood Suites by Hilton Toronto Mississauga",
    stars: 5,
    ratingNote: "4.6 / 5 · 1,012 reviews on Tripadvisor",
    price: 3,
    distance: "5 min drive · 1.9 km from the wedding venue",
    address: "6430 Edwards Boulevard, Mississauga, ON L5T 2Y3",
    phone: "(905) 564-5529",
    phoneHref: "tel:+19055645529",
    amenities: ["Full kitchen in every suite", "Free hot breakfast", "Free parking", "Indoor pool & gym"],
    website: "https://www.hilton.com/en/hotels/ytohwhw-homewood-suites-toronto-mississauga/",
  },
];

type MapPlace = {
  key: string;
  label: string;
  name: string;
  address: string;
};

const mapPlaces: MapPlace[] = [
  {
    key: "venue",
    label: "Wedding venue",
    name: "Mississauga Convention Centre",
    address: "75 Derry Road West, Mississauga, ON L5W 1G3",
  },
  {
    key: "mehndi",
    label: "Mehndi venue",
    name: "Saffron Cuisine",
    address: "450 Hespeler Road Unit 101, Cambridge, ON N1R 6J6",
  },
  { key: "comfort-inn", label: "Comfort Inn", name: hotels[0].name, address: hotels[0].address },
  { key: "glo", label: "GLō Best Western", name: hotels[1].name, address: hotels[1].address },
  { key: "homewood", label: "Homewood Suites", name: hotels[2].name, address: hotels[2].address },
];

const directionsUrl = (place: { name: string; address: string }) =>
  `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(`${place.name}, ${place.address}`)}`;

const embedUrl = (place: { name: string; address: string }) =>
  `https://www.google.com/maps?q=${encodeURIComponent(`${place.name}, ${place.address}`)}&output=embed`;

type LinkedItem = { name: string; desc: string; href?: string };

type TravelCategory = {
  key: string;
  tabLabel: string;
  shortLabel: string;
  icon: ReactNode;
  items: LinkedItem[];
};

const linkedCategories: TravelCategory[] = [
  {
    key: "do",
    tabLabel: "Things to Do",
    shortLabel: "Do",
    icon: (
      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.6} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
      </svg>
    ),
    items: [
      {
        name: "Square One Shopping Centre",
        desc: "Ontario's largest shopping centre — 360+ shops and restaurants, about 10 minutes away",
        href: "https://shopsquareone.com",
      },
      {
        name: "Celebration Square",
        desc: "Downtown Mississauga's gathering place — fountains, festivals, and summer events",
        href: "https://culture.mississauga.ca/celebration-square",
      },
      {
        name: "Port Credit & the waterfront",
        desc: "Lakeside village charm — patios, ice cream, and the Lake Ontario waterfront trail (~20 min)",
        href: "https://www.portcredit.com",
      },
      {
        name: "Toronto Premium Outlets",
        desc: "Designer outlet shopping in Halton Hills, about 20 minutes west",
        href: "https://www.premiumoutlets.com/outlet/toronto",
      },
      {
        name: "CN Tower & downtown Toronto",
        desc: "Toronto's skyline, museums, and restaurants — about 30 minutes east",
        href: "https://www.cntower.ca",
      },
      {
        name: "Niagara Falls",
        desc: "The falls, the parks, and nearby wineries — well worth the ~1 hour drive",
        href: "https://www.niagaraparks.com",
      },
    ],
  },
  {
    key: "around",
    tabLabel: "Getting Around",
    shortLabel: "Around",
    icon: (
      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.6} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
      </svg>
    ),
    items: [
      {
        name: "Toronto Pearson Airport (YYZ)",
        desc: "Canada's largest airport is the one to fly into — about 15 minutes from the venue and hotels",
        href: "https://www.torontopearson.com",
      },
      {
        name: "Rideshare & taxis",
        desc: "Uber and Lyft are quick and reliable throughout Mississauga and to/from the airport",
      },
      {
        name: "GO Transit",
        desc: "Regional trains and buses connecting Mississauga, Toronto, and the surrounding region",
        href: "https://www.gotransit.com",
      },
      {
        name: "MiWay",
        desc: "Mississauga's local bus network, if you'd rather skip driving around town",
        href: "https://www.mississauga.ca/miway-transit/",
      },
      {
        name: "UP Express",
        desc: "Direct train from Pearson to downtown Toronto in 25 minutes — handy for a city day trip",
        href: "https://www.upexpress.com",
      },
      {
        name: "Venue parking",
        desc: "Complimentary parking is available on-site at the Mississauga Convention Centre",
      },
      {
        name: "Getting to the Mehndi",
        desc: "Saffron Cuisine in Cambridge is about 45 minutes west via Highway 401 — plan to drive or carpool",
      },
    ],
  },
];

const stayTab = {
  key: "stay",
  tabLabel: "Where to Stay",
  shortLabel: "Stay",
  icon: (
    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.6} d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.6} d="M9 21V9" />
    </svg>
  ),
};

const allTabs = [stayTab, ...linkedCategories];

const listVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07, delayChildren: 0.05 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: EASE } },
};

const externalLinkClass =
  "underline decoration-rose/50 underline-offset-4 transition-colors duration-300 hover:text-rose focus:outline-none focus-visible:ring-2 focus-visible:ring-rose";

function ExternalArrow() {
  return (
    <svg className="ml-1 inline h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
      <path d="M7 17L17 7M17 7H8M17 7v9" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function Stars({ count }: { count: number }) {
  return (
    <span className="flex items-center gap-1" role="img" aria-label={`${count} out of 5 stars`}>
      {Array.from({ length: 5 }, (_, i) => (
        <svg
          key={i}
          viewBox="0 0 24 24"
          className={`h-3.5 w-3.5 ${i < count ? "text-rose" : "text-rose/30"}`}
          aria-hidden="true"
        >
          <path
            d="M12 3.5l2.47 5.26 5.53.72-4.06 3.98.99 5.72L12 16.4l-4.93 2.78.99-5.72L4 9.48l5.53-.72z"
            fill={i < count ? "currentColor" : "none"}
            fillOpacity={i < count ? 0.85 : undefined}
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinejoin="round"
          />
        </svg>
      ))}
    </span>
  );
}

const priceWords = ["most affordable", "mid-range", "highest of the three"];

function PriceMarker({ level }: { level: 1 | 2 | 3 }) {
  return (
    <span
      className="font-body text-sm tracking-[0.08em]"
      aria-label={`Relative price: ${priceWords[level - 1]}`}
    >
      <span className="text-text-light/80">{"$".repeat(level)}</span>
      <span className="text-text-light/25">{"$".repeat(3 - level)}</span>
    </span>
  );
}

function HotelCard({ hotel }: { hotel: Hotel }) {
  return (
    <motion.li variants={itemVariants} className="card-dark flex flex-col overflow-hidden">
      <div className="relative aspect-[3/2] overflow-hidden border-b border-white/10">
        <Parallax drift={14} scale={1.12} className="absolute inset-0" innerClassName="h-full w-full">
          <Image
            src={hotel.image}
            alt={hotel.imageAlt}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover"
          />
        </Parallax>
      </div>
      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-center justify-between gap-3">
          <Stars count={hotel.stars} />
          <PriceMarker level={hotel.price} />
        </div>
        <h4 className="mt-3 font-display text-xl font-medium leading-snug text-text-light">
          {hotel.name}
        </h4>
        <p className="mt-1 text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-text-light/45">
          {hotel.ratingNote}
        </p>
        <p className="mt-3 text-sm leading-relaxed text-text-light/70">{hotel.blurb}</p>
        <p className="mt-3 text-sm text-rose">{hotel.distance}</p>
        <p className="mt-4 text-sm leading-relaxed text-text-light/55">{hotel.amenities.join(" · ")}</p>
        <div className="mt-auto pt-6">
          <div className="border-t border-white/10 pt-5">
          <p className="text-sm leading-relaxed text-text-light/55">
            {hotel.address}
            <br />
            <a href={hotel.phoneHref} className={`text-text-light/70 ${externalLinkClass}`}>
              {hotel.phone}
            </a>
          </p>
          <p className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-sm">
            <a
              href={hotel.website}
              target="_blank"
              rel="noopener noreferrer"
              className={`text-text-light/80 ${externalLinkClass}`}
            >
              Hotel website
              <ExternalArrow />
            </a>
            <a
              href={directionsUrl(hotel)}
              target="_blank"
              rel="noopener noreferrer"
              className={`text-text-light/80 ${externalLinkClass}`}
            >
              Directions
              <ExternalArrow />
            </a>
          </p>
          </div>
        </div>
      </div>
    </motion.li>
  );
}

function PlacesMap() {
  const [placeKey, setPlaceKey] = useState(mapPlaces[0].key);
  const place = mapPlaces.find((p) => p.key === placeKey) ?? mapPlaces[0];

  return (
    <div className="mt-12">
      <h4 className="text-center font-display text-2xl font-medium text-text-light">
        Find your way
      </h4>
      <p className="mx-auto mt-2 max-w-xl text-center text-sm leading-relaxed text-text-light/60">
        Both venues and all three hotels sit within a few minutes of each other — pick a place to see
        it on the map.
      </p>
      <div className="mt-6 flex flex-wrap justify-center gap-2" role="group" aria-label="Choose a place to show on the map">
        {mapPlaces.map((p) => (
          <button
            key={p.key}
            type="button"
            onClick={() => setPlaceKey(p.key)}
            aria-pressed={p.key === placeKey}
            className={`min-h-11 rounded-[3px] border px-4 py-2.5 text-[0.65rem] font-semibold uppercase tracking-[0.14em] transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-rose ${
              p.key === placeKey
                ? "border-rose/70 bg-rose/15 text-text-light"
                : "border-white/15 text-text-light/60 hover:border-rose/50 hover:text-text-light"
            }`}
          >
            {p.label}
          </button>
        ))}
      </div>
      <div className="mt-5 overflow-hidden rounded-[3px] border border-white/15 bg-bg-dark-alt">
        <iframe
          key={place.key}
          title={`Map of ${place.name}`}
          src={embedUrl(place)}
          className="block h-[22rem] w-full md:h-[26rem]"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
        />
      </div>
      <div className="mt-4 flex flex-col items-center justify-between gap-2 text-sm sm:flex-row">
        <p className="text-text-light/60">
          {place.name} · {place.address}
        </p>
        <a
          href={directionsUrl(place)}
          target="_blank"
          rel="noopener noreferrer"
          className={`text-text-light/80 ${externalLinkClass}`}
        >
          Get directions
          <ExternalArrow />
        </a>
      </div>
    </div>
  );
}

export function Travel() {
  const { ref, isVisible } = useScrollReveal({ threshold: 0.15 });
  const layout = useSectionLayout();
  const reduceMotion = useReducedMotion();
  const [activeCategory, setActiveCategory] = useState(stayTab.key);

  return (
    <section
      id="travel"
      ref={ref}
      className="section bg-bg-dark text-text-light"
      style={layout.section}
      aria-labelledby="travel-title"
    >
      {/* atmospheric background photo, drifting slower than the scroll */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <Parallax drift={36} scale={1.15} className="absolute inset-0" innerClassName="h-full w-full">
          <img src="/images/scene.avif" alt="" className="h-full w-full object-cover opacity-25" />
        </Parallax>
        <div className="absolute inset-0 bg-gradient-to-b from-bg-dark via-bg-dark/85 to-bg-dark" />
      </div>

      <SceneFrame>
      <div className="section-header">
        <p className={`section-eyebrow text-rose reveal ${isVisible ? "is-visible" : ""}`}>
          Come stay a while
        </p>
        <FloralDivider draw="scroll" className="mt-3 h-7 w-52 text-rose/55" />
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
          Everything you need for a smooth wedding weekend in Mississauga, Ontario.
        </p>
      </div>

      <div className="section-inner" style={layout.inner}>
        <div className="mx-auto w-full max-w-5xl">
          <div
            className={`flex justify-center reveal ${isVisible ? "is-visible" : ""}`}
            style={{ transitionDelay: "280ms" }}
          >
            <SectionTabs
              idBase="travel"
              aria-label="Travel information"
              variant="dark"
              value={activeCategory}
              onChange={setActiveCategory}
              tabs={allTabs.map((category) => ({
                value: category.key,
                label: (
                  <span className="flex items-center justify-center gap-2 text-[0.7rem] font-semibold uppercase tracking-[0.14em]">
                    {category.icon}
                    <span className="hidden sm:inline">{category.tabLabel}</span>
                    <span className="sm:hidden">{category.shortLabel}</span>
                  </span>
                ),
              }))}
            />
          </div>

          <div className={`reveal ${isVisible ? "is-visible" : ""}`} style={{ transitionDelay: "360ms" }}>
            <TabPanel value="stay" activeValue={activeCategory} idBase="travel" className="mt-10">
              <p className="mx-auto max-w-3xl border-l border-rose/50 bg-white/[0.04] py-4 pl-6 pr-5 text-sm leading-relaxed text-text-light/70">
                <span className="font-semibold text-text-light">Booking opens soon.</span> We&rsquo;re
                finalizing group rates with each hotel — the exact discount codes and booking links
                will be posted here shortly. Checkout and booking aren&rsquo;t available quite yet;
                for now, this is a preview of the hotels we&rsquo;ve arranged.
              </p>
              <motion.ul
                role="list"
                variants={listVariants}
                initial={reduceMotion ? false : "hidden"}
                animate="show"
                className="mt-8 grid gap-6 md:grid-cols-3"
              >
                {hotels.map((hotel) => (
                  <HotelCard key={hotel.key} hotel={hotel} />
                ))}
              </motion.ul>
              <PlacesMap />
            </TabPanel>

            {linkedCategories.map((category) => (
              <TabPanel key={category.key} value={category.key} activeValue={activeCategory} idBase="travel" className="mt-10">
                <div className="card-dark mx-auto max-w-4xl p-7 md:p-10">
                  <motion.ul
                    role="list"
                    variants={listVariants}
                    initial={reduceMotion ? false : "hidden"}
                    animate="show"
                    className="grid gap-x-12 gap-y-7 sm:grid-cols-2"
                  >
                    {category.items.map((item) => (
                      <motion.li
                        key={item.name}
                        variants={itemVariants}
                        className="group border-l border-rose/25 pl-5 transition-colors duration-200 hover:border-rose"
                      >
                        <h4 className="font-display text-lg font-medium text-text-light md:text-xl">
                          {item.href ? (
                            <a
                              href={item.href}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="transition-colors duration-200 hover:text-rose focus:outline-none focus-visible:ring-2 focus-visible:ring-rose"
                            >
                              {item.name}
                              <ExternalArrow />
                            </a>
                          ) : (
                            item.name
                          )}
                        </h4>
                        <p className="mt-1 text-sm leading-relaxed text-text-light/55">{item.desc}</p>
                      </motion.li>
                    ))}
                  </motion.ul>
                </div>
              </TabPanel>
            ))}
          </div>
        </div>
      </div>
      </SceneFrame>
    </section>
  );
}
