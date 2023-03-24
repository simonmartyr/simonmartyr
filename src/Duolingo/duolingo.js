import fetch from 'node-fetch';
const id = '123456';
const duoLingoUrl = `http://www.duolingo.com/2017-06-30/users/${id}?fields=totalXp`;

const fetchOptions = {
  headers: {
    contentType: 'application/json',
    'user-agent': 'cool-agent',
  },
};

export default async function getDuolingoXp() {
  const response = await fetch(duoLingoUrl, fetchOptions);
  const jsonData = await response.json();
  return jsonData.totalXp;
}
