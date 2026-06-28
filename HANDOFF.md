# Wedding Website Handoff Document

## Project Overview
**Couple:** Medha & Josh  
**Wedding Date:** October 26, 2026 (placeholder)  
**Events:** Wedding Ceremony (Oct 26) + Mehendi/Sangeet (Oct 25)  
**Tech Stack:** Next.js 16.2.9 + Tailwind CSS v4 + TypeScript + React 19  
**Repository:** `C:\medha_wedding\wedding-site`

## Reference Assets Used

### Design References (`C:\medha_wedding\reference\`)
| File | Description | Key Design Elements Extracted |
|------|-------------|------------------------------|
| `hero-landing-1.jpeg` | "EDEN ROSE" photography site | Dark moody aesthetic, large serif typography, oval monogram |
| `hero-landing-2.png` | "Mary Jo & Adam" wedding site | Dusty rose/mauve photo overlay, centered layout, RSVP button in nav, semi-transparent date watermark |
| `animation-reference.mp4` (29.4s) | Full scroll animation reference | Loading sequence with % counter, pill-shaped event tags, scattered story photos, timeline, wish form with Hadir/Tidak Hadir buttons, floating back-to-top |

### Placeholder Photos (copied to `public/images/`)
| Source | Destination | Use |
|--------|-------------|-----|
| `couple-landing-hero-2.jpg` | `/images/hero.jpg` | Hero background (couple laughing by water at dusk) |
| `couple-1.jpg` | `/images/story-1.jpg` | Story section (couple on couch) |
| `couple-2.jpg` | `/images/story-2.jpg` | Story section (forehead kiss with flowers) |
| `couple-4.jpg` | `/images/story-3.jpg` | Story section (close-up intimate moment) |

## Design System (from frontend-design skill)

### Color Palette
```css
--color-bg: #FFFEFC;           /* Warm ivory - light sections */
--color-bg-dark: #000000;      /* Pure black - dark sections */
--color-text: #2D2D2D;         /* Charcoal - body text on light */
--color-text-light: #FFFEFC;   /* White - text on dark */
--color-gold: #C9A96E;         /* Warm antique gold - accents */
--color-gold-light: #D4B87A;   /* Lighter gold - hover states */
--color-blush: #E8D5CB;        /* Dusty warm blush - card backgrounds */
--color-blush-light: #F2E0D8;  /* Lighter blush */
```

### Typography
- **Display:** Cormorant Garamond (serif, elegant, weights 300-700 + italic)
- **Body:** DM Sans (sans-serif, modern, weights 400-700)

### Key Component Styles
- `.btn-primary` — Gold bg, dark text, hover: transparent + gold text
- `.btn-secondary` — Transparent, gold border/text, hover: gold bg
- `.pill-tag` / `.pill-tag-dark` — Rounded tags for date/time/location
- `.section` — Consistent padding: `py-20 md:py-28 lg:py-32`
- `.container` — `max-w-7xl mx-auto`

## Project Structure
```
wedding-site/
├── public/
│   └── images/
│       ├── hero.jpg
│       ├── story-1.jpg
│       ├── story-2.jpg
│       └── story-3.jpg
├── src/
│   ├── app/
│   │   ├── globals.css          # Design tokens, animations, utilities
│   │   ├── layout.tsx           # Font loading, metadata
│   │   └── page.tsx             # Main page composition
│   └── components/
│       ├── hooks.ts             # useScrollReveal, useScrollPosition, useScrollDirection
│       ├── Navigation.tsx       # Sticky nav with scroll behavior
│       ├── Hero.tsx             # Full-viewport hero with photo overlay
│       ├── RSVP.tsx             # Two side-by-side event cards with forms
│       ├── Travel.tsx           # 3-column grid (Stay, Do, Transport)
│       ├── Schedule.tsx         # Two-day timeline with gold dot markers
│       ├── QA.tsx               # Accordion FAQ with native <details>
│       └── BackToTop.tsx        # Floating button appears after 600px scroll
├── package.json
├── tsconfig.json
├── next.config.ts
└── postcss.config.mjs
```

## Sections Implemented

### 1. Hero (`#hero`)
- Full-viewport background image with mauve gradient overlay
- "We're Getting Married!" in Cormorant italic
- "Medha & Josh" in large Cormorant Garamond
- Stacked date: OCTOBER / 26 / 2026
- Semi-transparent date watermark at bottom: "10 26 2026"
- "Save the Date" button → scrolls to RSVP
- Scroll-down chevron with bounce animation
- Staggered entrance animations

### 2. Navigation (Fixed header)
- Transparent → frosted glass on scroll (>100px)
- Hide on scroll down, show on scroll up (>200px)
- Links: RSVP, Travel, Schedule, Q&A
- Center: "M & J" monogram

### 3. RSVP (`#rsvp`)
- Invitation line: "Together with their families..."
- Two cards side-by-side (Wedding Ceremony | Mehendi/Sangeet)
- Each card: pill tags (date, time, location), description, form
- Form fields: name, email, attending (yes/no radio), guests (select), message
- Mock submission shows success state
- Cards animate from left/right on scroll

### 4. Travel (`#travel`) — Dark section
- 3-column grid: Where to Stay / Things to Do / Getting Around
- Icon + title + list items with hover gold accent
- Placeholder Chicago-specific content

### 5. Schedule (`#schedule`)
- Two-day timeline (Oct 25 + Oct 26)
- Date dividers with gold lines
- Time on left, event card on right with gold dot connector
- Cards hover to gold border

### 6. Q&A (`#qa`) — Dark section
- Native `<details>`/`<summary>` accordion
- 10 FAQs covering attire, parking, plus-ones, kids, dietary, registry, weather, transport, cancellation, photography
- Chevron rotates on open
- Smooth height animation via CSS

### 7. Footer
- Large date watermark: "10 26 2026"
- "Medha & Josh — Together with their families"

### 8. Back to Top
- Floating gold circle button (bottom-right)
- Appears after 600px scroll
- Smooth scroll to top

## Animations (IntersectionObserver-based)
- `useScrollReveal` hook with `threshold: 0.15`, `rootMargin: "0px 0px -50px 0px"`
- Classes: `.reveal`, `.reveal-left`, `.reveal-right`, `.reveal-scale`
- All animations respect `prefers-reduced-motion: reduce`
- Staggered delays via inline `animationDelay` styles

## Pending / To Complete

### 1. **Build Verification**
```bash
cd C:\medha_wedding\wedding-site
npx next build
```
- Should complete in 30-90s
- Fix any TypeScript/ESLint errors

### 2. **Dev Server Test**
```bash
npx next dev
```
- Verify at `http://localhost:3000`
- Check all sections render correctly
- Test scroll animations, nav behavior, form interactions
- Test responsive breakpoints (mobile, tablet, desktop)

### 3. **Content Updates Needed**
- [ ] Real wedding date (currently Oct 26, 2026 placeholder)
- [ ] Real venue names/addresses
- [ ] Real hotel recommendations
- [ ] Real registry link
- [ ] Couple's actual photos (replace placeholders in `public/images/`)

### 4. **Future: Supabase Integration**
- RSVP forms currently mock-submit to console
- Need to connect to Supabase for:
  - Guest list tracking
  - RSVP status per event
  - Admin dashboard
- API routes needed at `/api/rsvp`

### 5. **Accessibility Audit**
- [ ] Verify color contrast ratios
- [ ] Test keyboard navigation
- [ ] Screen reader testing
- [ ] Focus indicators visible

### 6. **Performance**
- [ ] Optimize images (WebP/AVIF via Next/Image)
- [ ] Add blur placeholders for hero
- [ ] Consider static export for deployment

## Commands Reference
```bash
# Development
npx next dev

# Production build
npx next build

# Start production server
npx next start

# Lint
npx eslint .

# Type check
npx tsc --noEmit
```

## Design Decisions (per frontend-design skill)
1. **Avoided AI defaults:** No warm cream/terracotta, no near-black/acid-green, no broadsheet hairlines
2. **Signature element:** Dusty mauve photo overlay + stacked date treatment + gold accent system
3. **Restraint:** Single accent color (gold), generous whitespace, one script usage (hero invitation line)
4. **Alternating sections:** Light (ivory) / Dark (black) rhythm for visual pacing
5. **Typography personality:** Cormorant Garamond for ceremony feel, DM Sans for modern clarity

## Known Issues / Gotchas
- Tailwind v4 uses `@theme` not `tailwind.config.js` — all tokens in `globals.css`
- Next.js 16 uses App Router — all components are Client Components (`"use client"`)
- Images in `public/` served at root — reference as `/images/hero.jpg`
- `prefers-reduced-motion` disables all scroll animations automatically
- Form submissions are mocked — no backend yet

---

**Next Agent:** Run `npx next build` first, then `npx next dev` to verify. Update content placeholders with real details when available.