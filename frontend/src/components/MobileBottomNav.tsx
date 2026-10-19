import { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion';
import {
  Home,
  Briefcase,
  BookOpenText,
  Mail,
  Ellipsis,
  Search,
  User,
  Compass,
  Workflow,
  Download,
  Linkedin,
  Github,
  ArrowUp,
  ChevronRight,
  Zap,
  FileText,
} from 'lucide-react';
import { contactInfo } from '@/data/resume-data';

const tabs = [
  { icon: Home, label: 'Home', to: '/' },
  { icon: Briefcase, label: 'Work', to: '/work' },
  { icon: BookOpenText, label: 'Cases', to: '/case-studies' },
  { icon: Mail, label: 'Contact', to: '/contact' },
];

const moreLinks = [
  { icon: User, label: 'About', to: '/about' },
  { icon: Compass, label: 'Journey', to: '/journey' },
  { icon: Workflow, label: 'How I Work', to: '/how-i-work' },
  { icon: FileText, label: 'Resume', to: '/resume' },
];

const isActivePath = (pathname: string, to: string) => (to === '/' ? pathname === '/' : pathname.startsWith(to));

interface MobileBottomNavProps {
  onSearchOpen: () => void;
}

/**
 * iOS "Liquid Glass"-style tab bar: a floating translucent capsule with a
 * separate search button. Minimises to the active tab while scrolling down,
 * like the system tab bar, and opens a bottom sheet for secondary pages.
 */
const MobileBottomNav = ({ onSearchOpen }: MobileBottomNavProps) => {
  const { pathname } = useLocation();
  const [minimized, setMinimized] = useState(false);
  const [sheetOpen, setSheetOpen] = useState(false);
  const lastY = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      const delta = y - lastY.current;
      if (Math.abs(delta) > 6) {
        setMinimized(delta > 0 && y > 140);
        lastY.current = y;
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setSheetOpen(false);
    setMinimized(false);
  }, [pathname]);

  // Lock background scroll while the sheet is open.
  useEffect(() => {
    if (!sheetOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [sheetOpen]);

  const moreActive = moreLinks.some((l) => isActivePath(pathname, l.to));
  const visibleTabs = minimized ? tabs.filter((t) => isActivePath(pathname, t.to)) : tabs;
  const spring = { type: 'spring', damping: 30, stiffness: 380, mass: 0.8 } as const;

  return (
    <>
      <div
        className="lg:hidden fixed inset-x-0 z-50 px-4 pointer-events-none"
        style={{ bottom: 'max(env(safe-area-inset-bottom, 0px), 12px)' }}
        data-testid="mobile-bottom-nav"
      >
        <LayoutGroup>
          <div className="mx-auto max-w-md flex items-end justify-between gap-2.5">
            {/* Tab capsule */}
            <motion.nav
              layout
              transition={spring}
              aria-label="Primary"
              className={`ios-glass pointer-events-auto rounded-full p-1 flex items-center ${minimized ? '' : 'flex-1'}`}
            >
              {visibleTabs.map((tab) => {
                const Icon = tab.icon;
                const active = isActivePath(pathname, tab.to);
                return (
                  <Link
                    key={tab.to}
                    to={tab.to}
                    aria-label={tab.label}
                    aria-current={active ? 'page' : undefined}
                    data-testid={`mobile-nav-${tab.label.toLowerCase()}`}
                    className={`relative flex-1 min-w-[58px] h-[54px] flex flex-col items-center justify-center gap-[3px] rounded-full ios-tab-label transition-colors active:scale-95 ${
                      active ? 'text-[hsl(var(--ios-tint))]' : 'text-foreground/80'
                    }`}
                  >
                    {active && <motion.span layoutId="ios-tab-lens" transition={spring} className="ios-lens absolute inset-0 rounded-full" />}
                    <Icon className="relative h-[22px] w-[22px]" strokeWidth={active ? 2.3 : 1.9} />
                    <AnimatePresence initial={false}>
                      {!minimized && (
                        <motion.span
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="relative text-[10px] font-semibold leading-none"
                        >
                          {tab.label}
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </Link>
                );
              })}

              {!minimized && (
                <button
                  onClick={() => setSheetOpen(true)}
                  aria-label="More"
                  aria-expanded={sheetOpen}
                  data-testid="mobile-nav-more"
                  className={`relative flex-1 min-w-[58px] h-[54px] flex flex-col items-center justify-center gap-[3px] rounded-full ios-tab-label active:scale-95 ${
                    moreActive ? 'text-[hsl(var(--ios-tint))]' : 'text-foreground/80'
                  }`}
                >
                  {moreActive && <motion.span layoutId="ios-tab-lens" transition={spring} className="ios-lens absolute inset-0 rounded-full" />}
                  <Ellipsis className="relative h-[22px] w-[22px]" strokeWidth={moreActive ? 2.3 : 1.9} />
                  <span className="relative text-[10px] font-semibold leading-none">More</span>
                </button>
              )}

              {minimized && visibleTabs.length === 0 && (
                <button
                  onClick={() => setSheetOpen(true)}
                  aria-label="More"
                  className="relative min-w-[54px] h-[54px] flex items-center justify-center rounded-full text-[hsl(var(--ios-tint))]"
                >
                  <span className="ios-lens absolute inset-0 rounded-full" />
                  <Ellipsis className="relative h-[22px] w-[22px]" strokeWidth={2.3} />
                </button>
              )}
            </motion.nav>

            {/* Separate search button, as on iOS */}
            <motion.button
              layout
              transition={spring}
              onClick={onSearchOpen}
              aria-label="Search"
              data-testid="mobile-nav-search"
              className="ios-glass pointer-events-auto h-[62px] w-[62px] shrink-0 rounded-full flex items-center justify-center text-foreground/85 active:scale-95"
            >
              <Search className="h-[22px] w-[22px]" strokeWidth={2} />
            </motion.button>
          </div>
        </LayoutGroup>
      </div>

      {/* Bottom sheet */}
      <AnimatePresence>
        {sheetOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSheetOpen(false)}
              className="lg:hidden fixed inset-0 z-[95] bg-black/40"
            />
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label="More"
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 32, stiffness: 340 }}
              drag="y"
              dragConstraints={{ top: 0, bottom: 0 }}
              dragElastic={{ top: 0, bottom: 0.6 }}
              onDragEnd={(_, info) => {
                if (info.offset.y > 90 || info.velocity.y > 500) setSheetOpen(false);
              }}
              className="ios-sheet lg:hidden fixed inset-x-2 z-[96] rounded-[34px] px-4 pt-2 pb-4"
              style={{ bottom: 'max(env(safe-area-inset-bottom, 0px), 8px)' }}
            >
              <div className="mx-auto h-[5px] w-9 rounded-full bg-foreground/25" />
              <div className="mt-4 flex items-center justify-between px-1">
                <div className="ios-tab-label text-[17px] font-semibold">More</div>
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold bg-tertiary/15 text-tertiary">
                  <Zap className="h-3 w-3 fill-current" /> Immediate joiner
                </span>
              </div>

              <div className="mt-3 rounded-[20px] bg-foreground/[0.06] overflow-hidden divide-y divide-foreground/10">
                {moreLinks.map(({ icon: Icon, label, to }) => (
                  <Link key={to} to={to} className="ios-tab-label flex items-center gap-3 px-4 h-[52px] active:bg-foreground/10">
                    <span className="h-7 w-7 rounded-[8px] bg-[hsl(var(--ios-tint))] text-white flex items-center justify-center">
                      <Icon className="h-4 w-4" />
                    </span>
                    <span className="flex-1 text-[16px]">{label}</span>
                    <ChevronRight className="h-4 w-4 text-foreground/35" />
                  </Link>
                ))}
              </div>

              <div className="mt-3 grid grid-cols-4 gap-2">
                {[
                  { icon: Download, label: 'Resume', href: '/resume.pdf', download: true },
                  { icon: Mail, label: 'Email', href: `mailto:${contactInfo.email}` },
                  { icon: Linkedin, label: 'LinkedIn', href: contactInfo.linkedin, external: true },
                  { icon: Github, label: 'GitHub', href: contactInfo.github, external: true },
                ].map(({ icon: Icon, label, href, download, external }) => (
                  <a
                    key={label}
                    href={href}
                    {...(download ? { download: 'Rahul_Vishwakarma_Resume.pdf' } : {})}
                    {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                    className="ios-tab-label flex flex-col items-center gap-1.5 py-3 rounded-[18px] bg-foreground/[0.06] active:bg-foreground/10"
                  >
                    <Icon className="h-5 w-5 text-[hsl(var(--ios-tint))]" />
                    <span className="text-[11px] font-medium">{label}</span>
                  </a>
                ))}
              </div>

              <button
                onClick={() => {
                  setSheetOpen(false);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="ios-tab-label mt-3 w-full h-[50px] rounded-[18px] bg-foreground/[0.06] flex items-center justify-center gap-2 text-[16px] text-[hsl(var(--ios-tint))] active:bg-foreground/10"
              >
                <ArrowUp className="h-4 w-4" /> Back to top
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default MobileBottomNav;
