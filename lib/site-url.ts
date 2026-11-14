export function siteOrigin(): string | undefined {
  const raw = process.env.NEXT_PUBLIC_SITE_URL?.trim().replace(/\/$/, "");
  if (!raw) return undefined;
  try {
    const url = new URL(raw);
    if (url.protocol !== "http:" && url.protocol !== "https:") return undefined;
    return url.origin;
  } catch {
    return undefined;
  }
}

export function absoluteUrl(path: string) {
  const origin = siteOrigin();
  const normalised = path.startsWith("/") ? path : `/${path}`;
  return origin ? `${origin}${normalised}` : normalised;
}
