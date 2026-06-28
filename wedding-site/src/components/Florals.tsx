import type { CSSProperties } from "react";

/**
 * Small leafy sprig divider used beneath section eyebrows / titles.
 * Inherits color via `currentColor`.
 */
export function FloralDivider({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 240 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.1}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <line x1="24" y1="12" x2="98" y2="12" />
      <line x1="142" y1="12" x2="216" y2="12" />
      <path d="M120 20 V 4.5" />
      <path d="M120 15 C 113 14, 109 10, 108 6 C 113 8, 118 11, 120 15 Z" fill="currentColor" fillOpacity={0.16} />
      <path d="M120 15 C 127 14, 131 10, 132 6 C 127 8, 122 11, 120 15 Z" fill="currentColor" fillOpacity={0.16} />
      <path d="M120 11 C 115.5 10, 112.5 7, 111.5 4 C 115 6, 118 8, 120 11 Z" fill="currentColor" fillOpacity={0.16} />
      <path d="M120 11 C 124.5 10, 127.5 7, 128.5 4 C 125 6, 122 8, 120 11 Z" fill="currentColor" fillOpacity={0.16} />
      <circle cx="120" cy="4" r="1.6" fill="currentColor" stroke="none" />
      <path d="M98 12 c 5 -3, 9 -2, 11 1" />
      <path d="M142 12 c -5 -3, -9 -2, -11 1" />
    </svg>
  );
}

/**
 * Larger decorative botanical branch for section corners.
 * Render at low opacity behind content.
 */
export function CornerSprig({
  className = "",
  style,
}: {
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <svg
      viewBox="0 0 140 200"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      style={style}
      aria-hidden="true"
    >
      {/* main stem */}
      <path d="M18 196 C 44 156, 66 122, 74 78 C 79 50, 80 28, 76 8" />
      {/* leaves along the stem, alternating sides */}
      <path d="M40 162 C 30 156, 22 158, 16 166 C 26 168, 36 168, 44 162 Z" fill="currentColor" fillOpacity={0.1} />
      <path d="M52 138 C 60 130, 70 130, 78 134 C 70 142, 60 144, 52 138 Z" fill="currentColor" fillOpacity={0.1} />
      <path d="M60 112 C 50 106, 42 108, 36 116 C 46 118, 56 118, 64 112 Z" fill="currentColor" fillOpacity={0.1} />
      <path d="M70 84 C 78 76, 88 76, 96 80 C 88 88, 78 90, 70 84 Z" fill="currentColor" fillOpacity={0.1} />
      <path d="M75 56 C 65 50, 57 52, 51 60 C 61 62, 71 62, 79 56 Z" fill="currentColor" fillOpacity={0.1} />
      <path d="M77 30 C 85 22, 95 22, 103 26 C 95 34, 85 36, 77 30 Z" fill="currentColor" fillOpacity={0.1} />
      {/* bud */}
      <circle cx="76" cy="8" r="2.4" fill="currentColor" stroke="none" />
    </svg>
  );
}
