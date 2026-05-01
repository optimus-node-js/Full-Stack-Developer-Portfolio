import { useEffect, useRef, useState, useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, User, Briefcase, Compass, Mail, ChevronUp, Github, Linkedin, ArrowUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { contactInfo } from '@/data/resume-data';

const navItems = [
  { icon: Home, label: 'Home', to: '/' },
  { icon: User, label: 'About', to: '/about' },
  { icon: Compass, label: 'Journey', to: '/journey' },
  { icon: Briefcase, label: 'Work', to: '/work' },
  { icon: Mail, label: 'Contact', to: '/contact' },
];

const MobileBottomNav = () => {
  const { pathname } = useLocation();
  const [isVisible, setIsVisible] = useState(true);
  const [isExpanded, setIsExpanded] = useState(false);
  const [nearBottom, setNearBottom] = useState(false);
  const lastScrollYRef = useRef(0);

  const handleScroll = useCallback(() => {
    const y = window.scrollY;
    const viewport = window.innerHeight;
    const docH = document.documentElement.scrollHeight;
    // hide on scroll down, show on scroll up
    if (y > lastScrollYRef.current && y > 120) setIsVisible(false);
    else setIsVisible(true);
    lastScrollYRef.current = y;

    // detect near-bottom (within 200px)
    setNearBottom(y + viewport >= docH - 200);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  // collapse expanded panel when navigating
  useEffect(() => {
    setIsExpanded(false);
  }, [pathname]);

  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setIsExpanded(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 280 }}
          className="md:hidden fixed bottom-3 left-2 right-2 z-50"
          data-testid="mobile-bottom-nav"
        >
          <motion.div
            layout
            transition={{ type: 'spring', damping: 28, stiffness: 260 }}
            className="max-w-md mx-auto bg-background/85 backdrop-blur-2xl border border-white/10 rounded-[26px] shadow-[0_18px_55px_rgba(0,0,0,0.55)] overflow-hidden"
          >
            {/* Expandable quick-actions panel */}
            <AnimatePresence initial={false}>
              {isExpanded && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
                  className="overflow-hidden border-b border-white/5"
                >
                  <div className="px-4 pt-4 pb-3">
                    <div className="text-[10px] font-mono uppercase tracking-[0.25em] text-muted-foreground mb-3">
                      quick actions
                    </div>
                    <div className="grid grid-cols-4 gap-2">
                      <a
                        href={`mailto:${contactInfo.email}`}
                        className="flex flex-col items-center gap-1 py-2.5 rounded-2xl bg-muted/30 border border-border/40 active:scale-95 transition-transform"
                        data-testid="mobile-action-email"
                      >
                        <Mail className="h-4 w-4 text-primary" />
                        <span className="text-[10px] text-muted-foreground">Email</span>
                      </a>
                      <a
                        href={contactInfo.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex flex-col items-center gap-1 py-2.5 rounded-2xl bg-muted/30 border border-border/40 active:scale-95 transition-transform"
                        data-testid="mobile-action-linkedin"
                      >
                        <Linkedin className="h-4 w-4 text-secondary" />
                        <span className="text-[10px] text-muted-foreground">LinkedIn</span>
                      </a>
                      <a
                        href={contactInfo.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex flex-col items-center gap-1 py-2.5 rounded-2xl bg-muted/30 border border-border/40 active:scale-95 transition-transform"
                        data-testid="mobile-action-github"
                      >
                        <Github className="h-4 w-4 text-tertiary" />
                        <span className="text-[10px] text-muted-foreground">GitHub</span>
                      </a>
                      <button
                        onClick={scrollTop}
                        className="flex flex-col items-center gap-1 py-2.5 rounded-2xl bg-muted/30 border border-border/40 active:scale-95 transition-transform"
                        data-testid="mobile-action-top"
                      >
                        <ArrowUp className="h-4 w-4 text-foreground/80" />
                        <span className="text-[10px] text-muted-foreground">Top</span>
                      </button>
                    </div>
                    <div className="mt-3 flex items-center justify-between text-[10px] font-mono text-muted-foreground/70 px-1">
                      <span>© {new Date().getFullYear()} Rahul V.</span>
                      <span>built with care</span>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Main nav row */}
            <div className="flex items-center justify-between px-1 py-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.to;
                return (
                  <Link
                    key={item.to}
                    to={item.to}
                    aria-label={item.label}
                    data-testid={`mobile-nav-${item.label.toLowerCase()}`}
                    className={`relative flex items-center justify-center h-11 w-11 rounded-full transition-all active:scale-90 ${
                      isActive ? 'text-primary' : 'text-muted-foreground'
                    }`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activeTabMobile"
                        className="absolute inset-0 bg-primary/15 border border-primary/25 rounded-full"
                        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                      />
                    )}
                    <Icon className="w-[22px] h-[22px] relative z-10" />
                    <span className="sr-only">{item.label}</span>
                  </Link>
                );
              })}

              {/* Expand toggle — pulses when near bottom */}
              <button
                onClick={() => setIsExpanded((v) => !v)}
                aria-label={isExpanded ? 'Collapse quick actions' : 'Expand quick actions'}
                data-testid="mobile-nav-expand"
                className={`relative flex items-center justify-center h-11 w-11 rounded-full transition-all active:scale-90 ${
                  isExpanded ? 'text-primary' : 'text-muted-foreground'
                }`}
              >
                {/* gentle pulse ring when scrolled to end of page */}
                {nearBottom && !isExpanded && (
                  <motion.span
                    initial={{ scale: 0.6, opacity: 0.6 }}
                    animate={{ scale: 1.4, opacity: 0 }}
                    transition={{ duration: 1.6, repeat: Infinity, ease: 'easeOut' }}
                    className="absolute inset-0 rounded-full bg-primary/30"
                  />
                )}
                <motion.span
                  animate={{ rotate: isExpanded ? 180 : 0 }}
                  transition={{ type: 'spring', damping: 20, stiffness: 240 }}
                  className="relative z-10"
                >
                  <ChevronUp className="w-[22px] h-[22px]" />
                </motion.span>
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MobileBottomNav;
