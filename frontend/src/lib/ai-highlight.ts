/**
 * Scrolls to a page section and briefly spotlights it. Used by the AI
 * assistant after it navigates, so the visitor sees exactly what it means.
 *
 * Sections are found by `[data-ai-section="<id>"]` first, then by `#<id>`.
 */

const HIGHLIGHT_MS = 6500;
let cleanup: (() => void) | null = null;

function findSection(id: string): HTMLElement | null {
  return (
    document.querySelector<HTMLElement>(`[data-ai-section="${CSS.escape(id)}"]`) ??
    document.getElementById(id)
  );
}

/** Wait for the section to exist (pages are lazy-loaded and animate in). */
function waitForSection(id: string, timeoutMs = 4000): Promise<HTMLElement | null> {
  return new Promise((resolve) => {
    const start = performance.now();
    const tick = () => {
      const el = findSection(id);
      if (el) return resolve(el);
      if (performance.now() - start > timeoutMs) return resolve(null);
      requestAnimationFrame(tick);
    };
    tick();
  });
}

/**
 * Frame-by-frame scroll. Native smooth scrolling gets cancelled on this site
 * as content animates in, so we drive it ourselves with instant steps.
 */
function animateScrollTo(el: HTMLElement): Promise<void> {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const html = document.documentElement;
  const prevBehavior = html.style.scrollBehavior;
  html.style.scrollBehavior = 'auto';

  const targetFor = () => {
    const r = el.getBoundingClientRect();
    const offset = r.height > window.innerHeight * 0.8 ? 96 : (window.innerHeight - r.height) / 2;
    const max = html.scrollHeight - window.innerHeight;
    return Math.max(0, Math.min(max, window.scrollY + r.top - Math.max(offset, 96)));
  };

  return new Promise((resolve) => {
    const start = window.scrollY;
    const duration = reduce ? 0 : 700;
    const t0 = performance.now();
    const step = (now: number) => {
      const t = duration ? Math.min(1, (now - t0) / duration) : 1;
      const eased = 1 - Math.pow(1 - t, 3);
      // Re-read the target each frame: content above may still be animating in.
      window.scrollTo(0, start + (targetFor() - start) * eased);
      if (t < 1) requestAnimationFrame(step);
      else {
        html.style.scrollBehavior = prevBehavior;
        resolve();
      }
    };
    requestAnimationFrame(step);
  });
}

export async function highlightSection(id: string, label?: string): Promise<boolean> {
  const el = await waitForSection(id);
  if (!el) return false;

  cleanup?.();

  // Let the route transition and scroll-to-top settle before scrolling.
  await new Promise((r) => setTimeout(r, 450));
  await animateScrollTo(el);

  el.classList.add('ai-highlight');
  let badge: HTMLDivElement | null = null;
  if (label) {
    badge = document.createElement('div');
    badge.className = 'ai-highlight-badge';
    badge.setAttribute('role', 'status');
    badge.textContent = `✦ ${label}`;
    if (getComputedStyle(el).position === 'static') el.style.position = 'relative';
    el.appendChild(badge);
  }

  const timer = window.setTimeout(() => cleanup?.(), HIGHLIGHT_MS);
  cleanup = () => {
    window.clearTimeout(timer);
    el.classList.remove('ai-highlight');
    badge?.remove();
    cleanup = null;
  };
  return true;
}
