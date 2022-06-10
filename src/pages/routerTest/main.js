import React from "react";
import { BrowserRouter, Route, Link, Routes } from "react-router-dom";
import ToDoList from "../Home/components/toDoListIndex";
import BootstrapTest from "../Home/bootstrapTest";
import "../Home/i18nTest/i18n.js";
import TestTranslation from "../Home/i18nTest/testTranslation.js";
import Minesweeper from "../Home/Minesweeper/Minesweeper.js";
import Shopping from "../Home/shopping/ShoppingIndex.js";
import Task from "../Home/Task/TaskIndex.js";

const Title = (props) => {
  return <h1>{props.title}</h1>;
};

const Home = () => {
  return <h1>Home</h1>;
};

const Main =()=> {


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
              <Link to="/BootstrapTest">Bootstrap</Link>
            </li>
            <li>
              <Link to="/i18n">多國語系</Link>
            </li>
            <li>
              <Link to="/Minesweeper">踩地雷</Link>
            </li>
            <li>
              <Link to="/Shopping">購物車</Link>
            </li>
            <li>
              <Link to="/Task">任務</Link>
            </li>
          </ul>
          <hr />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/Minesweeper" element={<Minesweeper />} />
            <Route path="/Shopping" element={<Shopping />} />
            <Route path="/toDoList" element={<ToDoList />} />
            <Route path="/BootstrapTest" element={<BootstrapTest />} />
            <Route path="/i18n" element={<TestTranslation />} />
            <Route path="/Task" element={<Task />} />
          </Routes>
        </div>
      </BrowserRouter>
    )
  }


export default Main;
