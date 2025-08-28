"use client";

import { motion } from "framer-motion";
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  Play,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import "swiper/css";
import "swiper/css/navigation";
import { Autoplay, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

type Movie = {
  id: string;
  title: string;
  duration: string;
  description: string;
  year: string;
  seasons?: string;
  rating?: number;
  genres: string[];
  tags: string[];
  starring: string[];
  backdrop: string;
  poster: string;
};

const containerVariants = {
  hidden: { opacity: 0, x: -40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.6,
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: -30 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
};

const movies: Movie[] = [
  {
    id: "vikings",
    title: "Vikings",
    duration: "2h : 30m",
    description:
      "As Ragnar Lodbrok, a Norse farmer, carries out triumphant raids into English territory...",
    year: "2025",
    seasons: "2 Seasons",
    rating: 4,
    genres: ["Adventure", "Drama", "History"],
    tags: ["Warrior", "Norse", "Conquest"],
    starring: ["Olivia Foster", "Leena Burton", "Ryan Pierce"],
    backdrop:
      "https://streamit-wordpress.iqonic.design/wp-content/uploads/2025/02/long.webp",
    poster:
      "https://streamit-wordpress.iqonic.design/wp-content/uploads/2025/02/gameofhero-portrait.webp",
  },
  {
    id: "toddler",
    title: "Toddler",
    duration: "1h 30m",
    description:
      "A heartwarming animated story about a young girl and her magical adventures...",
    year: "2025",
    seasons: "1h 30m",
    rating: 4,
    genres: ["Animation", "Family"],
    tags: ["Friendship", "Magic", "Journey"],
    starring: ["Emma Johnson", "Lucas Miller"],
    backdrop:
      "https://streamit-wordpress.iqonic.design/wp-content/uploads/2025/02/the-first-of-us.webp",
    poster:
      "https://streamit-wordpress.iqonic.design/wp-content/uploads/2025/02/the-first-of-us-portrait.webp",
  },
  {
    id: "dark-knight",
    title: "The Dark Knight",
    duration: "2h 32m",
    description:
      "Batman sets out to dismantle the remaining criminal organizations that plague Gotham...",
    year: "2008",
    seasons: "2h 32m",
    rating: 5,
    genres: ["Action", "Crime", "Drama"],
    tags: ["Joker", "Batman", "Chaos"],
    starring: ["Christian Bale", "Heath Ledger"],
    backdrop:
      "https://streamit-wordpress.iqonic.design/wp-content/uploads/2024/11/toddler.webp",
    poster:
      "https://streamit-wordpress.iqonic.design/wp-content/uploads/2024/11/toddler-portrait.webp",
  },
  {
    id: "inception",
    title: "Inception",
    duration: "2h 28m",
    description:
      "A skilled thief who steals corporate secrets through dream-sharing technology...",
    year: "2010",
    seasons: "2h 28m",
    rating: 5,
    genres: ["Sci-Fi", "Thriller"],
    tags: ["Dream", "Heist", "Subconscious"],
    starring: ["Leonardo DiCaprio", "Joseph Gordon-Levitt"],
    backdrop:
      "https://streamit-wordpress.iqonic.design/wp-content/uploads/2024/12/minions.webp",
    poster:
      "https://streamit-wordpress.iqonic.design/wp-content/uploads/2024/12/minions-portrait.webp",
  },
  {
    id: "dune",
    title: "Dune: Part Two",
    duration: "2h 46m",
    description:
      "Paul Atreides unites with Chani and the Fremen while seeking revenge against conspirators...",
    year: "2024",
    seasons: "2h 46m",
    rating: 4,
    genres: ["Sci-Fi", "Adventure"],
    tags: ["Sand", "Empire", "Prophecy"],
    starring: ["Timothée Chalamet", "Zendaya"],
    backdrop:
      "https://streamit-wordpress.iqonic.design/wp-content/uploads/2024/11/vikings.webp",
    poster:
      "https://streamit-wordpress.iqonic.design/wp-content/uploads/2024/11/vikings-portrait.webp",
  },
];

export default function HotSearchBannerSlider() {
  const [activeMovie, setActiveMovie] = useState<Movie>(movies[0]);

  return (
    <div className="relative w-full aspect-video md:aspect-[21/9] lg:aspect-[16/9] min-h-[400px] sm:min-h-[500px] md:min-h-[600px] bg-black text-white overflow-hidden">
      <div className="absolute inset-0 block 2xl:hidden">
        <Swiper
          modules={[Autoplay]}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          loop
          onSlideChange={(swiper) => setActiveMovie(movies[swiper.realIndex])}
          className="w-full h-full"
        >
          {movies.map((movie) => (
            <SwiperSlide key={movie.id}>
              <motion.div
                className="absolute inset-0 w-full h-full"
                style={{
                  backgroundImage: `url(${movie.backdrop})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/70 to-transparent" />
                <div className="absolute inset-0 bg-black/30" />
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <motion.div
        key={activeMovie.id}
        className="absolute inset-0 hidden 2xl:block"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        style={{
          backgroundImage: `url(${activeMovie.backdrop})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/70 to-transparent"></div>
      </motion.div>

      <div className="relative z-10 h-full flex items-center gap-10 px-6 lg:px-16">
        <div className="hidden 2xl:flex w-1/4 h-full flex-col justify-center bg-black/50 p-10">
          <Swiper
            slidesPerView={4}
            spaceBetween={20}
            direction="vertical"
            loop
            modules={[Autoplay]}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            onSlideChange={(swiper) => setActiveMovie(movies[swiper.realIndex])}
            className="h-fit"
          >
            {movies.map((movie) => (
              <SwiperSlide key={movie.id}>
                <motion.div
                  className={`relative cursor-pointer rounded-lg overflow-hidden transition-all ${
                    activeMovie.id === movie.id
                      ? "border-2 border-red-500 shadow-lg"
                      : "opacity-70 hover:opacity-100"
                  }`}
                  onClick={() => setActiveMovie(movie)}
                >
                  <img
                    src={movie.backdrop}
                    alt={movie.title}
                    className="w-full aspect-[16/9] object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                  <div className="absolute bottom-2 left-3 text-white">
                    <h4 className="font-semibold">{movie.title}</h4>
                    <p className="text-xs text-gray-300">{movie.duration}</p>
                  </div>
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        <motion.div
          key={activeMovie.title}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-lg sm:max-w-xl space-y-4 mb-8 sm:mb-10"
        >
          <motion.h1
            variants={itemVariants}
            className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold drop-shadow-lg leading-tight"
          >
            {activeMovie.title}
          </motion.h1>

          <motion.div
            variants={itemVariants}
            className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs sm:text-sm md:text-base text-gray-300"
          >
            {activeMovie.seasons && (
              <span className="px-2 sm:px-3 py-0.5 sm:py-1 bg-gray-800/70 rounded-full text-[10px] sm:text-xs md:text-sm">
                {activeMovie.seasons}
              </span>
            )}
            <span className="text-yellow-400 font-bold">
              ⭐ {activeMovie.rating}/5 IMDb
            </span>
            <span className="text-gray-400">{activeMovie.year}</span>
          </motion.div>

          <motion.p
            variants={itemVariants}
            className="text-gray-300 leading-relaxed line-clamp-3 text-sm sm:text-base md:text-lg"
          >
            {activeMovie.description}
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="text-xs sm:text-sm md:text-base space-y-1"
          >
            <p>
              <span className="font-semibold text-red-400">Tags:</span>{" "}
              {activeMovie.tags.join(", ")}
            </p>
            <p>
              <span className="font-semibold text-red-400">Genres:</span>{" "}
              {activeMovie.genres.join(", ")}
            </p>
            <p>
              <span className="font-semibold text-red-400">Starring:</span>{" "}
              {activeMovie.starring.join(", ")}
            </p>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Link
              href={`/watch/${activeMovie.id}`}
              className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 px-3 sm:px-5 py-1.5 sm:py-3 rounded-lg font-semibold transition shadow-lg text-sm sm:text-base md:text-lg"
            >
              <Play className="w-4 h-4 sm:w-5 sm:h-5" /> Play Now
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
