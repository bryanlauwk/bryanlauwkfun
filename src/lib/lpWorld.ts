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
    base: "#040a12",
    haze: "#0d3d3f",
    far: "#0a2a34",
    mid: "#124a45",
    glow: "#63f6d0",
    spark: "#eafff6",
  },
  ink: {
    base: "#05060f",
    haze: "#241a4d",
    far: "#150f33",
    mid: "#2b1f63",
    glow: "#8b6cff",
    spark: "#e6e0ff",
  },
  paper: {
    base: "#0a0710",
    haze: "#3a2440",
    far: "#25182c",
    mid: "#4a2c3f",
    glow: "#ffc48a",
    spark: "#fff2e2",
  },
  mineral: {
    base: "#04070f",
    haze: "#1c3560",
    far: "#0f2246",
    mid: "#1e3a72",
    glow: "#7fb6ff",
    spark: "#f0f6ff",
  },
  arcade: {
    base: "#0b0410",
    haze: "#48114a",
    far: "#2b0a33",
    mid: "#5b1550",
    glow: "#ff67c3",
    spark: "#ffe9fb",
  },
  reef: {
    base: "#030c10",
    haze: "#0c4152",
    far: "#082a38",
    mid: "#0f4f5e",
    glow: "#57e0ff",
    spark: "#e8fbff",
  },
  cloud: {
    base: "#060810",
    haze: "#2b3358",
    far: "#1a2140",
    mid: "#39406b",
    glow: "#c9d6ff",
    spark: "#ffffff",
  },
  orbit: {
    base: "#0a0509",
    haze: "#4a2216",
    far: "#2e1410",
    mid: "#63301b",
    glow: "#ffb457",
    spark: "#fff0d6",
  },
};

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
