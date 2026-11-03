// Runs after `vite build`. Link-preview crawlers (WhatsApp, LinkedIn, Slack,
// X, iMessage) don't run JavaScript, so every route gets its own copy of
// dist/index.html with that page's title, description and share card baked in.
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { getRoutes, SITE_URL, SITE_NAME } from './routes.mjs';

const dist = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../dist');
const template = readFileSync(path.join(dist, 'index.html'), 'utf8');

const esc = (s) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

// Drop the template's own SEO tags; each page gets a fresh, complete set.
const stripped = template
  .replace(/<title>[\s\S]*?<\/title>\s*/, '')
  .replace(/<meta\s+(name|property)="(description|og:[^"]+|twitter:[^"]+)"[^>]*>\s*/g, '')
  .replace(/<link\s+rel="canonical"[^>]*>\s*/g, '');

const routes = await getRoutes();
let missing = 0;

for (const r of routes) {
  if (!existsSync(path.join(dist, r.image))) {
    console.warn(`[og] missing ${r.image}; run \`yarn og:images\``);
    missing++;
  }
  const url = SITE_URL + (r.path === '/' ? '/' : r.path);
  const image = SITE_URL + r.image;
  const tags = [
    `<title>${esc(r.title)}</title>`,
    `<meta name="description" content="${esc(r.description)}" />`,
    `<link rel="canonical" href="${url}" />`,
    `<meta property="og:type" content="${r.path.startsWith('/case-studies/') ? 'article' : 'website'}" />`,
    `<meta property="og:site_name" content="${esc(SITE_NAME)}" />`,
    `<meta property="og:url" content="${url}" />`,
    `<meta property="og:title" content="${esc(r.title)}" />`,
    `<meta property="og:description" content="${esc(r.description)}" />`,
    `<meta property="og:image" content="${image}" />`,
    `<meta property="og:image:secure_url" content="${image}" />`,
    `<meta property="og:image:type" content="image/jpeg" />`,
    `<meta property="og:image:width" content="1200" />`,
    `<meta property="og:image:height" content="630" />`,
    `<meta property="og:image:alt" content="${esc(r.card.title)}, Rahul Vishwakarma" />`,
    `<meta property="og:locale" content="en_US" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${esc(r.title)}" />`,
    `<meta name="twitter:description" content="${esc(r.description)}" />`,
    `<meta name="twitter:image" content="${image}" />`,
  ].join('\n    ');

  const html = stripped.replace('</head>', `    ${tags}\n  </head>`);
  // /about -> about.html, served at /about by `cleanUrls` in vercel.json.
  const file = r.path === '/' ? path.join(dist, 'index.html') : path.join(dist, `${r.path.slice(1)}.html`);
  mkdirSync(path.dirname(file), { recursive: true });
  writeFileSync(file, html);
}

console.log(`[og] wrote meta for ${routes.length} routes${missing ? `, ${missing} missing images` : ''}`);
