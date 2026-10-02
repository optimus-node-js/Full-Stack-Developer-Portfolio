import { useEffect, useState, type ReactNode } from 'react';
import { Link, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Building2,
  CalendarDays,
  Clock,
  UserRound,
  ShieldCheck,
  Gauge,
  Trophy,
  Lightbulb,
  Scale,
  CheckCircle2,
} from 'lucide-react';
import PageShell from '@/components/PageShell';
import HireCTA from '@/components/HireCTA';
import { caseStudies } from '@/data/case-studies';

const SECTIONS = [
  { id: 'context', label: 'Context' },
  { id: 'constraints', label: 'Constraints' },
  { id: 'approach', label: 'Approach' },
  { id: 'architecture', label: 'Architecture' },
  { id: 'decisions', label: 'Decisions' },
  { id: 'security', label: 'Security & performance' },
  { id: 'results', label: 'Results' },
] as const;

const Section = ({ id, eyebrow, title, children }: { id: string; eyebrow: string; title: string; children: ReactNode }) => (
  <motion.section
    id={id}
    initial={{ opacity: 0, y: 18 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-60px' }}
    transition={{ duration: 0.5 }}
    className="scroll-mt-28"
  >
    <div className="text-[11px] font-mono uppercase tracking-[0.3em] text-primary">{eyebrow}</div>
    <h2 className="mt-2 font-heading font-bold text-xl sm:text-2xl tracking-tight">{title}</h2>
    <div className="mt-5">{children}</div>
  </motion.section>
);

const CaseStudyPage = () => {
  const { slug } = useParams();
  const index = caseStudies.findIndex((c) => c.slug === slug);
  const cs = caseStudies[index];
  const [active, setActive] = useState<string>('context');

  useEffect(() => {
    const els = SECTIONS.map((s) => document.getElementById(s.id)).filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: '-20% 0px -65% 0px' },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [slug]);

  if (!cs) {
    return (
      <PageShell label="~/404">
        <div className="text-center max-w-xl mx-auto py-10">
          <h1 className="text-3xl font-heading font-bold">Case study not found</h1>
          <Link to="/case-studies" className="mt-6 inline-flex items-center gap-2 text-primary">
            <ArrowLeft className="h-4 w-4" /> All case studies
          </Link>
        </div>
      </PageShell>
    );
  }

  const prev = caseStudies[(index - 1 + caseStudies.length) % caseStudies.length];
  const next = caseStudies[(index + 1) % caseStudies.length];

  return (
    <PageShell label={`~/case-studies/${cs.slug}`}>
      <div className="max-w-6xl mx-auto -mt-4 mb-6">
        <Link
          to="/case-studies"
          className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.25em] text-muted-foreground hover:text-foreground transition-colors group"
        >
          <ArrowLeft className="h-3.5 w-3.5 group-hover:-translate-x-0.5 transition-transform" />
          All case studies
        </Link>
      </div>

      {/* Hero */}
      <motion.header
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-6xl mx-auto"
      >
        <div className="flex flex-wrap items-center gap-2 text-[11px] font-mono">
          <span className="px-2.5 py-1 rounded-full bg-primary/10 border border-primary/25 text-primary uppercase tracking-wider">{cs.domain}</span>
          <span className="inline-flex items-center gap-1 text-muted-foreground"><Clock className="h-3 w-3" />{cs.readingTime}</span>
        </div>
        <div className="mt-5 text-sm text-muted-foreground">{cs.tagline}</div>
        <h1 className="mt-2 font-heading font-bold tracking-tight text-[1.75rem] sm:text-5xl lg:text-6xl leading-[1.08] max-w-4xl">
          {cs.title}
        </h1>
        <p className="mt-5 text-base sm:text-lg text-muted-foreground leading-relaxed max-w-3xl">{cs.summary}</p>

        <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-3">
          {[
            { icon: Building2, label: 'Company', value: cs.company },
            { icon: UserRound, label: 'My role', value: cs.role },
            { icon: CalendarDays, label: 'Timeline', value: cs.timeline },
          ].map(({ icon: Icon, label, value }) => (
            <div key={label} className="glass rounded-2xl p-4 border border-border/60 min-w-0">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Icon className="h-3.5 w-3.5 text-primary" />
                <span className="text-[10px] font-mono uppercase tracking-[0.25em]">{label}</span>
              </div>
              <div className="mt-1.5 font-semibold text-sm sm:text-[15px]">{value}</div>
            </div>
          ))}
        </div>

        <div data-ai-section="metrics" className="mt-3 grid grid-cols-2 md:grid-cols-4 gap-3">
          {cs.metrics.map((m, i) => (
            <motion.div
              key={m.label}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + i * 0.07 }}
              className="rounded-2xl p-4 border border-primary/20 bg-gradient-to-br from-primary/10 via-transparent to-secondary/10"
            >
              <div className="font-heading font-bold text-2xl sm:text-3xl text-gradient-primary">{m.value}</div>
              <div className="mt-1 text-[10px] sm:text-[11px] text-muted-foreground uppercase tracking-wider leading-snug">{m.label}</div>
            </motion.div>
          ))}
        </div>
      </motion.header>

      {/* Mobile section chips */}
      <nav className="lg:hidden mt-10 -mx-4 px-4 flex gap-2 overflow-x-auto scrollbar-hide" aria-label="Sections">
        {SECTIONS.map((s) => (
          <a key={s.id} href={`#${s.id}`} className="shrink-0 px-3 py-1.5 rounded-full text-xs border border-border/60 bg-muted/30 text-muted-foreground">
            {s.label}
          </a>
        ))}
      </nav>

      <div className="max-w-6xl mx-auto mt-10 lg:mt-16 grid lg:grid-cols-[200px_1fr] gap-10 lg:gap-14">
        {/* Desktop TOC */}
        <aside className="hidden lg:block">
          <nav className="sticky top-28 space-y-1" aria-label="Sections">
            <div className="text-[10px] font-mono uppercase tracking-[0.3em] text-muted-foreground mb-3">On this page</div>
            {SECTIONS.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                className={`block text-sm py-1.5 pl-3 border-l-2 transition-colors ${
                  active === s.id ? 'border-primary text-foreground font-medium' : 'border-border/60 text-muted-foreground hover:text-foreground'
                }`}
              >
                {s.label}
              </a>
            ))}
            <div className="pt-6 flex flex-wrap gap-1.5">
              {cs.stack.map((t) => (
                <span key={t} className="px-2 py-0.5 rounded-md bg-muted/50 border border-border/60 text-[10px] font-mono text-muted-foreground">{t}</span>
              ))}
            </div>
          </nav>
        </aside>

        <article className="min-w-0 space-y-14 sm:space-y-16">
          <Section id="context" eyebrow="01 · context" title="The situation">
            <p className="text-[15px] sm:text-base text-foreground/85 leading-relaxed">{cs.context}</p>
            <div className="mt-5 rounded-2xl border-l-4 border-primary bg-primary/5 p-5">
              <div className="text-[11px] font-mono uppercase tracking-[0.25em] text-primary">The problem</div>
              <p className="mt-2 text-[15px] sm:text-base font-medium leading-relaxed">{cs.problem}</p>
            </div>
          </Section>

          <Section id="constraints" eyebrow="02 · constraints" title="What made it hard">
            <ul className="grid sm:grid-cols-2 gap-3">
              {cs.constraints.map((c) => (
                <li key={c} className="flex gap-3 rounded-2xl border border-border/60 bg-card/60 p-4 text-sm leading-relaxed">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-amber-500 shrink-0" />
                  {c}
                </li>
              ))}
            </ul>
          </Section>

          <Section id="approach" eyebrow="03 · approach" title="How I delivered it">
            <ol className="relative border-l border-border/70 ml-2 space-y-6">
              {cs.phases.map((p, i) => (
                <li key={p.name} className="pl-6 relative">
                  <span className="absolute -left-[13px] top-0 h-6 w-6 rounded-full bg-gradient-to-br from-primary to-secondary text-[11px] font-bold text-primary-foreground flex items-center justify-center">
                    {i + 1}
                  </span>
                  <div className="flex flex-wrap items-baseline gap-x-3">
                    <h3 className="font-heading font-semibold">{p.name}</h3>
                    {p.window && <span className="text-xs font-mono text-muted-foreground">{p.window}</span>}
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground leading-relaxed">{p.detail}</p>
                </li>
              ))}
            </ol>
          </Section>

          <Section id="architecture" eyebrow="04 · architecture" title="How it fits together">
            <div className="space-y-2">
              {cs.architecture.map((l, i) => (
                <motion.div
                  key={l.layer}
                  initial={{ opacity: 0, x: -12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06 }}
                  className="grid sm:grid-cols-[170px_1fr] gap-1 sm:gap-4 rounded-2xl border border-border/60 bg-card/60 p-4"
                  style={{ borderLeft: `3px solid hsl(var(--${i % 2 ? 'secondary' : 'primary'}))` }}
                >
                  <div className="font-mono text-xs uppercase tracking-wider text-foreground/90">{l.layer}</div>
                  <div className="text-sm text-muted-foreground leading-relaxed">{l.detail}</div>
                </motion.div>
              ))}
            </div>
          </Section>

          <Section id="decisions" eyebrow="05 · decisions" title="Key decisions and trade-offs">
            <div className="grid gap-3">
              {cs.decisions.map((d) => (
                <div key={d.title} className="rounded-2xl border border-border/60 bg-card/60 p-5">
                  <h3 className="font-heading font-semibold">{d.title}</h3>
                  <div className="mt-3 grid sm:grid-cols-2 gap-3 text-sm">
                    <div>
                      <div className="flex items-center gap-1.5 text-[11px] font-mono uppercase tracking-wider text-tertiary"><Lightbulb className="h-3.5 w-3.5" /> Why</div>
                      <p className="mt-1 text-muted-foreground leading-relaxed">{d.why}</p>
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5 text-[11px] font-mono uppercase tracking-wider text-amber-500"><Scale className="h-3.5 w-3.5" /> Trade-off</div>
                      <p className="mt-1 text-muted-foreground leading-relaxed">{d.tradeoff}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Section>

          <Section id="security" eyebrow="06 · production" title="Security & performance">
            <div className="grid md:grid-cols-2 gap-3">
              {[
                { icon: ShieldCheck, title: 'Security', items: cs.security, color: 'text-secondary' },
                { icon: Gauge, title: 'Performance & reliability', items: cs.performance, color: 'text-primary' },
              ]
                .filter((b) => b.items.length)
                .map(({ icon: Icon, title, items, color }) => (
                  <div key={title} className="rounded-2xl border border-border/60 bg-card/60 p-5">
                    <div className={`flex items-center gap-2 font-heading font-semibold ${color}`}><Icon className="h-4 w-4" />{title}</div>
                    <ul className="mt-3 space-y-2">
                      {items.map((it) => (
                        <li key={it} className="flex gap-2 text-sm text-foreground/85 leading-relaxed">
                          <CheckCircle2 className="h-4 w-4 mt-0.5 shrink-0 text-tertiary" />
                          {it}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
            </div>
          </Section>

          <Section id="results" eyebrow="07 · results" title="What shipped">
            <ul className="space-y-2.5">
              {cs.results.map((r) => (
                <li key={r} className="flex gap-3 rounded-2xl border border-tertiary/20 bg-tertiary/5 p-4 text-[15px] leading-relaxed">
                  <Trophy className="h-5 w-5 shrink-0 text-tertiary" />
                  {r}
                </li>
              ))}
            </ul>
            <div className="mt-6 rounded-2xl border border-border/60 bg-muted/20 p-5">
              <div className="text-[11px] font-mono uppercase tracking-[0.25em] text-muted-foreground">What I took away</div>
              {cs.lessons.map((l) => (
                <p key={l} className="mt-2 text-[15px] italic text-foreground/85 leading-relaxed">“{l}”</p>
              ))}
            </div>
            {cs.projectSlug && (
              <Link to={`/project/${cs.projectSlug}`} className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-primary">
                See the project page <ArrowUpRight className="h-4 w-4" />
              </Link>
            )}
          </Section>

          <div className="lg:hidden flex flex-wrap gap-1.5">
            {cs.stack.map((t) => (
              <span key={t} className="px-2.5 py-1 rounded-md bg-muted/50 border border-border/60 text-[11px] font-mono text-muted-foreground">{t}</span>
            ))}
          </div>
        </article>
      </div>

      {/* Prev / next */}
      <nav className="max-w-6xl mx-auto mt-16 grid sm:grid-cols-2 gap-3" aria-label="More case studies">
        {[
          { cs: prev, dir: 'Previous', Icon: ArrowLeft },
          { cs: next, dir: 'Next', Icon: ArrowRight },
        ].map(({ cs: item, dir, Icon }) => (
          <Link
            key={dir}
            to={`/case-studies/${item.slug}`}
            className={`group rounded-2xl border border-border/60 bg-card/60 p-5 hover:border-primary/40 transition-colors ${dir === 'Next' ? 'sm:text-right' : ''}`}
          >
            <div className={`flex items-center gap-1.5 text-[11px] font-mono uppercase tracking-[0.25em] text-muted-foreground ${dir === 'Next' ? 'sm:justify-end' : ''}`}>
              {dir === 'Previous' && <Icon className="h-3.5 w-3.5" />}
              {dir}
              {dir === 'Next' && <Icon className="h-3.5 w-3.5" />}
            </div>
            <div className="mt-2 font-heading font-semibold group-hover:text-primary transition-colors">{item.title}</div>
          </Link>
        ))}
      </nav>

      <div className="max-w-6xl mx-auto mt-10">
        <HireCTA />
      </div>
    </PageShell>
  );
};

export default CaseStudyPage;
