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

export type ProjectArchiveCategory = "games" | "interactive experiments" | "physical builds";

export function projectCategory(tag: string | null | undefined): ProjectArchiveCategory | null {
  const value = tag?.trim().toLowerCase() ?? "";
  if (!value) return null;
  if (["game", "games", "runner", "arcade"].includes(value)) return "games";
  if (["build", "physical build", "physical builds", "hardware", "robot", "toy", "prototype"].includes(value)) return "physical builds";
  if (["experiment", "experiments", "interactive", "interactive experiment", "interactive experiments", "sim", "simulation", "web", "tool", "art"].includes(value)) return "interactive experiments";
  return null;
}
