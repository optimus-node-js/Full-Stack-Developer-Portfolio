import { involvementData } from '@/data/resume-data';
import { Users, Medal, HandHelping } from 'lucide-react';
import { motion } from 'framer-motion';

const iconFor = (title: string) => {
  if (/medal/i.test(title)) return Medal;
  if (/founder|community/i.test(title)) return Users;
  return HandHelping;
};

const Involvement = () => {
  return (
    <section id="involvement" className="relative pt-2 pb-8 overflow-hidden">
      <div className="absolute inset-0 grid-overlay pointer-events-none" />
      <div className="absolute top-1/3 right-0 w-[400px] h-[400px] bg-primary/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="container mx-auto relative z-10">
        <div className="max-w-4xl mx-auto text-center scroll-animate">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border/70 bg-muted/30 text-xs font-mono uppercase tracking-[0.2em] text-muted-foreground">
            <span className="w-1 h-1 rounded-full bg-primary" /> Beyond Code
          </div>
          <h2 className="mt-5 text-4xl sm:text-5xl lg:text-6xl font-heading font-bold tracking-tight">
            Community &{' '}
            <span className="text-gradient-secondary">leadership.</span>
          </h2>
          <p className="mt-5 text-lg text-muted-foreground">
            Volunteering, co-founding and leading — because the best engineers care beyond the codebase.
          </p>
        </div>

        <div className="mt-14 grid md:grid-cols-3 gap-5 max-w-6xl mx-auto">
          {involvementData.map((item, i) => {
            const Icon = iconFor(item.title);
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.55, delay: i * 0.07 }}
                className="group glass rounded-2xl p-6 border border-border/60 hover:border-primary/30 transition-all hover:-translate-y-1 relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative">
                  <div className="h-11 w-11 rounded-xl bg-secondary/10 border border-secondary/20 flex items-center justify-center text-secondary">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="mt-4 text-xs font-mono text-muted-foreground uppercase tracking-wider">{item.period}</div>
                  <h3 className="mt-1.5 font-heading font-bold text-lg">{item.title}</h3>
                  <div className="mt-1 text-sm text-primary">{item.organization}</div>
                  <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{item.description}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Involvement;
