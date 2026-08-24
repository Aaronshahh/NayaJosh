"use client";

import { useEffect, useRef, useState } from "react";
import { animate, motion, useMotionValue, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";

export type CarouselItem = {
  id: number;
  url: string;
  title: string;
};

const galleryItems: CarouselItem[] = [
  {
    id: 1,
    url: "/images/our-story/christmas-tree.png",
    title: "Christmas at home",
  },
  {
    id: 2,
    url: "/images/our-story/holiday-wreath.png",
    title: "A winter evening together",
  },
  {
    id: 3,
    url: "/images/our-story/christmas-laughter.png",
    title: "The laughter in between",
  },
  {
    id: 4,
    url: "/images/our-story/riverside.png",
    title: "An autumn escape",
  },
];

const FULL_WIDTH_PX = 120;
const COLLAPSED_WIDTH_PX = 44;
const GAP_PX = 4;
const MARGIN_PX = 2;

type ThumbnailsProps = {
  items: CarouselItem[];
  index: number;
  setIndex: (index: number) => void;
};

function Thumbnails({ items, index, setIndex }: ThumbnailsProps) {
  const thumbnailsRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const container = thumbnailsRef.current;
    if (!container) return;

    const scrollPosition =
      index * (COLLAPSED_WIDTH_PX + GAP_PX) +
      MARGIN_PX -
      (container.offsetWidth / 2 - FULL_WIDTH_PX / 2);

    container.scrollTo({
      left: scrollPosition,
      behavior: shouldReduceMotion ? "auto" : "smooth",
    });
  }, [index, shouldReduceMotion]);

  return (
    <div
      ref={thumbnailsRef}
      className="scrollbar-hide overflow-x-auto py-1"
      aria-label="Choose a photo"
    >
      <div className="flex h-20 gap-1 pb-2" style={{ width: "fit-content" }}>
        {items.map((item, itemIndex) => (
          <motion.button
            key={item.id}
            type="button"
            onClick={() => setIndex(itemIndex)}
            aria-label={`Show photo ${itemIndex + 1}: ${item.title}`}
            aria-current={itemIndex === index ? "true" : undefined}
            initial={false}
            animate={itemIndex === index ? "active" : "inactive"}
            variants={{
              active: {
                width: FULL_WIDTH_PX,
                marginLeft: MARGIN_PX,
                marginRight: MARGIN_PX,
              },
              inactive: {
                width: COLLAPSED_WIDTH_PX,
                marginLeft: 0,
                marginRight: 0,
              },
            }}
            transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.3, ease: "easeOut" }}
            className="relative h-full shrink-0 overflow-hidden rounded-md opacity-60 outline-none ring-rose transition-[opacity,box-shadow] hover:opacity-100 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-bg-alt aria-current:opacity-100 aria-current:shadow-[0_8px_24px_-10px_rgba(58,46,52,0.8)]"
          >
            <Image
              src={item.url}
              alt=""
              fill
              sizes={itemIndex === index ? "120px" : "44px"}
              className="select-none object-cover pointer-events-none"
              draggable={false}
            />
          </motion.button>
        ))}
      </div>
    </div>
  );
}

type ThumbnailCarouselProps = {
  items?: CarouselItem[];
};

export default function ThumbnailCarousel({ items = galleryItems }: ThumbnailCarouselProps) {
  const [index, setIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const x = useMotionValue(0);

  useEffect(() => {
    if (isDragging || !containerRef.current) return;

    const targetX = -index * (containerRef.current.offsetWidth || 1);
    const controls = animate(
      x,
      targetX,
      shouldReduceMotion
        ? { duration: 0 }
        : { type: "spring", stiffness: 300, damping: 30 },
    );

    return () => controls.stop();
  }, [index, x, isDragging, shouldReduceMotion]);

  const showPrevious = () => setIndex((current) => Math.max(0, current - 1));
  const showNext = () => setIndex((current) => Math.min(items.length - 1, current + 1));

  return (
    <div
      className="mx-auto w-full max-w-[32rem]"
      onKeyDown={(event) => {
        if (event.key === "ArrowLeft") showPrevious();
        if (event.key === "ArrowRight") showNext();
      }}
    >
      <div className="flex flex-col gap-3">
        <div
          ref={containerRef}
          className="relative overflow-hidden rounded-[24px] bg-bg-dark shadow-[0_28px_70px_-32px_rgba(58,46,52,0.78)] ring-1 ring-rose/25"
          aria-roledescription="carousel"
          aria-label="Naya and Josh's photo gallery"
        >
          <motion.div
            className="flex cursor-grab touch-pan-y active:cursor-grabbing"
            drag={shouldReduceMotion ? false : "x"}
            dragElastic={0.2}
            dragMomentum={false}
            onDragStart={() => setIsDragging(true)}
            onDragEnd={(_, info) => {
              setIsDragging(false);
              const containerWidth = containerRef.current?.offsetWidth || 1;
              const shouldAdvance =
                Math.abs(info.velocity.x) > 500 ||
                Math.abs(info.offset.x) > containerWidth * 0.3;

              if (!shouldAdvance) {
                animate(x, -index * containerWidth, {
                  type: "spring",
                  stiffness: 300,
                  damping: 30,
                });
                return;
              }

              const nextIndex = info.offset.x > 0 ? index - 1 : index + 1;
              setIndex(Math.max(0, Math.min(items.length - 1, nextIndex)));
            }}
            style={{ x }}
          >
            {items.map((item) => (
              <figure key={item.id} className="relative aspect-[749/999] w-full shrink-0">
                <Image
                  src={item.url}
                  alt={item.title}
                  fill
                  sizes="(max-width: 576px) 100vw, 512px"
                  className="select-none object-contain pointer-events-none"
                  draggable={false}
                />
                <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-bg-dark/90 via-bg-dark/45 to-transparent px-6 pb-6 pt-20 text-center font-display text-2xl italic text-text-light md:text-3xl">
                  {item.title}
                </figcaption>
              </figure>
            ))}
          </motion.div>

          <button
            type="button"
            disabled={index === 0}
            onClick={showPrevious}
            aria-label="Previous photo"
            className="absolute left-3 top-1/2 z-10 flex size-10 -translate-y-1/2 items-center justify-center rounded-full bg-bg/85 text-text shadow-lg backdrop-blur-sm transition-[transform,opacity,background-color] hover:scale-110 hover:bg-bg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose disabled:cursor-not-allowed disabled:opacity-30 md:left-4"
          >
            <ChevronLeft className="size-5" aria-hidden="true" />
          </button>

          <button
            type="button"
            disabled={index === items.length - 1}
            onClick={showNext}
            aria-label="Next photo"
            className="absolute right-3 top-1/2 z-10 flex size-10 -translate-y-1/2 items-center justify-center rounded-full bg-bg/85 text-text shadow-lg backdrop-blur-sm transition-[transform,opacity,background-color] hover:scale-110 hover:bg-bg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose disabled:cursor-not-allowed disabled:opacity-30 md:right-4"
          >
            <ChevronRight className="size-5" aria-hidden="true" />
          </button>

          <div
            className="absolute right-4 top-4 rounded-full bg-bg-dark/60 px-3 py-1 text-[0.68rem] font-semibold tracking-[0.14em] text-text-light backdrop-blur-sm"
            aria-live="polite"
          >
            {String(index + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}
          </div>
        </div>

        <Thumbnails items={items} index={index} setIndex={setIndex} />
      </div>
    </div>
  );
}
