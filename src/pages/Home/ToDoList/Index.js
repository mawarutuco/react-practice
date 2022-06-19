import React, { useState } from "react";
import { Container, Card, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import ToDo from "./ToDo";
import AddToDo from "./AddToDo";
import "./todo.css";

const Index = () => {
  const dataList = [
    { id: 0, value: "ok", indent: 0, isChecked: false },
    { id: 1, value: "a", indent: 1, isChecked: false },
    { id: 2, value: "b", indent: 2, isChecked: false },
    { id: 3, value: "c", indent: 0, isChecked: false },
  ];

  const [toDo, setToDo] = useState(dataList);
  const [newId, setId] = useState(dataList.length);

  const obj = { dataList, toDo, setToDo,setId,newId };

  return (
    <Container>
      <Card>
        <Card.Title>
          <h1>ToDoList</h1>
        </Card.Title>
        <Card.Body>
          {toDo.map((item) => (
            <ToDo key={item.id} obj={obj} item={item} />
          ))}
          <AddToDo obj={obj} />
        </Card.Body>
        <Card.Footer>
          <Button>Show All</Button>
          <Button>Show Active</Button>
          <Button>Show Completed</Button>
        </Card.Footer>
      </Card>
    </Container>
  );
};

export default Index;
