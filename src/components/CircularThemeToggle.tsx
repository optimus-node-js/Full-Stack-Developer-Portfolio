import { useState, useEffect, useCallback } from 'react';
import { Sun, Moon } from 'lucide-react';

type Theme = 'light' | 'dark';

const CircularThemeToggle = () => {
  const [theme, setTheme] = useState<Theme>('dark');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedTheme = localStorage.getItem('theme') as Theme || 'dark';
    setTheme(savedTheme);
    applyTheme(savedTheme);
  }, []);

  const applyTheme = (newTheme: Theme) => {
    const root = document.documentElement;
    root.classList.toggle('light', newTheme === 'light');
    root.classList.toggle('dark', newTheme === 'dark');
  };

  const toggleTheme = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    
    // Check if View Transitions API is supported
    const doc = document as any;
    if (!doc.startViewTransition) {
      // Fallback for Firefox/older Safari: Just switch instantly
      setTheme(newTheme);
      applyTheme(newTheme);
      localStorage.setItem('theme', newTheme);
      return;
    }

    const x = e.clientX;
    const y = e.clientY;
    
    const endRadius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y)
    );

    // Start the transition
    const transition = doc.startViewTransition(() => {
      setTheme(newTheme);
      applyTheme(newTheme);
      localStorage.setItem('theme', newTheme);
    });

    transition.ready.then(() => {
      document.documentElement.animate(
        {
          clipPath: [
            `circle(0px at ${x}px ${y}px)`,
            `circle(${endRadius}px at ${x}px ${y}px)`,
          ],
        },
        {
          duration: 700,
          easing: 'ease-in-out',
          pseudoElement: '::view-transition-new(root)',
        }
      );
    });
  }, [theme]);

  if (!mounted) {
    return (
      <button
        className="relative w-12 h-12 rounded-full bg-muted/50 flex items-center justify-center"
        disabled
      >
        <div className="w-5 h-5 rounded-full bg-foreground/20 animate-pulse" />
      </button>
    );
  }

  return (
    <button
      onClick={toggleTheme}
      className={`
        relative w-12 h-12 rounded-full
        bg-gradient-to-br from-secondary/20 to-accent/20
        backdrop-blur-md border border-white/10
        flex items-center justify-center
        transition-all duration-300
        hover:scale-110 hover:shadow-lg hover:shadow-secondary/20
        active:scale-95
        overflow-hidden
        group
        z-50
      `}
      title={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
      data-testid="button-theme-toggle"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-secondary/10 to-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      <div className="relative w-6 h-6">
        <Sun 
          className={`
            absolute inset-0 w-6 h-6 text-yellow-400
            transition-all duration-500 ease-out
            ${theme === 'light' 
              ? 'opacity-100 rotate-0 scale-100' 
              : 'opacity-0 rotate-90 scale-50'
            }
          `}
        />
        <Moon 
          className={`
            absolute inset-0 w-6 h-6 text-blue-300
            transition-all duration-500 ease-out
            ${theme === 'dark' 
              ? 'opacity-100 rotate-0 scale-100' 
              : 'opacity-0 -rotate-90 scale-50'
            }
          `}
        />
      </div>
      
      <div 
        className={`
          absolute inset-0 rounded-full
          transition-all duration-300
          ${theme === 'dark' 
            ? 'shadow-[0_0_20px_rgba(147,51,234,0.3)]' 
            : 'shadow-[0_0_20px_rgba(251,191,36,0.3)]'
          }
        `}
      />
    </button>
  );
};

export default CircularThemeToggle;
