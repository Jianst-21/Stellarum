---
name: Eksplorasi Lengkap
colors:
  surface: '#131313'
  surface-dim: '#131313'
  surface-bright: '#393939'
  surface-container-lowest: '#0e0e0e'
  surface-container-low: '#1b1b1b'
  surface-container: '#1f1f1f'
  surface-container-high: '#2a2a2a'
  surface-container-highest: '#353535'
  on-surface: '#e2e2e2'
  on-surface-variant: '#bbc9cd'
  inverse-surface: '#e2e2e2'
  inverse-on-surface: '#303030'
  outline: '#859397'
  outline-variant: '#3c494c'
  surface-tint: '#2fd9f4'
  primary: '#8aebff'
  on-primary: '#00363e'
  primary-container: '#22d3ee'
  on-primary-container: '#005763'
  inverse-primary: '#006877'
  secondary: '#ecc06a'
  on-secondary: '#402d00'
  secondary-container: '#715200'
  on-secondary-container: '#f3c770'
  tertiary: '#d3dcff'
  on-tertiary: '#262f4b'
  tertiary-container: '#b7c0e2'
  on-tertiary-container: '#454e6b'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#a2eeff'
  primary-fixed-dim: '#2fd9f4'
  on-primary-fixed: '#001f25'
  on-primary-fixed-variant: '#004e5a'
  secondary-fixed: '#ffdea3'
  secondary-fixed-dim: '#ecc06a'
  on-secondary-fixed: '#261900'
  on-secondary-fixed-variant: '#5d4200'
  tertiary-fixed: '#dbe1ff'
  tertiary-fixed-dim: '#bcc5e8'
  on-tertiary-fixed: '#111a35'
  on-tertiary-fixed-variant: '#3d4662'
  background: '#131313'
  on-background: '#e2e2e2'
  surface-variant: '#353535'
typography:
  headline-xl:
    fontFamily: Sora
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Sora
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
    letterSpacing: -0.01em
  headline-lg-mobile:
    fontFamily: Sora
    fontSize: 28px
    fontWeight: '700'
    lineHeight: 34px
  headline-md:
    fontFamily: Sora
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  body-lg:
    fontFamily: Hanken Grotesk
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Hanken Grotesk
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-md:
    fontFamily: Geist
    fontSize: 14px
    fontWeight: '500'
    lineHeight: 20px
    letterSpacing: 0.05em
  label-sm:
    fontFamily: Geist
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.1em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 8px
  container-max: 1280px
  gutter: 24px
  margin-mobile: 16px
  margin-desktop: 40px
---

## Brand & Style
The design system embodies a futuristic, cosmic exploration aesthetic. It targets a tech-savvy audience seeking a high-end, immersive digital experience. The interface evokes feelings of wonder, precision, and the vastness of space.

The design style is **Futuristic Glassmorphism** set against a deep space backdrop. It utilizes high-contrast neon accents against a true black canvas to create a sense of infinite depth. Key visual motifs include celestial particles, thin luminous borders, and "frozen" translucent surfaces that suggest advanced technology operating in the void of space.

## Colors
The palette is built upon a foundation of absolute darkness to allow accent colors to vibrate with "electric" energy.

- **Base Background:** `#000000`. Use solid black for the primary canvas to maximize OLED efficiency and contrast.
- **Primary Accent (Cyan):** `#22D3EE`. Reserved for high-action items, titles, and active states. It represents the "energy source" of the UI.
- **Secondary Accent (Pale Gold):** `#FFD27A`. Used sparingly for highlights, achievements, and premium badges to provide a sophisticated warmth.
- **Main Text:** `#F5F7FA`. High-legibility off-white for all primary reading content.
- **Secondary Text:** `#9AA3C4`. A muted blue-gray for metadata, descriptions, and placeholder text.

## Typography
The typography system balances futuristic geometry with technical precision.

- **Headlines:** Uses **Sora**. Bold weights and tight tracking create a commanding, modern presence for titles and navigation hooks.
- **Body:** Uses **Hanken Grotesk**. A clean, contemporary sans-serif that ensures long-form readability without losing the high-tech feel.
- **Labels/Technical:** Uses **Geist**. Monospace-inspired characteristics are used for buttons, badges, and data points to reinforce the "developer-tool" or "cockpit" aesthetic.

## Layout & Spacing
The layout follows a **Fluid Grid** system that prioritizes negative space to simulate the vacuum of the cosmos.

- **Grid:** 12-column layout for desktop with 24px gutters. Elements should often span multiple columns to maintain a spacious, uncluttered feel.
- **Rhythm:** An 8px base unit drives all padding and margins. Use larger steps (e.g., 64px, 80px) between major sections to emphasize the "Eksplorasi" (Exploration) theme.
- **Responsive:** On mobile, margins shrink to 16px. Vertical stacks are preferred, with glassmorphic cards spanning the full width of the viewport minus the side margins.

## Elevation & Depth
Depth is created through transparency and light emission rather than traditional shadows.

- **Glassmorphism:** Use thin, semi-transparent layers for elevated surfaces like navbars and sidebars. Apply a `backdrop-filter: blur(12px)` and a background color of `rgba(255, 255, 255, 0.05)`.
- **Luminous Borders:** Instead of shadows, use 1px solid borders with low-opacity Cyan (`rgba(34, 211, 238, 0.3)`) to define the edges of containers.
- **Starfield Background:** The base layer of every page must feature a persistent, subtle starfield animation. Shooting stars should trigger occasionally as non-intrusive background events to maintain the "live" cosmic environment.

## Shapes
The shape language is "Soft-Tech." While the colors are sharp and electric, the container shapes are rounded to feel like ergonomic hardware.

- **Default Radius:** 0.5rem (8px).
- **Large Components:** Cards and main sections use 1rem (16px) to soften the high-contrast visuals.
- **Interaction Elements:** Buttons and tags use a fully rounded (pill) style when appropriate for action-oriented hierarchy.

## Components
- **Buttons:** Primary buttons are solid Cyan (`#22D3EE`) with black text (`#000000`) and a pill-shaped radius. Secondary buttons should be ghost-style with a Cyan border and text.
- **Navbar:** A fixed-top thin glassmorphic bar. Use a 1px border-bottom in `#22D3EE` with 20% opacity.
- **Cards:** Background: `rgba(255, 255, 255, 0.03)`. Border: 1px solid `rgba(34, 211, 238, 0.2)`. Cards should appear to "float" over the starfield.
- **Badges:** Use the Gold accent (`#FFD27A`) for badges. These should be small, high-contrast, and use the Label-sm typography.
- **Input Fields:** Dark background (`#0a0a0a`), Cyan bottom-border only, with the Cyan color glowing slightly (box-shadow) when focused.
- **Chips/Filters:** Outlined in Secondary Text (`#9AA3C4`), switching to solid Cyan on selection.