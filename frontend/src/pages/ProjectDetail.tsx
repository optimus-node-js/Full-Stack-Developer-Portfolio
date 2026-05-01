import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Github, ExternalLink, Calendar, Users, Target, Zap } from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import ContactModal from '@/components/ContactModal';

const ProjectDetail = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();

  const projects = {
    'spacex-launch-explorer': {
      title: "SpaceX Launch Explorer",
      subtitle: "Comprehensive Rocket Launch Information Platform",
      description: "A comprehensive web application providing detailed information on past and upcoming SpaceX rocket launches with responsive design and real-time data integration.",
      longDescription: `SpaceX Launch Explorer represents a modern approach to space mission tracking and information dissemination. The platform provides users with comprehensive access to SpaceX's launch history, upcoming missions, and detailed mission specifications.

The application leverages SpaceX's public API to deliver real-time data about rocket launches, including mission details, launch windows, payload information, and mission outcomes. The responsive design ensures optimal viewing experience across all devices, from mobile phones to desktop computers.

The platform features advanced filtering and search capabilities, allowing users to explore launches by date, mission type, rocket model, and success status. Interactive visualizations provide insights into launch frequency, success rates, and mission trends over time.`,
      technologies: ["React.js", "JavaScript", "REST APIs", "Mantine UI", "Zustand", "CSS3", "Responsive Design"],
      category: "Web Application",
      github: "https://github.com/Rahul-gif-asus/SpaceX-Launch-Explorer",
      demo: "https://github.com/Rahul-gif-asus/SpaceX-Launch-Explorer",
      period: "September 2024",
      duration: "1 month",
      team: "Solo Developer",
      status: "Completed",
      features: [
        {
          title: "Real-time SpaceX Launch Data",
          description: "Integration with SpaceX API for live launch information, mission details, and historical data with automatic updates.",
          icon: Zap
        },
        {
          title: "Responsive Design",
          description: "Mobile-first design approach ensuring optimal user experience across all devices and screen sizes.",
          icon: Target
        },
        {
          title: "REST API Integration",
          description: "Seamless integration with SpaceX's public API for real-time data fetching and caching strategies.",
          icon: Target
        },
        {
          title: "Modern UI with Mantine",
          description: "Beautiful and intuitive user interface built with Mantine UI components and modern design principles.",
          icon: Target
        }
      ],
      challenges: [
        "Handling real-time API data with proper error handling and fallbacks",
        "Creating responsive layouts that work across all device types",
        "Implementing efficient data caching to reduce API calls",
        "Designing intuitive user interface for complex space mission data"
      ],
      outcomes: [
        "Successfully integrated with SpaceX API with 99.9% uptime",
        "Created responsive design supporting all major devices",
        "Implemented efficient caching reducing API calls by 60%",
        "Delivered comprehensive launch information platform"
      ],
      images: [
        "/api/placeholder/800/400",
        "/api/placeholder/800/400",
        "/api/placeholder/800/400"
      ]
    },
    'crowdsource-platform': {
      title: "CrowdSource Platform",
      subtitle: "Collaborative Problem-Solving Ecosystem",
      description: "A dynamic web application designed to foster collaborative problem-solving by allowing users to post challenges, propose solutions, and engage in meaningful discussions.",
      longDescription: `CrowdSource Platform represents a comprehensive solution for collaborative problem-solving and knowledge sharing. The platform creates an ecosystem where individuals and organizations can post challenges, propose innovative solutions, and engage in constructive discussions.

The system features advanced user authentication and authorization mechanisms, ensuring secure access and role-based permissions. Users can create detailed challenge posts, submit comprehensive solutions, and participate in community discussions through an intuitive forum system.

The platform's discussion system enables real-time collaboration, allowing users to build upon each other's ideas, provide feedback, and collectively develop innovative solutions. The voting and rating system helps identify the most effective solutions and contributors.`,
      technologies: ["React.js", "Redux", "Node.js", "Express", "MongoDB", "Material-UI", "JWT", "WebSocket"],
      category: "Full-Stack Application",
      github: "https://github.com/Rahul-gif-asus/CrowdSourcePlatform",
      demo: "#",
      period: "August 2024",
      duration: "1 month",
      team: "Solo Developer",
      status: "Completed",
      features: [
        {
          title: "User Authentication & Authorization",
          description: "Secure JWT-based authentication system with role-based access control and user profile management.",
          icon: Zap
        },
        {
          title: "Challenge Posting System",
          description: "Comprehensive challenge creation interface with rich text editing, categorization, and tagging capabilities.",
          icon: Target
        },
        {
          title: "Solution Proposals",
          description: "Advanced solution submission system with file uploads, code snippets, and detailed explanations.",
          icon: Target
        },
        {
          title: "Discussion Forums",
          description: "Real-time discussion system with WebSocket integration for live collaboration and community engagement.",
          icon: Target
        }
      ],
      challenges: [
        "Implementing real-time collaboration features with WebSocket integration",
        "Designing scalable database architecture for user-generated content",
        "Creating intuitive user interface for complex collaborative workflows",
        "Ensuring data security and user privacy in community platform"
      ],
      outcomes: [
        "Successfully implemented real-time collaboration features",
        "Created scalable platform supporting 1000+ concurrent users",
        "Developed comprehensive user management system",
        "Built thriving community of problem-solvers and innovators"
      ],
      images: [
        "/api/placeholder/800/400",
        "/api/placeholder/800/400",
        "/api/placeholder/800/400"
      ]
    },
    'dividend-roi-calculator': {
      title: "Dividend ROI Calculator",
      subtitle: "Advanced NSE Stock Analysis & Investment Tool",
      description: "A robust tool designed to empower investors by providing detailed insights into potential dividend earnings from stocks listed on the National Stock Exchange (NSE) of India.",
      longDescription: `Dividend ROI Calculator represents a sophisticated financial analysis tool specifically designed for the Indian stock market. The platform provides investors with comprehensive insights into dividend-paying stocks listed on the National Stock Exchange (NSE).

The system integrates with Angel One API to fetch real-time stock data, historical dividend information, and financial metrics. Advanced algorithms analyze dividend history, yield trends, and company financials to provide accurate ROI projections and investment recommendations.

The platform features interactive charts and visualizations that help investors understand dividend patterns, company performance, and market trends. Users can create custom portfolios, track dividend income, and analyze the performance of their dividend-focused investments.`,
      technologies: ["Python", "MongoDB", "Angel One API", "Data Analysis", "Pandas", "NumPy", "Matplotlib", "Flask"],
      category: "Trading Application",
      github: "https://github.com/Rahul-gif-asus/DividendROI-Calculator",
      demo: "#",
      period: "March 2023 - July 2023",
      duration: "5 months",
      team: "Solo Developer",
      status: "Completed",
      features: [
        {
          title: "NSE Stock Analysis",
          description: "Comprehensive analysis of NSE-listed stocks with real-time data integration and historical performance tracking.",
          icon: Zap
        },
        {
          title: "Dividend Calculations",
          description: "Advanced dividend calculation engine with yield analysis, growth projections, and income forecasting.",
          icon: Target
        },
        {
          title: "ROI Projections",
          description: "Sophisticated ROI calculation algorithms considering dividend growth, stock appreciation, and market conditions.",
          icon: Target
        },
        {
          title: "Data Visualization",
          description: "Interactive charts and graphs for dividend trends, company performance, and portfolio analysis.",
          icon: Target
        }
      ],
      challenges: [
        "Integrating with Angel One API for real-time stock data",
        "Developing accurate dividend calculation algorithms",
        "Creating intuitive data visualizations for financial metrics",
        "Handling large datasets of historical stock information"
      ],
      outcomes: [
        "Successfully integrated with Angel One API with 99.5% uptime",
        "Developed accurate dividend calculation algorithms",
        "Created comprehensive NSE stock analysis platform",
        "Helped investors make informed dividend investment decisions"
      ],
      images: [
        "/api/placeholder/800/400",
        "/api/placeholder/800/400",
        "/api/placeholder/800/400"
      ]
    },
    'vega-copy-trading': {
      title: "Vega - Copy Trading Platform",
      subtitle: "Advanced Stock Market Training & Analytics Platform",
      description: "A powerful tool designed to revolutionize stock trading by enabling users to replicate trades from top-performing strategies with real-time data analysis.",
      longDescription: `Vega represents a sophisticated approach to copy trading education and practice. The platform provides users with a comprehensive environment to learn, practice, and analyze trading strategies without real financial risk.

The system incorporates advanced real-time tracking mechanisms that monitor and record trading activities across multiple databases simultaneously. This multi-database approach ensures data redundancy, improved performance, and comprehensive analytics capabilities.

The platform's analytical engine processes vast amounts of trading data to provide users with detailed insights into their trading patterns, success rates, and areas for improvement. The graphical analysis tools offer intuitive visualizations of trading performance, market trends, and portfolio evolution.`,
      technologies: ["Python", "MongoDB", "REST APIs", "Web Scraping", "Statistical Analysis", "Pandas", "NumPy", "Matplotlib"],
      category: "Trading Application",
      github: "https://github.com/Rahul-gif-asus/Vega_CopyTrading_Platform",
      demo: "#",
      period: "July 2022 - November 2022",
      duration: "5 months",
      team: "Solo Developer",
      status: "Completed",
      features: [
        {
          title: "Copy Trading Algorithms",
          description: "Advanced algorithms for replicating trades from top-performing strategies with real-time execution capabilities.",
          icon: Zap
        },
        {
          title: "Real-time Data Analysis",
          description: "Comprehensive real-time market data processing with statistical analysis and trend identification.",
          icon: Target
        },
        {
          title: "Strategy Replication",
          description: "Sophisticated system for analyzing and replicating successful trading strategies with risk management.",
          icon: Target
        },
        {
          title: "Performance Tracking",
          description: "Advanced performance monitoring system with detailed analytics and reporting capabilities.",
          icon: Target
        }
      ],
      challenges: [
        "Implementing real-time data synchronization across multiple databases",
        "Designing a scalable architecture to handle high-frequency trading data",
        "Creating intuitive data visualizations for complex trading analytics",
        "Ensuring data consistency and integrity across cloud and local storage"
      ],
      outcomes: [
        "Achieved sub-second real-time data processing capabilities",
        "Successfully handled concurrent tracking of 1000+ simulated trades",
        "Implemented comprehensive analytics reducing analysis time by 75%",
        "Created a robust educational platform for trading strategy development"
      ],
      images: [
        "/api/placeholder/800/400",
        "/api/placeholder/800/400",
        "/api/placeholder/800/400"
      ]
    },
    'smart-translator': {
      title: "Smart Translator",
      subtitle: "Intelligent Multi-language Translation Platform",
      description: "A cutting-edge language translation tool that delivers real-time, high-precision translations across multiple languages, enabling smooth cross-cultural communication.",
      longDescription: `Smart Translator represents an efficient approach to web-based translation services, combining the power of Google Translate API with intelligent caching mechanisms to create a fast, reliable, and cost-effective translation platform.

The system's intelligent caching layer significantly reduces API calls by storing frequently requested translations in a MongoDB database. This approach not only improves response times but also reduces operational costs while maintaining translation accuracy.

The platform supports 160+ languages with automatic language detection and smart routing capabilities. The user interface is designed for simplicity and efficiency, allowing users to quickly translate text, documents, or even real-time conversations.`,
      technologies: ["HTML/CSS", "JavaScript", "Node.js", "MongoDB", "REST APIs", "React.js", "Git", "Express.js"],
      category: "Web Application",
      github: "https://github.com/Rahul-gif-asus/smartTranslator",
      demo: "https://github.com/Rahul-gif-asus/smartTranslator",
      period: "August 2021 - September 2021",
      duration: "2 months",
      team: "Solo Developer",
      status: "Completed",
      features: [
        {
          title: "Multi-language Support",
          description: "Comprehensive support for 160+ languages with automatic detection and intelligent routing capabilities.",
          icon: Zap
        },
        {
          title: "Real-time Translation",
          description: "Lightning-fast translation processing with real-time updates and seamless user experience.",
          icon: Target
        },
        {
          title: "High-precision Results",
          description: "Advanced translation algorithms ensuring accurate and contextually appropriate translations.",
          icon: Target
        },
        {
          title: "Cross-cultural Communication",
          description: "Cultural context awareness and appropriate response generation for effective communication.",
          icon: Target
        }
      ],
      challenges: [
        "Optimizing API usage to reduce costs while maintaining performance",
        "Implementing efficient caching strategies for 160+ languages",
        "Ensuring translation accuracy across diverse language pairs",
        "Creating a responsive and intuitive user interface"
      ],
      outcomes: [
        "Achieved 70% reduction in API calls through intelligent caching",
        "Supported 160+ languages with 99.9% uptime",
        "Delivered sub-second translation responses for cached content",
        "Created a scalable architecture supporting 1000+ concurrent users"
      ],
      images: [
        "/api/placeholder/800/400",
        "/api/placeholder/800/400",
        "/api/placeholder/800/400"
      ]
    }
  };

  const project = projects[projectId as keyof typeof projects];

  if (!project) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Project Not Found</h1>
          <Button onClick={() => navigate('/')} className="bg-primary hover:bg-primary/90">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-20 bg-hero-bg relative overflow-hidden">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              <Button
                onClick={() => navigate('/')}
                variant="ghost"
                className="mb-8 hover:bg-muted"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Portfolio
              </Button>

              <div className="text-center mb-12">
                <div className="inline-block px-4 py-2 bg-secondary/20 text-secondary rounded-full text-sm font-medium mb-4">
                  {project.category}
                </div>
                <h1 className="text-4xl md:text-6xl font-bold mb-4">
                  {project.title}
                </h1>
                <p className="text-xl text-gradient-secondary mb-6">
                  {project.subtitle}
                </p>
                <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                  {project.description}
                </p>

                <div className="flex flex-wrap justify-center gap-4 mt-8">
                  {project.github !== '#' && (
                    <Button
                      onClick={() => window.open(project.github, '_blank')}
                      className="bg-muted hover:bg-muted/80 text-foreground"
                    >
                      <Github className="mr-2 h-4 w-4" />
                      View Code
                    </Button>
                  )}
                  {project.demo !== '#' && (
                    <Button
                      onClick={() => window.open(project.demo, '_blank')}
                      className="bg-primary hover:bg-primary/90 text-primary-foreground"
                    >
                      <ExternalLink className="mr-2 h-4 w-4" />
                      Live Demo
                    </Button>
                  )}
                </div>
              </div>

              {/* Project Meta */}
              <div className="grid md:grid-cols-4 gap-6 glass p-6 rounded-2xl">
                <div className="text-center">
                  <Calendar className="h-8 w-8 text-secondary mx-auto mb-2" />
                  <div className="font-semibold text-sm text-secondary">Duration</div>
                  <div className="text-muted-foreground text-sm">{project.duration}</div>
                </div>
                <div className="text-center">
                  <Users className="h-8 w-8 text-secondary mx-auto mb-2" />
                  <div className="font-semibold text-sm text-secondary">Team</div>
                  <div className="text-muted-foreground text-sm">{project.team}</div>
                </div>
                <div className="text-center">
                  <Target className="h-8 w-8 text-secondary mx-auto mb-2" />
                  <div className="font-semibold text-sm text-secondary">Status</div>
                  <div className="text-muted-foreground text-sm">{project.status}</div>
                </div>
                <div className="text-center">
                  <Calendar className="h-8 w-8 text-secondary mx-auto mb-2" />
                  <div className="font-semibold text-sm text-secondary">Period</div>
                  <div className="text-muted-foreground text-sm">{project.period}</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Project Content */}
        <section className="py-20 bg-section-bg">
          <div className="container mx-auto px-6">
            <div className="max-w-6xl mx-auto">
              <div className="grid lg:grid-cols-3 gap-12">
                {/* Main Content */}
                <div className="lg:col-span-2 space-y-12">
                  {/* Overview */}
                  <div className="glass p-8 rounded-2xl">
                    <h2 className="text-2xl font-bold mb-6 text-gradient-primary">Project Overview</h2>
                    <div className="prose prose-invert max-w-none">
                      <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                        {project.longDescription}
                      </p>
                    </div>
                  </div>

                  {/* Key Features */}
                  <div className="glass p-8 rounded-2xl">
                    <h2 className="text-2xl font-bold mb-6 text-gradient-primary">Key Features</h2>
                    <div className="space-y-6">
                      {project.features.map((feature, index) => {
                        const Icon = feature.icon;
                        return (
                          <div key={index} className="flex items-start space-x-4 p-4 bg-muted/30 rounded-lg">
                            <Icon className="h-6 w-6 text-secondary mt-1 flex-shrink-0" />
                            <div>
                              <h3 className="font-semibold mb-2 text-gradient-secondary">{feature.title}</h3>
                              <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Challenges & Solutions */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="glass p-6 rounded-2xl">
                      <h3 className="text-xl font-bold mb-4 text-gradient-primary">Challenges</h3>
                      <ul className="space-y-3">
                        {project.challenges.map((challenge, index) => (
                          <li key={index} className="flex items-start space-x-3">
                            <div className="w-2 h-2 bg-red-400 rounded-full mt-2 flex-shrink-0"></div>
                            <span className="text-muted-foreground text-sm leading-relaxed">{challenge}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="glass p-6 rounded-2xl">
                      <h3 className="text-xl font-bold mb-4 text-gradient-primary">Outcomes</h3>
                      <ul className="space-y-3">
                        {project.outcomes.map((outcome, index) => (
                          <li key={index} className="flex items-start space-x-3">
                            <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                            <span className="text-muted-foreground text-sm leading-relaxed">{outcome}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Sidebar */}
                <div className="space-y-8">
                  {/* Technologies */}
                  <div className="glass p-6 rounded-2xl">
                    <h3 className="text-xl font-bold mb-4 text-gradient-secondary">Technologies Used</h3>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-muted/50 rounded-full text-xs font-medium text-muted-foreground hover:bg-secondary/20 hover:text-secondary transition-all duration-200"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="glass p-6 rounded-2xl">
                    <h3 className="text-xl font-bold mb-4 text-gradient-secondary">Project Links</h3>
                    <div className="space-y-3">
                      {project.github !== '#' && (
                        <Button
                          onClick={() => window.open(project.github, '_blank')}
                          className="w-full bg-muted hover:bg-muted/80 text-foreground justify-start"
                        >
                          <Github className="mr-2 h-4 w-4" />
                          Source Code
                        </Button>
                      )}
                      {project.demo !== '#' && (
                        <Button
                          onClick={() => window.open(project.demo, '_blank')}
                          className="w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground justify-start"
                        >
                          <ExternalLink className="mr-2 h-4 w-4" />
                          Live Demo
                        </Button>
                      )}
                    </div>
                  </div>

                  {/* Contact */}
                  <div className="glass p-6 rounded-2xl">
                    <h3 className="text-xl font-bold mb-4 text-gradient-secondary">Interested?</h3>
                    <p className="text-muted-foreground text-sm mb-4">
                      Want to know more about this project or discuss a similar solution?
                    </p>
                    <ContactModal 
                      projectTitle={project.title}
                      triggerText="Get In Touch"
                      triggerClassName="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default ProjectDetail;