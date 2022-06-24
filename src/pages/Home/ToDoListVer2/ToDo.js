import React, { useState, useEffect, useRef } from "react";
import { Form, Button, InputGroup } from "react-bootstrap";
import { FaTrash } from "react-icons/fa";
import { BsArrowReturnRight } from "react-icons/bs";
import { focusNode, getLastToDoY, putIndent, 最底層, checkFaterCheckBox, 排Y } from "./active";

//取消小孩checkbox，爸爸也要取消
//家族縮排
//刪除新增詢問
//優化抽出程式碼


const ToDoItem = ({ obj, item }) => {
  const { toDo, setToDo, setId, newId } = obj;

  const { id, value, isChecked, ToDoX, ToDoY } = item;

  const changeCheck = (id) => {

    let keep = true
    let tmpIdx = toDo.findIndex(n => n.id === id)
    let tmpItem = toDo[tmpIdx]
    let tmpX = tmpItem.ToDoX
    let tmpY = tmpItem.ToDoY
    let tmpCheck = tmpItem.isChecked = !isChecked

    let tmpArr = toDo.map((item, index) => {
      if (keep && index > tmpIdx) {
        if (item.ToDoX <= tmpX) { keep = false } else { item.isChecked = tmpCheck }
      }
      return item
    })

    if (tmpCheck === false) checkFaterCheckBox(tmpY, tmpArr)

    setToDo(tmpArr)
  };

  const changeValue = (e, id) => {
    const tmp = toDo.map((item) => {
      if (item.id === id) item.value = e.target.value;
      return item;
    });
    setToDo(tmp);
  };

  const deleteToDoItem = (id) => {
    let tmpToDoX = 99;
    let tmpToDoY = 0;
    let count = 1;
    let keep = true;
    let tmpArr = [...toDo];
    let tmpIdx = toDo.findIndex(n => n.id === id)
    toDo.forEach((item, index) => {
      if (keep) {
        if (item.ToDoX > tmpToDoX) count++;
        if (item.ToDoX === tmpToDoX) keep = false;
        if (tmpIdx === index) tmpToDoX = item.ToDoX;
      }
    });
    tmpArr.splice(tmpIdx, count);
    排Y(tmpToDoY, tmpArr)
    setToDo(tmpArr);
  };


  const keyDownActive = (e, id) => {


    switch (e.keyCode) {
      //enter
      case 13: {
        let keep = true
        let tmpIdx = toDo.findIndex(n => n.id === id)
        let tmpX = toDo[tmpIdx].ToDoX
        let tmpY = getLastToDoY(toDo)
        let tmpArr = toDo.map((item, index) => {
          if (index > tmpIdx) {
            if (keep && item.ToDoX <= tmpX) {
              tmpY = item.ToDoY
              keep = false
            }
            if (!keep) item.ToDoY += 1
          }
          return item
        })
        tmpArr.push({ ToDoX: tmpX, ToDoY: tmpY, id: newId, value: '', isChecked: false })
        tmpArr.sort(function (a, b) { return a.ToDoY - b.ToDoY })
        setId((pre) => pre + 1);
        setToDo(tmpArr)
        console.log(tmpArr);
        break;
      }

      //tab
      case 9: {
        //shift+tab 
        if (e.shiftKey) {
          e.preventDefault();

          let tmpIdx = toDo.findIndex((item) => item.id === id);
          if (toDo[tmpIdx].ToDoX === 0) return;

        } else {
          //tab
          e.preventDefault();

          let tmpIdx = toDo.findIndex((item) => item.id === id);
          let tmpItem = toDo[tmpIdx]
          if (tmpItem.ToDoX === 最底層 || tmpIdx === 0) return;
          if (toDo[tmpIdx - 1].ToDoX < tmpItem.ToDoX) return

          let tmpX = tmpItem.ToDoX
          let tmpY = tmpItem.ToDoY

          let keep = true
          let tmpArr = toDo.map((item, indext) => {
            if (keep) {
              if (indext >= tmpIdx && item.ToDoX >= tmpX) {
                item.ToDoX += 1
                if (item.ToDoX <= tmpX) keep = false
              }

            }
            return item
          })
          console.log(tmpArr)
          setToDo(tmpArr);

          // let tmp = toDo.map((item) => {
          //   if (item.id === id) item.ToDoX += 1;
          //   if (item.ToDoX > 最底層) item.ToDoX = 最底層;
          //   return item;
          // });
          // setToDo(tmp);
        }
        break;
      }

      //↑
      case 38: {
        if (e.ctrlKey || e.metaKey) {
          let pos = toDo.findIndex((item) => item.id === id);
          if (pos === 0) return;

        } else {
          focusNode(id, -1, toDo);
        }
        break;
      }

      //↓
      case 40: {
        if (e.ctrlKey || e.metaKey) {
          if (toDo[toDo.length - 1].id === id) return;

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
      {putIndent(ToDoX)}
      <InputGroup.Checkbox
        checked={isChecked}
        onChange={() => changeCheck(id)}
      />
      <Form.Control
        className="ToDoListInput"
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
