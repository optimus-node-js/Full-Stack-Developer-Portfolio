import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowUpRight,
  CalendarCheck,
  Clock,
  Hourglass,
  Truck,
  ShieldCheck,
  Zap,
  Smartphone,
  LayoutGrid,
  Tags,
  Image as ImageIcon,
  ClipboardList,
  BookmarkCheck,
  Store,
  Rocket,
} from 'lucide-react';
import { projectsData } from '@/data/resume-data';
import SpotlightCard from '@/components/SpotlightCard';

const SLUG = 'hind-social-services-module';

const serviceTypes = [
  { icon: Clock, label: 'Short', copy: 'Slot-based bookings' },
  { icon: Hourglass, label: 'Long', copy: 'Multi-day engagements' },
  { icon: Truck, label: 'Delivery', copy: 'Fulfilment-based orders' },
];

const modules = [
  { icon: Store, label: 'Services' },
  { icon: ClipboardList, label: 'Bookings' },
  { icon: BookmarkCheck, label: 'My Bookings' },
  { icon: LayoutGrid, label: 'Collections' },
  { icon: Tags, label: 'Categories' },
  { icon: ImageIcon, label: 'Banners' },
];

const securityLayers = ['Role-based access', 'Hierarchy-level rules', 'Ownership checks', 'Input validation'];

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 18 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] as const },
});

interface FeaturedCaseStudyProps {
  compact?: boolean;
}

const FeaturedCaseStudy = ({ compact = false }: FeaturedCaseStudyProps) => {
  const project = projectsData.find((p) => p.slug === SLUG);
  if (!project) return null;

  return (
    <section className="relative" aria-labelledby="featured-case-study">
      <motion.div {...fade()} className="flex flex-wrap items-center justify-between gap-3 mb-5">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-mono uppercase tracking-[0.2em] bg-tertiary/10 border border-tertiary/30 text-tertiary">
            <span className="pulse-dot mr-1" /> Just shipped
          </span>
          <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-muted-foreground">featured case study</span>
        </div>
        <Link
          to={`/project/${SLUG}`}
          className="group inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:text-foreground transition-colors"
        >
          Read the case study
          <ArrowUpRight className="h-4 w-4 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
        </Link>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-6 gap-3 sm:gap-4 [&>*]:min-w-0">
        {/* Headline tile */}
        <motion.div {...fade(0.05)} className="md:col-span-4 md:row-span-2">
          <SpotlightCard beam className="h-full p-6 sm:p-8">
            <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground">
              <Rocket className="h-3.5 w-3.5 text-primary" /> Hind Social · {project.period}
            </div>
            <h2 id="featured-case-study" className="mt-4 font-heading font-bold tracking-tight text-2xl sm:text-4xl leading-[1.1]">
              An entire services marketplace,{' '}
              <span className="text-gradient-primary">built end-to-end in 4 months.</span>
            </h2>
            <p className="mt-4 text-sm sm:text-base text-muted-foreground leading-relaxed max-w-2xl">
              Providers create and sell services, customers discover and book them. I owned the whole module — schema, APIs,
              provider, customer and admin UI — and shipped it to production on the committed deadline.
            </p>

            {!compact && (
              <div className="mt-6 flex flex-wrap gap-1.5">
                {project.technologies.map((t) => (
                  <span key={t.name} className="px-2.5 py-1 rounded-md bg-muted/50 border border-border/60 text-[11px] font-mono text-muted-foreground">
                    {t.name}
                  </span>
                ))}
              </div>
            )}

            <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3">
              {project.metrics?.map((m) => (
                <div key={m.label} className="rounded-2xl bg-background/50 border border-border/60 p-3">
                  <div className="font-heading font-bold text-xl sm:text-2xl text-foreground">{m.value}</div>
                  <div className="text-[10px] sm:text-[11px] text-muted-foreground uppercase tracking-wider mt-0.5 leading-snug">{m.label}</div>
                </div>
              ))}
            </div>
          </SpotlightCard>
        </motion.div>

        {/* Shipped tile */}
        <motion.div {...fade(0.1)} className="md:col-span-2">
          <SpotlightCard className="h-full p-5 sm:p-6">
            <div className="h-10 w-10 rounded-xl bg-tertiary/15 border border-tertiary/30 flex items-center justify-center text-tertiary">
              <CalendarCheck className="h-5 w-5" />
            </div>
            <div className="mt-4 text-[11px] font-mono uppercase tracking-[0.2em] text-muted-foreground">Live in production</div>
            <div className="mt-1 font-heading font-bold text-2xl">30 Sep 2026</div>
            <p className="mt-1 text-sm text-muted-foreground">Delivered on the committed timeline — no scope cut.</p>
          </SpotlightCard>
        </motion.div>

        {/* Service types tile */}
        <motion.div {...fade(0.15)} className="md:col-span-2">
          <SpotlightCard className="h-full p-5 sm:p-6">
            <div className="text-[11px] font-mono uppercase tracking-[0.2em] text-muted-foreground">3 service types</div>
            <div className="mt-3 space-y-2">
              {serviceTypes.map(({ icon: Icon, label, copy }) => (
                <div key={label} className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center text-primary shrink-0">
                    <Icon className="h-4 w-4" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-sm font-semibold leading-tight">{label}</div>
                    <div className="text-xs text-muted-foreground truncate">{copy}</div>
                  </div>
                </div>
              ))}
            </div>
          </SpotlightCard>
        </motion.div>

        {/* Modules tile */}
        <motion.div {...fade(0.2)} className="md:col-span-3">
          <SpotlightCard className="h-full p-5 sm:p-6">
            <div className="text-[11px] font-mono uppercase tracking-[0.2em] text-muted-foreground">What I shipped</div>
            <div className="mt-4 grid grid-cols-3 gap-2">
              {modules.map(({ icon: Icon, label }, i) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.25 + i * 0.05 }}
                  className="rounded-xl bg-background/50 border border-border/60 p-2.5 sm:p-3 flex flex-col items-center gap-1.5 text-center hover:border-primary/40 transition-colors"
                >
                  <Icon className="h-4 w-4 text-primary" />
                  <span className="text-[11px] sm:text-xs font-medium leading-tight">{label}</span>
                </motion.div>
              ))}
            </div>
          </SpotlightCard>
        </motion.div>

        {/* Security tile */}
        <motion.div {...fade(0.25)} className="md:col-span-3">
          <SpotlightCard className="h-full p-5 sm:p-6">
            <div className="flex items-center gap-2 text-[11px] font-mono uppercase tracking-[0.2em] text-muted-foreground">
              <ShieldCheck className="h-3.5 w-3.5 text-secondary" /> Layered security architecture
            </div>
            <div className="mt-4 space-y-1.5">
              {securityLayers.map((layer, i) => (
                <motion.div
                  key={layer}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + i * 0.07 }}
                  className="flex items-center gap-3 rounded-lg border border-border/60 bg-background/50 px-3 py-2"
                  style={{ marginLeft: `${i * 10}px` }}
                >
                  <span className="text-[10px] font-mono text-secondary">L{i + 1}</span>
                  <span className="text-xs sm:text-sm">{layer}</span>
                </motion.div>
              ))}
            </div>
          </SpotlightCard>
        </motion.div>

        {/* Perf + responsive tiles */}
        <motion.div {...fade(0.3)} className="md:col-span-3">
          <SpotlightCard className="h-full p-5 sm:p-6 flex gap-4 items-start">
            <div className="h-10 w-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary shrink-0">
              <Zap className="h-5 w-5" />
            </div>
            <div>
              <div className="font-heading font-semibold">Caching & performance</div>
              <p className="mt-1 text-sm text-muted-foreground">
                Caching, query and index tuning and pagination — built to handle thousands of booking transactions.
              </p>
            </div>
          </SpotlightCard>
        </motion.div>
        <motion.div {...fade(0.35)} className="md:col-span-3">
          <SpotlightCard className="h-full p-5 sm:p-6 flex gap-4 items-start">
            <div className="h-10 w-10 rounded-xl bg-secondary/10 border border-secondary/20 flex items-center justify-center text-secondary shrink-0">
              <Smartphone className="h-5 w-5" />
            </div>
            <div>
              <div className="font-heading font-semibold">Mobile-first & Safari-ready</div>
              <p className="mt-1 text-sm text-muted-foreground">
                Fully responsive on every screen, tested and fixed for Safari and iOS.
              </p>
            </div>
          </SpotlightCard>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedCaseStudy;
