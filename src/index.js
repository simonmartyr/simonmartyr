// index.js
const Mustache = require("mustache");
const fs = require("fs");
const MUSTACHE_MAIN_DIR = "./main.mustache";
const randomEmoji = require("random-emoji");
const stravaData = require("./Strava/stravaData");
const simonsQuest = require("./Gamification/gamification");
const duoLingo = require("./Duolingo/duolingo");
const pokemon = require("./Pokemon/pokemon");

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
  caughtList: "",
  totalCaught: 0,
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
    fs.writeFileSync("../README.md", output);
  });
}

async function action() {
  var pokemonData = await pokemon.refreshPokemon();
  DATA = { ...DATA, ...pokemonData };
  DATA.runningDistance = await stravaData.refreshStrava();
  DATA.duoLingoXp = await duoLingo.getDuolingoXp();
  var currentXp = runningDistance / 2 + duoLingoXp / 10;
  let game = new simonsQuest({ currentXp: currentXp });
  DATA.currentLevel = game.getCurrentLevel();
  DATA.progress = game.progressToNextLevel();

  await generateReadMe();
}

action();
