import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Download, Mail, Github, Linkedin, ArrowUpRight, Sparkles, Briefcase, User, GraduationCap, Send } from 'lucide-react';
import { bioData, contactInfo } from '@/data/resume-data';
import { motion } from 'framer-motion';
import InteractiveTerminal from '@/components/InteractiveTerminal';

const HomePage = () => {
  const handleDownloadResume = () => {
    const link = document.createElement('a');
    link.href = '/resume.pdf';
    link.download = 'Rahul_Vishwakarma_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const socialLinks = [
    { icon: Mail, href: `mailto:${contactInfo.email}`, label: 'Email' },
    { icon: Linkedin, href: contactInfo.linkedin, label: 'LinkedIn' },
    { icon: Github, href: contactInfo.github, label: 'GitHub' },
  ];

  const techChips = ['TypeScript', 'Node.js', 'React', 'PostgreSQL', 'GCP', 'Nest.js'];

  const explorer = [
    { to: '/about', label: 'About', icon: User, hint: 'who I am & my stack' },
    { to: '/journey', label: 'Journey', icon: GraduationCap, hint: 'experience + education' },
    { to: '/work', label: 'Work', icon: Briefcase, hint: 'selected projects' },
    { to: '/contact', label: 'Contact', icon: Send, hint: "let's talk" },
  ];

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="relative min-h-screen flex flex-col justify-center overflow-hidden pt-28 pb-32 md:pb-16"
    >
      {/* Ambient */}
      <div className="absolute inset-0 bg-background" />
      <div className="absolute inset-0 grid-overlay pointer-events-none" />
      <div className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-primary/20 rounded-full blur-[140px] animate-aurora" />
      <div className="absolute -bottom-40 -left-40 w-[600px] h-[600px] bg-secondary/20 rounded-full blur-[140px] animate-aurora" style={{ animationDelay: '3s' }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-tertiary/10 rounded-full blur-[120px]" />

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid lg:grid-cols-[1.05fr_0.95fr] gap-10 sm:gap-12 lg:gap-16 items-center">
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
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass border border-tertiary/30 text-sm"
            >
              <span className="pulse-dot" />
              <span className="font-medium text-foreground/90">Available for senior roles</span>
              <span className="text-muted-foreground">·</span>
              <span className="text-muted-foreground">Remote / Hybrid</span>
            </motion.div>

            <h1 className="mt-7 font-heading font-bold leading-[1.04] tracking-tight text-[2.5rem] sm:text-6xl lg:text-[4.5rem]">
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

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55, duration: 0.8 }}
              className="mt-6 max-w-xl mx-auto lg:mx-0 text-lg text-muted-foreground leading-relaxed"
            >
              Hi, I'm <span className="text-foreground font-semibold">Rahul</span>. I architect and scale
              {' '}multi-tenant SaaS platforms for <span className="text-foreground">healthcare</span> and <span className="text-foreground">education</span>—owning backend, mobile and cloud end-to-end.
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.7 }}
              className="mt-7 flex flex-wrap justify-center lg:justify-start gap-2"
            >
              {techChips.map((t) => (
                <span
                  key={t}
                  className="px-3 py-1 rounded-full glass text-xs font-mono text-muted-foreground border border-border/60"
                >
                  {t}
                </span>
              ))}
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
              <Button
                variant="outline"
                onClick={handleDownloadResume}
                className="h-12 px-7 rounded-full text-base border-border/70 bg-background/60 backdrop-blur hover:bg-muted/50"
              >
                <Download className="mr-2 h-4 w-4" />
                Download Resume
              </Button>
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
            className="relative"
          >
            <InteractiveTerminal />

            {/* Floating badges */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute -top-3 right-2 sm:-right-6 glass px-3 py-2 rounded-xl shadow-xl border border-primary/25"
            >
              <div className="text-[9px] text-muted-foreground font-mono uppercase tracking-wider">Uptime</div>
              <div className="text-base font-heading font-bold text-primary">99.9%</div>
            </motion.div>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 1.2 }}
              className="absolute -bottom-3 left-2 sm:-left-6 glass px-3 py-2 rounded-xl shadow-xl border border-secondary/25"
            >
              <div className="text-[9px] text-muted-foreground font-mono uppercase tracking-wider">Patient Users</div>
              <div className="text-base font-heading font-bold text-secondary">5,000+</div>
            </motion.div>
          </motion.div>
        </div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.8 }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-3 max-w-4xl mx-auto"
        >
          {bioData.stats.map((s, i) => (
            <div key={i} className="glass rounded-2xl p-4 border border-border/60 text-center">
              <div className="text-2xl sm:text-3xl font-heading font-bold text-foreground">{s.value}</div>
              <div className="text-[11px] sm:text-xs text-muted-foreground mt-1 uppercase tracking-wider">{s.label}</div>
            </div>
          ))}
        </motion.div>

        {/* Page explorer CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.25, duration: 0.8 }}
          className="mt-10 max-w-4xl mx-auto"
        >
          <div className="text-[11px] font-mono uppercase tracking-[0.25em] text-muted-foreground text-center">explore</div>
          <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-3">
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
