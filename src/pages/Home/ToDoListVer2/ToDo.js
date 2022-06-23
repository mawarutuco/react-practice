import React, { useState, useEffect, useRef } from "react";
import { Form, Button, InputGroup, Row, Col } from "react-bootstrap";
import { FaTrash } from "react-icons/fa";
import { BsArrowReturnRight } from "react-icons/bs";
import { focusNode } from "./active";

//取消小孩checkbox，爸爸也要取消
//家族縮排
//刪除新增詢問
//優化抽出程式碼

const 最底層 = 2;

const ToDoItem = ({ obj, item }) => {
  const { toDo, setToDo, setId, newId } = obj;

  const { id, value, isChecked, ToDoX, ToDoY } = item;

  const changeCheck = (id) => {
    let checked;
    let 縮 = 99;
    let keep = true;
    let tmp = toDo.map((item) => {
      if (keep) {
        if (item.id === id) {
          縮 = item.ToDoX;
          item.isChecked = !item.isChecked;
          checked = item.isChecked;
        } else if (item.ToDoX === 縮) keep = false;

        if (item.ToDoX > 縮) {
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

  const 排Y = () => {
    let 縮 = 99;
    let 設Y = 0;
    let tmp = toDo.map((item) => {
      if (item.ToDoY <= 縮) ++設Y;
      縮 = item.ToDoX;
      設Y = item.ToDoY;
      return item;
    });
    setToDo(tmp)
    console.log(tmp);
  };

  const deleteToDoItem = (id) => {
    排Y()
    let 縮 = 99;
    let start = -1;
    let count = 1;
    let keep = true;
    let tmp = [...toDo];
    toDo.forEach((item, idx) => {
      if (keep) {
        if (item.ToDoX > 縮) count++;
        if (item.ToDoX === 縮) keep = false;
        if (item.id === id) {
          start = idx;
          縮 = item.ToDoX;
        }
      }
    });
    tmp.splice(start, count);
    setToDo(tmp);
  };

  const 縮 = (x) => {
    const indent = "     ";
    let most = x > 最底層 ? 最底層 : x;
    return <pre>{indent.repeat(most)}</pre>;
  };

  const keyDownActive = (e, id) => {
    排Y()

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
            縮 = item.ToDoX;
          }
        });

        if (後.length > 0) {
          if (後[0].ToDoX !== 縮) {
            let count = 0;
            後.map((item) => {
              if (item.ToDoX > 縮) {
                前.push(item);
                count++;
              }
            });
            後.splice(0, count);
          }
        }

        setToDo([
          ...前,
          { ToDoX: 縮, id: newId, value: "", isChecked: false },
          ...後,
        ]);
        setId((pre) => pre + 1);
        break;
      }

      //tab
      case 9: {
        //shift+tab 目前可以帶著小孩縮排，但位置不會動
        if (e.shiftKey) {
          e.preventDefault();
          let keep = false;
          let 前 = [];
          let 主角家 = [];
          let 後 = [];
          let 縮 = 99;

          //如果要移動的位置是爺爺級的就不動
          let pos = toDo.findIndex((item) => item.id === id);
          if (toDo[pos].ToDoX === 0) return;

          // toDo.forEach((item, index) => {
          //   if (item.ToDoX >= 縮) keep = false;
          //   if (keep) 主角家.push(item);
          //   if (index === pos) {
          //     縮 = item.ToDoX;
          //     主角家.push(item);
          //     keep = true;
          //   }
          //   (!keep)? 前.push(item) : 後.push(item);
          // });
          // console.log([...前, "--", ...主角家, "--", ...後]);

          let tmp = toDo.map((item) => {
            if (item.ToDoX <= 縮) keep = false;
            if (keep && item.ToDoX > 縮) item.ToDoX -= 1;
            if (item.id === id) {
              keep = true;
              縮 = item.ToDoX;
              item.ToDoX -= 1;
            }
            if (item.ToDoX < 0) item.ToDoX = 0;
            return item;
          });
          setToDo(tmp);
        } else {
          //tab
          e.preventDefault();
          let tmp = toDo.map((item) => {
            if (item.id === id) item.ToDoX += 1;
            if (item.ToDoX > 最底層) item.ToDoX = 最底層;
            return item;
          });
          setToDo(tmp);
        }
        break;
      }

      //↑
      case 38: {
        if (e.ctrlKey || e.metaKey) {
          let pos = toDo.findIndex((item) => item.id === id);
          if (pos === 0) return;

          if (toDo[0].id === id) return;
          let 前 = [];
          let 主角 = [];
          let 後 = [];
          let 縮 = 99;
          let keep = false;
          toDo.forEach((item, index) => {
            if (item.ToDoX <= 縮) keep = false;
            if (index === pos) {
              keep = true;
              主角.push(item);
              縮 = item.ToDoX;
            } else {
              if (keep) {
                主角.push(item);
              } else {
                index > pos ? 後.push(item) : 前.push(item);
              }
            }
          });

          // 後.unshift(前.pop());
          console.log([...前, "-", ...主角, "-", ...後]);
          setToDo([...前, ...主角, ...後]);

          //原始
          // let 前 = [];
          // let 主角 = [];
          // let 後 = [];
          // let keep = false;
          // toDo.forEach((item, index) => {
          //   if (index === pos) {
          //     keep = true;
          //     主角 = item;
          //   } else {
          //     keep ? 後.push(item) : 前.push(item);
          //   }
          // });

          // 後.unshift(前.pop());

          // setToDo([...前, 主角, ...後]);
        } else {
          focusNode(id, -1, toDo);
        }
        break;
      }

      //↓
      case 40: {
        if (e.ctrlKey || e.metaKey) {
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
        } else {
          focusNode(id, 1, toDo);
        }
        break;
      }
    }
  };

  const inputRef = useRef(null);
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <InputGroup>
      {縮(ToDoX)}
      <InputGroup.Checkbox
        checked={isChecked}
        onChange={() => changeCheck(id)}
      />
      <Form.Control
        ref={inputRef}
        disabled={isChecked}
        value={value}
        onChange={(e) => changeValue(e, id)}
        onKeyDown={(e) => keyDownActive(e, id)}
      />
      <Button onClick={() => deleteToDoItem(id)} variant="outline-secondary">
        <FaTrash />
      </Button>
    </InputGroup>
  );
};

export default ToDoItem;
