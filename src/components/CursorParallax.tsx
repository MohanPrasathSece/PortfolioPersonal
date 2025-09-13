import { useEffect, useRef } from "react";

// CursorParallax: global, lightweight 3D-ish parallax elements that follow the cursor
// - Respects reduced motion (disables on prefers-reduced-motion)
// - Fixed, full-screen, pointer-events-none, very subtle
// - Layers: soft orbs + thin lines; move at different depths

const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const CursorParallax = () => {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const cursor = useRef({ x: 0.5, y: 0.5 }); // normalized 0..1
  const renderState = useRef({ w: 0, h: 0 });

  useEffect(() => {
    const reduce = prefersReducedMotion();
    const el = rootRef.current;
    if (!el) return;

    const onResize = () => {
      renderState.current.w = window.innerWidth;
      renderState.current.h = window.innerHeight;
    };
    onResize();

    let pending = false;
    const onMove = (e: MouseEvent) => {
      if (reduce) return;
      if (pending) return;
      pending = true;
      rafRef.current = requestAnimationFrame(() => {
        pending = false;
        const { w, h } = renderState.current;
        if (!w || !h) return;
        cursor.current.x = e.clientX / w;
        cursor.current.y = e.clientY / h;
        // update transforms
        const layers = el.querySelectorAll<HTMLElement>("[data-depth]");
        layers.forEach((node) => {
          const depth = parseFloat(node.dataset.depth || "0");
          const max = 24 * depth; // px
          const tx = (cursor.current.x - 0.5) * max;
          const ty = (cursor.current.y - 0.5) * max;
          node.style.transform = `translate3d(${tx.toFixed(1)}px, ${ty.toFixed(1)}px, 0)`;
        });
      });
    };

    window.addEventListener("resize", onResize);
    window.addEventListener("mousemove", onMove);

    return () => {
      window.removeEventListener("resize", onResize);
      window.removeEventListener("mousemove", onMove);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  // Visual layers: keep very minimal, brand-friendly
  return (
    <div
      ref={rootRef}
      className="pointer-events-none fixed inset-0 z-[6]"
      aria-hidden
    >
      {/* Layer 1: large soft orb (deep) */}
      <div
        data-depth="0.25"
        className="absolute -top-24 -left-24 w-[360px] h-[360px] rounded-full"
        style={{
          background:
            "radial-gradient(50% 50% at 50% 50%, rgba(255,132,0,0.18) 0%, rgba(255,132,0,0) 70%)",
          filter: "blur(6px)",
        }}
      />
      {/* Layer 2: purple orb (mid) */}
      <div
        data-depth="0.35"
        className="absolute top-1/4 right-[-120px] w-[260px] h-[260px] rounded-full"
        style={{
          background:
            "radial-gradient(50% 50% at 50% 50%, rgba(150,100,255,0.18) 0%, rgba(150,100,255,0) 70%)",
          filter: "blur(8px)",
        }}
      />
      {/* Layer 3: thin diagonal line accents (shallow) */}
      <div data-depth="0.6" className="absolute left-12 bottom-20 h-[2px] w-48"
        style={{
          background:
            "linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.25) 40%, rgba(255,255,255,0) 100%)",
        }}
      />
      <div data-depth="0.5" className="absolute right-24 top-24 h-[2px] w-32"
        style={{
          background:
            "linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.18) 40%, rgba(255,255,255,0) 100%)",
        }}
      />
    </div>
  );
};

export default CursorParallax;
