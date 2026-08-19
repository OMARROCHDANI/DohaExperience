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
  
  // Keep track of scroll/animation state in refs to avoid re-renders during animation
  const stateRef = useRef({
    images: [] as HTMLImageElement[],
    loadedCount: 0,
    currentFrame: 0,
    targetFrame: 0,
    isAnimating: false,
    frameCount: 300,
  });

  const getFramePath = (index: number) => {
    const paddedIndex = index.toString().padStart(3, '0');
    return `/frames/ezgif-frame-${paddedIndex}.webp`;
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const state = stateRef.current;
    state.images = [];
    state.loadedCount = 0;
    state.currentFrame = 0;
    state.targetFrame = 0;
    state.isAnimating = false;

    // Draw the image cover on canvas (similar to CSS object-fit: cover)
    const drawImageCover = (img: HTMLImageElement) => {
      if (!img || !img.complete) return;

      const canvasWidth = canvas.width;
      const canvasHeight = canvas.height;
      const imgWidth = img.naturalWidth || img.width;
      const imgHeight = img.naturalHeight || img.height;

      const imgRatio = imgWidth / imgHeight;
      const canvasRatio = canvasWidth / canvasHeight;

      let drawWidth = 0;
      let drawHeight = 0;
      let x = 0;
      let y = 0;

      if (canvasRatio > imgRatio) {
        // Canvas is wider relative to height than the image
        drawWidth = canvasWidth;
        drawHeight = canvasWidth / imgRatio;
        x = 0;
        y = (canvasHeight - drawHeight) / 2;
      } else {
        // Canvas is taller relative to width than the image
        drawWidth = canvasHeight * imgRatio;
        drawHeight = canvasHeight;
        x = (canvasWidth - drawWidth) / 2;
        y = 0;
      }

      ctx.clearRect(0, 0, canvasWidth, canvasHeight);
      ctx.drawImage(img, x, y, drawWidth, drawHeight);
    };

    const renderFrame = (index: number) => {
      const frameIndex = Math.max(0, Math.min(state.frameCount - 1, index));
      const img = state.images[frameIndex];
      if (img) {
        drawImageCover(img);
      }
    };

    const resizeCanvas = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      renderFrame(Math.round(state.currentFrame));
    };

    const tick = () => {
      const diff = state.targetFrame - state.currentFrame;

      if (Math.abs(diff) < 0.005) {
        state.currentFrame = state.targetFrame;
        renderFrame(Math.round(state.currentFrame));
        state.isAnimating = false;
      } else {
        // Adjust 0.03 to control smoothing speed (lower = smoother/slower, higher = faster response)
        state.currentFrame += diff * 0.03;
        renderFrame(Math.round(state.currentFrame));
        requestAnimationFrame(tick);
      }
    };

    const updateScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const scrollFraction = maxScroll <= 0 ? 0 : scrollTop / maxScroll;

      state.targetFrame = scrollFraction * (state.frameCount - 1);

      if (!state.isAnimating) {
        state.isAnimating = true;
        requestAnimationFrame(tick);
      }
    };

    const handleImageLoad = () => {
      state.loadedCount++;
      const percentage = Math.floor((state.loadedCount / state.frameCount) * 100);
      onLoadingProgress(percentage);

      if (state.loadedCount === state.frameCount) {
        onLoaded();
        
        // Initial sizing and render
        resizeCanvas();
        updateScroll();

        // Listeners for interactions
        window.addEventListener('scroll', updateScroll, { passive: true });
        window.addEventListener('resize', resizeCanvas, { passive: true });
      }
    };

    // Preload Images
    for (let i = 1; i <= state.frameCount; i++) {
      const img = new Image();
      img.src = getFramePath(i);
      img.onload = handleImageLoad;
      img.onerror = () => {
        console.warn(`Failed to load frame ${i} at path: ${img.src}`);
        handleImageLoad(); // Handle as loaded to not block UI
      };
      state.images.push(img);
    }

    return () => {
      window.removeEventListener('scroll', updateScroll);
      window.removeEventListener('resize', resizeCanvas);
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
