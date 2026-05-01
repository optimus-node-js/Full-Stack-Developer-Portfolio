import { Button } from '@/components/ui/button';
import { Github, ExternalLink, ArrowUpRight } from 'lucide-react';
import { projectsData } from '@/data/resume-data';
import { motion } from 'framer-motion';
import { useState } from 'react';

const FILTERS = ['All', 'Work', 'SaaS', 'Mobile', 'Open Source'] as const;

const Projects = () => {
  const [filter, setFilter] = useState<string>('All');

  const visible = projectsData.filter((p) => p.category.includes(filter));

  return (
    <section id="projects" className="relative py-28 overflow-hidden">
      <div className="absolute inset-0 grid-overlay pointer-events-none" />
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-secondary/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="max-w-4xl mx-auto text-center scroll-animate">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border/70 bg-muted/30 text-xs font-mono uppercase tracking-[0.2em] text-muted-foreground">
            <span className="w-1 h-1 rounded-full bg-primary" /> Work
          </div>
          <h2 className="mt-5 text-4xl sm:text-5xl lg:text-6xl font-heading font-bold tracking-tight">
            Selected <span className="text-gradient-primary">projects.</span>
          </h2>
          <p className="mt-5 text-lg text-muted-foreground">
            A mix of real production systems and side-projects I care about.
          </p>
        </div>

        {/* Filters */}
        <div className="mt-12 flex flex-wrap justify-center gap-2">
          {FILTERS.map((f) => {
            const active = filter === f;
            return (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all border ${
                  active
                    ? 'bg-primary text-primary-foreground border-primary shadow-glow'
                    : 'bg-muted/30 text-muted-foreground border-border/60 hover:border-primary/30 hover:text-foreground'
                }`}
                data-testid={`filter-${f.toLowerCase().replace(' ', '-')}`}
              >
                {f}
              </button>
            );
          })}
        </div>

        {/* Grid */}
        <div className="mt-12 grid md:grid-cols-2 gap-6 max-w-6xl mx-auto">
          {visible.map((p, i) => (
            <motion.article
              key={`${p.title}-${i}`}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.55, delay: i * 0.05 }}
              className="group relative rounded-3xl overflow-hidden border border-border/60 bg-card hover:-translate-y-1 transition-transform"
            >
              {/* Image */}
              <div className="relative aspect-[16/10] overflow-hidden">
                <img
                  src={p.image}
                  alt={p.title}
                  className="w-full h-full object-cover transition-transform duration-[900ms] group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card via-card/40 to-transparent" />
                <div className="absolute top-4 left-4 flex gap-1.5">
                  {p.category.filter((c) => c !== 'All').slice(0, 2).map((c) => (
                    <span key={c} className="px-2.5 py-1 rounded-full text-[10px] font-mono uppercase tracking-wider bg-background/70 backdrop-blur border border-border/60 text-foreground/90">
                      {c}
                    </span>
                  ))}
                </div>
                <div className="absolute top-4 right-4 flex gap-2">
                  {p.github && (
                    <a
                      href={p.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-9 h-9 rounded-full flex items-center justify-center bg-background/70 backdrop-blur border border-border/60 text-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
                      onClick={(e) => e.stopPropagation()}
                      aria-label="GitHub"
                    >
                      <Github className="h-4 w-4" />
                    </a>
                  )}
                  {p.link && (
                    <a
                      href={p.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-9 h-9 rounded-full flex items-center justify-center bg-background/70 backdrop-blur border border-border/60 text-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
                      onClick={(e) => e.stopPropagation()}
                      aria-label="Open project"
                    >
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  )}
                </div>
              </div>

              {/* Body */}
              <div className="p-6 lg:p-7 relative">
                <div className="text-xs font-mono text-muted-foreground">{p.period}</div>
                <h3 className="mt-2 font-heading font-bold text-xl sm:text-2xl group-hover:text-primary transition-colors">
                  {p.title}
                </h3>
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed line-clamp-3">
                  {p.description}
                </p>
                <div className="mt-5 flex flex-wrap gap-1.5">
                  {p.technologies.slice(0, 6).map((t, ti) => (
                    <span key={ti} className="px-2.5 py-1 rounded-md bg-muted/50 border border-border/60 text-[11px] font-mono text-muted-foreground">
                      {t.name}
                    </span>
                  ))}
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <Button
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="btn-primary-premium h-12 px-7 rounded-full text-base"
          >
            Let's build something
            <ArrowUpRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Projects;
