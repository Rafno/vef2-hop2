
const baseurl = process.env.REACT_APP_SERVICE_URL;

async function get(method, endpoint) {

  const token = window.localStorage.getItem('token');

  const url = `${baseurl}${endpoint}`;
  const response = await fetch(url);
  const result = await response.json();
  /* TODO, útfæra get betur*/
  return { result, status: response.status };

  const options = {
    headers: {},
  };

  if (token) {
    options.headers['Authorization'] = `Bearer ${token}`;
  }

  /* todo framkvæma get */
}

/* todo aðrar aðgerðir */

export default {
  get,
};
