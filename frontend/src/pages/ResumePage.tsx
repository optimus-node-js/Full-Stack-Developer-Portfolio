import { useEffect, useRef, useState } from 'react';
import { Download, ExternalLink, FileText, Loader2, Zap } from 'lucide-react';
import PageShell from '@/components/PageShell';
import { availability } from '@/data/case-studies';

const RESUME_URL = '/resume.pdf';
const DOWNLOAD_NAME = 'Rahul_Vishwakarma_Resume.pdf';

interface PageLink {
  href: string;
  // Position as fractions of the page box, so it scales with the canvas.
  left: number;
  top: number;
  width: number;
  height: number;
}

interface RenderedPage {
  url: string; // object URL of the rendered page image
  aspect: number; // height / width
  links: PageLink[];
}

/** Renders the live resume.pdf in-page with PDF.js (works on iOS Safari too). */
function useResumePages(targetWidth: number) {
  const [pages, setPages] = useState<RenderedPage[] | null>(null);
  const [error, setError] = useState(false);
  const [updated, setUpdated] = useState<string | null>(null);

  useEffect(() => {
    if (!targetWidth) return;
    let cancelled = false;
    const urls: string[] = [];

    (async () => {
      try {
        // Legacy build: supports older Safari/iOS versions.
        const pdfjs = await import('pdfjs-dist/legacy/build/pdf.mjs');
        const workerUrl = (await import('pdfjs-dist/legacy/build/pdf.worker.min.mjs?url')).default;
        pdfjs.GlobalWorkerOptions.workerSrc = workerUrl;

        const doc = await pdfjs.getDocument({ url: RESUME_URL }).promise;
        const meta = await doc.getMetadata().catch(() => null);
        const created = (meta?.info as { CreationDate?: string } | undefined)?.CreationDate;
        const m = created?.match(/D:(\d{4})(\d{2})(\d{2})/);
        if (m && !cancelled) {
          setUpdated(new Date(`${m[1]}-${m[2]}-${m[3]}`).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }));
        }

        const dpr = Math.min(window.devicePixelRatio || 1, 2.5);
        const out: RenderedPage[] = [];
        for (let i = 1; i <= doc.numPages; i++) {
          const page = await doc.getPage(i);
          const base = page.getViewport({ scale: 1 });
          const viewport = page.getViewport({ scale: (targetWidth * dpr) / base.width });
          const canvas = document.createElement('canvas');
          canvas.width = Math.floor(viewport.width);
          canvas.height = Math.floor(viewport.height);
          await page.render({ canvasContext: canvas.getContext('2d')!, viewport }).promise;
          const blob = await new Promise<Blob | null>((r) => canvas.toBlob(r, 'image/png'));
          if (!blob) throw new Error('render failed');
          const url = URL.createObjectURL(blob);
          urls.push(url);

          const links: PageLink[] = [];
          for (const a of await page.getAnnotations()) {
            if (a.subtype !== 'Link' || !a.url) continue;
            const [x1, y1, x2, y2] = a.rect as number[];
            links.push({
              href: a.url,
              left: x1 / base.width,
              top: (base.height - y2) / base.height,
              width: (x2 - x1) / base.width,
              height: (y2 - y1) / base.height,
            });
          }
          out.push({ url, aspect: base.height / base.width, links });
        }
        if (!cancelled) setPages(out);
      } catch {
        if (!cancelled) setError(true);
      }
    })();

    return () => {
      cancelled = true;
      urls.forEach((u) => URL.revokeObjectURL(u));
    };
  }, [targetWidth]);

  return { pages, error, updated };
}

const ResumePage = () => {
  const boxRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);

  // Render at the container's width, re-rendering only on meaningful resizes.
  useEffect(() => {
    const el = boxRef.current;
    if (!el) return;
    const update = () => {
      const w = Math.round(el.clientWidth);
      setWidth((prev) => (Math.abs(prev - w) > 40 ? w : prev));
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const { pages, error, updated } = useResumePages(width);

  return (
    <PageShell
      label="~/resume"
      eyebrow="// resume.pdf"
      title={<>My resume, <span className="text-gradient-primary">right here.</span></>}
      subtitle="Always the latest version — read it on the page, no download needed."
    >
      <div className="max-w-4xl mx-auto">
        {/* Toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full font-semibold bg-tertiary/10 border border-tertiary/30 text-tertiary">
              <Zap className="h-3 w-3 fill-current" /> {availability.headline} · available now
            </span>
            {updated && <span className="font-mono text-muted-foreground">Updated {updated}</span>}
          </div>
          <div className="flex gap-2">
            <a
              href={RESUME_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="h-10 px-4 rounded-full inline-flex items-center gap-2 text-sm border border-border/70 bg-background/60 hover:bg-muted/50 transition-colors"
            >
              <ExternalLink className="h-4 w-4" /> <span className="hidden sm:inline">Open in new tab</span><span className="sm:hidden">Open</span>
            </a>
            <a href={RESUME_URL} download={DOWNLOAD_NAME} className="btn-primary-premium h-10 px-4 rounded-full inline-flex items-center gap-2 text-sm">
              <Download className="h-4 w-4" /> Download
            </a>
          </div>
        </div>

        {/* Pages */}
        <div ref={boxRef} data-ai-section="viewer" className="space-y-4 sm:space-y-6">
          {error ? (
            <div className="rounded-2xl border border-border/60 bg-card/60 p-8 text-center">
              <FileText className="h-8 w-8 mx-auto text-muted-foreground" />
              <p className="mt-3 text-sm text-muted-foreground">The preview couldn't load in this browser.</p>
              <a href={RESUME_URL} target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-primary">
                Open the PDF instead <ExternalLink className="h-4 w-4" />
              </a>
            </div>
          ) : !pages ? (
            <div className="relative w-full rounded-xl bg-white/95 shadow-2xl overflow-hidden" style={{ aspectRatio: '612 / 792' }} aria-busy="true">
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-neutral-500">
                <Loader2 className="h-6 w-6 animate-spin" />
                <span className="text-sm">Loading resume…</span>
              </div>
            </div>
          ) : (
            pages.map((p, i) => (
              <div
                key={p.url}
                className="relative w-full rounded-xl overflow-hidden bg-white shadow-[0_20px_60px_-15px_rgba(0,0,0,0.45)] ring-1 ring-black/5"
                style={{ aspectRatio: `1 / ${p.aspect}` }}
              >
                <img src={p.url} alt={`Resume page ${i + 1} of ${pages.length}`} className="absolute inset-0 w-full h-full select-none" draggable={false} />
                {p.links.map((l, j) => (
                  <a
                    key={j}
                    href={l.href}
                    target={l.href.startsWith('mailto:') ? undefined : '_blank'}
                    rel="noopener noreferrer"
                    aria-label={l.href.replace(/^mailto:/, '')}
                    className="absolute rounded-sm hover:bg-blue-500/15 transition-colors"
                    style={{ left: `${l.left * 100}%`, top: `${l.top * 100}%`, width: `${l.width * 100}%`, height: `${l.height * 100}%` }}
                  />
                ))}
              </div>
            ))
          )}
        </div>
      </div>
    </PageShell>
  );
};

export default ResumePage;
