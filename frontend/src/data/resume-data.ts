export interface Skill {
  name: string;
}

export interface SkillCategory {
  title: string;
  icon: string;
  skills: Skill[];
}

export interface Project {
  title: string;
  description: string;
  image: string;
  technologies: Skill[];
  link?: string;
  github?: string;
  period: string;
  category: string[];
}

export interface Experience {
  title: string;
  company: string;
  location?: string;
  period: string;
  description: string[];
  stack?: string[];
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

// Skills Data — reflects latest resume stack (Senior Full Stack Dev, SaaS)
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
    title: "Tools & Practices",
    icon: "fas fa-tools",
    skills: [
      { name: "Git" },
      { name: "Eloquent ORM" },
      { name: "Multi-Tenant Architecture" },
      { name: "Scalable SaaS" },
      { name: "Agile" }
    ]
  }
];

// Projects — real work showcases + notable side projects
export const projectsData: Project[] = [
  {
    title: "Multi-Tenant Healthcare SaaS",
    description: "Architected and scaled a multi-tenant healthcare platform serving 20+ clinics & pharmacies and 5,000+ patient users. Strict cross-organization data isolation, ACL-based security, and 99.9% uptime on GCP.",
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    technologies: [
      { name: "TypeScript" },
      { name: "Node.js" },
      { name: "React.js" },
      { name: "PostgreSQL" },
      { name: "Zustand" },
      { name: "GCP" }
    ],
    period: "Nov 2024 – Present",
    category: ["All", "Work", "SaaS"]
  },
  {
    title: "Patient Mobile Apps (Android & iOS)",
    description: "Built and deployed cross-platform patient applications using CapacitorJS on a shared web-mobile architecture, enabling a seamless care experience for 5,000+ users across live clinical environments.",
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    technologies: [
      { name: "CapacitorJS" },
      { name: "React.js" },
      { name: "TypeScript" },
      { name: "iOS" },
      { name: "Android" }
    ],
    period: "2025",
    category: ["All", "Work", "Mobile"]
  },
  {
    title: "School Management SaaS",
    description: "Developed and deployed a scalable multi-tenant school management system serving multiple institutions — role-based access for students, teachers, and admins with attendance, fees, academics, and administrative workflows.",
    image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    technologies: [
      { name: "Node.js" },
      { name: "React.js" },
      { name: "MongoDB" },
      { name: "REST APIs" },
      { name: "RBAC" }
    ],
    period: "May 2024 – Feb 2025",
    category: ["All", "Work", "SaaS"]
  },
  {
    title: "SpaceX Launch Explorer",
    description: "Comprehensive web application surfacing detailed information on past and upcoming SpaceX launches with a responsive, performant UI.",
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
    category: ["All", "Open Source"]
  },
  {
    title: "CrowdSource Platform",
    description: "A collaborative problem-solving platform where users post challenges, propose solutions, and engage in discussions — with secure JWT auth and a clean component architecture.",
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
    category: ["All", "Open Source"]
  },
  {
    title: "Dividend ROI Calculator",
    description: "A robust research tool helping investors compute dividend earnings on NSE-listed stocks — integrates the Angel One API for real-time data and applies statistical analysis.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
    technologies: [
      { name: "Python" },
      { name: "MongoDB" },
      { name: "Angel One API" },
      { name: "Data Analysis" }
    ],
    github: "https://github.com/Rahul-gif-asus/DividendROI-Calculator",
    period: "Mar – Jul 2023",
    category: ["All", "Open Source"]
  }
];

// Experience Data — matches latest resume
export const experienceData: Experience[] = [
  {
    title: "Full Stack Developer",
    company: "Script Assist UK",
    location: "Remote",
    period: "Nov 2024 – Present",
    description: [
      "Architected and scaled a multi-tenant healthcare SaaS platform supporting 20+ clinics and pharmacies with strict cross-organization data isolation.",
      "Built and deployed Android & iOS patient applications using CapacitorJS on a shared web-mobile architecture serving 5,000+ patient users.",
      "Owned production systems on Google Cloud Platform — deployments, PostgreSQL migrations, ACL-based security, and critical cron workflows (prescriptions, inventory allocation, appointments).",
      "Optimized legacy codebase, database queries, and an RJSF-based dynamic form builder — reducing production issues while maintaining 99.9% uptime and zero critical data breaches."
    ],
    stack: ["TypeScript", "Node.js", "React", "PostgreSQL", "Zustand", "GCP", "CapacitorJS"]
  },
  {
    title: "Full Stack Developer",
    company: "Student Diwan",
    period: "May 2024 – Feb 2025",
    description: [
      "Developed and deployed a scalable multi-tenant school management system for multiple institutions.",
      "Implemented role-based access (students, teachers, admins) with secure authentication.",
      "Built core modules: attendance, fees, academics, and administrative workflows.",
      "Designed a scalable backend architecture supporting concurrent multi-school operations."
    ],
    stack: ["Node.js", "React", "MongoDB", "REST APIs", "RBAC"]
  },
  {
    title: "Freelance Backend Developer",
    company: "Self-Employed",
    period: "Aug 2023 – Feb 2024",
    description: [
      "Developed backend modules using Laravel (PHP) for client and academic projects.",
      "Built RESTful APIs, implemented JWT/session authentication, and managed MySQL databases.",
      "Worked with routing, middleware, Eloquent ORM, and deployed on shared hosting platforms.",
      "Collaborated directly with clients to gather requirements and deliver solutions on time."
    ],
    stack: ["Laravel", "PHP", "MySQL", "JWT", "Eloquent"]
  },
  {
    title: "Space Launch Vehicle Intern",
    company: "Omspace Rocket & Exploration Pvt Ltd.",
    period: "Dec 2022 – Jan 2023",
    description: [
      "Contributed to rocket engine design optimization for improved efficiency and thrust performance.",
      "Worked with industry-standard rocket design software for simulation and analysis.",
      "Assisted in trajectory analysis and orbital mission planning.",
      "Researched rocket fuels and supported fuel-efficiency improvements."
    ],
    stack: ["Simulation", "Trajectory Analysis", "Research"]
  }
];

// Education Data — aligned with resume
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

// Certification Data
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

// Involvement Data — aligned with resume
export const involvementData: Involvement[] = [
  {
    title: "Tech Lead — Database Management",
    organization: "Commutiny — The Youth Collective",
    period: "Nov 2021 – Feb 2022",
    description: "Led database administration for a network of 30+ NGOs; streamlined data management and supported statistical analysis for social impact projects.",
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

// Contact Information — from resume
export const contactInfo: ContactInfo = {
  location: "Burhanpur, Madhya Pradesh, India",
  email: "karmarahul67@gmail.com",
  phone: "+91 9131114837",
  degree: "B.Tech in CSE",
  linkedin: "https://linkedin.com/in/rahul-vishwakarma-101346192",
  github: "https://github.com/Rahul-gif-asus"
};

// Bio Information — senior narrative
export const bioData = {
  name: "Rahul Vishwakarma",
  title: "Senior Full Stack Developer",
  summary: "Senior Full Stack Developer architecting multi-tenant SaaS platforms in healthcare and education. I ship production systems on TypeScript, Node.js, React, PostgreSQL and GCP — with full ownership of backend architecture, mobile apps, migrations, and cloud reliability.",
  profileImage: "/profile.jpeg",
  longBio: [
    "I'm a Senior Full Stack Developer with hands-on experience architecting and scaling multi-tenant SaaS platforms across healthcare and education. I work end-to-end — backend architecture, database migrations, mobile apps, cloud deployments and high-priority production systems.",
    "At Script Assist UK, I lead engineering on a healthcare platform serving 20+ clinics and 5,000+ patient users, with strict cross-organization isolation, ACL-based security and 99.9% uptime on GCP.",
    "I care deeply about correctness, reliability and developer experience. I enjoy turning legacy systems into dependable products and shipping cross-platform experiences (web + native) from a single shared architecture."
  ],
  stats: [
    { value: "20+", label: "Clinics & Pharmacies" },
    { value: "5,000+", label: "Patient Users" },
    { value: "99.9%", label: "Production Uptime" },
    { value: "3+", label: "Years Engineering" }
  ]
};
