export interface Skill {
  name: string;
}

export interface SkillCategory {
  title: string;
  icon: string;
  skills: Skill[];
}

export interface Project {
  slug: string;
  title: string;
  subtitle?: string;
  description: string;
  longDescription?: string;
  image: string;
  technologies: Skill[];
  link?: string;
  github?: string;
  period: string;
  duration?: string;
  role?: string;
  status?: string;
  category: string[];
  highlights?: string[];
  challenges?: string[];
  outcomes?: string[];
  featured?: boolean;
  metrics?: { value: string; label: string }[];
}

export interface Experience {
  title: string;
  company: string;
  location?: string;
  period: string;
  description: string[];
  stack?: string[];
  icon?: string;
  accent?: string;
}

export interface Education {
  title: string;
  institution: string;
  location: string;
  year: string;
  grade: string;
}

export interface Certification {
  title: string;
  issuer: string;
  year: string;
  description?: string;
}

export interface Involvement {
  title: string;
  organization: string;
  period: string;
  description: string;
  icon: string;
}

export interface ContactInfo {
  location: string;
  email: string;
  phone: string;
  degree: string;
  linkedin: string;
  github: string;
}

// Skills Data
export const skillsData: SkillCategory[] = [
  {
    title: "Languages",
    icon: "fas fa-code",
    skills: [
      { name: "TypeScript" },
      { name: "JavaScript" },
      { name: "PHP" },
      { name: "SQL" },
      { name: "HTML5" },
      { name: "CSS3" }
    ]
  },
  {
    title: "Frontend",
    icon: "fas fa-layer-group",
    skills: [
      { name: "React.js" },
      { name: "Next.js" },
      { name: "Zustand" },
      { name: "TailwindCSS" },
      { name: "Redux" },
      { name: "RJSF" },
      { name: "Capacitor" }
    ]
  },
  {
    title: "Backend",
    icon: "fas fa-server",
    skills: [
      { name: "Node.js" },
      { name: "Nest.js" },
      { name: "Laravel" },
      { name: "Express" },
      { name: "REST APIs" },
      { name: "JWT / OAuth" }
    ]
  },
  {
    title: "AI & Integrations",
    icon: "fas fa-robot",
    skills: [
      { name: "OpenAI API" },
      { name: "AI Agents" },
      { name: "Tool Calling" },
      { name: "Prompt Engineering" },
      { name: "Twilio" },
      { name: "WhatsApp Business API" }
    ]
  },
  {
    title: "Databases",
    icon: "fas fa-database",
    skills: [
      { name: "PostgreSQL" },
      { name: "MongoDB" },
      { name: "Redis" },
      { name: "MySQL" },
      { name: "InstantDB" }
    ]
  },
  {
    title: "Cloud & DevOps",
    icon: "fas fa-cloud",
    skills: [
      { name: "Google Cloud Platform" },
      { name: "Cron Workflows" },
      { name: "DB Migrations" },
      { name: "ACL / RBAC" },
      { name: "Capacitor Builds" },
      { name: "Play Store Deployment" }
    ]
  },
  {
    title: "Security",
    icon: "fas fa-shield-alt",
    skills: [
      { name: "Security Assessment" },
      { name: "OWASP" },
      { name: "Blue Team" },
      { name: "Threat Analysis" },
      { name: "Platform Hardening" }
    ]
  },
  {
    title: "Architecture & Practice",
    icon: "fas fa-tools",
    skills: [
      { name: "System Design" },
      { name: "Multi-Tenant SaaS" },
      { name: "Product Engineering" },
      { name: "Booking & Marketplace Systems" },
      { name: "Caching Strategies" },
      { name: "Layered Security Architecture" },
      { name: "Notification Systems" },
      { name: "Workflow Automation" },
      { name: "Role Based Access" },
      { name: "Performance Tuning" },
      { name: "Agile" }
    ]
  }
];

// Projects
export const projectsData: Project[] = [
  {
    slug: "hind-social-services-module",
    title: "Hind Social — Services Marketplace",
    subtitle: "A complete booking marketplace, built end-to-end in 4 months",
    description: "Owned and built the entire Services Module of Hind Social — a full marketplace inside the platform where providers create and sell services and customers discover and book them. Three service types, collections, categories, bookings, vendor verification and admin earnings, behind three-tier ACL/RBAC. Shipped to production on schedule on 30 Sep 2026.",
    longDescription: `The Services Module is a complete product inside Hind Social: service providers create and manage services, and customers browse, book and track them. I owned it end-to-end, from database schema and API design through the provider, customer and admin interfaces, and shipped it to production in about four months, on the committed deadline of 30 September 2026.\n\nThe catalogue supports three service types, each with its own booking rules: short-duration (slot-based), long-duration, and delivery-based services. Around them I built collections, categories, promotional banners, service detail and discovery pages, the booking flow, provider-side booking management, and a "My Bookings" area for customers.\n\nSecurity was designed in layers rather than added at the end: ACL/RBAC across three user tiers (admin, vendor, customer), hierarchy-level access rules for services, collections and categories, ownership checks on every resource, and strict server-side validation and input sanitization at each layer. On the admin side I built earnings management and a strict vendor verification workflow, so only verified vendors can publish services and accept bookings. On the performance side I added caching, tuned queries and indexes, and paginated heavy endpoints so the module can handle thousands of booking transactions without slowing down.\n\nThe whole module is fully mobile-responsive with full Safari/iOS (WebKit) compatibility, eliminating Safari-specific layout and date-handling breakages — essential for a consumer marketplace where much of the traffic comes from iPhones.`,
    image: "https://image.pollinations.ai/prompt/service%20booking%20marketplace%20app%20with%20categories%20collections%20banners%20and%20booking%20calendar%20dark%20theme%20modern%20UI?width=1200&height=750&seed=212&model=flux&nologo=true",
    technologies: [
      { name: "Next.js" },
      { name: "Node.js" },
      { name: "TypeScript" },
      { name: "PostgreSQL" },
      { name: "REST APIs" },
      { name: "RBAC" },
      { name: "Caching" }
    ],
    period: "Jun 2026 – Sep 2026",
    duration: "4 months · shipped 30 Sep 2026",
    role: "Lead Developer (module owner)",
    status: "Live in Production",
    category: ["All", "Work", "SaaS"],
    featured: true,
    metrics: [
      { value: "4 mo", label: "Concept to production" },
      { value: "3", label: "Service types" },
      { value: "30 Sep", label: "Shipped on deadline" },
      { value: "1000s", label: "Bookings it's built to handle" }
    ],
    highlights: [
      "Owned the entire module end-to-end: schema, APIs, provider, customer and admin UI",
      "Three service types: short-duration (slot-based), long-duration and delivery-based",
      "Collections, categories, banners, service discovery, bookings and My Bookings",
      "Three-tier ACL/RBAC (admin, vendor, customer) with ownership checks on every resource",
      "Admin earnings management and strict vendor verification — only verified vendors can sell",
      "Advanced multi-step service creation with strict validation and input sanitization",
      "Caching, query and index tuning so the module scales to thousands of booking transactions",
      "Full Safari / iOS (WebKit) compatibility — no Safari-specific UI breakages"
    ],
    challenges: [
      "Modelling three very different service types (slot-based, long-duration, delivery) in one booking engine without special-casing everywhere",
      "Enforcing hierarchy-level permissions so providers, customers and admins each see and change only what they own",
      "Keeping booking and listing endpoints fast under load with caching and query tuning",
      "Delivering a module this large to production on a fixed deadline without cutting corners on security"
    ],
    outcomes: [
      "Shipped the full Services Module to production on the committed 30 September 2026 deadline",
      "Production-grade module designed to handle thousands of booking transactions",
      "No unauthorized-access paths: every API is protected by role, hierarchy and ownership checks",
      "Consistent experience across mobile, desktop and Safari / iOS"
    ]
  },
  {
    slug: "multi-tenant-healthcare-saas",
    title: "Multi-Tenant Healthcare SaaS",
    subtitle: "Production platform powering UK clinics & pharmacies",
    description: "Architected and scaled a multi-tenant healthcare SaaS serving 20+ UK clinics and pharmacies with 40,000+ patients — strict cross-organization data isolation, ACL-based security, and 99.9% uptime on GCP.",
    longDescription: `A production-grade multi-tenant healthcare platform currently serving 20+ UK clinics, pharmacies and 40,000+ real patients across live clinical environments.\n\nI own the end-to-end engineering: multi-tenant data architecture with strict cross-organization isolation, RBAC/ACL security, GCP deployments, PostgreSQL migrations, critical cron workflows (prescriptions, inventory, appointments), and a dynamic RJSF-based form builder used by clinicians.\n\nMy work directly reduced production incidents, improved query performance on hot paths, and kept 99.9% uptime while the platform scaled from tens of thousands of patient records to its current footprint — all without a single critical data breach.`,
    image: "https://image.pollinations.ai/prompt/modern%20healthcare%20dashboard%20with%20patient%20data%20charts%20multi-tenant%20architecture%20dark%20theme%20futuristic%20UI%20medical%20SaaS%20platform?width=1200&height=750&seed=101&model=flux&nologo=true",
    technologies: [
      { name: "TypeScript" },
      { name: "Node.js" },
      { name: "React.js" },
      { name: "PostgreSQL" },
      { name: "Zustand" },
      { name: "GCP" },
      { name: "RJSF" }
    ],
    period: "Nov 2024 – May 2026",
    duration: "1 year 7 months",
    role: "Full Stack Developer",
    status: "In Production",
    category: ["All", "Work", "SaaS"],
    highlights: [
      "40,000+ real UK patients on the live platform",
      "20+ clinics & pharmacies onboarded with zero-downtime migrations",
      "Strict cross-organization data isolation (ACL-based)",
      "99.9% uptime maintained across critical cron workflows"
    ],
    challenges: [
      "Designing strict tenant isolation at the DB and app layer without sacrificing query performance",
      "Migrating legacy schemas safely with zero downtime under active clinical usage",
      "Building a dynamic RJSF-based form engine flexible enough for every clinic's workflow",
      "Hardening cron workflows (prescriptions, inventory, appointments) against partial failures"
    ],
    outcomes: [
      "Reduced production incidents meaningfully through targeted query and index optimizations",
      "Zero critical data breaches since launch",
      "Shipped Android + iOS patient apps from a shared web-mobile architecture",
      "Improved engineering velocity by stabilising legacy code paths"
    ]
  },
  {
    slug: "ai-agent-whatsapp",
    title: "AI Agent — WhatsApp Integration",
    subtitle: "Conversational AI backend for platform operations",
    description: "Independently designed and built a production-ready AI Agent PoC in under 24 hours — enabling users to perform real platform operations through WhatsApp via intent detection, tool calling, and backend orchestration.",
    longDescription: `Independently researched, designed and built a production-ready AI Agent Proof of Concept that enables users to communicate with Hind Social directly through WhatsApp.\n\nThe AI Agent automatically detects user intent, authenticates users, queries backend databases, executes tool calls, performs CRUD operations, registers users into events and libraries, books services, answers platform queries, and retrieves personalized information.\n\nBuilt with OpenAI GPT, tool calling, Twilio WhatsApp API, Node.js, Next.js, and REST APIs. The architecture was designed to support future integrations with WhatsApp, Instagram, and Facebook Messenger — acting as a conversational backend capable of executing real platform operations.\n\nThe complete Proof of Concept was designed and implemented independently within a single day.`,
    image: "https://image.pollinations.ai/prompt/AI%20chatbot%20WhatsApp%20interface%20with%20tool%20calling%20code%20visualization%20conversational%20AI%20agent%20dark%20futuristic%20theme?width=1200&height=750&seed=303&model=flux&nologo=true",
    technologies: [
      { name: "OpenAI GPT" },
      { name: "Tool Calling" },
      { name: "Twilio" },
      { name: "WhatsApp API" },
      { name: "Node.js" },
      { name: "Next.js" }
    ],
    period: "2026",
    duration: "1 day",
    role: "AI Engineer",
    status: "PoC Complete",
    category: ["All", "Work", "AI"],
    highlights: [
      "Designed and shipped in a single day",
      "Real platform operations via conversational AI",
      "Intent detection, auth, CRUD, bookings, and event registration",
      "Architecture supports WhatsApp, Instagram, and Messenger"
    ],
    challenges: [
      "Designing reliable intent detection across diverse user queries",
      "Orchestrating multi-step tool calls with authentication context",
      "Handling edge cases in conversational flows for real operations",
      "Building a scalable architecture supporting multiple messaging platforms"
    ],
    outcomes: [
      "Proved viability of AI-driven platform interaction via messaging",
      "Reduced user friction for common operations to a single WhatsApp message",
      "Established a reusable agent framework for future multi-channel integration",
      "Delivered a complete, working PoC within a single day"
    ]
  },
  {
    slug: "patient-mobile-apps",
    title: "Patient Mobile Apps (Android & iOS)",
    subtitle: "Native-feeling care experience from one shared codebase",
    description: "Built and deployed cross-platform patient apps using Capacitor on a shared web-mobile architecture — delivering a seamless care experience and achieving Google Play Store approval.",
    longDescription: `Designed and shipped Android + iOS patient applications on top of the healthcare SaaS. Using Capacitor, the apps share a single React/TypeScript codebase with the web platform — cutting duplicate work while delivering a native feel on both stores.\n\nI handled the full build pipeline — provisioning profiles, certificates, splash/app-icon generation, deep linking and OS-specific UX tuning — plus production release management on both stores.\n\nThe company had been trying to publish its Capacitor application for a long time. I successfully built and configured the application using Next.js WebView architecture and achieved Google Play Store approval — an important milestone for the team.`,
    image: "https://image.pollinations.ai/prompt/mobile%20health%20app%20on%20smartphone%20screens%20iOS%20Android%20patient%20care%20medical%20UI%20dark%20background%20cross-platform?width=1200&height=750&seed=404&model=flux&nologo=true",
    technologies: [
      { name: "Capacitor" },
      { name: "React.js" },
      { name: "TypeScript" },
      { name: "iOS" },
      { name: "Android" }
    ],
    period: "2025",
    duration: "Shipped",
    role: "Mobile Engineer",
    status: "In Production",
    category: ["All", "Work", "Mobile"],
    highlights: [
      "Single codebase, two app stores — significant velocity multiplier",
      "Achieved Google Play Store approval after prolonged team efforts",
      "Deep-linked patient journeys shared with the web platform",
      "Production rollout on iOS + Android with managed release pipelines"
    ],
    challenges: [
      "Bridging native behaviours (push, deep links, biometrics) into a shared web codebase",
      "Maintaining consistent UX on older Android devices",
      "Managing store submissions, reviews and signing across two platforms",
      "Configuring Capacitor with Next.js WebView architecture"
    ],
    outcomes: [
      "Delivered native-feeling apps without duplicating engineering effort",
      "Unlocked Google Play Store presence for the team",
      "Established a reproducible mobile release pipeline",
      "Improved patient engagement through mobile-first flows"
    ]
  },
  {
    slug: "school-management-saas",
    title: "School Management SaaS",
    subtitle: "Scalable multi-tenant platform for educational institutions",
    description: "Developed and deployed a scalable multi-tenant school management system serving multiple institutions — RBAC for students, teachers, and admins across attendance, fees, academics, and administrative workflows.",
    longDescription: `A multi-tenant education SaaS used by multiple institutions to run day-to-day operations. I built the core backend architecture, authentication, RBAC, and the primary modules — attendance, fees, academics and administrative workflows.\n\nThe platform is designed around concurrency — multiple schools, thousands of students, teachers and admins interacting simultaneously without cross-school leakage.`,
    image: "https://image.pollinations.ai/prompt/school%20management%20system%20dashboard%20attendance%20academics%20modules%20education%20platform%20dark%20theme%20modern%20UI?width=1200&height=750&seed=505&model=flux&nologo=true",
    technologies: [
      { name: "Node.js" },
      { name: "React.js" },
      { name: "MongoDB" },
      { name: "REST APIs" },
      { name: "RBAC" }
    ],
    period: "May 2024 – Feb 2025",
    duration: "9 months",
    role: "Full Stack Developer",
    status: "Deployed",
    category: ["All", "Work", "SaaS"],
    highlights: [
      "Multi-tenant architecture with role-based isolation",
      "Modules: attendance, fees, academics, administrative workflows",
      "Supports concurrent operations across multiple schools"
    ],
    challenges: [
      "Designing role-aware data scopes for students, teachers and admins",
      "Keeping query performance predictable as tenant count grew",
      "Modelling academic workflows that vary between institutions"
    ],
    outcomes: [
      "Onboarded multiple institutions onto a single shared backend",
      "Stable backend under concurrent multi-school load",
      "Clean separation of concerns enabling future module growth"
    ]
  },
  {
    slug: "hind-social-security-assessment",
    title: "Platform Security Assessment",
    subtitle: "Blue Team review of a live social platform",
    description: "Part of Hind Social's Blue Team initiative: identified 50+ vulnerabilities and hardening opportunities, mapped findings to OWASP categories, analysed threats and wrote the remediation and security documentation the team works from.",
    longDescription: `As part of Hind Social's Blue Team initiative I reviewed the live platform from a defender's point of view: authentication and session handling, authorization on APIs, input validation, data exposure and configuration.\n\nFindings were mapped to OWASP categories, ranked by impact and turned into concrete recommendations. I also wrote the security documentation the team now uses as a reference, and fed the same thinking straight into the Services Module, which was designed with layered access control from day one.`,
    image: "https://image.pollinations.ai/prompt/cybersecurity%20blue%20team%20dashboard%20vulnerability%20assessment%20shield%20network%20map%20dark%20theme?width=1200&height=750&seed=909&model=flux&nologo=true",
    technologies: [
      { name: "OWASP" },
      { name: "Threat Modeling" },
      { name: "API Security" },
      { name: "Node.js" },
      { name: "Documentation" }
    ],
    period: "2026",
    duration: "Ongoing",
    role: "Blue Team Contributor",
    status: "Delivered",
    category: ["All", "Work", "Security"],
    highlights: [
      "50+ vulnerabilities and hardening opportunities identified",
      "OWASP-mapped findings with remediation steps",
      "Authorization review across platform APIs",
      "Threat analysis of user-facing and admin surfaces",
      "Security documentation adopted by the team"
    ],
    challenges: [
      "Reviewing a live platform without disrupting real users",
      "Prioritising findings so fixes landed where the risk was highest"
    ],
    outcomes: [
      "Clear, prioritised remediation backlog for the platform",
      "Security patterns reused directly in the Services Module"
    ]
  },
  {
    slug: "novu-notification-workflows",
    title: "Novu — Notification Workflows",
    subtitle: "Event-driven notifications and workflow automation",
    description: "Engineered notification workflows on Novu, the open-source notification platform, for Hind Social: event notifications, trigger pipelines and orchestration that deliver the right message to the right user when something happens on the platform.",
    longDescription: `Built notification engineering on top of Novu, an open-source notification platform, for Hind Social. Platform events such as bookings, event registrations and activity updates feed trigger pipelines, which decide who should be notified, through which channel, and when.\n\nThe work covered notification workflows, event notifications, workflow automation and orchestration, so new notification types can be added without rewriting delivery logic.`,
    image: "https://image.pollinations.ai/prompt/notification%20orchestration%20pipeline%20event%20triggers%20workflow%20automation%20diagram%20dark%20modern%20UI?width=1200&height=750&seed=919&model=flux&nologo=true",
    technologies: [
      { name: "Novu" },
      { name: "Node.js" },
      { name: "TypeScript" },
      { name: "Event Pipelines" },
      { name: "Workflow Automation" }
    ],
    period: "2026",
    duration: "Ongoing",
    role: "Full Stack Developer",
    status: "In Production",
    category: ["All", "Work"],
    highlights: [
      "Trigger pipelines driven by platform events",
      "Reusable notification workflows",
      "Orchestration across notification types"
    ],
    challenges: [
      "Avoiding duplicate or noisy notifications as events multiply",
      "Keeping delivery logic decoupled from the features that emit events"
    ],
    outcomes: [
      "New notification types plug into existing pipelines",
      "Users are notified about bookings and events at the right moment"
    ]
  },
  {
    slug: "dynamic-form-engine",
    title: "Dynamic Clinical Form Engine",
    subtitle: "RJSF-based form builder used by clinicians",
    description: "Optimised and extended an RJSF-based dynamic form builder inside a multi-tenant healthcare platform, so each clinic can run its own consultation and intake forms without new code.",
    longDescription: `Clinics and pharmacies each have their own consultation, intake and prescribing forms. The platform handles this with a JSON-schema-driven form builder on top of React JSON Schema Form (RJSF).\n\nI improved its performance on large forms, fixed long-standing rendering and validation issues in the legacy code, and extended it so clinicians could model more of their real workflows. Fewer form bugs meant fewer production incidents for the support team.`,
    image: "https://image.pollinations.ai/prompt/dynamic%20form%20builder%20JSON%20schema%20medical%20consultation%20form%20editor%20dark%20modern%20SaaS%20UI?width=1200&height=750&seed=929&model=flux&nologo=true",
    technologies: [
      { name: "React.js" },
      { name: "RJSF" },
      { name: "JSON Schema" },
      { name: "TypeScript" },
      { name: "Zustand" }
    ],
    period: "2025",
    duration: "Shipped",
    role: "Full Stack Developer",
    status: "In Production",
    category: ["All", "Work", "SaaS"],
    highlights: [
      "Schema-driven forms configured per clinic",
      "Faster rendering on large clinical forms",
      "Legacy validation bugs fixed"
    ],
    challenges: [
      "Keeping large, conditional forms responsive",
      "Changing a shared engine without breaking existing clinic forms"
    ],
    outcomes: [
      "Fewer form-related production issues",
      "Clinics adapt forms without engineering changes"
    ]
  },
  {
    slug: "healthcare-cron-workflows",
    title: "Healthcare Cron Workflow Engine",
    subtitle: "Critical scheduled jobs for prescriptions, inventory and appointments",
    description: "Owned the critical scheduled workflows of a UK healthcare platform on GCP: prescription processing, inventory allocation and appointment jobs, kept reliable across 20+ client environments at 99.9% uptime.",
    longDescription: `Behind the healthcare SaaS sit scheduled jobs that cannot silently fail: prescription processing, inventory allocation across pharmacies, and appointment workflows.\n\nI owned these on Google Cloud Platform, hardening them against partial failures, making them safe to re-run, and adding the visibility needed to catch problems before clinics did. Together with careful PostgreSQL migrations, this kept 99.9% uptime across client environments.`,
    image: "https://image.pollinations.ai/prompt/cloud%20scheduled%20jobs%20pipeline%20healthcare%20prescriptions%20inventory%20monitoring%20dashboard%20GCP%20dark%20theme?width=1200&height=750&seed=939&model=flux&nologo=true",
    technologies: [
      { name: "Node.js" },
      { name: "PostgreSQL" },
      { name: "GCP" },
      { name: "Cron" },
      { name: "TypeScript" }
    ],
    period: "Nov 2024 – May 2026",
    duration: "1 year 7 months",
    role: "Full Stack Developer",
    status: "In Production",
    category: ["All", "Work", "SaaS"],
    highlights: [
      "Prescription, inventory allocation and appointment jobs",
      "Safe re-runs and partial-failure handling",
      "99.9% uptime across client environments"
    ],
    challenges: [
      "Jobs that touch patient care cannot double-run or silently skip",
      "Running the same workflows across many tenants with different data"
    ],
    outcomes: [
      "Reliable scheduled workflows for 20+ clinics and pharmacies",
      "Problems surfaced to the team before they reached clinics"
    ]
  },
  {
    slug: "laravel-client-backends",
    title: "Laravel Client Backends",
    subtitle: "REST APIs and auth for client and academic projects",
    description: "Freelance backend work in Laravel (PHP): REST APIs, JWT and session authentication, MySQL schema design and deployments for small businesses and academic projects.",
    longDescription: `As a freelancer I built backends for small client and academic projects in Laravel. Each project started with requirements gathered directly from the client and ended with a deployed API.\n\nThe work covered routing and middleware, Eloquent models, JWT and session-based authentication, MySQL schema design and deployment on shared hosting.`,
    image: "https://image.pollinations.ai/prompt/Laravel%20PHP%20REST%20API%20backend%20code%20editor%20database%20schema%20dark%20theme%20developer%20workspace?width=1200&height=750&seed=949&model=flux&nologo=true",
    technologies: [
      { name: "Laravel" },
      { name: "PHP" },
      { name: "MySQL" },
      { name: "JWT" },
      { name: "Eloquent" }
    ],
    period: "Aug 2023 – Feb 2024",
    duration: "7 months",
    role: "Freelance Backend Developer",
    status: "Delivered",
    category: ["All", "Work"],
    highlights: [
      "REST APIs with JWT and session auth",
      "MySQL schema design with Eloquent ORM",
      "Requirements gathered directly with clients"
    ],
    challenges: [
      "Delivering on tight client timelines",
      "Deploying to constrained shared-hosting environments"
    ],
    outcomes: [
      "Multiple client backends delivered on schedule",
      "Reusable Laravel starter patterns for later projects"
    ]
  },
  {
    slug: "ai-portfolio",
    title: "This Portfolio — AI-Powered",
    subtitle: "Multi-page portfolio with an AI assistant, terminal and Cmd+K search",
    description: "The site you're on: a React + TypeScript portfolio with an AI chat assistant that answers questions about my work, an interactive terminal, Cmd+K spotlight search, Framer Motion page transitions and light/dark themes.",
    longDescription: `I built this portfolio as a product, not a page. It's a multi-page React + TypeScript app with Framer Motion transitions, an interactive terminal with real commands, Cmd+K spotlight search across projects and pages, and an AI assistant that answers questions about my experience.\n\nThe assistant runs through a serverless function on Vercel with input limits and a constrained system prompt. Contact and newsletter flows use EmailJS and InstantDB, and the whole site is tuned for mobile and Safari.`,
    image: "https://image.pollinations.ai/prompt/developer%20portfolio%20website%20with%20AI%20chatbot%20terminal%20and%20command%20palette%20glassmorphism%20dark%20theme?width=1200&height=750&seed=959&model=flux&nologo=true",
    technologies: [
      { name: "React.js" },
      { name: "TypeScript" },
      { name: "Framer Motion" },
      { name: "Tailwind" },
      { name: "Vercel" },
      { name: "LLM API" }
    ],
    github: "https://github.com/optimus-node-js/full-stack-developer-portfolio",
    period: "2026",
    duration: "Ongoing",
    role: "Solo Developer",
    status: "Live",
    category: ["All", "AI", "Open Source"],
    highlights: [
      "AI assistant grounded in my resume",
      "Interactive terminal and Cmd+K search",
      "Framer Motion transitions, light and dark themes"
    ],
    challenges: [
      "Keeping animations smooth on mobile Safari",
      "Keeping the AI assistant on-topic and safe"
    ],
    outcomes: [
      "A portfolio visitors can explore, search and ask questions",
      "Fast, responsive experience on every device"
    ]
  },
  {
    slug: "spacex-launch-explorer",
    title: "SpaceX Launch Explorer",
    subtitle: "Rich interface for past & upcoming SpaceX missions",
    description: "A responsive React + TypeScript application surfacing detailed SpaceX launch data with smart filtering, mission drill-downs, and a performant, accessible UI.",
    longDescription: `An open-source React + TypeScript app that consumes the SpaceX API and turns it into a pleasant browsing experience — filters by date, mission type, vehicle and status, plus detailed mission drill-downs.\n\nThe UI is built with Mantine + Zustand for state, focused on performance, clear typography and predictable interactions.`,
    image: "https://image.pollinations.ai/prompt/SpaceX%20rocket%20launch%20data%20explorer%20React%20app%20space%20missions%20dark%20tech%20theme%20futuristic%20dashboard?width=1200&height=750&seed=606&model=flux&nologo=true",
    technologies: [
      { name: "React.js" },
      { name: "TypeScript" },
      { name: "REST APIs" },
      { name: "Mantine UI" },
      { name: "Zustand" }
    ],
    github: "https://github.com/Rahul-gif-asus/SpaceX-Launch-Explorer",
    link: "https://github.com/Rahul-gif-asus/SpaceX-Launch-Explorer",
    period: "Sep 2024",
    duration: "1 month",
    role: "Solo Developer",
    status: "Open Source",
    category: ["All", "Open Source"],
    highlights: [
      "Built with React + TypeScript + Mantine UI",
      "Predictable state via Zustand",
      "Responsive, accessible mission explorer"
    ],
    challenges: [
      "Designing filters that stay fast with large launch datasets",
      "Keeping the UI clean despite heavy mission metadata"
    ],
    outcomes: [
      "Shipped a fully open-source, responsive launch explorer",
      "Predictable state layer with Zustand instead of reducer sprawl"
    ]
  },
  {
    slug: "crowdsource-platform",
    title: "CrowdSource Platform",
    subtitle: "Collaborative problem-solving for communities",
    description: "A MERN-stack platform enabling users to post challenges, propose solutions, and engage in threaded discussions — with JWT authentication and a clean component architecture.",
    longDescription: `A collaborative problem-solving app built on the MERN stack. Users can post challenges, submit structured solutions, and discuss in threaded conversations.\n\nSecurity is handled via JWT with server-side session validation, and the frontend uses a clean component architecture to keep the interface responsive as conversations grow.`,
    image: "https://image.pollinations.ai/prompt/collaborative%20problem-solving%20platform%20MERN%20stack%20threaded%20discussions%20community%20dark%20modern%20UI?width=1200&height=750&seed=707&model=flux&nologo=true",
    technologies: [
      { name: "React.js" },
      { name: "Node.js" },
      { name: "Express" },
      { name: "MongoDB" },
      { name: "JWT" }
    ],
    github: "https://github.com/Rahul-gif-asus/CrowdSourcePlatform",
    period: "Aug 2024",
    duration: "1 month",
    role: "Solo Developer",
    status: "Open Source",
    category: ["All", "Open Source"],
    highlights: [
      "Full MERN-stack implementation",
      "JWT-based auth with server-side validation",
      "Threaded discussions around challenges & solutions"
    ],
    challenges: [
      "Keeping threaded discussions performant as they grow deep",
      "Balancing openness with moderation-friendly structure"
    ],
    outcomes: [
      "Clean, opinionated baseline for any community-style app",
      "Auth layer hardened against common JWT pitfalls"
    ]
  },
  {
    slug: "dividend-roi-calculator",
    title: "Dividend ROI Calculator",
    subtitle: "NSE dividend research for Indian investors",
    description: "A research tool for computing dividend earnings on NSE-listed stocks — integrates the Angel One API for real-time data and applies statistical analysis for ROI estimation.",
    longDescription: `A personal-research tool for dividend investors in the Indian market. The backend pulls real-time NSE data via the Angel One API and applies statistical analysis to estimate dividend ROI, yield and historical performance.\n\nIt stores curated datasets in MongoDB, which dramatically reduces API chatter and gives fast, repeatable analysis for long-term investors.`,
    image: "https://image.pollinations.ai/prompt/stock%20market%20dividend%20calculator%20financial%20charts%20ROI%20metrics%20NSE%20Indian%20stocks%20dark%20fintech%20theme?width=1200&height=750&seed=808&model=flux&nologo=true",
    technologies: [
      { name: "Python" },
      { name: "MongoDB" },
      { name: "Angel One API" },
      { name: "Data Analysis" }
    ],
    github: "https://github.com/Rahul-gif-asus/DividendROI-Calculator",
    period: "Mar – Jul 2023",
    duration: "5 months",
    role: "Solo Developer",
    status: "Open Source",
    category: ["All", "Open Source"],
    highlights: [
      "Real-time NSE data via Angel One API",
      "MongoDB cache layer for fast, repeatable analysis",
      "Statistical dividend ROI estimation"
    ],
    challenges: [
      "Normalising inconsistent historical dividend data across tickers",
      "Designing a cache that stays fresh without hammering the API"
    ],
    outcomes: [
      "Useful personal research tool for dividend investors",
      "Reusable caching pattern for any rate-limited market API"
    ]
  }
];

/** URL-safe id for an experience entry, e.g. "hind-social-network-pvt-ltd". */
export const experienceSlug = (e: Experience) =>
  e.company.toLowerCase().replace(/&/g, 'and').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

// Experience Data
export const experienceData: Experience[] = [
  {
    title: "Full Stack Developer",
    company: "Hind Social Network Pvt. Ltd.",
    location: "Ahmedabad, India",
    period: "May 2026 – Present",
    icon: "Briefcase",
    description: [
      "Owned and delivered the entire Services Module end-to-end in 4 months, live in production on 30 Sep 2026: categories, collections, service CRUD and booking/scheduling across short, long-duration and delivery-based services.",
      "Architected ACL/RBAC permissions for three user tiers (admin, vendor, customer), enforcing role, hierarchy and ownership checks on every service, collection, category and booking API.",
      "Built the admin panel's earnings management and a strict vendor verification workflow, so only verified vendors can publish services and accept bookings.",
      "Engineered advanced multi-step service creation flows with strict server-side validation and input sanitization; added caching and query tuning to sustain thousands of booking transactions.",
      "Delivered full Safari/iOS (WebKit) compatibility and mobile-responsive UI across the module, eliminating Safari-specific layout and date-handling breakages.",
      "Built a WhatsApp AI Agent POC (OpenAI tool calling, Twilio, Node.js/Next.js) in under 24 hours, and achieved Google Play approval for the Capacitor app after prior attempts had stalled.",
      "Identified 50+ vulnerabilities through the Blue Team security initiative and built event notification workflows on Novu."
    ],
    stack: ["Next.js", "Node.js", "TypeScript", "PostgreSQL", "ACL / RBAC", "REST APIs", "Caching", "OpenAI", "Twilio", "Novu", "Capacitor"]
  },
  {
    title: "Full Stack Developer",
    company: "Script Assist UK",
    location: "Remote · United Kingdom",
    period: "Nov 2024 – May 2026",
    icon: "Stethoscope",
    description: [
      "Architected and scaled a multi-tenant healthcare SaaS platform serving 20+ UK clinics, pharmacies, and 40,000+ real patients — with strict cross-organization data isolation.",
      "Owned production reliability on Google Cloud — deployments, PostgreSQL migrations, ACL-based security and critical cron workflows (prescriptions, inventory allocation, appointments).",
      "Shipped Android & iOS patient apps via Capacitor on a shared web-mobile architecture serving 5,000+ patient app users — one codebase, three platforms.",
      "Drove production-issue triage and optimisation: hot-path query tuning, RJSF form-engine improvements and legacy refactors — maintaining 99.9% uptime with zero critical data breaches."
    ],
    stack: ["TypeScript", "Node.js", "React", "PostgreSQL", "Zustand", "GCP", "Capacitor"]
  },
  {
    title: "Full Stack Developer",
    company: "Student Diwan",
    period: "May 2024 – Feb 2025",
    icon: "GraduationCap",
    description: [
      "Developed and deployed a scalable multi-tenant school management SaaS used by multiple institutions.",
      "Designed role-based access (students, teachers, admins) with secure authentication and tenant-aware data scopes.",
      "Built core modules: attendance, fees, academics and administrative workflows.",
      "Architected the backend to handle concurrent multi-school operations without cross-tenant leakage."
    ],
    stack: ["Node.js", "React", "MongoDB", "REST APIs", "RBAC"]
  },
  {
    title: "Freelance Backend Developer",
    company: "Self-Employed",
    period: "Aug 2023 – Feb 2024",
    icon: "Code2",
    description: [
      "Delivered backend modules using Laravel (PHP) for client and academic projects.",
      "Built RESTful APIs, JWT/session authentication, and managed MySQL databases end-to-end.",
      "Worked with routing, middleware, Eloquent ORM and shared-hosting deployments.",
      "Collaborated directly with clients to gather requirements and ship iteratively."
    ],
    stack: ["Laravel", "PHP", "MySQL", "JWT", "Eloquent"]
  },
  {
    title: "Space Launch Vehicle Intern",
    company: "Omspace Rocket & Exploration Pvt Ltd.",
    period: "Dec 2022 – Jan 2023",
    icon: "Rocket",
    description: [
      "Contributed to rocket engine design optimization for improved efficiency and thrust performance.",
      "Worked with industry-standard rocket design software for simulation and analysis.",
      "Assisted in trajectory analysis and orbital mission planning.",
      "Researched rocket fuels and supported fuel-efficiency improvements."
    ],
    stack: ["Simulation", "Trajectory Analysis", "Research"]
  }
];

// Education Data
export const educationData: Education[] = [
  {
    title: "B.Tech in Computer Science & Engineering",
    institution: "Bansal Institute of Research Technology and Science",
    location: "Bhopal, M.P.",
    year: "2019 – 2023",
    grade: "7.91 CGPA"
  },
  {
    title: "Class 12 — Science",
    institution: "Seva Sadan Higher Secondary School",
    location: "Burhanpur, M.P.",
    year: "2019",
    grade: "First Division"
  },
  {
    title: "Class 10",
    institution: "Seva Sadan Higher Secondary School",
    location: "Burhanpur, M.P.",
    year: "2017",
    grade: "First Division"
  }
];

export const certificationData: Certification[] = [
  {
    title: "Learn Ethical Hacking from Scratch",
    issuer: "zSecurity | Udemy",
    year: "2023",
    description: "Coverage of WiFi hacking, vulnerability assessment, SQL injection, and social engineering."
  },
  {
    title: "Geoprocessing Using Python",
    issuer: "Indian Institute of Remote Sensing",
    year: "2023",
    description: "Analysis of geo & spatial data — raster/vector processing with NumPy and Pandas."
  },
  {
    title: "Data Mining & Business Analytics",
    issuer: "Infosys | Springboard",
    year: "2023",
    description: "Data mining for business questions and an applied overview of business analytics using WEKA."
  }
];

export const involvementData: Involvement[] = [
  {
    title: "Tech Lead — Database Management",
    organization: "Commutiny — The Youth Collective",
    period: "Nov 2021 – Feb 2022",
    description: "Led database administration for a network of 30+ NGOs; streamlined data management and supported statistical analysis for social-impact projects.",
    icon: "fas fa-hands-helping"
  },
  {
    title: "Co-Founder & Head",
    organization: "Express Yourself Community",
    period: "Apr 2020 – Feb 2022",
    description: "Founded a community focused on mental health and self-expression, connecting diverse members across multiple regions during the pandemic.",
    icon: "fas fa-users"
  },
  {
    title: "Bronze Medalist",
    organization: "Q-ki National Championship — Commutiny",
    period: "Jun – Aug 2021",
    description: "Secured a Bronze Medal at the Q-ki National Championship focused on youth development and leadership.",
    icon: "fas fa-medal"
  }
];

export const contactInfo: ContactInfo = {
  location: "Ahmedabad, Gujarat, India",
  email: "karmarahul67@gmail.com",
  phone: "+91 9131114837",
  degree: "B.Tech in CSE",
  linkedin: "https://linkedin.com/in/rahul-vishwakarma-101346192",
  github: "https://github.com/Rahul-gif-asus"
};

export const bioData = {
  name: "Rahul Vishwakarma",
  title: "Senior Full Stack Developer",
  summary: "Senior Full Stack Developer shipping scalable products end-to-end — multi-tenant SaaS, booking marketplaces, AI agents and secure APIs — with TypeScript, Node.js, React, Next.js, PostgreSQL and GCP.",
  profileImage: "/profile.jpeg",
  longBio: [
    "I'm a Senior Full Stack Developer with a product engineer's mindset, and I thrive at the intersection of architecture, AI, security, and product thinking. I design and ship end-to-end platforms — backend architecture, database design, AI agents, mobile apps, cloud deployments, notification systems, and high-priority production systems.",
    "At Hind Social I owned the entire Services Module — a full booking marketplace with three service types, collections, categories, banners and layered security — and shipped it to production in four months, on the 30 September 2026 deadline. I also designed a production-ready AI Agent that runs real platform operations over WhatsApp. Previously at Script Assist UK, I led engineering on a healthcare platform serving 20+ UK clinics with 40,000+ patients, maintaining 99.9% uptime and zero critical data breaches on GCP.",
    "My work spans product engineering, AI integration, security assessment, notification orchestration, and mobile deployment. I'm deeply invested in building reliable distributed systems, intelligent automation, and products that quietly do a lot behind clean interfaces."
  ],
  stats: [
    { value: "3+", label: "Years Full Stack Engineering" },
    { value: "8+", label: "Production Systems Shipped" },
    { value: "99.9%", label: "Uptime Maintained" },
    { value: "0", label: "Critical Data Breaches" }
  ]
};
