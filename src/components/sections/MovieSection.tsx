"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Play } from "lucide-react";
import Link from "next/link";
import { movieService } from "@/services/apiService";

const sectionsConfig = [
  { title: "Phim bộ", slug: "phim-bo", api: "/danh-sach/phim-bo" },
  { title: "Phim lẻ", slug: "phim-le", api: "/danh-sach/phim-le" },
  { title: "Phim hoạt hình", slug: "hoat-hinh", api: "/danh-sach/hoat-hinh" },
  { title: "TV Show", slug: "tv-shows", api: "/danh-sach/tv-shows" },
  { title: "Phim 18+", slug: "phim-18", api: "/the-loai/phim-18" },
];

type MovieSectionProps = {
  title: string;
  movies: Movie[];
  slug: string;
  api: string;
};

interface Movie {
  id: string;
  name: string;
  slug: string;
  poster_url: string;
  thumb_url: string;
  year: number;
  episode_current: string;
}

const MovieSection = ({ title, movies, slug, api }: MovieSectionProps) => {
  const href = api.startsWith("/the-loai")
    ? `/categories/${slug}`
    : `/types/${slug}`;

  return (
    <div className="mb-12">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl sm:text-3xl font-bold text-red-500">{title}</h2>
        <Link
          href={href}
          className="text-sm sm:text-base text-red-500 hover:underline"
        >
          Xem thêm →
        </Link>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-4">
        {movies.map((movie, i) => (
          <Link key={movie.slug || i} href={`/movies/${movie.slug}`}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="relative group cursor-pointer rounded-lg overflow-hidden"
            >
              <img
                src={movie.thumb_url || movie.poster_url}
                alt={movie.name}
                className="w-full aspect-[0.7] object-cover transition-transform duration-300 group-hover:scale-110"
              />

              {movie.episode_current && (
                <span className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-0.5 rounded">
                  {movie.episode_current}
                </span>
              )}

              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition flex flex-col items-center justify-center text-center p-2">
                <h3 className="text-white font-semibold text-sm sm:text-base line-clamp-2 mb-2">
                  {movie.name}
                </h3>
                <button className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-xl text-sm font-bold transition cursor-pointer">
                  <Play size={16} /> Xem ngay
                </button>
              </div>
            </motion.div>
          </Link>
        ))}
      </div>
    </div>
  );
};


export default function MovieCategories() {
  const [sections, setSections] = useState<{ title: string; slug: string; movies: Movie[] , api: string }[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await Promise.all(
        sectionsConfig.map(async (sec) => ({
          ...sec,
          movies: await movieService.getMoviesByType(sec.api, 1, 12),
        }))
      );
      setSections(data);
    };

    fetchData();
  }, []);

  return (
    <div className="px-4 sm:px-8 py-8">
      {sections.map((sec) => (
        <MovieSection key={sec.title} title={sec.title} movies={sec.movies} slug={sec.slug} api={sec.api} />
      ))}
    </div>
  );
}
