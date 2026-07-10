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
    slug: "multi-tenant-healthcare-saas",
    title: "Multi-Tenant Healthcare SaaS",
    subtitle: "Production platform powering UK clinics & pharmacies",
    description: "Architected and scaled a multi-tenant healthcare SaaS serving 20+ UK clinics and pharmacies with 40,000+ patients — strict cross-organization data isolation, ACL-based security, and 99.9% uptime on GCP.",
    longDescription: `A production-grade multi-tenant healthcare platform currently serving 20+ UK clinics, pharmacies and 40,000+ real patients across live clinical environments.\n\nI own the end-to-end engineering: multi-tenant data architecture with strict cross-organization isolation, RBAC/ACL security, GCP deployments, PostgreSQL migrations, critical cron workflows (prescriptions, inventory, appointments), and a dynamic RJSF-based form builder used by clinicians.\n\nMy work directly reduced production incidents, improved query performance on hot paths, and kept 99.9% uptime while the platform scaled from tens of thousands of patient records to its current footprint — all without a single critical data breach.`,
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
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
    role: "Senior Full Stack Developer",
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
    slug: "hind-social-services-module",
    title: "Hind Social — Services Module",
    subtitle: "End-to-end services platform for a social network",
    description: "Built the complete Services Module from scratch for Hind Social Network — covering service management, bookings, scheduling, location management, admin dashboards, consumer flows, and role-based access across the entire stack.",
    longDescription: `Designed and built the complete Services Module from the ground up inside Hind Social Network — one of the platform's major product modules.\n\nThe module spans end-to-end functionality: service management, categories, collections, bookings, booking management, date scheduling, location management, places, service configuration, user booking flows, admin dashboards, consumer dashboards, role-based access control, full CRUD operations, API integrations, and database design.\n\nOwned everything from database schema design through API architecture to frontend consumer and admin experiences, delivering a production-ready module that serves as a core platform capability.`,
    image: "https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    technologies: [
      { name: "Next.js" },
      { name: "Node.js" },
      { name: "TypeScript" },
      { name: "REST APIs" },
      { name: "RBAC" },
      { name: "PostgreSQL" }
    ],
    period: "May 2026 – Present",
    duration: "Ongoing",
    role: "Full Stack Developer",
    status: "In Production",
    category: ["All", "Work", "SaaS"],
    highlights: [
      "Built end-to-end as a major product module from scratch",
      "Covers bookings, scheduling, locations, admin & consumer dashboards",
      "Role-based access across admin, service providers, and consumers",
      "Complete API layer with full CRUD and database design"
    ],
    challenges: [
      "Designing a flexible schema supporting varied service types and booking patterns",
      "Building role-aware dashboards with distinct admin vs consumer experiences",
      "Handling complex date scheduling with timezone and availability constraints",
      "Integrating location management across the existing platform architecture"
    ],
    outcomes: [
      "Delivered a core product module used across the platform",
      "Clean separation between admin operations and consumer booking flows",
      "Scalable booking engine supporting multiple service configurations",
      "Established patterns for future module development within Hind Social"
    ]
  },
  {
    slug: "ai-agent-whatsapp",
    title: "AI Agent — WhatsApp Integration",
    subtitle: "Conversational AI backend for platform operations",
    description: "Independently designed and built a production-ready AI Agent PoC in a single day — enabling users to perform real platform operations through WhatsApp via intent detection, tool calling, and backend orchestration.",
    longDescription: `Independently researched, designed and built a production-ready AI Agent Proof of Concept that enables users to communicate with Hind Social directly through WhatsApp.\n\nThe AI Agent automatically detects user intent, authenticates users, queries backend databases, executes tool calls, performs CRUD operations, registers users into events and libraries, books services, answers platform queries, and retrieves personalized information.\n\nBuilt with OpenAI GPT, tool calling, Twilio WhatsApp API, Node.js, Next.js, and REST APIs. The architecture was designed to support future integrations with WhatsApp, Instagram, and Facebook Messenger — acting as a conversational backend capable of executing real platform operations.\n\nThe complete Proof of Concept was designed and implemented independently within a single day.`,
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
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
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
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
    image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
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
    slug: "spacex-launch-explorer",
    title: "SpaceX Launch Explorer",
    subtitle: "Rich interface for past & upcoming SpaceX missions",
    description: "A responsive React + TypeScript application surfacing detailed SpaceX launch data with smart filtering, mission drill-downs, and a performant, accessible UI.",
    longDescription: `An open-source React + TypeScript app that consumes the SpaceX API and turns it into a pleasant browsing experience — filters by date, mission type, vehicle and status, plus detailed mission drill-downs.\n\nThe UI is built with Mantine + Zustand for state, focused on performance, clear typography and predictable interactions.`,
    image: "https://images.unsplash.com/photo-1517976487492-5750f3195933?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
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
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
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
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
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

// Experience Data
export const experienceData: Experience[] = [
  {
    title: "Full Stack Developer",
    company: "Hind Social Network Pvt. Ltd.",
    location: "Ahmedabad, India",
    period: "May 2026 – Present",
    icon: "Briefcase",
    description: [
      "Built the complete Services Module from scratch — service management, bookings, scheduling, location management, admin & consumer dashboards, role-based access, and full API layer with database design.",
      "Independently designed and shipped a production-ready AI Agent PoC in a single day — enabling real platform operations via WhatsApp using OpenAI GPT, tool calling, and Twilio integration.",
      "Contributed to platform security as part of the Blue Team initiative — security assessments, vulnerability identification, OWASP-based recommendations, threat analysis, and comprehensive security documentation.",
      "Worked on notification engineering with Noti — notification workflows, event notifications, workflow automation, trigger pipelines, and notification orchestration.",
      "Successfully built and configured the Capacitor application using Next.js WebView architecture, achieving Google Play Store approval after prolonged team efforts."
    ],
    stack: ["Next.js", "Node.js", "TypeScript", "OpenAI", "Twilio", "Capacitor", "PostgreSQL"]
  },
  {
    title: "Senior Full Stack Developer",
    company: "Script Assist UK",
    location: "Remote · United Kingdom",
    period: "Nov 2024 – May 2026",
    icon: "Stethoscope",
    description: [
      "Architected and scaled a multi-tenant healthcare SaaS platform serving 20+ UK clinics, pharmacies, and 40,000+ real patients — with strict cross-organization data isolation.",
      "Owned production reliability on Google Cloud — deployments, PostgreSQL migrations, ACL-based security and critical cron workflows (prescriptions, inventory allocation, appointments).",
      "Shipped Android & iOS patient apps via Capacitor on a shared web-mobile architecture — one codebase, three platforms.",
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
  title: "Product Engineer",
  summary: "Product Engineer building across full-stack development, AI engineering, security, and platform architecture — shipping scalable products with TypeScript, Node.js, React, Next.js, PostgreSQL, and OpenAI.",
  profileImage: "/profile.jpeg",
  longBio: [
    "I'm a Product Engineer who thrives at the intersection of architecture, AI, security, and product thinking. I design and ship end-to-end platforms — backend architecture, database design, AI agents, mobile apps, cloud deployments, notification systems, and high-priority production systems.",
    "Currently at Hind Social Network, I built the complete Services Module from scratch and independently designed a production-ready AI Agent that enables real platform operations via WhatsApp. Previously at Script Assist UK, I led engineering on a healthcare platform serving 20+ UK clinics with 40,000+ patients, maintaining 99.9% uptime and zero critical data breaches on GCP.",
    "My work spans product engineering, AI integration, security assessment, notification orchestration, and mobile deployment. I'm deeply invested in building reliable distributed systems, intelligent automation, and products that quietly do a lot behind clean interfaces."
  ],
  stats: [
    { value: "3+", label: "Years Product Engineering" },
    { value: "8+", label: "Production Systems Shipped" },
    { value: "99.9%", label: "Uptime Maintained" },
    { value: "0", label: "Critical Data Breaches" }
  ]
};
