import { educationData, certificationData } from '@/data/resume-data';
import { GraduationCap, Award } from 'lucide-react';
import { motion } from 'framer-motion';

const Education = () => {
  return (
    <section id="education" className="relative py-28 overflow-hidden">
      <div className="absolute inset-0 dot-overlay pointer-events-none" />
      <div className="absolute top-1/2 -left-20 w-[400px] h-[400px] bg-tertiary/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="max-w-4xl mx-auto text-center scroll-animate">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border/70 bg-muted/30 text-xs font-mono uppercase tracking-[0.2em] text-muted-foreground">
            <span className="w-1 h-1 rounded-full bg-primary" /> Education
          </div>
          <h2 className="mt-5 text-4xl sm:text-5xl lg:text-6xl font-heading font-bold tracking-tight">
            Foundations &{' '}
            <span className="text-gradient-primary">continuous learning.</span>
          </h2>
        </div>

        <div className="mt-14 grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Education */}
          <div>
            <div className="flex items-center gap-2 mb-5 text-sm font-mono uppercase tracking-wider text-muted-foreground">
              <GraduationCap className="h-4 w-4 text-primary" /> Formal Education
            </div>
            <div className="space-y-4">
              {educationData.map((e, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.5, delay: i * 0.05 }}
                  className="group glass rounded-2xl p-6 border border-border/60 hover:border-primary/30 transition-colors relative overflow-hidden"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="font-heading font-semibold text-lg">{e.title}</h3>
                      <div className="mt-1 text-sm text-primary">{e.institution}</div>
                      <div className="mt-1 text-xs text-muted-foreground">{e.location}</div>
                    </div>
                    <div className="text-right shrink-0">
                      <div className="text-xs font-mono text-muted-foreground">{e.year}</div>
                      <div className="mt-1 inline-block px-2.5 py-1 rounded-md bg-primary/10 border border-primary/20 text-[11px] font-mono text-primary">
                        {e.grade}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Certifications */}
          <div>
            <div className="flex items-center gap-2 mb-5 text-sm font-mono uppercase tracking-wider text-muted-foreground">
              <Award className="h-4 w-4 text-secondary" /> Certifications
            </div>
            <div className="space-y-4">
              {certificationData.map((c, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.5, delay: i * 0.05 }}
                  className="group glass rounded-2xl p-6 border border-border/60 hover:border-secondary/30 transition-colors"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="font-heading font-semibold text-lg">{c.title}</h3>
                      <div className="mt-1 text-sm text-secondary">{c.issuer}</div>
                      {c.description && (
                        <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{c.description}</p>
                      )}
                    </div>
                    <div className="text-right shrink-0">
                      <div className="inline-block px-2.5 py-1 rounded-md bg-secondary/10 border border-secondary/20 text-[11px] font-mono text-secondary">
                        {c.year}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Education;
