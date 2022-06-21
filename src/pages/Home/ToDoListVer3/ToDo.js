import React, { useState, useEffect, useRef } from "react";
import { Form, Button, InputGroup, Row, Col } from "react-bootstrap";
import { FaTrash } from "react-icons/fa";
import { BsArrowReturnRight } from "react-icons/bs";

const ToDoItem = ({ obj, item }) => {
  const { dataList, toDo, setToDo, setId, newId } = obj;

  const { id, value, isChecked, indent } = item;

  const changeCheck = (id) => {
    let checked;
    let 縮 = 99;
    let keep = true;
    let tmp = toDo.map((item) => {
      if (keep) {
        if (item.id === id) {
          縮 = item.indent;
          item.isChecked = !item.isChecked;
          checked = item.isChecked;
        } else if (item.indent === 縮) keep = false;

        if (item.indent > 縮) {
          item.isChecked = checked;
        }
      }

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
    let 縮 = 99;
    let start = -1;
    let count = 1;
    let tmp = [...toDo];
    toDo.forEach((item, idx) => {
      if (item.indent > 縮) count++;
      if (item.id === id) {
        start = idx;
        縮 = item.indent;
      }
      if (item.indent <= 縮) return;
    });
    tmp.splice(start, count);
    console.log(toDo, tmp);
    setToDo(tmp);
  };

  const 縮 = (indent) => {
    const tmp = "    ";
    let most = indent > 3 ? 3 : indent;
    return <pre>{tmp.repeat(most)}</pre>;
  };

  const active = (e, id) => {
    if (e.keyCode === 13) {
      let 前 = [];
      let 後 = [];
      let 碰到了 = false;
      let 縮 = 99;
      toDo.forEach((item) => {
        碰到了 ? 後.push(item) : 前.push(item);
        if (item.id === id) {
          碰到了 = true;
          縮 = item.indent;
        }
      });

      if (後.length > 0) {
        if (後[0].indent !== 縮) {
          // let start = -1;
          let count = 0;
          後.map((item, idx) => {
            if (item.indent > 縮) {
              前.push(item);
              // if (!count) start = idx;
              count++;
            }
          });
          後.splice(0, count);
        }
      }

      setToDo([
        ...前,
        { id: newId, value: "", indent: 縮, isChecked: false },
        ...後,
      ]);
      setId((pre) => pre + 1);
      return;
    }

    //↑38 //↓40
    if (e.keyCode === 40) {
    }

    //←
    if (e.keyCode === 37) {
      let 縮 = 99;
      let tmp = toDo.map((item) => {
        if (item.indent > 縮) item.indent -= 1;
        if (item.id === id) {
          item.indent -= 1;
          縮 = item.indent;
        }
        return item;
      });
      return setToDo(tmp);
    }

    //→
    if (e.keyCode === 39) {
      let 縮 = 99;
      let tmp = toDo.map((item) => {
        if (item.indent > 縮) item.indent += 1;
        if (item.id === id) {
          item.indent += 1;
          縮 = item.indent;
        }
        if (item.indent === 縮) return item;
        return item;
      });
      return setToDo(tmp);
    }

    // if (e.keyCode === 9) console.log("tab");
    // if (e.keyCode === 16) console.log("shift");
  };

  const inputRef = useRef(null);
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <>
      <InputGroup>
        {/* {縮(indent)} */}
        <InputGroup.Checkbox
          checked={isChecked}
          onChange={() => changeCheck(id)}
        />
        <Form.Control
          ref={inputRef}
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
