import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowUpRight, Clock, CheckCircle2 } from 'lucide-react';
import PageShell from '@/components/PageShell';
import SpotlightCard from '@/components/SpotlightCard';
import HireCTA from '@/components/HireCTA';
import { caseStudies, capabilityMap } from '@/data/case-studies';

const CaseStudiesPage = () => {
  return (
    <PageShell
      label="~/case-studies"
      eyebrow="// how.i.ship"
      title={<>Case studies from <span className="text-gradient-primary">real production systems.</span></>}
      subtitle="Not screenshots. The problem, the constraints, the architecture, the trade-offs and what shipped. Each one is something running for real users."
    >
      {/* Requirement → proof */}
      <section data-ai-section="capabilities" className="max-w-6xl mx-auto">
        <div className="text-[11px] font-mono uppercase tracking-[0.25em] text-muted-foreground">Got a requirement? Here’s the proof</div>
        <div className="mt-4 grid sm:grid-cols-2 gap-2.5">
          {capabilityMap.map((c, i) => (
            <motion.div
              key={c.slug}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.04 }}
            >
              <Link
                to={`/case-studies/${c.slug}`}
                className="group flex items-start gap-3 rounded-2xl border border-border/60 bg-card/60 p-4 hover:border-primary/40 transition-colors h-full"
              >
                <CheckCircle2 className="h-5 w-5 text-tertiary shrink-0 mt-0.5" />
                <div className="min-w-0 flex-1">
                  <div className="font-semibold text-sm sm:text-[15px]">{c.need}</div>
                  <div className="text-xs sm:text-sm text-muted-foreground mt-0.5">{c.proof}</div>
                </div>
                <ArrowUpRight className="h-4 w-4 shrink-0 text-muted-foreground group-hover:text-primary group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all" />
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Case study grid */}
      <section data-ai-section="list" className="max-w-6xl mx-auto mt-14">
        <div className="text-[11px] font-mono uppercase tracking-[0.25em] text-muted-foreground">{caseStudies.length} case studies</div>
        <div className="mt-4 grid md:grid-cols-2 gap-4 sm:gap-5">
          {caseStudies.map((cs, i) => (
            <motion.div
              key={cs.slug}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: (i % 2) * 0.06 }}
              className={i === 0 ? 'md:col-span-2' : ''}
            >
              <Link to={`/case-studies/${cs.slug}`} className="block h-full" data-testid={`case-study-${cs.slug}`}>
                <SpotlightCard beam={i === 0} className="h-full p-5 sm:p-7 flex flex-col">
                  <div className="flex flex-wrap items-center gap-2 text-[11px] font-mono text-muted-foreground">
                    <span className="px-2 py-0.5 rounded-full bg-primary/10 border border-primary/20 text-primary">{cs.domain}</span>
                    <span>{cs.timeline}</span>
                    <span className="inline-flex items-center gap-1"><Clock className="h-3 w-3" />{cs.readingTime}</span>
                  </div>
                  <div className="mt-3 text-xs text-muted-foreground">{cs.tagline}</div>
                  <h2 className={`mt-1 font-heading font-bold tracking-tight leading-tight ${i === 0 ? 'text-2xl sm:text-4xl' : 'text-xl sm:text-2xl'}`}>
                    {cs.title}
                  </h2>
                  <p className="mt-3 text-sm text-muted-foreground leading-relaxed line-clamp-3">{cs.summary}</p>
                  <div className={`mt-5 grid gap-2 ${i === 0 ? 'grid-cols-2 sm:grid-cols-4' : 'grid-cols-2'}`}>
                    {cs.metrics.slice(0, i === 0 ? 4 : 2).map((m) => (
                      <div key={m.label} className="rounded-xl bg-background/50 border border-border/60 px-3 py-2">
                        <div className="font-heading font-bold text-lg">{m.value}</div>
                        <div className="text-[10px] text-muted-foreground uppercase tracking-wider leading-snug">{m.label}</div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-auto pt-5 inline-flex items-center gap-1.5 text-sm font-medium text-primary">
                    Read case study <ArrowUpRight className="h-4 w-4" />
                  </div>
                </SpotlightCard>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      <div className="max-w-6xl mx-auto mt-14">
        <HireCTA />
      </div>
    </PageShell>
  );
};

export default CaseStudiesPage;
