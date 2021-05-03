import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./components/App/App";
import * as dotenv from "dotenv";

dotenv.config({ path: __dirname + "/.env" });

console.log(process.env.REACT_APP_HASH);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
