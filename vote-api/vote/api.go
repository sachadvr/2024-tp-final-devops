package vote

import (
	"encoding/json"
	"log/slog"
	"net/http"
	"net/url"
)

func HandleRequests(writer http.ResponseWriter, request *http.Request) {
	if request.Method == http.MethodPost {
		handleJson(writer, request, HandlePost)
		return
	}
	if request.Method == http.MethodGet {
		handleJson(writer, request, HandleGet)
		return
	}

	writer.WriteHeader(http.StatusMethodNotAllowed)
}

func handleJson[T any](writer http.ResponseWriter, request *http.Request, handler func(r *http.Request) (T, error)) {
	response, err := handler(request)
	if err != nil {
		slog.Error("fail to handle post", slog.String("message", err.Error()))
		writer.WriteHeader(http.StatusInternalServerError)
	}
	writer.Header().Set("Content-Type", "application/json")
	writer.WriteHeader(http.StatusOK)

	err = json.NewEncoder(writer).Encode(response)
	if err != nil {
		writer.WriteHeader(http.StatusInternalServerError)
		slog.Error("fail to cast movies to JSON")
	}
}

type AddVoteBodyDto struct {
	MovieImdbId string `json:"imdbId"`
	VoteType    string `json:"voteType"`
}

func HandlePost(request *http.Request) (map[string]int, error) {

	var body AddVoteBodyDto
	err := json.NewDecoder(request.Body).Decode(&body)
	if err != nil {
		slog.Error("fail to cast movies to JSON", slog.String("message", err.Error()))
		return nil, err
	}

	err = InsertVote(Vote{
		ImdbId:   body.MovieImdbId,
		VoteType: body.VoteType,
	})
	if err != nil {
		slog.Error("fail to insert vote", slog.String("message", err.Error()))
		return nil, err
	}

	return GetVoteByMovieId(body.MovieImdbId)
}

func HandleGet(r *http.Request) (map[string]int, error) {
	u, _ := url.Parse(r.RequestURI)
	movieId := u.Query().Get("imdbId")

	votes, err := GetVoteByMovieId(movieId)
	if err != nil {
		slog.Error("fail to get votes", slog.String("message", err.Error()))
		return nil, err
	}

	return votes, nil
}
