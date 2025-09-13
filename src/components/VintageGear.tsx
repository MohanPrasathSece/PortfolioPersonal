import { useEffect, useRef, useState } from "react";

// VintageGear: realistic metallic gear on a rope, fixed on the left across all screens
// - Rotates and slides down along a vertical rope as the user scrolls
// - Non-interactive (pointer-events: none), lightweight rAF scroll handling
// Usage: <VintageGear />

const clamp = (v: number, min: number, max: number) => Math.max(min, Math.min(max, v));

const VintageGear = ({
  size = 88,
  colorDark = "#6b6f77",
  colorLight = "#d9dde3",
  ropeColor = "#bfa37a",
  speedDegPerPx = 0.18,
  travelPx = 420, // max vertical slide along rope
}: {
  size?: number;
  colorDark?: string;
  colorLight?: string;
  ropeColor?: string;
  speedDegPerPx?: number;
  travelPx?: number;
}) => {
  const [angle, setAngle] = useState(0);
  const [offset, setOffset] = useState(0); // 0..travelPx
  const rafRef = useRef<number | null>(null);
  const lastY = useRef<number>(typeof window !== "undefined" ? window.scrollY : 0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      const dy = y - lastY.current;
      lastY.current = y;
      const nextAngle = (prev: number) => prev + dy * speedDegPerPx;
      const nextOffset = (prev: number) => clamp(prev + dy * 0.6, 0, travelPx);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        setAngle(nextAngle);
        setOffset(nextOffset);
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [speedDegPerPx, travelPx]);

  const s = size;
  const gearStroke = 1.6;
  const ropeWidth = 6;

  return (
    <div
      className="pointer-events-none fixed inset-y-0 left-2 md:left-4 z-[60]"
      style={{ display: 'flex', alignItems: 'center' }}
      aria-hidden
    >
      {/* Rope */}
      <div
        style={{
          width: ropeWidth,
          height: '100vh',
          background: `repeating-linear-gradient(180deg, ${ropeColor}, ${ropeColor} 10px, #a98b61 10px, #a98b61 20px)`,
          boxShadow: 'inset 0 0 2px rgba(0,0,0,0.3)',
          borderRadius: 4,
          marginRight: 10,
        }}
      />

      {/* Gear on rope */}
      <div style={{ position: 'relative', height: '100vh' }}>
        <div
          style={{
            position: 'absolute',
            left: 0,
            transform: `translateY(${offset}px)`,
            transition: 'transform 50ms linear',
          }}
        >
          <svg width={s} height={s} viewBox="0 0 100 100" style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.4))' }}>
            <defs>
              <radialGradient id="metalGrad" cx="35%" cy="30%" r="75%">
                <stop offset="0%" stopColor={colorLight} />
                <stop offset="55%" stopColor="#b6bac1" />
                <stop offset="100%" stopColor={colorDark} />
              </radialGradient>
              <linearGradient id="rimGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#f1f2f4" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#8a8f98" stopOpacity="0.9" />
              </linearGradient>
            </defs>

            {/* Hook that attaches gear to rope */}
            <rect x="45" y="-4" width="10" height="18" rx="3" fill="#a98b61" stroke="#8b6c3f" strokeWidth="1" />
            <circle cx="50" cy="8" r="2.8" fill="#7a5b34" />

            {/* Gear group rotated by angle */}
            <g transform={`translate(50,50) rotate(${angle})`}>
              {/* Teeth */}
              {Array.from({ length: 12 }).map((_, i) => {
                const a = (i * Math.PI * 2) / 12;
                const x = Math.cos(a) * 38;
                const y = Math.sin(a) * 38;
                return (
                  <rect
                    key={i}
                    x={x - 6}
                    y={y - 10}
                    width={12}
                    height={20}
                    rx={3}
                    ry={3}
                    transform={`rotate(${(a * 180) / Math.PI} ${x} ${y})`}
                    fill="url(#rimGrad)"
                    stroke="#777c84"
                    strokeWidth={gearStroke}
                  />
                );
              })}

              {/* Body */}
              <circle cx="0" cy="0" r="32" fill="url(#metalGrad)" stroke="#767b84" strokeWidth={gearStroke} />
              {/* Inner cutouts */}
              <circle cx="0" cy="0" r="20" fill="#303440" opacity="0.9" />
              <circle cx="0" cy="0" r="8" fill="#e9edf2" stroke="#9aa1ab" strokeWidth="1" />
            </g>
          </svg>
        </div>
      </div>
    </div>
  );
};

export default VintageGear;
