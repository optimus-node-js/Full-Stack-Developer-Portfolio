# PRD — Rahul Vishwakarma Senior Full Stack Portfolio

## Original Problem Statement
Redesign full-stack developer portfolio with smooth aesthetic. Multi-page architecture,
creative experience layout, interactive hardcoded terminal, iPhone-native mobile polish.

### Subsequent User Requests (Feb 2026)
1. Fix Vercel deployment (root vercel.json).
2. Multi-page with Framer Motion transitions.
3. Replace timeline with creative Experience layout.
4. Interactive terminal with hardcoded Linux commands (NO real LLM).
5. Mobile perfection — content fits on small screens, smooth floated footer interaction.
6. Polished light + dark modes, beautiful theme transitions.
7. iPhone 17-style glassmorphism footer.
8. Dedicated per-project detail pages.
9. Remove "5,000+ patients" from overall stats — use "40,000+ UK patients" only in
   Script Assist UK context. Rewrite portfolio to reflect senior full stack framing.
10. Proper contextual icons for Experience tabs.

## Stack
Vite + React 18 + TypeScript, Tailwind CSS + shadcn/ui, Framer Motion, React Router v6.
Static frontend only — no backend.

## Implemented (Feb 2026)

### Architecture
- Multi-page routing: `/`, `/about`, `/journey`, `/work`, `/contact`,
  `/project/:slug`, 404 — with AnimatePresence transitions.
- `PageShell` wrapper: consistent headers, page transitions, responsive typography,
  mobile floating-nav clearance.

### Content / Resume Rewrite
- Stats reframed to senior-dev metrics: `5+ Years Engineering`, `7+ Production Systems
  Shipped`, `99.9% Uptime`, `0 Critical Data Breaches`.
- "5,000+ patients" removed from global stats; "40,000+ UK patients" used only in
  Script Assist UK experience and that specific project.
- Long-form bio reframed around multi-tenant SaaS, production reliability, performance,
  legacy stabilisation.
- Projects carry `slug`, `subtitle`, `longDescription`, `highlights`, `challenges`,
  `outcomes`, `role`, `status`, `duration`.

### Interactive Terminal (hardcoded, no LLM)
- Commands: help, whoami, about, skills, experience, projects, education, contact,
  ls, pwd, date, socials, history, clear, hire, joke, resume/cv.
- Keyboard: ArrowUp/Down history, Tab autocomplete, Ctrl+L clear.
- Theme-resilient: terminal always renders on its own dark chrome (beautiful in
  both light and dark modes).

### Creative Experience Layout
- `ExperienceSwitcher` with icon-per-company (lucide Stethoscope, GraduationCap,
  Code2, Rocket) — horizontal scroll on mobile, vertical list on lg+.

### Project Detail Page (`/project/:slug`)
- Rendered from `projectsData`: category/status badges, hero image, meta row (period,
  duration, role, status), long overview, highlights, challenges, outcomes, stack
  side rail, "other projects" grid at bottom.
- Projects list on Work page now links each card to its detail page.

### iPhone 17-style Footer
- Glass "island" with rounded 28–36px corners, specular highlight, ambient aurora
  glow behind, layered backdrop blur.
- Social pills with per-service gradient hover states, animated Back-to-top button.
- Motion: gentle scale/opacity on aurora orbs; staggered hover micro-interactions.

### Theme System
- Global smooth theme transition (0.5s cubic-bezier) on bg, color, borders.
- Circular theme toggle uses View Transitions API for iPhone-style circle reveal.
- Terminal pinned to dark chrome for readability in either theme.

### Mobile Perfection
- `html { overflow-x: hidden; width: 100% }`, `body { max-width: 100vw; overflow-x: clip }`,
  `#root { max-width: 100vw; overflow-x: clip }` — hard-locked to viewport.
- `viewport-fit=cover` + `maximum-scale=1` meta tag for iOS safe-area handling.
- Tailwind container: responsive padding `1rem → 1.5rem → 2rem`; `xs: 400px` breakpoint.
- PageShell h1 scaled `text-[1.75rem] xs:text-[2rem] sm:text-5xl lg:text-6xl`.
- HomePage h1 `text-[1.875rem] xs:text-[2.25rem] sm:text-6xl`.
- "Available for senior roles" pill collapses compactly on mobile.
- Floating Uptime/Critical-Breaches badges repositioned to stay in-viewport.
- Nested `py-28`/`px-6` removed from Projects, SkillsModern, Involvement, Contact
  (now inside PageShell's responsive container).
- About stats: 2-col on mobile.
- Work filters: horizontal-scroll on mobile (`scrollbar-hide` utility).
- Contact page: PageShell now owns label/eyebrow/title/subtitle — extra top spacing
  issue resolved.

### MobileBottomNav
- Floating glass pill with 5 nav icons (44×44 tap targets) + expandable chevron
  that reveals Quick Actions: Email / LinkedIn / GitHub / Back-to-Top.
- Pulse ring near page bottom, hides on scroll-down, reveals on scroll-up.

### Vercel Deploy
- `/app/vercel.json` points build to `frontend/`.

## Testing
- `testing_agent_v3_fork` baseline regression: all routes, terminal commands,
  filters, theme toggle, mobile responsive → PASSED.
- Manual mobile audit at 375×667 and 390×844: 0 horizontal overflow on every route.

## Backlog / P1
- Verify Vercel deployment after user pushes to GitHub.

## Backlog / P2
- Code-split the 1MB bundle (lazy-load InteractiveTerminal).
- Wire Contact form to a real mail/webhook backend.
- Add `data-testid` on theme toggle for E2E robustness.

## Notes for Future Agents
- **No real LLM** in terminal — hardcoded logic in `terminal-knowledge.ts` only.
- `5,000+` patients is out of general framing — only `40,000+` in Script Assist UK context.
- Terminal keeps its own dark chrome (intentional — reads better in both themes).
