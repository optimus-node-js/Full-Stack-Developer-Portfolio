// Renders a 1200x630 share card for every route into public/og/<key>.jpg.
// Run locally after changing page copy or data: `yarn og:images`
// (needs Playwright with Chromium installed; not part of the Vercel build).
// The home card is a screenshot of the real home page, so also run
// `yarn build && yarn preview` first (or set OG_HOME_URL).
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

const homeUrl = process.env.OG_HOME_URL || 'http://localhost:4173/';

for (const route of routes) {
  if (route.variant === 'home') {
    const shot = await browser.newPage({ viewport: { width: 1200, height: 630 } });
    await shot.goto(homeUrl, { waitUntil: 'networkidle' });
    // Hide the floating chat button and let the typed tagline finish.
    await shot.addStyleTag({ content: '[aria-label*="chat" i],[aria-label*="assistant" i]{display:none!important}' });
    await shot.waitForTimeout(6000);
    await shot.screenshot({ path: path.join(outDir, `${route.key}.jpg`), type: 'jpeg', quality: 90 });
    await shot.close();
    console.log('og', route.key, '(screenshot)');
    continue;
  }
  await page.reload();
  await page.evaluate(() => document.fonts.ready);
  await page.evaluate((r) => window.render(r), route);
  await page.waitForFunction(() => [...document.images].every((i) => i.complete));
  await page.screenshot({ path: path.join(outDir, `${route.key}.jpg`), type: 'jpeg', quality: 88 });
  console.log('og', route.key);
}

await browser.close();
