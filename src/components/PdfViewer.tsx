import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as pdfjsLib from 'pdfjs-dist';
import { ZoomIn, ZoomOut, Maximize2, Download, ExternalLink, Loader2 } from 'lucide-react';

if (typeof window !== 'undefined') {
  pdfjsLib.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.js';
}

interface PageDimension {
  width: number;
  height: number;
  aspectRatio: number;
}

interface PdfViewerProps {
  url: string;
  onPageChange?: (page: number, total: number) => void;
  downloadUrl?: string;
  className?: string;
}

export const PdfViewer: React.FC<PdfViewerProps> = ({
  url,
  onPageChange,
  downloadUrl,
  className = '',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const pageRefs = useRef<{ [key: number]: HTMLDivElement | null }>({});
  const canvasRefs = useRef<{ [key: number]: HTMLCanvasElement | null }>({});

  const [pdfDoc, setPdfDoc] = useState<pdfjsLib.PDFDocumentProxy | null>(null);
  const [numPages, setNumPages] = useState<number>(0);
  const [dimensions, setDimensions] = useState<{ [key: number]: PageDimension }>({});
  const [zoomFactor, setZoomFactor] = useState<number>(1.0);
  const [containerWidth, setContainerWidth] = useState<number>(800);
  const [activePage, setActivePage] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [renderedMap, setRenderedMap] = useState<{ [key: number]: boolean }>({});

  const activeRenderTasks = useRef<Map<number, any>>(new Map());
  const renderedScales = useRef<Map<number, number>>(new Map());
  const visiblePages = useRef<Set<number>>(new Set());

  // 1. Load PDF Document and extract page aspect ratios
  useEffect(() => {
    let isCancelled = false;
    setIsLoading(true);

    const loadPdf = async () => {
      try {
        const loadingTask = pdfjsLib.getDocument({
          url,
          cMapUrl: 'https://cdn.jsdelivr.net/npm/pdfjs-dist@3.11.174/cmaps/',
          cMapPacked: true,
        });

        const doc = await loadingTask.promise;
        if (isCancelled) return;

        setPdfDoc(doc);
        setNumPages(doc.numPages);

        const dims: { [key: number]: PageDimension } = {};
        for (let i = 1; i <= doc.numPages; i++) {
          const page = await doc.getPage(i);
          const baseVp = page.getViewport({ scale: 1.0 });
          dims[i] = {
            width: baseVp.width,
            height: baseVp.height,
            aspectRatio: baseVp.width / baseVp.height,
          };
        }

        if (!isCancelled) {
          setDimensions(dims);
          setIsLoading(false);
          if (onPageChange) onPageChange(1, doc.numPages);
        }
      } catch (err) {
        if (!isCancelled) {
          console.error('Failed to load PDF resume document:', err);
          setIsLoading(false);
        }
      }
    };

    loadPdf();

    return () => {
      isCancelled = true;
      activeRenderTasks.current.forEach((task) => {
        try {
          task.cancel();
        } catch (_) {}
      });
      activeRenderTasks.current.clear();
      renderedScales.current.clear();
    };
  }, [url]);

  // 2. Measure Container Width Responsively
  useEffect(() => {
    if (!scrollContainerRef.current) return;

    const updateWidth = () => {
      if (scrollContainerRef.current) {
        const w = scrollContainerRef.current.clientWidth;
        if (w > 0) setContainerWidth(w);
      }
    };

    updateWidth();
    const observer = new ResizeObserver(updateWidth);
    observer.observe(scrollContainerRef.current);

    return () => observer.disconnect();
  }, []);

  // Calculate layout scale: Fit Width (with comfortable horizontal padding, max 840px for natural A4 reading)
  const getPageScale = useCallback(
    (pageNum: number) => {
      const dim = dimensions[pageNum];
      if (!dim || containerWidth <= 0) return 1.0;

      const availableWidth = Math.min(containerWidth - 36, 840);
      const baseScale = availableWidth / dim.width;
      return Math.max(0.4, baseScale * zoomFactor);
    },
    [dimensions, containerWidth, zoomFactor]
  );

  // 3. Render a single page onto its dedicated canvas
  const renderPage = useCallback(
    async (pageNum: number) => {
      if (!pdfDoc) return;

      const scale = getPageScale(pageNum);
      const prevScale = renderedScales.current.get(pageNum);

      // Skip if already rendered at current scale
      if (prevScale === scale) return;

      // Cancel any ongoing rendering for this page
      const currentTask = activeRenderTasks.current.get(pageNum);
      if (currentTask) {
        try {
          currentTask.cancel();
        } catch (_) {}
      }

      const canvas = canvasRefs.current[pageNum];
      if (!canvas) return;

      try {
        const page = await pdfDoc.getPage(pageNum);
        const dpr = Math.min(window.devicePixelRatio || 1, 2.0); // High-DPI support up to 2x for sharp text
        const viewport = page.getViewport({ scale: scale * dpr });

        canvas.width = viewport.width;
        canvas.height = viewport.height;
        canvas.style.width = `${viewport.width / dpr}px`;
        canvas.style.height = `${viewport.height / dpr}px`;

        const ctx = canvas.getContext('2d', { alpha: false });
        if (!ctx) return;

        const renderContext = {
          canvasContext: ctx,
          viewport,
        };

        const renderTask = page.render(renderContext);
        activeRenderTasks.current.set(pageNum, renderTask);

        await renderTask.promise;
        activeRenderTasks.current.delete(pageNum);
        renderedScales.current.set(pageNum, scale);
        setRenderedMap((prev) => ({ ...prev, [pageNum]: true }));
      } catch (err: any) {
        if (err?.name !== 'RenderingCancelledException') {
          console.error(`Error rendering PDF page ${pageNum}:`, err);
        }
      }
    },
    [pdfDoc, getPageScale]
  );

  // 4. Virtualized & Progressive Pre-rendering with IntersectionObserver
  useEffect(() => {
    if (!scrollContainerRef.current || numPages === 0) return;

    // Root margin of 450px loads adjacent pages in advance before they scroll into view
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const pageNum = Number(entry.target.getAttribute('data-page'));
          if (entry.isIntersecting) {
            visiblePages.current.add(pageNum);
            renderPage(pageNum);

            // Pre-render immediate next page if exists
            if (pageNum + 1 <= numPages) {
              renderPage(pageNum + 1);
            }
          }
        });
      },
      {
        root: scrollContainerRef.current,
        rootMargin: '450px 0px 450px 0px',
        threshold: [0, 0.25],
      }
    );

    // Active page tracker (detects which page is center in the viewport)
    const activeObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const pageNum = Number(entry.target.getAttribute('data-page'));
            setActivePage(pageNum);
            if (onPageChange) onPageChange(pageNum, numPages);
          }
        });
      },
      {
        root: scrollContainerRef.current,
        threshold: 0.5,
      }
    );

    for (let i = 1; i <= numPages; i++) {
      const el = pageRefs.current[i];
      if (el) {
        observer.observe(el);
        activeObserver.observe(el);
      }
    }

    return () => {
      observer.disconnect();
      activeObserver.disconnect();
    };
  }, [numPages, renderPage, onPageChange]);

  // When zoom changes, invalidate rendered scales and re-render visible pages
  useEffect(() => {
    renderedScales.current.clear();
    visiblePages.current.forEach((pageNum) => {
      renderPage(pageNum);
    });
  }, [zoomFactor, containerWidth, renderPage]);

  // Smooth jump to page
  const scrollToPage = (pageNum: number) => {
    const el = pageRefs.current[pageNum];
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div ref={containerRef} className={`flex flex-col h-full bg-[#0a0f16] text-textMain ${className}`}>
      {/* Sleek Floating Viewer Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-2 bg-bgPanel/95 border-b border-line shrink-0 z-20 backdrop-blur-md">
        
        {/* Left: Quick Page Jumper & Indicator */}
        <div className="flex items-center gap-2 font-mono text-xs">
          <span className="text-textDim">
            Page <span className="text-cyanNeon font-bold">{activePage}</span> of {numPages || 2}
          </span>

          {numPages > 1 && (
            <div className="flex items-center gap-1 ml-2 bg-bgDark border border-line rounded-lg p-0.5">
              {Array.from({ length: numPages }, (_, i) => i + 1).map((p) => (
                <button
                  key={p}
                  onClick={() => scrollToPage(p)}
                  className={`px-2.5 py-1 rounded transition-all duration-150 text-[11px] font-semibold ${
                    activePage === p
                      ? 'bg-cyanNeon text-slate-950 shadow-sm'
                      : 'text-textDim hover:text-textMain hover:bg-bgPanel'
                  }`}
                >
                  Page {p}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Center/Right: Zoom & Viewport Controls */}
        <div className="flex items-center gap-1.5 font-mono text-xs">
          <button
            onClick={() => setZoomFactor((prev) => Math.max(0.6, prev - 0.15))}
            className="p-1.5 rounded-lg border border-line bg-bgDark text-textDim hover:text-cyanNeon hover:border-cyanNeon transition-colors"
            title="Zoom Out"
            aria-label="Zoom Out"
          >
            <ZoomOut className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={() => setZoomFactor(1.0)}
            className="px-2 py-1 rounded-lg border border-line bg-bgDark text-textDim hover:text-cyanNeon hover:border-cyanNeon transition-colors text-[11px] font-semibold"
            title="Reset Zoom to Fit Width"
          >
            {Math.round(zoomFactor * 100)}%
          </button>

          <button
            onClick={() => setZoomFactor((prev) => Math.min(2.0, prev + 0.15))}
            className="p-1.5 rounded-lg border border-line bg-bgDark text-textDim hover:text-cyanNeon hover:border-cyanNeon transition-colors"
            title="Zoom In"
            aria-label="Zoom In"
          >
            <ZoomIn className="w-3.5 h-3.5" />
          </button>

          <div className="w-[1px] h-4 bg-line mx-1" />

          <button
            onClick={() => setZoomFactor(1.0)}
            className="p-1.5 rounded-lg border border-line bg-bgDark text-textDim hover:text-cyanNeon hover:border-cyanNeon transition-colors"
            title="Fit to Width"
          >
            <Maximize2 className="w-3.5 h-3.5" />
          </button>

          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="p-1.5 rounded-lg border border-line bg-bgDark text-textDim hover:text-cyanNeon hover:border-cyanNeon transition-colors"
            title="Open Full Tab"
          >
            <ExternalLink className="w-3.5 h-3.5" />
          </a>

          <a
            href={downloadUrl || url}
            download
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyanNeon text-slate-950 font-bold hover:shadow-glow-cyan transition-all text-xs ml-1"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download</span>
          </a>
        </div>
      </div>

      {/* Main Continuous Smooth Scroll Container */}
      <div
        ref={scrollContainerRef}
        className="flex-1 overflow-y-auto overflow-x-hidden p-3 sm:p-6 scroll-smooth overscroll-contain scrollbar-thin bg-gradient-to-b from-[#080c12] via-[#0b1018] to-[#080c12]"
        style={{
          WebkitOverflowScrolling: 'touch',
        }}
      >
        {isLoading && (
          <div className="flex flex-col items-center justify-center h-80 gap-3 text-textDim">
            <Loader2 className="w-8 h-8 text-cyanNeon animate-spin" />
            <p className="font-mono text-xs">Loading resume vector pages...</p>
          </div>
        )}

        {/* Stacked Pages with Exact Reserved Dimensions for Zero Layout Shift */}
        {numPages > 0 &&
          Array.from({ length: numPages }, (_, i) => i + 1).map((pageNum) => {
            const dim = dimensions[pageNum] || { width: 595, height: 842, aspectRatio: 595 / 842 };
            const scale = getPageScale(pageNum);
            const displayW = Math.round(dim.width * scale);
            const displayH = Math.round(dim.height * scale);
            const isRendered = renderedMap[pageNum];

            return (
              <div
                key={pageNum}
                id={`pdf-page-${pageNum}`}
                data-page={pageNum}
                ref={(el) => (pageRefs.current[pageNum] = el)}
                style={{
                  width: `${displayW}px`,
                  height: `${displayH}px`,
                }}
                className="relative bg-white rounded-md shadow-2xl shadow-black/80 my-4 mx-auto overflow-hidden transition-all duration-200 border border-slate-700/60"
              >
                {/* Hardware Accelerated Canvas for crisp vector PDF rendering */}
                <canvas
                  ref={(el) => (canvasRefs.current[pageNum] = el)}
                  className={`block w-full h-full transition-opacity duration-300 ${
                    isRendered ? 'opacity-100' : 'opacity-0'
                  }`}
                />

                {/* Skeleton Placeholder while rendering to prevent blank flicker */}
                {!isRendered && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-900/90 text-textDim gap-2.5">
                    <div className="w-5 h-5 border-2 border-cyanNeon/40 border-t-cyanNeon rounded-full animate-spin" />
                    <span className="font-mono text-xs text-textFaint">
                      Rendering Page {pageNum} of {numPages}...
                    </span>
                  </div>
                )}

                {/* Subtle Page Badge */}
                <div className="absolute bottom-2 right-2 px-2 py-0.5 rounded bg-slate-900/75 backdrop-blur-sm text-[10px] font-mono text-slate-300 pointer-events-none select-none border border-slate-700/50">
                  {pageNum} / {numPages}
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};
