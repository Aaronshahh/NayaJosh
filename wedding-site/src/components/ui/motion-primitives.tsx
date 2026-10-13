"use client";

import { useRef, type KeyboardEvent, type ReactNode, type RefObject } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

/** The site's single easing curve (design/design-system.md §8). */
export const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export type SectionTab = {
  value: string;
  label: ReactNode;
};

type SectionTabsProps = {
  tabs: SectionTab[];
  value: string;
  onChange: (value: string) => void;
  /** Prefix for tab/panel ids so aria wiring stays unique per section. */
  idBase: string;
  "aria-label": string;
  variant?: "light" | "dark";
  className?: string;
};

/**
 * Tab switcher with a sliding rose highlight behind the active trigger
 * (layout-animated, after the Animate UI tabs pattern). Rectangular 3px
 * container per the design system — pills stay reserved for tags.
 */
export function SectionTabs({
  tabs,
  value,
  onChange,
  idBase,
  variant = "light",
  className = "",
  ...aria
}: SectionTabsProps) {
  const reduceMotion = useReducedMotion();

  const moveFocus = (event: KeyboardEvent<HTMLButtonElement>, current: number) => {
    let next: number | null = null;
    if (event.key === "ArrowRight") next = (current + 1) % tabs.length;
    else if (event.key === "ArrowLeft") next = (current - 1 + tabs.length) % tabs.length;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = tabs.length - 1;
    if (next === null) return;
    event.preventDefault();
    onChange(tabs[next].value);
    document.getElementById(`${idBase}-tab-${tabs[next].value}`)?.focus();
  };

  const containerStyle =
    variant === "light"
      ? "border-rose/25 bg-blush/30"
      : "border-white/10 bg-white/[0.04]";
  const inactiveText =
    variant === "light"
      ? "text-text-muted hover:text-rose-deep"
      : "text-text-light/60 hover:text-rose";

  return (
    <div
      role="tablist"
      aria-label={aria["aria-label"]}
      className={`inline-flex max-w-full items-stretch rounded-[3px] border p-1 ${containerStyle} ${className}`}
    >
      {tabs.map((tab, index) => {
        const active = tab.value === value;
        const highlight = (
          <span className="absolute inset-0 rounded-[2px] bg-rose" aria-hidden="true" />
        );
        return (
          <button
            key={tab.value}
            type="button"
            role="tab"
            id={`${idBase}-tab-${tab.value}`}
            aria-selected={active}
            aria-controls={`${idBase}-panel-${tab.value}`}
            tabIndex={active ? 0 : -1}
            onClick={() => onChange(tab.value)}
            onKeyDown={(event) => moveFocus(event, index)}
            className={`relative inline-flex items-center justify-center whitespace-nowrap px-5 py-2.5 transition-colors duration-300 ease-out sm:px-7 ${
              active ? "text-text-light" : inactiveText
            }`}
          >
            {active &&
              (reduceMotion ? (
                highlight
              ) : (
                <motion.span
                  layoutId={`${idBase}-tab-highlight`}
                  className="absolute inset-0 rounded-[2px] bg-rose"
                  transition={{ duration: 0.4, ease: EASE }}
                  aria-hidden="true"
                />
              ))}
            <span className="relative z-10 block text-center">{tab.label}</span>
          </button>
        );
      })}
    </div>
  );
}

type TabPanelProps = {
  value: string;
  activeValue: string;
  idBase: string;
  className?: string;
  children: ReactNode;
};

/** Only the active panel renders; it enters with a soft rise-and-fade. */
export function TabPanel({ value, activeValue, idBase, className, children }: TabPanelProps) {
  const reduceMotion = useReducedMotion();
  if (value !== activeValue) return null;

  return (
    <motion.div
      key={value}
      role="tabpanel"
      id={`${idBase}-panel-${value}`}
      aria-labelledby={`${idBase}-tab-${value}`}
      initial={reduceMotion ? false : { opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: EASE }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

type CollapseProps = {
  open: boolean;
  id?: string;
  className?: string;
  children: ReactNode;
};

/**
 * Smooth measured-height expand/collapse. Content stays mounted (form state
 * survives a close); `inert` keeps hidden content out of the tab order.
 */
export function Collapse({ open, id, className, children }: CollapseProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      id={id}
      initial={false}
      animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
      transition={
        reduceMotion
          ? { duration: 0 }
          : {
              height: { duration: 0.5, ease: EASE },
              opacity: { duration: 0.35, ease: EASE },
            }
      }
      style={{ overflow: "hidden" }}
      aria-hidden={!open}
      inert={!open}
      className={className}
    >
      {children}
    </motion.div>
  );
}

type ParallaxProps = {
  /** Vertical drift in px: content travels from +drift to -drift as it crosses the viewport. Max ±40 (design-system.md §8). */
  drift?: number;
  /** Pre-scale for clipped images so the drift never exposes an edge (~1.12–1.15). */
  scale?: number;
  /** Clip the drifting content to this component's own box (for images inside mats). */
  clip?: boolean;
  className?: string;
  innerClassName?: string;
  children: ReactNode;
};

/**
 * Scroll-scrubbed vertical drift for depth (design-system.md §8, scroll-linked
 * motion). Transform-only, 1:1 with scroll, static under reduced motion.
 */
export function Parallax({
  drift = 24,
  scale = 1,
  clip = false,
  className = "",
  innerClassName = "",
  children,
}: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [drift, -drift]);

  return (
    <div ref={ref} className={`${clip ? "overflow-hidden" : ""} ${className}`}>
      <motion.div
        style={reduceMotion ? undefined : { y, scale }}
        className={`relative will-change-transform ${innerClassName}`}
      >
        {children}
      </motion.div>
    </div>
  );
}

type SceneFrameProps = {
  /** Entry glide in px — content settles up into place as the section enters. */
  rise?: number;
  /** Exit release in px as the section leaves the viewport. */
  exit?: number;
  className?: string;
  children: ReactNode;
};

/**
 * Scroll-scrubbed frame transition for section content (design-system.md §8):
 * glides up from +rise as the section enters (settled before body copy reaches
 * reading position), holds, then releases -exit as the section departs.
 * Transform-only, 1:1 with scroll, static under reduced motion.
 */
export function SceneFrame({ rise = 48, exit = 16, className = "", children }: SceneFrameProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  // Four intersection points keep the glide height-independent: entry settles
  // once the section top reaches 60% of the viewport (even for very tall
  // sections), and the exit release only begins as the bottom passes 45%.
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "start 0.6", "end 0.45", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1 / 3, 2 / 3, 1], [rise, 0, 0, -exit]);

  return (
    <div ref={ref} className={`w-full ${className}`}>
      <motion.div style={reduceMotion ? undefined : { y }} className="w-full will-change-transform">
        {children}
      </motion.div>
    </div>
  );
}

type ScrollDrawProps = {
  /** The content whose reading progress drives the draw. */
  targetRef: RefObject<HTMLDivElement | null>;
  className?: string;
};

/**
 * A vertical rule that draws itself top→bottom in step with how far the
 * reader has scrolled through `targetRef` (the Our Story rail). Render inside
 * a hairline track; this is the fill.
 */
export function ScrollDraw({ targetRef, className = "" }: ScrollDrawProps) {
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start 0.75", "end 0.6"],
  });

  return (
    <motion.span
      aria-hidden="true"
      className={`block h-full w-full origin-top will-change-transform ${className}`}
      style={{ scaleY: reduceMotion ? 1 : scrollYProgress }}
    />
  );
}

/** Small rotating chevron for expandable rows; inherits currentColor. */
export function Chevron({ open, className = "" }: { open: boolean; className?: string }) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.4}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={`h-4 w-4 shrink-0 transition-transform duration-300 ease-out ${
        open ? "rotate-180" : ""
      } ${className}`}
    >
      <path d="M3.5 6 8 10.5 12.5 6" />
    </svg>
  );
}
