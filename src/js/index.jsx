import React from "react";
import ReactDOM from "react-dom";

import App from "./containers/app/index";

ReactDOM.hydrate(<App />, document.getElementById("root"));

if (module.hot) {
  module.hot.accept("./containers/app/index", () => {
    ReactDOM.hydrate(<App />, document.getElementById("root"));
  });
}
