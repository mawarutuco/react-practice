import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { GrAdd } from "react-icons/gr";

const AddToDo = ({ obj }) => {
  const { toDo, setToDo,setId,newId } = obj;


  const add = () => {
    setToDo((pre) => [...pre, { id: newId, value: "", indent: 0, isChecked: false }]);
    setId((pre) => pre + 1);
    // toDo.map((item)=>{if(item.id===newId)item.focus()})
  };

  return (
    <Button onClick={add}>
      <GrAdd />
    </Button>
  );
};

export default AddToDo;
