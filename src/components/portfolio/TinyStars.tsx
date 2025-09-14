import { useEffect, useRef } from "react";

type TinyStarsProps = {
  densityScale?: number; // 1.0 default; >1 for more stars
};

const TinyStars = ({ densityScale = 1.0 }: TinyStarsProps) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d", { alpha: true });
    if (!canvas || !ctx) return;

    const container = canvas.parentElement as HTMLElement | null;
    if (!container) return;

    // Scale for device pixel ratio
    const setupCanvas = () => {
      const rect = container.getBoundingClientRect();
      const dpr = Math.max(1, Math.floor(window.devicePixelRatio || 1));
      canvas.width = Math.floor(rect.width * dpr);
      canvas.height = Math.floor(rect.height * dpr);
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      return { w: rect.width, h: rect.height, dpr };
    };

    let { w, h } = setupCanvas();

    const onResize = () => {
      const sized = setupCanvas();
      w = sized.w;
      h = sized.h;
      // Rebuild stars to maintain density
      initStars();
    };

    const ro = new ResizeObserver(onResize);
    ro.observe(container);
    window.addEventListener("orientationchange", onResize);

    // Build small, subtle starfield
    type Star = { x: number; y: number; z: number; sp: number; phase: number; freq: number };
    let stars: Star[] = [];
    const initStars = () => {
      const base = Math.floor((w * h) / 20000);
      const scaled = Math.floor(base * Math.max(0.5, Math.min(2.0, densityScale)));
      const density = Math.max(28, Math.min(180, scaled));
      stars = new Array(density).fill(0).map(() => ({
        x: Math.random() * w,
        y: Math.random() * h,
        z: Math.random() * 0.8 + 0.2,
        sp: Math.random() * 0.4 + 0.2, // slower speeds
        phase: Math.random() * Math.PI * 2,
        freq: 0.2 + Math.random() * 0.6, // very slow twinkle
      }));
    };
    initStars();

    let last = performance.now();
    const draw = (now: number) => {
      const dt = now - last; // ms
      last = now;

      // Clear fully so stars overlay the existing page background without darkening it
      ctx.clearRect(0, 0, w, h);

      const seconds = dt / 1000;
      const baseSpeed = 8; // px/sec baseline (very slow)
      for (const s of stars) {
        const vx = baseSpeed * s.sp * (0.5 + s.z * 0.7);
        const vy = baseSpeed * 0.4 * s.sp * (0.5 + s.z * 0.7);
        s.x += vx * seconds;
        s.y += vy * seconds;
        if (s.x > w) s.x -= w;
        if (s.y > h) s.y -= h;
        const tw = 0.5 + 0.5 * Math.sin((now / 1000) * s.freq * Math.PI * 2 + s.phase);
        const alpha = 0.18 * s.z + 0.18 * tw + 0.08; // a bit brighter
        const size = 0.9 + s.z * 1.2; // slightly larger
        ctx.beginPath();
        ctx.fillStyle = `rgba(255,255,255,${alpha.toFixed(3)})`;
        ctx.shadowColor = `rgba(255,255,255,${(alpha * 0.6).toFixed(3)})`;
        ctx.shadowBlur = 1.5;
        ctx.arc(s.x, s.y, size / 2, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      rafRef.current = requestAnimationFrame(draw);
    };

    rafRef.current = requestAnimationFrame(draw);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      ro.disconnect();
      window.removeEventListener("orientationchange", onResize);
    };
  }, []);

  return (
    <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" aria-hidden="true" />
  );
};

export default TinyStars;
