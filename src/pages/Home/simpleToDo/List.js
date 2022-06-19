import React from "react";
import { Container, Button, Card, Row, Col } from "react-bootstrap";
import Item from "./Item.js";

const List = ({ 更改資料內容 }) => {
  const { list } = 更改資料內容;

  let doneList = [];
  let unDoneList = [];
  const 區分是否完成 = (list) => {
    list.map((toDoItem) => {
      if (toDoItem.done) doneList.push(toDoItem);
      else unDoneList.push(toDoItem);
    });
  };
  區分是否完成(list);

  return (
    <Card>
      <div>
      <h3>to do</h3>
        {unDoneList.map((el) => (
          <Item key={el.id} el={el} 更改資料內容={更改資料內容} />
        ))}
      </div>
      <h3>done</h3>
      <div>
        {doneList.map((el) => (
          <Item key={el.id} el={el} 更改資料內容={更改資料內容} />
        ))}
      </div>
    </Card>
  );
};

export default List;
