
const baseurl = process.env.REACT_APP_SERVICE_URL;

async function get(endpoint) {
  console.log('HS');
  const token = window.localStorage.getItem('token');

  /*const url = `${baseurl}${endpoint}`;*/
  const url = `${endpoint}`;
  const response = await fetch(url);
  const result = await response.json();
  /* TODO, útfæra get betur*/
  console.log('ree');
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
