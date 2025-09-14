import { useEffect, useRef, useState } from "react";

// OrbBot: a minimalist round robot orb (SVG) with glossy shading and two pill eyes
// Eyes subtly track the mouse cursor and blink periodically
// Drop-in usage: <OrbBot size={180} />

type Props = {
  size?: number; // overall diameter in px
};

const clamp = (v: number, min: number, max: number) => Math.max(min, Math.min(max, v));

const OrbBot = ({ size = 180 }: Props) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [cursor, setCursor] = useState({ x: 0, y: 0 }); // relative to center, normalized -1..1
  const [blink, setBlink] = useState(1); // 1=open, 0=closed (used as scaleY)
  const rafRef = useRef<number | null>(null);
  const floatRef = useRef<number | null>(null);
  const [floatY, setFloatY] = useState(0);

  useEffect(() => {
    let pending = false;
    const onMove = (e: MouseEvent) => {
      if (!ref.current) return;
      if (pending) return;
      pending = true;
      rafRef.current = requestAnimationFrame(() => {
        pending = false;
        const rect = ref.current!.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dx = (e.clientX - cx) / (rect.width / 2);
        const dy = (e.clientY - cy) / (rect.height / 2);
        setCursor({ x: clamp(dx, -1, 1), y: clamp(dy, -1, 1) });
      });
    };
    window.addEventListener("mousemove", onMove);
    return () => {
      window.removeEventListener("mousemove", onMove);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  // Blink loop
  useEffect(() => {
    let alive = true;
    const loop = () => {
      if (!alive) return;
      const openTime = 2500 + Math.random() * 2500;
      const closedTime = 120 + Math.random() * 60;
      setBlink(1);
      setTimeout(() => {
        setBlink(0.05);
        setTimeout(() => {
          setBlink(1);
          setTimeout(loop, 300);
        }, closedTime);
      }, openTime);
    };
    loop();
    return () => {
      alive = false;
    };
  }, []);

  const W = size;
  const H = size;

  // Eye params
  const eyeW = Math.max(14, Math.round(size * 0.12));
  const eyeH = Math.max(28, Math.round(size * 0.22));
  const eyeRadius = Math.min(eyeW, eyeH) / 2;
  const eyeOffsetX = Math.round(size * 0.17);
  const eyeOffsetY = Math.round(size * 0.02);

  // Eye look offset
  const eyeLookMax = Math.round(size * 0.05);
  const lookX = cursor.x * eyeLookMax;
  const lookY = cursor.y * eyeLookMax;

  // Idle float animation (rAF)
  useEffect(() => {
    let t0 = performance.now();
    const tick = (t: number) => {
      const dt = (t - t0) / 1000;
      // gentle 3s period
      const y = Math.sin(dt * (2 * Math.PI) / 3) * Math.max(2, size * 0.015);
      setFloatY(y);
      floatRef.current = requestAnimationFrame(tick);
    };
    floatRef.current = requestAnimationFrame(tick);
    return () => {
      if (floatRef.current) cancelAnimationFrame(floatRef.current);
    };
  }, [size]);

  // Mouse-based tilt (CSS 3D transform)
  const tiltX = -cursor.y * 8; // deg
  const tiltY = cursor.x * 10;  // deg

  return (
    <div
      ref={ref}
      style={{
        width: W,
        height: H,
        perspective: 800,
      }}
      aria-hidden
    >
      <svg
        width={W}
        height={H}
        viewBox={`0 0 ${W} ${H}`}
        style={{
          transform: `translateY(${floatY}px) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`,
          transformStyle: 'preserve-3d',
          transition: 'transform 80ms linear',
        }}
      >
        <defs>
          {/* Soft inner shadow */}
          <filter id="innershadow" x="-50%" y="-50%" width="200%" height="200%">
            <feOffset dx="0" dy="1" />
            <feGaussianBlur stdDeviation="2" result="offset-blur" />
            <feComposite operator="out" in="SourceGraphic" in2="offset-blur" result="inverse" />
            <feFlood floodColor="rgba(0,0,0,0.35)" result="color" />
            <feComposite operator="in" in="color" in2="inverse" result="shadow" />
            <feComposite operator="over" in="shadow" in2="SourceGraphic" />
          </filter>
          {/* Glow */}
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="6" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <radialGradient id="orbGradient" cx="50%" cy="35%" r="70%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="40%" stopColor="#e9ebef" />
            <stop offset="100%" stopColor="#c8ccd6" />
          </radialGradient>
          <radialGradient id="spec" cx="35%" cy="25%" r="30%">
            <stop offset="0%" stopColor="rgba(255,255,255,0.9)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0)" />
          </radialGradient>
        </defs>

        {/* Orb base */}
        <g filter="url(#innershadow)">
          <circle cx={W / 2} cy={H / 2} r={W / 2 - 2} fill="url(#orbGradient)" />
          {/* subtle rim */}
          <circle cx={W / 2} cy={H / 2} r={W / 2 - 1} fill="none" stroke="rgba(0,0,0,0.08)" strokeWidth="2" />
        </g>

        {/* Highlight follows tilt slightly for extra 3D, soften */}
        <ellipse cx={W * (0.38 + tiltY/160)} cy={H * (0.33 - tiltX/180)} rx={W * 0.18} ry={H * 0.12} fill="url(#spec)" opacity={0.9} />

        {/* Eyes group */}
        <g>
          {/* Left eye */}
          <g transform={`translate(${W / 2 - eyeOffsetX + lookX}, ${H / 2 + eyeOffsetY + lookY}) scale(1, ${blink})`}>
            <rect x={-eyeW / 2} y={-eyeH / 2} rx={eyeRadius} ry={eyeRadius} width={eyeW} height={eyeH} fill="#0b0b0b" />
            <rect x={-eyeW / 2 + 3} y={-eyeH / 2 + 3} rx={eyeRadius} ry={eyeRadius} width={eyeW - 6} height={eyeH - 6} fill="#0a0a0a" />
            {/* under-eye shadow */}
            <ellipse cx={0} cy={eyeH * 0.55} rx={eyeW * 0.45} ry={eyeH * 0.28} fill="rgba(0,0,0,0.08)" />
          </g>
          {/* Right eye */}
          <g transform={`translate(${W / 2 + eyeOffsetX + lookX}, ${H / 2 + eyeOffsetY + lookY}) scale(1, ${blink})`}>
            <rect x={-eyeW / 2} y={-eyeH / 2} rx={eyeRadius} ry={eyeRadius} width={eyeW} height={eyeH} fill="#0b0b0b" />
            <rect x={-eyeW / 2 + 3} y={-eyeH / 2 + 3} rx={eyeRadius} ry={eyeRadius} width={eyeW - 6} height={eyeH - 6} fill="#0a0a0a" />
            {/* under-eye shadow */}
            <ellipse cx={0} cy={eyeH * 0.55} rx={eyeW * 0.45} ry={eyeH * 0.28} fill="rgba(0,0,0,0.08)" />
          </g>
        </g>

      </svg>
      {/* Soft drop shadow below the orb for depth */}
      <div
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          margin: '0 auto',
          top: H - Math.max(6, Math.round(size * 0.08)),
          width: Math.round(W * 0.55),
          height: Math.max(6, Math.round(size * 0.12)),
          borderRadius: 9999,
          background: 'radial-gradient(50% 60% at 50% 50%, rgba(0,0,0,0.35), rgba(0,0,0,0) 70%)',
          filter: 'blur(6px)',
          opacity: 0.55,
          transform: `translateY(${floatY * 0.25}px)`,
          pointerEvents: 'none',
        }}
      />
    </div>
  );
};

export default OrbBot;
