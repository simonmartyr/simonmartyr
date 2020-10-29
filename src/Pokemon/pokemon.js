const fs = require("fs");
const file = "pokedex.json";
const apiEndpoint = "https://pokeapi.co/api/v2/pokemon/";

function readPokemon() {
  let rawJson = fs.readFile(file);
  return JSON.parse(rawJson);
}

function writePokemon(toWrite) {
  let data = JSON.stringify(toWrite);
  fs.writeFileSync(file, data);
}

async function captureAPokemon(pokemon) {
  var pokemonToGet = Math.floor(Math.random() * 807);
  var isShiny = Math.floor(Math.random() * 8193) == 8192;

  const {
    sprites: { front_default, front_shiny },
    name,
  } = await fetch(`${apiEndpoint}+${pokemonToGet}`).then((r) => r.json());

  var previouslyCaught = pokemon.caught.find((x) => x.name == name);
  previouslyCaught
    ? previouslyCaught.qt++
    : pokemon.caught.push({ name, qt: 1 });
  pokemon.caught.sort((a, b) => b.qt - a.qt);
  top10 = pokemon.caught.slice(0, 10);
  let table = "";
  top10.forEach((element) => {
    table += `${element.name}|${element.qt}\n`;
  });
  return {
    pokemonImage: isShiny ? front_shiny : front_default,
    pokemonName: name,
    isShiny: isShiny ? "Shiny" : "Non-Shiny",
    totalCaught: pokemon.caught.length,
    caughtList: table,
  };
}

async function refreshPokemon() {
  let pokemonData = readPokemon();
  var result = await captureAPokemon(pokemonData);
  await writePokemon(pokemonData);
  return result;
}

module.exports = refreshPokemon();
