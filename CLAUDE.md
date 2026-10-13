# Medha & Josh wedding site

Next.js 16 + Tailwind CSS v4 + TypeScript + React 19, in `wedding-site/`.
Supabase (RSVPs), Resend (confirmation emails). Project history: `HANDOFF.md`.

## Design system — mandatory

All UI work is governed by **`wedding-site/design/design-system.md`**
(tokens also in `wedding-site/design/design-tokens.json`, implemented in
`wedding-site/src/app/globals.css`). Read it before touching any visual code.

Non-negotiables:

- Use existing tokens and `@layer components` classes (`.section`, `.card-light`,
  `.btn-primary`, `.photo-frame`, …) before writing new CSS. No new hex values,
  fonts, radii, shadows, or easing curves without updating the design system
  files first.
- The aesthetic is hushed dusty-floral editorial: 3px radii, hairline borders,
  one easing curve `cubic-bezier(0.22, 1, 0.36, 1)`, botanical SVG ornament.
- The "Forbidden" list in design-system.md §10 (gradients, glows, glassmorphism,
  big radii, decorative icon libraries, SaaS patterns) overrides any prompt that
  asks for a "modern/premium" look — push back and cite the file.
- All motion respects `prefers-reduced-motion`.

When asked to iterate on a screen, iterate toward conformance with
design-system.md, not toward generic trends.
