import { useState, useEffect } from 'react';
import CircularThemeToggle from './CircularThemeToggle';
import ScrollProgress from './ScrollProgress';
import { motion, AnimatePresence } from 'framer-motion';

const navItems = [
  { label: 'Home', id: 'hero' },
  { label: 'About', id: 'about' },
  { label: 'Experience', id: 'experience' },
  { label: 'Work', id: 'projects' },
  { label: 'Skills', id: 'skills' },
  { label: 'Contact', id: 'contact' },
];

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [hoveredNav, setHoveredNav] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      const sections = ['hero', 'about', 'experience', 'projects', 'skills', 'education', 'involvement', 'contact'];
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 180 && rect.bottom >= 180) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) element.scrollIntoView({ behavior: 'smooth' });
  };

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
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            onClick={() => scrollToSection('hero')}
            className="flex items-center gap-2 pl-3 pr-4 py-1.5 rounded-full"
            data-testid="link-logo"
          >
            <span className="w-7 h-7 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-[11px] font-bold text-primary-foreground">
              RV
            </span>
            <span className="font-heading text-sm font-semibold hidden lg:inline">Rahul Vishwakarma</span>
          </motion.button>

          <div className="h-6 w-px bg-border" />

          <div className="flex items-center gap-0.5 relative" onMouseLeave={() => setHoveredNav(null)}>
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                onMouseEnter={() => setHoveredNav(item.id)}
                className={`relative px-4 py-2 text-sm font-medium rounded-full transition-colors ${
                  activeSection === item.id ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'
                }`}
                data-testid={`link-nav-${item.id}`}
              >
                {activeSection === item.id && (
                  <motion.div
                    layoutId="activeNavBg"
                    className="absolute inset-0 bg-primary/15 border border-primary/20 rounded-full"
                    transition={{ type: 'spring', damping: 25, stiffness: 280 }}
                  />
                )}
                <AnimatePresence>
                  {hoveredNav === item.id && activeSection !== item.id && (
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
              </button>
            ))}
          </div>

          <div className="h-6 w-px bg-border" />
          <div className="pr-2 flex items-center">
            <CircularThemeToggle />
          </div>
        </div>
      </motion.nav>

      <div className="md:hidden fixed top-4 right-4 z-50 flex items-center gap-2">
        <CircularThemeToggle />
      </div>
    </>
  );
};

export default Navigation;
