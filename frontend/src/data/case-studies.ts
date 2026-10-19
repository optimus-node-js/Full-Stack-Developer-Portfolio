export interface CaseStudyPhase {
  name: string;
  window?: string;
  detail: string;
}

export interface CaseStudyLayer {
  layer: string;
  detail: string;
}

export interface CaseStudyDecision {
  title: string;
  why: string;
  tradeoff: string;
}

export interface CaseStudy {
  slug: string;
  title: string;
  tagline: string;
  company: string;
  role: string;
  timeline: string;
  domain: string;
  readingTime: string;
  projectSlug?: string;
  summary: string;
  metrics: { value: string; label: string }[];
  context: string;
  problem: string;
  constraints: string[];
  phases: CaseStudyPhase[];
  architecture: CaseStudyLayer[];
  decisions: CaseStudyDecision[];
  security: string[];
  performance: string[];
  results: string[];
  lessons: string[];
  stack: string[];
}

export const caseStudies: CaseStudy[] = [
  {
    slug: 'services-marketplace-in-4-months',
    title: 'Shipping an entire services marketplace in 4 months',
    tagline: 'Hind Social · Services Module',
    company: 'Hind Social',
    role: 'Module owner — schema, APIs, vendor, customer & admin UI',
    timeline: 'Jun – Sep 2026 · live 30 Sep 2026',
    domain: 'Marketplace · Bookings',
    readingTime: '7 min read',
    projectSlug: 'hind-social-services-module',
    summary:
      'Hind Social needed a complete services marketplace inside its existing platform: providers create and sell services, customers discover, book and track them. I owned the whole module end-to-end and shipped it to production on the committed deadline.',
    metrics: [
      { value: '4 mo', label: 'Concept to production' },
      { value: '3', label: 'Service types in one engine' },
      { value: '30 Sep', label: 'Shipped on deadline' },
      { value: '1000s', label: 'Bookings it is built for' },
    ],
    context:
      'Hind Social is a community platform with groups, events, chat and a content library. The Services Module turns it into a marketplace: any approved provider can list a service, and any member can book it. It is effectively a product of its own, living inside the main platform and sharing its users, auth and design system.',
    problem:
      'Build a production-grade marketplace — catalogue, discovery, booking, provider operations and admin control — that handles very different kinds of services, keeps every user inside their own permissions, stays fast as volume grows, and lands on a fixed date.',
    constraints: [
      'Fixed go-live date of 30 September 2026, with no room to slip',
      'Three service types with different booking rules: short (slot-based), long-duration and delivery-based',
      'Must plug into existing users, auth and UI without breaking other modules',
      'Consumer traffic is mobile-heavy, much of it on iPhone Safari',
      'Money and bookings are involved, so authorization mistakes are not acceptable',
    ],
    phases: [
      { name: 'Model the domain', window: 'Weeks 1–2', detail: 'Mapped providers, services, service types, collections, categories, banners and bookings. Designed one schema where the three service types share a core and differ only where their booking rules differ.' },
      { name: 'Secure API foundation', window: 'Weeks 3–6', detail: 'Built the API layer with role, hierarchy and ownership checks from the first endpoint, so security was never retrofitted. CRUD for services, collections, categories and banners.' },
      { name: 'Booking engine & flows', window: 'Weeks 6–11', detail: 'Booking flows per service type, provider-side booking management and a customer "My Bookings" area. Validation at every state change.' },
      { name: 'Performance & hardening', window: 'Weeks 11–14', detail: 'Caching on hot read paths, query and index tuning, pagination on heavy lists, and a pass for unauthorized-access paths across every endpoint.' },
      { name: 'Polish & launch', window: 'Weeks 14–17', detail: 'Mobile-responsive pass on every screen, Safari and iOS fixes, admin tooling for banners and curation, then production release on 30 September.' },
    ],
    architecture: [
      { layer: 'Experience', detail: 'Vendor studio with multi-step service creation, customer discovery & booking, My Bookings, admin curation. Fully responsive with full Safari/iOS (WebKit) compatibility.' },
      { layer: 'Access control', detail: 'ACL/RBAC across three tiers (admin › vendor › customer) + per-resource ownership checks on every service, collection, category and booking request.' },
      { layer: 'Vendor & admin ops', detail: 'Strict vendor verification workflow (only verified vendors can publish or accept bookings) and admin earnings management.' },
      { layer: 'Domain services', detail: 'Service catalogue, three booking strategies (slot, long-duration, delivery), collections, categories, banners and booking lifecycle.' },
      { layer: 'Performance', detail: 'Caching on hot reads, tuned queries and indexes, paginated listings so response times stay flat as data grows.' },
      { layer: 'Data', detail: 'Relational schema with a shared service core and type-specific booking data, designed for thousands of booking transactions.' },
    ],
    decisions: [
      { title: 'One booking engine, three strategies', why: 'Short, long and delivery services share 80% of their lifecycle. A shared core with per-type strategies avoided three parallel codebases.', tradeoff: 'More upfront design time in weeks 1–2, repaid every time a feature landed once instead of three times.' },
      { title: 'Security in the first endpoint, not the last sprint', why: 'Retrofitting authorization onto dozens of endpoints right before launch is where breaches come from.', tradeoff: 'Slightly slower early velocity; no security rewrite at the end.' },
      { title: 'Cache reads, never cache authorization', why: 'Listings and categories are read-heavy and safe to cache; permission decisions must always be fresh.', tradeoff: 'Two code paths to reason about, clearly separated.' },
      { title: 'Safari as a first-class target', why: 'A large share of consumer traffic is iPhone Safari, where layout and date handling differ most.', tradeoff: 'Extra test passes per screen, but no "works on my Chrome" launch bugs.' },
    ],
    security: [
      'ACL/RBAC across three user tiers so admins, vendors and customers each see and change only what they are allowed to — for services, collections and categories',
      'Strict vendor verification: unverified vendors cannot publish services or accept bookings',
      'Strict server-side validation and input sanitization on every create and update, including multi-step service creation',
      'Ownership verified server-side on every service and booking resource — IDs from the client are never trusted on their own',
      'Validation at each layer (request, domain, data) to block malformed or malicious input',
      'Admin-only surfaces (banners, curation) isolated behind their own permission checks',
    ],
    performance: [
      'Caching on hot read paths such as listings, categories and collections',
      'Query and index tuning on booking and discovery endpoints',
      'Pagination on every list that can grow without bound',
      'Lean payloads for mobile networks',
    ],
    results: [
      'Entire Services Module live in production on 30 September 2026 — on the committed date, no scope cut',
      'Three service types running on one booking engine',
      'Production-grade module designed for thousands of booking transactions',
      'Admin earnings management and verified-vendor flows live alongside bookings',
      'Full Safari/iOS compatibility — no Safari-specific UI breakages across desktop, Android and iPhone'
    ],
    lessons: [
      'A fixed deadline is a scoping problem first and a coding problem second — slice vertically and keep something shippable every week.',
      'Designing the permission model before the endpoints is what makes a big module safe to ship fast.',
    ],
    stack: ['Next.js', 'Node.js', 'TypeScript', 'PostgreSQL', 'REST APIs', 'RBAC', 'Caching'],
  },
  {
    slug: 'multi-tenant-healthcare-saas',
    title: 'Scaling a multi-tenant healthcare SaaS with zero data breaches',
    tagline: 'Script Assist UK · Healthcare platform',
    company: 'Script Assist UK',
    role: 'Full Stack Developer — architecture, production, security',
    timeline: 'Nov 2024 – May 2026',
    domain: 'Healthcare · Multi-tenant SaaS',
    readingTime: '6 min read',
    projectSlug: 'multi-tenant-healthcare-saas',
    summary:
      'A UK healthcare platform used by 20+ clinics and pharmacies with 40,000+ patients. I worked across the stack to scale it while keeping every organisation’s data strictly isolated, 99.9% uptime and zero critical data breaches.',
    metrics: [
      { value: '20+', label: 'Clinics & pharmacies' },
      { value: '40k+', label: 'UK patients' },
      { value: '99.9%', label: 'Uptime on GCP' },
      { value: '0', label: 'Critical data breaches' },
    ],
    context:
      'Clinics and pharmacies run consultations, prescriptions, inventory and appointments on one shared platform. Each organisation must only ever see its own patients, and clinical workflows cannot go down during the working day.',
    problem:
      'Grow the platform to more organisations and patients without risking cross-tenant data leaks, without downtime during migrations, and while stabilising a legacy codebase that was producing production issues.',
    constraints: [
      'Patient data — any cross-organisation leak is a serious incident',
      'Live clinical usage, so migrations and deploys must not interrupt work',
      'Legacy code with known fragile paths',
      'Small team owning everything from database to mobile apps',
    ],
    phases: [
      { name: 'Stabilise', detail: 'Triaged recurring production issues, fixed fragile legacy paths and optimised the slowest queries first.' },
      { name: 'Enforce isolation', detail: 'Strengthened tenant scoping and ACL checks so every query and endpoint is bound to the caller’s organisation.' },
      { name: 'Scale safely', detail: 'Ran PostgreSQL migrations in backwards-compatible steps so new code and old code could run side by side during rollout.' },
      { name: 'Extend', detail: 'Improved the RJSF form engine and shipped Android & iOS patient apps on the same codebase.' },
    ],
    architecture: [
      { layer: 'Clients', detail: 'React web app for staff, Capacitor-based Android & iOS apps for patients, sharing one TypeScript codebase.' },
      { layer: 'Access control', detail: 'ACL-based permissions, scoped to organisation and role, enforced on every request.' },
      { layer: 'Application', detail: 'Node.js + TypeScript services for consultations, prescriptions, inventory, appointments and dynamic forms.' },
      { layer: 'Jobs', detail: 'Critical cron workflows for prescriptions, inventory allocation and appointments.' },
      { layer: 'Data & cloud', detail: 'PostgreSQL with tenant-scoped data, deployed and operated on Google Cloud Platform.' },
    ],
    decisions: [
      { title: 'Tenant scope is not optional', why: 'Isolation enforced only in the UI or by convention eventually fails. It has to be part of every data access.', tradeoff: 'Every new query needs the scope — enforced by review and shared helpers.' },
      { title: 'Expand-then-contract migrations', why: 'Clinics work all day; a blocking migration is an outage.', tradeoff: 'Migrations take more steps, but deploys never stop the clinic.' },
      { title: 'Fix the noisiest issues first', why: 'A few fragile paths caused most incidents.', tradeoff: 'Some cleanup waited, but incident volume dropped fastest this way.' },
    ],
    security: [
      'Strict cross-organisation data isolation at the data-access layer',
      'ACL-based security per organisation and role',
      'Zero critical data breaches across the platform during my time there',
    ],
    performance: [
      'Hot-path query and index optimisation',
      'Performance work on large dynamic RJSF forms',
      'Reliability hardening of critical cron workflows',
    ],
    results: [
      '20+ clinics and pharmacies, 40,000+ patients on the live platform',
      '99.9% uptime across client environments',
      'Zero critical data breaches',
      'Fewer production issues after targeted legacy and query fixes',
    ],
    lessons: [
      'In regulated domains, the safest code path has to be the easiest one to write.',
      'Reliability is mostly boring discipline: small migrations, idempotent jobs, and watching the right signals.',
    ],
    stack: ['TypeScript', 'Node.js', 'React', 'PostgreSQL', 'Zustand', 'GCP', 'RJSF', 'Capacitor'],
  },
  {
    slug: 'ai-agent-whatsapp-in-a-day',
    title: 'A production-ready AI agent on WhatsApp — in one day',
    tagline: 'Hind Social · AI Agent PoC',
    company: 'Hind Social',
    role: 'Sole engineer — research, design, build',
    timeline: '2026 · built in 1 day',
    domain: 'AI · Conversational agents',
    readingTime: '5 min read',
    projectSlug: 'ai-agent-whatsapp',
    summary:
      'Designed and built, alone and in a single day, an AI agent that lets users run real Hind Social operations over WhatsApp: authenticate, query data, register for events, book services and get personalised answers.',
    metrics: [
      { value: '1 day', label: 'Idea to working PoC' },
      { value: 'Real', label: 'Platform operations, not FAQ' },
      { value: '3', label: 'Channels the design supports' },
      { value: 'Solo', label: 'Designed & built' },
    ],
    context:
      'Many users live in WhatsApp. The question was whether they could use the platform without opening the app — not a chatbot answering FAQs, but an agent that actually performs actions.',
    problem:
      'Prove, quickly and convincingly, that an LLM agent can safely execute real backend operations for authenticated users through a messaging channel.',
    constraints: [
      'One day to go from idea to a working demo',
      'Actions must respect the same auth and permissions as the app',
      'Architecture should extend to Instagram and Facebook Messenger later',
    ],
    phases: [
      { name: 'Design the tool surface', detail: 'Picked the operations worth exposing (lookups, event registration, service booking, library actions) and defined them as typed tools.' },
      { name: 'Wire the channel', detail: 'Connected Twilio’s WhatsApp API to a Node.js webhook that keeps per-user conversation context.' },
      { name: 'Agent loop', detail: 'OpenAI model detects intent, calls tools, reads results and answers — with authentication resolved before any action runs.' },
      { name: 'Demo on real flows', detail: 'Ran end-to-end scenarios against the real backend: register for an event, book a service, ask personal questions.' },
    ],
    architecture: [
      { layer: 'Channel', detail: 'WhatsApp via Twilio; adapter pattern so Instagram / Messenger can be added.' },
      { layer: 'Agent', detail: 'OpenAI GPT with tool calling: intent detection, multi-step tool use, natural replies.' },
      { layer: 'Tools', detail: 'Typed functions wrapping platform APIs — CRUD, event registration, service booking, lookups.' },
      { layer: 'Auth', detail: 'User identity resolved from the channel and checked before any tool executes.' },
      { layer: 'Platform', detail: 'Existing Hind Social backend and database via REST APIs.' },
    ],
    decisions: [
      { title: 'Tools, not free-form SQL', why: 'Letting a model act only through typed, permission-checked functions keeps it powerful but bounded.', tradeoff: 'Each new capability needs a tool definition — which is exactly the review point you want.' },
      { title: 'Channel adapter from day one', why: 'The business wanted Instagram and Messenger next.', tradeoff: 'A thin abstraction layer in a one-day build; cheap insurance.' },
    ],
    security: [
      'Authentication resolved before any tool call',
      'Agent can only act through explicit, permission-checked tools',
      'No direct database access from the model',
    ],
    performance: [
      'Minimal tool payloads to keep latency and token cost low',
      'Context kept per user conversation to avoid re-asking',
    ],
    results: [
      'Working, production-ready PoC delivered in a single day',
      'Users completed real operations from one WhatsApp message',
      'Reusable agent framework for future channels',
    ],
    lessons: [
      'The hard part of agents is not the model, it is the tool boundary and the permissions around it.',
    ],
    stack: ['OpenAI GPT', 'Tool Calling', 'Twilio', 'WhatsApp API', 'Node.js', 'Next.js'],
  },
  {
    slug: 'one-codebase-three-platforms',
    title: 'One codebase, three platforms — and a Play Store approval',
    tagline: 'Script Assist & Hind Social · Mobile',
    company: 'Script Assist UK · Hind Social',
    role: 'Mobile & web engineer',
    timeline: '2025 – 2026',
    domain: 'Mobile · Capacitor',
    readingTime: '4 min read',
    projectSlug: 'patient-mobile-apps',
    summary:
      'Shipped Android and iOS patient apps from the same React/TypeScript codebase as the web platform, serving 5,000+ patient app users — and later got Hind Social’s long-stuck Capacitor app approved on Google Play.',
    metrics: [
      { value: '1', label: 'Shared codebase' },
      { value: '3', label: 'Platforms: web, Android, iOS' },
      { value: '5,000+', label: 'Patient app users' },
      { value: '✓', label: 'Google Play approval' },
    ],
    context:
      'Building separate native apps would have doubled the work for a small team. Capacitor lets a web codebase ship to both stores — if the native details are handled properly.',
    problem:
      'Deliver native-feeling apps without a separate mobile team, and unblock a store submission that the team had been stuck on for a long time.',
    constraints: [
      'Small team, no dedicated iOS/Android engineers',
      'Store review requirements on both platforms',
      'Older Android devices in the patient base',
    ],
    phases: [
      { name: 'Shared architecture', detail: 'Kept business logic and UI shared; isolated native concerns behind small adapters.' },
      { name: 'Native details', detail: 'Deep links, splash and icons, signing, provisioning profiles and OS-specific UX tuning.' },
      { name: 'Release pipeline', detail: 'Reproducible builds and submissions for both stores.' },
      { name: 'Unblock Hind Social', detail: 'Rebuilt the Capacitor setup around a Next.js WebView architecture and got Play Store approval.' },
    ],
    architecture: [
      { layer: 'UI', detail: 'Shared React + TypeScript components for web and mobile.' },
      { layer: 'Native bridge', detail: 'Capacitor plugins for deep links and device features.' },
      { layer: 'Delivery', detail: 'Signed Android & iOS builds with a repeatable release process.' },
    ],
    decisions: [
      { title: 'Capacitor over a separate native app', why: 'One team, one codebase, features land everywhere at once.', tradeoff: 'Some native polish needs extra care — handled per platform where it mattered.' },
    ],
    security: ['Same auth and permission model as the web platform', 'Signed builds and managed credentials for both stores'],
    performance: ['Mobile-first flows and lean payloads', 'Tuned UX for older Android devices'],
    results: [
      'Android & iOS patient apps live, serving 5,000+ patient app users',
      'Google Play approval for Hind Social after a long-stalled effort',
      'A reproducible mobile release pipeline',
    ],
    lessons: ['Cross-platform works when you respect each platform’s rules instead of fighting them.'],
    stack: ['Capacitor', 'React', 'Next.js', 'TypeScript', 'iOS', 'Android'],
  },
  {
    slug: 'critical-cron-workflows',
    title: 'Keeping prescriptions, inventory and appointments running at 99.9%',
    tagline: 'Script Assist UK · Production reliability',
    company: 'Script Assist UK',
    role: 'Owner of critical scheduled workflows on GCP',
    timeline: 'Nov 2024 – May 2026',
    domain: 'Reliability · Cloud operations',
    readingTime: '4 min read',
    projectSlug: 'healthcare-cron-workflows',
    summary:
      'Owned the scheduled jobs that clinics depend on — prescription processing, inventory allocation and appointments — plus deployments and PostgreSQL migrations on Google Cloud, keeping 99.9% uptime.',
    metrics: [
      { value: '99.9%', label: 'Uptime' },
      { value: '3', label: 'Critical workflow families' },
      { value: '20+', label: 'Client environments' },
      { value: '0', label: 'Critical breaches' },
    ],
    context:
      'Some jobs touch patient care directly. A prescription job that runs twice, or silently does not run, is a real-world problem, not just a bug.',
    problem: 'Make critical scheduled workflows predictable across many tenants, and deploy changes without interrupting them.',
    constraints: ['Jobs must never double-run or silently skip', 'Same workflows across tenants with different data', 'Deploys during active clinical use'],
    phases: [
      { name: 'Map failure modes', detail: 'Listed how each job could fail: partial runs, retries, overlapping schedules, bad data.' },
      { name: 'Make jobs safe to re-run', detail: 'Designed jobs so a retry continues safely instead of duplicating work.' },
      { name: 'Visibility', detail: 'Made failures visible to the team quickly, before clinics noticed.' },
      { name: 'Safe change', detail: 'Backwards-compatible migrations and careful deploys around job windows.' },
    ],
    architecture: [
      { layer: 'Scheduler', detail: 'Cron workflows for prescriptions, inventory allocation and appointments.' },
      { layer: 'Job logic', detail: 'Tenant-aware, re-runnable job steps in Node.js + TypeScript.' },
      { layer: 'Data', detail: 'PostgreSQL with migrations rolled out in compatible steps.' },
      { layer: 'Cloud', detail: 'Google Cloud Platform deployments per client environment.' },
    ],
    decisions: [
      { title: 'Idempotent by design', why: 'Retries are inevitable; duplicates are unacceptable.', tradeoff: 'More careful job design up front.' },
    ],
    security: ['Tenant-scoped job execution', 'ACL-based access to job-triggered operations'],
    performance: ['Batched work per tenant', 'Query tuning on job hot paths'],
    results: ['99.9% uptime across client environments', 'Predictable critical workflows for 20+ clinics and pharmacies'],
    lessons: ['If a job matters, assume it will be retried and design for that on day one.'],
    stack: ['Node.js', 'TypeScript', 'PostgreSQL', 'GCP', 'Cron'],
  },
  {
    slug: 'blue-team-security-assessment',
    title: 'Assessing a live social platform like an attacker would',
    tagline: 'Hind Social · Blue Team',
    company: 'Hind Social',
    role: 'Blue Team contributor',
    timeline: '2026',
    domain: 'Security · OWASP',
    readingTime: '4 min read',
    projectSlug: 'hind-social-security-assessment',
    summary:
      'Identified 50+ vulnerabilities and hardening opportunities. Reviewed Hind Social from a defender’s point of view — auth, authorization, input handling, data exposure — mapped findings to OWASP, prioritised fixes and wrote the security documentation the team uses.',
    metrics: [
      { value: '50+', label: 'Vulnerabilities identified' },
      { value: 'Ranked', label: 'By real-world impact' },
      { value: 'Docs', label: 'Adopted by the team' },
      { value: '→', label: 'Fed into Services Module' },
    ],
    context: 'A growing social platform with user content, events, payments-adjacent flows and admin tools has a wide attack surface.',
    problem: 'Find the weaknesses that matter most and turn them into fixes the team can actually ship.',
    constraints: ['Live platform with real users', 'Findings must be actionable, not a generic checklist'],
    phases: [
      { name: 'Scope the surface', detail: 'Listed user-facing, admin and API surfaces.' },
      { name: 'Assess', detail: 'Reviewed authentication, authorization, validation, data exposure and configuration.' },
      { name: 'Prioritise', detail: 'Mapped findings to OWASP categories and ranked by impact.' },
      { name: 'Document', detail: 'Wrote remediation guidance and security documentation.' },
    ],
    architecture: [
      { layer: 'Surfaces', detail: 'Web app, APIs, admin tools.' },
      { layer: 'Controls reviewed', detail: 'Auth, session handling, authorization, input validation, data exposure, configuration.' },
      { layer: 'Output', detail: 'Prioritised findings, remediation steps, security docs.' },
    ],
    decisions: [
      { title: 'Impact over volume', why: 'Fifty low-risk findings help less than five fixed high-risk ones.', tradeoff: 'Some minor items deliberately deferred.' },
    ],
    security: ['OWASP-based assessment', 'Threat analysis of user and admin surfaces', 'Authorization review across APIs'],
    performance: [],
    results: ['50+ vulnerabilities and hardening opportunities identified and prioritised', 'Security docs adopted by the team', 'Layered access-control patterns reused in the Services Module'],
    lessons: ['Most serious issues are authorization issues — which is why I design permissions first now.'],
    stack: ['OWASP', 'Threat Modeling', 'API Security', 'Node.js'],
  },
  {
    slug: 'notification-orchestration',
    title: 'Event-driven notifications that scale with the product',
    tagline: 'Hind Social · Novu',
    company: 'Hind Social',
    role: 'Notification engineering',
    timeline: '2026',
    domain: 'Workflow automation',
    readingTime: '3 min read',
    projectSlug: 'novu-notification-workflows',
    summary:
      'Built notification workflows on Novu, an open-source notification platform: platform events feed trigger pipelines that decide who gets notified, how and when — so new notification types plug in without rewriting delivery.',
    metrics: [
      { value: 'Event', label: 'Driven pipelines' },
      { value: 'Reusable', label: 'Workflows' },
      { value: 'Decoupled', label: 'From features' },
      { value: '↑', label: 'Easier to extend' },
    ],
    context: 'Bookings, events and community activity all need to reach users at the right moment without spamming them.',
    problem: 'Stop every feature from hand-rolling its own notifications.',
    constraints: ['Avoid duplicate or noisy notifications', 'Keep features unaware of delivery details'],
    phases: [
      { name: 'Define events', detail: 'Agreed on the platform events worth notifying about.' },
      { name: 'Build triggers', detail: 'Trigger pipelines map events to audiences and templates.' },
      { name: 'Orchestrate', detail: 'Workflows handle timing and channel selection.' },
    ],
    architecture: [
      { layer: 'Producers', detail: 'Features emit domain events (booking, registration, activity).' },
      { layer: 'Triggers', detail: 'Pipelines match events to audiences and templates.' },
      { layer: 'Delivery', detail: 'Novu handles notification orchestration and multi-channel delivery.' },
    ],
    decisions: [
      { title: 'Emit events, don’t send notifications', why: 'Features stay simple; notification logic lives in one place.', tradeoff: 'One more layer to understand — far fewer places to change.' },
    ],
    security: ['Notifications only reach users entitled to the underlying data'],
    performance: ['Asynchronous delivery keeps user requests fast'],
    results: ['New notification types plug into existing pipelines', 'Users hear about bookings and events at the right time'],
    lessons: ['Notifications are a product surface — design them, don’t bolt them on.'],
    stack: ['Novu', 'Node.js', 'TypeScript', 'Event pipelines'],
  },
  {
    slug: 'multi-school-management-saas',
    title: 'One backend, many schools, no data leaks',
    tagline: 'Student Diwan · Education SaaS',
    company: 'Student Diwan',
    role: 'Full Stack Developer',
    timeline: 'May 2024 – Feb 2025',
    domain: 'Education · Multi-tenant SaaS',
    readingTime: '3 min read',
    projectSlug: 'school-management-saas',
    summary:
      'Built a multi-tenant school management system used by multiple institutions — role-based access for students, teachers and admins, and modules for attendance, fees, academics and administration.',
    metrics: [
      { value: 'Multi', label: 'Institutions on one backend' },
      { value: '3', label: 'Roles: student, teacher, admin' },
      { value: '4', label: 'Core modules' },
      { value: '0', label: 'Cross-school leakage' },
    ],
    context: 'Several schools share one platform; each runs its own students, staff, fees and academic calendar.',
    problem: 'Support concurrent multi-school operations with clean isolation and role-aware access.',
    constraints: ['Concurrent use across schools', 'Workflows that vary by institution'],
    phases: [
      { name: 'Tenant model', detail: 'School-scoped data model and role-aware access.' },
      { name: 'Core modules', detail: 'Attendance, fees, academics and admin workflows.' },
      { name: 'Scale', detail: 'Kept queries predictable as institutions were added.' },
    ],
    architecture: [
      { layer: 'Clients', detail: 'React dashboards per role.' },
      { layer: 'Auth & RBAC', detail: 'Secure authentication with student / teacher / admin roles.' },
      { layer: 'Modules', detail: 'Attendance, fees, academics, administration.' },
      { layer: 'Data', detail: 'School-scoped data with Node.js APIs.' },
    ],
    decisions: [
      { title: 'Tenant-aware from the start', why: 'Adding isolation later to a school system is a rewrite.', tradeoff: 'Slightly more complex queries everywhere.' },
    ],
    security: ['Role-based access per school', 'Tenant-aware data scopes'],
    performance: ['Predictable query performance as tenant count grew'],
    results: ['Multiple institutions onboarded onto one backend', 'Stable under concurrent multi-school load'],
    lessons: ['Multi-tenancy is a data-model decision, not a feature.'],
    stack: ['Node.js', 'React', 'MongoDB', 'REST APIs', 'RBAC'],
  },
];

/** Requirement → proof. Used to answer "can he do X?" at a glance. */
export const capabilityMap: { need: string; proof: string; slug: string }[] = [
  { need: 'Ship a large module on a hard deadline', proof: 'Entire services marketplace in 4 months — 3-tier ACL, verified vendors, on the date', slug: 'services-marketplace-in-4-months' },
  { need: 'Multi-tenant SaaS with strict data isolation', proof: '20+ clinics, 40k+ patients, zero critical breaches', slug: 'multi-tenant-healthcare-saas' },
  { need: 'AI agents & LLM integrations', proof: 'WhatsApp agent running real operations, built in under 24 hours', slug: 'ai-agent-whatsapp-in-a-day' },
  { need: 'Web + Android + iOS from one team', proof: 'One codebase, three platforms, Play Store approval', slug: 'one-codebase-three-platforms' },
  { need: 'Keep critical production systems up', proof: '99.9% uptime on critical healthcare workflows', slug: 'critical-cron-workflows' },
  { need: 'Security review & hardening', proof: '50+ vulnerabilities found in a live-platform Blue Team review', slug: 'blue-team-security-assessment' },
  { need: 'Event-driven workflows & notifications', proof: 'Trigger pipelines on Novu, decoupled from features', slug: 'notification-orchestration' },
  { need: 'Role-based platforms for many organisations', proof: 'Multi-school SaaS with student / teacher / admin roles', slug: 'multi-school-management-saas' },
];

export const availability = {
  immediateJoiner: true,
  headline: 'Immediate joiner',
  detail: 'Available now — no notice period. Last role ended Oct 2026.',
  modes: ['Full-time', 'Remote', 'Hybrid'],
  base: 'Ahmedabad, India (IST)',
  timezones: 'Experienced working with UK (GMT/BST) and Qatar (AST) teams',
};
