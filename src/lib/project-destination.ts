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

