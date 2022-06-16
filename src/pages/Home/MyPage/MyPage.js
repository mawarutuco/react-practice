import React from "react";
// import { BrowserRouter, Route, Link, Routes } from "react-router-dom";
import FunctionComponent from "./FunctionComponent.js";
import ClassComponent from "./ClassComponent.js";
// import  "./css.css";


const Router = () => {
  return (
    <>
    <h1>我是最外面的H1</h1>
      <ClassComponent />
      <FunctionComponent />
    </>
  );
};

export default Router;
