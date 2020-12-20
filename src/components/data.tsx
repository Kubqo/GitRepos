// Feel free to use something else than 'axios', for example 'ky'
import axios from 'axios';

// Documentation is at https://developer.github.com/v3/
const BASE_URL = 'https://api.github.com';

function getRepos(username: string) {
  const url = `${BASE_URL}/users/${username}/repos?per_page=250`;
  return axios.get(url).then(response => response.data);
}

function getUserData(username: string) {
  return axios
    .all([
      axios.get(`${BASE_URL}/users/${username}`),
      axios.get(`${BASE_URL}/users/${username}/orgs`)
    ])
    .then(([user, orgs]) => ({
      user: user.data,
      orgs: orgs.data
    }));
}

export { getRepos, getUserData };
