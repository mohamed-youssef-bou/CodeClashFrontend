async function postSecureData(url = '', data = {}) {
  const response = await fetch(url, {
    method: 'POST',
    mode: 'cors',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
      'secret_token': localStorage["secret_token"]
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify(data)
  });
  return response.json(); // parses JSON response into native JavaScript objects
}

async function getSecureData(url = '') {
  const response = await fetch(url, {
    method: 'GET',
    mode: 'cors', // no-cors, *cors, same-origin
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
      'secret_token': localStorage["secret_token"]
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer'
  });
  return response.json(); // parses JSON response into native JavaScript objects
}
