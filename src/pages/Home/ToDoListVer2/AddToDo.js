import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { GrAdd } from "react-icons/gr";

const AddToDo = ({ obj }) => {
  const { toDo, setToDo, setId, newId } = obj;

  const add = () => {
    setToDo((pre) => [
      ...pre,
      { id: newId, value: "", x: 0, y: 0, isChecked: false },
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
