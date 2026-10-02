const ROW = [
  'TypeScript',
  'Node.js',
  'React',
  'Next.js',
  'Nest.js',
  'PostgreSQL',
  'Redis',
  'MongoDB',
  'GCP',
  'Capacitor',
  'Zustand',
  'Laravel',
  'OpenAI',
  'Tool Calling',
  'RBAC',
  'Tailwind',
];

/** Infinite, edge-faded strip of the stack. Pauses on hover. */
const TechMarquee = () => (
  <div
    className="marquee-wrapper relative overflow-hidden py-2"
    style={{
      maskImage: 'linear-gradient(to right, transparent, black 12%, black 88%, transparent)',
      WebkitMaskImage: 'linear-gradient(to right, transparent, black 12%, black 88%, transparent)',
    }}
    aria-label="Tech stack"
  >
    <div className="marquee !gap-0">
      {[...ROW, ...ROW].map((t, i) => (
        <span key={i} aria-hidden={i >= ROW.length} className="shrink-0 pr-3">
          <span className="block px-3.5 py-1.5 rounded-full glass text-xs font-mono text-muted-foreground border border-border/60 whitespace-nowrap">
            {t}
          </span>
        </span>
      ))}
    </div>
  </div>
);

export default TechMarquee;
