import { Film } from "@/core/film";
import Image from "next/image";
import { Heart, Moon, Star, ThumbsDown, ThumbsUp } from "lucide-react";
import { Vote } from "@/core/vote";

export type FilmCardProps = {
  film: Film;
  onVote: (voteType: Vote) => void;
};

export function FilmCard({ film, onVote }: FilmCardProps) {
  const votes = film.votes;

  const handleVote = (type: Vote) => {
    onVote(type);
  };

  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden">
      <Image
        src={film.coverImageUrl}
        alt={`${film.title} cover`}
        width={300}
        height={450}
        className="w-full object-cover h-64"
      />
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-2">
          <a
            href={film.imdbUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            {film.title}
          </a>
        </h2>
        <p className="text-gray-600 mb-2">Released: {film.releaseDate}</p>
        <div className="flex flex-wrap gap-2 mb-2">
          {film.genres.map((genre, index) => (
            <span
              key={index}
              className="bg-gray-200 text-gray-700 px-2 py-1 rounded text-sm"
            >
              {genre}
            </span>
          ))}
        </div>
        <div
          className="text-gray-700 mb-4"
          dangerouslySetInnerHTML={{ __html: film.summary }}
        />
        <div className="flex justify-between items-center">
          <button
            onClick={() => handleVote("heart")}
            className="text-red-500 hover:text-red-600"
          >
            <Heart className="inline mr-1" /> {votes.heart}
          </button>
          <button
            onClick={() => handleVote("thumbUp")}
            className="text-green-500 hover:text-green-600"
          >
            <ThumbsUp className="inline mr-1" /> {votes.thumbUp}
          </button>
          <button
            onClick={() => handleVote("thumbDown")}
            className="text-yellow-500 hover:text-yellow-600"
          >
            <ThumbsDown className="inline mr-1" /> {votes.thumbDown}
          </button>
          <button
            onClick={() => handleVote("star")}
            className="text-purple-500 hover:text-purple-600"
          >
            <Star className="inline mr-1" /> {votes.star}
          </button>
          <button
            onClick={() => handleVote("sleeping")}
            className="text-blue-500 hover:text-blue-600"
          >
            <Moon className="inline mr-1" /> {votes.sleeping}
          </button>
        </div>
      </div>
    </div>
  );
}
