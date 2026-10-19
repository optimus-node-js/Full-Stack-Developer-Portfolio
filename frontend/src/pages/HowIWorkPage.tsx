import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  CalendarClock,
  ShieldCheck,
  Gauge,
  Siren,
  Layers,
  MessagesSquare,
  CheckCircle2,
  ArrowUpRight,
  Zap,
  Globe2,
  Briefcase,
} from 'lucide-react';
import PageShell from '@/components/PageShell';
import SpotlightCard from '@/components/SpotlightCard';
import HireCTA from '@/components/HireCTA';
import { availability } from '@/data/case-studies';

const principles = [
  {
    icon: CalendarClock,
    title: 'Deadlines are a scoping problem',
    copy: 'I break big modules into vertical slices that are shippable every week, flag risk early, and protect the date by cutting nice-to-haves — never security or correctness.',
    proof: { label: 'Services marketplace in 4 months', to: '/case-studies/services-marketplace-in-4-months' },
  },
  {
    icon: ShieldCheck,
    title: 'Security is designed first',
    copy: 'Permission model before endpoints. Role, hierarchy and ownership checks on every request, server-side validation, and no trusting IDs from the client.',
    proof: { label: 'Zero critical breaches in healthcare', to: '/case-studies/multi-tenant-healthcare-saas' },
  },
  {
    icon: Gauge,
    title: 'Performance is measured, then fixed',
    copy: 'Find the hot paths, tune queries and indexes, cache what is safe to cache, paginate what can grow. Optimise what users actually feel.',
    proof: { label: 'Built for thousands of bookings', to: '/case-studies/services-marketplace-in-4-months' },
  },
  {
    icon: Siren,
    title: 'I own production',
    copy: 'Backwards-compatible migrations, re-runnable jobs, fast rollback, and enough visibility to catch problems before customers do.',
    proof: { label: '99.9% uptime on critical workflows', to: '/case-studies/critical-cron-workflows' },
  },
  {
    icon: Layers,
    title: 'End-to-end ownership',
    copy: 'Schema, APIs, web, mobile, cloud and the release itself. One person accountable means fewer hand-offs and fewer gaps.',
    proof: { label: 'One codebase, three platforms', to: '/case-studies/one-codebase-three-platforms' },
  },
  {
    icon: MessagesSquare,
    title: 'Clear, async communication',
    copy: 'Written plans, short status updates and honest risk calls. Comfortable working across time zones with remote teams.',
    proof: { label: 'UK & Qatar teams, remote', to: '/journey' },
  },
];

const checklist = [
  'Permissions modelled before the first endpoint',
  'Every resource checked for ownership server-side',
  'Inputs validated at the API and domain layers',
  'Migrations safe to roll out with old code still running',
  'Background jobs safe to retry',
  'Hot queries indexed, lists paginated',
  'Reads cached where safe — authorization never cached',
  'Tested on mobile and Safari, not just desktop Chrome',
  'Errors visible to the team before users report them',
  'Rollback path known before release',
];

const plan = [
  { window: 'Week 1', title: 'Ship something small', copy: 'Set up locally, learn the domain and the deploy path, and land a real fix or improvement in production.' },
  { window: 'Day 30', title: 'Own a feature end-to-end', copy: 'Take a meaningful feature from spec to production, including tests, security review and monitoring.' },
  { window: 'Day 60', title: 'Improve the system', copy: 'Pick a performance, reliability or security weak spot and fix it with measurable results.' },
  { window: 'Day 90', title: 'Lead a module', copy: 'Own a module or initiative and help set patterns the rest of the team can reuse.' },
];

const HowIWorkPage = () => (
  <PageShell
    label="~/how-i-work"
    eyebrow="// engineering.playbook"
    title={<>How I take a requirement <span className="text-gradient-primary">to production.</span></>}
    subtitle="The principles behind every case study — and what you can expect from day one."
  >
    {/* Availability strip */}
    <section data-ai-section="availability" className="max-w-6xl mx-auto grid sm:grid-cols-3 gap-3">
      {[
        { icon: Zap, label: 'Availability', value: availability.headline, sub: availability.detail, accent: 'text-tertiary' },
        { icon: Briefcase, label: 'Open to', value: availability.modes.join(' · '), sub: 'Senior full stack & product engineering roles', accent: 'text-primary' },
        { icon: Globe2, label: 'Based in', value: availability.base, sub: availability.timezones, accent: 'text-secondary' },
      ].map(({ icon: Icon, label, value, sub, accent }) => (
        <div key={label} className="rounded-2xl border border-border/60 bg-card/60 p-5 min-w-0">
          <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-[0.25em] text-muted-foreground">
            <Icon className={`h-3.5 w-3.5 ${accent}`} /> {label}
          </div>
          <div className="mt-2 font-heading font-bold text-lg">{value}</div>
          <div className="mt-1 text-sm text-muted-foreground">{sub}</div>
        </div>
      ))}
    </section>

    {/* Principles */}
    <section data-ai-section="principles" className="max-w-6xl mx-auto mt-14">
      <div className="text-[11px] font-mono uppercase tracking-[0.25em] text-muted-foreground">Principles — each backed by a case study</div>
      <div className="mt-4 grid md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
        {principles.map(({ icon: Icon, title, copy, proof }, i) => (
          <motion.div
            key={title}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: (i % 3) * 0.06 }}
          >
            <SpotlightCard className="h-full p-5 sm:p-6 flex flex-col">
              <div className="h-10 w-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
                <Icon className="h-5 w-5" />
              </div>
              <h2 className="mt-4 font-heading font-semibold text-lg">{title}</h2>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{copy}</p>
              <Link to={proof.to} className="mt-auto pt-4 inline-flex items-center gap-1.5 text-sm font-medium text-primary">
                {proof.label} <ArrowUpRight className="h-4 w-4" />
              </Link>
            </SpotlightCard>
          </motion.div>
        ))}
      </div>
    </section>

    {/* Production checklist + plan */}
    <section className="max-w-6xl mx-auto mt-14 grid lg:grid-cols-2 gap-4">
      <div data-ai-section="checklist" className="rounded-3xl border border-border/60 bg-card/60 p-6 sm:p-8">
        <div className="text-[11px] font-mono uppercase tracking-[0.3em] text-primary">// production.checklist</div>
        <h2 className="mt-2 font-heading font-bold text-xl sm:text-2xl">What “production-ready” means to me</h2>
        <ul className="mt-5 space-y-2.5">
          {checklist.map((c) => (
            <li key={c} className="flex gap-2.5 text-sm leading-relaxed">
              <CheckCircle2 className="h-4 w-4 mt-0.5 shrink-0 text-tertiary" />
              {c}
            </li>
          ))}
        </ul>
      </div>
      <div data-ai-section="first-90-days" className="rounded-3xl border border-border/60 bg-card/60 p-6 sm:p-8">
        <div className="text-[11px] font-mono uppercase tracking-[0.3em] text-primary">// first.90.days</div>
        <h2 className="mt-2 font-heading font-bold text-xl sm:text-2xl">What you get when I join</h2>
        <ol className="mt-5 relative border-l border-border/70 ml-2 space-y-5">
          {plan.map((p) => (
            <li key={p.window} className="pl-5 relative">
              <span className="absolute -left-[5px] top-1.5 h-2.5 w-2.5 rounded-full bg-gradient-to-br from-primary to-secondary" />
              <div className="text-xs font-mono text-muted-foreground">{p.window}</div>
              <div className="font-heading font-semibold">{p.title}</div>
              <p className="mt-0.5 text-sm text-muted-foreground leading-relaxed">{p.copy}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>

    <div className="max-w-6xl mx-auto mt-14">
      <HireCTA title="Have a requirement? Let’s talk this week." copy="Available now — immediate joiner. Send the brief and I’ll come back with how I’d approach it." />
    </div>
  </PageShell>
);

export default HowIWorkPage;
