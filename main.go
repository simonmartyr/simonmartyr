package main

import (
	"net/http"
	"sync"
)

func main() {
	content := New(&http.Client{})
	var wg sync.WaitGroup
	articleResult := make(chan *[]Article)
	pokemonResult := make(chan *Pokemon)
	wg.Add(2)
	go content.getArticles(&wg, articleResult)
	go content.getPokemon(&wg, pokemonResult)
	go func() {
		wg.Wait()
		close(articleResult)
		close(pokemonResult)
	}()

	content.Articles = <-articleResult
	content.Pokemon = <-pokemonResult
	err := content.CreateReadme()
	if err != nil {
		panic(err)
	}
}

func (readme *ReadmeContent) getArticles(wg *sync.WaitGroup, res chan *[]Article) {
	defer wg.Done()
	res <- readme.GetLatestArticles()
}

func (readme *ReadmeContent) getPokemon(wg *sync.WaitGroup, res chan *Pokemon) {
	defer wg.Done()
	res <- readme.GeneratePokemon()
}
