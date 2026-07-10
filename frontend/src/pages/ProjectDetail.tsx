import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Github, ExternalLink, Calendar, User, CircleCheck, Lightbulb, Target, ArrowRight, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import { projectsData } from '@/data/resume-data';
import PageShell from '@/components/PageShell';

const ProjectDetail = () => {
  const { projectId } = useParams();
  const project = projectsData.find((p) => p.slug === projectId);

  if (!project) {
    return (
      <PageShell label="~/404">
        <div className="text-center max-w-xl mx-auto py-10">
          <div className="text-6xl mb-4">🚀</div>
          <h1 className="text-3xl font-heading font-bold">Project not found</h1>
          <p className="text-muted-foreground mt-3">That project slug doesn't exist. Head back to the work page.</p>
          <Link to="/work" className="mt-6 inline-block">
            <Button className="btn-primary-premium h-11 px-6 rounded-full">
              <ArrowLeft className="h-4 w-4" /> Back to Work
            </Button>
          </Link>
        </div>
      </PageShell>
    );
  }

  const others = projectsData.filter((p) => p.slug !== project.slug).slice(0, 3);

  return (
    <PageShell label={`~/project/${project.slug}`}>
      {/* Back link */}
      <div className="max-w-6xl mx-auto -mt-6 mb-6">
        <Link
          to="/work"
          className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.25em] text-muted-foreground hover:text-foreground transition-colors group"
          data-testid="back-to-work"
        >
          <ArrowLeft className="h-3.5 w-3.5 group-hover:-translate-x-0.5 transition-transform" />
          Back to work
        </Link>
      </div>

      {/* Hero */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-6xl mx-auto grid lg:grid-cols-[1.2fr_0.8fr] gap-8 lg:gap-10"
      >
        <div>
          <div className="flex flex-wrap items-center gap-2">
            {project.category
              .filter((c) => c !== 'All')
              .map((c) => (
                <span
                  key={c}
                  className="px-2.5 py-1 rounded-full text-[10px] font-mono uppercase tracking-wider bg-primary/10 border border-primary/25 text-primary"
                >
                  {c}
                </span>
              ))}
            {project.status && (
              <span className="px-2.5 py-1 rounded-full text-[10px] font-mono uppercase tracking-wider bg-tertiary/10 border border-tertiary/25 text-tertiary">
                {project.status}
              </span>
            )}
          </div>
          <h1 className="mt-5 font-heading font-bold tracking-tight text-3xl sm:text-4xl lg:text-5xl leading-[1.1]">
            {project.title}
          </h1>
          {project.subtitle && (
            <p className="mt-3 text-lg text-gradient-primary font-medium">{project.subtitle}</p>
          )}
          <p className="mt-5 text-base sm:text-lg text-muted-foreground leading-relaxed">
            {project.description}
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            {project.github && (
              <a href={project.github} target="_blank" rel="noopener noreferrer">
                <Button variant="outline" className="h-11 px-5 rounded-full border-border/70 bg-background/50 hover:bg-muted/50">
                  <Github className="h-4 w-4" /> View Code
                </Button>
              </a>
            )}
            {project.link && (
              <a href={project.link} target="_blank" rel="noopener noreferrer">
                <Button className="btn-primary-premium h-11 px-5 rounded-full">
                  <ExternalLink className="h-4 w-4" /> Visit Project
                </Button>
              </a>
            )}
          </div>
        </div>

        {/* Image card */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="relative rounded-3xl overflow-hidden border border-border/60 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.5)] aspect-[4/3] lg:aspect-auto"
        >
          <img src={project.image} alt={project.title} loading="lazy" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
        </motion.div>
      </motion.section>

      {/* Meta row */}
      <section className="max-w-6xl mx-auto mt-12 grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { icon: Calendar, label: 'Period', value: project.period },
          { icon: Sparkles, label: 'Duration', value: project.duration || '—' },
          { icon: User, label: 'Role', value: project.role || 'Developer' },
          { icon: CircleCheck, label: 'Status', value: project.status || '—' },
        ].map((m, i) => {
          const Icon = m.icon;
          return (
            <div key={i} className="glass rounded-2xl p-4 border border-border/60">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Icon className="h-3.5 w-3.5 text-primary" />
                <div className="text-[10px] font-mono uppercase tracking-[0.25em]">{m.label}</div>
              </div>
              <div className="mt-1.5 font-heading font-semibold text-sm sm:text-base text-foreground">{m.value}</div>
            </div>
          );
        })}
      </section>

      {/* Content grid */}
      <section className="max-w-6xl mx-auto mt-14 grid lg:grid-cols-[1fr_320px] gap-8">
        {/* Main story */}
        <div className="space-y-8">
          {project.longDescription && (
            <div className="glass rounded-3xl p-6 sm:p-8 border border-border/60">
              <div className="text-[11px] font-mono uppercase tracking-[0.3em] text-primary mb-4">// overview</div>
              <div className="text-base text-foreground/85 leading-relaxed whitespace-pre-line">
                {project.longDescription}
              </div>
            </div>
          )}

          {project.highlights && project.highlights.length > 0 && (
            <div className="glass rounded-3xl p-6 sm:p-8 border border-border/60">
              <div className="text-[11px] font-mono uppercase tracking-[0.3em] text-primary mb-4 flex items-center gap-2">
                <Sparkles className="h-3 w-3" /> highlights
              </div>
              <ul className="grid sm:grid-cols-2 gap-3">
                {project.highlights.map((h, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: 10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.05 * i }}
                    className="flex items-start gap-3 p-3 rounded-xl bg-muted/30 border border-border/40"
                  >
                    <CircleCheck className="h-4 w-4 text-tertiary mt-0.5 shrink-0" />
                    <span className="text-sm text-foreground/85">{h}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
          )}

          <div className="grid md:grid-cols-2 gap-4">
            {project.challenges && project.challenges.length > 0 && (
              <div className="glass rounded-3xl p-6 border border-border/60">
                <div className="text-[11px] font-mono uppercase tracking-[0.3em] text-yellow-500/80 mb-4 flex items-center gap-2">
                  <Lightbulb className="h-3 w-3" /> challenges
                </div>
                <ul className="space-y-2.5">
                  {project.challenges.map((c, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-sm text-foreground/80">
                      <span className="h-1.5 w-1.5 rounded-full bg-yellow-500/60 mt-2 shrink-0" />
                      <span>{c}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {project.outcomes && project.outcomes.length > 0 && (
              <div className="glass rounded-3xl p-6 border border-border/60">
                <div className="text-[11px] font-mono uppercase tracking-[0.3em] text-emerald-500/80 mb-4 flex items-center gap-2">
                  <Target className="h-3 w-3" /> outcomes
                </div>
                <ul className="space-y-2.5">
                  {project.outcomes.map((o, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-sm text-foreground/80">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-500/60 mt-2 shrink-0" />
                      <span>{o}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Side rail */}
        <aside className="space-y-4">
          <div className="glass rounded-3xl p-6 border border-border/60 sticky top-28">
            <div className="text-[11px] font-mono uppercase tracking-[0.3em] text-primary mb-4">stack</div>
            <div className="flex flex-wrap gap-1.5">
              {project.technologies.map((t, i) => (
                <span
                  key={i}
                  className="px-2.5 py-1 rounded-md bg-muted/50 border border-border/60 text-[11px] font-mono text-foreground/90"
                >
                  {t.name}
                </span>
              ))}
            </div>

            <div className="mt-6 pt-5 border-t border-border/50 space-y-2">
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3 rounded-xl bg-background/40 border border-border/50 hover:border-primary/30 hover:bg-muted/40 transition-all group"
                >
                  <span className="flex items-center gap-2 text-sm"><Github className="h-4 w-4" /> GitHub</span>
                  <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 transition-all" />
                </a>
              )}
              {project.link && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3 rounded-xl bg-background/40 border border-border/50 hover:border-primary/30 hover:bg-muted/40 transition-all group"
                >
                  <span className="flex items-center gap-2 text-sm"><ExternalLink className="h-4 w-4" /> Live Link</span>
                  <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 transition-all" />
                </a>
              )}
              <Link
                to="/contact"
                className="flex items-center justify-between p-3 rounded-xl bg-primary/10 border border-primary/25 text-primary hover:bg-primary/20 transition-all group"
              >
                <span className="flex items-center gap-2 text-sm font-medium">Talk about this</span>
                <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>
          </div>
        </aside>
      </section>

      {/* Other projects */}
      {others.length > 0 && (
        <section className="max-w-6xl mx-auto mt-20">
          <div className="flex items-end justify-between mb-6">
            <div>
              <div className="text-[11px] font-mono uppercase tracking-[0.3em] text-primary">// keep exploring</div>
              <h3 className="mt-2 font-heading font-bold text-2xl sm:text-3xl">Other projects</h3>
            </div>
            <Link to="/work" className="text-sm text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-1">
              All projects <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            {others.map((p) => (
              <Link
                key={p.slug}
                to={`/project/${p.slug}`}
                className="group glass rounded-2xl overflow-hidden border border-border/60 hover:border-primary/30 transition-all hover:-translate-y-1"
              >
                <div className="aspect-[16/10] overflow-hidden">
                  <img src={p.image} alt={p.title} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-4">
                  <div className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground">{p.period}</div>
                  <div className="mt-1 font-heading font-semibold text-sm">{p.title}</div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </PageShell>
  );
};

export default ProjectDetail;
