import { useEffect, useRef, useState } from "react";

// GearScroll: a minimalist gear icon that rotates based on scroll position
// Drop-in: <GearScroll size={72} color="#FF8400" speed={0.15} />
// speed = degrees per pixel scrolled

type Props = {
  size?: number;
  color?: string;
  speed?: number; // deg per px scroll
  className?: string;
};

const GearScroll = ({ size = 72, color = "#FF8400", speed = 0.15, className }: Props) => {
  const [angle, setAngle] = useState(0);
  const rafRef = useRef<number | null>(null);
  const lastY = useRef<number>(window.scrollY);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      const dy = y - lastY.current;
      lastY.current = y;
      const next = (prev: number) => prev + dy * speed;
      // use rAF to avoid layout thrash
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => setAngle(next));
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [speed]);

  const s = size;
  const stroke = 2.2;

  return (
    <div className={className} style={{ width: s, height: s }} aria-hidden>
      <svg
        width={s}
        height={s}
        viewBox="0 0 100 100"
        style={{ transform: `rotate(${angle}deg)`, transition: 'transform 40ms linear' }}
      >
        <defs>
          <linearGradient id="gearGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={color} stopOpacity="0.9" />
            <stop offset="100%" stopColor={color} stopOpacity="0.6" />
          </linearGradient>
        </defs>
        <g fill="url(#gearGrad)" stroke="rgba(255,255,255,0.15)" strokeWidth={stroke}>
          {/* Gear ring with 8 teeth */}
          <circle cx="50" cy="50" r="20" fill="#0b0b0b" stroke="rgba(255,255,255,0.08)" />
          <g>
            {Array.from({ length: 8 }).map((_, i) => {
              const a = (i * Math.PI * 2) / 8;
              const x = 50 + Math.cos(a) * 32;
              const y = 50 + Math.sin(a) * 32;
              const w = 10;
              const h = 14;
              const rx = 3;
              return (
                <rect
                  key={i}
                  x={x - w / 2}
                  y={y - h / 2}
                  width={w}
                  height={h}
                  rx={rx}
                  ry={rx}
                  transform={`rotate(${(a * 180) / Math.PI}, ${x}, ${y})`}
                  opacity={0.95}
                />
              );
            })}
          </g>
          {/* Body */}
          <circle cx="50" cy="50" r="26" fill="url(#gearGrad)" />
          {/* Center cap */}
          <circle cx="50" cy="50" r="6.5" fill="#fff" opacity="0.9" />
        </g>
      </svg>
    </div>
  );
};

export default GearScroll;
