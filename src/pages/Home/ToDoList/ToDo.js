import React, { useState } from "react";
import { Form, Button, InputGroup, Row, Col } from "react-bootstrap";
import { FaTrash } from "react-icons/fa";
import { BsArrowReturnRight } from "react-icons/bs";

const ToDoItem = ({ obj, item }) => {
  const { dataList, toDo, setToDo, setId, newId } = obj;

  const { id, value, isChecked, indent } = item;

  const changeCheck = (id) => {
    const tmp = toDo.map((item) => {
      if (item.id === id) item.isChecked = !item.isChecked;
      return item;
    });
    setToDo(tmp);
  };

  const changeValue = (e, id) => {
    const tmp = toDo.map((item) => {
      if (item.id === id) item.value = e.target.value;
      return item;
    });
    setToDo(tmp);
  };

  const deleteToDoItem = (id) => {
    setToDo((pre) => pre.filter((item) => item.id !== id));
  };

  const 縮 = (indent) => {
    if (indent === 1) return <BsArrowReturnRight />;
    if (indent === 2)
      return (
        <>
          <BsArrowReturnRight />
          <BsArrowReturnRight />
        </>
      );
  };

  const active = (e, id) => {
    if (e.keyCode === 13) {
      let 前 = [];
      let 後 = [];
      let 碰到了 = false;
      let 縮 = 0;
      toDo.forEach((item) => {
        碰到了 ? 後.push(item) : 前.push(item);
        if (item.id === id) {
          碰到了 = true;
          縮 = item.indent;
        }
      });
      setToDo([
        ...前,
        { id: newId, value: "", indent: 縮, isChecked: false },
        ...後,
      ]);
      setId((pre) => pre + 1);
      return;
    }
    if (e.keyCode === 9) console.log("tab");
    // if (e.keyCode === 16) {
      // toDo.map(item => {if(item.id === id){item.indent++;
      //   return item}})
    //   setToDo([])
    // }}
    if (e.keyCode === 16) console.log("shift");
  };

  return (
    <>
      <InputGroup>
        {縮(indent)}
        <InputGroup.Checkbox
          checked={isChecked}
          onChange={() => changeCheck(id)}
        />
        <Form.Control
          disabled={isChecked}
          value={value}
          onChange={(e) => changeValue(e, id)}
          onKeyUp={(e) => active(e, id)}
        />
        <Button variant="outline-secondary" onClick={() => deleteToDoItem(id)}>
          <FaTrash />
        </Button>
      </InputGroup>
    </>
  );
};

export default ToDoItem;
