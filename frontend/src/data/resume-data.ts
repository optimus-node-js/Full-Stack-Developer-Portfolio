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
    title: "Programming Languages",
    icon: "fas fa-code",
    skills: [
      { name: "HTML/CSS" },
      { name: "JavaScript" },
      { name: "Python" },
      { name: "C++" },
      { name: "PHP" },
      { name: "Kotlin" },
      { name: "C#" }
    ]
  },
  {
    title: "Frameworks & Libraries",
    icon: "fas fa-layer-group",
    skills: [
      { name: "React.js" },
      { name: "Node.js" },
      { name: "Django" },
      { name: "Flask" },
      { name: "jQuery" },
      { name: "Pandas" },
      { name: "Numpy" }
    ]
  },
  {
    title: "Databases",
    icon: "fas fa-database",
    skills: [
      { name: "MongoDB" },
      { name: "MySQL" },
      { name: "SQLite" }
    ]
  },
  {
    title: "Tools & Others",
    icon: "fas fa-tools",
    skills: [
      { name: "Git" },
      { name: "Data Structures" },
      { name: "Algorithms" },
      { name: "Handlebars" },
      { name: "EJS" },
      { name: "Pug" }
    ]
  }
];

// Projects Data
export const projectsData: Project[] = [
  {
    title: "SpaceX Launch Explorer",
    description: "A comprehensive web application providing detailed information on past and upcoming SpaceX rocket launches with responsive design.",
    image: "https://images.unsplash.com/photo-1517976487492-5750f3195933?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
    technologies: [
      { name: "React.js" },
      { name: "JavaScript" },
      { name: "REST APIs" },
      { name: "Mantine UI" },
      { name: "Zustand" }
    ],
    github: "https://github.com/Rahul-gif-asus/SpaceX-Launch-Explorer",
    link: "https://github.com/Rahul-gif-asus/SpaceX-Launch-Explorer",
    period: "Sep 2024",
    category: ["All", "Web"]
  },
  {
    title: "CrowdSource Platform",
    description: "A dynamic web application designed to foster collaborative problem-solving by allowing users to post challenges, propose solutions, and engage in meaningful discussions.",
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
    technologies: [
      { name: "React.js" },
      { name: "Redux" },
      { name: "Node.js" },
      { name: "Express" },
      { name: "MongoDB" },
      { name: "Material-UI" },
      { name: "JWT" }
    ],
    github: "https://github.com/Rahul-gif-asus/CrowdSourcePlatform",
    period: "Aug 2024",
    category: ["All", "Web"]
  },
  {
    title: "Dividend ROI Calculator",
    description: "A robust tool designed to empower investors by providing detailed insights into potential dividend earnings from stocks listed on the National Stock Exchange (NSE) of India.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
    technologies: [
      { name: "Python" },
      { name: "MongoDB" },
      { name: "Angel One API" },
      { name: "Data Analysis" }
    ],
    github: "https://github.com/Rahul-gif-asus/DividendROI-Calculator",
    period: "Mar 2023 - Jul 2023",
    category: ["All", "Trading", "Web"]
  },
  {
    title: "Vega - Copy Trading Platform",
    description: "A powerful tool designed to revolutionize stock trading by enabling users to replicate trades from top-performing strategies with real-time data analysis.",
    image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
    technologies: [
      { name: "Python" },
      { name: "MongoDB" },
      { name: "REST APIs" },
      { name: "Web Scraping" },
      { name: "Statistical Analysis" }
    ],
    github: "https://github.com/Rahul-gif-asus/Vega_CopyTrading_Platform",
    period: "Jul 2022 - Nov 2022",
    category: ["All", "Trading"]
  },
  {
    title: "Smart Translator",
    description: "A cutting-edge language translation tool that delivers real-time, high-precision translations across multiple languages, enabling smooth cross-cultural communication.",
    image: "https://images.unsplash.com/photo-1553484771-047a44eee27a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
    technologies: [
      { name: "HTML/CSS" },
      { name: "JavaScript" },
      { name: "Node.js" },
      { name: "MongoDB" },
      { name: "REST APIs" },
      { name: "React.js" },
      { name: "Git" }
    ],
    github: "https://github.com/Rahul-gif-asus/smartTranslator",
    link: "https://github.com/Rahul-gif-asus/smartTranslator",
    period: "Aug 2021 - Sep 2021",
    category: ["All", "Web", "AI"]
  }
];

// Experience Data
export const experienceData: Experience[] = [
  {
    title: "Full Stack Developer",
    company: "Script Assist",
    location: "London, United Kingdom",
    period: "Feb 2024 - Present",
    description: [
      "Developed a scalable State Management System using NodeJS, TypeScript, PostgreSQL, and React.js.",
      "Implemented secure authentication and role-based access control for different user types.",
      "Designed responsive UI components with Redux for efficient state management.",
      "Created RESTful APIs for seamless communication between frontend and backend services."
    ]
  },
  {
    title: "Full Stack Developer",
    company: "Student Diwan",
    location: "Qatar",
    period: "May 2023 - Feb 2024",
    description: [
      "Built a comprehensive school management system catering to multiple institutions.",
      "Implemented MongoDB for database management and React.js for responsive frontend interfaces.",
      "Developed REST APIs for secure data exchange between various system components.",
      "Created an intuitive admin dashboard for school administrators to manage operations efficiently."
    ]
  },
  {
    title: "Coordinator of Volunteers",
    company: "Had-Anhad NGO",
    location: "Indore, Madhya Pradesh, India",
    period: "Mar 2023 - Apr 2023",
    description: [
      "Led a team of volunteers in coordinating community development initiatives.",
      "Managed database systems for tracking volunteer participation and project outcomes.",
      "Organized training sessions for new volunteers to ensure effective community engagement.",
      "Successfully coordinated multiple concurrent projects across diverse communities."
    ]
  },
  {
    title: "Space Launch Vehicle Intern",
    company: "Omspace Rocket & Exploration Private Limited",
    location: "Ahmedabad, Gujarat",
    period: "Dec 2022 - Jan 2023",
    description: [
      "Contributed to statistical data analysis for rocket engine performance optimization.",
      "Participated in design and analysis of launch vehicle components using CAD software.",
      "Conducted programming tasks for systems monitoring and performance tracking.",
      "Collaborated in trajectory analysis and mission planning for rocket launches."
    ]
  },
  {
    title: "Cohort Tech Lead",
    company: "Commutiny - The Youth Collective",
    location: "Delhi, India",
    period: "Dec 2021 - Feb 2022",
    description: [
      "Led database administration for a network of 30+ NGOs, streamlining data management processes.",
      "Provided technical support for statistical data analysis related to social impact projects.",
      "Coordinated team projects and implemented systems for tracking program effectiveness.",
      "Applied data science techniques to generate insights for community development initiatives."
    ]
  },
  {
    title: "Co-Founder",
    company: "Express Yourself Community",
    location: "Indore, Madhya Pradesh, India",
    period: "May 2020 - Feb 2022",
    description: [
      "Co-founded and led a community dedicated to fostering personal growth and self-expression.",
      "Built an online platform connecting diverse members across multiple regions.",
      "Developed and implemented community engagement strategies that increased active participation.",
      "Created and managed digital content to strengthen community bonds during the pandemic."
    ]
  }
];

// Education Data
export const educationData: Education[] = [
  {
    title: "Bachelor of Technology - BTech, Computer Science",
    institution: "Rajiv Gandhi Proudyogiki Vishwavidyalaya (RGPV)",
    location: "Bhopal, Madhya Pradesh",
    year: "Aug 2019 - May 2023",
    grade: "7.91 CGPA"
  },
  {
    title: "Bachelor of Technology - BTech, Computer Software Engineering",
    institution: "Bansal Institute of Science & Technology",
    location: "Raisen Road, Kokta, Anand Nagar, Bhopal - 462021",
    year: "Aug 2019 - May 2023",
    grade: "7.91 (First Division with Honours)"
  },
  {
    title: "Science",
    institution: "Seva Sadan Higher Secondary School",
    location: "Burhanpur, Madhya Pradesh",
    year: "Aug 2019",
    grade: "86%"
  },
  {
    title: "Advance Computer Application",
    institution: "Global Computer Training Academy",
    location: "Burhanpur, Madhya Pradesh",
    year: "Apr 2019 - Aug 2019",
    grade: "A+"
  }
];

// Certification Data
export const certificationData: Certification[] = [
  {
    title: "Learn Ethical Hacking from Scratch",
    issuer: "zSecurity | Udemy",
    year: "2023",
    description: "Certified in WiFi hacking, creating Trojans, gaining access to computers, finding website vulnerabilities, SQL injection, and social engineering attacks."
  },
  {
    title: "Geoprocessing Using Python",
    issuer: "Indian Institute of Remote Sensing",
    year: "2023",
    description: "Certified in analyzing geo and spatial data, raster and vector data processing, using Numpy and Pandas libraries in Python."
  },
  {
    title: "Data Mining and Business Analytics",
    issuer: "Infosys | Springboard",
    year: "2023",
    description: "Certified in data mining for answering business questions and overview of business analytics using WEKA."
  },
  {
    title: "Advance Computer Application",
    issuer: "Global Computer Training Academy",
    year: "2019",
    description: "Certified in Computer Hardware Specification, Computer Basics, Internet Working, MS-Office."
  }
];

// Involvement Data
export const involvementData: Involvement[] = [
  {
    title: "Co-Founder and Head",
    organization: "Express Yourself Community",
    period: "May 2020 - February 2022",
    description: "Founded an NGO-dedicated community that connects people across diverse communities worldwide, focusing on social challenges and mental health.",
    icon: "fas fa-users"
  },
  {
    title: "Bronze Medallist",
    organization: "Commutiny - The Youth Collective",
    period: "Q-ki National Championship | June - August 2021",
    description: "Received bronze medal in national competition focused on youth development and leadership skills.",
    icon: "fas fa-medal"
  },
  {
    title: "Database Management Volunteer",
    organization: "Commutiny - The Youth Collective",
    period: "November 2021 - February 2022",
    description: "Led volunteer team managing databases for 30 NGOs while contributing to social causes and community development.",
    icon: "fas fa-hands-helping"
  }
];

// Contact Information
export const contactInfo: ContactInfo = {
  location: "Ahmedabad, Gujarat, India",
  email: "karmarahul67@gmail.com",
  phone: "+91 9131114837",
  degree: "B.Tech in CSE",
  linkedin: "https://linkedin.com/in/rahul-vishwakarma-101346192",
  github: "https://github.com/Rahul-gif-asus"
};

// Bio Information
export const bioData = {
  name: "Rahul Vishwakarma",
  title: "Full Stack Developer & Problem Solver",
  summary: "Versatile full-stack developer with a successful track record in diverse, real-world projects across various technologies. Specialized in algorithmic trading, concurrent analysis of extensive datasets, and cybersecurity.",
  profileImage: "/profile.jpeg",
  longBio: [
    "I'm a versatile full-stack developer with a successful track record in diverse, real-world projects across various technologies. I specialize in algorithmic trading, concurrent analysis of extensive datasets, and cybersecurity.",
    "With robust leadership and team management skills, I'm eager to contribute my expertise to drive company success. My passion for technology extends beyond work into personal projects that push the boundaries of what's possible."
  ]
};
