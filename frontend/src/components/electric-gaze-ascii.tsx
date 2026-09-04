"use client";

import { useEffect, useMemo, useRef } from "react";

export type ElectricGazeRenderMode =
  | "characters" | "dither" | "mosaic" | "pixel" | "dots" | "cross" | "diamond"
  | "voxel" | "lego" | "mixed" | "lines" | "diagonal" | "braille" | "disco"
  | "hexdump" | "matrix" | "rings" | "hearts" | "stars" | "hexagons"
  | "triangles" | "bubbles" | "hatch" | "contour" | "halfblocks"
  | "ascii" | "bars";

export interface ElectricGazeLight {
  x: number;
  y: number;
  radius?: number;
  color?: string;
  intensity?: number;
}

export interface ElectricGazeConfig {
  renderMode?: ElectricGazeRenderMode;
  bgMode?: "none" | "blur" | "photo" | "solid";
  bgBlur?: number;
  bgOpacity?: number;
  coverage?: number;
  density?: number;
  invert?: boolean;
  styleBlend?: GlobalCompositeOperation;
  overlayBlend?: GlobalCompositeOperation;
  blurType?: "gaussian" | "motion" | "zoom";
  saturation?: number;
  grayscale?: number;
  sourceImage?: string;
  cellSize?: number;
  charSet?: string;
  tint?: string;
  brightness?: number;
  contrast?: number;
  animated?: boolean;
  animationSpeed?: number;
  animSpeed?: number | { value?: number; enabled?: boolean; wrapped?: boolean };
  animIntensity?: number;
  animationIntensity?: number;
  mask?: { enabled?: boolean; feather?: number; x?: number; y?: number; dataUrl?: string; invert?: boolean };
  lights?: ElectricGazeLight[] | { enabled?: boolean; points?: ElectricGazeLight[] };
  postEffects?: {
    scanLines?: number;
    scanlines?: number;
    vignette?: number;
    bloom?: number;
    grain?: number;
    chromatic?: number;
    filmGrain?: number;
    glitch?: number;
    halftone?: number;
    pixelate?: number;
    filmDust?: number;
  };
}

const defaults: ElectricGazeConfig = {
  renderMode: "characters",
  bgMode: "none",
  bgBlur: 12,
  bgOpacity: 90,
  cellSize: 7,
  charSet: " .:-=+*#%@",
  tint: "#e53935",
  brightness: 0,
  contrast: 125,
  coverage: 100,
  density: 20,
  invert: false,
  styleBlend: "source-over",
  overlayBlend: "source-over",
  blurType: "gaussian",
  saturation: 100,
  grayscale: 0,
  animated: true,
  animationSpeed: 1,
  animationIntensity: 0.32,
  animIntensity: 0.32,
  postEffects: { scanLines: 0.18, vignette: 0.72, bloom: 0.2, filmGrain: 0.06, chromatic: 0, glitch: 0, halftone: 0, pixelate: 0, filmDust: 0 },
};

export function ElectricGazeAscii({
  className = "",
  config,
  sourceImage,
}: {
  className?: string;
  config?: ElectricGazeConfig;
  sourceImage?: string;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const settings = useMemo(() => ({ ...defaults, ...config, postEffects: { ...defaults.postEffects, ...config?.postEffects } }), [config]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    const source = sourceImage ?? settings.sourceImage ?? "/profile-ClwFbffV.jpg";
    const image = source ? new Image() : null;
    if (image && source) {
      image.crossOrigin = "anonymous";
      image.src = source;
    }
    let frame = 0;
    let width = 0;
    let height = 0;
    const sample = document.createElement("canvas");
    const sampleCtx = sample.getContext("2d", { willReadFrequently: true });
    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = Math.max(1, Math.floor(rect.width * dpr));
      height = Math.max(1, Math.floor(rect.height * dpr));
      canvas.width = width;
      canvas.height = height;
    };
    const render = (now: number) => {
      if (!sampleCtx || !width || !height) return;
      const cell = Math.max(3, settings.cellSize ?? 7);
      const cols = Math.ceil(width / cell);
      const rows = Math.ceil(height / cell);
      sample.width = cols;
      sample.height = rows;
      sampleCtx.fillStyle = settings.bgMode === "solid" ? settings.tint ?? "#080808" : "#080808";
      sampleCtx.fillRect(0, 0, cols, rows);
      if (image?.complete && image.naturalWidth) {
        sampleCtx.drawImage(image, 0, 0, cols, rows);
      } else {
        const t = now * 0.001 * (settings.animationSpeed ?? 1);
        const g = sampleCtx.createRadialGradient(cols * 0.5, rows * 0.48, 0, cols * 0.5, rows * 0.48, cols * 0.65);
        g.addColorStop(0, "#fff");
        g.addColorStop(0.18, "#ef5b55");
        g.addColorStop(0.65, "#351016");
        g.addColorStop(1, "#050505");
        sampleCtx.fillStyle = g;
        sampleCtx.fillRect(0, 0, cols, rows);
        sampleCtx.globalCompositeOperation = "screen";
        sampleCtx.strokeStyle = "rgba(255,255,255,.45)";
        for (let i = 0; i < 5; i++) {
          sampleCtx.beginPath();
          sampleCtx.arc(cols / 2, rows / 2, cols * (0.12 + i * 0.12) + Math.sin(t + i) * 2, 0, Math.PI * 2);
          sampleCtx.stroke();
        }
        sampleCtx.globalCompositeOperation = "source-over";
      }
      const data = sampleCtx.getImageData(0, 0, cols, rows).data;
      ctx.fillStyle = "#050505";
      ctx.fillRect(0, 0, width, height);
      const contrast = ((settings.contrast ?? 125) + 255) / 255;
      const speed = typeof settings.animSpeed === "object" ? settings.animSpeed.value ?? 1 : settings.animSpeed ?? settings.animationSpeed ?? 1;
      const intensity = (settings.animIntensity ?? settings.animationIntensity ?? 0.32) *  (settings.animIntensity !== undefined || settings.animationIntensity !== undefined ? 1 : 100);
      const t = now * 0.001 * speed;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.font = `${Math.max(8, cell * 1.15)}px ui-monospace, monospace`;
      for (let y = 0; y < rows; y++) for (let x = 0; x < cols; x++) {
        const i = (y * cols + x) * 4;
        let lum = (0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2] + (settings.brightness ?? 0)) / 255;
        lum = Math.max(0, Math.min(1, (lum - 0.5) * contrast + 0.5));
        if (settings.invert) lum = 1 - lum;
        if (settings.animated !== false) lum = Math.max(0, Math.min(1, lum + Math.sin(t * 2 + x * 0.18 + y * 0.12) * intensity));
        if (Math.random() * 100 > (settings.coverage ?? 100)) lum = 0;
        if (Math.random() * 100 > Math.max(1, settings.density ?? 20) * 5) lum *= 0.65;
        const px = x * cell + cell / 2;
        const py = y * cell + cell / 2;
        let alpha = lum;
        if (settings.mask?.enabled) {
          const dx = (x / cols - (settings.mask.x ?? 0.5)) * 2;
          const dy = (y / rows - (settings.mask.y ?? 0.5)) * 2;
          const maskAlpha = Math.max(0, 1 - Math.hypot(dx, dy) / (settings.mask.feather ?? 1));
          alpha *= settings.mask.invert ? 1 - maskAlpha : maskAlpha;
        }
        if (alpha < 0.08) continue;
        const mode = settings.renderMode ?? "characters";
        const chars = settings.charSet || " .:-=+*#%@";
        const glyphs: Record<string, string> = { dots: "●", cross: "✚", diamond: "◆", voxel: "▣", lego: "▰", lines: "━", diagonal: "╱", braille: "⠿", disco: "✦", rings: "◎", hearts: "♥", stars: "★", hexagons: "⬡", triangles: "▲", bubbles: "○", hatch: "▒", contour: "∿", halfblocks: "▀", pixel: "█", mosaic: "▦", matrix: "01", hexdump: "0123456789ABCDEF" };
        const ch = mode === "dither" ? (lum > ((x + y) % 2 ? 0.55 : 0.3) ? "█" : " ") : mode === "mixed" ? (x % 3 === 0 ? "●" : chars[Math.floor(lum * (chars.length - 1))]) : glyphs[mode] ? glyphs[mode][Math.floor((x + y + Math.floor(t * 3)) % glyphs[mode].length)] : chars[Math.floor(lum * (chars.length - 1))];
        ctx.globalAlpha = alpha * ((settings.bgOpacity ?? 90) / 100);
        ctx.fillStyle = settings.tint ?? "#e53935";
        ctx.globalCompositeOperation = settings.styleBlend ?? "source-over";
        ctx.fillText(ch, px, py);
      }
      ctx.globalAlpha = 1;
      ctx.globalCompositeOperation = settings.overlayBlend ?? "source-over";
      const fx = settings.postEffects;
      if (fx.scanLines ?? fx.scanlines) {
        ctx.fillStyle = `rgba(0,0,0,${fx.scanLines ?? fx.scanlines})`;
        for (let y = 0; y < height; y += 4) ctx.fillRect(0, y, width, 1);
      }
      if (fx.vignette) {
        const v = ctx.createRadialGradient(width / 2, height / 2, height * 0.15, width / 2, height / 2, Math.max(width, height) * 0.75);
        v.addColorStop(0, "transparent");
        v.addColorStop(1, `rgba(0,0,0,${fx.vignette})`);
        ctx.fillStyle = v;
        ctx.fillRect(0, 0, width, height);
      }
      const lights = Array.isArray(settings.lights) ? settings.lights : settings.lights?.points;
      lights?.forEach((light) => {
        const gradient = ctx.createRadialGradient(light.x * width, light.y * height, 0, light.x * width, light.y * height, (light.radius ?? 0.35) * width);
        gradient.addColorStop(0, light.color ?? "#fff");
        gradient.addColorStop(1, "transparent");
        ctx.globalAlpha = (light.intensity ?? 0.35) * (0.8 + Math.sin(t * 3) * 0.2);
        ctx.globalCompositeOperation = "screen";
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, width, height);
        ctx.globalCompositeOperation = "source-over";
      });
      const grain = fx.filmGrain ?? fx.grain ?? 0;
      if (grain) {
        ctx.globalAlpha = grain;
        for (let i = 0; i < width * height * 0.001; i++) {
          ctx.fillStyle = Math.random() > 0.5 ? "#fff" : "#000";
          ctx.fillRect(Math.random() * width, Math.random() * height, 1, 1);
        }
        ctx.globalAlpha = 1;
      }
      if (fx.chromatic) {
        ctx.globalAlpha = fx.chromatic;
        ctx.globalCompositeOperation = "screen";
        ctx.fillStyle = "#20aaff";
        ctx.fillRect(Math.sin(t) * fx.chromatic * 3, 0, 1, height);
        ctx.globalCompositeOperation = "source-over";
      }
      if (fx.filmDust || fx.glitch || fx.halftone || fx.pixelate || fx.bloom) {
        ctx.globalAlpha = Math.max(fx.filmDust ?? 0, fx.glitch ?? 0, fx.halftone ?? 0, fx.pixelate ?? 0, fx.bloom ?? 0) * 0.25;
        ctx.fillStyle = "#fff";
        ctx.fillRect(Math.random() * width, Math.random() * height, Math.max(1, fx.pixelate ?? 1), 1);
        ctx.globalAlpha = 1;
      }
      frame = requestAnimationFrame(render);
    };
    resize();
    window.addEventListener("resize", resize);
    frame = requestAnimationFrame(render);
    return () => { cancelAnimationFrame(frame); window.removeEventListener("resize", resize); };
  }, [settings, sourceImage]);

  return <canvas ref={canvasRef} aria-hidden="true" className={className} />;
}

export default ElectricGazeAscii;
