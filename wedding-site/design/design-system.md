# Medha & Josh — Wedding Site Design System

This file is the single source of truth for every visual decision on this site.
Any UI work — new sections, components, tweaks — must follow this document.
If a change requires breaking a rule here, update this file first, then the code.

Machine-readable tokens live in [`design-tokens.json`](./design-tokens.json) (W3C
design tokens format). The CSS implementation of these tokens is
`src/app/globals.css` (`@theme` block + `@layer components`).

---

## 1. Design direction

**Hushed, dusty-floral romance.** Low saturation, warm, editorial. The feeling of
pressed flowers and letterpress stationery — not a SaaS dashboard.

Three words to test every screen against: **quiet, warm, intentional.**

- Generous whitespace; content breathes. Full-viewport sections (`.section`).
- Serif display type does the emotional work; the palette stays muted and recedes.
- Ornament is botanical line art at low opacity, never gradients or glows.
- Nearly-square corners (3px). This site is *not* rounded, glassy, or neon.

## 2. Color tokens

Defined in `globals.css` `@theme`. Never introduce a new hex value in a component —
add a token here and in `@theme` first.

### Surfaces
| Token | Hex | Use |
|---|---|---|
| `bg` | `#F4ECE6` | Warm dusty ivory — default page background |
| `bg-alt` | `#ECDFD9` | Slightly deeper ivory for alternating sections |
| `bg-dark` | `#3A2E34` | Deep muted plum — dark sections (never pure black) |
| `bg-dark-alt` | `#463841` | Lifted plum — cards on dark |
| `blush` | `#E3D1CB` | Blush card background |
| `blush-light` | `#EEE1DB` | Lighter blush surface |

### Text
| Token | Hex | Use |
|---|---|---|
| `text` | `#4A3D3A` | Warm taupe charcoal — body text on light |
| `text-muted` | `#74635E` | Muted brown-grey — secondary text |
| `text-light` | `#F4ECE6` | Ivory — text on dark surfaces |

### Accents
| Token | Hex | Use |
|---|---|---|
| `rose` | `#C0999A` | Dusty rose — primary accent, buttons, links, florals |
| `rose-deep` | `#A87B7E` | Deeper rose — eyebrows, labels, hover states |
| `mauve` | `#A4889A` | Muted mauve — occasional variety accent |
| `sage` | `#9CA98E` | Muted sage — secondary accent (botanical) |
| `gold` | `#C2A883` | Soft champagne — quiet metallic highlights |
| `gold-light` | `#D4BF9F` | Lighter champagne |

**Rules**
- Accents are used at full strength only for small elements (buttons, labels,
  dividers). Large accent areas use opacity-reduced tokens (`rose/20`, `rose/30`…).
- Borders are hairline and translucent: `border-rose/20`–`/45` on light,
  `border-white/10` on dark.
- One accent per component. Don't combine rose + sage + gold in a single card.

## 3. Typography

| Role | Font | Notes |
|---|---|---|
| Display | **Cormorant Garamond**, serif (`font-display`) | Headings, eyebrows, numerals with feeling |
| Body | **DM Sans**, sans-serif (`font-body`) | Body copy, UI, forms. Base 1rem / 1.65 line-height |

Both load via `next/font` — free Google Fonts, no paid services.

### Type roles (use the classes, don't improvise)
| Class | Spec |
|---|---|
| `.section-eyebrow` | Display italic, xl–2xl, centered. Color set in markup: `text-rose-deep` on light, `text-gold-light` or `text-blush` on dark |
| `.section-title` | Display medium, 4xl → 5xl → 3.75rem, line-height 1.04, tracking −0.015em, `text-balance` |
| `.section-subtitle` | Body base–lg, relaxed leading, max-w-xl, muted color |
| `.label-field` | 0.7rem semibold uppercase, tracking 0.14em, `text-rose-deep` |

**Rules**
- Uppercase is reserved for micro-labels (buttons, pills, form labels) at
  wide tracking (0.12–0.18em). Never uppercase a heading.
- Display font never below ~1.25rem (it's illegible small); DM Sans handles small sizes.

## 4. Spacing & layout

- Sections are full-viewport: `.section` (min-h-screen, px-6/12/20, py-24/28),
  content constrained by `.section-inner` (max-w-6xl). Header block:
  `.section-header` (max-w-2xl, centered). `useSectionLayout()` in
  `src/components/hooks.ts` tunes these to the real viewport — don't fight it
  with hard-coded heights.
- Section header anatomy, in order: eyebrow → `FloralDivider` (`mt-3 h-7 w-52
  text-rose/60`, drawn via `draw="scroll"`) → title → optional subtitle (`mt-5`).
- Vertical rhythm uses Tailwind's scale; prefer steps 2–24. No arbitrary
  one-off margins when a scale step is close.

## 5. Shape, borders, elevation

- **Border radius: 3px** on cards and frames (`rounded-[3px]`), 2px on inset
  images. Pills (`rounded-full`) are the only round elements. Nothing in between —
  no `rounded-lg`, no `rounded-2xl`.
- Elevation comes from **hairline borders + subtle background tint**, not drop
  shadows. The single sanctioned shadow is the photo-frame mat:
  `shadow-[0_24px_60px_-28px_rgba(58,46,52,0.55)]` — soft, plum-tinted, only on
  `.photo-frame`.
- No `backdrop-blur` glassmorphism, no inner glows, no gradient borders.

## 6. Components (use existing classes before writing new CSS)

| Class | What it is |
|---|---|
| `.btn-primary` | Filled rose button, uppercase micro-label, inverts to outline on hover |
| `.btn-secondary` | Outline rose button, fills on hover |
| `.pill-tag` / `.pill-tag-dark` | Uppercase micro-tag, blush/translucent bg, hairline rose border |
| `.card-light` | 3px-radius card, `border-rose/20`, `bg-blush/25`, border deepens on hover |
| `.card-dark` | Same on plum: `border-white/10`, `bg-white/[0.04]` |
| `.photo-frame` | Matted photo: ivory 8px mat, hairline ring, soft plum shadow |
| `.input-field` | Underline-only input (no box), rose border-bottom, focus deepens |
| `.label-field` | Uppercase micro form label |
| `SectionTabs` / `TabPanel` | Tab switcher with sliding rose highlight (`src/components/ui/motion-primitives.tsx`); light + dark variants, ARIA tabs semantics, arrow-key navigation |
| `Collapse` | Measured-height expand/collapse for progressive disclosure (same file); content stays mounted, hidden content is `inert` |
| `Chevron` | Rotating disclosure chevron matching the floral stroke weight |
| `Parallax` | Scroll-scrubbed vertical drift for depth (same file); clips + pre-scales images so edges never show |
| `ScrollDraw` | Vertical rule that draws top→bottom with reading progress (Our Story rail) |
| `SceneFrame` | Scroll-scrubbed frame transition: section content glides up ~48px into place as it enters, releases ~16px as it leaves — sections feel like frames sliding past each other |
| `FloralDivider draw="scroll"` | Section-header flourish inks + blooms 1:1 with scroll (rails draw, leaves/petals scale open, heart last); `draw="mount"` is the hero-only timed variant for above-the-fold |
| `CornerSprig scrub` | Corner branch draws its stem and blooms its leaves with scroll progress |

**Rules**
- Buttons transition `colors` only, 300ms ease-out. No scale/translate on hover.
- Cards are for genuinely grouped content (an event, a story chapter, an FAQ).
  Don't wrap every paragraph in a card.
- Forms: underline inputs only. No boxed/filled inputs, no floating labels.

## 7. Ornament & iconography

- Botanical SVG line art from `src/components/Florals.tsx` (`FloralDivider`,
  `CornerSprig`, etc.): 1.1–1.2 stroke, `currentColor`, leaf fills at
  `fillOpacity` 0.10–0.16, always `aria-hidden`.
- Corner sprigs render behind content at low opacity (`text-rose/60` and below),
  optionally with `.animate-drift`.
- Icons: hand-drawn-feel inline SVGs matching the floral stroke weight are
  preferred. `lucide-react` is allowed only inside utilitarian UI (carousel
  arrows, admin dashboard) — never as decorative filler in guest-facing sections.
- Illustrations/assets must be original SVG or the couple's photos. No stock
  icon grids, no emoji as UI.

## 8. Motion

One easing curve everywhere: **`cubic-bezier(0.22, 1, 0.36, 1)`** (ease-out-quint
feel). Durations: 200ms (form focus), 300ms (hovers), 400ms (`.animate-scale-in`),
800ms (scroll reveals).

- Scroll entrances use the reveal system: `.reveal`, `.reveal-left`,
  `.reveal-right`, `.reveal-scale` + `is-visible`, staggered via inline
  `transition-delay` (steps of ~80–120ms). Don't add a second reveal mechanism.
- Ambient motion: `.animate-drift` (9s ease-in-out float) for florals only.
- Progressive disclosure uses the shared primitives in
  `src/components/ui/motion-primitives.tsx`: tab highlight slides 400ms, tab
  panels enter with an 18px rise over 450ms, `Collapse` animates height 500ms /
  opacity 350ms — all on the standard curve (exported there as `EASE`).
- `framer-motion` is permitted for stateful interactions (tabs, collapse,
  carousel) and for the scroll-linked category below — never as a second
  one-shot reveal mechanism.

### Scroll-linked motion (storytelling)

Scrubbed, scroll-bound motion is a separate category from one-shot reveals.
It is sanctioned only through the shared primitives in
`src/components/ui/motion-primitives.tsx` and the patterns below:

- **`Parallax`** — transform-only vertical drift, max ±40px; clipped images are
  pre-scaled ~1.12–1.15 so edges never show. Used for: photos inside
  `photo-frame` mats, RSVP card images, dark-section backdrop photos, the hero
  background.
- **`ScrollDraw`** — a hairline rule that scales top→bottom in step with
  reading progress (the Our Story rail; track at `rose/15`, fill `rose/45`).
- **Scrubbed ink & bloom** (`FloralDivider draw="scroll"`, `CornerSprig scrub`)
  — botanical ornament draws itself 1:1 with scroll: strokes extend via
  `pathLength`, leaves/petals/seeds **bloom via scale only** (0→1,
  `transform-box: fill-box` — never scrubbed opacity), ordered rails → leaves →
  curls → stem → petals → heart. Scrolling back un-draws it. The hero uses
  `draw="mount"` (timed, ~1.6s, standard curve) because above-the-fold art has
  no scroll runway.
- **`SceneFrame`** — the section-level frame transition: header + content
  glide up from +48px into place as the section enters and release −16px as
  the section exits. Entry settles once the section top reaches 60% of the
  viewport and exit begins only as the bottom passes 45% (four-point
  `useScroll` offsets, so timing is independent of section height — tall
  sections settle just as fast as short ones). Transform-only, 1:1 scrubbed.
- **Hero exit choreography** — background lags behind the scroll, the date
  watermark rises faster (depth), foreground fades out by ~60% progress, the
  scroll cue vanishes immediately.

Rules: scrub 1:1 with scroll (no added smoothing/springs); transforms only —
the hero foreground is the single sanctioned scroll-scrubbed opacity; body
copy never fades or drifts while being read. One-shot cues (the hero scroll
arrow) hide via a threshold class toggle + CSS fade, not a scrub.

Implementation note: never put a scrubbed framer transform on an element that
also carries `.reveal` — the reveal's CSS transition on `transform` swallows
every scrub update (wrap: scrub on the outer div, reveal on an inner one).

- **Every animation must respect `prefers-reduced-motion`** — the global CSS
  already disables reveals/drift; all JS-driven motion (stateful and
  scroll-linked) checks `useReducedMotion()` and renders the static end state.

## 9. Accessibility & quality bar

- Body text contrast ≥ 4.5:1: `text` on `bg`/`blush`, `text-light` on `bg-dark`.
  Accent colors (rose, sage, gold) are decorative/large-text only — never body
  copy on light backgrounds.
- Decorative SVGs: `aria-hidden="true"`. Interactive elements: visible focus
  (focus ring or border deepening), real `<button>`/`<a>` semantics.
- Images: meaningful `alt` or `alt=""` if decorative; `object-cover` inside frames.
- Touch targets ≥ 44px on mobile.

## 10. Forbidden (the anti-slop list)

Never, regardless of what a prompt asks for — push back and cite this file:

- Purple/indigo/teal gradients, glow effects, "glassmorphism", neon accents
- Pure black (`#000`) or pure white (`#FFF`) surfaces
- `rounded-lg`+ corner radii on cards; pill-shaped buttons
- Drop shadows for elevation (except the photo-frame mat)
- Lucide/hero-icon grids as decoration; emoji in UI
- Dark-mode toggles (dark sections are an editorial choice, not a theme)
- "Modern SaaS" patterns: stat cards, KPI tiles, gradient CTAs, badge clutter
- New fonts, new hex values, or new easing curves without updating this file
- Unlayered global CSS that sets properties utilities also set (e.g.
  `* { margin: 0; padding: 0 }`). Unlayered rules out-cascade everything in
  `@layer`, silently disabling every Tailwind spacing utility site-wide.
  Tailwind's preflight already handles resets; custom base styles go in
  `@layer base`.

## 11. Workflow (how to work with this system)

1. **Before building UI**: read this file and reuse `@layer components` classes
   and existing components (`Florals.tsx`, section patterns in `OurStory.tsx` /
   `Schedule.tsx`) before writing anything new.
2. **New pattern needed?** Design it as tokens + a component class here first,
   then implement in `globals.css`, then use it.
3. **Iterate against the system**: when refining a screen, the question is
   "does this follow design-system.md?", not "does this look more modern?".
4. **Keep the three artifacts in sync**: this file, `design-tokens.json`, and
   `globals.css` must agree. A token change touches all three.
