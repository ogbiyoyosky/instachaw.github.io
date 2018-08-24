const sendRequest = ({ endpoint, method, payload }) => {
  return fetch(endpoint, {
    method: method,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("user")
        ? `Bearer ${JSON.parse(localStorage.getItem("user")).token}`
        : ""
    },
    body: payload
  })
    .then(response => {
      return response.json().then(data => {
        if (response.status == 401 && typeof data.error === "object") {
          return alert(
            "We're sorry. We had an error carrying out this operation."
          );
        }

        if (response.status >= 200 && response.status < 503) {
          return Promise.resolve(data);
        } else {
          return Promise.reject(response.statusText);
        }
      });
    })
    .catch(error => {
      console.log("Request failed", error);
    });
};

export { sendRequest };
