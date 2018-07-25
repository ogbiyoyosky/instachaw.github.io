const sendRequest = ({ endpoint, method, payload }) => {
  return fetch(endpoint, {
    method: method,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: payload
  })
    .then(response => {
      if (response.status >= 200 && response.status < 503) {
        return response.json().then(data => Promise.resolve(data));
      } else {
        return Promise.reject(response.statusText);
      }
    })
    .catch(error => {
      console.log("Request failed", error);
    });
};

export { sendRequest };
