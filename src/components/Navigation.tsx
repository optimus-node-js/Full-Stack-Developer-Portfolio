import { useState, useEffect } from 'react';
import CircularThemeToggle from './CircularThemeToggle';
import ScrollProgress from './ScrollProgress';
import { motion, AnimatePresence } from 'framer-motion';

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [hoveredNav, setHoveredNav] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
      
      const sections = ['hero', 'about', 'projects', 'skills', 'experience', 'blog', 'testimonials', 'analytics', 'contact'];
      
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 150 && rect.bottom >= 150) {
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
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navItems = [
    { label: 'Home', id: 'hero' },
    { label: 'About', id: 'about' },
    { label: 'Projects', id: 'projects' },
    { label: 'Skills', id: 'skills' },
    { label: 'Experience', id: 'experience' },
    { label: 'Contact', id: 'contact' },
  ];

  return (
    <>
      <ScrollProgress />
      <motion.nav 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-500 hidden md:flex justify-center mt-6 pointer-events-none"
      >
        <div 
          className={`pointer-events-auto flex items-center gap-4 transition-all duration-500 ${
            isScrolled 
              ? 'bg-background/80 backdrop-blur-2xl border border-white/10 shadow-[0_8px_32px_hsla(0,0%,0%,0.2)] rounded-full py-2 px-4' 
              : 'bg-transparent py-2 px-4 border border-transparent'
          }`}
        >
          <motion.div 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="font-bold text-xl font-heading bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent cursor-pointer mr-2 pr-4 border-r border-border" 
            onClick={() => scrollToSection('hero')}
            data-testid="link-logo"
          >
            RV
          </motion.div>

          <div className="flex items-center gap-1 relative" onMouseLeave={() => setHoveredNav(null)}>
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                onMouseEnter={() => setHoveredNav(item.id)}
                className={`relative px-4 py-2 text-sm font-medium transition-colors duration-300 rounded-full font-body ${
                  activeSection === item.id
                    ? 'text-foreground'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
                data-testid={`link-nav-${item.id}`}
              >
                {activeSection === item.id && (
                  <motion.div
                    layoutId="activeNavBg"
                    className="absolute inset-0 bg-primary/10 rounded-full"
                    transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                  />
                )}
                <AnimatePresence>
                  {hoveredNav === item.id && activeSection !== item.id && (
                    <motion.div
                      layoutId="hoverNavBg"
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

          <div className="pl-4 border-l border-border flex items-center">
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
