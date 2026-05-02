import PageShell from '@/components/PageShell';
import Contact from '@/components/Contact';

const ContactPage = () => {
  return (
    <PageShell
      label="~/contact"
      eyebrow="// say.hi"
      title={<>Let's build something <span className="text-gradient-primary">together.</span></> as unknown as string}
      subtitle="Always happy to discuss senior roles, architecture problems or production-grade SaaS builds."
    >
      <Contact />
    </PageShell>
  );
};

export default ContactPage;
