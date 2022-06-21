import React, { useState, useEffect, useRef } from "react";
import ToDo from "./ToDo";
import AddToDo from "./AddToDo";
import { Container, Card, Button } from "react-bootstrap";

const Index = () => {
  const boxShadow = { boxShadow: "53px 41px 80px rgba(0, 0, 0, 0.66)" };
  // x y 模糊程度 rgba(0, 0, 0, 深度)

  const [toDo, setToDo] = useState(dataList);
  const [newId, setId] = useState(dataList.length);

  const pages = ["ShowAll", "ShowActive", "ShowCompleted"];
  const [page, setPage] = useState("ShowAll");

  const obj = { toDo, setToDo, setId, newId };

  const dataList = [
    {
      indent: 0,
      id: 1,
      value: "爺",
      isChecked: false,
      data: [
        { indent: 1, id: 2, value: "父", isChecked: false },
        {
          indent: 1,
          id: 3,
          value: "父",
          isChecked: false,
          data: [
            { indent: 2, id: 4, value: "孫", isChecked: false },
            { indent: 2, id: 5, value: "孫", isChecked: false },
          ],
        },
      ],
    },
    { indent: 0, id: 6, value: "爺2", isChecked: false },
    { indent: 0, id: 7, value: "爺3", isChecked: false },
  ];

  return (
    <Container>
      <Card style={boxShadow}>
        <Card.Body>
          {toDo.map((item) => {
            // do {
              return <ToDo key={item.id} obj={obj} item={item} />;
            // } while (item.data.length > 0);
          })}
          <AddToDo obj={obj} />
        </Card.Body>
        <Card.Footer>
          {pages.map((page) => (
            <Button key={page} onClick={() => setPage(page)}>
              {page}
            </Button>
          ))}
        </Card.Footer>
      </Card>
    </Container>
  );
};

export default Index;
