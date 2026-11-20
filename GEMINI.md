# Stellarum - Gemini Project Rules

## MANDATORY AGENT PROTOCOL: SKILLS & PROCESS INTEGRATION

Whenever you are coding, debugging, planning, or executing any task in this project:
1. **Never skip or bypass skills.** Invoke relevant skills BEFORE proposing solutions or editing files:
   - For UI / Frontend work: Consult `.agents/skills/antislop-ui/SKILL.md`, `.agents/skills/frontend-ui-engineering/SKILL.md`, `hallmark`, `impeccable`.
   - For Bug Fixes: Consult `.agents/skills/systematic-debugging/SKILL.md` (root-cause tracing, no guessing).
   - For Logic / Feature Implementation: Consult `.agents/skills/test-driven-development/SKILL.md` (write failing test first, make it green, then refactor).
   - For Multi-step Tasks: Consult `.agents/skills/writing-plans/SKILL.md` and track tasks using a task artifact.
   - Before Completing: Consult `.agents/skills/verification-before-completion/SKILL.md` (run verification commands and confirm output before claiming done).
2. **Global & Local Skills:** All 48 skills are available in `.agents/skills/` (workspace) and `~/.gemini/skills/` (machine-wide).
3. **Design Direction:** Always read `DESIGN.md` before building or modifying any UI surface.

<!-- antislop:start -->
## antislop: Mandatory AI Slop Filter (ALWAYS ACTIVE)

`antislop active: during (global preference).` is permanently enabled.
Follow these rules whenever generating or modifying UI, copy, design, or code. The result must feel **crafted by a bespoke designer**, never like generic AI output.

### 1. Hard Gates (Zero-Tolerance Violations)
- **No Em Dashes (`—`):** Never use em dashes in text copy or headings (violates R-02). Use commas, periods, colons, or clean parentheses instead.
- **No Raw Unicode Astrological / Emoticon Glyphs in Text:** Never sprinkle raw emoji or Unicode symbols in headings, badges, or buttons (violates R-16/R-20). Use custom SVGs or purposeful icons only when required.
- **No Generic AI Jargon:** Ban generic AI buzzwords ("unleash", "elevate", "cutting-edge", "seamless", "tapestry", "nestled", "delve", "testament").
- **No Floating Capsule Pill Badges:** Never park decorative pill badges with sparkle icons above headings.
- **No Decorative Arrow Overuse:** Do not slap arrows on every button, card, or link without functional navigation necessity.

### 2. Visual Identity & Surface Craft
- **Open-Sky Observatory Depth:** Never block the procedural `SpaceDome` Milky Way starfield with opaque grey wall cards or large blurred glow orbs. Cap `backdrop-blur-md` to focal overlays (HUD, drawers, modals).
- **Single-Canvas WebGL Discipline:** Never spawn multiple simultaneous `WebGLRenderer` instances inside card grids. Keep active WebGL contexts minimal and release GPU resources on unmount.
- **The Purpose Test:** Every visual element, color, border, card, and animation must have a written purpose.

### 3. Antislop Skill Mapping
- UI / visual: `.agents/skills/antislop-ui/SKILL.md`
- Copy & text: `.agents/skills/antislop-copywriting/SKILL.md`
- Accessibility & Human: `.agents/skills/antislop-human/SKILL.md`
- Mobile & Responsive: `.agents/skills/antislop-layoutmobile/SKILL.md`
- Code Comments: `.agents/skills/antislop-code/SKILL.md`
<!-- antislop:end -->

## Project Architecture (Stellarum)
- **Framework:** Next.js App Router (JavaScript), React 19, Tailwind CSS v4 (`@theme` in `src/app/globals.css`), Three.js.
- **Routes:** `/` (Landing Portal), `/tata-surya` (Fullscreen 3D Solar System Observatory), `/planet`, `/galaksi`, `/teknologi` (`/landingpage` redirects to `/`).
- **Unified Sky Dome:** `src/app/lib/celestialMath.js` + `src/app/data/brightStars.js` power both `SpaceDomeCanvas.js` and the skybox inside `SolarSystem3D.js`.
- **Single Source of Truth for Celestial Bodies:** `src/app/data/solarObjects.js`.
