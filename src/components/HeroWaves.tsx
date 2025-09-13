import { useEffect, useRef } from "react";

// HeroWaves: Thick, high-opacity animated waves with subtle "coding" glyphs
// Intended to be placed absolutely under the profile image area.
// It auto-sizes to parent width via ResizeObserver and keeps ~180px height.

const CODE_GLYPHS = ["{}", "<>", "[]", "();", "=>", "const", "let", "</>", "/* */", "fn", "class"]; 

const HeroWaves = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d", { alpha: true });
    if (!canvas || !ctx) return;

    // Resize to parent width
    const ro = new ResizeObserver(() => {
      if (!wrapRef.current) return;
      const rect = wrapRef.current.getBoundingClientRect();
      const w = Math.max(300, Math.floor(rect.width));
      const hCss = 180; // px
      canvas.width = Math.floor(w * devicePixelRatio);
      canvas.height = Math.floor(hCss * devicePixelRatio);
      canvas.style.width = w + "px";
      canvas.style.height = hCss + "px";
    });
    if (wrapRef.current) ro.observe(wrapRef.current);

    let t0 = performance.now();

    const draw = (now: number) => {
      const dt = (now - t0) / 1000;
      t0 = now;
      const w = canvas.width;
      const h = canvas.height;
      ctx.clearRect(0, 0, w, h);

      const baseY = h * 0.62;
      const ampBase = h * 0.22; // thick/full
      const layers = 8;

      // gradient function (hero accent)
      const grad = ctx.createLinearGradient(0, 0, w, h);
      grad.addColorStop(0, "rgba(160,105,255,0.95)");
      grad.addColorStop(0.35, "rgba(210,160,255,0.9)");
      grad.addColorStop(0.52, "rgba(255,80,80,0.95)");
      grad.addColorStop(0.7, "rgba(210,160,255,0.9)");
      grad.addColorStop(1, "rgba(160,105,255,0.95)");

      // Wave ribbons
      ctx.globalCompositeOperation = "lighter";
      for (let i = 0; i < layers; i++) {
        const prog = i / (layers - 1);
        const yOffset = (prog - 0.5) * (h * 0.28);
        const amp = ampBase * (0.6 + prog * 0.7);
        const speed = 0.6 + prog * 0.7;
        const thickness = Math.max(3.0, 7.0 - prog * 3.5) * devicePixelRatio;
        const k = 2.2 + prog * 3.0;
        const phase = now * 0.0016 * speed;

        ctx.lineWidth = thickness;
        ctx.strokeStyle = grad;
        ctx.beginPath();

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

      // Coding glyphs flowing along a middle wave
      const glyphCount = 10;
      const kMid = 3.3;
      const speedMid = 0.9;
      const ampMid = ampBase * 0.75;
      const yOffsetMid = 0;
      const phaseMid = now * 0.0015 * speedMid;

      ctx.font = `${Math.max(10, Math.round(h / 9))}px ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace`;
      ctx.fillStyle = "rgba(255,255,255,0.9)";
      ctx.shadowColor = "rgba(255,255,255,0.35)";
      ctx.shadowBlur = 6;

      for (let i = 0; i < glyphCount; i++) {
        const t = ((i / glyphCount) + (now * 0.00008)) % 1; // drift
        const px = t * w;
        const y = baseY + yOffsetMid + Math.sin((px * kMid) / 40 + phaseMid) * ampMid;
        const g = CODE_GLYPHS[i % CODE_GLYPHS.length];
        const rot = Math.sin((i + now * 0.002)) * 0.12;
        ctx.save();
        ctx.translate(px, y);
        ctx.rotate(rot);
        ctx.fillText(g, 0, 0);
        ctx.restore();
      }

      rafRef.current = requestAnimationFrame(draw);
    };

    rafRef.current = requestAnimationFrame(draw);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      ro.disconnect();
    };
  }, []);

  return (
    <div ref={wrapRef} className="pointer-events-none" aria-hidden>
      <canvas ref={canvasRef} style={{ display: 'block' }} />
    </div>
  );
};

export default HeroWaves;
