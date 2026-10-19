import { useCallback, useEffect, useRef, useState } from 'react';
import { Download, ExternalLink, Loader2, Zap } from 'lucide-react';
import PageShell from '@/components/PageShell';
import { availability } from '@/data/case-studies';

const RESUME_PDF = '/resume.pdf';
const RESUME_DOC = '/resume-doc/resume.html';
const DOWNLOAD_NAME = 'Rahul_Vishwakarma_Resume.pdf';
const PAPER_WIDTH = 816; // 8.5in at 96dpi — the width the resume is laid out at

/**
 * Shows the resume's HTML source (the same file the PDF is printed from):
 * loads instantly, text is selectable and links are clickable. The sheet is
 * laid out at paper width and scaled to fit the screen.
 */
const ResumePage = () => {
  const boxRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLIFrameElement>(null);
  const [scale, setScale] = useState(1);
  const [docHeight, setDocHeight] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [updated, setUpdated] = useState<string | null>(null);

  // Scale the paper to the available width (never upscale).
  useEffect(() => {
    const el = boxRef.current;
    if (!el) return;
    const update = () => setScale(Math.min(1, el.clientWidth / PAPER_WIDTH));
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const measure = useCallback(() => {
    const doc = frameRef.current?.contentDocument;
    if (doc?.body) setDocHeight(doc.documentElement.scrollHeight);
  }, []);

  const handleLoad = () => {
    const doc = frameRef.current?.contentDocument;
    if (doc) {
      const iso = doc.querySelector('meta[name="resume-updated"]')?.getAttribute('content');
      if (iso) setUpdated(new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }));
      // Re-measure once web fonts settle, since they change line wrapping.
      doc.fonts?.ready.then(measure);
    }
    measure();
    setLoaded(true);
  };

  return (
    <PageShell
      label="~/resume"
      eyebrow="// resume"
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
              href={RESUME_PDF}
              target="_blank"
              rel="noopener noreferrer"
              className="h-10 px-4 rounded-full inline-flex items-center gap-2 text-sm border border-border/70 bg-background/60 hover:bg-muted/50 transition-colors"
            >
              <ExternalLink className="h-4 w-4" /> <span className="hidden sm:inline">Open PDF</span><span className="sm:hidden">PDF</span>
            </a>
            <a href={RESUME_PDF} download={DOWNLOAD_NAME} className="btn-primary-premium h-10 px-4 rounded-full inline-flex items-center gap-2 text-sm">
              <Download className="h-4 w-4" /> Download
            </a>
          </div>
        </div>

        {/* Paper */}
        <div ref={boxRef} data-ai-section="viewer" className="w-full">
          <div
            className="relative mx-auto rounded-xl overflow-hidden bg-white shadow-[0_20px_60px_-15px_rgba(0,0,0,0.45)] ring-1 ring-black/5"
            style={{ width: PAPER_WIDTH * scale, height: loaded && docHeight ? docHeight * scale : PAPER_WIDTH * scale * 1.294 }}
          >
            {!loaded && (
              <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-3 text-neutral-500 bg-white">
                <Loader2 className="h-6 w-6 animate-spin" />
                <span className="text-sm">Loading resume…</span>
              </div>
            )}
            <iframe
              ref={frameRef}
              src={RESUME_DOC}
              title="Rahul Vishwakarma — resume"
              onLoad={handleLoad}
              scrolling="no"
              className="absolute top-0 left-0 border-0 bg-white"
              style={{
                width: PAPER_WIDTH,
                height: docHeight || PAPER_WIDTH * 1.294,
                transform: `scale(${scale})`,
                transformOrigin: 'top left',
              }}
            />
          </div>
        </div>
      </div>
    </PageShell>
  );
};

export default ResumePage;
