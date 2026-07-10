import PageShell from '@/components/PageShell';
import ExperienceSwitcher from '@/components/ExperienceSwitcher';
import EducationCredentials from '@/components/EducationCredentials';
import Involvement from '@/components/Involvement';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const JourneyPage = () => {
  return (
    <PageShell
      label="~/journey"
      eyebrow="// career.log"
      title={<>Building things that <span className="text-gradient-primary">matter.</span></> as unknown as string}
      subtitle="Product engineering across full-stack, AI, security, and platform architecture — roles, milestones and credentials."
    >
      {/* Experience — Company Switcher */}
      <section className="max-w-6xl mx-auto">
        <div className="mb-8 flex items-center gap-2 text-xs font-mono uppercase tracking-[0.3em] text-primary">
          <span className="h-[2px] w-6 bg-primary rounded-full" />
          <span>experience</span>
        </div>
        <ExperienceSwitcher />
      </section>

      {/* Education */}
      <section className="max-w-6xl mx-auto mt-24">
        <EducationCredentials />
      </section>

      {/* Involvement (reused) */}
      <div className="mt-16">
        <Involvement />
      </div>

      {/* Next CTA */}
      <div className="mt-10 flex flex-col sm:flex-row items-center justify-between gap-4 max-w-5xl mx-auto p-6 rounded-2xl border border-border/60 bg-muted/20">
        <div>
          <div className="text-xs font-mono uppercase tracking-[0.25em] text-muted-foreground">Next</div>
          <div className="font-heading font-bold text-xl mt-1">Selected Work — projects & products</div>
        </div>
        <Link to="/work" className="btn-primary-premium h-11 px-6 rounded-full inline-flex items-center gap-2">
          Continue <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </PageShell>
  );
};

export default JourneyPage;
