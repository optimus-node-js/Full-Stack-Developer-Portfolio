import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Download, Zap } from 'lucide-react';
import { availability } from '@/data/case-studies';
import { contactInfo } from '@/data/resume-data';

export const ImmediateJoinerBadge = ({ className = '' }: { className?: string }) => (
  <span
    className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-tertiary/10 border border-tertiary/30 text-tertiary ${className}`}
  >
    <Zap className="h-3 w-3 fill-current" />
    {availability.headline}
  </span>
);

interface HireCTAProps {
  title?: string;
  copy?: string;
}

/** End-of-page call to action that always surfaces availability. */
const HireCTA = ({
  title = 'Need this built — and shipped on time?',
  copy = 'I take ownership from schema to production, and I can start right away.',
}: HireCTAProps) => (
  <motion.section
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6 }}
    className="relative overflow-hidden rounded-3xl border border-primary/25 bg-gradient-to-br from-primary/10 via-card to-secondary/10 p-6 sm:p-10"
  >
    <div className="absolute -top-24 -right-24 w-72 h-72 bg-primary/20 rounded-full blur-3xl pointer-events-none" />
    <div className="relative grid md:grid-cols-[1fr_auto] gap-6 items-center">
      <div className="min-w-0">
        <ImmediateJoinerBadge />
        <h2 className="mt-4 font-heading font-bold text-2xl sm:text-3xl tracking-tight">{title}</h2>
        <p className="mt-2 text-muted-foreground max-w-xl">{copy}</p>
        <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-xs font-mono text-muted-foreground">
          <span>{availability.modes.join(' · ')}</span>
          <span>{availability.base}</span>
        </div>
      </div>
      <div className="flex flex-col sm:flex-row md:flex-col gap-3">
        <Link to="/contact" className="btn-primary-premium h-12 px-6 rounded-full inline-flex items-center justify-center gap-2 text-sm">
          Hire me <ArrowRight className="h-4 w-4" />
        </Link>
        <a
          href="/resume.pdf"
          download="Rahul_Vishwakarma_Resume.pdf"
          className="h-12 px-6 rounded-full inline-flex items-center justify-center gap-2 text-sm border border-border/70 bg-background/60 hover:bg-muted/50 transition-colors"
        >
          <Download className="h-4 w-4" /> Resume
        </a>
        <a href={`mailto:${contactInfo.email}`} className="text-center text-xs font-mono text-muted-foreground hover:text-primary transition-colors">
          {contactInfo.email}
        </a>
      </div>
    </div>
  </motion.section>
);

export default HireCTA;
