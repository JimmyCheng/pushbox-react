import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./app/index";
import registerServiceWorker from "./registerServiceWorker";
import { BrowserRouter as Router } from "react-router-dom";

const AppShell = () => {
  return (
    <Router>
      <App />
    </Router>
  );
};

ReactDOM.render(<AppShell />, document.getElementById("root"));
registerServiceWorker();
