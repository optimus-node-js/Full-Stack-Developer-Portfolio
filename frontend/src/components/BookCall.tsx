import { useEffect, useState } from 'react';
import Cal, { getCalApi } from '@calcom/embed-react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, CalendarClock, Clock, Lightbulb, Briefcase, Coffee, Video } from 'lucide-react';

// Public Cal.com booking links. Each slug must match an event type on cal.com.
const CAL_USER = 'rahul-vishwakarmaa';

const meetings = [
  {
    slug: 'quick-intro',
    minutes: 15,
    title: 'Quick intro',
    blurb: 'Say hi, ask a question, see if we click.',
    icon: Coffee,
  },
  {
    slug: 'discuss-an-idea',
    minutes: 30,
    title: 'Discuss an idea',
    blurb: 'A product, an architecture problem or a build you have in mind.',
    icon: Lightbulb,
  },
  {
    slug: 'new-opportunity',
    minutes: 45,
    title: 'New opportunity',
    blurb: 'A role or contract you think I fit. Bring the JD, I bring the questions.',
    icon: Briefcase,
  },
] as const;

type Meeting = (typeof meetings)[number];

const isDark = () => document.documentElement.classList.contains('dark');

const BookCall = () => {
  const [selected, setSelected] = useState<Meeting | null>(null);
  const [theme, setTheme] = useState<'dark' | 'light'>(() => (isDark() ? 'dark' : 'light'));

  // Follow the site's theme toggle.
  useEffect(() => {
    const observer = new MutationObserver(() => setTheme(isDark() ? 'dark' : 'light'));
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!selected) return;
    (async () => {
      const cal = await getCalApi({ namespace: selected.slug });
      cal('ui', {
        theme,
        hideEventTypeDetails: false,
        layout: 'month_view',
        styles: { branding: { brandColor: '#6366f1' } },
      });
    })();
  }, [selected, theme]);

  return (
    <section data-ai-section="book-call" className="max-w-5xl mx-auto mb-12">
      <div className="flex flex-wrap items-end justify-between gap-3 mb-5">
        <div>
          <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-[0.25em] text-primary">
            <CalendarClock className="h-3.5 w-3.5" /> Book a call
          </div>
          <h2 className="mt-1.5 font-heading font-bold text-2xl sm:text-3xl">Pick a time that works for you</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Choose what you'd like to talk about, then a date and time. You'll get a calendar invite with a Google Meet link.
          </p>
        </div>
        <div className="inline-flex items-center gap-1.5 rounded-full border border-border/60 bg-card/60 px-3 py-1 text-xs text-muted-foreground">
          <Video className="h-3.5 w-3.5 text-tertiary" /> Google Meet · your timezone
        </div>
      </div>

      <AnimatePresence mode="wait">
        {!selected ? (
          <motion.div
            key="types"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="grid sm:grid-cols-3 gap-3"
          >
            {meetings.map((m) => (
              <button
                key={m.slug}
                type="button"
                onClick={() => setSelected(m)}
                className="group text-left rounded-2xl border border-border/60 bg-card/60 p-5 transition-colors hover:border-primary/50 hover:bg-primary/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              >
                <div className="flex items-center justify-between">
                  <span className="grid h-10 w-10 place-items-center rounded-xl bg-primary/10 text-primary">
                    <m.icon className="h-5 w-5" />
                  </span>
                  <span className="inline-flex items-center gap-1 rounded-full bg-secondary/10 px-2.5 py-1 text-xs font-medium text-secondary">
                    <Clock className="h-3.5 w-3.5" /> {m.minutes} min
                  </span>
                </div>
                <div className="mt-4 font-heading font-bold text-lg">{m.title}</div>
                <p className="mt-1 text-sm text-muted-foreground">{m.blurb}</p>
                <div className="mt-4 text-sm font-medium text-primary">
                  Choose a time <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
                </div>
              </button>
            ))}
          </motion.div>
        ) : (
          <motion.div
            key="calendar"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="rounded-2xl border border-border/60 bg-card/60 p-3 sm:p-4"
          >
            <div className="flex items-center justify-between gap-3 px-1 pb-3">
              <button
                type="button"
                onClick={() => setSelected(null)}
                className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
              >
                <ArrowLeft className="h-4 w-4" /> All meeting types
              </button>
              <span className="text-sm font-medium">
                {selected.title} · {selected.minutes} min
              </span>
            </div>
            <Cal
              key={`${selected.slug}-${theme}`}
              namespace={selected.slug}
              calLink={`${CAL_USER}/${selected.slug}`}
              config={{ layout: 'month_view', theme }}
              style={{ width: '100%', minHeight: 560, overflow: 'auto' }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default BookCall;
