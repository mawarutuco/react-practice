import { BrowserRouter, Route, Link, Routes } from "react-router-dom";
import React, { useState } from "react";
import { Container, Card, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import ToDo from "./ToDo";
import AddToDo from "./AddToDo";
import "./todo.css";

const Index = () => {
  const boxShadow = { boxShadow: "53px 41px 80px rgba(0, 0, 0, 0.66)" };
  // x y 模糊程度 rgba(0, 0, 0, 深度)
  const dataList = [
    { id: 0, value: "focus新增出來的input", indent: 0, isChecked: false },
    { id: 1, value: "可以上下移動focus", indent: 1, isChecked: false },
    { id: 2, value: "可以上下移動input", indent: 2, isChecked: false },
    { id: 3, value: "改善checkBox", indent: 2, isChecked: false },
    { id: 4, value: "改善checkBox", indent: 3, isChecked: false },
  ];

  const [toDo, setToDo] = useState(dataList);
  const [newId, setId] = useState(dataList.length);

  const pages = ["ShowAll", "ShowActive", "ShowCompleted"];

  const addItem = (id = newId) => {
    let 前 = [];
    let 後 = [];
    let 碰到了 = false;
    let 縮 = 99;
    toDo.forEach((item) => {
      碰到了 ? 後.push(item) : 前.push(item);
      if (item.id === id) {
        碰到了 = true;
        縮 = item.indent;
      }
    });

    if (後.length > 0) {
      if (後[0].indent !== 縮) {
        // let start = -1;
        let count = 0;
        後.map((item, idx) => {
          if (item.indent > 縮) {
            前.push(item);
            // if (!count) start = idx;
            count++;
          }
        });
        後.splice(0, count);
      }
    }

    setToDo([
      ...前,
      { id: newId, value: "", indent: 縮, isChecked: false },
      ...後,
    ]);
    setId((pre) => pre + 1);
    return;
  };
  const obj = { toDo, setToDo, setId, newId, addItem };

  const ShowAll = () => {
    return toDo.map((item) => <ToDo key={item.id} obj={obj} item={item} />);
  };
  const ShowActive = () => {
    return toDo.map((item) => {
      if (item.isChecked) return <ToDo key={item.id} obj={obj} item={item} />;
    });
  };
  const ShowCompleted = () => {
    return toDo.map((item) => {
      if (!item.isChecked) return <ToDo key={item.id} obj={obj} item={item} />;
    });
  };

  return (
    <Container>
      <Card style={boxShadow}>
        <Card.Title>
          <h1>ToDoList</h1>
        </Card.Title>
        <Card.Body>
          <Routes>
            <Route path="/ToDoList/ShowAll" element={<ShowAll />} />
            <Route path="/ToDoList/ShowActive" element={<ShowActive />} />
            <Route path="/ToDoList/ShowCompleted" element={<ShowCompleted />} />
          </Routes>{" "}
          {/* {toDo.map((item) => {
            return <ToDo key={item.id} obj={obj} item={item} />;
            if (item.isChecked)
              return <ToDo key={item.id} obj={obj} item={item} />;
            if (!item.isChecked)
              return <ToDo key={item.id} obj={obj} item={item} />;
          })} */}
          <AddToDo obj={obj} />
        </Card.Body>
        <Card.Footer>
          <Button>
            <Link to="/ToDoList">ShowAll</Link>
          </Button>
          <Button>
            <Link to="/ToDoList/ShowActive">ShowActive</Link>
          </Button>
          <Button>
            <Link to="/ToDoList/ShowCompleted">ShowCompleted</Link>
          </Button>
          {/* {pages.map((page) => (
            <Button key={page}>
              <Link to="page">SimpleToDoList</Link>
            </Button>
          ))} */}
        </Card.Footer>
      </Card>
    </Container>
  );
};

export default Index;
