# Stellarum - Agent Instructions

## MANDATORY AGENT PROTOCOL: SKILLS & PROCESS INTEGRATION

Whenever you are coding, debugging, planning, or executing any task in this project:
1. **Never skip or bypass skills.** Invoke relevant skills BEFORE proposing solutions or editing files:
   - For UI / Frontend work: Read `DESIGN.md` first, then consult `.agents/skills/antislop-ui/SKILL.md`, `.agents/skills/frontend-ui-engineering/SKILL.md`, `hallmark`, `impeccable`.
   - For Bug Fixes: Consult `.agents/skills/systematic-debugging/SKILL.md`.
   - For Logic / Feature Implementation: Consult `.agents/skills/test-driven-development/SKILL.md`.
   - Before Completing: Consult `.agents/skills/verification-before-completion/SKILL.md`.
2. **Skills Location:** `.agents/skills/` (workspace) and `~/.gemini/skills/` (global).

<!-- antislop:start -->
## antislop: Mandatory AI Slop Filter (ALWAYS ACTIVE)

`antislop active: during (global preference).` is permanently enabled.
- No Em Dashes (`—`) anywhere in UI copy, headings, metadata, or JSON data.
- No decorative pill eyebrows above headings, no gradient display text, no blurred radial glow orbs, no fake pulsing status dots, no dead `href="#"` links.
- Respect WCAG AA contrast, keyboard navigation (`:focus-visible`, `Escape` on dialogs/drawers), `44px` minimum touch targets, and `prefers-reduced-motion: reduce`.
<!-- antislop:end -->

## Architecture Notes
- Next.js App Router + Tailwind CSS v4 (`src/app/globals.css`) + Three.js.
- Unified procedural Milky Way `SpaceDome` shared between landing/sub-pages (`SpaceDomeCanvas.js`) and `/tata-surya` (`SolarSystem3D.js`).
- Keep WebGL contexts minimal (never create one `WebGLRenderer` per card in a grid).
