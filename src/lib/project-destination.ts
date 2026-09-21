/** Use native links for launch, modifier keys and browser history. */
export function projectDestination(href: string | null | undefined): string | null {
  const value = href?.trim();
  if (!value) return null;
  try {
    const url = new URL(value);
    return ["https:", "http:"].includes(url.protocol) ? url.href : null;
  } catch {
    return null;
  }
}

export function projectCategory(tag: string | null | undefined): string {
  const value = tag?.trim().toLowerCase() ?? "";
  return ({ game: "games", toy: "toys", experiment: "experiments", sim: "simulation" } as Record<string, string>)[value] ?? value;
}
