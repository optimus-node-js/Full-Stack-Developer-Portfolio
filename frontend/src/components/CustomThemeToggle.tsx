import { useState, useEffect } from 'react';

type Theme = 'light' | 'dark';

const CustomThemeToggle = () => {
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
      <div className="w-20 h-10 bg-muted rounded-full p-1">
        <div className="w-8 h-8 bg-background rounded-full"></div>
      </div>
    );
  }

  return (
    <>
      <style>{`
        .tdnn {
          margin: 0 auto;
          font-size: 15%;
          position: relative;
          height: 16em;
          width: 30em;
          border-radius: 16em;
          transition: all 500ms ease-in-out;
          background: #423966;
          cursor: pointer;
        }
        
        .tdnn.day {
          background: #FFBF71;
        }
        
        .moon {
          position: absolute;
          display: block;
          border-radius: 50%;
          transition: all 500ms cubic-bezier(0.4, 0, 0.2, 1);
          top: 3em;
          left: 3em;
          transform: rotate(-75deg);
          width: 10em;
          height: 10em;
          background: #423966;
          box-shadow: 
            3em 2.5em 0 0em #D9FBFF inset,
            rgba(255, 255, 255, 0.1) 0em -7em 0 -4.5em,
            rgba(255, 255, 255, 0.1) 3em 7em 0 -4.5em,
            rgba(255, 255, 255, 0.1) 2em 13em 0 -4em,
            rgba(255, 255, 255, 0.1) 6em 2em 0 -4.1em,
            rgba(255, 255, 255, 0.1) 8em 8em 0 -4.5em,
            rgba(255, 255, 255, 0.1) 6em 13em 0 -4.5em,
            rgba(255, 255, 255, 0.1) -4em 7em 0 -4.5em,
            rgba(255, 255, 255, 0.1) -1em 10em 0 -4.5em;
        }
        
        .moon.sun {
          top: 4.5em;
          left: 18em;
          transform: rotate(0deg);
          width: 7em;
          height: 7em;
          background: #fff;
          box-shadow: 
            3em 3em 0 5em #fff inset,
            0 -5em 0 -2.7em #fff,
            3.5em -3.5em 0 -3em #fff,
            5em 0 0 -2.7em #fff,
            3.5em 3.5em 0 -3em #fff,
            0 5em 0 -2.7em #fff,
            -3.5em 3.5em 0 -3em #fff,
            -5em 0 0 -2.7em #fff,
            -3.5em -3.5em 0 -3em #fff;
        }
      `}</style>
      
      <div 
        className={`tdnn ${theme === 'light' ? 'day' : ''}`}
        onClick={toggleTheme}
        title={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
      >
        <div className={`moon ${theme === 'light' ? 'sun' : ''}`}></div>
      </div>
    </>
  );
};

export default CustomThemeToggle;
