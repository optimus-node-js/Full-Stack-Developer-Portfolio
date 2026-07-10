import { bioData, contactInfo, experienceData, projectsData, skillsData, educationData } from '@/data/resume-data';

export type LineKind = 'text' | 'prompt' | 'error' | 'info' | 'success' | 'muted' | 'accent' | 'ascii';

export interface Line {
  text: string;
  kind?: LineKind;
  instant?: boolean;
}

export interface Response {
  lines: Line[];
  clear?: boolean;
}

const pad = (label: string, len = 12) => label.padEnd(len, ' ');

// ---------- Command handlers ----------

const cmdHelp = (): Response => ({
  lines: [
    { text: 'Available commands:', kind: 'accent' },
    { text: '' },
    { text: `  ${pad('whoami')} — who I am` },
    { text: `  ${pad('about')} — short bio` },
    { text: `  ${pad('skills, stack')} — my tech stack` },
    { text: `  ${pad('experience')} — work history` },
    { text: `  ${pad('projects')} — selected projects` },
    { text: `  ${pad('education')} — education & certs` },
    { text: `  ${pad('contact')} — get in touch` },
    { text: `  ${pad('resume')} — download resume` },
    { text: `  ${pad('socials')} — github / linkedin / email` },
    { text: '' },
    { text: `  ${pad('ls')} — list sections like a directory` },
    { text: `  ${pad('cat <id>')} — details, e.g. cat experience.1` },
    { text: `  ${pad('pwd, date')} — system info` },
    { text: `  ${pad('history')} — command history` },
    { text: `  ${pad('clear')} — clear the screen` },
    { text: '' },
    { text: "or ask me naturally — e.g. 'what's your stack?' / 'are you hiring-ready?'", kind: 'muted' },
  ],
});

const cmdWhoami = (): Response => ({
  lines: [{ text: 'rahul.vishwakarma', kind: 'accent' }],
});

const cmdAbout = (): Response => ({
  lines: [
    { text: `${bioData.name} · ${bioData.title}`, kind: 'accent' },
    { text: `${contactInfo.location}`, kind: 'muted' },
    { text: '' },
    { text: bioData.summary },
  ],
});

const cmdSkills = (): Response => ({
  lines: [
    { text: '# tech.stack', kind: 'accent' },
    { text: '' },
    ...skillsData.map((cat) => ({
      text: `${pad(cat.title, 22)}: ${cat.skills.map((s) => s.name).join(', ')}`,
    })),
  ],
});

const cmdExperience = (): Response => {
  const lines: Line[] = [
    { text: '# work.history', kind: 'accent' },
    { text: '' },
  ];
  experienceData.forEach((e, i) => {
    lines.push({ text: `[${i + 1}] ${e.title} @ ${e.company}` });
    lines.push({ text: `    ${e.period}`, kind: 'muted' });
  });
  lines.push({ text: '' });
  lines.push({ text: "run 'cat experience.<n>' for details — e.g. cat experience.1", kind: 'muted' });
  return { lines };
};

const cmdExperienceDetail = (n: number): Response => {
  const e = experienceData[n - 1];
  if (!e) return { lines: [{ text: `cat: experience.${n}: no such entry`, kind: 'error' }] };
  const lines: Line[] = [
    { text: `${e.company} · ${e.title}`, kind: 'accent' },
    { text: `${e.period}${e.location ? ' · ' + e.location : ''}`, kind: 'muted' },
  ];
  if (e.stack && e.stack.length) lines.push({ text: `stack: ${e.stack.join(' · ')}`, kind: 'muted' });
  lines.push({ text: '' });
  e.description.forEach((d) => lines.push({ text: `• ${d}` }));
  return { lines };
};

const cmdProjects = (): Response => {
  const lines: Line[] = [
    { text: '# selected.projects', kind: 'accent' },
    { text: '' },
  ];
  projectsData.forEach((p, i) => {
    const tag = p.category.filter((c) => c !== 'All').slice(0, 2).join('/');
    lines.push({ text: `[${i + 1}] ${p.title}` });
    lines.push({ text: `    ${p.period} · ${tag}`, kind: 'muted' });
  });
  lines.push({ text: '' });
  lines.push({ text: "run 'cat project.<n>' for details, or visit /work", kind: 'muted' });
  return { lines };
};

const cmdProjectDetail = (n: number): Response => {
  const p = projectsData[n - 1];
  if (!p) return { lines: [{ text: `cat: project.${n}: no such entry`, kind: 'error' }] };
  const lines: Line[] = [
    { text: p.title, kind: 'accent' },
    { text: `${p.period} · ${p.category.filter((c) => c !== 'All').join(' / ')}`, kind: 'muted' },
    { text: `stack: ${p.technologies.map((t) => t.name).join(' · ')}`, kind: 'muted' },
    { text: '' },
    { text: p.description },
  ];
  if (p.github) lines.push({ text: `github: ${p.github}`, kind: 'info' });
  if (p.link && p.link !== p.github) lines.push({ text: `live:   ${p.link}`, kind: 'info' });
  return { lines };
};

const cmdEducation = (): Response => {
  const lines: Line[] = [
    { text: '# education', kind: 'accent' },
    { text: '' },
    ...educationData.map((e) => ({
      text: `• ${e.title} — ${e.institution}, ${e.location} (${e.year}) · ${e.grade}`,
    })),
  ];
  return { lines };
};

const cmdContact = (): Response => ({
  lines: [
    { text: '# contact', kind: 'accent' },
    { text: '' },
    { text: `${pad('email', 10)}: ${contactInfo.email}` },
    { text: `${pad('phone', 10)}: ${contactInfo.phone}` },
    { text: `${pad('location', 10)}: ${contactInfo.location}` },
    { text: `${pad('linkedin', 10)}: ${contactInfo.linkedin.replace('https://', '')}`, kind: 'info' },
    { text: `${pad('github', 10)}: ${contactInfo.github.replace('https://', '')}`, kind: 'info' },
  ],
});

const cmdLs = (): Response => ({
  lines: [
    { text: 'about.md    experience/    projects/    skills.yaml', kind: 'accent' },
    { text: 'education/  involvement/   contact.json resume.pdf', kind: 'accent' },
  ],
});

const cmdPwd = (): Response => ({
  lines: [{ text: '/home/rahul/portfolio' }],
});

const cmdDate = (): Response => ({
  lines: [{ text: new Date().toString() }],
});

const cmdUname = (): Response => ({
  lines: [{ text: 'rahul-os 4.0.0 #product-engineer SMP x86_64 GNU/Linux-inspired', kind: 'accent' }],
});

const cmdResume = (): Response => ({
  lines: [
    { text: 'downloading resume — triggering /resume.pdf ...', kind: 'info' },
    { text: 'done.', kind: 'success' },
  ],
});

const cmdSocials = (): Response => ({
  lines: [
    { text: 'github   — ' + contactInfo.github, kind: 'info' },
    { text: 'linkedin — ' + contactInfo.linkedin, kind: 'info' },
    { text: 'email    — mailto:' + contactInfo.email, kind: 'info' },
  ],
});

const cmdHire = (): Response => ({
  lines: [
    { text: '✓ rahul is currently open to opportunities.', kind: 'success' },
    { text: '' },
    { text: '  » Product Engineer / Senior Full-Stack roles' },
    { text: '  » AI Engineering · Platform Architecture · Security' },
    { text: '  » Remote (IST, flexible) · Hybrid · On-site' },
    { text: '' },
    { text: "type 'contact' or 'email' to get in touch →", kind: 'muted' },
  ],
});

const cmdJoke = (): Response => {
  const jokes = [
    'Why did the dev go broke? — he used up all his cache.',
    'There are 10 kinds of people: those who understand binary and those who don\'t.',
    '!false — it\'s funny because it\'s true.',
    'A SQL query walks into a bar, walks up to two tables and asks: "may I JOIN you?"',
    'I would tell you a UDP joke, but you might not get it.',
  ];
  return { lines: [{ text: jokes[Math.floor(Math.random() * jokes.length)], kind: 'accent' }] };
};

const easterEggs: Record<string, Response> = {
  'rm -rf /': { lines: [{ text: "rm: refusing to remove '/' — this portfolio is sacred", kind: 'error' }] },
  'rm -rf /*': { lines: [{ text: "rm: refusing to remove '/' — this portfolio is sacred", kind: 'error' }] },
  vim: { lines: [{ text: 'E404: we ship production, we do not edit here. try "help".', kind: 'error' }] },
  nano: { lines: [{ text: 'nano: too comfy — try vim (j/k, also banned).', kind: 'error' }] },
  emacs: { lines: [{ text: 'emacs: operating system not found.', kind: 'error' }] },
  exit: { lines: [{ text: "you can't escape the portfolio — try 'contact' instead.", kind: 'muted' }] },
  logout: { lines: [{ text: "rahul: session still active. try 'contact'.", kind: 'muted' }] },
  quit: { lines: [{ text: "quitting is not product-engineer energy. try 'contact'.", kind: 'muted' }] },
  ':q': { lines: [{ text: 'E37: no write since last change (:q!) — still here.', kind: 'error' }] },
  ':wq': { lines: [{ text: 'saved. but still here.', kind: 'muted' }] },
  matrix: { lines: [{ text: 'wake up, Neo... the stack has you.', kind: 'accent' }] },
  coffee: { lines: [{ text: 'coffee.service failed: resource "caffeine" depleted.', kind: 'error' }] },
  'make coffee': { lines: [{ text: 'coffee.service failed: resource "caffeine" depleted.', kind: 'error' }] },
  'sudo hire rahul': { lines: [{ text: '✓ mission authorized. open /contact to finalize.', kind: 'success' }] },
  'sudo make me a sandwich': { lines: [{ text: 'okay.', kind: 'success' }] },
};

// ---------- NL intent matching ----------

const intents: { keywords: string[]; response: () => Response }[] = [
  {
    keywords: ['where', 'location', 'based', 'live', 'from', 'india', 'country', 'city'],
    response: () => ({
      lines: [
        { text: `based in ${contactInfo.location}.`, kind: 'accent' },
        { text: 'remote-first, IST (UTC+5:30), flexible to hybrid.', kind: 'muted' },
      ],
    }),
  },
  {
    keywords: ['years', 'how long', 'experienced', 'seniority'],
    response: () => ({
      lines: [
        { text: '3+ years product engineering across full-stack, AI, and security.', kind: 'accent' },
        { text: "run 'experience' for the full breakdown.", kind: 'muted' },
      ],
    }),
  },
  {
    keywords: ['hire', 'hiring', 'available', 'open to work', 'opportunity', 'opportunities', 'role', 'recruit', 'interview'],
    response: cmdHire,
  },
  {
    keywords: ['hind social', 'hind', 'services module', 'current company'],
    response: () => cmdExperienceDetail(1),
  },
  {
    keywords: ['healthcare', 'clinic', 'hospital', 'medical', 'script assist', 'scriptassist'],
    response: () => cmdExperienceDetail(2),
  },
  {
    keywords: ['school', 'student diwan', 'education platform', 'education saas', 'lms'],
    response: () => cmdExperienceDetail(3),
  },
  {
    keywords: ['freelance', 'contract', 'laravel client', 'consulting'],
    response: () => cmdExperienceDetail(4),
  },
  {
    keywords: ['space', 'rocket', 'omspace', 'aerospace'],
    response: () => cmdExperienceDetail(5),
  },
  {
    keywords: ['ai', 'agent', 'openai', 'whatsapp', 'chatbot', 'gpt', 'tool calling'],
    response: () => ({
      lines: [
        { text: 'built a production-ready AI Agent PoC in a single day.', kind: 'accent' },
        { text: 'stack: OpenAI GPT · Tool Calling · Twilio WhatsApp · Node.js · Next.js', kind: 'muted' },
        { text: 'the agent handles intent detection, auth, CRUD, bookings, and event registration via WhatsApp.', kind: 'muted' },
      ],
    }),
  },
  {
    keywords: ['security', 'owasp', 'blue team', 'vulnerability', 'threat'],
    response: () => ({
      lines: [
        { text: 'active Blue Team contributor at Hind Social.', kind: 'accent' },
        { text: 'security assessments · vulnerability identification · OWASP-based recommendations · threat analysis · platform hardening.', kind: 'muted' },
      ],
    }),
  },
  {
    keywords: ['notification', 'noti', 'workflow'],
    response: () => ({
      lines: [
        { text: 'worked on notification engineering with Noti.', kind: 'accent' },
        { text: 'notification workflows · event notifications · trigger pipelines · workflow automation · notification orchestration.', kind: 'muted' },
      ],
    }),
  },
  {
    keywords: ['favorite', 'favourite', 'best project', 'proud', 'biggest'],
    response: () => ({
      lines: [
        { text: 'building the AI Agent PoC and the Services Module at Hind Social were recent highlights.', kind: 'accent' },
        { text: 'previously: the healthcare SaaS at Script Assist — 20+ UK clinics · 40k+ patients · 99.9% uptime.', kind: 'muted' },
      ],
    }),
  },
  {
    keywords: ['remote', 'relocate', 'timezone', 'time zone', 'wfh'],
    response: () => ({
      lines: [
        { text: 'remote-first. IST (UTC+5:30), but flexible for EU / US-east overlap.', kind: 'accent' },
        { text: 'open to on-site or hybrid for the right team.', kind: 'muted' },
      ],
    }),
  },
  {
    keywords: ['rate', 'salary', 'price', 'cost', 'how much', 'compensation', 'ctc'],
    response: () => ({
      lines: [
        { text: 'depends on scope & engagement — happy to chat.', kind: 'accent' },
        { text: `drop a note at ${contactInfo.email}.`, kind: 'muted' },
      ],
    }),
  },
  {
    keywords: ['stack', 'skill', 'tech', 'technology', 'tools', 'language'],
    response: cmdSkills,
  },
  {
    keywords: ['project', 'built', 'portfolio', 'side'],
    response: cmdProjects,
  },
  {
    keywords: ['experience', 'work history', 'job', 'career', 'jobs', 'background'],
    response: cmdExperience,
  },
  {
    keywords: ['education', 'degree', 'college', 'university', 'school', 'cgpa', 'gpa'],
    response: cmdEducation,
  },
  {
    keywords: ['contact', 'reach', 'email', 'phone', 'call', 'connect'],
    response: cmdContact,
  },
  {
    keywords: ['resume', 'cv', 'download'],
    response: cmdResume,
  },
  {
    keywords: ['linkedin'],
    response: () => ({ lines: [{ text: contactInfo.linkedin, kind: 'info' }] }),
  },
  {
    keywords: ['github'],
    response: () => ({ lines: [{ text: contactInfo.github, kind: 'info' }] }),
  },
  {
    keywords: ['who are you', 'about you', 'yourself', 'bio', 'intro', 'introduce'],
    response: cmdAbout,
  },
  {
    keywords: ['hello', 'hi ', 'hey', 'hola', 'namaste', 'sup', 'yo'],
    response: () => ({
      lines: [
        { text: "hey there! I'm Rahul.", kind: 'accent' },
        { text: "try 'help' to see commands, or just ask me anything.", kind: 'muted' },
      ],
    }),
  },
  {
    keywords: ['thanks', 'thank you', 'thx', 'ty'],
    response: () => ({ lines: [{ text: 'anytime', kind: 'success' }] }),
  },
  {
    keywords: ['bye', 'goodbye', 'see ya', 'see you', 'later'],
    response: () => ({ lines: [{ text: "till next time — drop an email via 'contact'.", kind: 'muted' }] }),
  },
  {
    keywords: ['joke', 'funny', 'laugh'],
    response: cmdJoke,
  },
  {
    keywords: ['what can', 'what else', 'what to do', 'commands'],
    response: cmdHelp,
  },
  {
    keywords: ['future', 'goal', 'learn', 'next', 'planning', 'roadmap'],
    response: () => ({
      lines: [
        { text: 'building intelligent systems that quietly do a lot.', kind: 'accent' },
        { text: 'deeper into: distributed systems · AI agents · platform architecture · developer tooling.', kind: 'muted' },
      ],
    }),
  },
];

// ---------- Public API ----------

export const welcomeResponse: Response = {
  lines: [
    { text: '┌─ rahul-os · product engineer edition (v4.0.0) ──┐', kind: 'accent', instant: true },
    { text: '│ system: online                                    │', kind: 'accent', instant: true },
    { text: '│ domains: full-stack · AI · security · platform    │', kind: 'accent', instant: true },
    { text: '└────────────────────────────────────────────────┘', kind: 'accent', instant: true },
    { text: '' },
    { text: "hi, I'm Rahul — a product engineer." },
    { text: "ask me anything, or type 'help' to see what I can do here.", kind: 'muted' },
  ],
};

export function processCommand(rawInput: string): Response {
  const input = rawInput.trim();
  if (!input) return { lines: [] };

  const lower = input.toLowerCase();

  // clear
  if (lower === 'clear' || lower === 'cls') return { lines: [], clear: true };

  // easter eggs - exact match
  if (easterEggs[lower]) return easterEggs[lower];

  // sudo <x>
  if (lower.startsWith('sudo ')) {
    const rest = lower.slice(5);
    if (easterEggs['sudo ' + rest]) return easterEggs['sudo ' + rest];
    return {
      lines: [
        { text: `[sudo] password for rahul: ••••••••`, kind: 'muted' },
        { text: 'Sorry, try again. (product-engineer permissions required)', kind: 'error' },
      ],
    };
  }

  // echo <x>
  if (lower.startsWith('echo ')) {
    return { lines: [{ text: input.slice(5) }] };
  }

  // cat <section>
  if (lower.startsWith('cat ')) {
    const target = lower.slice(4).trim();
    if (target === 'about' || target === 'about.md' || target === 'bio') return cmdAbout();
    if (target === 'skills' || target === 'skills.yaml' || target === 'stack') return cmdSkills();
    if (target === 'contact' || target === 'contact.json') return cmdContact();
    if (target === 'education' || target === 'education.txt') return cmdEducation();
    if (target === 'projects' || target === 'projects/') return cmdProjects();
    if (target === 'experience' || target === 'experience/') return cmdExperience();
    const expMatch = target.match(/^experience\.?(\d+)$/);
    if (expMatch) return cmdExperienceDetail(parseInt(expMatch[1], 10));
    const projMatch = target.match(/^project\.?(\d+)$/);
    if (projMatch) return cmdProjectDetail(parseInt(projMatch[1], 10));
    return { lines: [{ text: `cat: ${target}: no such file or directory`, kind: 'error' }] };
  }

  // single-word commands
  const single: Record<string, () => Response> = {
    help: cmdHelp,
    '?': cmdHelp,
    'man': cmdHelp,
    whoami: cmdWhoami,
    about: cmdAbout,
    bio: cmdAbout,
    skills: cmdSkills,
    stack: cmdSkills,
    experience: cmdExperience,
    work: cmdExperience,
    jobs: cmdExperience,
    projects: cmdProjects,
    education: cmdEducation,
    edu: cmdEducation,
    contact: cmdContact,
    email: cmdContact,
    socials: cmdSocials,
    social: cmdSocials,
    links: cmdSocials,
    resume: cmdResume,
    cv: cmdResume,
    ls: cmdLs,
    'ls -la': cmdLs,
    'ls -a': cmdLs,
    dir: cmdLs,
    pwd: cmdPwd,
    date: cmdDate,
    now: cmdDate,
    uname: cmdUname,
    'uname -a': cmdUname,
    hire: cmdHire,
    joke: cmdJoke,
  };

  if (single[lower]) return single[lower]();

  // NL intent match
  let best: { score: number; response: () => Response } | null = null;
  for (const intent of intents) {
    let score = 0;
    for (const k of intent.keywords) {
      if (lower.includes(k)) score += k.length;
    }
    if (score > 0 && (!best || score > best.score)) best = { score, response: intent.response };
  }
  if (best) return best.response();

  // fallback
  return {
    lines: [
      { text: `command not found: ${input}`, kind: 'error' },
      { text: "try 'help' or just ask naturally — e.g. \"what's your stack?\"", kind: 'muted' },
    ],
  };
}

export function getHistoryResponse(cmds: string[]): Response {
  if (!cmds.length) return { lines: [{ text: '(no commands yet)', kind: 'muted' }] };
  return { lines: cmds.slice(-20).map((c, i) => ({ text: `  ${String(i + 1).padStart(3, ' ')}  ${c}` })) };
}
