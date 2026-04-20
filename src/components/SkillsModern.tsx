import { 
  Code2, 
  Database, 
  Globe, 
  Brain,
  GitBranch,
  Server,
  Layers,
  Zap,
  Shield,
  BarChart3,
  Cpu
} from 'lucide-react';

const SkillsModern = () => {
  const skillCategories = [
    {
      title: "Frontend Development",
      icon: Globe,
      color: "text-blue-400",
      bgColor: "bg-blue-400/10",
      skills: [
        { name: "React.js", level: "Expert" },
        { name: "Next.js", level: "Advanced" },
        { name: "TypeScript", level: "Expert" },
        { name: "HTML/CSS", level: "Expert" },
        { name: "Tailwind CSS", level: "Expert" }
      ]
    },
    {
      title: "Backend & Systems",
      icon: Server,
      color: "text-emerald-400",
      bgColor: "bg-emerald-400/10",
      skills: [
        { name: "Node.js", level: "Expert" },
        { name: "Python", level: "Expert" },
        { name: "Django/Flask", level: "Advanced" },
        { name: "C++", level: "Advanced" },
        { name: "REST APIs", level: "Expert" }
      ]
    },
    {
      title: "Data & DevOps",
      icon: Database,
      color: "text-purple-400",
      bgColor: "bg-purple-400/10",
      skills: [
        { name: "MongoDB", level: "Expert" },
        { name: "PostgreSQL", level: "Advanced" },
        { name: "Redis", level: "Advanced" },
        { name: "Docker", level: "Intermediate" },
        { name: "Git Workflow", level: "Expert" }
      ]
    },
    {
      title: "AI & Analytics",
      icon: Brain,
      color: "text-amber-400",
      bgColor: "bg-amber-400/10",
      skills: [
        { name: "TensorFlow", level: "Advanced" },
        { name: "Scikit-learn", level: "Expert" },
        { name: "Pandas/NumPy", level: "Expert" },
        { name: "Algorithmic Trading", level: "Expert" },
        { name: "Machine Learning", level: "Advanced" }
      ]
    }
  ];

  return (
    <section id="skills" className="py-24 bg-section-bg relative border-t border-border/50">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent z-[1]" />
      
      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-20 scroll-animate">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 font-heading">
            Technical <span className="text-primary">Arsenal</span>
          </h2>
          <div className="w-24 h-1.5 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full mb-8"></div>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto font-body">
            A comprehensive toolkit spanning modern technologies and methodologies for building next-generation applications.
          </p>
        </div>

        {/* Skills Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto mb-20">
          {skillCategories.map((category, categoryIndex) => {
            const CategoryIcon = category.icon;
            return (
              <div 
                key={categoryIndex}
                className="glass p-8 rounded-[2rem] scroll-animate group hover:-translate-y-2 transition-transform duration-300 relative overflow-hidden"
                style={{ animationDelay: `${categoryIndex * 0.1}s` }}
              >
                <div className={`absolute -right-10 -top-10 w-40 h-40 rounded-full blur-3xl opacity-20 group-hover:opacity-40 transition-opacity duration-500 ${category.bgColor.replace('/10', '')}`}></div>
                
                <div className="relative z-10">
                  <div className={`w-14 h-14 rounded-2xl ${category.bgColor} flex items-center justify-center mb-8 border border-white/5`}>
                    <CategoryIcon className={`h-7 w-7 ${category.color}`} />
                  </div>
                  
                  <h3 className="text-xl font-bold font-heading mb-6">
                    {category.title}
                  </h3>
                  
                  <div className="space-y-4">
                    {category.skills.map((skill, skillIndex) => (
                      <div key={skillIndex} className="space-y-2">
                        <div className="flex justify-between items-center text-sm">
                          <span className="font-medium text-muted-foreground group-hover:text-foreground transition-colors">{skill.name}</span>
                          <span className="text-xs text-muted-foreground/70">{skill.level}</span>
                        </div>
                        <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                          <div 
                            className={`h-full rounded-full ${category.bgColor.replace('bg-', 'bg-').replace('/10', '')}`}
                            style={{ 
                              width: skill.level === 'Expert' ? '95%' : 
                                     skill.level === 'Advanced' ? '80%' : '65%' 
                            }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        
        {/* Languages & Certs */}
        <div className="grid lg:grid-cols-3 gap-6 max-w-7xl mx-auto scroll-animate">
          <div className="lg:col-span-2 glass p-8 md:p-10 rounded-[2rem] flex flex-col justify-center">
            <h3 className="text-2xl font-bold font-heading mb-6 flex items-center">
              <Shield className="h-6 w-6 mr-3 text-primary" />
              Certifications & Training
            </h3>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-muted/30 border border-border/50">
                <div className="font-semibold mb-1">Ethical Hacking from Scratch</div>
                <div className="text-sm text-muted-foreground">zSecurity | Udemy</div>
              </div>
              <div className="p-4 rounded-2xl bg-muted/30 border border-border/50">
                <div className="font-semibold mb-1">Geoprocessing Using Python</div>
                <div className="text-sm text-muted-foreground">Indian Institute of Remote Sensing</div>
              </div>
              <div className="p-4 rounded-2xl bg-muted/30 border border-border/50">
                <div className="font-semibold mb-1">Data Mining & Business Analytics</div>
                <div className="text-sm text-muted-foreground">Infosys Springboard</div>
              </div>
            </div>
          </div>
          
          <div className="glass p-8 md:p-10 rounded-[2rem] flex flex-col justify-center">
            <h3 className="text-2xl font-bold font-heading mb-6 flex items-center">
              <Globe className="h-6 w-6 mr-3 text-secondary" />
              Languages
            </h3>
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-muted/30 border border-border/50 flex justify-between items-center">
                <span className="font-semibold">English</span>
                <span className="text-sm text-muted-foreground">Fluent</span>
              </div>
              <div className="p-4 rounded-2xl bg-muted/30 border border-border/50 flex justify-between items-center">
                <span className="font-semibold">Hindi</span>
                <span className="text-sm text-muted-foreground">Native</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SkillsModern;