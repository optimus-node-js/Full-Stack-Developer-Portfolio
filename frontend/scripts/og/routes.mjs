// Share-preview (Open Graph) data for every route, built from the same data
// files the site renders. Used by generate-images.mjs (local, renders the
// cards) and prerender-meta.mjs (runs after `vite build`).
import { build } from 'esbuild';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');

export const SITE_URL = 'https://rahul-vishwakarma-portfolio.vercel.app';
export const SITE_NAME = 'Rahul Vishwakarma | Senior Full Stack Developer';

async function loadData() {
  const out = await build({
    stdin: {
      contents: `export * from './src/data/resume-data.ts'; export * from './src/data/case-studies.ts';`,
      resolveDir: root,
      loader: 'ts',
    },
    bundle: true,
    format: 'esm',
    platform: 'node',
    write: false,
    logLevel: 'silent',
  });
  const code = out.outputFiles[0].text;
  return import('data:text/javascript;base64,' + Buffer.from(code).toString('base64'));
}

const clip = (s, n) => (s.length > n ? s.slice(0, n - 1).replace(/[\s,.;:]+\S*$/, '') + '…' : s);

export async function getRoutes() {
  const { projectsData, caseStudies, experienceData } = await loadData();
  const companies = experienceData
    .filter((e) => !/self-employed/i.test(e.company))
    .slice(0, 4)
    .map((e) => e.company.replace(/\s*(Network\s+)?(Rocket & Exploration\s+)?Pvt\.? Ltd\.?$/, ''));

  const pages = [
    {
      path: '/', key: 'home', variant: 'home',
      title: 'Rahul Vishwakarma | Senior Full Stack Developer',
      description: 'Senior Full Stack Developer and immediate joiner. 3+ years shipping SaaS platforms, marketplaces, AI agents and secure, production-grade systems with TypeScript, Node.js, React and Next.js.',
      card: {
        eyebrow: 'Portfolio',
        title: 'Senior Full Stack Developer',
        subtitle: 'I ship SaaS platforms, marketplaces and AI agents, secure and production-ready from day one.',
        chips: ['TypeScript', 'Node.js', 'React', 'Next.js', 'PostgreSQL', 'AI Agents'],
        metrics: [{ value: '3+ yrs', label: 'Production experience' }, { value: '40k+', label: 'Patients served' }, { value: '99.9%', label: 'Uptime on GCP' }],
      },
    },
    {
      path: '/about', key: 'about',
      title: 'About Rahul Vishwakarma | Senior Full Stack Developer',
      description: 'Product-minded full stack engineer who owns features end to end: architecture, APIs, UI, security and delivery.',
      card: { eyebrow: 'About', title: 'Product-minded engineer who owns it end to end', subtitle: 'Architecture, APIs, UI, security and delivery, from first schema to production.', chips: ['Full Stack', 'AI Engineering', 'Security', 'System Design'] },
    },
    {
      path: '/journey', key: 'journey',
      title: 'Career Journey | Rahul Vishwakarma',
      description: `Roles, impact and stack across ${companies.slice(0, 3).join(', ')} and more.`,
      card: { eyebrow: 'Career journey', title: 'From first commit to owning production platforms', subtitle: companies.join('  ·  '), chips: ['SaaS', 'Healthcare', 'Marketplaces', 'AI'] },
    },
    {
      path: '/work', key: 'work',
      title: 'Selected Work | Rahul Vishwakarma',
      description: `${projectsData.length} projects across SaaS, marketplaces, AI agents, mobile apps and security.`,
      card: { eyebrow: 'Selected work', title: `${projectsData.length} projects, shipped to real users`, subtitle: 'SaaS platforms, marketplaces, AI agents, mobile apps and security work.', chips: ['Next.js', 'Node.js', 'PostgreSQL', 'Capacitor', 'OpenAI', 'GCP'] },
    },
    {
      path: '/case-studies', key: 'case-studies',
      title: 'Case Studies | Rahul Vishwakarma',
      description: `${caseStudies.length} engineering deep dives: the problem, constraints, architecture, decisions and results.`,
      card: { eyebrow: 'Case studies', title: `${caseStudies.length} engineering deep dives`, subtitle: 'The problem, the constraints, the architecture, the trade-offs and the results.', chips: ['Architecture', 'Trade-offs', 'Security', 'Performance'] },
    },
    {
      path: '/how-i-work', key: 'how-i-work',
      title: 'How I Work | Rahul Vishwakarma',
      description: 'How I plan, build, secure and ship software, and what working with me looks like day to day.',
      card: { eyebrow: 'How I work', title: 'Plan it, build it, secure it, ship it', subtitle: 'What working with me looks like, from kickoff to production.', chips: ['Ownership', 'Security first', 'Clear communication', 'On-time delivery'] },
    },
    {
      path: '/resume', key: 'resume',
      title: 'Resume | Rahul Vishwakarma, Senior Full Stack Developer',
      description: 'View or download the resume of Rahul Vishwakarma. Senior Full Stack Developer, available now with no notice period.',
      card: { eyebrow: 'Resume', title: 'Senior Full Stack Developer', subtitle: 'Available now, no notice period. View online or download the PDF.', chips: ['TypeScript', 'Node.js', 'React', 'Next.js', 'PostgreSQL', 'GCP'] },
    },
    {
      path: '/contact', key: 'contact',
      title: 'Contact Rahul Vishwakarma | Senior Full Stack Developer',
      description: 'Hiring or building something? Get in touch. Available now, no notice period.',
      card: { eyebrow: 'Contact', title: "Let's build something great", subtitle: 'Hiring or building a product? Available now, no notice period.', chips: ['Full-time roles', 'Contract', 'Remote', 'Ahmedabad, India'] },
    },
  ];

  for (const p of projectsData) {
    pages.push({
      path: `/project/${p.slug}`, key: `project-${p.slug}`,
      title: `${p.title} | Rahul Vishwakarma`,
      description: clip(p.subtitle ? `${p.subtitle}. ${p.description}` : p.description, 200),
      card: {
        eyebrow: `Project  ·  ${p.period}`,
        title: p.title,
        subtitle: p.subtitle || clip(p.description, 120),
        chips: p.technologies.slice(0, 6).map((t) => t.name),
        metrics: (p.metrics || []).slice(0, 3),
      },
    });
  }

  for (const c of caseStudies) {
    pages.push({
      path: `/case-studies/${c.slug}`, key: `case-${c.slug}`,
      title: `${c.title} | Case Study by Rahul Vishwakarma`,
      description: clip(c.summary, 200),
      card: {
        eyebrow: `Case study  ·  ${c.tagline}`,
        title: c.title,
        subtitle: clip(c.summary, 120),
        chips: c.stack.slice(0, 5),
        metrics: c.metrics.filter((m) => /\d/.test(m.value)).slice(0, 3),
      },
    });
  }

  return pages.map((p) => ({ ...p, image: `/og/${p.key}.jpg` }));
}
