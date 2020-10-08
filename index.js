// index.js
const Mustache = require("mustache");
const fs = require("fs");
const MUSTACHE_MAIN_DIR = "./main.mustache";
const fetch = require("node-fetch");
const randomEmoji = require("random-emoji");

const creationDate = new Date("5 Oct, 2020 22:00");
let pokemon;

/**
 * DATA is the object that contains all
 * the data to be provided to Mustache
 * Notice the "name" and "date" property.
 */
let DATA = {
  name: "Simon",
  welcome: welcomeText(),
  emoji: randomEmoji.random()[0].character,
  caughtList: "",
};

function welcomeText() {
  let amsterdamHours = new Date().getUTCHours() + 2;
  if (amsterdamHours < 12) {
    return "Good morning 🌅";
  } else if (amsterdamHours < 18) {
    return "Good afternoon ☀️";
  } else {
    return "Good evening 🌙";
  }
}

async function generateReadMe() {
  fs.readFile(MUSTACHE_MAIN_DIR, (err, data) => {
    if (err) throw err;
    const output = Mustache.render(data.toString(), DATA);
    fs.writeFileSync("README.md", output);
  });
}

async function captureAPokemon() {
  var pokemonToGet = Math.floor(Math.random() * 807);
  var isShiny = Math.floor(Math.random() * 8193) == 8192;

  const {
    sprites: { front_default, front_shiny },
    name,
  } = await fetch(
    `https://pokeapi.co/api/v2/pokemon/${pokemonToGet}`
  ).then((r) => r.json());

  DATA.pokemonImage = isShiny ? front_shiny : front_default;
  DATA.pokemonName = name;
  DATA.isShiny = isShiny ? "Shiny" : "Non-Shiny";

  var previouslyCaught = pokemon.caught.find((x) => x.name == name);
  previouslyCaught
    ? previouslyCaught.qt++
    : pokemon.caught.push({ name, qt: 1 });
  pokemon.caught.sort((a, b) => b.qt - a.qt);
  top10 = pokemon.caught.slice(0, 10);
  top10.forEach((element) => {
    DATA.caughtList += `${element.name}|${element.qt}\n`;
  });
}

function readPokemon() {
  fs.readFile("pokedex.json", (err, data) => {
    if (err) throw err;
    pokemon = JSON.parse(data);
  });
}

function writePokemon() {
  let data = JSON.stringify(pokemon);
  fs.writeFileSync("pokedex.json", data);
}

async function action() {
  readPokemon();
  await captureAPokemon();
  writePokemon();

  await generateReadMe();
}

action();
