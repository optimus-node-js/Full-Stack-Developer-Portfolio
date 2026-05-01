import PageShell from '@/components/PageShell';
import { bioData } from '@/data/resume-data';
import SkillsModern from '@/components/SkillsModern';
import { Shield, Gauge, Layers, Smartphone, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const highlights = [
  { icon: Shield, title: 'Zero Critical Breaches', copy: 'ACL-based architecture with strict cross-org isolation across 20+ tenants.' },
  { icon: Gauge, title: '99.9% Uptime on GCP', copy: 'Owned production systems: deployments, Postgres migrations, critical cron workflows.' },
  { icon: Layers, title: 'Multi-Tenant by Design', copy: 'Scaled healthcare & education SaaS with RBAC and tenant-aware data layers.' },
  { icon: Smartphone, title: 'Web + Native, One Codebase', copy: 'Shipped Android & iOS patient apps with CapacitorJS on shared web-mobile architecture.' },
];

const AboutPage = () => {
  return (
    <PageShell
      label="~/about"
      eyebrow="// who.am.i"
      title={<>Production-grade engineering, <span className="text-gradient-primary">end-to-end.</span></> as unknown as string}
      subtitle="I specialize in building reliable, scalable SaaS across healthcare and education — owning architecture, data, cloud and delivery."
    >
      <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-6">
        {/* Long bio card */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="relative glass rounded-3xl p-6 sm:p-8 lg:p-10 border border-border/60 overflow-hidden"
        >
          <div className="absolute -top-16 -right-16 w-64 h-64 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative">
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

        {/* Highlights */}
        <div className="grid sm:grid-cols-2 gap-4">
          {highlights.map((h, i) => {
            const Icon = h.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.15 + i * 0.05 }}
                className="group glass rounded-2xl p-6 border border-border/60 hover:border-primary/30 transition-all hover:-translate-y-1 relative overflow-hidden"
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

      {/* Skills section — reused */}
      <div className="mt-20">
        <SkillsModern />
      </div>

      {/* Next page CTA */}
      <div className="mt-16 flex flex-col sm:flex-row items-center justify-between gap-4 max-w-5xl mx-auto p-6 rounded-2xl border border-border/60 bg-muted/20">
        <div>
          <div className="text-xs font-mono uppercase tracking-[0.25em] text-muted-foreground">Next</div>
          <div className="font-heading font-bold text-xl mt-1">The Journey — experience & education</div>
        </div>
        <Link to="/journey" className="btn-primary-premium h-11 px-6 rounded-full inline-flex items-center gap-2">
          Continue <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </PageShell>
  );
};

export default AboutPage;
