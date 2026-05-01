import { Button } from '@/components/ui/button';
import { Download, Mail, Github, Linkedin, ArrowDown, ArrowUpRight, Sparkles } from 'lucide-react';
import { bioData, contactInfo } from '@/data/resume-data';
import { motion } from 'framer-motion';

const Hero = () => {
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

  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-28 pb-16">
      {/* Aurora background */}
      <div className="absolute inset-0 bg-background" />
      <div className="absolute inset-0 grid-overlay pointer-events-none" />
      <div className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-primary/20 rounded-full blur-[140px] animate-aurora" />
      <div className="absolute -bottom-40 -left-40 w-[600px] h-[600px] bg-secondary/20 rounded-full blur-[140px] animate-aurora" style={{ animationDelay: '3s' }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-tertiary/10 rounded-full blur-[120px]" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-[1.15fr_0.85fr] gap-14 lg:gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="text-center lg:text-left"
          >
            {/* Status badge */}
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

            {/* Headline */}
            <h1 className="mt-7 font-heading font-bold leading-[1.02] tracking-tight text-5xl sm:text-6xl lg:text-[5.5rem]">
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

            {/* Subline */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55, duration: 0.8 }}
              className="mt-6 max-w-xl mx-auto lg:mx-0 text-lg sm:text-xl text-muted-foreground leading-relaxed"
            >
              Hi, I'm <span className="text-foreground font-semibold">Rahul</span>. I architect and scale
              {' '}multi-tenant SaaS platforms for <span className="text-foreground">healthcare</span> and <span className="text-foreground">education</span> — owning backend, mobile and cloud end-to-end.
            </motion.p>

            {/* Tech chips */}
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

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.85, duration: 0.7 }}
              className="mt-8 flex flex-col sm:flex-row gap-3 justify-center lg:justify-start"
            >
              <Button
                onClick={() => scrollTo('projects')}
                className="btn-primary-premium h-12 px-7 rounded-full text-base"
                data-testid="button-view-work"
              >
                <Sparkles className="h-4 w-4" />
                View My Work
                <ArrowUpRight className="h-4 w-4" />
              </Button>

              <Button
                variant="outline"
                onClick={handleDownloadResume}
                className="h-12 px-7 rounded-full text-base border-border/70 bg-background/60 backdrop-blur hover:bg-muted/50"
                data-testid="button-download-resume"
              >
                <Download className="mr-2 h-4 w-4" />
                Download Resume
              </Button>
            </motion.div>

            {/* Socials */}
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
                      data-testid={`link-social-${s.label.toLowerCase()}`}
                    >
                      <Icon className="h-4 w-4" />
                    </a>
                  );
                })}
              </div>
            </motion.div>
          </motion.div>

          {/* Right — stats + avatar card */}
          <motion.div
            initial={{ opacity: 0, x: 32 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            <div className="relative mx-auto max-w-md">
              {/* Terminal card */}
              <div className="glass-strong rounded-2xl overflow-hidden border border-border/60 shadow-[0_30px_80px_rgba(0,0,0,0.45)]">
                <div className="flex items-center justify-between px-4 py-3 border-b border-border/60 bg-background/30">
                  <div className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded-full bg-red-500/80" />
                    <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
                    <span className="w-3 h-3 rounded-full bg-green-500/80" />
                  </div>
                  <span className="font-mono text-xs text-muted-foreground">~/rahul/dev.sh</span>
                  <span className="w-12" />
                </div>

                <div className="p-5 font-mono text-sm space-y-1.5">
                  <div><span className="text-tertiary">$</span> <span className="text-muted-foreground">whoami</span></div>
                  <div className="text-foreground">rahul.vishwakarma</div>
                  <div><span className="text-tertiary">$</span> <span className="text-muted-foreground">role</span></div>
                  <div className="text-primary">Senior Full Stack Developer</div>
                  <div><span className="text-tertiary">$</span> <span className="text-muted-foreground">stack</span></div>
                  <div className="text-secondary">TypeScript · Node · React · PostgreSQL · GCP</div>
                  <div><span className="text-tertiary">$</span> <span className="text-muted-foreground">focus</span></div>
                  <div className="text-foreground/90">Multi-tenant SaaS · Healthcare · Education</div>
                  <div><span className="text-tertiary">$</span> <span className="text-muted-foreground">status</span></div>
                  <div className="flex items-center gap-2 text-foreground">
                    <span className="pulse-dot" />
                    Open to opportunities<span className="animate-blink">_</span>
                  </div>
                </div>
              </div>

              {/* Floating stat badges */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -top-5 -right-4 sm:-right-8 glass px-4 py-3 rounded-2xl shadow-xl border border-primary/20"
              >
                <div className="text-xs text-muted-foreground font-mono uppercase tracking-wider">Uptime</div>
                <div className="text-xl font-heading font-bold text-primary">99.9%</div>
              </motion.div>

              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 1.2 }}
                className="absolute -bottom-5 -left-4 sm:-left-10 glass px-4 py-3 rounded-2xl shadow-xl border border-secondary/20"
              >
                <div className="text-xs text-muted-foreground font-mono uppercase tracking-wider">Patient Users</div>
                <div className="text-xl font-heading font-bold text-secondary">5,000+</div>
              </motion.div>
            </div>

            {/* Impact row */}
            <div className="mt-10 grid grid-cols-2 gap-3 max-w-md mx-auto">
              {bioData.stats.slice(0, 4).map((s, i) => (
                <div key={i} className="glass rounded-2xl p-4 border border-border/60">
                  <div className="text-2xl font-heading font-bold text-foreground">{s.value}</div>
                  <div className="text-xs text-muted-foreground mt-0.5">{s.label}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Scroll hint */}
        <motion.button
          onClick={() => scrollTo('about')}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6, duration: 1 }}
          className="hidden md:flex absolute bottom-6 left-1/2 -translate-x-1/2 flex-col items-center gap-2 text-muted-foreground hover:text-foreground group"
          aria-label="Scroll to about"
          data-testid="button-scroll-down"
        >
          <span className="text-[10px] font-mono uppercase tracking-[0.3em]">Scroll</span>
          <div className="h-9 w-5 rounded-full border border-border/60 flex items-start justify-center pt-1">
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
              className="w-1 h-1.5 rounded-full bg-primary"
            />
          </div>
          <ArrowDown className="h-3 w-3 opacity-60" />
        </motion.button>
      </div>
    </section>
  );
};

export default Hero;
