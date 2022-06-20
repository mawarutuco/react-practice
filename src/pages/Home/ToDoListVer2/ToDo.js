import React, { useState, useEffect, useRef } from "react";
import { Form, Button, InputGroup, Row, Col } from "react-bootstrap";
import { FaTrash } from "react-icons/fa";
import { BsArrowReturnRight } from "react-icons/bs";

const ToDoItem = ({ obj, item }) => {
  const { toDo, setToDo, setId, newId } = obj;

  const { id, value, isChecked, x } = item;

  const changeCheck = (id) => {
    let checked;
    let 縮 = 99;
    let keep = true;
    let tmp = toDo.map((item) => {
      if (keep) {
        if (item.id === id) {
          縮 = item.x;
          item.isChecked = !item.isChecked;
          checked = item.isChecked;
        } else if (item.x === 縮) keep = false;

        if (item.x > 縮) {
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
        if (item.x > 縮) count++;
        if (item.x === 縮) keep = false;
        if (item.id === id) {
          start = idx;
          縮 = item.x;
        }
      }
    });
    tmp.splice(start, count);
    setToDo(tmp);
  };

  const 縮 = (x) => {
    const indent = "    ";
    let most = x > 2 ? 2 : x;
    return <pre>{indent.repeat(most)}</pre>;
  };

  const active = (e, id) => {
    switch (e.keyCode) {
      //enter
      case 13: {
        let 前 = [];
        let 後 = [];
        let 碰到了 = false;
        let 縮 = 99;
        toDo.forEach((item) => {
          碰到了 ? 後.push(item) : 前.push(item);
          if (item.id === id) {
            碰到了 = true;
            縮 = item.x;
          }
        });

        if (後.length > 0) {
          if (後[0].x !== 縮) {
            let count = 0;
            後.map((item) => {
              if (item.x > 縮) {
                前.push(item);
                count++;
              }
            });
            後.splice(0, count);
          }
        }

        setToDo([
          ...前,
          { id: newId, value: "", x: 縮, isChecked: false },
          ...後,
        ]);
        setId((pre) => pre + 1);
        break;
      }

      //shift
      case 9: {
        //shift+tab
        if (e.shiftKey) {
          e.preventDefault();
          let tmp = toDo.map((item) => {
            if (item.id === id) item.x -= 1;
            if (item.x < 0) item.x = 0;
            return item;
          });
          setToDo(tmp);
        } else {
          //tab
          e.preventDefault();
          let tmp = toDo.map((item) => {
            if (item.id === id) item.x += 1;
            if (item.x > 2) item.x = 2;
            return item;
          });
          setToDo(tmp);
        }
        break;
      }

      //↑
      case 38: {
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

        setToDo([...前, 主角, ...後]);
        break;
      }

      //↓
      case 40: {
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

        setToDo([...前, 主角, ...後]);
        break;
      }
    }
  };

  const inputRef = useRef(null);
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <>
      <InputGroup>
        {縮(x)}
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
