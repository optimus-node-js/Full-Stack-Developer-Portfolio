# Product Requirements — Rahul Vishwakarma Portfolio

## Original Problem Statement
Redesign full-stack developer portfolio with smooth aesthetic and great look & feel.
Update with latest details from uploaded resume.

### Subsequent User Requests
1. Fix Vercel deployment (`npm error ENOENT package.json` at root).
2. Split into multi-page architecture with smooth page transitions.
3. Replace Experience/Education timeline with a more creative, unique layout.
4. Make the Hero terminal interactive — type Linux commands, get hardcoded responses
   (NO real LLM), realistic typing animations.
5. Mobile responsive: ensure every section fits perfectly on mobile + smooth floated
   footer interactions.

## Stack
- Vite + React 18 + TypeScript
- Tailwind CSS + shadcn/ui
- Framer Motion (page transitions, micro-interactions)
- React Router v6
- Static frontend only (no backend, no DB)

## Implemented (Feb 2026)
- **Multi-page routing**: `/`, `/about`, `/journey`, `/work`, `/contact`, `/project/:id`,
  404 with Framer Motion `AnimatePresence` page transitions.
- **Interactive Terminal** (`InteractiveTerminal.tsx` + `terminal-knowledge.ts`):
  hardcoded responses for `help`, `whoami`, `about`, `skills`, `experience`,
  `projects`, `education`, `contact`, `ls`, `pwd`, `date`, `socials`, `clear`,
  `joke`, `hire`, `history`, `resume/cv` (triggers download), unknown → error.
  Keyboard: ArrowUp/Down history, Tab autocomplete, Ctrl+L clears.
- **ExperienceSwitcher** (`/journey`): Sidebar list of companies + animated detail
  panel — replaces traditional timeline. Mobile: horizontal scrollable tabs.
- **EducationCredentials**, **Involvement** sections on /journey.
- **Vercel fix**: `/app/vercel.json` configures `frontend/` as build dir.
- **Mobile polish (Feb 2026)**:
  - All pages: 0px horizontal overflow on 390×844 iPhone viewport, full vertical scroll.
  - Tailwind container: responsive padding `1rem → 1.5rem → 2rem`; added `xs` breakpoint at 400px.
  - Global: `html { overflow-x: hidden; width: 100% }` + `body { max-width: 100vw }` to prevent any rogue overflow.
  - PageShell: smaller mobile h1 (`text-[1.75rem] xs:text-[2rem]`), `overflow-x-hidden`,
    `pb-32 md:pb-24` for floating nav clearance.
  - HomePage hero: `text-[1.875rem] xs:text-[2.25rem] sm:text-6xl` h1, "Available for senior
    roles" pill collapses to compact form on mobile, floating Uptime/Patient badges repositioned.
  - Projects (Work page): removed nested `py-28`, filter row horizontally scrolls on mobile
    via `overflow-x-auto` + `scrollbar-hide` utility, project cards stack 1-col mobile.
  - SkillsModern, Involvement, Contact: removed redundant `py-28` and `px-6` since they're
    nested inside PageShell's container which handles padding.
  - About page stats: 2-col grid on mobile.
  - **MobileBottomNav redesigned**: 5 nav icons (44×44 tap targets) + chevron toggle that
    smoothly expands a Quick Actions panel (Email / LinkedIn / GitHub / Back to Top) using
    Framer Motion `layout` spring, pulse ring near page bottom, hides on scroll-down,
    reveals on scroll-up.

## Architecture
```
/app
├── vercel.json
└── frontend
    ├── package.json (framer-motion, react-router-dom)
    ├── vite.config.ts (port 3000)
    └── src
        ├── App.tsx — Router + AnimatePresence
        ├── components
        │   ├── Navigation.tsx (desktop pill nav)
        │   ├── MobileBottomNav.tsx (floating + expandable footer panel)
        │   ├── Footer.tsx (always visible, mobile-safe padding)
        │   ├── InteractiveTerminal.tsx
        │   ├── PageShell.tsx (page wrapper, transitions)
        │   ├── ExperienceSwitcher.tsx (creative non-timeline)
        │   └── ui/ (shadcn)
        ├── lib/terminal-knowledge.ts (hardcoded command logic)
        ├── pages/{HomePage,AboutPage,JourneyPage,WorkPage,ContactPage,...}.tsx
        └── data/resume-data.ts
```

## Testing Status
- ✅ `testing_agent_v3_fork` ran full frontend regression — all routes, terminal,
  ExperienceSwitcher, filters, theme toggle, mobile responsive: PASSED, 0 console errors.
- ✅ Manual mobile audit at 412×915: 0 horizontal overflow on all 5 routes.

## Backlog / P1
- Push to GitHub & verify Vercel deployment lands correctly.
- Cosmetic: ASCII border in welcome banner has slight monospace alignment
  drift (low priority).
- Theme toggle button could use a `data-testid` for E2E robustness.

## Backlog / P2
- Code-split the bundle (currently 1MB → suggest dynamic imports for heavy
  components, e.g., InteractiveTerminal lazy-loaded).
- Add contact form backend (currently form is static, no submission flow).

## Notes for Future Agents
- **NO real LLM** for terminal — explicit user requirement, all logic in
  `terminal-knowledge.ts`.
- Static frontend only — no backend integration was added or needed.
- Frontend serves on port 3000 via `vite build && vite preview --strictPort`.
