import React, { useContext, useState } from "react";
import { Container, Button, Row, Col, Modal, Form } from "react-bootstrap";
import "./ToDoList.css";
import { HYOHYO as HYO } from "./ToDoListIndex";

const Item = ({ el }) => {
  const { list, setList } = useContext(HYO);

  //打勾完成事項
  const completeHandler = (id) => {
    const now = list.map((toDoItem) => {
      if (toDoItem.id === id) toDoItem.done = !toDoItem.done;
      return toDoItem;
    });
    setList(now);
  };

  //刪除todo
  const deleteToDoItem = (id) => {
    setList((pre) => pre.filter((toDoItem) => toDoItem.id !== id));
  };

  const [show, setShow] = useState(false);

  const toggleModal = () => {
    setShow((pre) => !pre);
  };

  const ItemEdit = () => {
    const [value, setValue] = useState("");

    const 確定修改 = () => {
      const now = list.map((toDoItem) => {
        if (toDoItem.id === id) toDoItem.item = value;
        return toDoItem;
      });
      setList(now);
      toggleModal();
    };

    return (
      <Modal show={show} onHide={toggleModal}>
        <Modal.Header>編輯</Modal.Header>
        <Modal.Body>
          <Form.Control
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyUp={(ev) => {
              if (ev.keyCode === 13) 確定修改();
            }}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={確定修改}>確定</Button>
          <Button onClick={toggleModal}>取消</Button>
        </Modal.Footer>
      </Modal>
    );
  };

  const { id, done, item } = el;

  return (
    <>
      <input
        type="checkbox"
        checked={done}
        onChange={() => completeHandler(id)}
      />

      <span className={done ? "done" : ""}>{item}</span>

      <Button
        variant="warning"
        style={{ display: done ? "none" : "" }}
        onClick={() => toggleModal()}
      >
        修改
      </Button>

      <Button variant="danger" onClick={() => deleteToDoItem(id)}>
        刪除
      </Button>
      <hr />
      <ItemEdit />
    </>
  );
};

export default Item;

//測試
//編輯item
// if (toDoItem.id === id) {
//   swal({
//     text: "編輯",
//     content: "input",
//     buttons: true,
//   }).then((value) => {
//     if (value !== "" && value !== null) {
//       toDoItem.item=value
//     }
//   });
// }
// return toDoItem;
//另一種區分done unDone寫法
//   let doneList = [];
//   let unDoneList = [];
//   list.map((toDoItem) => {
//     if (toDoItem.id === id) toDoItem.done = !toDoItem.done;

//     if (toDoItem.done) doneList.push(toDoItem);
//     else unDoneList.push(toDoItem);
//   });
//   setList([...unDoneList, ...doneList]);
