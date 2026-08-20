import React, { useEffect, useRef } from 'react';

interface ScrollCanvasProps {
  onLoadingProgress: (progress: number) => void;
  onLoaded: () => void;
}

export const ScrollCanvas: React.FC<ScrollCanvasProps> = ({
  onLoadingProgress,
  onLoaded,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    const FRAME_COUNT = 300;
    const LERP_SPEED = 0.1;

    // ── Progressive loading config ─────────────────────────────────────
    const CRITICAL_COUNT = 10;  // Phase 1: first N frames → dismiss preloader
    const KEYFRAME_STEP = 5;    // Phase 2: load every Nth frame for coverage

    const images: (HTMLImageElement | null)[] = new Array(FRAME_COUNT).fill(null);
    const loadedSet = new Set<number>(); // Track which frames are actually loaded

    let currentFrame = 0;
    let targetFrame = 0;
    let lastRenderedFrame = -1;
    let rafId: number | null = null;
    let ready = false;

    // ── Frame path helper ──────────────────────────────────────────────
    const getFramePath = (index: number) => {
      return `/frames/ezgif-frame-${index.toString().padStart(3, '0')}.webp`;
    };

    // ── Find nearest loaded frame ──────────────────────────────────────
    // When the exact frame isn't loaded yet, find the closest one that is
    const findNearestLoaded = (targetIdx: number): number => {
      if (loadedSet.has(targetIdx)) return targetIdx;

      let lo = targetIdx - 1;
      let hi = targetIdx + 1;

      while (lo >= 0 || hi < FRAME_COUNT) {
        if (lo >= 0 && loadedSet.has(lo)) return lo;
        if (hi < FRAME_COUNT && loadedSet.has(hi)) return hi;
        lo--;
        hi++;
      }

      return 0; // fallback
    };

    // ── Draw image with cover fit ──────────────────────────────────────
    const drawFrame = (frameIndex: number) => {
      const requestedIdx = Math.max(0, Math.min(FRAME_COUNT - 1, frameIndex));
      const idx = findNearestLoaded(requestedIdx);

      if (idx === lastRenderedFrame) return; // skip redundant draws

      const img = images[idx];
      if (!img || !img.complete || !img.naturalWidth) return;

      lastRenderedFrame = idx;

      const cw = canvas.width;
      const ch = canvas.height;
      const iw = img.naturalWidth;
      const ih = img.naturalHeight;

      const scale = Math.max(cw / iw, ch / ih);
      const dw = iw * scale;
      const dh = ih * scale;
      const dx = (cw - dw) * 0.5;
      const dy = (ch - dh) * 0.5;

      ctx.drawImage(img, dx, dy, dw, dh);
    };

    // ── Resize canvas to match viewport at device pixel ratio ──────────
    const resizeCanvas = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';
      lastRenderedFrame = -1; // force redraw after resize
      drawFrame(Math.round(currentFrame));
    };

    // ── Compute target frame from scroll position ──────────────────────
    const updateTarget = () => {
      const scrollTop = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const fraction = maxScroll <= 0 ? 0 : Math.min(1, Math.max(0, scrollTop / maxScroll));
      targetFrame = fraction * (FRAME_COUNT - 1);
    };

    // ── Main animation loop ────────────────────────────────────────────
    const tick = () => {
      if (!ready) {
        rafId = requestAnimationFrame(tick);
        return;
      }

      const diff = targetFrame - currentFrame;

      if (Math.abs(diff) > 0.01) {
        currentFrame += diff * LERP_SPEED;
      } else {
        currentFrame = targetFrame;
      }

      drawFrame(Math.round(currentFrame));
      rafId = requestAnimationFrame(tick);
    };

    // ── Load a single frame and return a promise ───────────────────────
    const loadFrame = (index: number): Promise<void> => {
      return new Promise((resolve) => {
        // 0-based index for array, 1-based for file path
        const img = new Image();
        img.decoding = 'async';
        img.src = getFramePath(index + 1); // files are 1-indexed
        img.onload = () => {
          images[index] = img;
          loadedSet.add(index);
          resolve();
        };
        img.onerror = () => {
          console.warn(`Failed to load frame ${index + 1}`);
          resolve(); // don't block progress
        };
      });
    };

    // ── Batch loader — loads frames in parallel with concurrency limit ─
    const loadBatch = (indices: number[], concurrency: number, onProgress?: () => void): Promise<void> => {
      return new Promise((resolve) => {
        let cursor = 0;
        let completed = 0;
        const total = indices.length;

        if (total === 0) { resolve(); return; }

        const next = () => {
          if (cursor >= total) return;
          const idx = indices[cursor++];
          if (loadedSet.has(idx)) {
            // Already loaded (e.g., a phase-1 frame that phase-2 would re-request)
            completed++;
            onProgress?.();
            if (completed === total) { resolve(); return; }
            next();
            return;
          }
          loadFrame(idx).then(() => {
            completed++;
            onProgress?.();
            if (completed === total) { resolve(); return; }
            next();
          });
        };

        // Kick off initial batch
        const initialBatch = Math.min(concurrency, total);
        for (let i = 0; i < initialBatch; i++) {
          next();
        }
      });
    };

    // ── Progressive loading orchestration ──────────────────────────────
    let cancelled = false;

    const startLoading = async () => {
      // PHASE 1: Load critical first frames (hero visible area)
      const phase1 = Array.from({ length: CRITICAL_COUNT }, (_, i) => i);
      let phase1Loaded = 0;

      await loadBatch(phase1, 6, () => {
        phase1Loaded++;
        // Report progress: phase 1 maps to 0–80% of the progress bar
        const pct = Math.floor((phase1Loaded / CRITICAL_COUNT) * 80);
        onLoadingProgress(pct);
      });

      if (cancelled) return;

      // ✅ Critical frames ready — show the page!
      onLoadingProgress(100);
      ready = true;
      onLoaded();
      resizeCanvas();
      updateTarget();

      // PHASE 2: Load keyframes for full scroll coverage (background)
      const phase2: number[] = [];
      for (let i = 0; i < FRAME_COUNT; i += KEYFRAME_STEP) {
        if (!loadedSet.has(i)) {
          phase2.push(i);
        }
      }
      // Also ensure the very last frame is loaded for the finale
      if (!loadedSet.has(FRAME_COUNT - 1)) {
        phase2.push(FRAME_COUNT - 1);
      }

      await loadBatch(phase2, 4);
      if (cancelled) return;

      // PHASE 3: Fill all remaining frames (background)
      const phase3: number[] = [];
      for (let i = 0; i < FRAME_COUNT; i++) {
        if (!loadedSet.has(i)) {
          phase3.push(i);
        }
      }

      await loadBatch(phase3, 4);
    };

    startLoading();

    // ── Scroll & resize listeners ──────────────────────────────────────
    window.addEventListener('scroll', updateTarget, { passive: true });
    window.addEventListener('resize', resizeCanvas, { passive: true });

    // Start the render loop immediately
    rafId = requestAnimationFrame(tick);

    // ── Cleanup ────────────────────────────────────────────────────────
    return () => {
      cancelled = true;
      window.removeEventListener('scroll', updateTarget);
      window.removeEventListener('resize', resizeCanvas);
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, [onLoaded, onLoadingProgress]);

  return (
    <canvas
      ref={canvasRef}
      id="scroll-canvas"
      aria-label="Plane flight animation sequence driven by scrolling"
    />
  );
};
