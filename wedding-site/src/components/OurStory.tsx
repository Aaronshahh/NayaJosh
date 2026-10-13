"use client";

import Image, { type StaticImageData } from "next/image";
import { useState, type KeyboardEvent } from "react";
import { AnimatePresence, motion, useReducedMotion, type PanInfo } from "framer-motion";
import { FloralDivider } from "./Florals";
import { EASE, SceneFrame } from "./ui/motion-primitives";
import { useScrollReveal, useSectionLayout } from "./hooks";

import nayaKid from "../../public/images/story-slides/naya-kid.jpg";
import joshKid from "../../public/images/story-slides/josh-kid.jpg";
import joshGolf from "../../public/images/story-slides/josh-golf.jpg";
import nayaBirthday from "../../public/images/story-slides/naya-birthday.jpg";
import christmasMarket from "../../public/images/story-slides/christmas-market.jpg";
import christmasTradition from "../../public/images/story-slides/christmas-tradition.jpg";
import christmasTree from "../../public/images/story-slides/christmas-tree.jpg";
import meetingFamilies from "../../public/images/story-slides/meeting-families.jpg";
import harbourfront from "../../public/images/story-slides/harbourfront.jpg";
import familiesTogether from "../../public/images/story-slides/families-together.jpg";
import nayaGrad from "../../public/images/story-slides/naya-grad.jpg";
import joshGrad from "../../public/images/story-slides/josh-grad.jpg";
import hazel from "../../public/images/story-slides/hazel.jpg";
import riverside from "../../public/images/story-slides/riverside.jpg";
import kayak from "../../public/images/story-slides/kayak.jpg";
import monkeys from "../../public/images/story-slides/monkeys.jpg";
import boardgames from "../../public/images/story-slides/boardgames.jpg";
import restaurant from "../../public/images/story-slides/restaurant.jpg";
import sunsetGrill from "../../public/images/story-slides/sunset-grill.jpg";
import engagement from "../../public/images/story-slides/engagement.jpg";
import wineCellar from "../../public/images/story-slides/wine-cellar.jpg";
import hazelVideoPoster from "../../public/images/story-slides/hazel-video-poster.jpg";

type SlidePhoto = {
  src: StaticImageData;
  alt: string;
};

type SlideVideo = {
  src: string;
  poster: StaticImageData;
  width: number;
  height: number;
  label: string;
};

type Slide = {
  id: string;
  kicker: string;
  /** Narration — every line is set in the same display face at the same scale. */
  caption: string[];
  /** Sneaky parenthetical, set smaller in muted italic. */
  aside?: string;
  featured?: string;
  /**
   * spread — photo beside the narration like an open book (portrait & landscape prints);
   * stacked — photo(s) above the narration (wide collages and the side-by-side pair).
   */
  layout: "spread" | "stacked";
  /** Long caption — shrinks the mobile print so the words keep room. */
  dense?: boolean;
  /** Width cap for stacked frames (collages); pairs are sized by the template. */
  frameMaxWidth?: string;
  photos: SlidePhoto[];
  /** A moving print — takes the photo's place in the spread. */
  video?: SlideVideo;
};

const slides: Slide[] = [
  {
    id: "the-beginning",
    kicker: "The beginning",
    caption: ["These kids are getting married!"],
    layout: "stacked",
    photos: [
      { src: nayaKid, alt: "Naya as a little girl at home" },
      { src: joshKid, alt: "Josh as a boy on a boat, hugging a curly brown dog" },
    ],
  },
  {
    id: "meet-josh",
    kicker: "Meet Joshua",
    caption: [
      "Born in Ottawa, Ontario, to Chantal and David Parent, Joshua grew up in the small town of Almonte, surrounded by family and friends. He is grateful for the love and support of those closest to him and is excited to begin this next chapter with Naya, bringing their families together as they build a future filled with love and happiness.",
    ],
    featured: "David (Father), Joshua, and David (Grandfather)",
    layout: "spread",
    dense: true,
    photos: [{ src: joshGolf, alt: "Josh golfing with his father David and his grandfather David" }],
  },
  {
    id: "meet-naya",
    kicker: "Meet Naya",
    caption: [
      "Born in Nepal to Swati and Rajiv Shah, Naya grew up travelling throughout the United States and Canada before her family eventually settled in Kitchener, Ontario. Over the years, she has built meaningful relationships that have shaped who she is today, and she looks forward to celebrating this special day with the people who have been part of her story so far.",
    ],
    featured: "Sushila (Dadi), Naya, and Rameshwar (Dada)",
    layout: "spread",
    dense: true,
    photos: [
      { src: nayaBirthday, alt: "Baby Naya held by her grandparents Sushila and Rameshwar at a birthday party" },
    ],
  },
  {
    id: "how-they-met",
    kicker: "How they met",
    caption: [
      "They met in 2021 while they were both in university in Ottawa. Josh was pursuing Mechanical Engineering at Carleton University, while Naya was studying Statistics at the University of Ottawa.",
      "Despite the school rivalry, they hit it off. Their first date was at the Ottawa Christmas Market.",
    ],
    layout: "spread",
    dense: true,
    photos: [
      { src: christmasMarket, alt: "Naya and Josh framed by a lit wreath at the Ottawa Christmas Market" },
    ],
  },
  {
    id: "a-tradition",
    kicker: "A tradition",
    caption: ["And they’ve made it a tradition to go back every year since."],
    layout: "stacked",
    photos: [
      { src: christmasTradition, alt: "Four photos of Naya and Josh at the Ottawa Christmas Market across the years" },
    ],
  },
  {
    id: "growing-together",
    kicker: "Growing together",
    caption: ["They quickly became a big part of each other’s lives."],
    layout: "spread",
    photos: [{ src: christmasTree, alt: "Naya and Josh embracing in front of a Christmas tree" }],
  },
  {
    id: "meeting-families",
    kicker: "Family",
    caption: ["Meeting each other’s families."],
    featured: "Chantal (Mother), Joshua, Sarah (Sister), and Naya",
    layout: "spread",
    photos: [{ src: meetingFamilies, alt: "Joshua with his mother Chantal, his sister Sarah, and Naya" }],
  },
  {
    id: "for-scale",
    kicker: "Family",
    caption: ["Naya’s parents, Swati and Rajiv, for scale."],
    layout: "spread",
    photos: [{ src: harbourfront, alt: "Naya’s parents Swati and Rajiv standing by the harbourfront" }],
  },
  {
    id: "families-together",
    kicker: "Family",
    caption: ["And eventually, bringing their families together."],
    featured: "Rameshwar (Dada), David (Father), Megan (Step-Mother), Naya, Joshua, Swati (Mother)",
    layout: "spread",
    photos: [{ src: familiesTogether, alt: "Both families gathered together in the living room" }],
  },
  {
    id: "degrees",
    kicker: "A new chapter",
    caption: ["After completing their degrees…"],
    featured: "Swati (Mother), Naya, Aaron (Brother)",
    layout: "spread",
    photos: [{ src: nayaGrad, alt: "Naya in her graduation gown at the University of Ottawa" }],
  },
  {
    id: "they-decided",
    kicker: "A new chapter",
    caption: ["…they decided to…"],
    layout: "spread",
    photos: [{ src: joshGrad, alt: "Josh in his graduation gown at Carleton University" }],
  },
  {
    id: "hazel",
    kicker: "Hazel",
    caption: ["…adopt a beautiful little baby girl named Hazel."],
    layout: "spread",
    photos: [{ src: hazel, alt: "Naya and Josh holding Hazel, their grey tabby cat" }],
  },
  {
    id: "well-behaved",
    kicker: "Hazel",
    caption: [],
    aside: "(Who is always so well behaved.)",
    layout: "spread",
    photos: [],
    video: {
      src: "/videos/hazel.mp4",
      poster: hazelVideoPoster,
      width: 720,
      height: 1280,
      label: "Hazel the cat perched among the ornaments inside the Christmas tree",
    },
  },
  {
    id: "a-love-for",
    kicker: "The little things",
    caption: ["Over the years they’ve grown a love for…"],
    layout: "spread",
    photos: [{ src: riverside, alt: "Naya and Josh on a riverside deck" }],
  },
  {
    id: "the-outdoors",
    kicker: "The little things",
    caption: ["…the outdoors,"],
    layout: "spread",
    photos: [{ src: kayak, alt: "Kayaking together on a quiet lake" }],
  },
  {
    id: "traveling",
    kicker: "The little things",
    caption: ["…traveling,"],
    layout: "spread",
    photos: [{ src: monkeys, alt: "Naya and Josh with squirrel monkeys perched on them" }],
  },
  {
    id: "boardgames",
    kicker: "The little things",
    caption: [
      "…and boardgames: where Josh plays to win, Naya plays by her own rules, and Hazel finds things to steal and chew.",
    ],
    layout: "spread",
    dense: true,
    photos: [{ src: boardgames, alt: "Hazel the cat inspecting a Scrabble board that spells MEOW" }],
  },
  {
    id: "new-places-to-eat",
    kicker: "The little things",
    caption: ["And of course, trying new places to eat!"],
    layout: "spread",
    photos: [{ src: restaurant, alt: "Naya and Josh out for dinner at a restaurant" }],
  },
  {
    id: "sunset-grill",
    kicker: "The little things",
    caption: ["Their favourite date spot is breakfast at Sunset Grill."],
    layout: "stacked",
    frameMaxWidth: "max-w-[32rem] lg:max-w-[40rem]",
    photos: [{ src: sunsetGrill, alt: "Naya and Josh each holding a Sunset Grill mug at breakfast" }],
  },
  {
    id: "the-proposal",
    kicker: "The proposal",
    caption: ["They got engaged in July 2025 in Elora, Ontario, with family there to celebrate."],
    layout: "spread",
    photos: [{ src: engagement, alt: "Celebrating the engagement with family in Elora, champagne in hand" }],
  },
  {
    id: "see-you-in-june",
    kicker: "See you soon",
    caption: ["And now, they can’t wait to celebrate with all of you in June!"],
    layout: "spread",
    photos: [{ src: wineCellar, alt: "Naya showing her engagement ring beside Josh in a wine cellar" }],
  },
];

/** Matted print, per the sitewide pattern: mat on the figure, exact native
    ratio on the inset so nothing is ever cropped or letterboxed. */
function Print({
  photo,
  className = "",
  sizes,
}: {
  photo: SlidePhoto;
  className?: string;
  sizes: string;
}) {
  return (
    <figure className={`photo-frame bg-bg ${className}`}>
      <div
        className="relative overflow-hidden rounded-[2px]"
        style={{ aspectRatio: `${photo.src.width} / ${photo.src.height}` }}
      >
        <Image
          src={photo.src}
          alt={photo.alt}
          fill
          placeholder="blur"
          sizes={sizes}
          className="object-cover"
          draggable={false}
        />
      </div>
    </figure>
  );
}

/** The video slide, matted exactly like a print. Autoplays muted on a loop;
    with reduced motion it waits politely behind controls instead. */
function VideoPrint({ video, className = "" }: { video: SlideVideo; className?: string }) {
  const reduceMotion = useReducedMotion();

  return (
    <figure className={`photo-frame bg-bg ${className}`}>
      <div
        className="relative overflow-hidden rounded-[2px]"
        style={{ aspectRatio: `${video.width} / ${video.height}` }}
      >
        <video
          src={video.src}
          poster={video.poster.src}
          muted
          loop
          playsInline
          autoPlay={!reduceMotion}
          controls={reduceMotion ?? false}
          aria-label={video.label}
          className="absolute inset-0 h-full w-full object-cover"
        />
      </div>
    </figure>
  );
}

function Caption({ slide, align }: { slide: Slide; align: "center" | "spread" }) {
  const alignment =
    align === "spread" ? "items-center text-center md:items-start md:text-left" : "items-center text-center";

  return (
    <div className={`flex min-h-0 flex-col overflow-y-auto ${alignment}`}>
      <p className="text-[0.62rem] font-semibold uppercase tracking-[0.24em] text-rose-deep">
        {slide.kicker}
      </p>
      <div className="mt-3 max-w-xl space-y-3">
        {slide.caption.map((line) => (
          <p
            key={line}
            className="font-display text-base leading-relaxed text-text sm:text-lg sm:leading-relaxed lg:text-[1.75rem] lg:leading-[1.4]"
          >
            {line}
          </p>
        ))}
        {slide.aside && (
          <p className="font-display text-base italic text-text-muted sm:text-lg lg:text-xl">
            {slide.aside}
          </p>
        )}
      </div>
      {slide.featured && (
        <p
          className={`mt-5 max-w-xl border-t border-rose/25 pt-4 text-[0.65rem] font-medium uppercase tracking-[0.16em] leading-5 text-text-muted ${
            align === "spread" ? "w-full" : ""
          }`}
        >
          Featured: {slide.featured}
        </p>
      )}
    </div>
  );
}

function StoryPage({ slide, index }: { slide: Slide; index: number }) {
  const tilt = index % 2 === 0 ? "md:-rotate-1" : "md:rotate-1";

  if (slide.layout === "spread") {
    const media = slide.video ?? slide.photos[0].src;
    const ratio = media.width / media.height;
    const portrait = media.height >= media.width;
    // Column width tracks the print's orientation so the mat fills it edge to edge.
    const grid = portrait
      ? "md:grid-cols-[19rem_minmax(0,1fr)] lg:grid-cols-[24rem_minmax(0,1fr)]"
      : "md:grid-cols-[23rem_minmax(0,1fr)] lg:grid-cols-[30rem_minmax(0,1fr)]";
    // On small screens the print caps out below the fold so the words keep room.
    const mobileWidth =
      slide.dense || ratio < 0.6
        ? "max-w-[10rem] sm:max-w-[11rem]"
        : portrait
          ? "max-w-[14rem] sm:max-w-[15rem]"
          : "max-w-[18rem] sm:max-w-[20rem]";
    // The narrowest prints would outgrow the page height at full column width;
    // the 9:16 video needs the tightest cap of all.
    const tallCap =
      ratio < 0.6
        ? "md:max-w-[14rem] lg:max-w-[17rem]"
        : ratio < 0.7
          ? "md:max-w-[17rem] lg:max-w-[22rem]"
          : "md:max-w-none";

    return (
      <div
        className={`flex h-full flex-col justify-center gap-6 md:grid md:items-center md:gap-9 lg:gap-12 ${grid}`}
        role="group"
        aria-roledescription="slide"
        aria-label={`Page ${index + 1} of ${slides.length}`}
      >
        <div className="flex shrink-0 items-center justify-center">
          {slide.video ? (
            <VideoPrint video={slide.video} className={`w-full ${mobileWidth} ${tallCap} ${tilt}`} />
          ) : (
            <Print
              photo={slide.photos[0]}
              className={`w-full ${mobileWidth} ${tallCap} ${tilt}`}
              sizes={
                portrait
                  ? "(max-width: 768px) 15rem, (max-width: 1024px) 19rem, 24rem"
                  : "(max-width: 768px) 20rem, (max-width: 1024px) 23rem, 30rem"
              }
            />
          )}
        </div>
        <Caption slide={slide} align="spread" />
      </div>
    );
  }

  const isPair = slide.photos.length > 1;

  return (
    <div
      className="flex h-full flex-col justify-center gap-7"
      role="group"
      aria-roledescription="slide"
      aria-label={`Page ${index + 1} of ${slides.length}`}
    >
      <div className="flex shrink-0 items-center justify-center gap-4 sm:gap-6">
        {slide.photos.map((photo, photoIndex) => (
          <Print
            key={photo.alt}
            photo={photo}
            className={
              isPair
                ? `w-[46%] max-w-[16rem] lg:max-w-[19rem] ${photoIndex % 2 === 0 ? "md:-rotate-1" : "md:rotate-1"}`
                : `w-full ${slide.frameMaxWidth ?? ""}`
            }
            sizes={isPair ? "(max-width: 768px) 40vw, 19rem" : "(max-width: 768px) 90vw, 56rem"}
          />
        ))}
      </div>
      <Caption slide={slide} align="center" />
    </div>
  );
}

function PageArrow({
  direction,
  onClick,
  disabled,
}: {
  direction: -1 | 1;
  onClick: () => void;
  disabled: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={direction === -1 ? "Previous page" : "Next page"}
      className="flex h-11 w-11 flex-none items-center justify-center rounded-full border border-rose/40 text-rose-deep transition-colors duration-300 ease-out hover:enabled:bg-rose hover:enabled:text-text-light disabled:opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-rose"
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
        className="h-4 w-4"
      >
        {direction === -1 ? <path d="M14.5 6 8.5 12l6 6" /> : <path d="M9.5 6l6 6-6 6" />}
      </svg>
    </button>
  );
}

const pageVariants = {
  enter: (direction: number) => ({ x: direction >= 0 ? 56 : -56, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (direction: number) => ({ x: direction >= 0 ? -56 : 56, opacity: 0 }),
};

export function OurStory() {
  const { ref, isVisible } = useScrollReveal({ threshold: 0.08, triggerOnce: true });
  const layout = useSectionLayout();
  const reduceMotion = useReducedMotion();
  const [[page, direction], setPage] = useState<[number, number]>([0, 0]);

  const slide = slides[page];

  const paginate = (dir: number) => {
    setPage(([current]) => {
      const next = Math.min(slides.length - 1, Math.max(0, current + dir));
      return next === current ? [current, direction] : [next, dir];
    });
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      paginate(-1);
    } else if (event.key === "ArrowRight") {
      event.preventDefault();
      paginate(1);
    }
  };

  const handleDragEnd = (_: unknown, info: PanInfo) => {
    if (info.offset.x < -80 || info.velocity.x < -500) paginate(1);
    else if (info.offset.x > 80 || info.velocity.x > 500) paginate(-1);
  };

  return (
    <section
      id="our-story"
      ref={ref}
      className="section bg-bg"
      style={layout.section}
      aria-labelledby="our-story-title"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(192,153,154,0.18),transparent_42%)]" />

      <SceneFrame>
        <div className="section-header">
          <p className={`section-eyebrow text-rose-deep reveal ${isVisible ? "is-visible" : ""}`}>
            Once upon a time
          </p>
          <FloralDivider draw="scroll" className="mt-3 h-7 w-52 text-rose/60" />
          <h2
            id="our-story-title"
            className={`section-title mt-4 text-text reveal ${isVisible ? "is-visible" : ""}`}
            style={{ transitionDelay: "100ms" }}
          >
            Our Story
          </h2>
          <p
            className={`section-subtitle text-text-muted reveal ${isVisible ? "is-visible" : ""}`}
            style={{ transitionDelay: "200ms" }}
          >
            The whole tale, page by page &mdash; flip through at your own pace.
          </p>
        </div>

        <div className="section-inner" style={layout.inner}>
          <div
            className={`mx-auto flex w-full max-w-5xl justify-center reveal-scale ${
              isVisible ? "is-visible" : ""
            }`}
            style={{ transitionDelay: "280ms" }}
          >
            <div
              role="region"
              aria-roledescription="carousel"
              aria-label="Our story, told page by page"
              onKeyDown={handleKeyDown}
              className="card-light w-full px-5 pb-5 pt-6 sm:px-8 sm:pb-6 sm:pt-7 md:px-10 md:pt-8 lg:px-14 lg:pt-10"
            >
              {/* The album page — fixed height so the book never jumps between pages */}
              <div
                aria-live="polite"
                className="relative h-[32rem] touch-pan-y overflow-hidden sm:h-[30rem] md:h-[28rem] lg:h-[35rem]"
              >
                <AnimatePresence initial={false} custom={direction} mode="popLayout">
                  <motion.div
                    key={slide.id}
                    custom={direction}
                    variants={pageVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={reduceMotion ? { duration: 0 } : { duration: 0.55, ease: EASE }}
                    drag="x"
                    dragConstraints={{ left: 0, right: 0 }}
                    dragElastic={0.14}
                    onDragEnd={handleDragEnd}
                    className="absolute inset-0 cursor-grab active:cursor-grabbing"
                  >
                    <StoryPage slide={slide} index={page} />
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Page rail: turn back, progress, turn forward */}
              <div className="mt-5 flex items-center justify-between gap-5 border-t border-rose/25 pt-5 sm:gap-8">
                <PageArrow direction={-1} onClick={() => paginate(-1)} disabled={page === 0} />
                <div className="flex min-w-0 flex-1 flex-col items-center gap-2.5">
                  <div className="relative h-px w-full max-w-[14rem] bg-rose/20 lg:max-w-[20rem]" aria-hidden="true">
                    <motion.span
                      className="absolute inset-0 block origin-left bg-rose-deep"
                      initial={false}
                      animate={{ scaleX: (page + 1) / slides.length }}
                      transition={reduceMotion ? { duration: 0 } : { duration: 0.5, ease: EASE }}
                    />
                  </div>
                  <span className="text-[0.62rem] font-semibold uppercase tracking-[0.2em] text-text-muted tabular-nums">
                    Page {page + 1} of {slides.length}
                  </span>
                </div>
                <PageArrow
                  direction={1}
                  onClick={() => paginate(1)}
                  disabled={page === slides.length - 1}
                />
              </div>
            </div>
          </div>
        </div>
      </SceneFrame>
    </section>
  );
}
