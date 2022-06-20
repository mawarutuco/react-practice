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
    { x: 0, y: 0, id: 0, value: "爺", isChecked: false },
    { x: 1, y: 1, id: 1, value: "子A", isChecked: false },
    { x: 1, y: 2, id: 2, value: "子B", isChecked: false },
    { x: 2, y: 2, id: 3, value: "孫", isChecked: false },
  ];

  const [toDo, setToDo] = useState(dataList);
  const [newId, setId] = useState(dataList.length);

  const pages = ["ShowAll", "ShowActive", "ShowCompleted"];
  const [page, setPage] = useState("ShowAll");

  const obj = { toDo, setToDo, setId, newId };

  return (
    <Container>
      <Card style={boxShadow}>
        <Card.Title>
          <h1>ToDoList</h1>
        </Card.Title>
        <Card.Body>
          {toDo.map((item) => {
            if (page === "ShowAll")
              return <ToDo key={item.id} obj={obj} item={item} />;
            if (page === "ShowActive" && !item.isChecked)
              return <ToDo key={item.id} obj={obj} item={item} />;
            if (page === "ShowCompleted" && item.isChecked)
              return <ToDo key={item.id} obj={obj} item={item} />;
          })}
          <AddToDo obj={obj} />
        </Card.Body>
        <Card.Footer>
          {pages.map((page) => (
            <Button
              variant="outline-primary"
              key={page}
              onClick={() => setPage(page)}
            >
              {page}
            </Button>
          ))}
        </Card.Footer>
      </Card>
    </Container>
  );
};

export default Index;
