const Duolingo = require("duolingo-api");
const credentials = {
  id: process.env.DUOLINGO_ID,
};
let duolingo = new Duolingo(credentials);

async function getDuolingoXp() {
  const myFields = ["totalXp"];
  return await duolingo.getDataByFields(myFields);
}

module.exports.getDuolingoXp = getDuolingoXp;
