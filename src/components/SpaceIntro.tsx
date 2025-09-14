import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

// SpaceIntro: Minimalist comet sweep reveal (~3s)
// - Subtle drifting starfield (canvas for perf)
// - Comet sweeps diagonally with glow trail and lens-like flash
// - Quick white flash near the end, then unmounts
// - Runs once per session, respects reduced motion

const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const queryOverride = () => {
  try {
    const usp = new URLSearchParams(window.location.search);
    const val = usp.get("intro");
    if (val === "1") return { forcePlay: true } as const;
    if (val === "0") return { forceSkip: true } as const;
  } catch {}
  return {} as const;
};

const shouldSkipIntro = () => {
  // Show the intro on mobile the same as desktop by not skipping due to reduced-motion.
  // Keep the once-per-session behavior controlled only by sessionStorage.
  const ov = queryOverride();
  if ((ov as any).forcePlay) return false;
  if ((ov as any).forceSkip) return true;
  try {
    return sessionStorage.getItem("spaceIntroPlayed") === "1";
  } catch {
    return false;
  }
};

const markIntroPlayed = () => {
  try {
    sessionStorage.setItem("spaceIntroPlayed", "1");
  } catch {}
};

const SpaceIntro = () => {
  const [show, setShow] = useState(!shouldSkipIntro());
  const [flash, setFlash] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    if (!show) return;

    // Lock scroll during intro
    const prevOverflow = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";

    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d", { alpha: true });
    if (!canvas || !ctx) return;

    // Handle high-DPI (retina) displays for mobile clarity
    let w = window.innerWidth;  // CSS pixels
    let h = window.innerHeight; // CSS pixels
    const setupCanvas = () => {
      const dpr = Math.max(1, Math.floor(window.devicePixelRatio || 1));
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    setupCanvas();

    const onResize = () => {
      setupCanvas();
    };
    window.addEventListener("resize", onResize);

    // Build a minimalist starfield
    const starCount = Math.floor((w * h) / 3500); // slightly denser
    const stars: { x: number; y: number; z: number; sp: number; phase: number; freq: number }[] = [];
    for (let i = 0; i < starCount; i++) {
      stars.push({
        x: Math.random() * w,
        y: Math.random() * h,
        z: Math.random() * 0.8 + 0.2, // depth (0.2..1.0)
        sp: Math.random() * 0.6 + 0.4, // speed factor (0.4..1.0)
        phase: Math.random() * Math.PI * 2,
        freq: 1.0 + Math.random() * 2.0, // twinkle frequency 1..3 Hz
      });
    }

    // Asteroid state (single bright white body)
    const asteroid = {
      t: 0,
      startDelay: 500, // ms
      duration: 2000, // ~2s visible
      p0: { x: -0.15 * w, y: 0.10 * h }, // enter from left-top
      p1: { x: 1.15 * w, y: 0.90 * h }, // exit to right-bottom
      color: "#FFFFFF",
    } as const;

    let last = performance.now();
    const start = last;

    const draw = (now: number) => {
      const dt = now - last;
      last = now;

      // Fade previous frame to create subtle trails
      ctx.fillStyle = "rgba(0,0,0,0.25)";
      ctx.fillRect(0, 0, w, h);

      // Starfield drift (parallax downward-right) using delta-time (ms)
      const seconds = dt / 1000;
      const baseSpeed = 90; // px/sec baseline
      for (const s of stars) {
        const vx = baseSpeed * s.sp * (0.6 + s.z * 0.8); // scale with depth
        const vy = baseSpeed * 0.6 * s.sp * (0.6 + s.z * 0.8);
        s.x += vx * seconds;
        s.y += vy * seconds;
        if (s.x > w) s.x -= w;
        if (s.y > h) s.y -= h;
        // twinkle
        const tw = 0.5 + 0.5 * Math.sin((now / 1000) * s.freq * Math.PI * 2 + s.phase);
        const alpha = 0.25 * s.z + 0.25 * tw + 0.1;
        const size = 1 + s.z * 1.5;
        ctx.fillStyle = `rgba(255,255,255,${alpha.toFixed(3)})`;
        ctx.fillRect(s.x, s.y, size, size);
      }

      const elapsed = now - start;

      // Animate asteroid after delay
      const ta = Math.min(
        1,
        Math.max(0, (elapsed - asteroid.startDelay) / asteroid.duration)
      );
      ;(asteroid as any).t = ta;

      if (ta > 0) {
        const ax = asteroid.p0.x + (asteroid.p1.x - asteroid.p0.x) * ta;
        const ay = asteroid.p0.y + (asteroid.p1.y - asteroid.p0.y) * ta;

        // Asteroid trail (bright white glow)
        const trailStepsA = 18;
        for (let i = 0; i < trailStepsA; i++) {
          const tt = Math.max(0, ta - i * 0.02);
          const tx = asteroid.p0.x + (asteroid.p1.x - asteroid.p0.x) * tt;
          const ty = asteroid.p0.y + (asteroid.p1.y - asteroid.p0.y) * tt;
          const op = Math.max(0, 0.18 - i * 0.007);
          const size = 2.2 + (trailStepsA - i) * 0.55;
          ctx.beginPath();
          ctx.fillStyle = `rgba(255,255,255,${op.toFixed(3)})`;
          ctx.shadowColor = "rgba(255,255,255,0.7)";
          ctx.shadowBlur = 22 - i;
          ctx.arc(tx, ty, size, 0, Math.PI * 2);
          ctx.fill();
          ctx.shadowBlur = 0;
        }

        // Asteroid head
        ctx.beginPath();
        ctx.fillStyle = asteroid.color;
        ctx.shadowColor = "rgba(255,255,255,0.95)";
        ctx.shadowBlur = 26;
        ctx.arc(ax, ay, 4.0, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      // Trigger flash near the end of asteroid path
      if (!flash && (typeof (asteroid as any).t === 'number' && (asteroid as any).t > 0.92)) {
        setFlash(true);
      }

      const TOTAL = 3000; // ms
      if (elapsed < TOTAL) {
        rafRef.current = requestAnimationFrame(draw);
      }
    };

    rafRef.current = requestAnimationFrame(draw);

    const tEnd = window.setTimeout(() => {
      try {
        window.scrollTo(0, 0);
      } catch {}
      setShow(false);
      markIntroPlayed();
    }, 3000);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", onResize);
      window.clearTimeout(tEnd);
      document.documentElement.style.overflow = prevOverflow;
    };
  }, [show]);

  if (!show) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 1 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="fixed inset-0 z-[9999] pointer-events-none"
      >
        {/* Space backdrop gradient */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(1200px 600px at 50% -20%, rgba(90,120,255,0.08), rgba(0,0,0,0) 60%), linear-gradient(180deg, #030614 0%, #000 100%)",
          }}
        />

        {/* Subtle vignette */}
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,transparent_60%,rgba(0,0,0,0.5)_100%)]" />

        {/* Starfield */}
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

        {/* Comet sweep visuals overlay (optional cross-lines) */}
        <div className="absolute inset-0">
          <div className="absolute left-0 top-0 right-0 bottom-0 opacity-10 mix-blend-screen" />
        </div>

        {/* Quick white flash */}
        <AnimatePresence>
          {flash && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.12 }}
              className="absolute inset-0 bg-white"
            />
          )}
        </AnimatePresence>
      </motion.div>
    </AnimatePresence>
  );
};

export default SpaceIntro;
