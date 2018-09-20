import React from "react";
import { render } from "react-dom";
import "./index.css";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";

render(<App />, document.getElementById("root"));
registerServiceWorker();

if (module.hot) {
  module.hot.accept("./App", () => {
    const NextApp = require("./App").default;
    render(<NextApp />, document.getElementById("root"));
  });
}
