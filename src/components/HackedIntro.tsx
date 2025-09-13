import { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// HackedIntro: full-screen hacked/flicker screen for ~3s, then a quick white "blast"
// and reveal the site. Runs once per session, respects reduced motion.

const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const shouldSkipIntro = () => {
  if (prefersReducedMotion()) return true;
  try {
    return sessionStorage.getItem("hackedIntroPlayed") === "1";
  } catch {
    return false;
  }
};

const markIntroPlayed = () => {
  try {
    sessionStorage.setItem("hackedIntroPlayed", "1");
  } catch {}
};

// Simple random character generator for a "code rain"/terminal vibe
const CHARS = "01{}[]<>/\\=+*#$%&@ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

const randChar = () => CHARS[Math.floor(Math.random() * CHARS.length)];

type Phase = "glitch" | "explode";

const HackedIntro = () => {
  const [show, setShow] = useState(!shouldSkipIntro());
  const [phase, setPhase] = useState<Phase>("glitch");
  const gridRef = useRef<string[][]>([]);
  const [, forceTick] = useState(0);
  const intervalRef = useRef<number | null>(null);
  const targetsRef = useRef<{ x: number; y: number; r: number; s: number }[][]>([]);

  // We will measure actual character size and container padding at runtime
  const containerRef = useRef<HTMLDivElement | null>(null);
  const measureRef = useRef<HTMLSpanElement | null>(null);

  const getGridSize = () => {
    const w = typeof window !== "undefined" ? window.innerWidth : 1200;
    const h = typeof window !== "undefined" ? window.innerHeight : 800;
    let pad = 8; // default padding fallback
    if (containerRef.current) {
      const cs = window.getComputedStyle(containerRef.current);
      const pl = parseFloat(cs.paddingLeft || "0");
      const pr = parseFloat(cs.paddingRight || "0");
      // use left padding for simplicity; right is similar under our classes
      pad = Math.max(4, Math.round((pl + pr) / 2));
    }
    let charW = 10;
    let lineH = 16;
    if (measureRef.current) {
      // measure a few monospace characters to get average width and line height
      const rect = measureRef.current.getBoundingClientRect();
      charW = Math.max(6, rect.width / 10); // measuring 10 chars
      lineH = Math.max(10, rect.height);
    }
    const cols = Math.max(20, Math.floor((w - pad * 2) / charW));
    const rows = Math.max(12, Math.floor((h - pad * 2) / lineH));
    return { rows, cols };
  };

  const [{ rows, cols }, setGridSize] = useState(() => getGridSize());

  const baseGrid = useMemo(() => {
    return Array.from({ length: rows }, () =>
      Array.from({ length: cols }, () => randChar())
    );
  }, [rows, cols]);

  useEffect(() => {
    if (!show) return;

    // Lock page scroll during intro so user doesn't land mid-page
    const prevOverflow = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";

    // Initialize grid
    gridRef.current = baseGrid.map((row) => [...row]);
    // Precompute off-screen targets for each character (fly away from center with some rotation/scale)
    const w = typeof window !== "undefined" ? window.innerWidth : 1200;
    const h = typeof window !== "undefined" ? window.innerHeight : 800;
    const cx = (cols - 1) / 2;
    const cy = (rows - 1) / 2;
    const maxSpan = Math.max(w, h) * 0.95;
    targetsRef.current = Array.from({ length: rows }, (_, r) =>
      Array.from({ length: cols }, (_, c) => {
        const vx = c - cx;
        const vy = r - cy;
        const len = Math.hypot(vx, vy) || 1;
        const nx = vx / len;
        const ny = vy / len;
        const jitterX = (Math.random() - 0.5) * 0.35;
        const jitterY = (Math.random() - 0.5) * 0.35;
        const rot = (Math.random() - 0.5) * 90; // rotate up to ~±45deg
        const scl = 0.6 + Math.random() * 0.2; // slight shrink
        return { x: (nx + jitterX) * maxSpan, y: (ny + jitterY) * maxSpan, r: rot, s: scl };
      })
    );

    // Update characters quickly to simulate hacking
    const update = () => {
      // side-by-side fast movement: rotate each row horizontally
      for (let r = 0; r < rows; r++) {
        const row = gridRef.current[r];
        if (!row) continue;
        // alternate directions for adjacent rows
        const steps = 3; // columns to shift per tick (faster)
        if (r % 2 === 0) {
          for (let s = 0; s < steps; s++) row.unshift(row.pop()!);
        } else {
          for (let s = 0; s < steps; s++) row.push(row.shift()!);
        }
      }
      // mutate a subset of random cells to create flicker/noise
      const mutateCount = Math.max(120, Math.floor(rows * cols * 0.16));
      for (let i = 0; i < mutateCount; i++) {
        const rr = Math.floor(Math.random() * rows);
        const cc = Math.floor(Math.random() * cols);
        gridRef.current[rr][cc] = randChar();
      }
      forceTick((x) => x + 1);
    };

    // Glitch for ~2.4s, then explode letters + flash, end at ~3.0s
    intervalRef.current = window.setInterval(update, 15);

    const t1 = window.setTimeout(() => {
      setPhase("explode");
      if (intervalRef.current) {
        window.clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }, 2400);
    const t2 = window.setTimeout(() => {
      // ensure we start at the top/hero after intro
      try {
        window.scrollTo(0, 0);
      } catch {}
      setShow(false);
      markIntroPlayed();
    }, 3000);

    return () => {
      if (intervalRef.current) window.clearInterval(intervalRef.current);
      window.clearTimeout(t1);
      window.clearTimeout(t2);
      // Restore scroll
      document.documentElement.style.overflow = prevOverflow;
    };
  }, [show, baseGrid, rows, cols]);

  // Resize and font-size changes handler to keep grid full-screen
  useEffect(() => {
    const onResize = () => setGridSize(getGridSize());
    window.addEventListener("resize", onResize);
    const id = window.setInterval(onResize, 400); // periodic check for font-size media queries
    // initial second pass after first paint to use measured sizes
    const t = window.setTimeout(onResize, 0);
    return () => {
      window.removeEventListener("resize", onResize);
      window.clearInterval(id);
      window.clearTimeout(t);
    };
  }, []);

  if (!show) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 1 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.35 }}
        className="fixed inset-0 z-[120] pointer-events-none"
      >
        {/* Dark green matrix-like background */}
        <div className="absolute inset-0" style={{
          background:
            "radial-gradient(1200px 600px at 50% -20%, rgba(0,255,100,0.08), rgba(0,0,0,0) 60%), linear-gradient(180deg, #001a0f 0%, #000 100%)"
        }} />

        {/* Subtle scanlines */}
        <div
          className="absolute inset-0 opacity-25 mix-blend-overlay"
          style={{
            backgroundImage:
              "linear-gradient(transparent 95%, rgba(255,255,255,0.08) 96%, transparent 100%)",
            backgroundSize: "100% 3px",
          }}
        />

        {/* Flickering grid of characters - full screen top-left aligned */}
        <div ref={containerRef} className="absolute inset-0 p-2 sm:p-3 md:p-4">
          <div className="text-green-400/90 font-mono text-[12px] sm:text-[13px] md:text-[14px] leading-[1.05]">
            {gridRef.current.map((row, ri) => (
              <div key={ri} className="select-none">
                {row.map((ch, ci) => (
                  <motion.span
                    key={ci}
                    className="inline-block"
                    animate={
                      phase === "explode"
                        ? {
                            x: targetsRef.current[ri]?.[ci]?.x ?? 0,
                            y: targetsRef.current[ri]?.[ci]?.y ?? 0,
                            rotate: targetsRef.current[ri]?.[ci]?.r ?? 0,
                            scale: targetsRef.current[ri]?.[ci]?.s ?? 1,
                            opacity: 0,
                          }
                        : { x: 0, y: 0, rotate: 0, scale: 1, opacity: 1 }
                    }
                    transition={
                      phase === "explode"
                        ? {
                            duration: 0.55 + ((ri + ci) % 5) * 0.04,
                            ease: [0.22, 1, 0.36, 1],
                          }
                        : { duration: 0 }
                    }
                  >
                    {ch}
                  </motion.span>
                ))}
              </div>
            ))}
          </div>
          <span
            ref={measureRef}
            aria-hidden
            className="invisible absolute -z-10 font-mono text-[12px] sm:text-[13px] md:text-[14px] leading-[1.05]"
          >
            0000000000
          </span>
        </div>

        {/* Extra HUD-like corners */}
        <div className="absolute inset-4 grid grid-cols-2 grid-rows-2 opacity-70">
          <div className="border-l border-t border-green-500/40" />
          <div className="border-r border-t border-green-500/40" />
          <div className="border-l border-b border-green-500/40" />
          <div className="border-r border-b border-green-500/40" />
        </div>

        {/* Sudden blast flash during explode */}
        <AnimatePresence>
          {phase === "explode" && (
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

export default HackedIntro;
