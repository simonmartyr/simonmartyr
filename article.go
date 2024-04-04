package main

import (
	"encoding/json"
	"net/http"
)

type Article struct {
	Title              string `json:"title"`
	Description        string `json:"description"`
	CanonicalUrl       string `json:"canonical_url"`
	PublishedTimestamp string `json:"published_timestamp"`
	Image              string `json:"social_image"`
}

const devUrl = "https://dev.to/api/articles?username=simonmartyr&per_page=1"

func (readme *ReadmeContent) GetLatestArticles() *[]Article {
	res, _ := http.Get(devUrl)
	defer res.Body.Close()
	var jsonResponse []Article
	decodeErr := json.NewDecoder(res.Body).Decode(&jsonResponse)
	if decodeErr != nil {
		panic(decodeErr)
	}
	return &jsonResponse
}
