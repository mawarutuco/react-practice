import React, { useState, useEffect, useRef } from "react";
import { Form, Button, InputGroup, Row, Col } from "react-bootstrap";
import { FaTrash } from "react-icons/fa";
import { BsArrowReturnRight } from "react-icons/bs";

const ToDoItem = ({ obj, item }) => {
  const { toDo, setToDo, setId, newId } = obj;

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
    let keep = true;
    let tmp = [...toDo];
    toDo.forEach((item, idx) => {
      if (keep) {
        if (item.indent > 縮) count++;
        if (item.indent === 縮) keep = false;
        if (item.id === id) {
          start = idx;
          縮 = item.indent;
        }
      }
    });
    tmp.splice(start, count);
    setToDo(tmp);
  };

  const 縮 = (indent) => {
    const tmp = "    ";
    let most = indent > 3 ? 3 : indent;
    return <pre>{tmp.repeat(most)}</pre>;
  };

  const active = (e, id) => {
    //enter
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
          let count = 0;
          後.map((item) => {
            if (item.indent > 縮) {
              前.push(item);
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
    }

    //shift
    if (e.keyCode === 9) {
      //shift+tab
      if (e.shiftKey) {
        e.preventDefault();
        let tmp = toDo.map((item) => {
          if (item.id === id) item.indent -= 1;
          if (item.indent < 0) item.indent = 0;
          return item;
        });
        return setToDo(tmp);
      } else {
        //tab
        e.preventDefault();
        let tmp = toDo.map((item) => {
          if (item.id === id) item.indent += 1;
          if (item.indent > 3) item.indent = 3;
          return item;
        });
        return setToDo(tmp);
      }
    }

    //↑
    if (e.keyCode === 38) {
      if (toDo[0].id === id) return;
      let 前 = [];
      let 主角 = "";
      let 後 = [];
      let 碰到了 = false;
      toDo.forEach((item) => {
        if (item.id === id) {
          碰到了 = true;
          主角 = item;
        } else {
          碰到了 ? 後.push(item) : 前.push(item);
        }
      });

      後.unshift(前.pop());

      return setToDo([...前, 主角, ...後]);
    }

    //↓
    if (e.keyCode === 40) {
      if (toDo[toDo.length - 1].id === id) return;
      let 前 = [];
      let 主角 = "";
      let 後 = [];
      let 碰到了 = false;
      toDo.forEach((item) => {
        if (item.id === id) {
          碰到了 = true;
          主角 = item;
        } else {
          碰到了 ? 後.push(item) : 前.push(item);
        }
      });

      前.push(後.shift());

      return setToDo([...前, 主角, ...後]);
    }
  };

  const inputRef = useRef(null);
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <>
      <InputGroup>
        {縮(indent)}
        <InputGroup.Checkbox
          checked={isChecked}
          onChange={() => changeCheck(id)}
        />
        <Form.Control
          ref={inputRef}
          disabled={isChecked}
          value={value}
          onChange={(e) => changeValue(e, id)}
          onKeyDown={(e) => active(e, id)}
        />
        <Button onClick={() => deleteToDoItem(id)} variant="outline-secondary">
          <FaTrash />
        </Button>
      </InputGroup>
    </>
  );
};

export default ToDoItem;
