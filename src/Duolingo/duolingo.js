const Duolingo = require("duolingo-api");
const credentials = {
  id: "32246515",
};
let duolingo = new Duolingo(credentials);

async function getDuolingoXp() {
  const myFields = ["totalXp"];
  return await duolingo.getDataByFields(myFields);
}
async function test() {
  var l = await getDuolingoXp();
  console.log(l);
}
test();
module.exports.getDuolingoXp = getDuolingoXp;
