"use client";

import { useEffect, useRef, type CSSProperties, type RefObject } from "react";
import {
  animate,
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { EASE } from "./ui/motion-primitives";

/* ------------------------------------------------------------------ *
 * Scrubbed ink & bloom (design-system.md §8): strokes draw via
 * pathLength, closed shapes bloom via scale only. Each element owns a
 * [from, to] window on a shared 0→1 progress value — scroll-scrubbed
 * for in-flow ornament, time-driven ("mount") for the hero.
 * ------------------------------------------------------------------ */

type Win = readonly [number, number];

function InkStroke({ d, win, progress }: { d: string; win: Win; progress: MotionValue<number> }) {
  const pathLength = useTransform(progress, [win[0], win[1]], [0, 1]);
  // Gate visibility until the window opens: a zero-length dash with round
  // linecaps would otherwise render a stray ink speck at the path start.
  const opacity = useTransform(progress, [win[0], Math.min(win[0] + 0.03, win[1])], [0, 1]);
  return <motion.path d={d} style={{ pathLength, opacity }} />;
}

function InkBloom({
  d,
  win,
  progress,
  fillOpacity = 0.14,
}: {
  d: string;
  win: Win;
  progress: MotionValue<number>;
  fillOpacity?: number;
}) {
  const scale = useTransform(progress, [win[0], win[1]], [0, 1]);
  return (
    <motion.path
      d={d}
      fill="currentColor"
      fillOpacity={fillOpacity}
      style={{ scale, transformBox: "fill-box", transformOrigin: "50% 50%" }}
    />
  );
}

function InkDot({
  cx,
  cy,
  r,
  win,
  progress,
}: {
  cx: number;
  cy: number;
  r: number;
  win: Win;
  progress: MotionValue<number>;
}) {
  const scale = useTransform(progress, [win[0], win[1]], [0, 1]);
  return (
    <motion.circle
      cx={cx}
      cy={cy}
      r={r}
      fill="currentColor"
      stroke="none"
      style={{ scale, transformBox: "fill-box", transformOrigin: "50% 50%" }}
    />
  );
}

/** Shared progress source: scroll-scrubbed against the svg's own position,
 *  or a one-shot 1.6s ink-in for above-the-fold ornament. */
function useInkProgress(
  ref: RefObject<SVGSVGElement | null>,
  mode: "mount" | "scroll",
  offset: [string, string],
) {
  const { scrollYProgress } = useScroll({
    target: ref as unknown as RefObject<HTMLElement>,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    offset: offset as any,
  });
  const mount = useMotionValue(0);
  useEffect(() => {
    if (mode !== "mount") return;
    const controls = animate(mount, 1, { duration: 1.6, ease: EASE, delay: 0.2 });
    return () => controls.stop();
  }, [mode, mount]);
  return mode === "mount" ? mount : scrollYProgress;
}

/* ---- Divider artwork (viewBox 240×32) ---- */

const DIVIDER_STROKES: Array<{ d: string; win: Win }> = [
  // rails arc gently toward the bloom
  { d: "M 16 22 C 44 22.5, 72 22, 96 19.5", win: [0, 0.42] },
  { d: "M 224 22 C 196 22.5, 168 22, 144 19.5", win: [0, 0.42] },
  // tendrils curl inward off the rail ends
  { d: "M 96 19.5 c 5.5 -0.5, 9 2.5, 10 6", win: [0.38, 0.6] },
  { d: "M 144 19.5 c -5.5 -0.5, -9 2.5, -10 6", win: [0.38, 0.6] },
  // flower stem
  { d: "M 120 30 C 120 26.5, 120 23, 120 17.5", win: [0.42, 0.62] },
];

const DIVIDER_BLOOMS: Array<{ d: string; win: Win; fillOpacity?: number }> = [
  // leaves budding off the rails (above, then below)
  { d: "M 44 21.5 C 40.5 17.5, 40.5 13.5, 43.5 10.5 C 45.5 14, 45.5 18, 44 21.5 Z", win: [0.2, 0.45] },
  { d: "M 196 21.5 C 199.5 17.5, 199.5 13.5, 196.5 10.5 C 194.5 14, 194.5 18, 196 21.5 Z", win: [0.2, 0.45] },
  { d: "M 66 22.5 C 63 26, 59.5 27.5, 55.5 27 C 58 23.5, 62 22, 66 22.5 Z", win: [0.3, 0.55] },
  { d: "M 174 22.5 C 177 26, 180.5 27.5, 184.5 27 C 182 23.5, 178 22, 174 22.5 Z", win: [0.3, 0.55] },
  // leaf pair at the stem base
  { d: "M 120 25.5 C 115 24.5, 111.5 21.5, 110.5 17.5 C 114.5 19, 118 21.5, 120 25.5 Z", win: [0.56, 0.76] },
  { d: "M 120 25.5 C 125 24.5, 128.5 21.5, 129.5 17.5 C 125.5 19, 122 21.5, 120 25.5 Z", win: [0.56, 0.76] },
  // five petals open upward and outward, one by one
  { d: "M 120 13 C 118.2 10, 118.2 6, 120 3.5 C 121.8 6, 121.8 10, 120 13 Z", win: [0.62, 0.8], fillOpacity: 0.16 },
  { d: "M 118 13.5 C 114.5 12.5, 112 10, 111 6.5 C 114.5 7.5, 117 10, 118 13.5 Z", win: [0.66, 0.84], fillOpacity: 0.16 },
  { d: "M 122 13.5 C 125.5 12.5, 128 10, 129 6.5 C 125.5 7.5, 123 10, 122 13.5 Z", win: [0.66, 0.84], fillOpacity: 0.16 },
  { d: "M 117.5 15 C 114 16, 110.5 15.5, 108 13.5 C 111 11.8, 115 12.5, 117.5 15 Z", win: [0.72, 0.9], fillOpacity: 0.16 },
  { d: "M 122.5 15 C 126 16, 129.5 15.5, 132 13.5 C 129 11.8, 125 12.5, 122.5 15 Z", win: [0.72, 0.9], fillOpacity: 0.16 },
];

const DIVIDER_DOTS: Array<{ cx: number; cy: number; r: number; win: Win }> = [
  // seeds drifting under the tendrils
  { cx: 104, cy: 27.5, r: 1, win: [0.5, 0.68] },
  { cx: 136, cy: 27.5, r: 1, win: [0.5, 0.68] },
  // the flower's heart arrives last
  { cx: 120, cy: 14, r: 1.8, win: [0.86, 1] },
];

const DIVIDER_SVG_PROPS = {
  viewBox: "0 0 240 32",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.1,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": true,
} as const;

/**
 * Leafy flourish beneath section eyebrows. Inherits color via `currentColor`.
 * `draw="scroll"` inks + blooms 1:1 with scroll; `draw="mount"` is the timed
 * hero variant. Static (fully drawn) by default and under reduced motion.
 */
export function FloralDivider({
  className = "",
  draw,
}: {
  className?: string;
  draw?: "mount" | "scroll";
}) {
  const reduceMotion = useReducedMotion();
  if (!draw || reduceMotion) {
    return (
      <svg {...DIVIDER_SVG_PROPS} className={className}>
        {DIVIDER_STROKES.map((s) => (
          <path key={s.d} d={s.d} />
        ))}
        {DIVIDER_BLOOMS.map((b) => (
          <path key={b.d} d={b.d} fill="currentColor" fillOpacity={b.fillOpacity ?? 0.14} />
        ))}
        {DIVIDER_DOTS.map((dot) => (
          <circle key={`${dot.cx}-${dot.cy}`} cx={dot.cx} cy={dot.cy} r={dot.r} fill="currentColor" stroke="none" />
        ))}
      </svg>
    );
  }
  return <DrawnDivider mode={draw} className={className} />;
}

function DrawnDivider({ mode, className }: { mode: "mount" | "scroll"; className: string }) {
  const ref = useRef<SVGSVGElement>(null);
  // Draws as the ornament travels from the lower viewport to its reading
  // position; scrolling back up rewinds the ink.
  const progress = useInkProgress(ref, mode, ["start 0.92", "start 0.5"]);

  return (
    <motion.svg ref={ref} {...DIVIDER_SVG_PROPS} className={className}>
      {DIVIDER_STROKES.map((s) => (
        <InkStroke key={s.d} d={s.d} win={s.win} progress={progress} />
      ))}
      {DIVIDER_BLOOMS.map((b) => (
        <InkBloom key={b.d} d={b.d} win={b.win} fillOpacity={b.fillOpacity} progress={progress} />
      ))}
      {DIVIDER_DOTS.map((dot) => (
        <InkDot key={`${dot.cx}-${dot.cy}`} {...dot} progress={progress} />
      ))}
    </motion.svg>
  );
}

/* ---- Corner sprig (viewBox 140×200) ---- */

const SPRIG_STEM: { d: string; win: Win } = {
  d: "M18 196 C 44 156, 66 122, 74 78 C 79 50, 80 28, 76 8",
  win: [0, 0.55],
};

const SPRIG_LEAVES: Array<{ d: string; win: Win }> = [
  { d: "M40 162 C 30 156, 22 158, 16 166 C 26 168, 36 168, 44 162 Z", win: [0.25, 0.45] },
  { d: "M52 138 C 60 130, 70 130, 78 134 C 70 142, 60 144, 52 138 Z", win: [0.33, 0.53] },
  { d: "M60 112 C 50 106, 42 108, 36 116 C 46 118, 56 118, 64 112 Z", win: [0.41, 0.61] },
  { d: "M70 84 C 78 76, 88 76, 96 80 C 88 88, 78 90, 70 84 Z", win: [0.49, 0.69] },
  { d: "M75 56 C 65 50, 57 52, 51 60 C 61 62, 71 62, 79 56 Z", win: [0.57, 0.77] },
  { d: "M77 30 C 85 22, 95 22, 103 26 C 95 34, 85 36, 77 30 Z", win: [0.65, 0.85] },
];

const SPRIG_BUD = { cx: 76, cy: 8, r: 2.4, win: [0.85, 1] as Win };

const SPRIG_SVG_PROPS = {
  viewBox: "0 0 140 200",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.2,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": true,
} as const;

/**
 * Larger decorative botanical branch for section corners, rendered at low
 * opacity behind content. With `scrub`, the stem draws and the leaves bloom
 * in step with the scroll.
 */
export function CornerSprig({
  className = "",
  style,
  scrub = false,
}: {
  className?: string;
  style?: CSSProperties;
  scrub?: boolean;
}) {
  const reduceMotion = useReducedMotion();
  if (!scrub || reduceMotion) {
    return (
      <svg {...SPRIG_SVG_PROPS} className={className} style={style}>
        <path d={SPRIG_STEM.d} />
        {SPRIG_LEAVES.map((leaf) => (
          <path key={leaf.d} d={leaf.d} fill="currentColor" fillOpacity={0.1} />
        ))}
        <circle cx={SPRIG_BUD.cx} cy={SPRIG_BUD.cy} r={SPRIG_BUD.r} fill="currentColor" stroke="none" />
      </svg>
    );
  }
  return <DrawnSprig className={className} style={style} />;
}

function DrawnSprig({ className, style }: { className?: string; style?: CSSProperties }) {
  const ref = useRef<SVGSVGElement>(null);
  const progress = useInkProgress(ref, "scroll", ["start 0.95", "start 0.35"]);

  return (
    <motion.svg ref={ref} {...SPRIG_SVG_PROPS} className={className} style={style}>
      <InkStroke d={SPRIG_STEM.d} win={SPRIG_STEM.win} progress={progress} />
      {SPRIG_LEAVES.map((leaf) => (
        <InkBloom key={leaf.d} d={leaf.d} win={leaf.win} fillOpacity={0.1} progress={progress} />
      ))}
      <InkDot cx={SPRIG_BUD.cx} cy={SPRIG_BUD.cy} r={SPRIG_BUD.r} win={SPRIG_BUD.win} progress={progress} />
    </motion.svg>
  );
}
