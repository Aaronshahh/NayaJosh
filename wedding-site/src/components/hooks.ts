"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import type { CSSProperties } from "react";

interface UseScrollRevealOptions {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
}

export function useScrollReveal(options: UseScrollRevealOptions = {}) {
  const { threshold = 0.15, rootMargin = "0px 0px -80px 0px", triggerOnce = false } = options;
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef<HTMLElement | null>(null);

  const setRef = useCallback((node: HTMLElement | null) => {
    elementRef.current = node;
  }, []);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    if (typeof IntersectionObserver === "undefined") {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (triggerOnce) observer.unobserve(element);
        } else if (!triggerOnce) {
          setIsVisible(false);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [threshold, rootMargin, triggerOnce]);

  return { ref: setRef, isVisible };
}

/**
 * Reveal triggered once the component mounts (used for above-the-fold content
 * like the hero, which is already in view on load).
 */
export function useMountReveal(delay = 50) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const id = window.setTimeout(() => setIsVisible(true), delay);
    return () => window.clearTimeout(id);
  }, [delay]);

  return isVisible;
}

/**
 * Combined, rAF-throttled scroll state for the navigation bar.
 * Throttling to one update per animation frame prevents the per-pixel
 * re-renders that caused scroll stutter.
 */
export function useScrollNav() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    let frame = 0;
    let lastY = window.scrollY;

    const update = () => {
      const y = window.scrollY;
      setScrolled(y > 80);

      if (y > 200 && y > lastY + 6) {
        setHidden(true);
      } else if (y < lastY - 6) {
        setHidden(false);
      }

      lastY = y;
      frame = 0;
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return { scrolled, hidden };
}

/**
 * Live viewport size (rAF-throttled). SSR-safe: returns 0/0 until mounted.
 */
export function useViewport() {
  const [size, setSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    let frame = 0;
    const update = () => {
      setSize({ width: window.innerWidth, height: window.innerHeight });
      frame = 0;
    };
    const onResize = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("resize", onResize, { passive: true });
    window.addEventListener("orientationchange", update, { passive: true });
    return () => {
      window.removeEventListener("resize", onResize);
      window.removeEventListener("orientationchange", update);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return size;
}

/** Height of the fixed navigation bar, used to offset section content. */
export const NAV_HEIGHT = 80;

/**
 * Derives section spacing from the live viewport so every section is full
 * height, vertically centered, and uses consistent, screen-relative gutters
 * and a centered max-width — instead of hard-coded constants.
 */
export function useSectionLayout() {
  const { width, height } = useViewport();

  // Horizontal gutter scales with screen width.
  const gutter = width === 0 ? 24 : width < 640 ? 24 : width < 1024 ? 48 : 80;

  // Centered content column width.
  const maxWidth = width === 0 ? 1152 : width < 768 ? 600 : width < 1280 ? 960 : 1152;

  // Top-aligned sections need a smaller top offset; keep more breathing room
  // at the bottom for tall card/form content.
  const topPad = height === 0 ? 8 : Math.max(8, Math.round(height * 0.006));
  const bottomPad = height === 0 ? 112 : Math.max(96, Math.round(height * 0.085)) + NAV_HEIGHT / 2;

  const section: CSSProperties = {
    minHeight: height ? `${height}px` : "100vh",
    paddingTop: topPad,
    paddingBottom: bottomPad,
    paddingLeft: gutter,
    paddingRight: gutter,
    scrollMarginTop: NAV_HEIGHT,
  };

  const inner: CSSProperties = {
    width: "100%",
    maxWidth,
    marginInline: "auto",
  };

  return { section, inner, width, height };
}

/**
 * rAF-throttled boolean for "have we scrolled past `offset`px".
 */
export function useScrolledPast(offset: number) {
  const [past, setPast] = useState(false);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      setPast(window.scrollY > offset);
      frame = 0;
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [offset]);

  return past;
}
