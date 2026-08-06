/**
 * Nine painted spheres live inside a single painting. Each archive capsule
 * crops one sphere out of that shared source, so the whole archive costs a
 * single image request.
 */
export const CAPSULE_SOURCE = { w: 1774, h: 887 } as const;

export interface Sphere {
  /** centre + radius of the sphere in source-image pixels */
  cx: number;
  cy: number;
  r: number;
  /** title matcher for the real project this sphere belongs to */
  match: RegExp;
}

export const SPHERES: Sphere[] = [
  { cx: 262, cy: 252, r: 167, match: /马年|新年歌|cny/i },
  { cx: 660, cy: 260, r: 140, match: /elemental|block/i },
  { cx: 975, cy: 250, r: 100, match: /cartridge|pod/i },
  { cx: 1240, cy: 250, r: 118, match: /zus|coffee/i },
  { cx: 1530, cy: 290, r: 150, match: /kldex/i },
  { cx: 367, cy: 555, r: 140, match: /kitchen/i },
  { cx: 800, cy: 555, r: 200, match: /inflation|chart/i },
  { cx: 1147, cy: 590, r: 117, match: /badminton/i },
  { cx: 1405, cy: 620, r: 125, match: /artoy|toy/i },
];

/**
 * Position the shared painting inside a square, circular window so the given
 * sphere fills it. Returned as inline styles for an absolutely placed <img>.
 */
export function sphereStyle(s: Sphere): React.CSSProperties {
  const { w, h } = CAPSULE_SOURCE;
  const zoom = w / (s.r * 2); // container width == sphere diameter
  const widthPct = zoom * 100;
  const left = 50 - (s.cx / w) * widthPct;
  // container is square, so vertical percentages are relative to its width
  const top = 50 - (s.cy / h) * widthPct * (h / w);
  return {
    width: `${widthPct}%`,
    left: `${left}%`,
    top: `${top}%`,
    maxWidth: "none",
  };
}

/** Pair the nine spheres with the nine real archive projects, order-stable. */
export function pairSpheres<T extends { title: string }>(projects: T[]) {
  const pool = [...projects];
  const pairs: Array<{ sphere: Sphere; project: T }> = [];
  const leftovers: Sphere[] = [];

  for (const sphere of SPHERES) {
    const i = pool.findIndex((p) => sphere.match.test(p.title));
    if (i >= 0) pairs.push({ sphere, project: pool.splice(i, 1)[0] });
    else leftovers.push(sphere);
  }
  // any project without a semantic home still gets a capsule
  leftovers.forEach((sphere) => {
    const project = pool.shift();
    if (project) pairs.push({ sphere, project });
  });

  return pairs;
}
