import React, { Component } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Home from "./pages/Home/toDoListIndex.js";
// import { Circle } from "react-awesome-shapes";
// import BootstrapTest from "./pages/Home/components/bootstrapTest";
// import TDM from "./pages/Home/pixiTest/pixiTest.js";
import "./pages/Home/i18nTest/i18n.js";
import TestTranslation from "./pages/Home/i18nTest/testTranslation.js";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
   
    {/* <BootstrapTest /> */}
    {/* <TDM /> */}
    
    {/* <Circle
      color="linear-gradient(135deg, red, white)"
      size={["150px", "150px", "180px", "180px"]}
      zIndex={-1}
    />  */}
    <Home />
    <TestTranslation />
    
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
