/**
 * Deterministic mini-world generator.
 *
 * Every archived drop gets its own illustrated ecosystem, chosen from a stable
 * hash of its id + title. The same drop always renders the same world, and no
 * project artwork is ever used inside the sphere.
 */

export type Archetype =
  | "pollen"
  | "ink"
  | "paper"
  | "mineral"
  | "arcade"
  | "reef"
  | "cloud"
  | "orbit";

export const ARCHETYPES: Archetype[] = [
  "pollen",
  "ink",
  "paper",
  "mineral",
  "arcade",
  "reef",
  "cloud",
  "orbit",
];

export const ARCHETYPE_NAME: Record<Archetype, string> = {
  pollen: "Pollen garden",
  ink: "Ink organism",
  paper: "Paper habitat",
  mineral: "Mineral cave",
  arcade: "Neon ruins",
  reef: "Data reef",
  cloud: "Cloud terrarium",
  orbit: "Colour orbit",
};

export interface Palette {
  /** deep background */
  base: string;
  /** background haze */
  haze: string;
  /** far silhouette */
  far: string;
  /** mid forms */
  mid: string;
  /** hero accent / glow */
  glow: string;
  /** highlight sparks */
  spark: string;
}

const PALETTES: Record<Archetype, Palette> = {
  pollen: {
    base: "#02100c",
    haze: "#0b5a3d",
    far: "#07352a",
    mid: "#12724c",
    glow: "#7dffb0",
    spark: "#eafff2",
  },
  ink: {
    base: "#05060f",
    haze: "#2a1a5e",
    far: "#150f33",
    mid: "#3a2385",
    glow: "#9b7bff",
    spark: "#e6e0ff",
  },
  paper: {
    base: "#120a08",
    haze: "#5a3320",
    far: "#301a14",
    mid: "#7a4326",
    glow: "#ffcf94",
    spark: "#fff4e6",
  },
  mineral: {
    base: "#04070f",
    haze: "#1d3f7a",
    far: "#0f2246",
    mid: "#2a56a8",
    glow: "#8fc6ff",
    spark: "#f4f9ff",
  },
  arcade: {
    base: "#100213",
    haze: "#610f63",
    far: "#33063b",
    mid: "#8a1274",
    glow: "#ff5cc8",
    spark: "#ffe3f8",
  },
  reef: {
    base: "#01100f",
    haze: "#0a5566",
    far: "#062f3c",
    mid: "#0d7183",
    glow: "#3ee0ff",
    spark: "#e2fbff",
  },
  cloud: {
    base: "#070911",
    haze: "#3a4270",
    far: "#1a2140",
    mid: "#525c96",
    glow: "#dfe7ff",
    spark: "#ffffff",
  },
  orbit: {
    base: "#100503",
    haze: "#6a2a10",
    far: "#37160b",
    mid: "#993d15",
    glow: "#ffb03d",
    spark: "#fff2d6",
  },
};

/**
 * Semantic routing — obvious subjects get a fitting world before the hash
 * fallback runs. Order matters: earlier rules win.
 */
const KEYWORD_RULES: Array<[Archetype, RegExp]> = [
  ["orbit", /badminton|sport|match|racket|tennis|футбол|football|soccer|fitness|run|kinetic|motion/i],
  ["reef", /kitchen|food|cook|recipe|chef|restaurant|meal|menu|eat|bite|snack|厨|食|菜/i],
  ["mineral", /block|brick|cube|stack|tetris|build|构|方块/i],
  ["cloud", /chart|charts|data|trend|graph|dashboard|analytic|stat|metric|insight|报表|数据/i],
  ["arcade", /rac(e|ing)|arcade|drift|kart|pixel|retro|coin|speed|赛/i],
  ["paper", /art|draw|paint|sketch|toy|doodle|colou?r|craft|画|绘|玩/i],
  ["pollen", /kldex|durian|tropical|fruit|jungle|garden|farm|榴莲|热带/i],
  ["ink", /write|writing|word|letter|story|poem|chat|talk|note|字|文/i],
];

function semanticArchetype(hints: string): Archetype | null {
  for (const [archetype, re] of KEYWORD_RULES) {
    if (re.test(hints)) return archetype;
  }
  return null;
}


/** FNV-1a — small, stable, no dependencies. */
export function hashString(input: string): number {
  let h = 0x811c9dc5;
  for (let i = 0; i < input.length; i++) {
    h ^= input.charCodeAt(i);
    h = Math.imul(h, 0x01000193);
  }
  return h >>> 0;
}

/** Deterministic PRNG seeded by the hash. */
export function makeRng(seed: number) {
  let s = seed || 1;
  return () => {
    s |= 0;
    s = (s + 0x6d2b79f5) | 0;
    let t = Math.imul(s ^ (s >>> 15), 1 | s);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export interface WorldSpec {
  seed: number;
  archetype: Archetype;
  palette: Palette;
  name: string;
  /** 0..1 — drives per-world rhythm so no two capsules breathe in sync */
  tempo: number;
  /** gentle tilt direction on hover */
  tilt: number;
}

export function worldFor(key: string): WorldSpec {
  const seed = hashString(key);
  const archetype = ARCHETYPES[seed % ARCHETYPES.length];
  const rng = makeRng(seed);
  return {
    seed,
    archetype,
    palette: PALETTES[archetype],
    name: ARCHETYPE_NAME[archetype],
    tempo: 0.7 + rng() * 0.9,
    tilt: rng() > 0.5 ? 1 : -1,
  };
}
