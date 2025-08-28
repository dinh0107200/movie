import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
export type Movie = {
  slug: string;
  updatedAt: string;
};
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
export function normalizeImage(url?: string | null) {
  if (!url) return "/no-image.jpg";

  if (/^https?:\/\//i.test(url)) {
    return url;
  }
  const path = url.replace(/^\/+/, "");
  const full = `https://phimimg.com/${path}`;
  return full;
}


function extractIframeSrc(html: string): string | null {
  if (!html) return null;
  const m = html.match(/<iframe[^>]+src=["']([^"']+)["']/i);
  return m ? m[1] : null;
}

function toYouTubeEmbed(url: string): string | null {
  const watch = url.match(/youtube\.com\/watch\?v=([^&]+)/i);
  if (watch) return `https://www.youtube.com/embed/${watch[1]}`;

  const short = url.match(/youtu\.be\/([^?]+)/i);
  if (short) return `https://www.youtube.com/embed/${short[1]}`;

  if (/youtube\.com\/embed\//i.test(url)) return url;

  return null;
}

function withAutoplay(u: string, extra: Record<string, string | number> = {}) {
  try {
    const url = new URL(u);
    url.searchParams.set('autoplay', '1');
    if (url.hostname.includes('youtube.com')) url.searchParams.set('rel', '0');
    Object.entries(extra).forEach(([k, v]) => url.searchParams.set(k, String(v)));
    return url.toString();
  } catch {
    return u + (u.includes('?') ? '&' : '?') + 'autoplay=1';
  }
}

export function normalizeTrailer(input?: string | null): string | null {
  if (!input) return null;

  const trimmed = input.trim();

  if (trimmed.startsWith('<')) {
    const src = extractIframeSrc(trimmed);
    return src ? withAutoplay(src) : null;
  }

  const yt = toYouTubeEmbed(trimmed);
  if (yt) return withAutoplay(yt);

  return withAutoplay(trimmed);
}




export function fixApiPath(path: string) {
  const p = `/${path}`.replace(/\/+/g, "/");
  if (p.startsWith("/v1/api/")) return p;
  const NEED_PREFIX = [/^\/danh-sach\//i, /^\/the-loai(\/|$)/i, /^\/quoc-gia(\/|$)/i, /^\/tim-kiem(\/|$)/i];
  if (NEED_PREFIX.some((re) => re.test(p))) {
    return `/v1/api${p}`;
  }
  return p;
}


export async function getAllMovies(): Promise<Movie[]> {
  const res = await fetch("https://phimapi.com/movies", {
    next: { revalidate: 3600 }, 
  });

  if (!res.ok) {
    throw new Error("Failed to fetch movies");
  }

  const data = await res.json();


  return Array.isArray(data)
    ? data
    : Array.isArray(data.items)
    ? data.items
    : [];
}