import React from "react";
import { render } from "react-dom";
import { AppContainer } from "react-hot-loader";
import App from "../js/containers/app/index";

render(
  <AppContainer>
    <App />
  </AppContainer>,
  document.getElementById("root")
);

if (module.hot) {
  module.hot.accept("../js/containers/app/index", () => {
    const NextApp = require("../js/containers/app/index").default;
    render(
      <AppContainer>
        <NextApp />
      </AppContainer>,
      document.getElementById("root")
    );
  });
}
