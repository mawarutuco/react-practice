import React, { useState } from "react";
import { Container, Card, Button, ButtonGroup, Row } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import ToDo from "./ToDo";
import AddToDo from "./AddToDo";
import { showPage } from "./active";

const 專案名稱 = 'ToDo'
const dataList = [
  { ToDoX: 0, ToDoY: 0, id: 0, value: "爺A0", isChecked: false },
  { ToDoX: 1, ToDoY: 1, id: 1, value: "子A1", isChecked: false },
  { ToDoX: 1, ToDoY: 2, id: 2, value: "子B2", isChecked: false },
  { ToDoX: 2, ToDoY: 3, id: 3, value: "孫3", isChecked: false },
  { ToDoX: 1, ToDoY: 4, id: 4, value: "子C4", isChecked: false },
  { ToDoX: 2, ToDoY: 5, id: 5, value: "孫A5", isChecked: false },
  { ToDoX: 2, ToDoY: 6, id: 6, value: "孫B6", isChecked: false },
  { ToDoX: 0, ToDoY: 7, id: 7, value: "爺7", isChecked: false },
  { ToDoX: 1, ToDoY: 8, id: 8, value: "子8", isChecked: false },
  { ToDoX: 1, ToDoY: 9, id: 9, value: "子9", isChecked: false },
  { ToDoX: 2, ToDoY: 10, id: 10, value: "孫0", isChecked: false },
];

const Index = () => {
  const cardStyle = { boxShadow: "53px 41px 80px rgba(0, 0, 0, 0.33)", minHeight: '800px', minWidth: '300px' };
  // x y 模糊程度 rgba(0, 0, 0, 深度)

  const [toDo, setToDo] = useState(dataList);
  const [newId, setId] = useState(dataList.length);

  const pages = ["All", "Active", "Completed"];
  const [page, setPage] = useState("All");
  const FooterBtn = () => {
    const changeBtnColor = (item) =>
      page === item ? "primary" : "outline-primary";

    return (
      <ButtonGroup >
        {pages.map((item) => (
          <Button
            variant={changeBtnColor(item)}
            onClick={() => setPage(item)}
            key={item}
          >
            {item}
          </Button>
        ))}
      </ButtonGroup>
    );
  };

  const obj = { toDo, setToDo, setId, newId };

  return (
    <Container>
      <Row className="d-flex justify-content-center">
        <Card style={cardStyle} className='m-5'>
          <Card.Title className='m-3'>
            <h1>{專案名稱}</h1>
          </Card.Title>
          <Card.Body>
            {showPage(page, toDo).map((item) => {
              return <ToDo key={item.id} obj={obj} item={item} />;
            })}
            <AddToDo obj={obj} />
          </Card.Body>
          <Card.Footer>
            <FooterBtn />
          </Card.Footer>
        </Card>
      </Row>
    </Container>
  );
};

export default Index;
