import { render, screen, fireEvent } from "@testing-library/react";
import { FilmCard, FilmCardProps } from "./FilmCard";
import { Film } from "@/core/film";
import { Vote } from "@/core/vote";
import { vi, describe, it, beforeEach, expect } from "vitest";

const MOCK_FILM: Film = {
  title: "Test Movie",
  imdbId: "tt1234567",
  imdbUrl: "https://www.imdb.com/title/tt1234567",
  coverImageUrl: "https://example.com/image.jpg",
  releaseDate: "2023-01-01",
  genres: ["Action", "Drama"],
  summary: "<p>Test summary</p>",
  votes: {
    heart: 1,
    thumbUp: 2,
    thumbDown: 3,
    star: 4,
    sleeping: 5,
  },
};

const VOTE_BUTTONS = {
  heart: "heart",
  thumbUp: "thumbUp",
  thumbDown: "thumbDown",
  star: "star",
  sleeping: "sleeping",
} as const;

describe("FilmCard", () => {
  const defaultProps: FilmCardProps = {
    film: MOCK_FILM,
    onVote: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should render film title as a link", () => {
    render(<FilmCard {...defaultProps} />);
    const titleLink = screen.getByRole("link", { name: MOCK_FILM.title });

    expect(titleLink).toBeInTheDocument();
    expect(titleLink).toHaveAttribute("href", MOCK_FILM.imdbUrl);
    expect(titleLink).toHaveAttribute("target", "_blank");
  });

  it("should render film cover image", () => {
    render(<FilmCard {...defaultProps} />);
    const image = screen.getByAltText(`${MOCK_FILM.title} cover`);

    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute(
      "src",
      expect.stringContaining(encodeURIComponent(MOCK_FILM.coverImageUrl)),
    );
  });

  it("should render release date", () => {
    render(<FilmCard {...defaultProps} />);
    expect(
      screen.getByText(`Released: ${MOCK_FILM.releaseDate}`),
    ).toBeInTheDocument();
  });

  it("should render all genres", () => {
    render(<FilmCard {...defaultProps} />);
    MOCK_FILM.genres.forEach((genre) => {
      expect(screen.getByText(genre)).toBeInTheDocument();
    });
  });

  it("should render all vote buttons with correct counts", () => {
    render(<FilmCard {...defaultProps} />);

    Object.entries(MOCK_FILM.votes).forEach(([, count]) => {
      const button = screen.getByRole("button", {
        name: new RegExp(count.toString()),
      });
      expect(button).toBeInTheDocument();
    });
  });

  it.each(Object.values(VOTE_BUTTONS))(
    "should call onVote when %s button is clicked",
    (voteType: Vote) => {
      render(<FilmCard {...defaultProps} />);

      const voteCount = MOCK_FILM.votes[voteType];
      const button = screen.getByRole("button", {
        name: new RegExp(voteCount.toString()),
      });

      fireEvent.click(button);

      expect(defaultProps.onVote).toHaveBeenCalledTimes(1);
      expect(defaultProps.onVote).toHaveBeenCalledWith(voteType);
    },
  );
});
