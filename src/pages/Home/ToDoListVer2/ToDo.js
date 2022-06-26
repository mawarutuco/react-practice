import React, { useEffect, useRef, forwardRef } from "react";
import { Form, Button, InputGroup, Dropdown } from "react-bootstrap";
import swal from "sweetalert";
import { FaTrash } from "react-icons/fa";
import { FiMoreVertical, FiArrowUp, FiArrowDown } from "react-icons/fi";
import { TbIndentDecrease, TbIndentIncrease } from "react-icons/tb";
import {
  focusNode,
  getLastToDoY,
  putIndent,
  checkFatherCheckBox,
  deleteCountAndStart,
  deleteToDoItem,
  縮排,
  取消縮排,
  moveUp,
  moveDown,
} from "./active";

//刪除新增詢問
//優化抽出程式碼

const ToDoItem = ({ obj, item }) => {
  const { toDo, setToDo, setId, newId } = obj;

  const { id, value, isChecked, ToDoX, ToDoY } = item;

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

    if (tmpCheck === false) checkFatherCheckBox(tmpX, tmpY, tmpArr);

    setToDo(tmpArr);
  };

  const changeValue = (e, id) => {
    const tmpArr = toDo.map((item) => {
      if (item.id === id) item.value = e.target.value;
      return item;
    });
    setToDo(tmpArr);
  };

  const doDelete = (id) => {
    const { count, tmpIdx } = deleteCountAndStart(id, toDo);

    if (count === 1) return deleteToDoItem(count, tmpIdx, toDo, setToDo);

    swal({
      title: "確定刪除?",
      text: "若刪除父階，該父階下的所有子階也會被刪除",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) deleteToDoItem(count, tmpIdx, toDo, setToDo);
    });
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
        break;
      }

      //tab
      case 9: {
        e.preventDefault();
        //shift+tab
        if (e.shiftKey) {
          取消縮排(toDo, setToDo, id);
        } else {
          //tab
          縮排(toDo, setToDo, id);
        }
        break;
      }

      //↑
      case 38: {
        if (e.ctrlKey || e.metaKey) {
          moveUp(toDo, setToDo, id);
        } else {
          focusNode(id, -1, toDo);
        }
        break;
      }

      //↓
      case 40: {
        if (e.ctrlKey || e.metaKey) {
          moveDown(toDo, setToDo, id);
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
      <MoreActive obj={obj} item={item} />
      <Button onClick={() => doDelete(id)} variant="outline-secondary">
        <FaTrash />
      </Button>
    </InputGroup>
  );
};

const MoreActive = ({ obj, item }) => {
  const { toDo, setToDo } = obj;
  const { id } = item;

  const CustomToggle = forwardRef(({ children, onClick }, ref) => (
    <Button
      variant="outline-secondary"
      ref={ref}
      onClick={(e) => {
        onClick(e);
      }}
    >
      {children}
    </Button>
  ));

  return (
    <Dropdown>
      <Dropdown.Toggle as={CustomToggle} variant="outline-secondary">
        <FiMoreVertical />
      </Dropdown.Toggle>
      <Dropdown.Menu>
        <Dropdown.Item onClick={() => 縮排(toDo, setToDo, id)}>
          {<TbIndentIncrease />}　縮排
        </Dropdown.Item>

        <Dropdown.Item onClick={() => 取消縮排(toDo, setToDo, id)}>
          {<TbIndentDecrease />}　取消縮排
        </Dropdown.Item>

        {/* <Dropdown.Divider /> */}

        <Dropdown.Item onClick={() => moveUp(toDo, setToDo, id)}>
          {<FiArrowUp />}　往上搬移
        </Dropdown.Item>

        <Dropdown.Item onClick={() => moveDown(toDo, setToDo, id)}>
          {<FiArrowDown />}　往下搬移
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default ToDoItem;
