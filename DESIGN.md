---
name: Stellarum
description: Interactive 3D Solar System and astronomy observatory portal set over a unified procedural Milky Way SpaceDome and J2000 spectral starfield.
colors:
  space-black: "#000000"
  space-abyss: "#04091e"
  space-navy: "#03045e"
  cyan-glow: "#7cdee4"
  cyan-wake: "#38bdf8"
  amber-star: "#fec42d"
  ink-primary: "#f8fafc"
  ink-secondary: "#9fb2cc"
  ink-muted: "#788ca8"
typography:
  display:
    fontFamily: "Titillium Web, system-ui, sans-serif"
    fontSize: "3.5rem"
    fontWeight: 700
    lineHeight: 1.06
    letterSpacing: "-0.025em"
  body:
    fontFamily: "Manrope, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: "0em"
  mono:
    fontFamily: "JetBrains Mono, ui-monospace, monospace"
    fontSize: "0.75rem"
    fontWeight: 500
    lineHeight: 1.4
    letterSpacing: "0em"
rounded:
  sm: "6px"
  md: "8px"
  lg: "12px"
dials:
  energy: 2
  rhythm: 3
  motion: 2
---

# Design System: Stellarum

## Overview

**Creative North Star: "The Open-Sky Solar Observatory"**

Stellarum renders a continuous procedural WebGL `SpaceDome` (Milky Way galactic plane baked to a 512px cubemap, real J2000 spectral catalog stars, and delicate ecliptic armillary rings) across both the landing portal (`/`) and the full-viewport interactive Solar System observatory (`/tata-surya`). Surfaces step back into dark midnight-abyss containers ruled by `1px` hairlines so real 3D celestial bodies, NASA planetary textures, and astrophotography lead without visual noise.

We reject decorative eyebrow pill badges above headings, gradient display text, blurred radial glow orbs, opaque grey wall cards, nested card-inside-card stacks, pulsing fake status dots, and dead footer links.

## Colors

The active UI palette holds to two dark cosmic grounds, crisp luminous ink, one primary interactive ice-cyan accent, and one solar-amber telemetry accent.

### Primary & Accent
- **Ice Cyan** (`#7cdee4`): Primary actions (`Buka Tata Surya 3D`), active focus rings, and interactive observatory borders.
- **Space Navy** (`#03045e`): High-contrast dark ink on solid cyan primary buttons.
- **Solar Amber** (`#fec42d`): Solar system signature accent for Sun indicators, active orbital markers, and key astronomical highlights.
- **Wake Sky Blue** (`#38bdf8`): Subtle secondary orbital trajectories and telemetry accents.

### Neutral
- **Space Black** (`#000000`): Primary document ground and 3D dome void.
- **Space Abyss** (`#04091e`): Elevated observatory panels behind `1px` hairlines.
- **Cosmic White** (`#f8fafc`): Display headlines, primary controls, and core copy.
- **Nebula Silver** (`#9fb2cc`): Secondary prose and captions (WCAG AA compliant on `#000000` and `#04091e`).
- **Muted Slate** (`#788ca8`): Quiet metadata and unit labels.

## Typography

- **Display:** `Titillium Web` (`--font-titillium-web`) for tight geometric instrument headlines.
- **Body:** `Manrope` (`--font-manrope`) for readable Indonesian astronomy prose (`60ch` to `70ch` max measure).
- **Mono:** `JetBrains Mono` (`--font-jetbrains-mono`) strictly for astronomical telemetry (diameters, orbital distances, temperatures, dates, tabular numerals).

## Layout & Rhythm

- Dials: **ENERGY 2 (Balanced)**, **RHYTHM 3 (Varied Asymmetric)**, **MOTION 2 (Purposeful 3D & Transitions)**.
- Container capped at `max-w-7xl` (`1280px`) with `px-5 sm:px-8` gutters and `overflow-x: clip` on `html` and `body`.
- Landing page (`/`) alternates compositions intentionally:
  1. Asymmetric open-sky 2-column Hero (left thesis + 6-object switcher, right floating 3D object showcase over `SpaceDome`).
  2. Unified single-canvas 3D Scale Laboratory (`#skala`).
  3. Interactive planetary catalog grid linked directly to `/tata-surya?objek=<id>`.
  4. Split editorial rhythm for Exploration Timeline and Space Trivia & Quiz.
  5. Quiet gallery frame for NASA APOD with honest archive fallback state.
- Fullscreen 3D observatory route (`/tata-surya`) occupies `100dvh` with floating top bar, bottom quick-jump planet switcher, and dismissible right-side split detail drawer.

## Elevation, Glass & Shapes

- Hairlines (`rgba(124, 222, 228, 0.16)` at rest, `rgba(124, 222, 228, 0.5)` active) and translucent abyss layering (`rgba(4, 9, 30, 0.78)`) define structure without hiding the Milky Way backdrop.
- `backdrop-blur-md` is capped to focused overlays (Hero telemetry lens, `/tata-surya` HUD and detail drawer, and HD lightbox modal).
- Radii: `12px` for observatory panels, `8px` for buttons/tabs/inputs, `6px` for compact telemetry tags. Minimum interactive target height is `44px`.

## Do's and Don'ts

- **Do** use custom vector `StellarumLogo` SVG and real NASA planetary textures or astrophotography.
- **Do** keep `prefers-reduced-motion: reduce`, `:focus-visible`, `Escape` modal dismissal, and `aria-label` on icon buttons.
- **Don't** use em dashes (`—`), decorative eyebrow pills, gradient headings, or multiple simultaneous `WebGLRenderer` cards.
