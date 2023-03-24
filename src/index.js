// index.js
import fs from 'fs';
import Mustache from 'mustache';
import randomEmoji from 'random-emoji';
import refreshStrava from './Strava/stravaData.js';
import SimonsQuest from './Gamification/gamification.js';
import getDuolingoXp from './Duolingo/duolingo.js';
import pokemon from './Pokemon/pokemon.js';

const MUSTACHE_MAIN_DIR = './src/main.mustache';
const creationDate = new Date('5 Oct, 2020 22:00');

/**
 * DATA is the object that contains all
 * the data to be provided to Mustache
 * Notice the "name" and "date" property.
 */
let DATA = {
  name: 'Simon',
  welcome: welcomeText(),
  emoji: randomEmoji.random()[0].character,
  caughtList: '',
  totalCaught: 0,
};

function welcomeText() {
  let amsterdamHours = new Date().getUTCHours() + 2;
  if (amsterdamHours < 12) {
    return 'Good morning 🌅';
  } else if (amsterdamHours < 18) {
    return 'Good afternoon ☀️';
  } else {
    return 'Good evening 🌙';
  }
}

async function generateReadMe() {
  fs.readFile(MUSTACHE_MAIN_DIR, (err, data) => {
    if (err) throw err;
    const output = Mustache.render(data.toString(), DATA);
    fs.writeFileSync('README.md', output);
  });
}

async function action() {
  var pokemonData = await pokemon();
  DATA = { ...DATA, ...pokemonData };
  DATA.runningDistance = await refreshStrava();
  DATA.duoLingoXp = await getDuolingoXp();
  let experience = Math.floor(DATA.runningDistance / 2 + DATA.duoLingoXp / 10);
  let game = new SimonsQuest({ currentXp: experience });
  DATA.currentLevel = game.getCurrentLevel();
  DATA.progress = game.progressToNextLevel();
  DATA.currentExperience = experience;

  await generateReadMe();
}

action();
