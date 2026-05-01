import { Button } from '@/components/ui/button';
import { Github, ArrowRight, ExternalLink } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const Projects = () => {
  const navigate = useNavigate();

  const projects = [
    {
      id: 'spacex-launch-explorer',
      title: "SpaceX Launch Explorer",
      description: "A comprehensive web application providing detailed information on past and upcoming SpaceX rocket launches with responsive design.",
      technologies: ["React.js", "REST APIs", "Mantine UI", "Zustand"],
      category: "Web App",
      github: "https://github.com/Rahul-gif-asus/SpaceX-Launch-Explorer",
      link: "https://github.com/Rahul-gif-asus/SpaceX-Launch-Explorer",
      period: "Sep 2024",
      image: "https://images.unsplash.com/photo-1517976487492-5750f3195933?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 'crowdsource-platform',
      title: "CrowdSource Platform",
      description: "A dynamic web application designed to foster collaborative problem-solving by allowing users to post challenges, propose solutions, and engage in meaningful discussions.",
      technologies: ["React.js", "Node.js", "Express", "MongoDB"],
      category: "Full-Stack",
      github: "https://github.com/Rahul-gif-asus/CrowdSourcePlatform",
      period: "Aug 2024",
      image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 'dividend-roi-calculator',
      title: "Dividend ROI Calculator",
      description: "A robust tool designed to empower investors by providing detailed insights into potential dividend earnings from stocks listed on the National Stock Exchange (NSE).",
      technologies: ["Python", "MongoDB", "Data Analysis"],
      category: "Trading",
      github: "https://github.com/Rahul-gif-asus/DividendROI-Calculator",
      period: "Mar 2023 - Jul 2023",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 'vega-copy-trading',
      title: "Vega - Copy Trading",
      description: "A powerful tool designed to revolutionize stock trading by enabling users to replicate trades from top-performing strategies with real-time data analysis.",
      technologies: ["Python", "REST APIs", "Statistical Analysis"],
      category: "Trading",
      github: "https://github.com/Rahul-gif-asus/Vega_CopyTrading_Platform",
      period: "Jul 2022 - Nov 2022",
      image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    }
  ];

  const handleProjectClick = (projectId: string) => {
    navigate(`/project/${projectId}`);
  };

  return (
    <section id="projects" className="py-24 bg-background relative">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-20 scroll-animate">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 font-heading">
            Featured <span className="text-primary">Work</span>
          </h2>
          <div className="w-24 h-1.5 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full mb-8"></div>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto font-body">
            A selection of my recent projects, from full-stack applications to algorithmic trading systems.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 max-w-7xl mx-auto">
          {projects.map((project, index) => (
            <motion.div 
              key={index}
              whileHover={{ y: -8 }}
              className="group relative rounded-[2rem] bg-card border border-border overflow-hidden cursor-pointer"
              onClick={() => handleProjectClick(project.id)}
            >
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/10 to-background z-10 transition-opacity duration-300 group-hover:opacity-80"></div>
              
              {/* Image Section */}
              <div className="h-64 sm:h-80 relative overflow-hidden">
                <div className="absolute inset-0 bg-primary/20 mix-blend-overlay z-[5] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-full object-cover transform scale-100 group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                
                {/* Category Badge */}
                <div className="absolute top-6 right-6 z-20">
                  <span className="px-4 py-2 rounded-full bg-background/80 backdrop-blur-md border border-white/10 text-sm font-medium text-foreground">
                    {project.category}
                  </span>
                </div>
              </div>

              {/* Content Section */}
              <div className="relative z-20 p-8 sm:p-10 -mt-10 bg-gradient-to-t from-card via-card to-transparent pt-12">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-2xl sm:text-3xl font-bold font-heading mb-2 group-hover:text-primary transition-colors duration-300">
                      {project.title}
                    </h3>
                    <div className="text-sm font-medium text-muted-foreground">
                      {project.period}
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    {project.github && (
                      <Button
                        variant="ghost"
                        size="icon"
                        className="rounded-full bg-background/50 backdrop-blur border border-border hover:bg-primary/20 hover:text-primary transition-colors"
                        onClick={(e) => {
                          e.stopPropagation();
                          window.open(project.github, '_blank');
                        }}
                      >
                        <Github className="h-4 w-4" />
                      </Button>
                    )}
                    {project.link && (
                      <Button
                        variant="ghost"
                        size="icon"
                        className="rounded-full bg-background/50 backdrop-blur border border-border hover:bg-primary/20 hover:text-primary transition-colors"
                        onClick={(e) => {
                          e.stopPropagation();
                          window.open(project.link, '_blank');
                        }}
                      >
                        <ExternalLink className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </div>

                <p className="text-muted-foreground mb-8 line-clamp-3 text-lg">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-8">
                  {project.technologies.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="px-3 py-1.5 rounded-lg bg-muted/50 border border-border text-sm font-medium text-muted-foreground"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                
                <div className="flex items-center text-primary font-medium group-hover:gap-2 transition-all">
                  <span>View Case Study</span>
                  <ArrowRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-20 scroll-animate">
          <Button
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-6 text-lg rounded-full shadow-glow transition-all duration-300 hover:scale-105"
          >
            Start a Project Together
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Projects;