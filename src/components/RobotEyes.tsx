import { useEffect, useRef, useState } from "react";

// RobotEyes: Minimal robot head with two eyes whose pupils track the cursor.
// - Lightweight, no external deps
// - Handles resize and throttles with rAF
// - Designed to be placed inside a relatively positioned parent

const clamp = (v: number, min: number, max: number) => Math.max(min, Math.min(max, v));

const RobotEyes = ({ size = 140 }: { size?: number }) => {
  // Container ref to compute local coordinates
  const ref = useRef<HTMLDivElement | null>(null);
  const [cursor, setCursor] = useState({ x: 0, y: 0 });
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    let bounding = ref.current?.getBoundingClientRect();

    const onResize = () => {
      bounding = ref.current?.getBoundingClientRect();
    };

    let pending = false;
    const onMove = (e: MouseEvent) => {
      if (pending) return;
      pending = true;
      rafRef.current = requestAnimationFrame(() => {
        pending = false;
        if (!bounding) bounding = ref.current?.getBoundingClientRect();
        if (!bounding) return;
        setCursor({ x: e.clientX - bounding.left, y: e.clientY - bounding.top });
      });
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("resize", onResize);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const w = size;
  const h = size * 0.75;

  // Eye geometry
  const eyeRadius = Math.max(18, Math.round(size * 0.12));
  const pupilRadius = Math.max(7, Math.round(size * 0.06));
  const pupilTravel = Math.max(6, Math.round(size * 0.05)); // max px the pupil can move inside the eye

  // Eye centers (relative to container 0..w/h)
  const leftEye = { x: w * 0.35, y: h * 0.48 };
  const rightEye = { x: w * 0.65, y: h * 0.48 };

  // compute pupil offsets towards the cursor, limited to pupilTravel
  const pupilOffset = (cx: number, cy: number) => {
    const dx = cursor.x - cx;
    const dy = cursor.y - cy;
    const len = Math.hypot(dx, dy) || 1;
    const nx = dx / len;
    const ny = dy / len;
    return {
      x: clamp(nx * pupilTravel, -pupilTravel, pupilTravel),
      y: clamp(ny * pupilTravel, -pupilTravel, pupilTravel),
    };
  };

  const lo = pupilOffset(leftEye.x, leftEye.y);
  const ro = pupilOffset(rightEye.x, rightEye.y);

  return (
    <div
      ref={ref}
      className="select-none"
      style={{ width: w, height: h }}
      aria-hidden
    >
      {/* Head */}
      <div className="relative w-full h-full rounded-[24px] bg-neutral-900/70 border border-white/10 shadow-lg backdrop-blur-[2px]">
        {/* Antenna */}
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-1 h-3 bg-white/70 rounded-sm" />
        <div className="absolute -top-5 left-1/2 -translate-x-1/2 w-[10px] h-[10px] bg-white rounded-full shadow-[0_0_12px_4px_rgba(255,255,255,0.5)]" />

        {/* Eyes sockets */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center gap-6">
          {/* Left eye */}
          <div
            className="relative rounded-full bg-white/90 border border-black/10 shadow-inner"
            style={{ width: eyeRadius * 2, height: eyeRadius * 2 }}
          >
            <div
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-black"
              style={{ width: pupilRadius * 2, height: pupilRadius * 2, transform: `translate(${lo.x}px, ${lo.y}px)` }}
            >
              <div className="absolute w-[30%] h-[30%] rounded-full bg-white/70 left-[20%] top-[20%]" />
            </div>
          </div>

          {/* Right eye */}
          <div
            className="relative rounded-full bg-white/90 border border-black/10 shadow-inner"
            style={{ width: eyeRadius * 2, height: eyeRadius * 2 }}
          >
            <div
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-black"
              style={{ width: pupilRadius * 2, height: pupilRadius * 2, transform: `translate(${ro.x}px, ${ro.y}px)` }}
            >
              <div className="absolute w-[30%] h-[30%] rounded-full bg-white/70 left-[20%] top-[20%]" />
            </div>
          </div>
        </div>

        {/* Mouth */}
        <div className="absolute left-1/2 bottom-[18%] -translate-x-1/2 w-[40%] h-[6px] rounded-full bg-white/20" />
      </div>
    </div>
  );
};

export default RobotEyes;
