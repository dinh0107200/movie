import { normalizeImage } from "@/lib/utils";
import { apiGet } from "./axiosClient";


export interface Movie {
  id: string;
  name: string;
  slug: string;
  poster_url: string;
  thumb_url: string;
  year: number;
  episode_current: string;
}


export interface EpisodeSource {
  name: string;
  filename?: string | null;
  link_embed?: string | null;
  link_m3u8?: string | null;
}

export interface EpisodeServer {
  server_name: string;
  server_data: EpisodeSource[];
}


export interface MovieDetail {
  id: string;
  name: string;
  slug: string;
  origin_name?: string;
  year?: number;
  time?: string;
  quality?: string;
  lang?: string;
  type?: string;
  episode_current?: string;
  content?: string;
  trailer_url?: string | null;
  poster_url: string;
  thumb_url: string;
  rating?: number | null;
  category?: Array<{ id?: string; name: string; slug?: string }>;
  country?: Array<{ id?: string; name: string; slug?: string }>;
  actor?: string[];
  director?: string[];
  episodes?: EpisodeServer[];
}


function toStringArray(val: unknown): string[] {
  if (Array.isArray(val)) return val.filter(Boolean).map(String);
  if (typeof val === "string") {
    return val.split(/[,|]/).map(s => s.trim()).filter(Boolean);
  }
  return [];
}

export class MovieService {
  async getMoviesByType(apiPath: string, page = 1, limit = 30) {
    const q = `?page=${page}&limit=${limit}`;
    const data = await apiGet<any>(`${apiPath}${q}`, {
      baseKey: "phim_v1", 
    });

    const items = data?.data?.items ?? data?.items ?? [];
    return items.map((item: any) => ({
      id: item._id || item.id,
      name: item.name,
      slug: item.slug,
      poster_url: normalizeImage(item.poster_url),
      thumb_url: normalizeImage(item.thumb_url),
      year: Number(item.year) || 0,
      episode_current: String(item.episode_current ?? ""),
    }));
  }

  async searchMovies(keyword: string, page = 1, limit = 30) {
    if (!keyword.trim()) return [];

    const q = `?keyword=${encodeURIComponent(keyword)}&page=${page}&limit=${limit}`;
    const data = await apiGet<any>(`/tim-kiem${q}`, {
       baseKey: "phim_v1", 
    });

    const items = data?.data?.items ?? data?.items ?? [];
    return items.map((item: any) => ({
      id: item._id || item.id,
      name: item.name,
      slug: item.slug,
      poster_url: normalizeImage(item.poster_url),
      thumb_url: normalizeImage(item.thumb_url),
      year: Number(item.year) || 0,
      episode_current: String(item.episode_current ?? ""),
    }));
  }
}
export class MovieDetailService {
  async getMovieDetail(slug: string): Promise<MovieDetail | null> {
    const safe = encodeURIComponent(slug.trim());
    const body = await apiGet<any>(`/phim/${safe}`, { fallbackBases: ["phim_v1"] });

    const movie = body?.movie ?? body?.data ?? body;
    const episodesRaw: any[] = body?.episodes ?? body?.episode ?? [];
    if (!movie) return null;

    // Gán đầy đủ field của MovieDetail
    const detail: MovieDetail = {
      id: movie._id || movie.id || movie.slug || safe,
      name: movie.name ?? movie.title ?? "",
      slug: movie.slug ?? safe,
      origin_name: movie.origin_name,
      year: Number(movie.year) || undefined,
      time: movie.time,
      quality: movie.quality,
      lang: movie.lang,
      type: movie.type,
      episode_current: movie.episode_current ?? movie.episode_total,
      content: movie.content ?? movie.description,
      trailer_url: movie.trailer_url ?? movie.trailer ?? null,

      poster_url: normalizeImage(movie.poster_url),
      thumb_url: normalizeImage(movie.thumb_url),

      rating: typeof movie.rating === "number" ? movie.rating : Number(movie.rating) || null,
      category: movie.category ?? movie.categories ?? [],
      country: movie.country ?? movie.countries ?? [],
      actor: toStringArray(movie.actor ?? movie.actors),
      director: toStringArray(movie.director ?? movie.directors),

      episodes: Array.isArray(episodesRaw)
        ? episodesRaw.map((sv: any): EpisodeServer => ({
            server_name: sv?.server_name ?? sv?.name ?? "Server",
            server_data: Array.isArray(sv?.server_data)
              ? sv.server_data.map((ep: any) => ({
                  name: ep?.name ?? ep?.episode ?? "Tập",
                  filename: ep?.filename ?? null,
                  link_embed: ep?.link_embed ?? null,
                  link_m3u8: ep?.link_m3u8 ?? ep?.link_m3U8 ?? null,
                }))
              : [],
          }))
        : [],
    };

    return detail;
  }
}


export const movieDetailService = new MovieDetailService();
export const movieService = new MovieService();
