import { useEffect, useRef } from "react";

type TinyStarsProps = {
  densityScale?: number; // 1.0 default; >1 for more stars
  cometEnabled?: boolean; // enable comet animation
  cometEveryMs?: number; // interval between comets
  cometTrailFadeMs?: number; // how long trail persists
};

const TinyStars = ({ densityScale = 1.0, cometEnabled = false, cometEveryMs = 15000, cometTrailFadeMs = 8000 }: TinyStarsProps) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const lastCometLaunchRef = useRef<number>(-Infinity);

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

    // Comet state
    let cometActive = false;
    let cometStart = 0;
    const COMET_DURATION = 3500; // ms visible (head)
    type TrailPt = { x: number; y: number; t: number };
    let trail: TrailPt[] = [];
    let cometPath: { p0: { x: number; y: number }; p1: { x: number; y: number }; cp: { x: number; y: number } } | null = null;

    const rand = (min: number, max: number) => min + Math.random() * (max - min);

    // Generate a curved comet path always from left to right with a single control point (quadratic Bezier)
    const makeCometPath = (): typeof cometPath => {
      const margin = 0.12; // enter/exit a bit off-screen
      const y0 = rand(0.15 * h, 0.85 * h);
      const y1 = rand(0.15 * h, 0.85 * h);
      const p0 = { x: -margin * w, y: y0 };
      const p1 = { x: (1 + margin) * w, y: y1 };

      // Control point: midpoint plus vertical bend for a smooth arc
      const mx = (p0.x + p1.x) / 2;
      const my = (p0.y + p1.y) / 2;
      const bend = rand(0.18, 0.32) * Math.min(w, h);
      const upOrDown = Math.random() < 0.5 ? -1 : 1;
      const cp = { x: mx, y: my + upOrDown * bend };

      return { p0, p1, cp };
    };

    const launchComet = (now: number) => {
      cometActive = true;
      cometStart = now;
      cometPath = makeCometPath();
      trail = [];
    };

    const draw = (now: number) => {
      const dt = now - last; // ms
      last = now;

      // Clear fully so stars overlay the existing page background without darkening it
      ctx.clearRect(0, 0, w, h);

      const seconds = dt / 1000;
      const baseSpeed = 11; // px/sec baseline (slightly faster)
      for (const s of stars) {
        const vx = baseSpeed * s.sp * (0.5 + s.z * 0.7);
        const vy = baseSpeed * 0.4 * s.sp * (0.5 + s.z * 0.7);
        s.x += vx * seconds;
        s.y += vy * seconds;
        if (s.x > w) s.x -= w;
        if (s.y > h) s.y -= h;
        const tw = 0.5 + 0.5 * Math.sin((now / 1000) * s.freq * Math.PI * 2 + s.phase);
        const alpha = 0.18 * s.z + 0.18 * tw + 0.08; // a bit brighter
        const size = 1.2 + s.z * 1.6; // larger for visibility
        ctx.beginPath();
        ctx.fillStyle = `rgba(255,255,255,${alpha.toFixed(3)})`;
        ctx.shadowColor = `rgba(255,255,255,${(alpha * 0.6).toFixed(3)})`;
        ctx.shadowBlur = 2;
        ctx.arc(s.x, s.y, size / 2, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      // Comet logic (optional, e.g., enabled for Hero section)
      if (cometEnabled) {
        // Launch a comet at the specified interval
        if (!cometActive && now - lastCometLaunchRef.current >= Math.max(3000, cometEveryMs)) {
          launchComet(now);
        }

        // Draw comet + add to trail
        if (cometActive && cometPath) {
          const tNorm = Math.min(1, Math.max(0, (now - cometStart) / COMET_DURATION));
          const { p0, p1, cp } = cometPath;
          // Quadratic Bezier interpolation
          const omt = 1 - tNorm;
          const cx = omt * omt * p0.x + 2 * omt * tNorm * cp.x + tNorm * tNorm * p1.x;
          const cy = omt * omt * p0.y + 2 * omt * tNorm * cp.y + tNorm * tNorm * p1.y;

          // Trail point
          trail.push({ x: cx, y: cy, t: now });

          // Draw comet head
          ctx.beginPath();
          ctx.fillStyle = "#FFFFFF";
          ctx.shadowColor = "rgba(255,255,255,0.95)";
          ctx.shadowBlur = 12;
          ctx.arc(cx, cy, 2.6, 0, Math.PI * 2);
          ctx.fill();
          ctx.shadowBlur = 0;

          // End comet head after duration
          if (tNorm >= 1) {
            cometActive = false;
            lastCometLaunchRef.current = now;
          }
        }

        // Draw trail with fade over cometTrailFadeMs
        if (trail.length) {
          const fadeMs = Math.max(1000, cometTrailFadeMs);
          const cutoff = now - fadeMs;
          // Remove old points
          if (trail[0] && trail[0].t < cutoff) {
            trail = trail.filter(p => p.t >= cutoff);
          }
          // Glowing stroke trail along the path with reduced opacity
          ctx.lineCap = 'round';
          for (let i = 1; i < trail.length; i++) {
            const p0 = trail[i - 1];
            const p1 = trail[i];
            const age = now - p1.t;
            if (age > fadeMs) continue;
            const life = 1 - age / fadeMs; // 1..0
            const op = 0.18 * life; // reduced opacity
            const width = 1.2 + 4.0 * life;
            ctx.beginPath();
            ctx.moveTo(p0.x, p0.y);
            ctx.lineTo(p1.x, p1.y);
            ctx.strokeStyle = `rgba(255,255,255,${op.toFixed(3)})`;
            ctx.lineWidth = width;
            ctx.shadowColor = `rgba(255,255,255,${(op * 0.9).toFixed(3)})`;
            ctx.shadowBlur = 6 * life;
            ctx.stroke();
            ctx.shadowBlur = 0;
          }
        }
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
