import type { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface PageShellProps {
  children: ReactNode;
  label?: string; // e.g. "~/about"
  title?: ReactNode;
  subtitle?: ReactNode;
  eyebrow?: string;
  className?: string;
}

export default function PageShell({
  children,
  label,
  title,
  subtitle,
  eyebrow,
  className = '',
}: PageShellProps) {
  return (
    <motion.main
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }}
      transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
      className={`relative min-h-screen pt-28 pb-36 lg:pb-24 clip-x ${className}`}
    >
      {/* Ambient bg */}
      <div className="absolute inset-0 dot-overlay pointer-events-none" />
      <div className="absolute -top-20 -right-20 w-[500px] h-[500px] bg-primary/15 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute -bottom-20 -left-20 w-[500px] h-[500px] bg-secondary/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="container mx-auto relative z-10">
        {(label || title || subtitle || eyebrow) && (
          <header className="max-w-5xl mx-auto mb-10 sm:mb-14">
            {label && (
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border/70 bg-muted/30 text-[11px] font-mono text-muted-foreground">
                <span className="w-1 h-1 rounded-full bg-primary" />
                <span>{label}</span>
              </div>
            )}
            {eyebrow && (
              <div className="mt-3 text-xs font-mono uppercase tracking-[0.3em] text-primary">{eyebrow}</div>
            )}
            {title && (
              <h1 className="mt-3 font-heading font-bold text-[1.75rem] xs:text-[2rem] sm:text-5xl lg:text-6xl tracking-tight leading-[1.08]">
                {title}
              </h1>
            )}
            {subtitle && (
              <p className="mt-4 text-base sm:text-lg text-muted-foreground max-w-2xl">{subtitle}</p>
            )}
          </header>
        )}
        {children}
      </div>
    </motion.main>
  );
}
