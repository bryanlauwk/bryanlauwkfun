import { useEffect, useRef } from "react";

/**
 * HeroWorld — original luminous particle environment.
 * An abstract living tree/fountain of motes rising above a reflective
 * waterline, with a bright circular portal. Pure canvas, no 3D deps.
 */
export function HeroWorld() {
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
    let w = 0;
    let h = 0;
    let raf = 0;
    let t = 0;

    type Mote = {
      bx: number;
      by: number;
      r: number;
      speed: number;
      phase: number;
      color: [number, number, number];
      twinkle: number;
    };

    let motes: Mote[] = [];
    const pointer = { x: 0, y: 0, tx: 0, ty: 0 };

    const palette = (): [number, number, number] => {
      const roll = Math.random();
      if (roll > 0.94) return [214, 168, 71]; // sparse warm gold
      if (roll > 0.62) return [139, 108, 255]; // violet
      if (roll > 0.32) return [95, 157, 255]; // blue
      return [232, 238, 255]; // cold white
    };

    const seed = () => {
      const small = w < 760;
      const count = reduced ? 260 : small ? 420 : 1100;
      const cx = small ? 0.5 : 0.62;
      const cy = 0.42;

      motes = Array.from({ length: count }, () => {
        // Radial burst with a denser core: an abstract tree/fountain.
        const a = Math.random() * Math.PI * 2;
        const rad = Math.pow(Math.random(), 1.9);
        const spread = small ? 0.44 : 0.36;
        const bx = cx + Math.cos(a) * rad * spread * (small ? 1 : 1.25);
        const by = cy + Math.sin(a) * rad * spread * 0.82 - rad * 0.06;
        return {
          bx,
          by,
          r: 0.4 + Math.pow(Math.random(), 2.4) * 2.2,
          speed: 0.1 + Math.random() * 0.5,
          phase: Math.random() * Math.PI * 2,
          color: palette(),
          twinkle: 0.4 + Math.random() * 0.6,
        };
      });
    };

    const resize = () => {
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      seed();
    };

    const waterline = () => h * 0.72;

    const drawPortal = (cx: number, cy: number, r: number, alpha: number) => {
      const g = ctx.createRadialGradient(cx, cy, r * 0.2, cx, cy, r * 2.4);
      g.addColorStop(0, `rgba(190,215,255,${0.5 * alpha})`);
      g.addColorStop(0.35, `rgba(120,150,255,${0.16 * alpha})`);
      g.addColorStop(1, "rgba(10,14,30,0)");
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(cx, cy, r * 2.4, 0, Math.PI * 2);
      ctx.fill();

      ctx.strokeStyle = `rgba(215,230,255,${0.75 * alpha})`;
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.stroke();

      ctx.strokeStyle = `rgba(139,108,255,${0.35 * alpha})`;
      ctx.beginPath();
      ctx.arc(cx, cy, r * 1.28, 0, Math.PI * 2);
      ctx.stroke();
    };

    const render = () => {
      t += reduced ? 0 : 0.004;
      pointer.x += (pointer.tx - pointer.x) * 0.05;
      pointer.y += (pointer.ty - pointer.y) * 0.05;

      ctx.clearRect(0, 0, w, h);

      const wl = waterline();
      const small = w < 760;
      const px = w * (small ? 0.5 : 0.62);
      const py = wl - h * 0.06;
      const pr = Math.min(w, h) * (small ? 0.085 : 0.07);
      const breathe = 0.82 + Math.sin(t * 2.2) * 0.18;

      // --- reflection field (below the waterline) ---
      ctx.save();
      ctx.beginPath();
      ctx.rect(0, wl, w, h - wl);
      ctx.clip();
      ctx.globalAlpha = 0.34;
      ctx.translate(0, wl * 2);
      ctx.scale(1, -1);
      drawPortal(px, py, pr, breathe);
      motes.forEach((m, i) => {
        const drift = Math.sin(t * m.speed * 6 + m.phase) * 6;
        const x = m.bx * w + drift + pointer.x * 12;
        const y = m.by * h + Math.cos(t * m.speed * 5 + m.phase) * 5 + pointer.y * 8;
        if (y > wl) return;
        const a =
          (0.25 + Math.abs(Math.sin(t * 3 + m.phase)) * 0.55 * m.twinkle) *
          (i % 3 === 0 ? 1 : 0.7);
        ctx.fillStyle = `rgba(${m.color[0]},${m.color[1]},${m.color[2]},${a})`;
        ctx.beginPath();
        ctx.arc(x + Math.sin(t * 3 + y * 0.02) * 3, y, m.r * 0.9, 0, Math.PI * 2);
        ctx.fill();
      });
      ctx.restore();

      // --- waterline shimmer ---
      const shim = ctx.createLinearGradient(0, wl - 8, 0, h);
      shim.addColorStop(0, "rgba(150,180,255,0.16)");
      shim.addColorStop(0.12, "rgba(90,120,220,0.06)");
      shim.addColorStop(1, "rgba(2,4,9,0.9)");
      ctx.fillStyle = shim;
      ctx.fillRect(0, wl - 8, w, h - wl + 8);

      // --- portal + motes ---
      drawPortal(px, py, pr, breathe);

      motes.forEach((m) => {
        const drift = Math.sin(t * m.speed * 6 + m.phase) * 6;
        const x = m.bx * w + drift + pointer.x * 16;
        const y = m.by * h + Math.cos(t * m.speed * 5 + m.phase) * 5 + pointer.y * 10;
        if (y > wl) return;
        const a = 0.25 + Math.abs(Math.sin(t * 3 + m.phase)) * 0.7 * m.twinkle;
        ctx.fillStyle = `rgba(${m.color[0]},${m.color[1]},${m.color[2]},${a})`;
        ctx.beginPath();
        ctx.arc(x, y, m.r, 0, Math.PI * 2);
        ctx.fill();
        if (m.r > 1.8) {
          ctx.fillStyle = `rgba(${m.color[0]},${m.color[1]},${m.color[2]},${a * 0.14})`;
          ctx.beginPath();
          ctx.arc(x, y, m.r * 3.4, 0, Math.PI * 2);
          ctx.fill();
        }
      });

      // --- rocky silhouette at the right edge ---
      ctx.fillStyle = "rgba(1,2,6,0.96)";
      ctx.beginPath();
      ctx.moveTo(w, wl + 4);
      ctx.lineTo(w, wl - h * 0.22);
      ctx.quadraticCurveTo(w - w * 0.08, wl - h * 0.17, w - w * 0.11, wl + 4);
      ctx.closePath();
      ctx.fill();

      if (!reduced) raf = requestAnimationFrame(render);
    };

    const onPointer = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointer.tx = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      pointer.ty = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    };

    resize();
    render();
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onPointer, { passive: true });

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onPointer);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="absolute inset-0 h-full w-full"
    />
  );
}
