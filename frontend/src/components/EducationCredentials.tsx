import { educationData, certificationData } from '@/data/resume-data';
import { GraduationCap, Award, Calendar, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';

const EducationCredentials = () => {
  return (
    <div className="space-y-14">
      {/* Education - credential badge cards */}
      <div>
        <div className="flex items-center gap-2 mb-6 text-xs font-mono uppercase tracking-[0.3em] text-muted-foreground">
          <GraduationCap className="h-4 w-4 text-primary" />
          <span>formal education</span>
        </div>
        <div className="grid md:grid-cols-3 gap-5">
          {educationData.map((e, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="group relative rounded-3xl overflow-hidden"
            >
              {/* Gradient border frame */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/50 via-secondary/30 to-transparent rounded-3xl opacity-60 group-hover:opacity-100 transition-opacity" />
              <div className="relative m-[1px] rounded-[calc(1.5rem-1px)] bg-card p-6 h-full flex flex-col">
                {/* Top badge */}
                <div className="flex items-start justify-between gap-3 mb-6">
                  <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-glow">
                    <GraduationCap className="h-5 w-5 text-primary-foreground" />
                  </div>
                  <div className="px-2.5 py-1 rounded-md bg-primary/10 border border-primary/20 text-[11px] font-mono text-primary">
                    {e.grade}
                  </div>
                </div>

                <h4 className="font-heading font-bold text-lg leading-tight">{e.title}</h4>
                <div className="mt-2 text-sm text-primary">{e.institution}</div>

                <div className="mt-auto pt-5 flex items-center justify-between text-xs text-muted-foreground font-mono">
                  <span className="inline-flex items-center gap-1.5">
                    <MapPin className="h-3 w-3" /> {e.location}
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <Calendar className="h-3 w-3" /> {e.year}
                  </span>
                </div>

                {/* Shine strip */}
                <div className="absolute -top-12 -right-12 w-24 h-24 bg-gradient-to-br from-white/10 to-transparent rounded-full blur-2xl" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Certifications */}
      <div>
        <div className="flex items-center gap-2 mb-6 text-xs font-mono uppercase tracking-[0.3em] text-muted-foreground">
          <Award className="h-4 w-4 text-secondary" />
          <span>certifications</span>
        </div>
        <div className="grid md:grid-cols-3 gap-5">
          {certificationData.map((c, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="glass rounded-2xl p-5 border border-border/60 hover:border-secondary/30 transition-all hover:-translate-y-1 relative overflow-hidden"
            >
              <div className="flex items-start gap-3">
                <div className="h-10 w-10 rounded-xl bg-secondary/10 border border-secondary/20 flex items-center justify-center text-secondary shrink-0">
                  <Award className="h-4 w-4" />
                </div>
                <div className="min-w-0">
                  <h5 className="font-heading font-semibold text-base leading-snug">{c.title}</h5>
                  <div className="mt-1 text-xs text-secondary">{c.issuer} · {c.year}</div>
                  {c.description && (
                    <p className="mt-2 text-xs text-muted-foreground leading-relaxed">{c.description}</p>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EducationCredentials;
