import { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, ArrowRight, Briefcase, Code, GraduationCap, User, FolderOpen, Mail, Award, Users, Command } from 'lucide-react';
import {
  bioData,
  projectsData,
  experienceData,
  skillsData,
  educationData,
  certificationData,
  involvementData,
  contactInfo,
} from '@/data/resume-data';

interface SearchResult {
  id: string;
  title: string;
  subtitle: string;
  category: 'page' | 'project' | 'experience' | 'skill' | 'education' | 'certification' | 'involvement' | 'contact';
  icon: typeof Search;
  path: string;
  keywords: string[];
}

const PAGES: SearchResult[] = [
  { id: 'page-home', title: 'Home', subtitle: 'Landing page', category: 'page', icon: User, path: '/', keywords: ['home', 'landing', 'main', 'start', 'portfolio'] },
  { id: 'page-about', title: 'About', subtitle: bioData.title, category: 'page', icon: User, path: '/about', keywords: ['about', 'bio', 'profile', 'who', 'background', 'product engineer'] },
  { id: 'page-journey', title: 'Journey', subtitle: 'Career & Education', category: 'page', icon: Briefcase, path: '/journey', keywords: ['journey', 'career', 'experience', 'timeline', 'education'] },
  { id: 'page-work', title: 'Work', subtitle: 'Projects & Products', category: 'page', icon: FolderOpen, path: '/work', keywords: ['work', 'projects', 'products', 'portfolio', 'case study'] },
  { id: 'page-contact', title: 'Contact', subtitle: 'Get in touch', category: 'page', icon: Mail, path: '/contact', keywords: ['contact', 'email', 'message', 'hire', 'reach'] },
];

function buildSearchIndex(): SearchResult[] {
  const results: SearchResult[] = [...PAGES];

  projectsData.forEach((p) => {
    results.push({
      id: `project-${p.slug}`,
      title: p.title,
      subtitle: `${p.role || 'Project'} · ${p.period}`,
      category: 'project',
      icon: FolderOpen,
      path: `/project/${p.slug}`,
      keywords: [
        p.title, p.description, p.subtitle || '', p.role || '',
        ...p.technologies.map((t) => t.name),
        ...p.category,
        ...(p.highlights || []),
      ].map((k) => k.toLowerCase()),
    });
  });

  experienceData.forEach((e, i) => {
    results.push({
      id: `exp-${i}`,
      title: `${e.title} at ${e.company}`,
      subtitle: `${e.period} · ${e.location || ''}`,
      category: 'experience',
      icon: Briefcase,
      path: '/journey',
      keywords: [
        e.title, e.company, e.location || '', e.period,
        ...e.description,
        ...(e.stack || []),
      ].map((k) => k.toLowerCase()),
    });
  });

  skillsData.forEach((cat) => {
    cat.skills.forEach((s) => {
      results.push({
        id: `skill-${s.name}`,
        title: s.name,
        subtitle: cat.title,
        category: 'skill',
        icon: Code,
        path: '/about',
        keywords: [s.name, cat.title].map((k) => k.toLowerCase()),
      });
    });
  });

  educationData.forEach((ed, i) => {
    results.push({
      id: `edu-${i}`,
      title: ed.title,
      subtitle: `${ed.institution} · ${ed.year}`,
      category: 'education',
      icon: GraduationCap,
      path: '/journey',
      keywords: [ed.title, ed.institution, ed.location, ed.year, ed.grade].map((k) => k.toLowerCase()),
    });
  });

  certificationData.forEach((c, i) => {
    results.push({
      id: `cert-${i}`,
      title: c.title,
      subtitle: `${c.issuer} · ${c.year}`,
      category: 'certification',
      icon: Award,
      path: '/journey',
      keywords: [c.title, c.issuer, c.year, c.description || ''].map((k) => k.toLowerCase()),
    });
  });

  involvementData.forEach((inv, i) => {
    results.push({
      id: `inv-${i}`,
      title: inv.title,
      subtitle: `${inv.organization} · ${inv.period}`,
      category: 'involvement',
      icon: Users,
      path: '/journey',
      keywords: [inv.title, inv.organization, inv.description].map((k) => k.toLowerCase()),
    });
  });

  results.push({
    id: 'contact-email',
    title: contactInfo.email,
    subtitle: 'Email address',
    category: 'contact',
    icon: Mail,
    path: '/contact',
    keywords: ['email', contactInfo.email].map((k) => k.toLowerCase()),
  });

  return results;
}

const CATEGORY_LABELS: Record<SearchResult['category'], string> = {
  page: 'Pages',
  project: 'Projects',
  experience: 'Experience',
  skill: 'Skills',
  education: 'Education',
  certification: 'Certifications',
  involvement: 'Involvement',
  contact: 'Contact',
};

function getPlatform(): 'mac' | 'ios' | 'windows' | 'android' | 'linux' {
  const ua = navigator.userAgent;
  if (/iPad|iPhone|iPod/.test(ua)) return 'ios';
  if (/Macintosh|Mac OS/.test(ua)) return 'mac';
  if (/Android/.test(ua)) return 'android';
  if (/Win/.test(ua)) return 'windows';
  return 'linux';
}

function PlatformIcon({ platform }: { platform: ReturnType<typeof getPlatform> }) {
  if (platform === 'mac' || platform === 'ios') {
    return (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5">
        <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
      </svg>
    );
  }
  if (platform === 'android') {
    return (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5">
        <path d="M17.6 9.48l1.84-3.18c.16-.31.04-.69-.26-.85-.29-.15-.65-.06-.83.22l-1.88 3.24C14.86 8.3 13.47 8 12 8s-2.86.3-4.47.91L5.65 5.67c-.19-.29-.58-.38-.87-.2-.28.18-.37.54-.19.83l1.84 3.18C3.87 10.92 2.2 13.13 2 16h20c-.2-2.87-1.87-5.08-4.4-6.52zM7 13c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm10 0c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1z" />
      </svg>
    );
  }
  if (platform === 'windows') {
    return (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-3 h-3">
        <path d="M3 12V6.5l8-1.1V12H3zm9-6.8L22 3.5V12H12V5.2zM12 13h10v8.5l-10-1.3V13zM3 13h8v6.6l-8-1.1V13z" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
    </svg>
  );
}

interface SpotlightSearchProps {
  isOpen: boolean;
  onClose: () => void;
}

function SpotlightOverlay({ isOpen, onClose }: SpotlightSearchProps) {
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState('');
  const [activeIndex, setActiveIndex] = useState(0);
  const listRef = useRef<HTMLDivElement>(null);

  const searchIndex = useMemo(() => buildSearchIndex(), []);

  const results = useMemo(() => {
    if (!query.trim()) {
      return PAGES;
    }

    const q = query.toLowerCase().trim();
    const terms = q.split(/\s+/);

    const scored = searchIndex.map((item) => {
      let score = 0;
      const titleLower = item.title.toLowerCase();
      const subtitleLower = item.subtitle.toLowerCase();

      for (const term of terms) {
        if (titleLower === term) score += 100;
        else if (titleLower.startsWith(term)) score += 80;
        else if (titleLower.includes(term)) score += 60;
        else if (subtitleLower.includes(term)) score += 40;
        else if (item.keywords.some((k) => k.includes(term))) score += 20;
        else score -= 10;
      }

      return { item, score };
    });

    return scored
      .filter((s) => s.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 12)
      .map((s) => s.item);
  }, [query, searchIndex]);

  const grouped = useMemo(() => {
    const groups: { category: string; items: SearchResult[] }[] = [];
    const seen = new Set<string>();

    results.forEach((r) => {
      if (!seen.has(r.category)) {
        seen.add(r.category);
        groups.push({ category: CATEGORY_LABELS[r.category], items: [] });
      }
      groups.find((g) => g.category === CATEGORY_LABELS[r.category])!.items.push(r);
    });

    return groups;
  }, [results]);

  const flatResults = useMemo(() => results, [results]);

  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setActiveIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  useEffect(() => {
    setActiveIndex(0);
  }, [query]);

  useEffect(() => {
    const active = listRef.current?.querySelector('[data-active="true"]');
    active?.scrollIntoView({ block: 'nearest' });
  }, [activeIndex]);

  const handleSelect = useCallback(
    (result: SearchResult) => {
      onClose();
      navigate(result.path);
    },
    [navigate, onClose]
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setActiveIndex((i) => Math.min(i + 1, flatResults.length - 1));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setActiveIndex((i) => Math.max(i - 1, 0));
      } else if (e.key === 'Enter' && flatResults[activeIndex]) {
        e.preventDefault();
        handleSelect(flatResults[activeIndex]);
      } else if (e.key === 'Escape') {
        onClose();
      }
    },
    [flatResults, activeIndex, handleSelect, onClose]
  );

  let itemIndex = -1;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm"
            onClick={onClose}
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -10 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="fixed z-[101] top-[15vh] left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] max-w-[560px]"
          >
            <div className="bg-card/95 backdrop-blur-2xl border border-border/80 rounded-2xl shadow-[0_25px_80px_-12px_rgba(0,0,0,0.6)] overflow-hidden">
              {/* Search input */}
              <div className="flex items-center gap-3 px-5 py-4 border-b border-border/60">
                <Search className="w-5 h-5 text-muted-foreground shrink-0" />
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Search pages, projects, skills, experience..."
                  className="flex-1 bg-transparent text-foreground text-[15px] placeholder:text-muted-foreground/60 outline-none"
                  autoComplete="off"
                  spellCheck={false}
                />
                {query && (
                  <button onClick={() => setQuery('')} className="text-muted-foreground hover:text-foreground transition-colors">
                    <X className="w-4 h-4" />
                  </button>
                )}
                <kbd className="hidden sm:flex items-center gap-0.5 px-1.5 py-0.5 rounded-md bg-muted/60 border border-border/60 text-[10px] font-mono text-muted-foreground">
                  ESC
                </kbd>
              </div>

              {/* Results */}
              <div ref={listRef} className="max-h-[50vh] overflow-y-auto overscroll-contain py-2">
                {grouped.length === 0 ? (
                  <div className="px-5 py-8 text-center">
                    <p className="text-sm text-muted-foreground">No results for "{query}"</p>
                    <p className="text-xs text-muted-foreground/60 mt-1">Try searching for a project, skill, or page name</p>
                  </div>
                ) : (
                  grouped.map((group) => (
                    <div key={group.category}>
                      <div className="px-5 py-1.5">
                        <span className="text-[10px] font-mono uppercase tracking-[0.15em] text-muted-foreground/70">
                          {group.category}
                        </span>
                      </div>
                      {group.items.map((result) => {
                        itemIndex++;
                        const idx = itemIndex;
                        const isActive = idx === activeIndex;
                        const Icon = result.icon;

                        return (
                          <button
                            key={result.id}
                            data-active={isActive}
                            onClick={() => handleSelect(result)}
                            onMouseEnter={() => setActiveIndex(idx)}
                            className={`w-full flex items-center gap-3 px-5 py-2.5 text-left transition-colors ${
                              isActive ? 'bg-primary/10' : 'hover:bg-muted/30'
                            }`}
                          >
                            <div
                              className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                                isActive
                                  ? 'bg-primary/20 text-primary'
                                  : 'bg-muted/40 text-muted-foreground'
                              }`}
                            >
                              <Icon className="w-4 h-4" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className={`text-sm font-medium truncate ${isActive ? 'text-foreground' : 'text-foreground/90'}`}>
                                {result.title}
                              </div>
                              <div className="text-xs text-muted-foreground truncate">{result.subtitle}</div>
                            </div>
                            {isActive && (
                              <ArrowRight className="w-3.5 h-3.5 text-primary shrink-0" />
                            )}
                          </button>
                        );
                      })}
                    </div>
                  ))
                )}
              </div>

              {/* Footer hint */}
              <div className="flex items-center justify-between px-5 py-2.5 border-t border-border/60 text-[10px] font-mono text-muted-foreground/60">
                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1">
                    <kbd className="px-1 py-0.5 rounded bg-muted/40 border border-border/40">↑↓</kbd> navigate
                  </span>
                  <span className="flex items-center gap-1">
                    <kbd className="px-1 py-0.5 rounded bg-muted/40 border border-border/40">↵</kbd> open
                  </span>
                </div>
                <span>{flatResults.length} results</span>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

export function useSpotlight() {
  const [isOpen, setIsOpen] = useState(false);
  const platform = useMemo(() => (typeof navigator !== 'undefined' ? getPlatform() : 'windows'), []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const isMod = platform === 'mac' || platform === 'ios' ? e.metaKey : e.ctrlKey;
      if (isMod && e.key === 'k') {
        e.preventDefault();
        setIsOpen((v) => !v);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [platform]);

  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);

  return { isOpen, open, close, platform };
}

export function SpotlightTriggerDesktop({ onClick, platform }: { onClick: () => void; platform: ReturnType<typeof getPlatform> }) {
  const isMac = platform === 'mac' || platform === 'ios';

  return (
    <button
      onClick={onClick}
      className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full text-muted-foreground hover:text-foreground bg-muted/30 hover:bg-muted/50 border border-border/40 hover:border-border/60 transition-all active:scale-95"
      aria-label="Search"
    >
      <Search className="w-3.5 h-3.5" />
      <kbd className="hidden lg:flex items-center gap-0.5 text-[10px] font-mono">
        {isMac ? <Command className="w-2.5 h-2.5" /> : <span>Ctrl</span>}
        <span>K</span>
      </kbd>
    </button>
  );
}

export function SpotlightTriggerMobile({ onClick, platform }: { onClick: () => void; platform: ReturnType<typeof getPlatform> }) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-background/70 backdrop-blur border border-border/60 text-muted-foreground active:scale-95 transition-transform"
      aria-label="Search"
    >
      <PlatformIcon platform={platform} />
      <span className="text-xs font-medium">Find</span>
      <Search className="w-3 h-3" />
    </button>
  );
}

export default SpotlightOverlay;
