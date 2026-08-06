import { useEffect, useRef } from "react";

/**
 * HeroWorld — luminous particle environment.
 * A vertical living form (tree / fountain / constellation) rising out of a
 * reflective waterline, with a bright portal at its base. Pure canvas.
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
      core: boolean;
    };

    type Filament = { pts: [number, number][]; hue: string; alpha: number };

    let motes: Mote[] = [];
    let filaments: Filament[] = [];
    let nodes: { x: number; y: number; r: number; c: string }[] = [];
    const pointer = { x: 0, y: 0, tx: 0, ty: 0, px: -1, py: -1, active: false };
    let ripples: { x: number; y: number; born: number }[] = [];

    const palette = (): [number, number, number] => {
      const roll = Math.random();
      if (roll > 0.94) return [226, 182, 92]; // sparse warm gold
      if (roll > 0.6) return [148, 118, 255]; // violet
      if (roll > 0.3) return [110, 170, 255]; // blue
      return [238, 244, 255]; // cold white
    };

    const centre = () => (w < 760 ? 0.5 : 0.63);

    const seed = () => {
      const small = w < 760;
      const cx = centre();
      const base = 0.7; // waterline in normalised units
      const count = reduced ? 420 : small ? 700 : 1750;

      motes = Array.from({ length: count }, (_, i) => {
        // Structured vertical form: dense along a central rising column,
        // sparse in the outer halo.
        const core = i % 10 !== 0; // 90% belong to the structured form
        if (core) {
          // height along the column, biased to the lower/middle body
          const u = Math.pow(Math.random(), 0.85);
          const y = base - u * (small ? 0.5 : 0.56);
          // width flares out with height (fountain / tree canopy)
          const flare = Math.pow(u, 1.35) * (small ? 0.3 : 0.26);
          const g = (Math.random() + Math.random() + Math.random()) / 3 - 0.5;
          const x = cx + g * 2 * flare;
          return {
            bx: x,
            by: y,
            r: 0.35 + Math.pow(Math.random(), 2.6) * 2.3,
            speed: 0.1 + Math.random() * 0.5,
            phase: Math.random() * Math.PI * 2,
            color: palette(),
            twinkle: 0.45 + Math.random() * 0.55,
            core: true,
          };
        }
        const a = Math.random() * Math.PI * 2;
        const rad = 0.35 + Math.random() * 0.65;
        return {
          bx: cx + Math.cos(a) * rad * (small ? 0.5 : 0.42),
          by: base - 0.28 + Math.sin(a) * rad * 0.34,
          r: 0.3 + Math.pow(Math.random(), 3) * 1.5,
          speed: 0.08 + Math.random() * 0.35,
          phase: Math.random() * Math.PI * 2,
          color: palette(),
          twinkle: 0.3 + Math.random() * 0.5,
          core: false,
        };
      });

      // branching arcs / filaments radiating from the base of the column
      const branchCount = small ? 5 : 9;
      filaments = Array.from({ length: branchCount }, (_, i) => {
        const dir = i % 2 === 0 ? 1 : -1;
        const spread = (0.05 + (i / branchCount) * 0.22) * dir;
        const top = base - (0.22 + Math.random() * 0.32);
        const pts: [number, number][] = [];
        for (let s = 0; s <= 10; s++) {
          const u = s / 10;
          pts.push([
            cx + spread * Math.pow(u, 1.6) + Math.sin(u * 3 + i) * 0.012,
            base - u * (base - top),
          ]);
        }
        return {
          pts,
          hue: i % 3 === 0 ? "148,118,255" : i % 3 === 1 ? "110,170,255" : "225,235,255",
          alpha: 0.1 + Math.random() * 0.14,
        };
      });

      // 2–3 concentrated luminous nodes, brightest just above the water
      nodes = [
        { x: cx, y: base - 0.06, r: 1, c: "245,250,255" },
        { x: cx - 0.055, y: base - 0.3, r: 0.62, c: "150,120,255" },
        { x: cx + 0.07, y: base - 0.44, r: 0.48, c: "120,175,255" },
      ];
    };

    const resize = () => {
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      seed();
    };

    const waterline = () => h * 0.7;

    const drawPortal = (cx: number, cy: number, r: number, alpha: number) => {
      const g = ctx.createRadialGradient(cx, cy, r * 0.1, cx, cy, r * 3);
      g.addColorStop(0, `rgba(228,240,255,${0.78 * alpha})`);
      g.addColorStop(0.22, `rgba(150,190,255,${0.34 * alpha})`);
      g.addColorStop(0.55, `rgba(110,130,255,${0.12 * alpha})`);
      g.addColorStop(1, "rgba(10,14,30,0)");
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(cx, cy, r * 3, 0, Math.PI * 2);
      ctx.fill();

      ctx.strokeStyle = `rgba(240,248,255,${0.95 * alpha})`;
      ctx.lineWidth = 1.6;
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.stroke();

      ctx.strokeStyle = `rgba(160,130,255,${0.45 * alpha})`;
      ctx.lineWidth = 0.9;
      ctx.beginPath();
      ctx.arc(cx, cy, r * 1.3, 0, Math.PI * 2);
      ctx.stroke();
    };

    const drawNodes = (alpha: number) => {
      nodes.forEach((n, i) => {
        const x = n.x * w + pointer.x * 10;
        const y = n.y * h;
        const pulse = 0.8 + Math.sin(t * 2 + i * 1.7) * 0.2;
        const rad = Math.min(w, h) * 0.085 * n.r * pulse;
        const g = ctx.createRadialGradient(x, y, 0, x, y, rad);
        g.addColorStop(0, `rgba(${n.c},${0.72 * alpha})`);
        g.addColorStop(0.3, `rgba(${n.c},${0.2 * alpha})`);
        g.addColorStop(1, "rgba(6,10,24,0)");
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(x, y, rad, 0, Math.PI * 2);
        ctx.fill();
      });
    };

    const drawFilaments = (alpha: number) => {
      ctx.lineWidth = 0.7;
      filaments.forEach((f, i) => {
        ctx.beginPath();
        f.pts.forEach(([bx, by], s) => {
          const sway = Math.sin(t * 1.4 + i + s * 0.35) * (s * 0.6);
          const x = bx * w + sway + pointer.x * 10;
          const y = by * h;
          if (s === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        });
        ctx.strokeStyle = `rgba(${f.hue},${f.alpha * alpha})`;
        ctx.stroke();
      });
    };

    const drawMotes = (wl: number, alpha: number, scale: number) => {
      motes.forEach((m) => {
        const drift = Math.sin(t * m.speed * 6 + m.phase) * 5;
        let x = m.bx * w + drift + pointer.x * (m.core ? 14 : 22);
        let y = m.by * h + Math.cos(t * m.speed * 5 + m.phase) * 4 + pointer.y * 8;

        // local attraction / repulsion around the pointer
        if (pointer.active && pointer.px >= 0) {
          const dx = x - pointer.px;
          const dy = y - pointer.py;
          const d2 = dx * dx + dy * dy;
          const R = 150;
          if (d2 < R * R && d2 > 1) {
            const d = Math.sqrt(d2);
            // outer motes are drawn in, core motes are gently pushed aside
            const force = (1 - d / R) * (m.core ? -18 : 26);
            x -= (dx / d) * force;
            y -= (dy / d) * force;
          }
        }
        if (y > wl) return;
        const a =
          (0.24 + Math.abs(Math.sin(t * 3 + m.phase)) * 0.76 * m.twinkle) *
          (m.core ? 1 : 0.55) *
          alpha;
        ctx.fillStyle = `rgba(${m.color[0]},${m.color[1]},${m.color[2]},${a})`;
        ctx.beginPath();
        ctx.arc(x, y, m.r * scale, 0, Math.PI * 2);
        ctx.fill();
        if (m.r > 1.6) {
          ctx.fillStyle = `rgba(${m.color[0]},${m.color[1]},${m.color[2]},${a * 0.16})`;
          ctx.beginPath();
          ctx.arc(x, y, m.r * 3.6 * scale, 0, Math.PI * 2);
          ctx.fill();
        }
      });
    };

    const render = () => {
      t += reduced ? 0 : 0.004;
      pointer.x += (pointer.tx - pointer.x) * 0.05;
      pointer.y += (pointer.ty - pointer.y) * 0.05;

      ctx.clearRect(0, 0, w, h);

      const wl = waterline();
      const small = w < 760;
      const px = w * centre();
      const py = wl - h * 0.06;
      const pr = Math.min(w, h) * (small ? 0.075 : 0.062);
      const breathe = 0.85 + Math.sin(t * 2.2) * 0.15;

      // --- mist band at the horizon ---
      const mist = ctx.createLinearGradient(0, wl - h * 0.12, 0, wl + 4);
      mist.addColorStop(0, "rgba(120,150,220,0)");
      mist.addColorStop(0.65, "rgba(130,160,225,0.07)");
      mist.addColorStop(1, "rgba(150,180,255,0.13)");
      ctx.fillStyle = mist;
      ctx.fillRect(0, wl - h * 0.12, w, h * 0.12 + 4);

      // --- reflection field (below the waterline) ---
      ctx.save();
      ctx.beginPath();
      ctx.rect(0, wl, w, h - wl);
      ctx.clip();
      ctx.translate(0, wl * 2);
      ctx.scale(1, -1);
      drawPortal(px, py, pr, breathe * 0.55);
      drawNodes(0.4);
      drawFilaments(0.4);
      drawMotes(wl, 0.4, 0.9);
      ctx.restore();

      // --- elongated vertical reflections under the portal ---
      ctx.save();
      ctx.beginPath();
      ctx.rect(0, wl, w, h - wl);
      ctx.clip();
      const col = ctx.createLinearGradient(0, wl, 0, h);
      col.addColorStop(0, "rgba(215,232,255,0.34)");
      col.addColorStop(0.45, "rgba(150,180,255,0.1)");
      col.addColorStop(1, "rgba(2,4,9,0)");
      ctx.fillStyle = col;
      const cw = pr * 1.6;
      ctx.beginPath();
      ctx.moveTo(px - cw * 0.5, wl);
      ctx.lineTo(px + cw * 0.5, wl);
      ctx.lineTo(px + cw * 1.5, h);
      ctx.lineTo(px - cw * 1.5, h);
      ctx.closePath();
      ctx.fill();

      // --- thin horizontal ripple lines ---
      for (let i = 0; i < 26; i++) {
        const u = i / 26;
        const y = wl + Math.pow(u, 1.7) * (h - wl);
        const phase = Math.sin(t * 1.6 + i * 0.7);
        const halfW = (0.06 + u * 0.5) * w * (0.6 + Math.abs(phase) * 0.5);
        const cxr = px + phase * (10 + u * 60);
        const a = (0.2 - u * 0.16) * (0.6 + Math.abs(phase) * 0.4);
        ctx.strokeStyle = `rgba(200,222,255,${Math.max(a, 0.02)})`;
        ctx.lineWidth = 0.7;
        ctx.beginPath();
        ctx.moveTo(cxr - halfW, y);
        ctx.lineTo(cxr + halfW, y);
        ctx.stroke();
      }
      ctx.restore();

      // --- waterline glow ---
      const shim = ctx.createLinearGradient(0, wl - 6, 0, h);
      shim.addColorStop(0, "rgba(170,200,255,0.2)");
      shim.addColorStop(0.1, "rgba(90,120,220,0.06)");
      shim.addColorStop(1, "rgba(2,4,9,0.82)");
      ctx.fillStyle = shim;
      ctx.fillRect(0, wl - 6, w, h - wl + 6);

      // --- the living form ---
      drawFilaments(1);
      drawNodes(1);
      drawPortal(px, py, pr, breathe);
      drawMotes(wl, 1, 1);

      // --- pointer ripples on the water ---
      ripples = ripples.filter((r) => t - r.born < 2.2);
      ctx.save();
      ctx.beginPath();
      ctx.rect(0, wl, w, h - wl);
      ctx.clip();
      ripples.forEach((r) => {
        const age = (t - r.born) / 2.2;
        const rad = 6 + age * Math.min(w, h) * 0.22;
        ctx.strokeStyle = `rgba(205,226,255,${(1 - age) * 0.28})`;
        ctx.lineWidth = 0.8;
        ctx.beginPath();
        ctx.ellipse(r.x, r.y, rad, rad * 0.28, 0, 0, Math.PI * 2);
        ctx.stroke();
      });
      ctx.restore();

      // --- drifting mist wisps above the water ---
      for (let i = 0; i < 5; i++) {
        const u = i / 5;
        const my = wl - h * (0.02 + u * 0.13);
        const mx = ((t * (8 + i * 5) + i * 400) % (w + 500)) - 250;
        const mw = w * (0.2 + u * 0.22);
        const mg = ctx.createLinearGradient(mx - mw, 0, mx + mw, 0);
        mg.addColorStop(0, "rgba(150,180,240,0)");
        mg.addColorStop(0.5, `rgba(160,190,245,${0.05 - u * 0.008})`);
        mg.addColorStop(1, "rgba(150,180,240,0)");
        ctx.fillStyle = mg;
        ctx.beginPath();
        ctx.ellipse(mx, my, mw, h * (0.012 + u * 0.012), 0, 0, Math.PI * 2);
        ctx.fill();
      }

      // --- warm gold lantern light near the shore ---
      const gx = w * (small ? 0.16 : 0.2);
      const gy = wl - h * 0.03;
      const gr = Math.min(w, h) * 0.16;
      const gg = ctx.createRadialGradient(gx, gy, 0, gx, gy, gr);
      gg.addColorStop(0, `rgba(240,196,110,${0.2 * breathe})`);
      gg.addColorStop(0.35, "rgba(220,170,90,0.07)");
      gg.addColorStop(1, "rgba(10,8,4,0)");
      ctx.fillStyle = gg;
      ctx.beginPath();
      ctx.arc(gx, gy, gr, 0, Math.PI * 2);
      ctx.fill();

      // --- rocky silhouette at the right edge ---
      ctx.fillStyle = "rgba(1,2,6,0.96)";
      ctx.beginPath();
      ctx.moveTo(w, wl + 4);
      ctx.lineTo(w, wl - h * 0.22);
      ctx.quadraticCurveTo(w - w * 0.08, wl - h * 0.17, w - w * 0.11, wl + 4);
      ctx.closePath();
      ctx.fill();

      // --- foreground shoreline + reeds (depth layer, parallaxed by pointer) ---
      const fpx = pointer.x * 16;
      ctx.fillStyle = "rgba(0,1,4,0.98)";
      ctx.beginPath();
      ctx.moveTo(-40 + fpx, h);
      ctx.lineTo(-40 + fpx, h - h * 0.1);
      ctx.quadraticCurveTo(w * 0.16 + fpx, h - h * 0.155, w * 0.34 + fpx, h);
      ctx.closePath();
      ctx.fill();

      const reeds = small ? 6 : 11;
      for (let i = 0; i < reeds; i++) {
        const rx = (small ? 0.02 : 0.015) * w + i * (w * (small ? 0.05 : 0.032)) + fpx;
        const rh = h * (0.11 + ((i * 37) % 11) / 100);
        const bend = Math.sin(t * 0.9 + i) * (8 + (i % 3) * 4);
        ctx.strokeStyle = "rgba(0,1,4,0.97)";
        ctx.lineWidth = 2.4 + (i % 3);
        ctx.lineCap = "round";
        ctx.beginPath();
        ctx.moveTo(rx, h);
        ctx.quadraticCurveTo(rx + bend * 0.4, h - rh * 0.6, rx + bend, h - rh);
        ctx.stroke();
        if (i % 3 === 0) {
          ctx.fillStyle = `rgba(235,205,140,${0.35 + Math.sin(t * 2 + i) * 0.2})`;
          ctx.beginPath();
          ctx.arc(rx + bend, h - rh, 2.1, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      if (!reduced) raf = requestAnimationFrame(render);
    };

    const onPointer = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      const lx = e.clientX - rect.left;
      const ly = e.clientY - rect.top;
      pointer.tx = (lx / rect.width - 0.5) * 2;
      pointer.ty = (ly / rect.height - 0.5) * 2;
      pointer.px = lx;
      pointer.py = ly;
      pointer.active = lx >= 0 && ly >= 0 && lx <= rect.width && ly <= rect.height;
      if (pointer.active && ly > waterline() && ripples.length < 8) {
        const last = ripples[ripples.length - 1];
        if (!last || t - last.born > 0.35) ripples.push({ x: lx, y: ly, born: t });
      }
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
