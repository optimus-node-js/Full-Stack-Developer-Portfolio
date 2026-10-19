import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { FileText, Mail, Github, Linkedin, ArrowUpRight, Sparkles, Briefcase, User, GraduationCap, Send, BookOpenText, Workflow, CheckCircle2 } from 'lucide-react';
import { bioData, contactInfo } from '@/data/resume-data';
import { motion } from 'framer-motion';
import { useState, useEffect, useCallback } from 'react';
import InteractiveTerminal from '@/components/InteractiveTerminal';
import AnimatedCounter from '@/components/AnimatedCounter';
import FeaturedCaseStudy from '@/components/FeaturedCaseStudy';
import TechMarquee from '@/components/TechMarquee';
import HireCTA from '@/components/HireCTA';
import { caseStudies, capabilityMap } from '@/data/case-studies';

const ROLES = ['Product Engineer', 'Marketplace & SaaS Builder', 'AI Engineer', 'Security-minded Architect'];

function useTypewriter(words: string[], typingMs = 80, pauseMs = 2000, deletingMs = 40) {
  const [text, setText] = useState('');
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  const tick = useCallback(() => {
    const current = words[wordIndex];
    if (!isDeleting) {
      setText(current.slice(0, text.length + 1));
      if (text.length + 1 === current.length) {
        setTimeout(() => setIsDeleting(true), pauseMs);
        return;
      }
    } else {
      setText(current.slice(0, text.length - 1));
      if (text.length - 1 === 0) {
        setIsDeleting(false);
        setWordIndex((i) => (i + 1) % words.length);
        return;
      }
    }
  }, [words, wordIndex, text, isDeleting, pauseMs]);

  useEffect(() => {
    const delay = isDeleting ? deletingMs : typingMs;
    const timer = setTimeout(tick, delay);
    return () => clearTimeout(timer);
  }, [tick, isDeleting, typingMs, deletingMs]);

  return text;
}

const HomePage = () => {
  const typed = useTypewriter(ROLES);

  const socialLinks = [
    { icon: Mail, href: `mailto:${contactInfo.email}`, label: 'Email' },
    { icon: Linkedin, href: contactInfo.linkedin, label: 'LinkedIn' },
    { icon: Github, href: contactInfo.github, label: 'GitHub' },
  ];

  const explorer = [
    { to: '/about', label: 'About', icon: User, hint: 'who I am & my stack' },
    { to: '/journey', label: 'Journey', icon: GraduationCap, hint: 'experience + education' },
    { to: '/work', label: 'Work', icon: Briefcase, hint: 'selected projects' },
    { to: '/case-studies', label: 'Case Studies', icon: BookOpenText, hint: 'how I shipped them' },
    { to: '/how-i-work', label: 'How I Work', icon: Workflow, hint: 'my engineering playbook' },
    { to: '/contact', label: 'Contact', icon: Send, hint: "let's talk" },
  ];

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="relative min-h-screen flex flex-col justify-center overflow-hidden pt-24 pb-36 lg:pb-16"
    >
      {/* Ambient */}
      <div className="absolute inset-0 bg-background" />
      <div className="absolute inset-0 grid-overlay pointer-events-none" />
      <div className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-primary/20 rounded-full blur-[140px] animate-aurora" />
      <div className="absolute -bottom-40 -left-40 w-[600px] h-[600px] bg-secondary/20 rounded-full blur-[140px] animate-aurora" style={{ animationDelay: '3s' }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-tertiary/10 rounded-full blur-[120px]" />

      <div className="relative z-10 w-full px-5 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-[1.05fr_0.95fr] gap-8 sm:gap-12 lg:gap-16 items-center [&>*]:min-w-0">
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="text-center lg:text-left"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1.5 rounded-full glass border border-tertiary/30 text-[10px] sm:text-sm max-w-full"
            >
              <span className="pulse-dot shrink-0 mr-1" />
              <span className="font-semibold text-tertiary truncate">Immediate joiner</span>
              <span className="text-muted-foreground">·</span>
              <span className="font-medium text-foreground/90 truncate">Available now</span>
              <span className="text-muted-foreground hidden sm:inline">·</span>
              <span className="text-muted-foreground hidden sm:inline">Remote / Hybrid</span>
            </motion.div>

            <h1 className="mt-6 font-heading font-bold leading-[1.05] tracking-tight text-[1.75rem] sm:text-5xl lg:text-[3.9rem] xl:text-[4.25rem]">
              <motion.span
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="block text-foreground"
              >
                Senior Full Stack
              </motion.span>
              <motion.span
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="block text-gradient-primary animate-gradient-x"
                style={{ backgroundSize: '200% 200%' }}
              >
                Developer.
              </motion.span>
            </h1>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="mt-3 h-7 font-mono text-sm sm:text-base text-primary/80 text-center lg:text-left"
            >
              <span className="text-muted-foreground/60">&gt; </span>
              {typed}
              <span className="animate-blink text-primary">|</span>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55, duration: 0.8 }}
              className="mt-4 max-w-xl mx-auto lg:mx-0 text-[15px] sm:text-lg text-muted-foreground leading-relaxed"
            >
              Hi, I'm <span className="text-foreground font-semibold">Rahul</span>. I ship scalable products end-to-end —
              {' '}<span className="text-foreground">multi-tenant SaaS</span>, <span className="text-foreground">booking marketplaces</span>, <span className="text-foreground">AI agents</span> and <span className="text-foreground">secure APIs</span> — from database design to production.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.65, duration: 0.6 }}
              className="mt-5 flex justify-center lg:justify-start"
            >
              <Link
                to="/project/hind-social-services-module"
                className="group inline-flex items-center gap-2 max-w-full pl-1.5 pr-3 py-1.5 rounded-full border border-border/60 bg-muted/30 hover:border-primary/40 transition-colors text-xs sm:text-sm"
              >
                <span className="shrink-0 px-2 py-0.5 rounded-full bg-gradient-to-r from-primary to-secondary text-primary-foreground text-[10px] font-mono uppercase tracking-wider">New</span>
                <span className="truncate text-muted-foreground group-hover:text-foreground transition-colors">Shipped Hind Social's Services Marketplace · 30 Sep 2026</span>
                <ArrowUpRight className="h-3.5 w-3.5 shrink-0 text-muted-foreground group-hover:text-primary transition-colors" />
              </Link>
            </motion.div>


            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.85, duration: 0.7 }}
              className="mt-8 flex flex-col sm:flex-row gap-3 justify-center lg:justify-start"
            >
              <Link to="/work">
                <Button className="btn-primary-premium h-12 px-7 rounded-full text-base w-full sm:w-auto">
                  <Sparkles className="h-4 w-4" />
                  View My Work
                  <ArrowUpRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link to="/resume">
                <Button
                  variant="outline"
                  className="h-12 px-7 rounded-full text-base border-border/70 bg-background/60 backdrop-blur hover:bg-muted/50 w-full sm:w-auto"
                >
                  <FileText className="mr-2 h-4 w-4" />
                  View Resume
                </Button>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 0.7 }}
              className="mt-10 flex items-center gap-4 justify-center lg:justify-start"
            >
              <div className="h-px w-10 bg-border" />
              <span className="text-xs font-mono uppercase tracking-widest text-muted-foreground">Connect</span>
              <div className="flex gap-2">
                {socialLinks.map((s, i) => {
                  const Icon = s.icon;
                  return (
                    <a
                      key={i}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={s.label}
                      className="h-10 w-10 rounded-full flex items-center justify-center glass border-border/60 text-muted-foreground hover:text-primary hover:border-primary/40 transition-all hover:-translate-y-0.5"
                    >
                      <Icon className="h-4 w-4" />
                    </a>
                  );
                })}
              </div>
            </motion.div>
          </motion.div>

          {/* Right — Interactive Terminal */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-md mx-auto lg:max-w-none"
          >
            <InteractiveTerminal />

            {/* Floating badges — hidden on very small screens to prevent overlap */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
              className="hidden sm:block absolute -top-3 -right-6 glass px-3 py-2 rounded-xl shadow-xl border border-primary/25"
            >
              <div className="text-[9px] text-muted-foreground font-mono uppercase tracking-wider">Uptime</div>
              <div className="text-base font-heading font-bold text-primary">99.9%</div>
            </motion.div>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 1.2 }}
              className="hidden sm:block absolute -bottom-3 -left-6 glass px-3 py-2 rounded-xl shadow-xl border border-secondary/25"
            >
              <div className="text-[9px] text-muted-foreground font-mono uppercase tracking-wider">Critical Breaches</div>
              <div className="text-base font-heading font-bold text-secondary">0</div>
            </motion.div>
          </motion.div>
        </div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.8 }}
          data-ai-section="stats"
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-3 max-w-4xl mx-auto"
        >
          {[
            { end: 3, suffix: '+', label: 'Years Full Stack Engineering' },
            { end: 8, suffix: '+', label: 'Production Systems Shipped' },
            { static: '99.9%', label: 'Uptime Maintained' },
            { static: '0', label: 'Critical Data Breaches' },
          ].map((s, i) => (
            <div key={i} className="glass rounded-2xl p-4 border border-border/60 text-center">
              <div className="text-2xl sm:text-3xl font-heading font-bold text-foreground">
                {'static' in s ? s.static : (
                  <AnimatedCounter end={s.end} suffix={s.suffix} duration={1800} />
                )}
              </div>
              <div className="text-[11px] sm:text-xs text-muted-foreground mt-1 uppercase tracking-wider">{s.label}</div>
            </div>
          ))}
        </motion.div>

        {/* Tech marquee */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="mt-10"
        >
          <TechMarquee />
        </motion.div>

        {/* Featured case study */}
        <div data-ai-section="featured" className="mt-16 max-w-6xl mx-auto">
          <FeaturedCaseStudy compact />
        </div>

        {/* Requirement → proof */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7 }}
          data-ai-section="capabilities"
          className="mt-20 max-w-6xl mx-auto"
        >
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <div className="text-[11px] font-mono uppercase tracking-[0.25em] text-primary">// any.requirement</div>
              <h2 className="mt-2 font-heading font-bold text-2xl sm:text-4xl tracking-tight">
                Whatever you need built, <span className="text-gradient-primary">I’ve shipped it before.</span>
              </h2>
            </div>
            <Link to="/case-studies" className="group inline-flex items-center gap-1.5 text-sm font-medium text-primary">
              All {caseStudies.length} case studies <ArrowUpRight className="h-4 w-4 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>
          <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {capabilityMap.map((c) => (
              <Link
                key={c.slug}
                to={`/case-studies/${c.slug}`}
                className="group rounded-2xl border border-border/60 bg-card/60 p-4 hover:border-primary/40 hover:-translate-y-0.5 transition-all"
              >
                <CheckCircle2 className="h-5 w-5 text-tertiary" />
                <div className="mt-3 font-semibold text-sm leading-snug">{c.need}</div>
                <div className="mt-1 text-xs text-muted-foreground leading-relaxed">{c.proof}</div>
                <div className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-primary opacity-80 group-hover:opacity-100">
                  Read case study <ArrowUpRight className="h-3.5 w-3.5" />
                </div>
              </Link>
            ))}
          </div>
        </motion.section>

        <div data-ai-section="hire" className="mt-16 max-w-6xl mx-auto">
          <HireCTA />
        </div>

        {/* Page explorer CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-16 max-w-4xl mx-auto"
        >
          <div className="text-[11px] font-mono uppercase tracking-[0.25em] text-muted-foreground text-center">explore</div>
          <div className="mt-4 grid grid-cols-2 md:grid-cols-3 gap-3">
            {explorer.map((x) => {
              const Icon = x.icon;
              return (
                <Link
                  key={x.to}
                  to={x.to}
                  className="group glass rounded-2xl p-4 border border-border/60 hover:border-primary/30 transition-all hover:-translate-y-1 relative overflow-hidden"
                >
                  <div className="flex items-start justify-between">
                    <div className="h-9 w-9 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                      <Icon className="h-4 w-4" />
                    </div>
                    <ArrowUpRight className="h-4 w-4 text-muted-foreground group-hover:text-primary group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all" />
                  </div>
                  <div className="mt-3 font-heading font-semibold">{x.label}</div>
                  <div className="text-xs text-muted-foreground">{x.hint}</div>
                </Link>
              );
            })}
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default HomePage;
