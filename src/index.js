import React, { Component } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Home from "./pages/Home/index.js";
// import BootstrapTest from "./pages/Home/components/bootstrapTest";
// import TDM from "./pages/Home/pixiTest/pixiTest.js";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Home />
    {/* <BootstrapTest /> */}
    {/* <TDM /> */}
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
