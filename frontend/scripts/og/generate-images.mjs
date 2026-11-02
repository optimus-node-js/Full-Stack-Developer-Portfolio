// Renders a 1200x630 share card for every route into public/og/<key>.jpg.
// Run locally after changing page copy or data: `yarn og:images`
// (needs Playwright with Chromium installed; not part of the Vercel build).
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';
import { mkdirSync } from 'node:fs';
import path from 'node:path';
import { getRoutes } from './routes.mjs';

const require = createRequire(import.meta.url);
const { chromium } = require('playwright');

const here = path.dirname(fileURLToPath(import.meta.url));
const outDir = path.resolve(here, '../../public/og');
mkdirSync(outDir, { recursive: true });

const only = process.argv[2];
const routes = (await getRoutes()).filter((r) => !only || r.key === only);

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1200, height: 630 } });
await page.goto('file://' + path.join(here, 'card.html'));
await page.evaluate(() => document.fonts.ready);

for (const route of routes) {
  await page.reload();
  await page.evaluate(() => document.fonts.ready);
  await page.evaluate((r) => window.render(r), route);
  await page.waitForFunction(() => [...document.images].every((i) => i.complete));
  await page.screenshot({ path: path.join(outDir, `${route.key}.jpg`), type: 'jpeg', quality: 88 });
  console.log('og', route.key);
}

await browser.close();
