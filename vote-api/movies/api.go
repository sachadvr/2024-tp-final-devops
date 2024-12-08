package movies

import (
	"encoding/json"
	"github.com/Anthony-Jhoiro/devops-tp-final/vote-api/vote"
	"log/slog"
	"net/http"
)

var ChosenSeriesImdbIds = []string{
	"tt0441059",  // Kaamelott
	"tt11126994", // Arcane
	"tt0386676",  // The office US
	"tt0944947",  // GOT
	"tt0903747",  // Breaking Bad
	"tt2560140",  // Snk
	"tt1606375",  // Downton abbey
}

func HandleRequests(writer http.ResponseWriter, request *http.Request) {
	if request.Method == http.MethodGet {
		movies := HandleGet()
		writer.Header().Set("Content-Type", "application/json")
		writer.WriteHeader(http.StatusOK)

		err := json.NewEncoder(writer).Encode(movies)
		if err != nil {
			slog.Error("fail to cast movies to JSON")
			return
		}
		return
	}

	writer.WriteHeader(http.StatusMethodNotAllowed)
}

type MovieDto struct {
	Title         string         `json:"title"`
	ImdbId        string         `json:"imdbId"`
	CoverImageUrl string         `json:"coverImageUrl"`
	ReleaseDate   string         `json:"releaseDate"`
	Genres        []string       `json:"genres"`
	Summary       string         `json:"summary"`
	Votes         map[string]int `json:"votes"`
}

func buildMovieDto(movie Movie, votes map[string]int) MovieDto {
	return MovieDto{
		Title:         movie.Title,
		ImdbId:        movie.ImdbId,
		CoverImageUrl: movie.CoverImageUrl,
		ReleaseDate:   movie.ReleaseDate,
		Genres:        movie.Genres,
		Summary:       movie.Summary,
		Votes:         votes,
	}
}

func HandleGet() []MovieDto {
	movies := make([]MovieDto, 0, len(ChosenSeriesImdbIds))

	for _, imdbId := range ChosenSeriesImdbIds {
		movie, err := GetMovieByImdbId(imdbId)
		if err != nil {
			slog.Error("Error while getting movie", slog.String("imdbId", imdbId), slog.String("error", err.Error()))
		}

		votes, err := vote.GetVoteByMovieId(imdbId)
		if err != nil {
			slog.Error("Error while getting movie votes", slog.String("imdbId", imdbId), slog.String("error", err.Error()))
		}

		movies = append(movies, buildMovieDto(movie, votes))
	}
	return movies
}
