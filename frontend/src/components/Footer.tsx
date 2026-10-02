import { Link } from 'react-router-dom';
import { Github, Linkedin, Mail, ArrowUp, Heart, Sparkles } from 'lucide-react';
import { contactInfo } from '@/data/resume-data';
import { motion } from 'framer-motion';

const Footer = () => {
  const year = new Date().getFullYear();

  const socialLinks = [
    { icon: Mail, href: `mailto:${contactInfo.email}`, label: 'Email', color: 'from-primary to-primary/60' },
    { icon: Linkedin, href: contactInfo.linkedin, label: 'LinkedIn', color: 'from-secondary to-secondary/60' },
    { icon: Github, href: contactInfo.github, label: 'GitHub', color: 'from-tertiary to-tertiary/60' },
  ];

  const navLinks = [
    { label: 'Home', to: '/' },
    { label: 'About', to: '/about' },
    { label: 'Journey', to: '/journey' },
    { label: 'Work', to: '/work' },
    { label: 'Contact', to: '/contact' },
  ];

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <footer className="relative pb-28 md:pb-10 pt-14 overflow-hidden">
      {/* Liquid background */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-border/70 to-transparent" />
      <motion.div
        aria-hidden
        className="absolute top-10 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-primary/15 rounded-full blur-[140px] pointer-events-none"
        animate={{ scale: [1, 1.1, 1], opacity: [0.8, 1, 0.8] }}
        transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        aria-hidden
        className="absolute top-0 right-0 w-[400px] h-[400px] bg-secondary/10 rounded-full blur-[130px] pointer-events-none"
        animate={{ scale: [1, 1.15, 1], opacity: [0.6, 0.9, 0.6] }}
        transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
      />

      <div className="container mx-auto relative z-10">
        {/* Liquid-glass island */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative rounded-[28px] md:rounded-[36px] border border-white/10 bg-white/[0.04] dark:bg-white/[0.03] backdrop-blur-2xl shadow-[0_24px_80px_-20px_rgba(0,0,0,0.5)] overflow-hidden"
        >
          {/* iPhone 17 specular highlight */}
          <div className="absolute inset-0 rounded-[inherit] pointer-events-none" aria-hidden>
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent opacity-70" />
            <div className="absolute -top-px left-4 right-4 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />
            <div className="absolute -bottom-px left-10 right-10 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          </div>

          <div className="relative p-6 sm:p-8 md:p-10">
            <div className="grid md:grid-cols-[1.2fr_1fr_1fr] gap-10">
              {/* Brand */}
              <div>
                <Link to="/" className="inline-flex items-center gap-3 group">
                  <motion.div
                    whileHover={{ rotate: [0, -8, 8, 0] }}
                    transition={{ duration: 0.5 }}
                    className="w-11 h-11 rounded-2xl bg-gradient-to-br from-primary via-primary to-secondary flex items-center justify-center text-sm font-bold text-primary-foreground shadow-[0_10px_30px_-8px_rgba(99,102,241,0.6)]"
                  >
                    RV
                  </motion.div>
                  <div className="text-left">
                    <div className="font-heading font-bold text-base">Rahul Vishwakarma</div>
                    <div className="text-[11px] text-muted-foreground font-mono tracking-wide">Senior Full Stack Developer</div>
                  </div>
                </Link>
                <p className="mt-5 text-sm text-muted-foreground leading-relaxed max-w-xs">
                  Full-stack, AI, security, and platform architecture — shipping scalable products end-to-end.
                </p>

                <div className="mt-5 inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-tertiary/25 bg-tertiary/10 text-[11px] font-mono">
                  <span className="pulse-dot" /> available for senior roles
                </div>
              </div>

              {/* Nav */}
              <div>
                <div className="text-[11px] font-mono uppercase tracking-[0.3em] text-muted-foreground mb-5 flex items-center gap-2">
                  <Sparkles className="h-3 w-3 text-primary" /> Navigate
                </div>
                <div className="grid grid-cols-2 gap-y-3 gap-x-6">
                  {navLinks.map((l) => (
                    <Link
                      key={l.to}
                      to={l.to}
                      className="group text-sm text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-1.5"
                      data-testid={`footer-link-${l.label.toLowerCase()}`}
                    >
                      <span className="h-1 w-1 rounded-full bg-muted-foreground/40 group-hover:bg-primary group-hover:scale-150 transition-all" />
                      <span>{l.label}</span>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Socials */}
              <div>
                <div className="text-[11px] font-mono uppercase tracking-[0.3em] text-muted-foreground mb-5">Elsewhere</div>
                <div className="flex gap-2.5">
                  {socialLinks.map((s, i) => {
                    const Icon = s.icon;
                    return (
                      <motion.a
                        key={i}
                        href={s.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={s.label}
                        whileHover={{ y: -3, scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="relative h-11 w-11 rounded-2xl border border-border/60 bg-background/50 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors overflow-hidden group"
                      >
                        <div className={`absolute inset-0 bg-gradient-to-br ${s.color} opacity-0 group-hover:opacity-100 transition-opacity`} />
                        <Icon className="h-4 w-4 relative z-10 group-hover:text-white transition-colors" />
                      </motion.a>
                    );
                  })}
                </div>

                <motion.button
                  onClick={scrollToTop}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  className="mt-6 inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border/60 bg-background/40 backdrop-blur text-sm text-muted-foreground hover:text-foreground hover:border-primary/30 transition-colors group"
                  data-testid="footer-back-to-top"
                >
                  <ArrowUp className="h-3.5 w-3.5 group-hover:-translate-y-0.5 transition-transform" />
                  Back to top
                </motion.button>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-border/50 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-muted-foreground">
              <div className="font-mono flex items-center gap-1.5">
                <span>© {year} Rahul Vishwakarma</span>
                <span className="text-border">·</span>
                <span className="inline-flex items-center gap-1">crafted with <Heart className="h-3 w-3 text-red-400 fill-red-400 animate-pulse" /> attention to detail</span>
              </div>
              <div className="font-mono">React · TypeScript · Tailwind · Framer Motion</div>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
