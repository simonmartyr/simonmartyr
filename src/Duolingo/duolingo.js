import Duolingo from 'duolingo-api';

export default async function getDuolingoXp() {
  const client = duolingoClient();
  const myFields = ['totalXp'];
  return await client.getDataByFields(myFields);
}

function duolingoClient() {
  const credentials = {
    id: process.env.DUOLINGO_ID,
  };
  return new Duolingo(credentials);
}
