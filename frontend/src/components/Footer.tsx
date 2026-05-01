import { Link } from 'react-router-dom';
import { Github, Linkedin, Mail, ArrowUp } from 'lucide-react';
import { contactInfo } from '@/data/resume-data';

const Footer = () => {
  const year = new Date().getFullYear();

  const socialLinks = [
    { icon: Mail, href: `mailto:${contactInfo.email}`, label: 'Email' },
    { icon: Linkedin, href: contactInfo.linkedin, label: 'LinkedIn' },
    { icon: Github, href: contactInfo.github, label: 'GitHub' },
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
    <footer className="relative pt-16 pb-32 md:pb-8 border-t border-border/60 overflow-hidden">
      <div className="absolute inset-0 grid-overlay pointer-events-none mask-fade-bottom" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] h-[200px] bg-primary/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto relative z-10">
        <div className="grid md:grid-cols-3 gap-10 pb-10 border-b border-border/60">
          {/* Brand */}
          <div>
            <Link to="/" className="inline-flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-sm font-bold text-primary-foreground shadow-glow">
                RV
              </div>
              <div className="text-left">
                <div className="font-heading font-bold">Rahul Vishwakarma</div>
                <div className="text-xs text-muted-foreground font-mono">Senior Full Stack Developer</div>
              </div>
            </Link>
            <p className="mt-5 text-sm text-muted-foreground leading-relaxed max-w-xs">
              Building reliable multi-tenant SaaS for healthcare & education — end-to-end.
            </p>
          </div>

          {/* Nav */}
          <div>
            <div className="text-xs font-mono uppercase tracking-[0.2em] text-muted-foreground mb-4">Navigate</div>
            <div className="grid grid-cols-2 gap-y-2 gap-x-6">
              {navLinks.map((l) => (
                <Link key={l.to} to={l.to} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  {l.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Socials */}
          <div>
            <div className="text-xs font-mono uppercase tracking-[0.2em] text-muted-foreground mb-4">Elsewhere</div>
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
                    className="h-10 w-10 rounded-xl border border-border/60 bg-muted/30 flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/30 transition-colors"
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                );
              })}
            </div>
            <button
              onClick={scrollToTop}
              className="mt-6 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors group"
            >
              <div className="h-8 w-8 rounded-full border border-border/60 flex items-center justify-center group-hover:border-primary/40 group-hover:text-primary transition-colors">
                <ArrowUp className="h-3.5 w-3.5" />
              </div>
              Back to top
            </button>
          </div>
        </div>

        <div className="mt-8 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-muted-foreground">
          <div className="font-mono">© {year} Rahul Vishwakarma · Crafted with attention to detail.</div>
          <div className="font-mono">Built with React · TypeScript · Tailwind</div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
