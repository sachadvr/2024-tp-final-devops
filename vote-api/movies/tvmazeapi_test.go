package movies

import (
	"net/http"
	"net/http/httptest"
	"reflect"
	"testing"
)

func TestGetMovieByImdbId(t *testing.T) {
	tests := []struct {
		name        string
		imdbId      string
		mockResp    string
		mockStatus  int
		expected    Movie
		expectError bool
	}{
		{
			name:   "successful request",
			imdbId: "tt1234567",
			mockResp: `{
				"name": "Test Movie",
				"externals": {"imdb": "tt1234567"},
				"image": {"medium": "http://example.com/image.jpg"},
				"premiered": "2020-01-01",
				"genres": ["Drama", "Comedy"],
				"summary": "Test summary"
			}`,
			mockStatus:  http.StatusOK,
			expectError: false,
			expected: Movie{
				Title:         "Test Movie",
				ImdbId:        "tt1234567",
				CoverImageUrl: "http://example.com/image.jpg",
				ReleaseDate:   "2020-01-01",
				Genres:        []string{"Drama", "Comedy"},
				Summary:       "Test summary",
			},
		},
		{
			name:        "server error",
			imdbId:      "tt1234567",
			mockStatus:  http.StatusInternalServerError,
			expectError: true,
		},
		{
			name:        "invalid response body",
			imdbId:      "tt1234567",
			mockResp:    `invalid json`,
			mockStatus:  http.StatusOK,
			expectError: true,
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			// Create test server
			server := httptest.NewServer(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
				// Verify request parameters
				if r.URL.Path != TvMazeShowsByIdUri {
					t.Errorf("Expected path %s, got %s", TvMazeShowsByIdUri, r.URL.Path)
				}
				if r.URL.Query().Get("imdb") != tt.imdbId {
					t.Errorf("Expected imdb ID %s, got %s", tt.imdbId, r.URL.Query().Get("imdb"))
				}

				w.WriteHeader(tt.mockStatus)
				_, _ = w.Write([]byte(tt.mockResp))
			}))
			defer server.Close()

			// Override base URL for testing
			originalBaseURL := TvMazeApiBaseUrl
			TvMazeApiBaseUrl = server.URL
			defer func() { TvMazeApiBaseUrl = originalBaseURL }()

			// Call the function
			result, err := GetMovieByImdbId(tt.imdbId)

			// Check error
			if (err != nil) != tt.expectError {
				t.Errorf("GetMovieByImdbId() error = %v, expectError = %v", err, tt.expectError)
				return
			}

			// If we're expecting an error, no need to check the result
			if tt.expectError {
				return
			}

			// Check result
			if !reflect.DeepEqual(result, tt.expected) {
				t.Errorf("GetMovieByImdbId() = %v, want %v", result, tt.expected)
			}
		})
	}
}

func TestTvMazeMovieDto_toDomain(t *testing.T) {
	dto := TvMazeMovieDto{
		Name: "Test Movie",
		Externals: struct {
			Tvrage  any    "json:\"tvrage\""
			Thetvdb int    "json:\"thetvdb\""
			Imdb    string "json:\"imdb\""
		}{
			Imdb: "tt1234567",
		},
		Image: struct {
			Medium   string "json:\"medium\""
			Original string "json:\"original\""
		}{
			Medium: "http://example.com/image.jpg",
		},
		Premiered: "2020-01-01",
		Genres:    []string{"Drama", "Comedy"},
		Summary:   "Test summary",
	}

	expected := Movie{
		Title:         "Test Movie",
		ImdbId:        "tt1234567",
		CoverImageUrl: "http://example.com/image.jpg",
		ReleaseDate:   "2020-01-01",
		Genres:        []string{"Drama", "Comedy"},
		Summary:       "Test summary",
	}

	result := dto.toDomain()

	if !reflect.DeepEqual(result, expected) {
		t.Errorf("toDomain() = %v, want %v", result, expected)
	}
}
