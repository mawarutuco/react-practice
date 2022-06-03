import React, { Component } from "react";
import { BrowserRouter, Route, Link, Routes } from "react-router-dom";
import { Title, Home, About, Hyo } from "./com";

class Main extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Title title="功能選單" />
          <ul>
            {/*Link組件中的to會改變網址，但不會刷新頁面*/}
            <li>
              <Link to="/">回到首頁</Link>
            </li>
            <li>
              <Link to="/about">關於我們</Link>
            </li>
            <li>
              <Link to="/hyo">hyo</Link>
            </li>
          </ul>
          <hr />
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/hyo" element={<Hyo />} />
          </Routes>
        </div>
      </BrowserRouter>
    );
  }
}

export default Main;
