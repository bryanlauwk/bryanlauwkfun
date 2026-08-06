import { useEffect, useRef } from "react";

/**
 * SketchRealm — an original animated "living sketch realm" for the current
 * drawing-game season. Filled ink creatures, paint clouds, floating paper and
 * gesture trails that answer the pointer. Canvas only, no assets.
 */
export function SketchRealm() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
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
    let visible = true;

    const INK = ["#8b6cff", "#57d9ff", "#ff7fc6", "#ffc46b", "#7effc8"];

    type Blob = {
      x: number; y: number; r: number; hue: string; sp: number; ph: number; wob: number;
    };
    type Paper = { x: number; y: number; s: number; rot: number; sp: number; hue: string };
    type Creature = { x: number; y: number; s: number; hue: string; ph: number; dir: number };

    let clouds: Blob[] = [];
    let papers: Paper[] = [];
    let creatures: Creature[] = [];
    const trail: { x: number; y: number; a: number }[] = [];
    const ptr = { x: 0.5, y: 0.5, tx: 0.5, ty: 0.5, active: false };

    const rnd = (a: number, b: number) => a + Math.random() * (b - a);

    const seed = () => {
      clouds = Array.from({ length: 7 }, (_, i) => ({
        x: rnd(0.1, 0.9),
        y: rnd(0.15, 0.8),
        r: rnd(0.09, 0.24),
        hue: INK[i % INK.length],
        sp: rnd(0.15, 0.5),
        ph: Math.random() * 6.28,
        wob: rnd(0.2, 0.6),
      }));
      papers = Array.from({ length: 6 }, (_, i) => ({
        x: rnd(0.08, 0.92),
        y: rnd(0.12, 0.85),
        s: rnd(10, 26),
        rot: Math.random() * 6.28,
        sp: rnd(0.1, 0.4),
        hue: i % 2 ? "rgba(236,242,255,0.9)" : "rgba(205,220,255,0.65)",
      }));
      creatures = Array.from({ length: 3 }, (_, i) => ({
        x: 0.24 + i * 0.26,
        y: rnd(0.34, 0.62),
        s: rnd(0.85, 1.35),
        hue: INK[(i * 2) % INK.length],
        ph: Math.random() * 6.28,
        dir: i % 2 ? 1 : -1,
      }));
    };

    const resize = () => {
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const paintCloud = (b: Blob) => {
      const cx = (b.x + Math.sin(t * b.sp + b.ph) * 0.02 * b.wob) * w;
      const cy = (b.y + Math.cos(t * b.sp * 0.8 + b.ph) * 0.02 * b.wob) * h;
      const r = b.r * Math.min(w, h) * (1 + Math.sin(t * 0.7 + b.ph) * 0.06);
      const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, r);
      g.addColorStop(0, `${b.hue}77`);
      g.addColorStop(0.5, `${b.hue}2e`);
      g.addColorStop(1, "rgba(2,4,9,0)");
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, 6.2832);
      ctx.fill();
    };

    const paintCreature = (c: Creature) => {
      const bob = Math.sin(t * 1.1 + c.ph) * h * 0.014;
      const x = c.x * w + Math.sin(t * 0.35 + c.ph) * w * 0.03 * c.dir;
      const y = c.y * h + bob;
      const s = Math.min(w, h) * 0.135 * c.s;

      // soft glow
      const g = ctx.createRadialGradient(x, y, 0, x, y, s * 2.2);
      g.addColorStop(0, `${c.hue}44`);
      g.addColorStop(1, "rgba(2,4,9,0)");
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(x, y, s * 2.2, 0, 6.2832);
      ctx.fill();

      // filled ink body — a wobbling drop
      ctx.beginPath();
      for (let i = 0; i <= 32; i++) {
        const a = (i / 32) * 6.2832;
        const wob =
          1 +
          Math.sin(a * 3 + t * 1.6 + c.ph) * 0.09 +
          Math.sin(a * 5 - t * 1.1) * 0.05;
        const rx = s * wob;
        const px = x + Math.cos(a) * rx;
        const py = y + Math.sin(a) * rx * 0.86;
        if (i === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.closePath();
      const bg = ctx.createLinearGradient(x - s, y - s, x + s, y + s);
      bg.addColorStop(0, `${c.hue}f0`);
      bg.addColorStop(1, "rgba(18,20,44,0.95)");
      ctx.fillStyle = bg;
      ctx.fill();

      // eyes follow the pointer
      const dx = (ptr.x - x / w) * 0.6;
      const dy = (ptr.y - y / h) * 0.6;
      ctx.fillStyle = "rgba(250,252,255,0.95)";
      [-0.32, 0.32].forEach((o) => {
        ctx.beginPath();
        ctx.arc(x + s * o, y - s * 0.12, s * 0.15, 0, 6.2832);
        ctx.fill();
      });
      ctx.fillStyle = "rgba(6,8,18,0.95)";
      [-0.32, 0.32].forEach((o) => {
        ctx.beginPath();
        ctx.arc(x + s * o + dx * s * 0.4, y - s * 0.12 + dy * s * 0.4, s * 0.07, 0, 6.2832);
        ctx.fill();
      });

      // highlight
      ctx.fillStyle = "rgba(255,255,255,0.16)";
      ctx.beginPath();
      ctx.ellipse(x - s * 0.3, y - s * 0.45, s * 0.28, s * 0.14, -0.5, 0, 6.2832);
      ctx.fill();
    };

    const paintPaper = (p: Paper) => {
      const x = p.x * w + Math.sin(t * p.sp + p.rot) * w * 0.02;
      const y = p.y * h + Math.cos(t * p.sp * 1.3 + p.rot) * h * 0.03;
      const rot = p.rot + t * p.sp * 0.25;
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(rot);
      ctx.fillStyle = p.hue;
      ctx.globalAlpha = 0.5;
      ctx.beginPath();
      ctx.moveTo(-p.s * 0.5, -p.s * 0.4);
      ctx.lineTo(p.s * 0.55, -p.s * 0.55);
      ctx.lineTo(p.s * 0.4, p.s * 0.5);
      ctx.lineTo(-p.s * 0.55, p.s * 0.35);
      ctx.closePath();
      ctx.fill();
      ctx.globalAlpha = 1;
      ctx.restore();
    };

    const render = () => {
      if (!reduced) t += 0.01;
      ptr.x += (ptr.tx - ptr.x) * 0.08;
      ptr.y += (ptr.ty - ptr.y) * 0.08;

      ctx.clearRect(0, 0, w, h);

      // deep paper ground
      const bg = ctx.createLinearGradient(0, 0, w, h);
      bg.addColorStop(0, "#070a18");
      bg.addColorStop(1, "#02040a");
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, w, h);

      clouds.forEach(paintCloud);
      papers.forEach(paintPaper);
      creatures.forEach(paintCreature);

      // gesture trail
      for (let i = 1; i < trail.length; i++) {
        const a = trail[i].a;
        if (a <= 0) continue;
        ctx.strokeStyle = `rgba(190,215,255,${a * 0.5})`;
        ctx.lineWidth = 1 + a * 4;
        ctx.lineCap = "round";
        ctx.beginPath();
        ctx.moveTo(trail[i - 1].x, trail[i - 1].y);
        ctx.lineTo(trail[i].x, trail[i].y);
        ctx.stroke();
        trail[i].a -= 0.012;
      }
      while (trail.length && trail[0].a <= 0) trail.shift();

      if (!reduced && visible) raf = requestAnimationFrame(render);
    };

    const onPointer = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      const x = e.clientX - r.left;
      const y = e.clientY - r.top;
      if (x < 0 || y < 0 || x > r.width || y > r.height) return;
      ptr.tx = x / r.width;
      ptr.ty = y / r.height;
      trail.push({ x, y, a: 1 });
      if (trail.length > 60) trail.shift();
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        if (visible && !reduced) {
          cancelAnimationFrame(raf);
          raf = requestAnimationFrame(render);
        }
      },
      { threshold: 0.05 }
    );
    io.observe(canvas);

    seed();
    resize();
    render();
    window.addEventListener("resize", resize);
    canvas.addEventListener("pointermove", onPointer, { passive: true });

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("pointermove", onPointer);
    };
  }, []);

  return <canvas ref={ref} aria-hidden="true" className="absolute inset-0 h-full w-full" />;
}
