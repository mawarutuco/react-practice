import React, { Component } from "react";
import { BrowserRouter, Route, Link, Routes } from "react-router-dom";
import {
  Title,
  ReactAwesomeShapes,
  ToDoListComponent,
  BootstrapTestComponent,
  Hyo,
  TestTranslationComponent,
} from "./com";

class Main extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Title title="功能選單" />
          <ul>
            {/*Link組件中的to會改變網址，但不會刷新頁面*/}
            <li>
              <Link to="/toDoList">toDoList</Link>
            </li>
            <li>
              <Link to="/ReactAwesomeShapes">react-awesome-shapes</Link>
            </li>
            <li>
              <Link to="/BootstrapTest">Bootstrap</Link>
            </li>
            <li>
              <Link to="/i18n">多國語系</Link>
            </li>
          </ul>
          <hr />
          <Routes>
            <Route path="/" element={<Hyo />} />
            <Route path="/toDoList" element={<ToDoListComponent />} />
            <Route
              path="/ReactAwesomeShapes"
              element={<ReactAwesomeShapes />}
            />
            <Route path="/BootstrapTest" element={<BootstrapTestComponent />} />
            <Route path="/i18n" element={<TestTranslationComponent />} />
          </Routes>
        </div>
      </BrowserRouter>
    );
  }
}

export default Main;
