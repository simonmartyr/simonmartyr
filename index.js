// index.js
const Mustache = require("mustache");
const fs = require("fs");
const MUSTACHE_MAIN_DIR = "./main.mustache";
const fetch = require("node-fetch");
const randomEmoji = require("random-emoji");

const creationDate = new Date("5 Oct, 2020 22:00");

/**
 * DATA is the object that contains all
 * the data to be provided to Mustache
 * Notice the "name" and "date" property.
 */
let DATA = {
  name: "Simon",
  welcome: welcomeText(),
  emoji: randomEmoji.random()[0].character,
};
/**
 * A - We open 'main.mustache'
 * B - We ask Mustache to render our file with the data
 * C - We create a README.md file with the generated output
 */
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
  var isShiny = Math.floor(Math.random() * 8192) == 8192;

  await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonToGet}`)
    .then((r) => r.json())
    .then((r) => {
      (DATA.pokemonImage = isShiny
        ? r.sprites.front_shiny
        : r.sprites.front_default),
        (DATA.pokemonName = r.name),
        (DATA.isShiny = isShiny ? "Shiny" : "Non-Shiny");
    });
}

async function action() {
  await captureAPokemon();

  await generateReadMe();
}

action();
