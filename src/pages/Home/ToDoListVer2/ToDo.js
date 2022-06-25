import React, { useState, useEffect, useRef } from "react";
import { Form, Button, InputGroup, NavDropdown } from "react-bootstrap";
import { FaTrash } from "react-icons/fa";
import { FiMoreVertical } from "react-icons/fi";
import { BsArrowReturnRight } from "react-icons/bs";
import {
  focusNode,
  getLastToDoY,
  putIndent,
  最底層,
  checkFatherCheckBox,
  排Y,
  checkBrotherNotToBeFather,
  縮排或取消縮排,
} from "./active";

//取消小孩checkbox，爸爸也要取消
//家族縮排
//刪除新增詢問
//優化抽出程式碼

const ToDoItem = ({ obj, item }) => {
  const { toDo, setToDo, setId, newId } = obj;

  const { id, value, isChecked, ToDoX, ToDoY } = item;
  const getToDoLastIdx = toDo.length - 1;

  const changeCheck = (id) => {
    let keep = true;
    let tmpIdx = toDo.findIndex((n) => n.id === id);
    let tmpItem = toDo[tmpIdx];
    let tmpX = tmpItem.ToDoX;
    let tmpY = tmpItem.ToDoY;
    let tmpCheck = (tmpItem.isChecked = !isChecked);

    let tmpArr = toDo.map((item, index) => {
      if (keep && index > tmpIdx) {
        if (item.ToDoX <= tmpX) {
          keep = false;
        } else {
          item.isChecked = tmpCheck;
        }
      }
      return item;
    });

    if (tmpCheck === false) checkFatherCheckBox(tmpY, tmpArr);

    setToDo(tmpArr);
  };

  const changeValue = (e, id) => {
    const tmpArr = toDo.map((item) => {
      if (item.id === id) item.value = e.target.value;
      return item;
    });
    setToDo(tmpArr);
  };

  const deleteToDoItem = (id) => {
    let count = 1;
    let keep = true;
    let tmpArr = [...toDo];
    let tmpIdx = toDo.findIndex((n) => n.id === id);
    let tmpToDoX = toDo[tmpIdx].ToDoX;
    toDo.forEach((item, index) => {
      if (keep && index > tmpIdx) {
        if (item.ToDoX > tmpToDoX) {
          count++;
        } else {
          keep = false;
        }
      }
    });
    tmpArr.splice(tmpIdx, count);
    排Y(tmpArr);
    setToDo(tmpArr);
  };

  const keyDownActive = (e, id) => {
    switch (e.keyCode) {
      //enter
      case 13: {
        let keep = true;
        let tmpIdx = toDo.findIndex((n) => n.id === id);
        let tmpX = toDo[tmpIdx].ToDoX;
        let tmpY = getLastToDoY(toDo);
        let tmpArr = toDo.map((item, index) => {
          if (index > tmpIdx) {
            if (keep && item.ToDoX <= tmpX) {
              tmpY = item.ToDoY;
              keep = false;
            }
            if (!keep) item.ToDoY += 1;
          }
          return item;
        });

        tmpArr.push({
          ToDoX: tmpX,
          ToDoY: tmpY,
          id: newId,
          value: "",
          isChecked: false,
        });

        tmpArr.sort(function (a, b) {
          return a.ToDoY - b.ToDoY;
        });
        setId((pre) => pre + 1);
        setToDo(tmpArr);
        console.log(tmpArr);
        break;
      }

      //tab
      case 9: {
        //shift+tab
        if (e.shiftKey) {
          e.preventDefault();

          let tmpIdx = toDo.findIndex((item) => item.id === id);
          let tmpItem = toDo[tmpIdx];
          if (tmpItem.ToDoX === 0) return;
          let tmpArr = [...toDo];

          //如果A跟B同階為兄弟，A升級後不能成為B的爸爸，所以A升級後要扔到下一個長輩或同階的上面
          if (
            tmpIdx !== getToDoLastIdx &&
            tmpItem.ToDoX === toDo[tmpIdx + 1].ToDoX
            //不能只判斷樓下一位...贛
          ) {
            // checkBrotherNotToBeFather(tmpIdx, tmpArr);
            let keep = true;
            let tmpItem = tmpArr[tmpIdx];

            let 下一個長輩同階 = tmpArr.findIndex(
              (item, index) => index > tmpIdx && item.ToDoX <= tmpItem.ToDoX - 1
            );

            let newTmpToDoY =
              (下一個長輩同階 === -1 ? tmpArr.length : 下一個長輩同階) - 1;
            tmpItem.ToDoY = newTmpToDoY;
            tmpArr.map((item, index) => {
              if (index === 下一個長輩同階) keep = false;
              if (keep && index > tmpIdx) item.ToDoY -= 1;
            });
          }

          縮排或取消縮排(tmpIdx, -1, tmpArr);

          tmpArr.sort(function (a, b) {
            return a.ToDoY - b.ToDoY;
          });

          setToDo(tmpArr);
        } else {
          //tab
          e.preventDefault();

          let tmpIdx = toDo.findIndex((item) => item.id === id);
          let tmpItem = toDo[tmpIdx];
          if (tmpItem.ToDoX === 最底層 || tmpIdx === 0) return;
          if (toDo[tmpIdx - 1].ToDoX < tmpItem.ToDoX) return;

          let tmpArr = [...toDo];
          縮排或取消縮排(tmpIdx, 1, tmpArr);
          setToDo(tmpArr);
        }
        break;
      }

      //↑
      case 38: {
        if (e.ctrlKey || e.metaKey) {
          let tmpIdx = toDo.findIndex((item) => item.id === id);
          if (tmpIdx === 0) return;
        } else {
          focusNode(id, -1, toDo);
        }
        break;
      }

      //↓
      case 40: {
        if (e.ctrlKey || e.metaKey) {
          if (toDo[getToDoLastIdx].id === id) return;

          let tmpIdx = toDo.findIndex((n) => n.id === id);
          let tmpItem = toDo[tmpIdx];
          let tmpX = tmpItem.ToDoX;

          //先找最近可換的
          let changeIdx = toDo.findIndex((n, index) => {
            return index > tmpIdx && n.ToDoX === tmpX;
          });
          if (changeIdx === -1) return;

          //防止跟別人家同階互換
          if (toDo[changeIdx - 1].ToDoX < tmpX) return;

          let HYO = tmpIdx;
          toDo[changeIdx].ToDoY = HYO;
          HYO += 1;

          let keep = true;
          let tmpArr = toDo.map((item, index) => {
            if (index > changeIdx) {
              if (item.ToDoX <= tmpX) keep = false;
              if (keep) {
                item.ToDoY = HYO;
                HYO += 1;
              }
            }
            return item;
          });

          toDo[tmpIdx].ToDoY = HYO;
          HYO += 1;
          keep = true;
          tmpArr.map((item, index) => {
            if (index > tmpIdx) {
              if (item.ToDoX <= tmpX) keep = false;
              if (keep) {
                item.ToDoY = HYO;
                HYO += 1;
              }
            }
            return item;
          });
          tmpArr.sort(function (a, b) {
            return a.ToDoY - b.ToDoY;
          });
          setToDo(tmpArr);
          console.log(tmpArr);
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
      <NavDropdown variant="outline-secondary" title="" id="nav-dropdown">
        <NavDropdown.Item eventKey="4.0" onClick={() =>deleteToDoItem(id)}>先放刪除測試OK</NavDropdown.Item>
        <NavDropdown.Divider />
        <NavDropdown.Item eventKey="4.1" >縮排</NavDropdown.Item>
        <NavDropdown.Item eventKey="4.2">取消縮排</NavDropdown.Item>
        <NavDropdown.Divider />
        <NavDropdown.Item eventKey="4.3">往上搬移</NavDropdown.Item>
        <NavDropdown.Item eventKey="4.4">往下搬移</NavDropdown.Item>
      </NavDropdown>
    </InputGroup>
  );
};

export default ToDoItem;
