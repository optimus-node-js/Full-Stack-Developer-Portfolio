import { Users, Medal, HandHeart } from 'lucide-react';
import { motion, Variants } from 'framer-motion';

const Involvement = () => {
  const involvement = [
    {
      title: "Co-Founder and Head",
      organization: "Express Yourself Community",
      period: "May 2020 - February 2022",
      description: "Founded an NGO-dedicated community that connects people across diverse communities worldwide, focusing on social challenges and mental health.",
      icon: Users
    },
    {
      title: "Bronze Medallist",
      organization: "Commutiny - The Youth Collective",
      period: "Q-ki National Championship | June - August 2021",
      description: "Received bronze medal in national competition focused on youth development and leadership skills.",
      icon: Medal
    },
    {
      title: "Database Management Volunteer",
      organization: "Commutiny - The Youth Collective",
      period: "November 2021 - February 2022",
      description: "Led volunteer team managing databases for 30 NGOs while contributing to social causes and community development.",
      icon: HandHeart
    }
  ];

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const itemVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100, damping: 15 }
    }
  };

  return (
    <section id="involvement" className="py-24 bg-background relative border-t border-border/50 overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-[30%] left-[10%] w-[300px] h-[300px] bg-secondary/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-[10%] w-[400px] h-[400px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-20 scroll-animate">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 font-heading">
            Achievements & <span className="text-secondary">Involvement</span>
          </h2>
          <div className="w-24 h-1.5 bg-gradient-to-r from-secondary to-primary mx-auto rounded-full mb-8"></div>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto font-body">
            My activities and achievements beyond professional work, showcasing leadership, 
            community involvement, and recognition in various domains.
          </p>
        </div>

        <div className="max-w-7xl mx-auto">
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid lg:grid-cols-3 gap-6 lg:gap-8 mb-20"
          >
            {involvement.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div 
                  key={index}
                  variants={itemVariants}
                  className="group glass p-8 md:p-10 rounded-[2.5rem] border border-border/50 hover:border-secondary/30 transition-all duration-300 relative overflow-hidden flex flex-col hover:-translate-y-2 hover:shadow-2xl"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-secondary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  <div className="relative z-10 flex flex-col h-full">
                    <div className="w-16 h-16 rounded-2xl bg-secondary/10 flex items-center justify-center mb-8 group-hover:scale-110 group-hover:bg-secondary transition-all duration-500">
                      <Icon className="h-8 w-8 text-secondary group-hover:text-secondary-foreground transition-colors duration-500" />
                    </div>

                    <h3 className="text-2xl font-bold font-heading mb-4 text-foreground group-hover:text-secondary transition-colors">
                      {item.title}
                    </h3>
                    
                    <div className="font-bold text-foreground/80 mb-2">
                      {item.organization}
                    </div>
                    
                    <div className="text-sm font-medium text-muted-foreground mb-6 uppercase tracking-wider bg-muted/50 inline-block px-3 py-1 rounded-full w-fit">
                      {item.period}
                    </div>
                    
                    <p className="text-muted-foreground/90 leading-relaxed text-sm mt-auto">
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Additional Highlights */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-center"
          >
            <h3 className="text-2xl font-bold mb-10 font-heading text-foreground">
              Key Highlights
            </h3>
            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <div className="glass p-8 rounded-[2rem] border border-border/50 hover:border-secondary/20 transition-colors group">
                <div className="text-4xl lg:text-5xl font-bold font-heading text-secondary mb-3 group-hover:scale-110 transition-transform">30+</div>
                <div className="text-sm font-medium text-muted-foreground uppercase tracking-wider">NGOs Database Management</div>
              </div>
              <div className="glass p-8 rounded-[2rem] border border-border/50 hover:border-primary/20 transition-colors group">
                <div className="text-4xl lg:text-5xl font-bold font-heading text-primary mb-3 group-hover:scale-110 transition-transform">2+</div>
                <div className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Years Community Leadership</div>
              </div>
              <div className="glass p-8 rounded-[2rem] border border-border/50 hover:border-accent/20 transition-colors group">
                <div className="text-4xl lg:text-5xl font-bold font-heading text-accent mb-3 group-hover:scale-110 transition-transform">1</div>
                <div className="text-sm font-medium text-muted-foreground uppercase tracking-wider">National Championship Medal</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Involvement;
