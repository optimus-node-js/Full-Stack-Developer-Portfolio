import { skillsData } from '@/data/resume-data';
import { Code2, Layers, Server, Database, Cloud, Wrench, Bot, Shield } from 'lucide-react';
import { motion } from 'framer-motion';

const iconMap: Record<string, any> = {
  'Languages': Code2,
  'Frontend': Layers,
  'Backend': Server,
  'AI & Integrations': Bot,
  'Databases': Database,
  'Cloud & DevOps': Cloud,
  'Security': Shield,
  'Architecture & Practice': Wrench,
};

const SkillsModern = () => {
  const marqueeTech = [
    'TypeScript', 'Node.js', 'React', 'Next.js', 'PostgreSQL', 'OpenAI', 'GCP', 'MongoDB',
    'Nest.js', 'Redis', 'Capacitor', 'Twilio', 'Zustand', 'OWASP', 'REST', 'TailwindCSS'
  ];

  return (
    <section id="skills" className="relative pt-2 pb-12 overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-primary/10 rounded-full blur-[130px] pointer-events-none" />

      <div className="container mx-auto relative z-10">
        {/* Header */}
        <div className="max-w-4xl mx-auto text-center scroll-animate">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border/70 bg-muted/30 text-xs font-mono uppercase tracking-[0.2em] text-muted-foreground">
            <span className="w-1 h-1 rounded-full bg-primary" /> Skills
          </div>
          <h2 className="mt-5 text-4xl sm:text-5xl lg:text-6xl font-heading font-bold tracking-tight">
            The <span className="text-gradient-primary">stack</span> I ship with.
          </h2>
          <p className="mt-5 text-lg text-muted-foreground">
            Tools and technologies I use to design, build and operate production systems.
          </p>
        </div>

        {/* Marquee */}
        <div className="mt-14 relative marquee-wrapper overflow-hidden py-4 border-y border-border/60">
          <div
            className="pointer-events-none absolute left-0 top-0 bottom-0 w-16 z-10"
            style={{ background: 'linear-gradient(to right, hsl(var(--background)), transparent)' }}
          />
          <div
            className="pointer-events-none absolute right-0 top-0 bottom-0 w-16 z-10"
            style={{ background: 'linear-gradient(to left, hsl(var(--background)), transparent)' }}
          />
          <div className="marquee">
            {[...marqueeTech, ...marqueeTech].map((t, i) => (
              <span
                key={i}
                className="font-mono text-sm text-muted-foreground uppercase tracking-wider flex items-center gap-2 whitespace-nowrap"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* Category grid */}
        <div className="mt-14 grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {skillsData.map((cat, i) => {
            const Icon = iconMap[cat.title] ?? Code2;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                className="group relative glass rounded-2xl p-6 border border-border/60 hover:border-primary/30 transition-all hover:-translate-y-1"
              >
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative">
                  <div className="flex items-center gap-3 mb-5">
                    <div className="h-10 w-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="font-heading font-semibold text-lg">{cat.title}</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {cat.skills.map((s, si) => (
                      <span
                        key={si}
                        className="px-3 py-1.5 rounded-lg bg-muted/40 border border-border/60 text-sm text-foreground/90 font-medium hover:bg-primary/10 hover:text-primary hover:border-primary/30 transition-colors"
                      >
                        {s.name}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default SkillsModern;
