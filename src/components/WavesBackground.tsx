import { useEffect, useRef } from "react";

// WavesBackground: GPU-friendly canvas waves that continuously move at the bottom.
// - Fixed position, full width, ~30vh height by default (controlled by parent style)
// - Layered sine ribbons with gradient colors and motion
// Usage: <WavesBackground /> placed once on the page.

const WavesBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d", { alpha: true });
    if (!canvas || !ctx) return;

    let w = (canvas.width = window.innerWidth * devicePixelRatio);
    let h = (canvas.height = Math.max(200, Math.floor(window.innerHeight * 0.3)) * devicePixelRatio);
    const cssHeight = h / devicePixelRatio;
    canvas.style.height = cssHeight + "px";

    const onResize = () => {
      w = canvas.width = window.innerWidth * devicePixelRatio;
      const nh = Math.max(200, Math.floor(window.innerHeight * 0.3)) * devicePixelRatio;
      h = canvas.height = nh;
      canvas.style.height = nh / devicePixelRatio + "px";
    };
    window.addEventListener("resize", onResize);

    // Precompute gradient across width for ribbons
    const makeGrad = (y0: number, y1: number) => {
      const g = ctx.createLinearGradient(0, y0, w, y1);
      g.addColorStop(0, "rgba(137, 84, 255, 0.85)"); // purple
      g.addColorStop(0.45, "rgba(180, 120, 255, 0.75)");
      g.addColorStop(0.52, "rgba(255, 64, 64, 0.9)"); // red center
      g.addColorStop(0.60, "rgba(180, 120, 255, 0.75)");
      g.addColorStop(1, "rgba(137, 84, 255, 0.85)");
      return g;
    };

    let t0 = performance.now();

    const draw = (now: number) => {
      const dt = (now - t0) / 1000; // seconds
      t0 = now;

      // fade previous frame for soft trails
      ctx.clearRect(0, 0, w, h);
      ctx.globalCompositeOperation = "lighter";

      const baseY = h * 0.62;
      const ampBase = h * 0.14; // slightly larger amplitude for fuller waves

      // Draw multiple wave ribbons
      const layers = 7;
      for (let i = 0; i < layers; i++) {
        const prog = i / (layers - 1);
        const yOffset = (prog - 0.5) * (h * 0.22);
        const amp = ampBase * (0.6 + prog * 0.8);
        const speed = 0.4 + prog * 0.6;
        const thickness = Math.max(2.5, 5.0 - prog * 2.5) * devicePixelRatio; // thicker overall

        ctx.lineWidth = thickness;
        ctx.strokeStyle = makeGrad(0, h);
        ctx.beginPath();

        const k = 2 + prog * 2.5; // frequency
        const phase = now * 0.0015 * speed;
        const samples = Math.ceil(w / 6);
        for (let x = 0; x <= samples; x++) {
          const px = (x / samples) * w;
          const y = baseY + yOffset + Math.sin((x * k) / 40 + phase) * amp;
          if (x === 0) ctx.moveTo(px, y);
          else ctx.lineTo(px, y);
        }
        ctx.stroke();
      }

      ctx.globalCompositeOperation = "source-over";
      rafRef.current = requestAnimationFrame(draw);
    };

    rafRef.current = requestAnimationFrame(draw);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed left-0 right-0 bottom-0 z-[40]" aria-hidden>
      <canvas ref={canvasRef} className="w-full" style={{ display: 'block' }} />
    </div>
  );
};

export default WavesBackground;
