import { getAllMovies, Movie } from "@/lib/utils";
import { MetadataRoute } from "next";


export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  try {
    const movies = await getAllMovies();
    if (!Array.isArray(movies)) return [];

    return movies.map((m) => ({
      url: `https://ro-phim.com/movies/${m.slug}`,
      lastModified: new Date(m.updatedAt),
    }));
  } catch (err) {
    console.error("Sitemap fetch error:", err);
    return []; 
  }
}