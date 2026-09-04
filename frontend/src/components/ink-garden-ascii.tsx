"use client";

import React, { useEffect, useRef } from "react";

export interface InkGardenConfig {
  renderMode?: string;
  bgMode?: "none" | "blur" | "photo" | "solid";
  bgBlur?: number;
  bgOpacity?: number;
  cellSize?: number;
  coverage?: number;
  invert?: boolean;
  styleBlend?: GlobalCompositeOperation;
  charSet?: string;
  customChars?: string;
  brightness?: number;
  contrast?: number;
  edgeEmphasis?: number;
  density?: number;
  tint?: string;
  tintOpacity?: number;
  overlayBlend?: GlobalCompositeOperation;
  saturation?: number;
  grayscale?: number;
  animated?: boolean;
  animStyle?: "pulse" | "wave" | "shimmer" | "ripple" | "flicker";
  animSpeed?: number;
  animIntensity?: number;
  pfx?: {
    vignette?: { enabled: boolean; intensity: number };
    scanLines?: { enabled: boolean; intensity: number };
    chromatic?: { enabled: boolean; intensity: number };
    bloom?: { enabled: boolean; intensity: number };
    filmGrain?: { enabled: boolean; intensity: number };
    glitch?: { enabled: boolean; intensity: number };
    pixelate?: { enabled: boolean; intensity: number };
    halftone?: { enabled: boolean; intensity: number };
    filmDust?: { enabled: boolean; intensity: number };
  };
}

const DEFAULT_CONFIG: InkGardenConfig = {
  renderMode: "dither",
  bgMode: "none",
  bgBlur: 12,
  bgOpacity: 90,
  cellSize: 9,
  coverage: 100,
  invert: false,
  styleBlend: "source-over",
  charSet: "standard",
  customChars: "",
  brightness: 0,
  contrast: 158,
  edgeEmphasis: 0,
  density: 20,
  tint: "#3ca6ff",
  tintOpacity: 0,
  overlayBlend: "multiply",
  saturation: 100,
  grayscale: 0,
  animated: true,
  animStyle: "pulse",
  animSpeed: 100,
  animIntensity: 60,
  pfx: {
    vignette: { enabled: false, intensity: 38 },
    scanLines: { enabled: false, intensity: 40 },
    chromatic: { enabled: false, intensity: 15 },
    bloom: { enabled: false, intensity: 25 },
    filmGrain: { enabled: false, intensity: 30 },
    glitch: { enabled: false, intensity: 20 },
    pixelate: { enabled: false, intensity: 15 },
    halftone: { enabled: false, intensity: 20 },
    filmDust: { enabled: false, intensity: 20 },
  },
};

// 4x4 Bayer Matrix for ordered dithering
const BAYER_4X4 = [
  [0, 8, 2, 10],
  [12, 4, 14, 6],
  [3, 11, 1, 9],
  [15, 7, 13, 5],
];

export function InkGardenAscii({
  className = "",
  config = DEFAULT_CONFIG,
  sourceUrl,
}: {
  className?: string;
  config?: Partial<InkGardenConfig>;
  sourceUrl?: string;
}) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouseRef = useRef<{ x: number; y: number; active: boolean }>({
    x: 0,
    y: 0,
    active: false,
  });

  const mergedConfig = { ...DEFAULT_CONFIG, ...config };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) return;

    let animFrameId: number;
    let startTime = performance.now();

    // Create an offscreen procedural garden image generator
    const offscreen = document.createElement("canvas");
    const offCtx = offscreen.getContext("2d");

    let imgElement: HTMLImageElement | null = null;
    let imgLoaded = false;

    if (sourceUrl) {
      imgElement = new Image();
      imgElement.crossOrigin = "anonymous";
      imgElement.src = sourceUrl;
      imgElement.onload = () => {
        imgLoaded = true;
      };
      imgElement.onerror = () => {
        imgLoaded = false;
      };
    }

    function generateProceduralGarden(
      targetCtx: CanvasRenderingContext2D,
      w: number,
      h: number,
      time: number
    ) {
      targetCtx.fillStyle = "#050505";
      targetCtx.fillRect(0, 0, w, h);

      const cx = w / 2;
      const cy = h / 2;
      const t = time * 0.001;

      // Draw procedural ink flowers and organic vines
      const petalCount = 8;
      for (let i = 0; i < petalCount; i++) {
        const angle = (i / petalCount) * Math.PI * 2 + Math.sin(t * 0.5) * 0.2;
        const radius = Math.min(w, h) * 0.35 + Math.sin(t + i) * 20;

        const x = cx + Math.cos(angle) * radius;
        const y = cy + Math.sin(angle) * radius;

        const grad = targetCtx.createRadialGradient(x, y, 5, x, y, radius * 0.8);
        grad.addColorStop(0, `rgba(240, 240, 255, ${0.85 + Math.sin(t * 2 + i) * 0.15})`);
        grad.addColorStop(0.4, `rgba(229, 57, 53, ${0.6 + Math.cos(t + i) * 0.2})`);
        grad.addColorStop(0.8, "rgba(80, 20, 30, 0.3)");
        grad.addColorStop(1, "rgba(0, 0, 0, 0)");

        targetCtx.fillStyle = grad;
        targetCtx.beginPath();
        targetCtx.arc(x, y, radius * 0.8, 0, Math.PI * 2);
        targetCtx.fill();
      }

      // Central glowing core
      const coreGrad = targetCtx.createRadialGradient(cx, cy, 10, cx, cy, Math.min(w, h) * 0.4);
      coreGrad.addColorStop(0, "#ffffff");
      coreGrad.addColorStop(0.3, "rgba(229, 57, 53, 0.8)");
      coreGrad.addColorStop(0.7, "rgba(20, 10, 30, 0.4)");
      coreGrad.addColorStop(1, "transparent");

      targetCtx.fillStyle = coreGrad;
      targetCtx.beginPath();
      targetCtx.arc(cx, cy, Math.min(w, h) * 0.45, 0, Math.PI * 2);
      targetCtx.fill();

      // Mouse ripple effect
      if (mouseRef.current.active) {
        const mx = mouseRef.current.x;
        const my = mouseRef.current.y;
        const mouseGrad = targetCtx.createRadialGradient(mx, my, 0, mx, my, 120);
        mouseGrad.addColorStop(0, "rgba(255, 255, 255, 0.9)");
        mouseGrad.addColorStop(0.5, "rgba(229, 57, 53, 0.6)");
        mouseGrad.addColorStop(1, "transparent");

        targetCtx.fillStyle = mouseGrad;
        targetCtx.beginPath();
        targetCtx.arc(mx, my, 120, 0, Math.PI * 2);
        targetCtx.fill();
      }
    }

    function render(now: number) {
      if (!canvas || !ctx || !offCtx) return;

      const width = canvas.width;
      const height = canvas.height;
      if (width === 0 || height === 0) return;

      offscreen.width = width;
      offscreen.height = height;

      const time = now - startTime;
      const {
        renderMode,
        cellSize = 9,
        contrast = 158,
        brightness = 0,
        invert,
        animStyle,
        animSpeed = 100,
        animIntensity = 60,
        tint,
        tintOpacity = 0,
      } = mergedConfig;

      // 1. Draw Source into Offscreen Canvas
      if (imgLoaded && imgElement) {
        offCtx.drawImage(imgElement, 0, 0, width, height);
      } else {
        generateProceduralGarden(offCtx, width, height, time);
      }

      // Read raw pixels
      const imgData = offCtx.getImageData(0, 0, width, height);
      const data = imgData.data;

      // Clear main canvas
      ctx.fillStyle = "#000000";
      ctx.fillRect(0, 0, width, height);

      const cols = Math.floor(width / cellSize);
      const rows = Math.floor(height / cellSize);

      // Contrast factor calculation
      const cFactor = (259 * (contrast + 255)) / (255 * (259 - contrast));

      // Animation wave/pulse offset
      const speedFactor = (animSpeed / 100) * 0.0025;
      const intFactor = animIntensity / 100;

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const px = c * cellSize;
          const py = r * cellSize;
          const pixelIndex = (py * width + px) * 4;

          let red = data[pixelIndex] || 0;
          let green = data[pixelIndex + 1] || 0;
          let blue = data[pixelIndex + 2] || 0;

          // Brightness & Contrast
          red = Math.min(255, Math.max(0, cFactor * (red + brightness - 128) + 128));
          green = Math.min(255, Math.max(0, cFactor * (green + brightness - 128) + 128));
          blue = Math.min(255, Math.max(0, cFactor * (blue + brightness - 128) + 128));

          let luminance = (0.299 * red + 0.587 * green + 0.114 * blue) / 255;

          // Apply Animation Wave / Pulse
          if (animStyle === "pulse") {
            const pulse = Math.sin(time * speedFactor + (c + r) * 0.1) * 0.15 * intFactor;
            luminance = Math.min(1, Math.max(0, luminance + pulse));
          } else if (animStyle === "wave") {
            const wave = Math.sin(time * speedFactor * 1.5 + r * 0.2) * 0.2 * intFactor;
            luminance = Math.min(1, Math.max(0, luminance + wave));
          } else if (animStyle === "shimmer") {
            const shimmer = (Math.sin(time * speedFactor * 3 + c * 0.3) * Math.cos(r * 0.3)) * 0.2 * intFactor;
            luminance = Math.min(1, Math.max(0, luminance + shimmer));
          }

          if (invert) luminance = 1 - luminance;

          // Dither algorithm (Ordered Bayer 4x4)
          if (renderMode === "dither") {
            const bayerVal = BAYER_4X4[r % 4][c % 4] / 16;
            const threshold = bayerVal;

            if (luminance > threshold) {
              const alpha = Math.min(1, (luminance - threshold) * 2 + 0.2);
              ctx.fillStyle = `rgba(${Math.round(red)}, ${Math.round(green)}, ${Math.round(blue)}, ${alpha})`;
              ctx.fillRect(px + 1, py + 1, cellSize - 2, cellSize - 2);
            }
          } else if (renderMode === "dots" || renderMode === "bubbles") {
            const radius = (cellSize / 2) * luminance * 0.9;
            if (radius > 0.5) {
              ctx.fillStyle = `rgb(${red}, ${green}, ${blue})`;
              ctx.beginPath();
              ctx.arc(px + cellSize / 2, py + cellSize / 2, radius, 0, Math.PI * 2);
              ctx.fill();
            }
          } else if (renderMode === "cross") {
            if (luminance > 0.2) {
              ctx.strokeStyle = `rgba(${red}, ${green}, ${blue}, ${luminance})`;
              ctx.lineWidth = 1;
              ctx.beginPath();
              ctx.moveTo(px + 2, py + cellSize / 2);
              ctx.lineTo(px + cellSize - 2, py + cellSize / 2);
              ctx.moveTo(px + cellSize / 2, py + 2);
              ctx.lineTo(px + cellSize / 2, py + cellSize - 2);
              ctx.stroke();
            }
          } else {
            // Characters / Hexdump
            const chars = " .:-=+*#%@";
            const charIdx = Math.floor(luminance * (chars.length - 1));
            const ch = chars[charIdx];

            ctx.font = `${cellSize}px monospace`;
            ctx.fillStyle = `rgba(${red}, ${green}, ${blue}, ${Math.max(0.2, luminance)})`;
            ctx.fillText(ch, px, py + cellSize);
          }
        }
      }

      // Tint overlay if enabled
      if (tint && tintOpacity > 0) {
        ctx.fillStyle = tint;
        ctx.globalAlpha = tintOpacity / 100;
        ctx.fillRect(0, 0, width, height);
        ctx.globalAlpha = 1.0;
      }

      animFrameId = requestAnimationFrame(render);
    }

    // Auto resize canvas to container
    const handleResize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(rect.width * dpr);
      canvas.height = Math.floor(rect.height * dpr);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      mouseRef.current = {
        x: (e.clientX - rect.left) * dpr,
        y: (e.clientY - rect.top) * dpr,
        active: true,
      };
    };

    const handleMouseLeave = () => {
      mouseRef.current.active = false;
    };

    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseleave", handleMouseLeave);

    animFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animFrameId);
      window.removeEventListener("resize", handleResize);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [sourceUrl, mergedConfig]);

  return (
    <canvas
      ref={canvasRef}
      className={`h-full w-full ${className}`}
      style={{ imageRendering: "pixelated" }}
    />
  );
}

export default InkGardenAscii;

