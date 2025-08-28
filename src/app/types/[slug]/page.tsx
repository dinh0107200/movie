"use client";
import React from "react";
import { useParams } from "next/navigation";
import { MovieService } from "@/services/apiService";
import { apiGet } from "@/services/axiosClient";
import { Loader2 } from "lucide-react";

type ApiMovie = {
    id: string;
    name: string;
    slug: string;
    poster_url: string;
    thumb_url: string;
    year: number;
    episode_current: string;
};

function Breadcrumb({ title }: { title: string }) {
    return (
        <div className="border-b border-white/10 bg-gradient-to-b from-white/5 to-transparent">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
                <h1 className="mt-2 text-2xl sm:text-3xl font-bold text-white">{title}</h1>
            </div>
        </div>
    );
}

function MovieCard({ movie }: { movie: ApiMovie }) {
    const poster = movie.poster_url || movie.thumb_url;
    return (
        <article className="group relative overflow-hidden rounded-2xl bg-white/5 ring-1 ring-white/10 shadow-lg">
            <div className="aspect-[2/3] w-full overflow-hidden">
                <img
                    src={poster}
                    alt={movie.name}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    loading="lazy"
                />
            </div>

            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-80" />

            <div className="absolute inset-x-0 bottom-0 p-4">
                <h3 className="text-white font-semibold text-base line-clamp-1">{movie.name}</h3>
                <div className="mt-1 flex items-center gap-2 text-white/70 text-xs">
                    <span>{movie.year || "—"}</span>
                    <span>•</span>
                    <span className="truncate">{movie.episode_current || ""}</span>
                </div>
                <div className="mt-3">
                    <a
                        href={`/movies/${movie.slug}`}
                        className="inline-flex items-center gap-2 rounded-lg bg-emerald-500 px-3 py-2 text-sm font-medium text-white shadow transition hover:brightness-110"
                    >
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" className="opacity-90">
                            <path d="M4 3l9 5-9 5V3z" />
                        </svg>
                        Xem ngay
                    </a>
                </div>
            </div>
        </article>
    );
}

export default function MoviesPage() {
    const params = useParams<{ slug: string }>();
    const slug = Array.isArray(params?.slug) ? params.slug[0] : params?.slug; 
    const [movies, setMovies] = React.useState<ApiMovie[]>([]);
    const [page, setPage] = React.useState(1);
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState<string | null>(null);
    const [categoryTitle, setCategoryTitle] = React.useState<string>("Movies");
    React.useEffect(() => {
        setMovies([]);
        setPage(1);
        setError(null);
    }, [slug]);

    React.useEffect(() => {
        if (!slug) return;
        const run = async () => {
            try {
                setLoading(true);
                const res = await apiGet<any>(`/danh-sach/${slug}?page=${page}&limit=15`, { baseKey: "phim_v1" });
                const data = res?.data ?? {};

                setCategoryTitle(data.titlePage || slug);

                const items = data.items?.map((item: any) => ({
                    id: item._id || item.id,
                    name: item.name,
                    slug: item.slug,
                    poster_url: item.poster_url ? `https://phimimg.com/${item.poster_url}` : "",
                    thumb_url: item.thumb_url ? `https://phimimg.com/${item.thumb_url}` : "",
                    year: Number(item.year) || 0,
                    episode_current: item.episode_current || "",
                })) ?? [];

                setMovies((prev) => (page === 1 ? items : [...prev, ...items]));
            } catch (e: any) {
                setError(e?.message ?? "Load thất bại");
            } finally {
                setLoading(false);
            }
        };

        run();
    }, [slug, page]);

    const canLoadMore = movies.length > 0 && !loading;

    return (
        <div className="min-h-screen pb-6 bg-gradient-to-b from-slate-950 via-slate-900 to-black text-white">
            <Breadcrumb title={slug ? `Thể loại: ${categoryTitle}` : "Movies"} />

            <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
                {error && <div className="mb-4 text-sm text-red-300">{error}</div>}
                {loading && movies.length === 0 && (
                    <div className="py-16 text-center text-white/70"><Loader2 className="h-10 w-10 animate-spin text-red-500" /></div>
                )}

                <section>
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6">
                        {movies.map((m) => (
                            <MovieCard key={m.id} movie={m} />
                        ))}
                    </div>

                    {!loading && movies.length === 0 && !error && (
                        <div className="py-20 text-center text-white/70">Không có phim.</div>
                    )}

                    <div className="mt-10 flex justify-center">
                        <button
                            onClick={() => setPage((p) => p + 1)}
                            className="px-6 py-3 rounded-xl bg-white/10 text-white/90 hover:bg-white/20 ring-1 ring-white/15 disabled:opacity-50 cursor-pointer"
                            disabled={loading || !canLoadMore}
                        >
                            {loading ? <Loader2 className="h-10 w-10 animate-spin text-red-500" /> : "Tải thêm"}
                        </button>
                    </div>
                </section>
            </main>
        </div>
    );
}
