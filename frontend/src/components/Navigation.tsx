import { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import CircularThemeToggle from './CircularThemeToggle';
import ScrollProgress from './ScrollProgress';
import { motion, AnimatePresence } from 'framer-motion';

const navItems = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Journey', to: '/journey' },
  { label: 'Work', to: '/work' },
  { label: 'Contact', to: '/contact' },
];

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [hoveredNav, setHoveredNav] = useState<string | null>(null);
  const { pathname } = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <ScrollProgress />
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-0 left-0 right-0 z-50 hidden md:flex justify-center mt-5 pointer-events-none"
      >
        <div
          className={`pointer-events-auto flex items-center gap-3 transition-all duration-500 rounded-full ${
            isScrolled
              ? 'bg-background/70 backdrop-blur-2xl border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.35)] py-1.5 px-2'
              : 'bg-background/30 backdrop-blur-lg border border-white/5 py-1.5 px-2'
          }`}
        >
          <Link to="/" className="flex items-center gap-2 pl-3 pr-4 py-1.5 rounded-full" data-testid="link-logo">
            <span className="w-7 h-7 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-[11px] font-bold text-primary-foreground">
              RV
            </span>
            <span className="font-heading text-sm font-semibold hidden lg:inline">Rahul Vishwakarma</span>
          </Link>

          <div className="h-6 w-px bg-border" />

          <div className="flex items-center gap-0.5 relative" onMouseLeave={() => setHoveredNav(null)}>
            {navItems.map((item) => {
              const isActive = pathname === item.to;
              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  onMouseEnter={() => setHoveredNav(item.to)}
                  className={`relative px-4 py-2 text-sm font-medium rounded-full transition-colors ${
                    isActive ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'
                  }`}
                  data-testid={`link-nav-${item.label.toLowerCase()}`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeNavBg"
                      className="absolute inset-0 bg-primary/15 border border-primary/20 rounded-full"
                      transition={{ type: 'spring', damping: 25, stiffness: 280 }}
                    />
                  )}
                  <AnimatePresence>
                    {hoveredNav === item.to && !isActive && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 bg-white/5 rounded-full"
                        transition={{ duration: 0.2 }}
                      />
                    )}
                  </AnimatePresence>
                  <span className="relative z-10">{item.label}</span>
                </NavLink>
              );
            })}
          </div>

          <div className="h-6 w-px bg-border" />
          <div className="pr-2 flex items-center">
            <CircularThemeToggle />
          </div>
        </div>
      </motion.nav>

      {/* Mobile header */}
      <div className="md:hidden fixed top-4 left-4 right-4 z-50 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-background/70 backdrop-blur border border-border/60">
          <span className="w-6 h-6 rounded-md bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-[9px] font-bold text-primary-foreground">RV</span>
          <span className="font-heading text-xs font-semibold">Rahul</span>
        </Link>
        <CircularThemeToggle />
      </div>
    </>
  );
};

export default Navigation;
