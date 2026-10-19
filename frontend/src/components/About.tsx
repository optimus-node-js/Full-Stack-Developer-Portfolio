import { bioData } from '@/data/resume-data';
import { Shield, Gauge, Layers, Bot } from 'lucide-react';
import { motion } from 'framer-motion';

const highlights = [
  {
    icon: Bot,
    title: 'AI Agent Engineering',
    copy: 'Designed and shipped a production-ready AI Agent PoC with OpenAI, tool calling, and WhatsApp integration in a single day.'
  },
  {
    icon: Gauge,
    title: '99.9% Uptime on GCP',
    copy: 'Owned production systems across healthcare SaaS: deployments, Postgres migrations, critical cron workflows.'
  },
  {
    icon: Layers,
    title: 'End-to-End Product Modules',
    copy: 'Owned the entire Hind Social Services Module (3 service types, bookings, collections, layered security, caching) and shipped it in 4 months, on deadline.'
  },
  {
    icon: Shield,
    title: 'Security & Platform Hardening',
    copy: 'Blue Team contributor: security assessments, OWASP recommendations, threat analysis, and vulnerability documentation.'
  }
];

const About = () => {
  return (
    <section id="about" className="relative py-28 overflow-hidden">
      {/* Ambient bg */}
      <div className="absolute inset-0 dot-overlay pointer-events-none" />
      <div className="absolute top-1/4 -left-20 w-[400px] h-[400px] bg-primary/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-20 w-[400px] h-[400px] bg-secondary/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Section tag */}
        <div className="max-w-5xl mx-auto text-center scroll-animate">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border/70 bg-muted/30 backdrop-blur-sm text-xs font-mono uppercase tracking-[0.2em] text-muted-foreground">
            <span className="w-1 h-1 rounded-full bg-primary" />
            About
          </div>
          <h2 className="mt-5 text-4xl sm:text-5xl lg:text-6xl font-heading font-bold tracking-tight">
            Product engineering,{' '}
            <span className="text-gradient-primary">end-to-end.</span>
          </h2>
          <p className="mt-5 text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Building across full-stack, AI, security, and platform architecture, owning products from
            database design to production deployment.
          </p>
        </div>

        {/* Bio + highlights grid */}
        <div className="mt-16 grid lg:grid-cols-[1.1fr_0.9fr] gap-8">
          {/* Long bio card */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7 }}
            className="relative glass rounded-3xl p-8 lg:p-10 border border-border/60 overflow-hidden"
          >
            <div className="absolute -top-16 -right-16 w-64 h-64 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
            <div className="relative">
              <div className="font-mono text-[11px] uppercase tracking-[0.25em] text-primary mb-5">
                // who.am.i
              </div>
              <div className="space-y-5 text-base sm:text-lg text-muted-foreground leading-relaxed">
                {bioData.longBio.map((p, i) => (
                  <p key={i} className={i === 0 ? 'text-foreground/90' : ''}>{p}</p>
                ))}
              </div>

              <div className="mt-8 pt-6 border-t border-border/60 grid grid-cols-2 sm:grid-cols-4 gap-4">
                {bioData.stats.map((s, i) => (
                  <div key={i}>
                    <div className="text-2xl font-heading font-bold text-foreground">{s.value}</div>
                    <div className="text-xs text-muted-foreground mt-1">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Highlights grid */}
          <div className="grid sm:grid-cols-2 gap-4">
            {highlights.map((h, i) => {
              const Icon = h.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ duration: 0.6, delay: i * 0.07 }}
                  className="group relative glass rounded-2xl p-6 border border-border/60 hover:border-primary/30 transition-all hover:-translate-y-1"
                >
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="relative">
                    <div className="h-11 w-11 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="mt-4 font-heading font-semibold text-lg">{h.title}</h3>
                    <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{h.copy}</p>
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
