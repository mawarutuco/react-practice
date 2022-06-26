import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { GrAdd } from "react-icons/gr";
import { getLastToDoY } from "./active";

const AddToDo = ({ obj }) => {
  const { toDo, setToDo, setId, newId } = obj;

  const add = () => {
    setToDo((pre) => [
      ...pre,
      {
        ToDoX: 0,
        ToDoY: getLastToDoY(toDo),
        id: newId,
        value: "",
        isChecked: false,
      },
    ]);
    setId((pre) => pre + 1);
  };

  const addBtnStyle = { borderRadius: 50 };

  return (
    <Button
      onClick={add}
      variant="outline-primary"
      className="m-2"
      style={addBtnStyle}
    >
      <GrAdd />
    </Button>
  );
};

export default AddToDo;
