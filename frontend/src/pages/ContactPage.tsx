import { Link } from 'react-router-dom';
import { ArrowUpRight, Zap, Briefcase, Globe2 } from 'lucide-react';
import PageShell from '@/components/PageShell';
import Contact from '@/components/Contact';
import { availability } from '@/data/case-studies';

const ContactPage = () => {
  return (
    <PageShell
      label="~/contact"
      eyebrow="// say.hi"
      title={<>Let's build something <span className="text-gradient-primary">together.</span></>}
      subtitle="Immediate joiner, available now with no notice period — happy to discuss senior roles, architecture problems or production-grade SaaS builds."
    >
      <section data-ai-section="availability" className="max-w-5xl mx-auto mb-10 grid sm:grid-cols-3 gap-3">
        <div className="rounded-2xl border border-tertiary/30 bg-tertiary/10 p-4">
          <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-[0.25em] text-tertiary">
            <Zap className="h-3.5 w-3.5 fill-current" /> Availability
          </div>
          <div className="mt-1.5 font-heading font-bold text-lg">{availability.headline}</div>
          <div className="text-sm text-muted-foreground">{availability.detail}</div>
        </div>
        <div className="rounded-2xl border border-border/60 bg-card/60 p-4">
          <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-[0.25em] text-muted-foreground">
            <Briefcase className="h-3.5 w-3.5 text-primary" /> Open to
          </div>
          <div className="mt-1.5 font-heading font-bold text-lg">{availability.modes.join(' · ')}</div>
          <div className="text-sm text-muted-foreground">Senior full stack & product engineering</div>
        </div>
        <div className="rounded-2xl border border-border/60 bg-card/60 p-4">
          <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-[0.25em] text-muted-foreground">
            <Globe2 className="h-3.5 w-3.5 text-secondary" /> Based in
          </div>
          <div className="mt-1.5 font-heading font-bold text-lg">{availability.base}</div>
          <Link to="/case-studies" className="text-sm text-primary inline-flex items-center gap-1">
            Read my case studies first <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </section>
      <div data-ai-section="form">
        <Contact />
      </div>
    </PageShell>
  );
};

export default ContactPage;
