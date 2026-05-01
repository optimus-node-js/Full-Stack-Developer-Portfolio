import { Briefcase, GraduationCap, Calendar, MapPin } from 'lucide-react';

const Experience = () => {
  const experiences = [
    {
      title: "Full Stack Developer",
      company: "Script Assist",
      location: "London, UK",
      period: "Feb 2024 - Present",
      type: "Remote",
      description: "Developed a scalable State Management System using NodeJS, TypeScript, PostgreSQL, and React.js.",
      technologies: ["NodeJS", "TypeScript", "PostgreSQL", "React", "Redux"]
    },
    {
      title: "Full Stack Developer",
      company: "Student Diwan",
      location: "Qatar",
      period: "May 2023 - Feb 2024",
      type: "Remote",
      description: "Built a comprehensive school management system catering to multiple institutions with React and MongoDB.",
      technologies: ["MongoDB", "React", "REST APIs", "Express", "Node.js"]
    },
    {
      title: "Coordinator of Volunteers",
      company: "Had-Anhad NGO",
      location: "Indore, India",
      period: "Mar 2023 - Apr 2023",
      type: "On-site",
      description: "Led a team of volunteers in coordinating community development initiatives and managed database systems.",
      technologies: ["Leadership", "Database Management", "Community Engagement"]
    },
    {
      title: "Space Launch Vehicle Intern",
      company: "Omspace Rocket & Exploration",
      location: "Ahmedabad, India",
      period: "Dec 2022 - Jan 2023",
      type: "On-site",
      description: "Contributed to statistical data analysis for rocket engine performance optimization and trajectory analysis.",
      technologies: ["Python", "Statistical Analysis", "CAD", "Data Analysis"]
    }
  ];

  const education = [
    {
      degree: "BTech, Computer Science",
      institution: "Rajiv Gandhi Proudyogiki Vishwavidyalaya",
      period: "2019 - 2023",
      grade: "7.91 CGPA",
      type: "Bachelor's"
    },
    {
      degree: "BTech, Computer Software Engineering",
      institution: "Bansal Institute of Science & Technology",
      period: "2019 - 2023",
      grade: "Honours",
      type: "Bachelor's"
    }
  ];

  return (
    <section id="experience" className="py-24 bg-background relative overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        <div className="absolute top-[20%] left-[-10%] w-[40%] h-[40%] bg-primary/5 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[10%] right-[-5%] w-[30%] h-[50%] bg-secondary/5 rounded-full blur-[100px]"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-20 scroll-animate">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 font-heading">
            My <span className="text-primary">Journey</span>
          </h2>
          <div className="w-24 h-1.5 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full mb-8"></div>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto font-body">
            A progressive career path spanning full-stack development, data analysis, and technical leadership.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-12 max-w-7xl mx-auto">
          
          {/* Experience Timeline */}
          <div className="lg:col-span-3">
            <div className="flex items-center gap-4 mb-10 scroll-animate">
              <div className="p-3 rounded-2xl bg-primary/10 text-primary">
                <Briefcase className="w-6 h-6" />
              </div>
              <h3 className="text-3xl font-bold font-heading">Experience</h3>
            </div>
            
            <div className="relative pl-8 md:pl-0 border-l-2 md:border-l-0 border-border md:space-y-12">
              {/* MD+ Center Line */}
              <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-border -translate-x-1/2"></div>
              
              {experiences.map((exp, index) => (
                <div 
                  key={index}
                  className={`relative md:flex md:justify-between md:items-center w-full mb-10 md:mb-0 scroll-animate group ${
                    index % 2 === 0 ? 'md:flex-row-reverse' : ''
                  }`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {/* Timeline Dot */}
                  <div className="absolute -left-[41px] md:left-1/2 w-5 h-5 rounded-full bg-background border-4 border-primary transform md:-translate-x-1/2 mt-1.5 md:mt-0 z-10 group-hover:scale-150 group-hover:bg-primary transition-all duration-300 shadow-[0_0_15px_rgba(34,197,94,0.5)]"></div>
                  
                  {/* Content Card */}
                  <div className="md:w-[45%]">
                    <div className="glass p-6 md:p-8 rounded-3xl group-hover:-translate-y-2 group-hover:shadow-[0_10px_40px_-10px_rgba(0,0,0,0.3)] transition-all duration-300 relative overflow-hidden border border-border/50">
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                      
                      <div className="relative z-10">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold mb-4">
                          <Calendar className="w-3 h-3" />
                          {exp.period}
                        </div>
                        
                        <h4 className="text-2xl font-bold font-heading mb-1">{exp.title}</h4>
                        
                        <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground mb-4">
                          <span className="font-semibold text-foreground">{exp.company}</span>
                          <span className="w-1 h-1 rounded-full bg-border"></span>
                          <span className="flex items-center gap-1"><MapPin className="w-3 h-3"/>{exp.location}</span>
                          <span className="w-1 h-1 rounded-full bg-border"></span>
                          <span>{exp.type}</span>
                        </div>
                        
                        <p className="text-muted-foreground mb-6 line-clamp-3">
                          {exp.description}
                        </p>
                        
                        <div className="flex flex-wrap gap-2">
                          {exp.technologies.map((tech, i) => (
                            <span key={i} className="px-2.5 py-1 rounded-md bg-muted/50 text-xs font-medium text-muted-foreground border border-border/50">
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Empty space for opposite side */}
                  <div className="hidden md:block md:w-[45%]"></div>
                </div>
              ))}
            </div>
          </div>

          {/* Education Sidebar */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-4 mb-10 scroll-animate">
              <div className="p-3 rounded-2xl bg-secondary/10 text-secondary">
                <GraduationCap className="w-6 h-6" />
              </div>
              <h3 className="text-3xl font-bold font-heading">Education</h3>
            </div>
            
            <div className="space-y-6">
              {education.map((edu, index) => (
                <div 
                  key={index}
                  className="glass p-6 md:p-8 rounded-3xl scroll-animate group hover:-translate-y-2 transition-all duration-300 relative overflow-hidden border border-border/50"
                  style={{ animationDelay: `${(index + 4) * 0.1}s` }}
                >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/5 rounded-full blur-2xl -mr-10 -mt-10 group-hover:bg-secondary/10 transition-colors duration-500"></div>
                  
                  <div className="relative z-10">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/10 text-secondary text-xs font-bold mb-4">
                      <Calendar className="w-3 h-3" />
                      {edu.period}
                    </div>
                    
                    <h4 className="text-xl font-bold font-heading mb-2 leading-tight group-hover:text-secondary transition-colors duration-300">
                      {edu.degree}
                    </h4>
                    
                    <div className="text-foreground font-medium mb-4">
                      {edu.institution}
                    </div>
                    
                    <div className="flex items-center justify-between mt-6 pt-6 border-t border-border/50">
                      <span className="text-sm text-muted-foreground">{edu.type}</span>
                      <span className="text-sm font-bold text-secondary bg-secondary/10 px-3 py-1 rounded-full">
                        {edu.grade}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Soft Skills or extra info card */}
            <div className="mt-6 glass p-8 rounded-3xl border border-border/50 bg-gradient-to-br from-primary/5 to-secondary/5 scroll-animate">
              <h4 className="font-bold font-heading text-lg mb-4 text-foreground">Leadership & Community</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Co-founded Express Yourself Community, connecting members across regions and strengthening bonds during challenging times. Active in fostering growth and open communication.
              </p>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
};

export default Experience;