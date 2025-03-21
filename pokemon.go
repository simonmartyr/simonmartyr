package main

import (
	"encoding/json"
	"fmt"
	"math/rand"
)

type PokemonResponse struct {
	Name    string                 `json:"name"`
	Sprites PokemonResponseSprites `json:"sprites"`
}

type PokemonResponseSprites struct {
	Normal string `json:"front_default"`
	Shiny  string `json:"front_shiny"`
}

type Pokemon struct {
	Name     string
	Image    string
	IsShinny bool
}

const pokeApiEndpoint = "https://pokeapi.co/api/v2/pokemon/%d"
const defaultPokemon = "Squirtle"
const defaultPokemonImage = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/7.png"

func (readme *ReadmeContent) GeneratePokemon() *Pokemon {
	res, getErr := readme.http.Get(fmt.Sprintf(pokeApiEndpoint, randomPokemonId()))
	if getErr != nil {
		panic(getErr)
	}
	if res.StatusCode < 200 || res.StatusCode >= 300 {
		return &Pokemon{
			Name:     defaultPokemon,
			Image:    defaultPokemonImage,
			IsShinny: false,
		}
	}
	defer res.Body.Close()
	var jsonResponse PokemonResponse
	decodeErr := json.NewDecoder(res.Body).Decode(&jsonResponse)
	if decodeErr != nil {
		panic(decodeErr)
	}
	return jsonResponse.transform()
}

func (pr *PokemonResponse) transform() *Pokemon {
	toReturn := Pokemon{
		Name:     pr.Name,
		Image:    pr.Sprites.Normal,
		IsShinny: false,
	}
	if isShiny() {
		toReturn.Image = pr.Sprites.Shiny
		toReturn.IsShinny = true
	}
	return &toReturn
}

func randomPokemonId() int {
	return rand.Intn(905) + 1
}

func isShiny() bool {
	return rand.Intn(8192) == 0
}
