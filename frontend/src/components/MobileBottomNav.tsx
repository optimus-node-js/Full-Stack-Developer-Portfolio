import { useEffect, useRef, useState, useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, User, Briefcase, Compass, Mail } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

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
  const lastScrollYRef = useRef(0);

  const handleScroll = useCallback(() => {
    const y = window.scrollY;
    if (y > lastScrollYRef.current && y > 120) setIsVisible(false);
    else setIsVisible(true);
    lastScrollYRef.current = y;
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

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
          <div className="max-w-sm mx-auto bg-background/80 backdrop-blur-2xl border border-white/10 rounded-full shadow-[0_10px_40px_rgba(0,0,0,0.4)] p-1.5">
            <div className="flex items-center justify-between px-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.to;
                return (
                  <Link
                    key={item.to}
                    to={item.to}
                    className={`relative flex items-center justify-center p-3 rounded-full transition-all ${
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
                    <Icon className="w-5 h-5 relative z-10" />
                    <span className="sr-only">{item.label}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MobileBottomNav;
