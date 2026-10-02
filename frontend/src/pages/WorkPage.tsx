import PageShell from '@/components/PageShell';
import Projects from '@/components/Projects';
import FeaturedCaseStudy from '@/components/FeaturedCaseStudy';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const WorkPage = () => {
  return (
    <PageShell
      label="~/work"
      eyebrow="// selected.projects"
      title={<>A mix of <span className="text-gradient-primary">real products</span> and side-projects.</> as unknown as string}
      subtitle="From a full booking marketplace and multi-tenant SaaS serving thousands to open-source experiments — here’s what I’ve built."
    >
      <div className="max-w-6xl mx-auto mb-14">
        <FeaturedCaseStudy />
      </div>

      <div className="max-w-6xl mx-auto mb-2 text-[11px] font-mono uppercase tracking-[0.25em] text-muted-foreground text-center">all projects</div>
      <Projects />

      <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 max-w-5xl mx-auto p-6 rounded-2xl border border-border/60 bg-muted/20">
        <div>
          <div className="text-xs font-mono uppercase tracking-[0.25em] text-muted-foreground">Next</div>
          <div className="font-heading font-bold text-xl mt-1">Get in touch — let’s build something</div>
        </div>
        <Link to="/contact" className="btn-primary-premium h-11 px-6 rounded-full inline-flex items-center gap-2">
          Contact me <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </PageShell>
  );
};

export default WorkPage;
