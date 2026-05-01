import { experienceData } from '@/data/resume-data';
import { Briefcase, MapPin, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';

const Experience = () => {
  return (
    <section id="experience" className="relative py-28 overflow-hidden">
      <div className="absolute inset-0 dot-overlay pointer-events-none" />
      <div className="absolute top-1/3 right-0 w-[400px] h-[400px] bg-secondary/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="max-w-4xl mx-auto text-center scroll-animate">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border/70 bg-muted/30 text-xs font-mono uppercase tracking-[0.2em] text-muted-foreground">
            <span className="w-1 h-1 rounded-full bg-primary" /> Experience
          </div>
          <h2 className="mt-5 text-4xl sm:text-5xl lg:text-6xl font-heading font-bold tracking-tight">
            Building things that <span className="text-gradient-primary">matter.</span>
          </h2>
          <p className="mt-5 text-lg text-muted-foreground">
            Recent roles owning healthcare & education SaaS, mobile apps and freelance backend work.
          </p>
        </div>

        {/* Timeline */}
        <div className="mt-16 max-w-4xl mx-auto relative">
          {/* Vertical line */}
          <div className="absolute left-4 lg:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-border to-transparent -translate-x-0 lg:-translate-x-1/2" />

          <div className="space-y-10">
            {experienceData.map((exp, i) => {
              const leftSide = i % 2 === 0;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ duration: 0.6, delay: i * 0.05 }}
                  className={`relative lg:grid lg:grid-cols-2 lg:gap-10 ${leftSide ? '' : 'lg:[&>*:first-child]:col-start-2'}`}
                >
                  {/* Node dot */}
                  <div className="absolute left-4 lg:left-1/2 top-6 -translate-x-1/2 z-10">
                    <div className="relative w-4 h-4">
                      <div className="absolute inset-0 rounded-full bg-primary/30 animate-ping" />
                      <div className="relative w-4 h-4 rounded-full bg-gradient-to-br from-primary to-secondary border-2 border-background" />
                    </div>
                  </div>

                  <div className={`pl-12 lg:pl-0 ${leftSide ? 'lg:pr-10 lg:text-right' : 'lg:pl-10'}`}>
                    <div className="group glass rounded-2xl p-6 lg:p-7 border border-border/60 hover:border-primary/30 transition-all hover:-translate-y-1 relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                      <div className="relative">
                        <div className={`flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-muted-foreground ${leftSide ? 'lg:justify-end' : ''}`}>
                          <Calendar className="h-3 w-3" />
                          {exp.period}
                        </div>
                        <h3 className="mt-3 font-heading font-bold text-xl sm:text-2xl text-foreground">{exp.title}</h3>
                        <div className={`mt-1 flex items-center gap-2 text-primary text-sm font-medium ${leftSide ? 'lg:justify-end' : ''}`}>
                          <Briefcase className="h-3.5 w-3.5" />
                          {exp.company}
                          {exp.location && (
                            <>
                              <span className="text-muted-foreground">·</span>
                              <span className="text-muted-foreground flex items-center gap-1">
                                <MapPin className="h-3 w-3" />
                                {exp.location}
                              </span>
                            </>
                          )}
                        </div>
                        <ul className={`mt-4 space-y-2 text-sm text-muted-foreground leading-relaxed ${leftSide ? 'lg:text-right' : ''}`}>
                          {exp.description.map((d, di) => (
                            <li key={di} className={`flex gap-2 ${leftSide ? 'lg:flex-row-reverse' : ''}`}>
                              <span className="text-primary mt-1.5 shrink-0">▸</span>
                              <span>{d}</span>
                            </li>
                          ))}
                        </ul>
                        {exp.stack && (
                          <div className={`mt-4 flex flex-wrap gap-1.5 ${leftSide ? 'lg:justify-end' : ''}`}>
                            {exp.stack.map((s, si) => (
                              <span key={si} className="px-2.5 py-1 rounded-md bg-primary/10 border border-primary/20 text-[11px] font-mono text-primary">
                                {s}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
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

export default Experience;
