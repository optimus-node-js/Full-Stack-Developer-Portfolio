import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { experienceData, experienceSlug } from '@/data/resume-data';
import { Briefcase, MapPin, Calendar, ArrowRight, Stethoscope, GraduationCap, Code2, Rocket } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const iconMap = {
  Stethoscope,
  GraduationCap,
  Code2,
  Rocket,
  Briefcase,
} as const;

const ExperienceSwitcher = () => {
  const [params] = useSearchParams();
  const requested = params.get('exp');
  const indexFor = (slug: string | null) => Math.max(0, experienceData.findIndex((e) => experienceSlug(e) === slug));
  const [active, setActive] = useState(() => indexFor(requested));
  const current = experienceData[active];

  // Deep link (?exp=<company-slug>) - used by the AI assistant to open a specific role.
  useEffect(() => {
    if (requested) setActive(indexFor(requested));
  }, [requested]);

  return (
    <div className="grid lg:grid-cols-[280px_1fr] gap-6">
      {/* Company tabs */}
      <div className="flex lg:flex-col gap-2 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0 -mx-1 px-1 scrollbar-hide">
        {experienceData.map((exp, i) => {
          const isActive = i === active;
          const IconName = (exp.icon || 'Briefcase') as keyof typeof iconMap;
          const Icon = iconMap[IconName] || Briefcase;
          return (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`group relative shrink-0 lg:w-full text-left p-4 rounded-2xl border transition-all ${
                isActive
                  ? 'bg-primary/10 border-primary/30 shadow-glow'
                  : 'bg-muted/20 border-border/60 hover:border-primary/25 hover:bg-muted/40'
              }`}
              data-testid={`tab-company-${i}`}
            >
              {isActive && (
                <motion.span
                  layoutId="activeCompany"
                  className="absolute left-0 top-3 bottom-3 w-[3px] rounded-r-full bg-gradient-to-b from-primary to-secondary"
                  transition={{ type: 'spring', damping: 25, stiffness: 280 }}
                />
              )}
              <div className="flex items-center gap-3">
                <div
                  className={`h-10 w-10 rounded-xl flex items-center justify-center shrink-0 ${
                    isActive
                      ? 'bg-gradient-to-br from-primary to-secondary text-primary-foreground'
                      : 'bg-muted text-muted-foreground group-hover:text-foreground'
                  }`}
                >
                  <Icon className="h-[18px] w-[18px]" />
                </div>
                <div className="min-w-0">
                  <div className={`font-heading font-semibold text-sm truncate ${isActive ? 'text-foreground' : 'text-foreground/80'}`}>
                    {exp.company}
                  </div>
                  <div className="text-[11px] text-muted-foreground truncate font-mono">{exp.period}</div>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Detail panel */}
      <div className="relative min-h-[420px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -16 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="glass-strong rounded-3xl p-6 sm:p-8 lg:p-10 border border-border/60 relative overflow-hidden"
          >
            <div className="absolute -top-20 -right-20 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
            <div className="relative">
              <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-muted-foreground">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary">
                  <Briefcase className="h-3 w-3" /> {current.company}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Calendar className="h-3 w-3" /> {current.period}
                </span>
                {current.location && (
                  <span className="inline-flex items-center gap-1.5">
                    <MapPin className="h-3 w-3" /> {current.location}
                  </span>
                )}
              </div>

              <h3 className="mt-4 font-heading font-bold text-2xl sm:text-3xl text-foreground">
                {current.title}
              </h3>

              {current.stack && (
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {current.stack.map((s, si) => (
                    <span
                      key={si}
                      className="px-2.5 py-1 rounded-md bg-muted/40 border border-border/60 text-[11px] font-mono text-foreground/90"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              )}

              <div className="mt-6 pt-6 border-t border-border/60">
                <div className="text-[11px] font-mono uppercase tracking-[0.25em] text-primary mb-4">
                  // impact
                </div>
                <ul className="space-y-3 text-sm sm:text-[15px] text-foreground/85 leading-relaxed">
                  {current.description.map((d, di) => (
                    <motion.li
                      key={di}
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.05 + di * 0.06 }}
                      className="flex gap-3"
                    >
                      <ArrowRight className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                      <span>{d}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ExperienceSwitcher;
