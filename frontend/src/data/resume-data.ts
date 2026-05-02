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
  icon?: string; // lucide icon name
  accent?: string; // optional accent color class
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
      { name: "Zustand" },
      { name: "TailwindCSS" },
      { name: "Redux" },
      { name: "RJSF" },
      { name: "CapacitorJS" }
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
    title: "Databases",
    icon: "fas fa-database",
    skills: [
      { name: "PostgreSQL" },
      { name: "MongoDB" },
      { name: "Redis" },
      { name: "MySQL" }
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
      { name: "Android / iOS Builds" }
    ]
  },
  {
    title: "Architecture & Practice",
    icon: "fas fa-tools",
    skills: [
      { name: "Multi-Tenant SaaS" },
      { name: "Production Debugging" },
      { name: "Performance Tuning" },
      { name: "System Design" },
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
    description: "Architected and scaled a multi-tenant healthcare SaaS serving 20+ UK clinics and pharmacies and 40,000+ patients in production — with strict cross-organization data isolation, ACL-based security, and 99.9% uptime on GCP.",
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
    period: "Nov 2024 – Present",
    duration: "Ongoing",
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
    slug: "patient-mobile-apps",
    title: "Patient Mobile Apps (Android & iOS)",
    subtitle: "Native-feeling care experience from one shared codebase",
    description: "Built and deployed cross-platform patient apps using CapacitorJS on a shared web-mobile architecture — delivering a seamless care experience across live clinical environments.",
    longDescription: `Designed and shipped Android + iOS patient applications on top of the healthcare SaaS. Using CapacitorJS, the apps share a single React/TypeScript codebase with the web platform — cutting duplicate work while delivering a native feel on both stores.\n\nI handled the full build pipeline — provisioning profiles, certificates, splash/app-icon generation, deep linking and OS-specific UX tuning — plus production release management on both stores.`,
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    technologies: [
      { name: "CapacitorJS" },
      { name: "React.js" },
      { name: "TypeScript" },
      { name: "iOS" },
      { name: "Android" }
    ],
    period: "2025",
    duration: "Shipped",
    role: "Lead Mobile Engineer",
    status: "In Production",
    category: ["All", "Work", "Mobile"],
    highlights: [
      "Single codebase, two app stores — huge velocity multiplier",
      "Deep-linked patient journeys shared with the web platform",
      "Production rollout on iOS + Android with managed release pipelines"
    ],
    challenges: [
      "Bridging native behaviours (push, deep links, biometrics) into a shared web codebase",
      "Keeping a 60fps patient UX on older Android devices",
      "Managing store submissions, reviews and signing across two platforms"
    ],
    outcomes: [
      "Delivered native-feeling apps without duplicating engineering effort",
      "Established a reproducible mobile release pipeline for the team",
      "Significantly improved patient adherence via mobile-first flows"
    ]
  },
  {
    slug: "school-management-saas",
    title: "School Management SaaS",
    subtitle: "Scalable multi-tenant platform for schools",
    description: "Developed and deployed a scalable multi-tenant school management system serving multiple institutions — RBAC for students, teachers and admins across attendance, fees, academics and administrative workflows.",
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
    description: "A responsive React + TypeScript app surfacing detailed information on past and upcoming SpaceX launches with smart filtering and a performant UI.",
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
    description: "A MERN-stack platform where users post challenges, propose solutions and engage in discussions — with secure JWT auth and a clean component architecture.",
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
    description: "A research tool helping investors compute dividend earnings on NSE-listed stocks — integrates the Angel One API for real-time data and applies statistical analysis.",
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
    title: "Senior Full Stack Developer",
    company: "Script Assist UK",
    location: "Remote · United Kingdom",
    period: "Nov 2024 – Present",
    icon: "Stethoscope",
    description: [
      "Architect and scale a multi-tenant healthcare SaaS platform currently serving 20+ UK clinics and pharmacies and 40,000+ real patients in production — with strict cross-organization data isolation.",
      "Own production reliability on Google Cloud — deployments, PostgreSQL migrations, ACL-based security and critical cron workflows (prescriptions, inventory allocation, appointments).",
      "Ship Android & iOS patient apps via CapacitorJS on a shared web-mobile architecture — one codebase, three platforms.",
      "Drive production-issue triage and optimisation: hot-path query tuning, RJSF form-engine improvements and legacy refactors — keeping 99.9% uptime with zero critical data breaches."
    ],
    stack: ["TypeScript", "Node.js", "React", "PostgreSQL", "Zustand", "GCP", "CapacitorJS"]
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
  location: "Burhanpur, Madhya Pradesh, India",
  email: "karmarahul67@gmail.com",
  phone: "+91 9131114837",
  degree: "B.Tech in CSE",
  linkedin: "https://linkedin.com/in/rahul-vishwakarma-101346192",
  github: "https://github.com/Rahul-gif-asus"
};

export const bioData = {
  name: "Rahul Vishwakarma",
  title: "Senior Full Stack Developer",
  summary: "Senior Full Stack Developer specialising in multi-tenant SaaS, production reliability and end-to-end ownership across TypeScript, Node.js, React, PostgreSQL and GCP.",
  profileImage: "/profile.jpeg",
  longBio: [
    "I'm a Senior Full Stack Developer who enjoys living where architecture, reliability and product meet. I design and ship multi-tenant SaaS platforms and own them end-to-end — backend architecture, database design, mobile apps, cloud deployments and high-priority production systems.",
    "Currently at Script Assist UK I lead engineering on a healthcare platform serving 20+ UK clinics and pharmacies with 40,000+ real patients in production, with strict cross-organization isolation, ACL-based security and 99.9% uptime on GCP.",
    "My day-to-day is a mix of production incident triage, performance tuning, data migrations and turning messy legacy code into dependable systems. I care deeply about correctness, developer experience and shipping cross-platform experiences (web + native) from a single shared architecture."
  ],
  // Developer-centric stats (no more '5,000+ patient users' prominent everywhere)
  stats: [
    { value: "5+", label: "Years Engineering" },
    { value: "7+", label: "Production Systems Shipped" },
    { value: "99.9%", label: "Uptime Maintained" },
    { value: "0", label: "Critical Data Breaches" }
  ]
};
