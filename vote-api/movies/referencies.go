package movies

const (
	ArcaneImdbId = "tt11126994"
)

type Movie struct {
	Title         string   `json:"title"`
	ImdbId        string   `json:"imdbId"`
	CoverImageUrl string   `json:"coverImageUrl"`
	ReleaseDate   string   `json:"releaseDate"`
	Genres        []string `json:"genres"`
	Summary       string   `json:"summary"`
}
