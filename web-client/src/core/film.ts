import { Vote } from "@/core/vote";

export interface Film {
  title: string;
  imdbId: string;
  imdbUrl: string;
  coverImageUrl: string;
  releaseDate: string;
  genres: string[];
  summary: string;
  votes: Record<Vote, number>;
}
