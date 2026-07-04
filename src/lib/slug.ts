export function slugify(input: string): string {
  return input
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "") // strip diacritics
    .replace(/[^a-z0-9\s-]/g, "") // drop non-latin (CJK etc.)
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

/** Fallback slug if title is entirely non-latin — use last 8 chars of id. */
export function slugFor(project: { id: string; title: string }): string {
  const s = slugify(project.title);
  return s.length > 0 ? s : `drop-${project.id.slice(0, 8)}`;
}
