import { useEffect, useRef } from "react";

/**
 * Ambient "tide pool" particle field.
 * Lightweight canvas: drifting motes that lean toward the pointer,
 * as if the environment notices the visitor.
 */
export function LivingCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced =
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let width = 0;
    let height = 0;
    let raf = 0;

    type Mote = {
      x: number;
      y: number;
      vx: number;
      vy: number;
      r: number;
      hue: number;
      phase: number;
    };

    let motes: Mote[] = [];
    const pointer = { x: -9999, y: -9999, active: false };

    const seed = () => {
      const isSmall = width < 720;
      const count = reduced ? 26 : isSmall ? 34 : 64;
      motes = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.12,
        vy: -0.05 - Math.random() * 0.12,
        r: 0.7 + Math.random() * 2.1,
        hue: Math.random() > 0.78 ? 38 : 176,
        phase: Math.random() * Math.PI * 2,
      }));
    };

    const resize = () => {
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      seed();
    };

    const draw = (t: number) => {
      ctx.clearRect(0, 0, width, height);

      for (const m of motes) {
        if (!reduced) {
          m.phase += 0.006;
          m.x += m.vx + Math.sin(m.phase) * 0.14;
          m.y += m.vy;

          if (pointer.active) {
            const dx = pointer.x - m.x;
            const dy = pointer.y - m.y;
            const dist = Math.hypot(dx, dy);
            if (dist < 220 && dist > 0.5) {
              const pull = (1 - dist / 220) * 0.16;
              m.x += (dx / dist) * pull * 4;
              m.y += (dy / dist) * pull * 4;
            }
          }

          if (m.y < -20) {
            m.y = height + 20;
            m.x = Math.random() * width;
          }
          if (m.x < -20) m.x = width + 20;
          if (m.x > width + 20) m.x = -20;
        }

        const twinkle = reduced ? 0.4 : 0.34 + Math.sin(t * 0.0007 + m.phase * 3) * 0.22;
        const glow = ctx.createRadialGradient(m.x, m.y, 0, m.x, m.y, m.r * 7);
        glow.addColorStop(0, `hsla(${m.hue}, 78%, 72%, ${Math.max(0, twinkle) * 0.5})`);
        glow.addColorStop(1, `hsla(${m.hue}, 78%, 62%, 0)`);
        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(m.x, m.y, m.r * 7, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = `hsla(${m.hue}, 84%, 84%, ${Math.max(0, twinkle)})`;
        ctx.beginPath();
        ctx.arc(m.x, m.y, m.r * 0.55, 0, Math.PI * 2);
        ctx.fill();
      }

      if (!reduced) raf = requestAnimationFrame(draw);
    };

    const onPointerMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointer.x = e.clientX - rect.left;
      pointer.y = e.clientY - rect.top;
      pointer.active = true;
    };
    const onPointerLeave = () => {
      pointer.active = false;
    };

    resize();
    raf = requestAnimationFrame(draw);

    window.addEventListener("resize", resize);
    if (!reduced) {
      window.addEventListener("pointermove", onPointerMove, { passive: true });
      window.addEventListener("pointerleave", onPointerLeave);
    }

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerleave", onPointerLeave);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-0" aria-hidden="true">
      {/* Deep water gradients */}
      <div className="absolute inset-0 lp-depth" />
      <div className="absolute inset-0 lp-drift" />
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
      <div className="absolute inset-0 lp-fog" />
    </div>
  );
}
