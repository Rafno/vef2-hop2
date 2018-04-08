

const baseurl = process.env.REACT_APP_SERVICE_URL;

async function get(endpoint) {
  console.log('HS');
  const token = window.localStorage.getItem('token');

  /*const url = `${baseurl}${endpoint}`;*/
  const url = `${endpoint}`;

  const response = await fetch(url);

  const result = await response.json();

  return { result, status: response.status };
}

export async function post(endpoint, data) {
  const url = `${baseurl}${endpoint}`;

  const options = {
    body: JSON.stringify(data),
    headers: {
      'content-type': 'application/json',
    },
    method: 'POST',
  };

  const response = await fetch(url, options);

  const result = await response.json();

  return { result, status: response.status };
}

export default {
  get,
  post,
};
