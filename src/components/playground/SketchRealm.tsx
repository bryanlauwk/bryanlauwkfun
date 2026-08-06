import { useEffect, useRef } from "react";

/**
 * SketchRealm — a living painted ecosystem for the current drawing-game season.
 *
 * Three genuinely different inhabitants (an ink organism with tendrils, a
 * folded paper spirit, a chunky brush-painted creature) share a layered paper
 * world with background wash, midground paint clouds and foreground grain.
 * Tapping anywhere plants a temporary paint bloom and releases colour motes —
 * the canvas never swallows the card's own navigation.
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

    type Cloud = { x: number; y: number; r: number; hue: string; sp: number; ph: number; wob: number };
    type Paper = { x: number; y: number; s: number; rot: number; sp: number; hue: string };
    type Bloom = { x: number; y: number; r: number; life: number; hue: string };
    type Mote = { x: number; y: number; vx: number; vy: number; life: number; hue: string; r: number };

    let clouds: Cloud[] = [];
    let papers: Paper[] = [];
    const blooms: Bloom[] = [];
    const motes: Mote[] = [];
    const trail: { x: number; y: number; a: number }[] = [];
    const ptr = { x: 0.5, y: 0.5, tx: 0.5, ty: 0.5 };

    /** Per-creature reaction charge: 0..1, decays back to rest. */
    const react = [0, 0, 0];

    const rnd = (a: number, b: number) => a + Math.random() * (b - a);

    const seed = () => {
      clouds = Array.from({ length: 8 }, (_, i) => ({
        x: rnd(0.06, 0.94),
        y: rnd(0.12, 0.86),
        r: rnd(0.1, 0.28),
        hue: INK[i % INK.length],
        sp: rnd(0.12, 0.44),
        ph: Math.random() * 6.28,
        wob: rnd(0.2, 0.7),
      }));
      papers = Array.from({ length: 7 }, (_, i) => ({
        x: rnd(0.06, 0.94),
        y: rnd(0.1, 0.88),
        s: rnd(9, 24),
        rot: Math.random() * 6.28,
        sp: rnd(0.1, 0.4),
        hue: i % 2 ? "rgba(236,242,255,0.85)" : "rgba(198,216,255,0.6)",
      }));
    };

    const resize = () => {
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    /* ---------- background layers ---------- */

    const paintGround = () => {
      const bg = ctx.createLinearGradient(0, 0, w * 0.6, h);
      bg.addColorStop(0, "#080b1c");
      bg.addColorStop(0.55, "#04060f");
      bg.addColorStop(1, "#010206");
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, w, h);

      // soft horizon wash so the world has a floor
      const floor = ctx.createLinearGradient(0, h * 0.55, 0, h);
      floor.addColorStop(0, "rgba(90,120,220,0)");
      floor.addColorStop(1, "rgba(80,110,210,0.14)");
      ctx.fillStyle = floor;
      ctx.fillRect(0, h * 0.55, w, h * 0.45);
    };

    const paintCloud = (b: Cloud) => {
      const cx = (b.x + Math.sin(t * b.sp + b.ph) * 0.02 * b.wob) * w;
      const cy = (b.y + Math.cos(t * b.sp * 0.8 + b.ph) * 0.02 * b.wob) * h;
      const r = b.r * Math.min(w, h) * (1 + Math.sin(t * 0.7 + b.ph) * 0.07);
      const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, r);
      g.addColorStop(0, `${b.hue}66`);
      g.addColorStop(0.45, `${b.hue}26`);
      g.addColorStop(1, "rgba(2,4,9,0)");
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, 6.2832);
      ctx.fill();
    };

    const paintPaper = (p: Paper) => {
      const x = p.x * w + Math.sin(t * p.sp + p.rot) * w * 0.02;
      const y = p.y * h + Math.cos(t * p.sp * 1.3 + p.rot) * h * 0.03;
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(p.rot + t * p.sp * 0.25);
      ctx.fillStyle = p.hue;
      ctx.globalAlpha = 0.42;
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

    /* ---------- shared creature helpers ---------- */

    const glow = (x: number, y: number, r: number, hue: string, a = "44") => {
      const g = ctx.createRadialGradient(x, y, 0, x, y, r);
      g.addColorStop(0, `${hue}${a}`);
      g.addColorStop(1, "rgba(2,4,9,0)");
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(x, y, r, 0, 6.2832);
      ctx.fill();
    };

    const contact = (x: number, y: number, rx: number, hue: string) => {
      const g = ctx.createRadialGradient(x, y, 0, x, y, rx);
      g.addColorStop(0, `${hue}3a`);
      g.addColorStop(1, "rgba(2,4,9,0)");
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.ellipse(x, y, rx, rx * 0.22, 0, 0, 6.2832);
      ctx.fill();
    };

    /** translucent brush layer on top of a filled body */
    const brushLayer = (x: number, y: number, s: number, hue: string) => {
      ctx.save();
      ctx.globalAlpha = 0.16;
      ctx.fillStyle = hue;
      ctx.beginPath();
      ctx.ellipse(x - s * 0.25, y - s * 0.3, s * 0.7, s * 0.4, -0.5, 0, 6.2832);
      ctx.fill();
      ctx.restore();
    };

    const eyes = (
      x: number,
      y: number,
      s: number,
      spread: number,
      blinkPhase: number,
      look: number
    ) => {
      const blink = Math.sin(t * 0.9 + blinkPhase);
      const lid = blink > 0.965 ? 0.12 : 1;
      const dx = (ptr.x - x / w) * look;
      const dy = (ptr.y - y / h) * look;
      [-spread, spread].forEach((o) => {
        ctx.fillStyle = "rgba(250,252,255,0.95)";
        ctx.beginPath();
        ctx.ellipse(x + s * o, y, s * 0.15, s * 0.15 * lid, 0, 0, 6.2832);
        ctx.fill();
        if (lid > 0.5) {
          ctx.fillStyle = "rgba(6,8,18,0.95)";
          ctx.beginPath();
          ctx.arc(x + s * o + dx * s * 0.4, y + dy * s * 0.4, s * 0.068, 0, 6.2832);
          ctx.fill();
        }
      });
    };

    /* ---------- creature 1: ink organism with tendrils ---------- */

    const paintInkOrganism = () => {
      const hue = "#8b6cff";
      const r = react[0];
      const x = w * 0.24 + Math.sin(t * 0.3) * w * 0.018;
      const y = h * 0.5 + Math.sin(t * 0.9) * h * 0.02 - r * h * 0.03;
      const s = Math.min(w, h) * 0.15 * (1 + r * 0.08);

      glow(x, y, s * 2.4, hue, r > 0.02 ? "5c" : "3c");

      // tendrils first so they read behind the body
      for (let i = 0; i < 6; i++) {
        const off = (i - 2.5) * s * 0.24;
        const len = s * (1.05 + (i % 3) * 0.28);
        ctx.beginPath();
        ctx.moveTo(x + off, y + s * 0.55);
        for (let k = 1; k <= 8; k++) {
          const p = k / 8;
          const sway = Math.sin(t * (1.2 + i * 0.13) + p * 3 + i) * s * 0.16 * p * (1 + r);
          ctx.lineTo(x + off + sway, y + s * 0.55 + len * p);
        }
        ctx.strokeStyle = `rgba(139,108,255,${0.5 - i * 0.04})`;
        ctx.lineWidth = s * (0.12 - i * 0.011);
        ctx.lineCap = "round";
        ctx.stroke();
      }

      // filled wobbling bell
      ctx.beginPath();
      for (let i = 0; i <= 40; i++) {
        const a = (i / 40) * 6.2832;
        const wob = 1 + Math.sin(a * 3 + t * 1.4) * 0.07 + Math.sin(a * 6 - t) * 0.035;
        const rr = s * wob;
        const px = x + Math.cos(a) * rr;
        const py = y + Math.sin(a) * rr * (a > Math.PI ? 0.72 : 0.92);
        if (i === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.closePath();
      const body = ctx.createRadialGradient(x - s * 0.3, y - s * 0.4, s * 0.1, x, y, s * 1.3);
      body.addColorStop(0, "rgba(206,196,255,0.96)");
      body.addColorStop(0.4, "rgba(139,108,255,0.92)");
      body.addColorStop(1, "rgba(28,22,72,0.96)");
      ctx.fillStyle = body;
      ctx.fill();

      brushLayer(x, y, s, "#c8bcff");
      eyes(x, y - s * 0.12, s, 0.3, 0, 0.6);
      contact(x, y + s * 1.85, s * 1.5, hue);
    };

    /* ---------- creature 2: folded paper spirit ---------- */

    const paintPaperSpirit = () => {
      const hue = "#ffc46b";
      const r = react[1];
      const flap = Math.sin(t * 1.7) * (0.5 + r * 0.6);
      const x = w * 0.52 + Math.sin(t * 0.42 + 1.2) * w * 0.04;
      const y = h * 0.4 + Math.sin(t * 0.8 + 0.6) * h * 0.035 - r * h * 0.04;
      const s = Math.min(w, h) * 0.15;

      glow(x, y, s * 2.2, hue, "3a");

      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(Math.sin(t * 0.5) * 0.08);

      // far wing (fold)
      ctx.beginPath();
      ctx.moveTo(0, -s * 0.1);
      ctx.lineTo(-s * 1.15, -s * (0.55 + flap * 0.3));
      ctx.lineTo(-s * 0.55, s * 0.42);
      ctx.closePath();
      ctx.fillStyle = "rgba(120,74,38,0.92)";
      ctx.fill();

      // body wedge
      ctx.beginPath();
      ctx.moveTo(s * 0.72, -s * 0.06);
      ctx.lineTo(-s * 0.2, -s * 0.6);
      ctx.lineTo(-s * 0.62, s * 0.6);
      ctx.lineTo(s * 0.34, s * 0.32);
      ctx.closePath();
      const paperFill = ctx.createLinearGradient(-s, -s, s, s);
      paperFill.addColorStop(0, "rgba(255,228,180,0.97)");
      paperFill.addColorStop(0.55, "rgba(214,150,80,0.95)");
      paperFill.addColorStop(1, "rgba(60,34,18,0.96)");
      ctx.fillStyle = paperFill;
      ctx.fill();

      // near wing catches the light
      ctx.beginPath();
      ctx.moveTo(0, -s * 0.1);
      ctx.lineTo(s * 0.2, -s * (0.95 + flap * 0.4));
      ctx.lineTo(s * 0.92, s * 0.1);
      ctx.closePath();
      ctx.fillStyle = "rgba(255,238,206,0.9)";
      ctx.fill();

      // fold creases
      ctx.strokeStyle = "rgba(58,32,14,0.45)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(-s * 0.2, -s * 0.6);
      ctx.lineTo(-s * 0.62, s * 0.6);
      ctx.moveTo(s * 0.72, -s * 0.06);
      ctx.lineTo(-s * 0.62, s * 0.6);
      ctx.stroke();

      // a single bright eye
      ctx.fillStyle = "rgba(255,252,244,0.95)";
      ctx.beginPath();
      ctx.arc(s * 0.42, -s * 0.02, s * 0.1, 0, 6.2832);
      ctx.fill();
      ctx.fillStyle = "rgba(30,16,6,0.95)";
      ctx.beginPath();
      ctx.arc(s * 0.44 + (ptr.x - 0.5) * s * 0.1, -s * 0.02 + (ptr.y - 0.5) * s * 0.1, s * 0.045, 0, 6.2832);
      ctx.fill();
      ctx.restore();

      contact(x, y + s * 1.75, s * 1.3, hue);
    };

    /* ---------- creature 3: chunky brush-painted beast ---------- */

    const paintBrushBeast = () => {
      const hue = "#7effc8";
      const r = react[2];
      const x = w * 0.79 + Math.sin(t * 0.26 + 2.1) * w * 0.02;
      const y = h * 0.6 + Math.sin(t * 0.7 + 2) * h * 0.014 - r * h * 0.025;
      const s = Math.min(w, h) * 0.155;

      glow(x, y, s * 2.1, hue, "34");

      // wagging brush tail behind the body
      ctx.save();
      ctx.beginPath();
      const tailWave = Math.sin(t * (1.6 + r * 2)) * s * 0.5;
      ctx.moveTo(x + s * 0.5, y + s * 0.15);
      ctx.quadraticCurveTo(x + s * 1.3, y - s * 0.1 + tailWave, x + s * 1.75, y - s * 0.5 + tailWave);
      ctx.strokeStyle = "rgba(126,255,200,0.62)";
      ctx.lineWidth = s * 0.2;
      ctx.lineCap = "round";
      ctx.stroke();
      ctx.restore();

      // chunky painted body — squat, wide, deliberately not a circle
      ctx.beginPath();
      ctx.moveTo(x - s * 1.05, y + s * 0.62);
      ctx.quadraticCurveTo(x - s * 1.2, y - s * 0.5, x - s * 0.3, y - s * 0.72);
      ctx.quadraticCurveTo(x + s * 0.55, y - s * 0.92, x + s * 0.86, y - s * 0.2);
      ctx.quadraticCurveTo(x + s * 1.08, y + s * 0.5, x + s * 0.2, y + s * 0.72);
      ctx.closePath();
      const beast = ctx.createLinearGradient(x - s, y - s, x + s, y + s);
      beast.addColorStop(0, "rgba(196,255,232,0.96)");
      beast.addColorStop(0.42, "rgba(64,196,152,0.95)");
      beast.addColorStop(1, "rgba(12,42,38,0.97)");
      ctx.fillStyle = beast;
      ctx.fill();

      // dry-brush streaks
      ctx.save();
      ctx.globalAlpha = 0.2;
      ctx.strokeStyle = "#eafff6";
      ctx.lineWidth = s * 0.06;
      for (let i = 0; i < 4; i++) {
        ctx.beginPath();
        ctx.moveTo(x - s * (0.8 - i * 0.2), y - s * 0.3 + i * s * 0.22);
        ctx.lineTo(x + s * (0.3 + i * 0.14), y - s * 0.42 + i * s * 0.22);
        ctx.stroke();
      }
      ctx.restore();

      // two stubby legs
      ctx.strokeStyle = "rgba(30,80,68,0.95)";
      ctx.lineWidth = s * 0.16;
      ctx.lineCap = "round";
      [-0.5, 0.15].forEach((o, i) => {
        ctx.beginPath();
        ctx.moveTo(x + s * o, y + s * 0.6);
        ctx.lineTo(x + s * o + Math.sin(t * 2 + i) * s * 0.05, y + s * 0.95);
        ctx.stroke();
      });

      eyes(x - s * 0.25, y - s * 0.28, s, 0.28, 2.4, 0.5);
      contact(x, y + s * 1.1, s * 1.5, hue);
    };

    /* ---------- interaction effects ---------- */

    const paintBlooms = () => {
      for (let i = blooms.length - 1; i >= 0; i--) {
        const b = blooms[i];
        b.life -= 0.012;
        if (b.life <= 0) {
          blooms.splice(i, 1);
          continue;
        }
        const grow = 1 + (1 - b.life) * 2.6;
        const g = ctx.createRadialGradient(b.x, b.y, 0, b.x, b.y, b.r * grow);
        g.addColorStop(0, `${b.hue}${Math.round(b.life * 120).toString(16).padStart(2, "0")}`);
        g.addColorStop(0.6, `${b.hue}22`);
        g.addColorStop(1, "rgba(2,4,9,0)");
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(b.x, b.y, b.r * grow, 0, 6.2832);
        ctx.fill();
      }
    };

    const paintMotes = () => {
      for (let i = motes.length - 1; i >= 0; i--) {
        const m = motes[i];
        m.x += m.vx;
        m.y += m.vy;
        m.vy += 0.012;
        m.life -= 0.011;
        if (m.life <= 0) {
          motes.splice(i, 1);
          continue;
        }
        ctx.globalAlpha = Math.max(m.life, 0);
        ctx.fillStyle = m.hue;
        ctx.beginPath();
        ctx.arc(m.x, m.y, m.r, 0, 6.2832);
        ctx.fill();
        ctx.globalAlpha = 1;
      }
    };

    /* ---------- frame ---------- */

    const render = () => {
      if (!reduced) t += 0.01;
      ptr.x += (ptr.tx - ptr.x) * 0.08;
      ptr.y += (ptr.ty - ptr.y) * 0.08;
      for (let i = 0; i < react.length; i++) react[i] *= 0.965;

      ctx.clearRect(0, 0, w, h);
      paintGround();
      clouds.forEach(paintCloud);
      paintBlooms();
      papers.forEach(paintPaper);

      paintPaperSpirit();
      paintBrushBeast();
      paintInkOrganism();

      paintMotes();

      // gesture trail
      for (let i = 1; i < trail.length; i++) {
        const a = trail[i].a;
        if (a <= 0) continue;
        ctx.strokeStyle = `rgba(196,218,255,${a * 0.45})`;
        ctx.lineWidth = 1 + a * 4;
        ctx.lineCap = "round";
        ctx.beginPath();
        ctx.moveTo(trail[i - 1].x, trail[i - 1].y);
        ctx.lineTo(trail[i].x, trail[i].y);
        ctx.stroke();
        trail[i].a -= 0.012;
      }
      while (trail.length && trail[0].a <= 0) trail.shift();

      // fine paper grain in front of everything
      ctx.globalAlpha = 0.035;
      ctx.fillStyle = "#cfd9ff";
      for (let i = 0; i < 26; i++) {
        const gx = ((i * 97 + Math.sin(t * 0.2 + i) * 40) % w + w) % w;
        const gy = ((i * 233 + Math.cos(t * 0.15 + i) * 30) % h + h) % h;
        ctx.fillRect(gx, gy, 1.2, 1.2);
      }
      ctx.globalAlpha = 1;

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

    /** Tap/click: plant a paint bloom, release motes, nudge the nearest creature. */
    const onTap = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      const x = e.clientX - r.left;
      const y = e.clientY - r.top;
      if (x < 0 || y < 0 || x > r.width || y > r.height) return;
      const hue = INK[Math.floor(Math.random() * INK.length)];
      blooms.push({ x, y, r: Math.min(w, h) * 0.07, life: 1, hue });
      for (let i = 0; i < 12; i++) {
        const a = Math.random() * 6.2832;
        const sp = rnd(0.6, 2.6);
        motes.push({
          x,
          y,
          vx: Math.cos(a) * sp,
          vy: Math.sin(a) * sp - 0.8,
          life: rnd(0.6, 1),
          hue,
          r: rnd(1, 2.6),
        });
      }
      const anchors = [0.24, 0.52, 0.79];
      let nearest = 0;
      let best = Infinity;
      anchors.forEach((ax, i) => {
        const d = Math.abs(ax * w - x);
        if (d < best) {
          best = d;
          nearest = i;
        }
      });
      react[nearest] = 1;
      if (reduced) render();
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        cancelAnimationFrame(raf);
        if (visible && !reduced) raf = requestAnimationFrame(render);
      },
      { threshold: 0.05 }
    );
    io.observe(canvas);

    seed();
    resize();
    render();
    window.addEventListener("resize", resize);
    canvas.addEventListener("pointermove", onPointer, { passive: true });
    canvas.addEventListener("pointerdown", onTap, { passive: true });

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("pointermove", onPointer);
      canvas.removeEventListener("pointerdown", onTap);
    };
  }, []);

  return <canvas ref={ref} aria-hidden="true" className="absolute inset-0 h-full w-full" />;
}
