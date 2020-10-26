const stravaapi = require("strava-v3");
const fs = require("fs");

stravaapi.config({
  client_id: process.env.STRAVA_CLIENT_ID,
  client_secret: process.env.STRAVA_SECRET,
});

async function getLastRun() {
  const tokens = await stravaapi.oauth.refreshToken(
    process.env.STRAVA_REFRESHTOKEN
  );

  var strava = new stravaapi.client(tokens.access_token);
  const payload = await strava.athlete.listActivities({
    page: 1,
    per_page: 1,
  });
  return payload[0];
}

function readStrava() {
  fs.readFile("strava.json", (err, data) => {
    if (err) throw err;
    return JSON.parse(data);
  });
}

async function refreshStrava() {
  let stravaData = readStrava();
  let latest = await getLastRun();
  let previouslySynced = stravaData.runs.find((x) => x.id == latest.id);
  if (previouslySynced === undefined) {
    stravaData.runs.push({ id: latest.id, distance: latest.distance });
    stravaData.totalDistance += latest.distance;
  }
  let data = JSON.stringify(stravaData);
  fs.writeFileSync("strava.json", data);
  return stravaData.totalDistance;
}

module.exports.refreshStrava = refreshStrava;
