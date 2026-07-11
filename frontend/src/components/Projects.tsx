import { Button } from '@/components/ui/button';
import { Github, ExternalLink, ArrowUpRight } from 'lucide-react';
import { projectsData } from '@/data/resume-data';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const FILTERS = ['All', 'Work', 'SaaS', 'AI', 'Mobile', 'Open Source'] as const;

const Projects = () => {
  const [filter, setFilter] = useState<string>('All');

  const visible = projectsData.filter((p) => p.category.includes(filter));

  return (
    <section id="projects" className="relative pt-2 pb-12 overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-secondary/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="container mx-auto relative z-10">
        {/* Filters — horizontally scrollable on mobile */}
        <div className="flex flex-nowrap sm:flex-wrap sm:justify-center gap-2 overflow-x-auto sm:overflow-visible pb-2 sm:pb-0 scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0">
          {FILTERS.map((f) => {
            const active = filter === f;
            return (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all border whitespace-nowrap ${
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
        <motion.div layout className="mt-8 sm:mt-10 grid md:grid-cols-2 gap-5 sm:gap-6 max-w-6xl mx-auto">
          <AnimatePresence mode="popLayout">
          {visible.map((p, i) => (
            <motion.article
              key={p.slug}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.35, delay: i * 0.05 }}
              className="group relative rounded-3xl overflow-hidden border border-border/60 bg-card hover:-translate-y-1 transition-transform"
              data-testid={`project-card-${p.slug}`}
            >
              {/* Clickable cover */}
              <Link
                to={`/project/${p.slug}`}
                className="block relative aspect-[16/10] overflow-hidden"
                aria-label={`Open ${p.title} case study`}
              >
                <img
                  src={p.image}
                  alt={p.title}
                  loading="lazy"
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
              </Link>

              {/* Body */}
              <Link to={`/project/${p.slug}`} className="block p-6 lg:p-7 relative">
                <div className="flex items-start justify-between gap-2">
                  <div className="text-xs font-mono text-muted-foreground">{p.period}</div>
                  <ArrowUpRight className="h-4 w-4 text-muted-foreground group-hover:text-primary group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all" />
                </div>
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
              </Link>
            </motion.article>
          ))}
          </AnimatePresence>
        </motion.div>

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
