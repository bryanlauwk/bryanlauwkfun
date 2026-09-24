import * as THREE from "three";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass.js";
import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass.js";
import { OutputPass } from "three/examples/jsm/postprocessing/OutputPass.js";
import { RiftAudio } from "./audio";
import { finalFxShader, particleFragment, particleVertex, tunnelFragment, tunnelVertex } from "./shaders";

// ---------------------------------------------------------------------------
// Tuning
// ---------------------------------------------------------------------------
const R = 6; // tunnel radius
const PLAYER_R = 0.42; // collision radius of the ship
const MOVE_R = R - 0.9; // how far from the axis the ship may fly
const SPAWN_Z = -270;
const TUNNEL_LEN = 320;
const ZONE_LEN = 1500;
const MAX_HULL = 3;
const STREAKS = 700;
const MAX_PARTICLES = 2400;
const TAU = Math.PI * 2;

export type GameState = "ready" | "playing" | "dying" | "over";

export interface HudData {
  score: number;
  distance: number;
  hull: number;
  combo: number;
  speed: number;
  zone: number;
  shards: number;
  paused: boolean;
}

export interface GameCallbacks {
  onHud: (hud: HudData) => void;
  onState: (state: GameState, hud: HudData) => void;
  onPopup: (text: string, tone: "good" | "bad" | "info") => void;
  onZone: (index: number, name: string) => void;
}

interface Palette {
  name: string;
  a: THREE.Color;
  b: THREE.Color;
  fog: THREE.Color;
  hazard: THREE.Color;
  shard: THREE.Color;
}

const pal = (name: string, a: string, b: string, fog: string, hazard: string, shard: string): Palette => ({
  name,
  a: new THREE.Color(a),
  b: new THREE.Color(b),
  fog: new THREE.Color(fog),
  hazard: new THREE.Color(hazard),
  shard: new THREE.Color(shard),
});

const PALETTES: Palette[] = [
  pal("THE BREACH", "#ff2a3d", "#ff7a1a", "#140205", "#ff3b3b", "#7df9ff"),
  pal("UPSIDE DOWN", "#ff1744", "#6a5cff", "#0b0312", "#ff4f7b", "#ffe066"),
  pal("ABYSSAL TRENCH", "#00e5ff", "#1de9b6", "#010f16", "#ff4fd8", "#fff27a"),
  pal("VIOLET VOID", "#b14cff", "#ff3df2", "#0c0217", "#55f7ff", "#b8ff5c"),
  pal("SOLAR CORE", "#ffb300", "#ff3d00", "#160800", "#ffffff", "#5cf2ff"),
];

export const zoneName = (i: number) => {
  const p = PALETTES[i % PALETTES.length];
  const loop = Math.floor(i / PALETTES.length);
  return loop > 0 ? `${p.name} ${"+".repeat(loop)}` : p.name;
};

const rand = (a: number, b: number) => a + Math.random() * (b - a);
const clamp = (v: number, a: number, b: number) => Math.min(b, Math.max(a, v));
const wrapAngle = (a: number) => ((a % TAU) + TAU) % TAU;
const damp = (current: number, target: number, lambda: number, dt: number) =>
  current + (target - current) * (1 - Math.exp(-lambda * dt));

// ---------------------------------------------------------------------------
// Particles (CPU simulated, GPU drawn as additive soft points)
// ---------------------------------------------------------------------------
class Particles {
  readonly points: THREE.Points;
  private pos: Float32Array; // tunnel space
  private vel: Float32Array;
  private life: Float32Array;
  private maxLife: Float32Array;
  private baseSize: Float32Array;
  private anchored: Uint8Array;
  private drawPos: Float32Array;
  private color: Float32Array;
  private size: Float32Array;
  private alpha: Float32Array;
  private cursor = 0;

  constructor() {
    const n = MAX_PARTICLES;
    this.pos = new Float32Array(n * 3);
    this.vel = new Float32Array(n * 3);
    this.life = new Float32Array(n);
    this.maxLife = new Float32Array(n).fill(1);
    this.baseSize = new Float32Array(n);
    this.anchored = new Uint8Array(n);
    this.drawPos = new Float32Array(n * 3);
    this.color = new Float32Array(n * 3);
    this.size = new Float32Array(n);
    this.alpha = new Float32Array(n);

    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(this.drawPos, 3).setUsage(THREE.DynamicDrawUsage));
    geo.setAttribute("aColor", new THREE.BufferAttribute(this.color, 3).setUsage(THREE.DynamicDrawUsage));
    geo.setAttribute("aSize", new THREE.BufferAttribute(this.size, 1).setUsage(THREE.DynamicDrawUsage));
    geo.setAttribute("aAlpha", new THREE.BufferAttribute(this.alpha, 1).setUsage(THREE.DynamicDrawUsage));
    geo.boundingSphere = new THREE.Sphere(new THREE.Vector3(0, 0, -100), 1000);

    const mat = new THREE.ShaderMaterial({
      vertexShader: particleVertex,
      fragmentShader: particleFragment,
      uniforms: { uPixelRatio: { value: 1 } },
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    this.points = new THREE.Points(geo, mat);
    this.points.frustumCulled = false;
  }

  setPixelRatio(pr: number) {
    (this.points.material as THREE.ShaderMaterial).uniforms.uPixelRatio.value = pr;
  }

  emit(
    x: number, y: number, z: number,
    vx: number, vy: number, vz: number,
    color: THREE.Color, size: number, life: number, anchored: boolean,
  ) {
    const i = this.cursor;
    this.cursor = (this.cursor + 1) % MAX_PARTICLES;
    this.pos[i * 3] = x;
    this.pos[i * 3 + 1] = y;
    this.pos[i * 3 + 2] = z;
    this.vel[i * 3] = vx;
    this.vel[i * 3 + 1] = vy;
    this.vel[i * 3 + 2] = vz;
    this.color[i * 3] = color.r;
    this.color[i * 3 + 1] = color.g;
    this.color[i * 3 + 2] = color.b;
    this.life[i] = life;
    this.maxLife[i] = life;
    this.baseSize[i] = size;
    this.anchored[i] = anchored ? 1 : 0;
  }

  burst(x: number, y: number, z: number, count: number, color: THREE.Color, speed: number, size: number, life: number) {
    for (let k = 0; k < count; k++) {
      const u = Math.random() * 2 - 1;
      const t = Math.random() * TAU;
      const s = Math.sqrt(1 - u * u);
      const v = speed * (0.3 + Math.random() * 0.7);
      this.emit(x, y, z, s * Math.cos(t) * v, s * Math.sin(t) * v, u * v, color, size * rand(0.5, 1.3), life * rand(0.5, 1.2), true);
    }
  }

  update(dt: number, worldSpeed: number, bendAt: (z: number, out: THREE.Vector2) => THREE.Vector2) {
    const off = new THREE.Vector2();
    for (let i = 0; i < MAX_PARTICLES; i++) {
      if (this.life[i] <= 0) {
        this.alpha[i] = 0;
        continue;
      }
      this.life[i] -= dt;
      const i3 = i * 3;
      const drag = Math.exp(-2.2 * dt);
      this.vel[i3] *= drag;
      this.vel[i3 + 1] *= drag;
      this.vel[i3 + 2] *= drag;
      this.pos[i3] += this.vel[i3] * dt;
      this.pos[i3 + 1] += this.vel[i3 + 1] * dt;
      this.pos[i3 + 2] += (this.vel[i3 + 2] + (this.anchored[i] ? worldSpeed : 0)) * dt;
      const t = Math.max(0, this.life[i] / this.maxLife[i]);
      this.alpha[i] = t;
      this.size[i] = this.baseSize[i] * (0.4 + 0.6 * t);
      bendAt(this.pos[i3 + 2], off);
      this.drawPos[i3] = this.pos[i3] + off.x;
      this.drawPos[i3 + 1] = this.pos[i3 + 1] + off.y;
      this.drawPos[i3 + 2] = this.pos[i3 + 2];
    }
    const g = this.points.geometry;
    g.attributes.position.needsUpdate = true;
    g.attributes.aColor.needsUpdate = true;
    g.attributes.aSize.needsUpdate = true;
    g.attributes.aAlpha.needsUpdate = true;
  }

  clear() {
    this.life.fill(0);
  }
}

// ---------------------------------------------------------------------------
// Obstacles
// ---------------------------------------------------------------------------
type ObstacleKind = "gate" | "bars" | "iris" | "spore";

interface Obstacle {
  kind: ObstacleKind;
  group: THREE.Group;
  z: number;
  rot: number;
  rotSpeed: number;
  // gate
  gapStart?: number;
  gapWidth?: number;
  // bars
  barCount?: number;
  barThickness?: number;
  // iris
  holeX?: number;
  holeY?: number;
  holeR?: number;
  // spore
  sx?: number;
  sy?: number;
  sr?: number;
  orbit?: number;
  phase?: number;
  disposables: { dispose(): void }[];
}

interface Shard {
  mesh: THREE.Mesh;
  x: number;
  y: number;
  z: number;
}

// ---------------------------------------------------------------------------
// The game
// ---------------------------------------------------------------------------
export class RiftGame {
  private container: HTMLElement;
  private cb: GameCallbacks;
  private renderer: THREE.WebGLRenderer;
  private scene = new THREE.Scene();
  private camera: THREE.PerspectiveCamera;
  private composer: EffectComposer;
  private bloom: UnrealBloomPass;
  private fx: ShaderPass;
  private audio = new RiftAudio();
  private reducedMotion: boolean;

  private tunnelMat: THREE.ShaderMaterial;
  private streakGeo: THREE.BufferGeometry;
  private streakPos: Float32Array;
  private streakData: Float32Array; // x, y, z, len-scale per streak
  private streakMat: THREE.LineBasicMaterial;
  private particles = new Particles();

  private ship = new THREE.Group();
  private shipGlowMats: THREE.Material[] = [];
  private engineMesh!: THREE.Mesh;
  private shipLight: THREE.PointLight;

  private obstacles: Obstacle[] = [];
  private shards: Shard[] = [];
  private shardGeo = new THREE.OctahedronGeometry(0.34, 0);
  private shardMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
  private shardHaloMat = new THREE.MeshBasicMaterial({
    color: 0xffffff,
    wireframe: true,
    transparent: true,
    opacity: 0.5,
  });
  private shardHaloGeo = new THREE.IcosahedronGeometry(0.62, 0);
  private sporeGeo = new THREE.IcosahedronGeometry(1, 1);
  private sporeShellGeo = new THREE.IcosahedronGeometry(1.25, 1);

  // Colors (current, blended toward target palette).
  private colA = PALETTES[0].a.clone();
  private colB = PALETTES[0].b.clone();
  private colFog = PALETTES[0].fog.clone();
  private colHazard = PALETTES[0].hazard.clone();
  private colShard = PALETTES[0].shard.clone();
  private colBg = new THREE.Color();

  // Run state.
  state: GameState = "ready";
  private px = 0;
  private py = 0;
  private pvx = 0;
  private pvy = 0;
  private tx = 0;
  private ty = 0;
  private keys = new Set<string>();
  private lastTouch: { x: number; y: number } | null = null;

  private time = 0;
  private travel = 0;
  private distance = 0;
  private speed = 30;
  private score = 0;
  private hull = MAX_HULL;
  private combo = 0;
  private shardsTaken = 0;
  private invuln = 0;
  private spawnCursor = 0;
  private zone = 0;
  private timeScale = 1;
  private dyingTimer = 0;
  private paused = false;

  private shake = 0;
  private rgbShift = 0;
  private hitFlash = 0;
  private bend = new THREE.Vector2();
  private bendTarget = new THREE.Vector2();
  private bendTimer = 0;
  private hudTimer = 0;

  private raf = 0;
  private lastT = 0;
  private resizeObs: ResizeObserver;
  private tmpV2 = new THREE.Vector2();
  private disposed = false;

  constructor(container: HTMLElement, callbacks: GameCallbacks) {
    this.container = container;
    this.cb = callbacks;
    this.reducedMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;

    this.renderer = new THREE.WebGLRenderer({ antialias: false, powerPreference: "high-performance" });
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.0;
    this.renderer.domElement.style.display = "block";
    this.renderer.domElement.style.touchAction = "none";
    container.appendChild(this.renderer.domElement);

    this.camera = new THREE.PerspectiveCamera(72, 1, 0.1, 400);
    this.camera.position.set(0, 1.2, 7);
    this.scene.background = this.colBg;
    this.scene.fog = new THREE.Fog(this.colBg, 40, 260);

    // Lights for the few lit materials (ship, spores).
    this.scene.add(new THREE.HemisphereLight(0x8899ff, 0x220011, 0.6));
    const key = new THREE.DirectionalLight(0xffffff, 1.4);
    key.position.set(3, 5, 6);
    this.scene.add(key);
    this.shipLight = new THREE.PointLight(0x66e0ff, 30, 14, 2);
    this.scene.add(this.shipLight);

    // Tunnel.
    const tunnelGeo = new THREE.CylinderGeometry(R, R, TUNNEL_LEN, 100, 320, true);
    tunnelGeo.rotateX(Math.PI / 2);
    tunnelGeo.translate(0, 0, -TUNNEL_LEN / 2 + 14);
    this.tunnelMat = new THREE.ShaderMaterial({
      vertexShader: tunnelVertex,
      fragmentShader: tunnelFragment,
      side: THREE.BackSide,
      uniforms: {
        uBend: { value: this.bend },
        uTime: { value: 0 },
        uTravel: { value: 0 },
        uHit: { value: 0 },
        uSpeed: { value: 0 },
        uColA: { value: this.colA },
        uColB: { value: this.colB },
        uFog: { value: this.colFog },
      },
    });
    const tunnel = new THREE.Mesh(tunnelGeo, this.tunnelMat);
    tunnel.frustumCulled = false;
    this.scene.add(tunnel);

    // Speed streaks.
    this.streakPos = new Float32Array(STREAKS * 6);
    this.streakData = new Float32Array(STREAKS * 4);
    for (let i = 0; i < STREAKS; i++) this.resetStreak(i, rand(SPAWN_Z, 10));
    this.streakGeo = new THREE.BufferGeometry();
    this.streakGeo.setAttribute(
      "position",
      new THREE.BufferAttribute(this.streakPos, 3).setUsage(THREE.DynamicDrawUsage),
    );
    this.streakMat = new THREE.LineBasicMaterial({
      color: this.colB,
      transparent: true,
      opacity: 0.55,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const streaks = new THREE.LineSegments(this.streakGeo, this.streakMat);
    streaks.frustumCulled = false;
    this.scene.add(streaks);

    this.scene.add(this.particles.points);
    this.buildShip();

    // Post-processing.
    this.composer = new EffectComposer(this.renderer);
    this.composer.addPass(new RenderPass(this.scene, this.camera));
    this.bloom = new UnrealBloomPass(new THREE.Vector2(256, 256), 0.8, 0.45, 0.28);
    this.composer.addPass(this.bloom);
    this.fx = new ShaderPass(finalFxShader);
    this.composer.addPass(this.fx);
    this.composer.addPass(new OutputPass());

    this.resizeObs = new ResizeObserver(() => this.resize());
    this.resizeObs.observe(container);
    this.resize();
    this.bindInput();

    this.lastT = performance.now();
    this.raf = requestAnimationFrame(this.loop);
  }

  // ------------------------------------------------------------------ public

  start() {
    this.audio.unlock();
    this.clearWorld();
    this.state = "playing";
    this.distance = 0;
    this.score = 0;
    this.hull = MAX_HULL;
    this.combo = 0;
    this.shardsTaken = 0;
    this.invuln = 1.2;
    this.speed = 38;
    this.zone = 0;
    this.timeScale = 1;
    this.spawnCursor = SPAWN_Z + 60; // short breather before the first obstacle
    this.ship.visible = true;
    this.paused = false;
    this.audio.whoosh();
    this.cb.onState("playing", this.hud());
    this.cb.onZone(0, zoneName(0));
  }

  setMuted(m: boolean) {
    this.audio.setMuted(m);
  }

  setPaused(p: boolean) {
    if (this.state !== "playing") return;
    this.paused = p;
    this.cb.onHud(this.hud());
  }

  isPaused() {
    return this.paused;
  }

  dispose() {
    this.disposed = true;
    cancelAnimationFrame(this.raf);
    this.resizeObs.disconnect();
    this.unbindInput();
    this.audio.dispose();
    this.clearWorld();
    this.scene.traverse((obj) => {
      const m = obj as THREE.Mesh;
      m.geometry?.dispose();
      const mat = m.material as THREE.Material | THREE.Material[] | undefined;
      if (Array.isArray(mat)) mat.forEach((x) => x.dispose());
      else mat?.dispose();
    });
    [this.shardGeo, this.shardMat, this.shardHaloGeo, this.shardHaloMat, this.sporeGeo, this.sporeShellGeo].forEach((d) =>
      d.dispose(),
    );
    this.composer.dispose();
    this.renderer.dispose();
    this.renderer.domElement.remove();
  }

  // ------------------------------------------------------------------ setup

  private buildShip() {
    const hullMat = new THREE.MeshStandardMaterial({
      color: 0x20222e,
      metalness: 0.85,
      roughness: 0.28,
      flatShading: true,
    });
    const glowMat = new THREE.LineBasicMaterial({ color: new THREE.Color(0x7df9ff).multiplyScalar(2.2) });
    this.shipGlowMats.push(glowMat);

    const body = new THREE.ConeGeometry(0.26, 1.7, 6);
    body.rotateX(-Math.PI / 2);
    const bodyMesh = new THREE.Mesh(body, hullMat);
    this.ship.add(bodyMesh);

    const wingShape = new THREE.Shape();
    wingShape.moveTo(0, -0.55);
    wingShape.lineTo(1.2, 0.5);
    wingShape.lineTo(1.05, 0.68);
    wingShape.lineTo(0.28, 0.55);
    wingShape.lineTo(-0.28, 0.55);
    wingShape.lineTo(-1.05, 0.68);
    wingShape.lineTo(-1.2, 0.5);
    wingShape.closePath();
    const wingGeo = new THREE.ExtrudeGeometry(wingShape, { depth: 0.06, bevelEnabled: false });
    wingGeo.rotateX(Math.PI / 2);
    wingGeo.translate(0, 0.03, 0.1);
    const wing = new THREE.Mesh(wingGeo, hullMat);
    this.ship.add(wing);
    const wingEdges = new THREE.LineSegments(new THREE.EdgesGeometry(wingGeo, 20), glowMat);
    this.ship.add(wingEdges);

    const finGeo = new THREE.BoxGeometry(0.04, 0.42, 0.6);
    finGeo.translate(0, 0.22, 0.45);
    finGeo.rotateX(-0.25);
    this.ship.add(new THREE.Mesh(finGeo, hullMat));

    const canopy = new THREE.Mesh(
      new THREE.SphereGeometry(0.17, 12, 8, 0, TAU, 0, Math.PI / 2),
      new THREE.MeshStandardMaterial({ color: 0x113344, emissive: 0x2299cc, emissiveIntensity: 0.7, metalness: 0.2, roughness: 0.1 }),
    );
    canopy.scale.set(1, 0.8, 2.2);
    canopy.position.set(0, 0.1, -0.05);
    this.ship.add(canopy);

    const tipMat = (c: number) => new THREE.MeshBasicMaterial({ color: new THREE.Color(c).multiplyScalar(3) });
    const tipGeo = new THREE.SphereGeometry(0.05, 8, 6);
    const tipL = new THREE.Mesh(tipGeo, tipMat(0xff2a4a));
    tipL.position.set(-1.12, 0.03, 0.62);
    const tipR = new THREE.Mesh(tipGeo, tipMat(0x2aff8a));
    tipR.position.set(1.12, 0.03, 0.62);
    this.ship.add(tipL, tipR);

    this.engineMesh = new THREE.Mesh(
      new THREE.SphereGeometry(0.16, 12, 8),
      new THREE.MeshBasicMaterial({ color: new THREE.Color(0x9ff6ff).multiplyScalar(2.5) }),
    );
    this.engineMesh.position.set(0, 0, 0.86);
    this.engineMesh.scale.set(1, 1, 1.8);
    this.ship.add(this.engineMesh);

    this.scene.add(this.ship);
  }

  private resize() {
    const w = Math.max(1, this.container.clientWidth);
    const h = Math.max(1, this.container.clientHeight);
    this.renderer.setSize(w, h, false);
    this.renderer.domElement.style.width = "100%";
    this.renderer.domElement.style.height = "100%";
    this.composer.setSize(w, h);
    this.composer.setPixelRatio(this.renderer.getPixelRatio());
    this.bloom.resolution.set(w / 2, h / 2);
    this.particles.setPixelRatio(this.renderer.getPixelRatio() * (h / 900));
    this.camera.aspect = w / h;
    // Keep the tunnel readable on tall phone screens.
    this.baseFov = w / h < 0.8 ? 92 : 72;
    this.camera.updateProjectionMatrix();
  }

  private baseFov = 72;

  // ------------------------------------------------------------------ input

  private onKeyDown = (e: KeyboardEvent) => {
    const k = e.key.toLowerCase();
    if (["arrowup", "arrowdown", "arrowleft", "arrowright", " "].includes(k)) e.preventDefault();
    this.keys.add(k);
  };

  private onKeyUp = (e: KeyboardEvent) => {
    this.keys.delete(e.key.toLowerCase());
  };

  private onPointerMove = (e: PointerEvent) => {
    if (e.pointerType === "mouse") {
      const rect = this.container.getBoundingClientRect();
      const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const ny = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      const aspect = rect.width / rect.height;
      this.setTarget(nx * MOVE_R * 1.3 * Math.min(1.4, aspect), ny * MOVE_R * 1.3);
    } else if (this.lastTouch) {
      const rect = this.container.getBoundingClientRect();
      const k = (MOVE_R * 3.2) / Math.min(rect.width, rect.height);
      this.setTarget(this.tx + (e.clientX - this.lastTouch.x) * k, this.ty - (e.clientY - this.lastTouch.y) * k);
      this.lastTouch = { x: e.clientX, y: e.clientY };
    }
  };

  private onPointerDown = (e: PointerEvent) => {
    if (e.pointerType !== "mouse") {
      this.lastTouch = { x: e.clientX, y: e.clientY };
    }
  };

  private onPointerUp = () => {
    this.lastTouch = null;
  };

  private onVisibility = () => {
    if (document.hidden && this.state === "playing") {
      this.paused = true;
      this.cb.onHud(this.hud());
    }
  };

  private bindInput() {
    window.addEventListener("keydown", this.onKeyDown);
    window.addEventListener("keyup", this.onKeyUp);
    window.addEventListener("pointermove", this.onPointerMove);
    window.addEventListener("pointerdown", this.onPointerDown);
    window.addEventListener("pointerup", this.onPointerUp);
    window.addEventListener("pointercancel", this.onPointerUp);
    document.addEventListener("visibilitychange", this.onVisibility);
  }

  private unbindInput() {
    window.removeEventListener("keydown", this.onKeyDown);
    window.removeEventListener("keyup", this.onKeyUp);
    window.removeEventListener("pointermove", this.onPointerMove);
    window.removeEventListener("pointerdown", this.onPointerDown);
    window.removeEventListener("pointerup", this.onPointerUp);
    window.removeEventListener("pointercancel", this.onPointerUp);
    document.removeEventListener("visibilitychange", this.onVisibility);
  }

  private setTarget(x: number, y: number) {
    const r = Math.hypot(x, y);
    if (r > MOVE_R) {
      x *= MOVE_R / r;
      y *= MOVE_R / r;
    }
    this.tx = x;
    this.ty = y;
  }

  // ------------------------------------------------------------------ helpers

  /** Lateral offset of the curved tunnel at depth z (only ahead of the player bends). */
  private bendAt = (z: number, out: THREE.Vector2) => {
    const d = Math.max(0, -z);
    return out.set(this.bend.x * d * d, this.bend.y * d * d);
  };

  private hud(): HudData {
    return {
      score: Math.floor(this.score),
      distance: Math.floor(this.distance),
      hull: this.hull,
      combo: this.combo,
      speed: this.speed,
      zone: this.zone,
      shards: this.shardsTaken,
      paused: this.paused,
    };
  }

  private multiplier() {
    return 1 + Math.min(7, Math.floor(this.combo / 3));
  }

  private palette() {
    return PALETTES[this.zone % PALETTES.length];
  }

  private resetStreak(i: number, z: number) {
    const a = Math.random() * TAU;
    const r = rand(0.55, 0.97) * R;
    this.streakData[i * 4] = Math.cos(a) * r;
    this.streakData[i * 4 + 1] = Math.sin(a) * r;
    this.streakData[i * 4 + 2] = z;
    this.streakData[i * 4 + 3] = rand(0.5, 1.4);
  }

  private clearWorld() {
    for (const o of this.obstacles) this.removeObstacle(o);
    this.obstacles = [];
    for (const s of this.shards) this.scene.remove(s.mesh);
    this.shards = [];
    this.particles.clear();
  }

  private removeObstacle(o: Obstacle) {
    this.scene.remove(o.group);
    o.disposables.forEach((d) => d.dispose());
  }

  // ------------------------------------------------------------------ spawning

  private difficulty() {
    return clamp(this.distance / 9000, 0, 1);
  }

  private spawnPattern() {
    const d = this.difficulty();
    const roll = Math.random();
    const z = SPAWN_Z;
    if (roll < 0.3) {
      this.spawnGate(z);
    } else if (roll < 0.52) {
      this.spawnBars(z);
    } else if (roll < 0.74) {
      this.spawnIris(z);
    } else if (roll < 0.9) {
      const n = 3 + Math.floor(d * 4 + Math.random() * 2);
      for (let i = 0; i < n; i++) this.spawnSpore(z - i * rand(4, 9));
    } else {
      this.spawnShardHelix(z);
    }
  }

  private makeWallMaterials(p: Palette) {
    const fill = new THREE.MeshBasicMaterial({
      color: p.hazard.clone().multiplyScalar(0.12),
      transparent: true,
      opacity: 0.82,
      side: THREE.DoubleSide,
      depthWrite: false,
    });
    const edge = new THREE.LineBasicMaterial({ color: p.hazard.clone().multiplyScalar(2.6) });
    const detail = new THREE.LineBasicMaterial({
      color: p.hazard.clone().multiplyScalar(0.9),
      transparent: true,
      opacity: 0.6,
    });
    return { fill, edge, detail };
  }

  private spawnGate(z: number) {
    const d = this.difficulty();
    const p = this.palette();
    const gapWidth = THREE.MathUtils.lerp(1.55, 0.95, d) + rand(-0.1, 0.1);
    const gapStart = Math.random() * TAU;
    const group = new THREE.Group();
    const { fill, edge, detail } = this.makeWallMaterials(p);

    const shape = new THREE.Shape();
    shape.moveTo(0, 0);
    shape.absarc(0, 0, R + 0.3, gapWidth, TAU, false);
    shape.lineTo(0, 0);
    const geo = new THREE.ShapeGeometry(shape, 48);
    group.add(new THREE.Mesh(geo, fill));

    const outline = new THREE.BufferGeometry().setFromPoints(
      [new THREE.Vector2(0, 0), ...new THREE.Path().absarc(0, 0, R - 0.02, gapWidth, TAU, false).getPoints(64)].map(
        (v) => new THREE.Vector3(v.x, v.y, 0),
      ),
    );
    const outlineLine = new THREE.LineLoop(outline, edge);
    group.add(outlineLine);

    // Concentric detailing arcs.
    const arcs: THREE.Vector3[] = [];
    for (const rr of [1.6, 3.2, 4.6]) {
      const pts = new THREE.Path().absarc(0, 0, rr, gapWidth + 0.05, TAU - 0.05, false).getPoints(40);
      for (let i = 0; i < pts.length - 1; i++) {
        arcs.push(new THREE.Vector3(pts[i].x, pts[i].y, 0.02), new THREE.Vector3(pts[i + 1].x, pts[i + 1].y, 0.02));
      }
    }
    const arcGeo = new THREE.BufferGeometry().setFromPoints(arcs);
    group.add(new THREE.LineSegments(arcGeo, detail));

    this.scene.add(group);
    const rotSpeed = Math.random() < 0.4 + d * 0.4 ? rand(0.3, 0.6 + d * 0.8) * (Math.random() < 0.5 ? -1 : 1) : 0;
    this.obstacles.push({
      kind: "gate",
      group,
      z,
      rot: gapStart,
      rotSpeed,
      gapStart: 0,
      gapWidth,
      disposables: [geo, outline, arcGeo, fill, edge, detail],
    });

    // Breadcrumb shards that lead into the gap (only reliable on still gates).
    if (rotSpeed === 0) {
      const mid = gapStart + gapWidth / 2;
      for (let i = 0; i < 3; i++) {
        const r = R * 0.6;
        this.spawnShard(Math.cos(mid) * r, Math.sin(mid) * r, z + 2 + i * 5);
      }
    }
  }

  private spawnBars(z: number) {
    const d = this.difficulty();
    const p = this.palette();
    const barCount = Math.random() < 0.25 + d * 0.5 ? 2 : 1;
    const barThickness = THREE.MathUtils.lerp(0.7, 1.0, d);
    const group = new THREE.Group();
    const core = new THREE.MeshBasicMaterial({ color: p.hazard.clone().multiplyScalar(2.4) });
    const shell = new THREE.MeshBasicMaterial({
      color: p.hazard.clone().multiplyScalar(0.5),
      transparent: true,
      opacity: 0.35,
      depthWrite: false,
    });
    const coreGeo = new THREE.BoxGeometry(R * 2.1, barThickness * 0.38, 0.3);
    const shellGeo = new THREE.BoxGeometry(R * 2.1, barThickness, 0.6);
    for (let i = 0; i < barCount; i++) {
      const bar = new THREE.Group();
      bar.add(new THREE.Mesh(coreGeo, core), new THREE.Mesh(shellGeo, shell));
      bar.rotation.z = (i * Math.PI) / barCount;
      group.add(bar);
    }
    const hubGeo = new THREE.CylinderGeometry(0.55, 0.55, 0.8, 12);
    hubGeo.rotateX(Math.PI / 2);
    group.add(new THREE.Mesh(hubGeo, core));
    this.scene.add(group);
    this.obstacles.push({
      kind: "bars",
      group,
      z,
      rot: Math.random() * Math.PI,
      rotSpeed: rand(0.7, 1.3 + d * 1.4) * (Math.random() < 0.5 ? -1 : 1),
      barCount,
      barThickness,
      disposables: [core, shell, coreGeo, shellGeo, hubGeo],
    });
  }

  private spawnIris(z: number) {
    const d = this.difficulty();
    const p = this.palette();
    const holeR = THREE.MathUtils.lerp(2.3, 1.55, d);
    const off = rand(0, R - holeR - 0.6);
    const a = Math.random() * TAU;
    const holeX = Math.cos(a) * off;
    const holeY = Math.sin(a) * off;
    const group = new THREE.Group();
    const { fill, edge, detail } = this.makeWallMaterials(p);

    const shape = new THREE.Shape();
    shape.absarc(0, 0, R + 0.3, 0, TAU, false);
    const hole = new THREE.Path();
    hole.absarc(holeX, holeY, holeR, 0, TAU, true);
    shape.holes.push(hole);
    const geo = new THREE.ShapeGeometry(shape, 64);
    group.add(new THREE.Mesh(geo, fill));

    const ring = (r: number, cx: number, cy: number, zz: number) =>
      new THREE.BufferGeometry().setFromPoints(
        new THREE.Path().absarc(cx, cy, r, 0, TAU, false).getPoints(64).map((v) => new THREE.Vector3(v.x, v.y, zz)),
      );
    const holeLine = ring(holeR, holeX, holeY, 0.02);
    const holeLine2 = ring(holeR + 0.35, holeX, holeY, 0.02);
    const rimLine = ring(R - 0.02, 0, 0, 0.02);
    group.add(new THREE.LineLoop(holeLine, edge), new THREE.LineLoop(holeLine2, detail), new THREE.LineLoop(rimLine, edge));

    // Radial spokes for texture.
    const spokes: THREE.Vector3[] = [];
    for (let i = 0; i < 24; i++) {
      const t = (i / 24) * TAU;
      const sx = Math.cos(t);
      const sy = Math.sin(t);
      // Only draw spokes that don't cross the hole.
      const inner = new THREE.Vector3(sx * (R - 1.2), sy * (R - 1.2), 0.02);
      if (Math.hypot(inner.x - holeX, inner.y - holeY) < holeR + 0.6) continue;
      spokes.push(inner, new THREE.Vector3(sx * (R - 0.1), sy * (R - 0.1), 0.02));
    }
    const spokeGeo = new THREE.BufferGeometry().setFromPoints(spokes);
    group.add(new THREE.LineSegments(spokeGeo, detail));
    this.scene.add(group);

    const rotSpeed = Math.random() < 0.3 + d * 0.5 ? rand(0.25, 0.5 + d * 0.5) * (Math.random() < 0.5 ? -1 : 1) : 0;
    this.obstacles.push({
      kind: "iris",
      group,
      z,
      rot: 0,
      rotSpeed,
      holeX,
      holeY,
      holeR,
      disposables: [geo, holeLine, holeLine2, rimLine, spokeGeo, fill, edge, detail],
    });
    if (rotSpeed === 0) this.spawnShard(holeX, holeY, z);
  }

  private spawnSpore(z: number) {
    const p = this.palette();
    const sr = rand(0.7, 1.25);
    const a = Math.random() * TAU;
    const r = rand(0, R - sr - 0.3);
    const group = new THREE.Group();
    const mat = new THREE.MeshStandardMaterial({
      color: 0x110008,
      emissive: p.hazard,
      emissiveIntensity: 0.9,
      flatShading: true,
      roughness: 0.6,
    });
    const shellMat = new THREE.MeshBasicMaterial({
      color: p.hazard.clone().multiplyScalar(1.6),
      wireframe: true,
      transparent: true,
      opacity: 0.45,
    });
    const core = new THREE.Mesh(this.sporeGeo, mat);
    const shell = new THREE.Mesh(this.sporeShellGeo, shellMat);
    group.add(core, shell);
    group.scale.setScalar(sr);
    this.scene.add(group);
    this.obstacles.push({
      kind: "spore",
      group,
      z,
      rot: Math.random() * TAU,
      rotSpeed: rand(-1.5, 1.5),
      sx: Math.cos(a) * r,
      sy: Math.sin(a) * r,
      sr,
      orbit: rand(0, 0.9),
      phase: Math.random() * TAU,
      disposables: [mat, shellMat],
    });
  }

  private spawnShard(x: number, y: number, z: number) {
    const mesh = new THREE.Mesh(this.shardGeo, this.shardMat);
    mesh.add(new THREE.Mesh(this.shardHaloGeo, this.shardHaloMat));
    this.scene.add(mesh);
    this.shards.push({ mesh, x, y, z });
  }

  private spawnShardHelix(z: number) {
    const a0 = Math.random() * TAU;
    const dir = Math.random() < 0.5 ? -1 : 1;
    const r = rand(1.8, R - 1.4);
    for (let i = 0; i < 9; i++) {
      const a = a0 + dir * i * 0.35;
      this.spawnShard(Math.cos(a) * r, Math.sin(a) * r, z + i * 3.5);
    }
  }

  // ------------------------------------------------------------------ collisions

  /** Returns clearance (negative = hit) for the player crossing this obstacle's plane. */
  private clearance(o: Obstacle): number {
    const px = this.px;
    const py = this.py;
    const r = Math.hypot(px, py);
    switch (o.kind) {
      case "gate": {
        if (r < 0.8) return -1;
        const rel = wrapAngle(Math.atan2(py, px) - o.rot);
        const gw = o.gapWidth!;
        if (rel > gw) return -1;
        // Distance (arc length) to the nearest gap edge.
        return Math.min(rel, gw - rel) * r - PLAYER_R;
      }
      case "bars": {
        let best = Infinity;
        for (let i = 0; i < o.barCount!; i++) {
          const t = o.rot + (i * Math.PI) / o.barCount!;
          const dist = Math.abs(-Math.sin(t) * px + Math.cos(t) * py);
          best = Math.min(best, dist - o.barThickness! / 2 - PLAYER_R);
        }
        return Math.min(best, r - 0.55 - PLAYER_R);
      }
      case "iris": {
        const c = Math.cos(o.rot);
        const s = Math.sin(o.rot);
        const hx = o.holeX! * c - o.holeY! * s;
        const hy = o.holeX! * s + o.holeY! * c;
        return o.holeR! - Math.hypot(px - hx, py - hy) - PLAYER_R * 0.8;
      }
      case "spore": {
        const { x, y } = this.sporePos(o);
        return Math.hypot(px - x, py - y) - o.sr! * 0.95 - PLAYER_R;
      }
    }
  }

  private sporePos(o: Obstacle) {
    const w = this.time * 1.3 + o.phase!;
    return { x: o.sx! + Math.cos(w) * o.orbit!, y: o.sy! + Math.sin(w) * o.orbit! };
  }

  private takeHit() {
    const p = this.palette();
    this.hull -= 1;
    this.combo = 0;
    this.invuln = 1.6;
    this.hitFlash = 1;
    this.shake = this.reducedMotion ? 0.15 : 0.9;
    this.rgbShift = this.reducedMotion ? 0 : 0.035;
    this.audio.hit();
    this.particles.burst(this.px, this.py, 0, 90, p.hazard.clone().multiplyScalar(2), 18, 0.5, 0.9);
    this.particles.burst(this.px, this.py, 0, 40, new THREE.Color(3, 3, 3), 10, 0.3, 0.5);
    if (this.hull <= 0) {
      this.die();
    } else {
      this.cb.onPopup(this.hull === 1 ? "HULL CRITICAL" : "HULL BREACH", "bad");
    }
  }

  private die() {
    this.state = "dying";
    this.dyingTimer = 1.6;
    this.ship.visible = false;
    this.timeScale = 0.25;
    const p = this.palette();
    this.particles.burst(this.px, this.py, 0, 380, p.hazard.clone().multiplyScalar(2.5), 26, 0.7, 1.8);
    this.particles.burst(this.px, this.py, 0, 200, p.shard.clone().multiplyScalar(2), 14, 0.4, 2.2);
    this.particles.burst(this.px, this.py, 0, 120, new THREE.Color(4, 4, 4), 34, 0.25, 0.9);
    this.shake = this.reducedMotion ? 0.2 : 1.6;
    this.rgbShift = this.reducedMotion ? 0 : 0.06;
    this.cb.onState("dying", this.hud());
  }

  // ------------------------------------------------------------------ main loop

  private loop = (now: number) => {
    if (this.disposed) return;
    this.raf = requestAnimationFrame(this.loop);
    const rawDt = Math.min(0.05, (now - this.lastT) / 1000);
    this.lastT = now;
    if (this.paused) {
      this.audio.setDrone(0, false);
      this.composer.render();
      return;
    }
    this.timeScale = damp(this.timeScale, 1, this.state === "dying" ? 0.6 : 3, rawDt);
    const dt = rawDt * this.timeScale;
    this.update(dt, rawDt);
    this.composer.render();
  };

  private update(dt: number, rawDt: number) {
    this.time += dt;
    const playing = this.state === "playing";

    // --- speed & distance
    const targetSpeed = playing
      ? 38 + 74 * (1 - Math.exp(-this.distance / 6000))
      : this.state === "dying"
        ? this.speed
        : 22;
    this.speed = damp(this.speed, targetSpeed, 1.5, dt);
    const step = this.speed * dt;
    this.travel += step;
    if (playing) {
      this.distance += step;
      this.score += step * 0.5 * this.multiplier();
      const z = Math.floor(this.distance / ZONE_LEN);
      if (z !== this.zone) {
        this.zone = z;
        this.cb.onZone(z, zoneName(z));
        this.audio.whoosh();
      }
    }
    const speed01 = clamp((this.speed - 22) / 90, 0, 1);

    // --- palette blending
    const p = this.palette();
    const k = 1 - Math.exp(-1.5 * rawDt);
    this.colA.lerp(p.a, k);
    this.colB.lerp(p.b, k);
    this.colFog.lerp(p.fog, k);
    this.colHazard.lerp(p.hazard, k);
    this.colShard.lerp(p.shard, k);
    this.shardMat.color.copy(this.colShard).multiplyScalar(2.2);
    this.shardHaloMat.color.copy(this.colShard);

    // --- tunnel curvature drifts to new random headings
    this.bendTimer -= dt;
    if (this.bendTimer <= 0) {
      this.bendTimer = rand(2.5, 5);
      const amt = rand(0, 0.0009) * (playing ? 0.6 + speed01 * 0.6 : 1);
      const a = Math.random() * TAU;
      this.bendTarget.set(Math.cos(a) * amt, Math.sin(a) * amt);
    }
    this.bend.x = damp(this.bend.x, this.bendTarget.x, 0.5, dt);
    this.bend.y = damp(this.bend.y, this.bendTarget.y, 0.5, dt);

    // --- player movement
    if (playing) {
      let kx = 0;
      let ky = 0;
      if (this.keys.has("arrowleft") || this.keys.has("a")) kx -= 1;
      if (this.keys.has("arrowright") || this.keys.has("d")) kx += 1;
      if (this.keys.has("arrowup") || this.keys.has("w")) ky += 1;
      if (this.keys.has("arrowdown") || this.keys.has("s")) ky -= 1;
      if (kx || ky) this.setTarget(this.tx + kx * 11 * rawDt, this.ty + ky * 11 * rawDt);
    } else if (this.state === "ready") {
      // Attract mode: lazy figure-eight.
      this.tx = Math.sin(this.time * 0.6) * 2.6;
      this.ty = Math.sin(this.time * 1.2) * 1.4 - 0.4;
    }
    const nx = damp(this.px, this.tx, 9, dt);
    const ny = damp(this.py, this.ty, 9, dt);
    this.pvx = dt > 0 ? (nx - this.px) / dt : 0;
    this.pvy = dt > 0 ? (ny - this.py) / dt : 0;
    this.px = nx;
    this.py = ny;

    // Ship transform.
    this.ship.position.set(this.px, this.py, 0);
    const blink = this.invuln > 0 && playing ? Math.sin(this.time * 40) > 0 : true;
    if (this.state !== "dying" && this.state !== "over") this.ship.visible = blink;
    this.ship.rotation.z = damp(this.ship.rotation.z, clamp(-this.pvx * 0.09, -1.1, 1.1), 8, dt);
    this.ship.rotation.x = damp(this.ship.rotation.x, clamp(this.pvy * 0.05, -0.5, 0.5), 8, dt);
    this.ship.rotation.y = damp(this.ship.rotation.y, clamp(-this.pvx * 0.02, -0.3, 0.3), 8, dt);
    const flicker = 0.85 + Math.random() * 0.3;
    this.engineMesh.scale.set(flicker, flicker, 1.6 + speed01 * 1.6 * flicker);
    this.shipLight.position.set(this.px, this.py + 0.5, 1.5);
    this.shipLight.color.copy(this.colShard);

    // Engine exhaust.
    if (this.ship.visible || (playing && this.invuln > 0)) {
      const hot = this.colShard.clone().multiplyScalar(1.8);
      for (let i = 0; i < 3; i++) {
        this.particles.emit(
          this.px + rand(-0.06, 0.06), this.py + rand(-0.06, 0.06), 1.0,
          rand(-0.5, 0.5), rand(-0.5, 0.5), 2,
          hot, rand(0.25, 0.45), rand(0.12, 0.22), true,
        );
      }
      // Wingtip vapour trails when banking hard.
      if (Math.abs(this.pvx) + Math.abs(this.pvy) > 6) {
        const c = Math.cos(this.ship.rotation.z);
        const s = Math.sin(this.ship.rotation.z);
        for (const side of [-1, 1]) {
          this.particles.emit(
            this.px + side * 1.12 * c, this.py + side * 1.12 * s, 0.6,
            0, 0, 0, this.colA, 0.14, 0.25, true,
          );
        }
      }
    }

    // --- spawning
    if (playing) {
      this.spawnCursor += step;
      const spacing = THREE.MathUtils.lerp(58, 30, this.difficulty());
      if (this.spawnCursor > SPAWN_Z + spacing) {
        this.spawnCursor = SPAWN_Z;
        this.spawnPattern();
      }
    }

    // --- obstacles
    this.invuln = Math.max(0, this.invuln - dt);
    for (let i = this.obstacles.length - 1; i >= 0; i--) {
      const o = this.obstacles[i];
      const prevZ = o.z;
      o.z += step;
      o.rot += o.rotSpeed * dt;
      this.bendAt(o.z, this.tmpV2);
      if (o.kind === "spore") {
        const sp = this.sporePos(o);
        o.group.position.set(sp.x + this.tmpV2.x, sp.y + this.tmpV2.y, o.z);
        o.group.rotation.set(o.rot * 0.7, o.rot, 0);
        const pulse = 1 + Math.sin(this.time * 4 + o.phase!) * 0.06;
        o.group.scale.setScalar(o.sr! * pulse);
      } else {
        o.group.position.set(this.tmpV2.x, this.tmpV2.y, o.z);
        o.group.rotation.z = o.rot;
      }

      if (playing && prevZ < 0 && o.z >= 0) {
        const clear = this.clearance(o);
        if (clear < 0 && this.invuln <= 0) {
          this.takeHit();
        } else if (clear >= 0 && clear < 0.45) {
          const bonus = 50 * this.multiplier();
          this.score += bonus;
          this.cb.onPopup(`CLOSE CALL +${bonus}`, "info");
          this.audio.whoosh();
          this.rgbShift = Math.max(this.rgbShift, this.reducedMotion ? 0 : 0.01);
        }
      }
      if (o.z > 12) {
        this.removeObstacle(o);
        this.obstacles.splice(i, 1);
      }
    }

    // --- shards
    for (let i = this.shards.length - 1; i >= 0; i--) {
      const s = this.shards[i];
      s.z += step;
      this.bendAt(s.z, this.tmpV2);
      s.mesh.position.set(s.x + this.tmpV2.x, s.y + this.tmpV2.y, s.z);
      s.mesh.rotation.set(this.time * 2, this.time * 3, 0);
      const bob = 1 + Math.sin(this.time * 6 + i) * 0.12;
      s.mesh.scale.setScalar(bob);
      let remove = s.z > 10;
      if (playing && Math.abs(s.z) < 1.6 && Math.hypot(s.x - this.px, s.y - this.py) < 1.35) {
        remove = true;
        this.combo += 1;
        this.shardsTaken += 1;
        const gain = 25 * this.multiplier();
        this.score += gain;
        this.audio.pickup(Math.min(this.combo - 1, 10));
        this.particles.burst(s.x, s.y, s.z, 30, this.colShard.clone().multiplyScalar(2.2), 9, 0.35, 0.6);
        if (this.combo % 3 === 0 && this.multiplier() <= 8) {
          this.cb.onPopup(`x${this.multiplier()} MULTIPLIER`, "good");
        }
      }
      if (remove) {
        this.scene.remove(s.mesh);
        this.shards.splice(i, 1);
      }
    }

    // --- streaks
    const len = 0.6 + this.speed * 0.07;
    const off2 = new THREE.Vector2();
    for (let i = 0; i < STREAKS; i++) {
      const i4 = i * 4;
      this.streakData[i4 + 2] += step * 1.15;
      if (this.streakData[i4 + 2] > 12) this.resetStreak(i, SPAWN_Z + rand(-30, 0));
      const x = this.streakData[i4];
      const y = this.streakData[i4 + 1];
      const z = this.streakData[i4 + 2];
      const l = len * this.streakData[i4 + 3];
      this.bendAt(z, this.tmpV2);
      this.bendAt(z - l, off2);
      const i6 = i * 6;
      this.streakPos[i6] = x + this.tmpV2.x;
      this.streakPos[i6 + 1] = y + this.tmpV2.y;
      this.streakPos[i6 + 2] = z;
      this.streakPos[i6 + 3] = x + off2.x;
      this.streakPos[i6 + 4] = y + off2.y;
      this.streakPos[i6 + 5] = z - l;
    }
    this.streakGeo.attributes.position.needsUpdate = true;
    this.streakMat.color.copy(this.colB).multiplyScalar(0.8 + speed01 * 1.4);
    this.streakMat.opacity = 0.25 + speed01 * 0.5;

    this.particles.update(dt, this.speed, this.bendAt);

    // --- camera
    this.shake = Math.max(0, this.shake - rawDt * 2.2);
    this.rgbShift = Math.max(0, this.rgbShift - rawDt * 0.08);
    this.hitFlash = Math.max(0, this.hitFlash - rawDt * 2.5);
    const sh = this.shake * this.shake;
    const cam = this.camera;
    cam.position.set(
      this.px * 0.55 + (Math.random() - 0.5) * sh * 0.8,
      this.py * 0.55 + 1.1 + (Math.random() - 0.5) * sh * 0.8,
      6.5 - speed01 * 1.2,
    );
    this.bendAt(-60, this.tmpV2);
    cam.lookAt(this.px * 0.7 + this.tmpV2.x, this.py * 0.7 + this.tmpV2.y + 0.3, -60);
    cam.rotateZ(this.ship.rotation.z * 0.25);
    const fov = this.baseFov + speed01 * 16 + this.shake * 4;
    if (Math.abs(cam.fov - fov) > 0.01) {
      cam.fov = fov;
      cam.updateProjectionMatrix();
    }

    // --- uniforms
    const u = this.tunnelMat.uniforms;
    u.uTime.value = this.time;
    u.uTravel.value = this.travel;
    u.uHit.value = this.hitFlash;
    u.uSpeed.value = speed01;
    this.colBg.copy(this.colB).multiplyScalar(0.08).add(this.colFog);
    (this.scene.fog as THREE.Fog).color.copy(this.colBg);
    this.fx.uniforms.uShift.value = this.rgbShift + (this.reducedMotion ? 0 : speed01 * 0.002);
    this.fx.uniforms.uTime.value = this.time % 100;
    this.fx.uniforms.uWarp.value = this.reducedMotion ? 0 : speed01 * 0.18;
    this.bloom.strength = 0.75 + speed01 * 0.3 + this.hitFlash * 0.6;
    this.audio.setDrone(speed01, playing);

    // --- state transitions & HUD
    if (this.state === "dying") {
      this.dyingTimer -= rawDt;
      if (this.dyingTimer <= 0) {
        this.state = "over";
        this.cb.onState("over", this.hud());
      }
    }
    this.hudTimer -= rawDt;
    if (this.hudTimer <= 0 && playing) {
      this.hudTimer = 0.08;
      this.cb.onHud(this.hud());
    }
  }
}
