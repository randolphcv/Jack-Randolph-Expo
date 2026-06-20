import { useRef, useEffect } from 'react';
import './Noise.css';

const Noise = ({
  patternSize = 250,
  patternScaleX = 1,
  patternScaleY = 1,
  patternRefreshInterval = 2,
  patternAlpha = 100,
}) => {
  const grainRef = useRef(null);

  useEffect(() => {
    const canvas = grainRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    const grainCanvas = document.createElement('canvas');
    const grainCtx = grainCanvas.getContext('2d', { alpha: true });
    if (!grainCtx) return;

    let frame = 0;
    let animationId;
    let resizeObserver;
    const refreshEvery = Math.max(1, Math.round(patternRefreshInterval));
    const alphaByte = Math.round((Math.max(0, Math.min(100, patternAlpha)) / 100) * 255);
    const grainScaleX = Math.max(0.1, patternScaleX);
    const grainScaleY = Math.max(0.1, patternScaleY);
    const sizeFactor = Math.max(0.25, patternSize / 90);

    const resize = () => {
      const parent = canvas.parentElement;
      const width = parent ? parent.clientWidth : canvas.clientWidth;
      const height = parent ? parent.clientHeight : canvas.clientHeight;
      canvas.width = Math.max(1, Math.round(width));
      canvas.height = Math.max(1, Math.round(height));
    };

    const drawGrain = () => {
      const blockX = Math.max(1, Math.round(sizeFactor * grainScaleX));
      const blockY = Math.max(1, Math.round(sizeFactor * grainScaleY));
      const grainWidth = Math.max(1, Math.round(canvas.width / blockX));
      const grainHeight = Math.max(1, Math.round(canvas.height / blockY));

      grainCanvas.width = grainWidth;
      grainCanvas.height = grainHeight;

      const imageData = grainCtx.createImageData(grainWidth, grainHeight);
      const data = imageData.data;

      for (let i = 0; i < data.length; i += 4) {
        const value = Math.random() * 255;
        data[i] = value;
        data[i + 1] = value;
        data[i + 2] = value;
        data[i + 3] = alphaByte;
      }

      grainCtx.putImageData(imageData, 0, 0);

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.imageSmoothingEnabled = false;
      ctx.drawImage(grainCanvas, 0, 0, canvas.width, canvas.height);
    };

    const loop = () => {
      if (frame % refreshEvery === 0) {
        drawGrain();
      }
      frame++;
      animationId = window.requestAnimationFrame(loop);
    };

    const parent = canvas.parentElement;
    if (typeof ResizeObserver !== 'undefined' && parent) {
      resizeObserver = new ResizeObserver(resize);
      resizeObserver.observe(parent);
    }

    window.addEventListener('resize', resize);
    resize();
    loop();

    return () => {
      resizeObserver?.disconnect();
      window.removeEventListener('resize', resize);
      window.cancelAnimationFrame(animationId);
    };
  }, [patternSize, patternScaleX, patternScaleY, patternRefreshInterval, patternAlpha]);

  return (
    <canvas
      className="noise-overlay"
      ref={grainRef}
      style={{
        imageRendering: 'pixelated',
      }}
    />
  );
};

export default Noise;
