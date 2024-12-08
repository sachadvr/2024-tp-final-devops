import { describe, it, expect, vi, beforeEach, Mock } from "vitest";
import { getMovies, voteForMovie, getMovieVotes } from "./voteApi";
import { Film } from "@/core/film";
import { Vote } from "@/core/vote";

const MOCK_API_BASE_URL = "http://localhost:8080";

const MOCK_MOVIE_DTO = {
  title: "Test Movie",
  imdbId: "tt1234567",
  coverImageUrl: "https://example.com/image.jpg",
  releaseDate: "2023-01-01",
  genres: ["Action", "Drama"],
  summary: "Test summary",
  votes: {
    heart: 1,
    thumbUp: 2,
    thumbDown: 3,
    star: 4,
    sleeping: 5,
  },
};

const EXPECTED_MOVIE: Film = {
  ...MOCK_MOVIE_DTO,
  imdbUrl: `https://www.imdb.com/title/${MOCK_MOVIE_DTO.imdbId}`,
};

const MOCK_VOTES: Vote[] = ["heart", "star", "thumbUp"];

describe("voteApi", () => {
  beforeEach(() => {
    vi.resetAllMocks();
    // Reset fetch mock before each test
    global.fetch = vi.fn();
  });

  describe("getMovies", () => {
    it("should fetch movies and transform them correctly", async () => {
      // Mock fetch response
      (global.fetch as Mock).mockResolvedValueOnce({
        json: () => Promise.resolve([MOCK_MOVIE_DTO]),
      });

      const result = await getMovies();

      expect(global.fetch).toHaveBeenCalledWith(
        `${MOCK_API_BASE_URL}/movies`,
        expect.objectContaining({
          method: "GET",
        }),
      );

      expect(result).toEqual([EXPECTED_MOVIE]);
    });

    it("should handle API errors properly", async () => {
      (global.fetch as Mock).mockRejectedValueOnce(new Error("API Error"));

      await expect(getMovies()).rejects.toThrow("Failed to call vote api");
    });
  });

  describe("voteForMovie", () => {
    const MOCK_MOVIE_ID = "tt1234567";
    const MOCK_VOTE_TYPE: Vote = "heart";

    it("should send vote request correctly", async () => {
      (global.fetch as Mock).mockResolvedValueOnce({
        json: () => Promise.resolve({}),
      });

      await voteForMovie(MOCK_MOVIE_ID, MOCK_VOTE_TYPE);

      expect(global.fetch).toHaveBeenCalledWith(
        `${MOCK_API_BASE_URL}/votes`,
        expect.objectContaining({
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            imdbId: MOCK_MOVIE_ID,
            voteType: MOCK_VOTE_TYPE,
          }),
        }),
      );
    });

    it("should handle voting errors properly", async () => {
      (global.fetch as Mock).mockRejectedValueOnce(new Error("Vote Error"));

      await expect(voteForMovie(MOCK_MOVIE_ID, MOCK_VOTE_TYPE)).rejects.toThrow(
        "Failed to call vote api",
      );
    });
  });

  describe("getMovieVotes", () => {
    const MOCK_MOVIE_ID = "tt1234567";

    it("should fetch movie votes correctly", async () => {
      (global.fetch as Mock).mockResolvedValueOnce({
        json: () => Promise.resolve(MOCK_VOTES),
      });

      const result = await getMovieVotes(MOCK_MOVIE_ID);

      expect(global.fetch).toHaveBeenCalledWith(
        `${MOCK_API_BASE_URL}/votes?imdbId=${MOCK_MOVIE_ID}`,
        expect.objectContaining({
          method: "GET",
        }),
      );

      expect(result).toEqual(MOCK_VOTES);
    });

    it("should handle get votes errors properly", async () => {
      (global.fetch as Mock).mockRejectedValueOnce(
        new Error("Get Votes Error"),
      );

      await expect(getMovieVotes(MOCK_MOVIE_ID)).rejects.toThrow(
        "Failed to call vote api",
      );
    });
  });

  describe("API call edge cases", () => {
    it("should handle empty response properly", async () => {
      (global.fetch as Mock).mockResolvedValueOnce({
        json: () => Promise.resolve([]),
      });

      const result = await getMovies();
      expect(result).toEqual([]);
    });

    it("should handle malformed JSON response", async () => {
      (global.fetch as Mock).mockResolvedValueOnce({
        json: () => Promise.reject(new Error("Invalid JSON")),
      });

      await expect(getMovies()).rejects.toThrow("Failed to call vote api");
    });

    it("should handle network errors", async () => {
      (global.fetch as Mock).mockRejectedValueOnce(new Error("Network error"));

      await expect(getMovies()).rejects.toThrow("Failed to call vote api");
    });
  });
});
