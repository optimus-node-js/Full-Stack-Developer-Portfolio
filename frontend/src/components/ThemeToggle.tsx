import { useState, useEffect } from 'react';
import { Moon, Sun } from 'lucide-react';

type Theme = 'light' | 'dark';

const ThemeToggle = () => {
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

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    applyTheme(newTheme);
  };

  if (!mounted) {
    return (
      <div className="w-12 h-6 bg-muted rounded-full p-1">
        <div className="w-4 h-4 bg-background rounded-full"></div>
      </div>
    );
  }

  return (
    <button
      onClick={toggleTheme}
      className="relative w-12 h-6 bg-muted rounded-full p-1 transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
      title={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
    >
      <div
        className={`absolute top-1 left-1 w-4 h-4 bg-background rounded-full transition-all duration-300 flex items-center justify-center ${
          theme === 'dark' ? 'translate-x-6' : 'translate-x-0'
        }`}
      >
        {theme === 'dark' ? (
          <Moon className="h-2.5 w-2.5 text-primary" />
        ) : (
          <Sun className="h-2.5 w-2.5 text-yellow-500" />
        )}
      </div>
    </button>
  );
};

export default ThemeToggle;
