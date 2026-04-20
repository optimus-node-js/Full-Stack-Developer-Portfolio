import AnimatedCounter from './AnimatedCounter';
import { Layers, Database, TrendingUp, Users } from 'lucide-react';
import { motion } from 'framer-motion';

const About = () => {
  const highlights = [
    {
      title: "Full-Stack Expertise",
      description: "Proficient in MERN stack, Python, and modern web technologies with a focus on scalable solutions.",
      icon: Layers,
      count: 15,
      suffix: "+",
      label: "Projects"
    },
    {
      title: "AI & Data Science",
      description: "Experienced in machine learning, data analysis, and building intelligent systems for real-world applications.",
      icon: Database,
      count: 8,
      suffix: "+",
      label: "ML Models"
    },
    {
      title: "Algorithmic Trading",
      description: "Specialized in developing automated trading systems and financial data analysis tools.",
      icon: TrendingUp,
      count: 5,
      suffix: "+",
      label: "Trading Systems"
    },
    {
      title: "Leadership",
      description: "Proven track record in team management and community building with strong collaborative skills.",
      icon: Users,
      count: 3,
      suffix: "+",
      label: "Years Leading"
    }
  ];

  return (
    <section id="about" className="py-24 bg-background relative overflow-hidden">
      {/* Dynamic Background Elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] pointer-events-none mix-blend-screen" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-secondary/5 rounded-full blur-[120px] pointer-events-none mix-blend-screen" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-20 scroll-animate">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 font-heading">
              Behind the <span className="text-primary">Code</span>
            </h2>
            <div className="w-24 h-1.5 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full mb-8"></div>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto font-body">
              A blend of technical precision and creative problem-solving.
            </p>
          </div>

          {/* Main Content - Bento Grid */}
          <div className="grid lg:grid-cols-3 gap-6 lg:gap-8 mb-16 lg:mb-20">
            {/* Bio Card */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="lg:col-span-2 glass p-8 md:p-12 rounded-[2.5rem] border border-border/50 group relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
              
              <h3 className="text-3xl md:text-4xl font-bold mb-8 font-heading text-foreground relative z-10">
                Passionate Developer & <span className="text-secondary">Problem Solver</span>
              </h3>
              
              <div className="space-y-6 text-muted-foreground leading-relaxed text-lg relative z-10">
                <p>
                  As a versatile full-stack developer, I bring a unique blend of technical expertise 
                  and creative problem-solving to every project. My journey spans across diverse 
                  technologies, from building robust web applications to developing sophisticated 
                  AI-powered solutions.
                </p>
                
                <p>
                  With hands-on experience in algorithmic trading, data analysis, and cybersecurity, 
                  I specialize in creating systems that not only function flawlessly but also drive 
                  meaningful business outcomes. My approach combines cutting-edge technology with 
                  practical business solutions.
                </p>
                
                <p>
                  Beyond coding, I'm passionate about leadership and community building, having 
                  successfully managed teams and fostered collaborative environments that encourage 
                  innovation and growth.
                </p>
              </div>
            </motion.div>

            {/* Impact Metrics Card */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="glass p-8 md:p-10 rounded-[2.5rem] border border-border/50 flex flex-col justify-center relative overflow-hidden group"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-secondary/5 to-primary/5 opacity-50 mix-blend-overlay"></div>
              
              <h4 className="text-2xl font-bold mb-10 text-center font-heading relative z-10">Impact By Numbers</h4>
              
              <div className="grid grid-cols-2 gap-x-6 gap-y-10 text-center relative z-10">
                <div>
                  <div className="text-5xl font-bold text-primary mb-2 font-heading">
                    <AnimatedCounter end={3} suffix="+" />
                  </div>
                  <div className="text-sm text-muted-foreground font-semibold uppercase tracking-wider">Years Exp.</div>
                </div>
                <div>
                  <div className="text-5xl font-bold text-secondary mb-2 font-heading">
                    <AnimatedCounter end={15} suffix="+" />
                  </div>
                  <div className="text-sm text-muted-foreground font-semibold uppercase tracking-wider">Projects</div>
                </div>
                <div>
                  <div className="text-5xl font-bold text-primary mb-2 font-heading">
                    <AnimatedCounter end={10} suffix="+" />
                  </div>
                  <div className="text-sm text-muted-foreground font-semibold uppercase tracking-wider">Tech Stack</div>
                </div>
                <div>
                  <div className="text-5xl font-bold text-secondary mb-2 font-heading">
                    <AnimatedCounter end={5} suffix="+" />
                  </div>
                  <div className="text-sm text-muted-foreground font-semibold uppercase tracking-wider">Certs</div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Highlights Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {highlights.map((highlight, index) => {
              const Icon = highlight.icon;
              return (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  key={index}
                  className="glass p-8 rounded-[2rem] border border-border/50 hover:border-primary/30 transition-all duration-300 group flex flex-col hover:-translate-y-2 hover:shadow-2xl"
                >
                  <div className="h-14 w-14 rounded-2xl bg-muted flex items-center justify-center mb-8 group-hover:bg-primary/20 group-hover:scale-110 transition-all duration-300">
                    <Icon className="h-7 w-7 text-muted-foreground group-hover:text-primary transition-colors" />
                  </div>
                  
                  <h4 className="text-xl font-bold mb-4 font-heading group-hover:text-primary transition-colors duration-300">
                    {highlight.title}
                  </h4>
                  
                  <p className="text-muted-foreground leading-relaxed mb-8 text-sm flex-1">
                    {highlight.description}
                  </p>
                  
                  <div className="mt-auto border-t border-border/50 pt-6">
                    <div className="text-4xl font-bold font-heading text-foreground mb-1">
                      <AnimatedCounter end={highlight.count} suffix={highlight.suffix} />
                    </div>
                    <span className="text-xs text-muted-foreground font-semibold uppercase tracking-wider">{highlight.label}</span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;