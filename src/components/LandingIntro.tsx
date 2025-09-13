import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// LandingIntro: a full-screen intro where blocks fall into place, then reveal the site.
// - Respects reduced motion
// - Can run once per session using sessionStorage flag
// - Duration ~2s

const ROWS = 10; // more rows for smaller bricks
const COLS = 18; // more cols for smaller bricks

const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const shouldSkipIntro = () => {
  if (prefersReducedMotion()) return true;
  try {
    return sessionStorage.getItem("introPlayed") === "1";
  } catch {
    return false;
  }
};

const markIntroPlayed = () => {
  try {
    sessionStorage.setItem("introPlayed", "1");
  } catch {}
};

const LandingIntro = () => {
  const [show, setShow] = useState(!shouldSkipIntro());

  const blocks = useMemo(() => {
    return Array.from({ length: ROWS * COLS }, (_, i) => i);
  }, []);

  useEffect(() => {
    if (!show) return;
    const t = setTimeout(() => {
      setShow(false);
      markIntroPlayed();
    }, 1800); // total duration ~1.8s
    return () => clearTimeout(t);
  }, [show]);

  if (!show) return null;

  const container = {
    present: {
      transition: {
        staggerChildren: 0.01,
      },
    },
  } as const;

  // Each brick starts in place (forming a wall) then falls off the screen
  const item = {
    present: (custom: { r: number; c: number }) => ({
      y: 0,
      opacity: 1,
      rotate: 0,
      transition: {
        delay: custom.r * 0.05 + (custom.c % 3) * 0.01, // top rows fall first, slight column variance
      },
    }),
    fall: (custom: { r: number; c: number }) => ({
      y: "110vh",
      opacity: 0,
      rotate: (custom.c % 2 ? 1 : -1) * 6,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
        delay: custom.r * 0.05 + (custom.c % 3) * 0.01,
      },
    }),
  } as const;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 1 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.35 }}
        className="fixed inset-0 z-[100] pointer-events-none"
      >
        {/* Backdrop */}
        <div className="absolute inset-0 bg-background" />

        {/* Grid blocks */}
        <motion.div
          className="relative h-full w-full grid"
          style={{
            gridTemplateColumns: `repeat(${COLS}, 1fr)`,
            gridTemplateRows: `repeat(${ROWS}, 1fr)`,
            gap: 2,
          }}
          variants={container}
          initial="present"
          animate="present"
        >
          {blocks.map((i) => {
            const r = Math.floor(i / COLS);
            const c = i % COLS;
            return (
              <motion.div
                key={i}
                custom={{ r, c }}
                variants={item}
                initial="present"
                animate="fall"
                className="rounded-[6px]"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(255,132,0,0.25) 0%, rgba(255,132,0,0.12) 40%, rgba(255,132,0,0.06) 100%)",
                }}
              />
            );
          })}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default LandingIntro;
