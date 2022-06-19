import React, { useState } from "react";
import { Container } from "react-bootstrap";
import Edit from "./Edit.js";
import List from "./List.js";

const HYOHYO = React.createContext();

function ToDoList() {
  //資料
  let dataList = [
    { id: 0, item: "練React", done: false },
    { id: 1, item: "測React", done: false },
    { id: 2, item: "看React", done: true },
  ];

  //設useState
  const [onlyId, setId] = useState(dataList.length);
  const [list, setList] = useState(dataList);
  const 更改id = { onlyId, setId };
  const 更改資料內容 = { list, setList };

  return (
    <Container>
      <h1>ToDoList</h1>
      <Edit setList={setList} 更改id={更改id} />
      <HYOHYO.Provider value={更改資料內容}>
        <List 更改資料內容={更改資料內容} />
      </HYOHYO.Provider>
    </Container>
  );
}

export { HYOHYO };
export default ToDoList;
