"use client";
import { FilmCard } from "@/components/MovieCard/FilmCard";
import { trpc } from "@/trpc/trpc";

export default function CinemaPage() {
  const movies = trpc.movies.useQuery();
  const voteForMovie = trpc.vote.useMutation({
    onSuccess: movies.refetch,
  });

  if (!movies.data) return <div>Loading...</div>;
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Cinema Showcase</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {movies.data.map((film) => (
          <FilmCard
            key={film.imdbId}
            film={film}
            onVote={(voteType) =>
              voteForMovie.mutate({
                imdbId: film.imdbId,
                voteType: voteType,
              })
            }
          />
        ))}
      </div>
    </div>
  );
}
