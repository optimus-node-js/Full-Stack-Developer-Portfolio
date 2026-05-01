import { useState, useEffect, useRef, useCallback } from 'react';
import { Home, User, Briefcase, Code2, Mail, Menu, X, GraduationCap, Heart, Award } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface NavItem {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  id: string;
}

const MobileBottomNav = () => {
  const [activeSection, setActiveSection] = useState('hero');
  const [isExpanded, setIsExpanded] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollYRef = useRef(0);

  const mainNavItems: NavItem[] = [
    { icon: Home, label: 'Home', id: 'hero' },
    { icon: User, label: 'About', id: 'about' },
    { icon: Briefcase, label: 'Work', id: 'projects' },
    { icon: Code2, label: 'Skills', id: 'skills' },
    { icon: Mail, label: 'Contact', id: 'contact' },
  ];

  const moreItems: NavItem[] = [
    { icon: Briefcase, label: 'Experience', id: 'experience' },
    { icon: GraduationCap, label: 'Education', id: 'education' },
    { icon: Heart, label: 'Community', id: 'involvement' },
    { icon: Award, label: 'Certs', id: 'education' },
  ];

  const handleScroll = useCallback(() => {
    const currentScrollY = window.scrollY;
    if (currentScrollY > lastScrollYRef.current && currentScrollY > 120) {
      setIsVisible(false);
      setIsExpanded(false);
    } else {
      setIsVisible(true);
    }
    lastScrollYRef.current = currentScrollY;

    const sections = ['hero', 'about', 'experience', 'projects', 'skills', 'education', 'involvement', 'contact'];
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
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsExpanded(false);
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 280 }}
          className="md:hidden fixed bottom-5 left-4 right-4 z-50"
        >
          <div className="relative max-w-sm mx-auto">
            <AnimatePresence>
              {isExpanded && (
                <motion.div
                  initial={{ opacity: 0, y: 16, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 16, scale: 0.95 }}
                  className="absolute bottom-full mb-3 left-0 right-0"
                >
                  <div className="bg-background/80 backdrop-blur-2xl border border-white/10 rounded-3xl p-4 shadow-[0_10px_40px_rgba(0,0,0,0.4)]">
                    <div className="grid grid-cols-2 gap-2">
                      {moreItems.map((item, i) => {
                        const Icon = item.icon;
                        const active = activeSection === item.id;
                        return (
                          <button
                            key={i}
                            onClick={() => scrollToSection(item.id)}
                            className={`flex items-center gap-2.5 p-3 rounded-2xl transition-all text-sm ${
                              active
                                ? 'bg-primary/20 text-primary border border-primary/30'
                                : 'bg-muted/30 text-muted-foreground hover:bg-muted/60 border border-transparent'
                            }`}
                          >
                            <Icon className="h-4 w-4" />
                            <span className="font-medium">{item.label}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="bg-background/80 backdrop-blur-2xl border border-white/10 rounded-full shadow-[0_10px_40px_rgba(0,0,0,0.4)] p-1.5">
              <div className="flex items-center justify-between px-1">
                {mainNavItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeSection === item.id;
                  return (
                    <motion.button
                      key={item.id}
                      onClick={() => scrollToSection(item.id)}
                      className={`relative flex flex-col items-center justify-center p-3 rounded-full transition-all ${
                        isActive ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
                      }`}
                      whileTap={{ scale: 0.92 }}
                    >
                      {isActive && (
                        <motion.div
                          layoutId="activeTabMobile"
                          className="absolute inset-0 bg-primary/15 border border-primary/25 rounded-full"
                          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                        />
                      )}
                      <Icon className="w-5 h-5 relative z-10" />
                      <span className="sr-only">{item.label}</span>
                    </motion.button>
                  );
                })}

                <motion.button
                  onClick={() => setIsExpanded(!isExpanded)}
                  className={`relative flex flex-col items-center justify-center p-3 rounded-full transition-all ${
                    isExpanded ? 'text-secondary bg-secondary/10' : 'text-muted-foreground hover:text-foreground'
                  }`}
                  whileTap={{ scale: 0.92 }}
                >
                  <motion.div animate={{ rotate: isExpanded ? 180 : 0 }} transition={{ duration: 0.3 }}>
                    {isExpanded ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                  </motion.div>
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MobileBottomNav;
