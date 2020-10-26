const stravaapi = require("strava-v3");
const fs = require("fs");
const file = "strava.json";

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
  let rawJson = fs.readFileSync(file);
  return JSON.parse(rawJson);
}

function writeStrava(toWrite) {
  let data = JSON.stringify(toWrite);
  fs.writeFileSync(file, data);
}

async function refreshStrava() {
  let stravaData = readStrava();
  let latest = await getLastRun();
  let previouslySynced = stravaData.runs.find((x) => x.id == latest.id);
  if (previouslySynced === undefined) {
    stravaData.runs.push({ id: latest.id, distance: latest.distance });
    stravaData.totalDistance += latest.distance;
  }
  writeStrava(stravaData);
  return stravaData.totalDistance;
}

module.exports.refreshStrava = refreshStrava;
