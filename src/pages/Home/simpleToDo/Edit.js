import React, { useState, useRef, useEffect } from "react";
import { Container, Button, Card, Row, Col } from "react-bootstrap";
import swal from "sweetalert";

const Edit = ({ setList, 更改id }) => {
  const { setId, onlyId } = 更改id;
  const [inputItem, setInputItem] = useState("");

  const clearInput = () => {
    setInputItem("");
  };

  const addItem = () => {
    // if (String(inputItem).trim().length == 0) {
    //   swal({title:"未輸入待辦事項",icon:'error'});
    //   return;
    // }

    const pushItem = (prev) => [
      { id: onlyId, item: inputItem, done: false },
      ...prev,
    ];

    setId((prev) => prev + 1);
    setList(pushItem);
    clearInput();
  };

  //輸入完focus input
  const inputRef = useRef(null);
  useEffect(() => {
    inputRef.current.focus();
  }, [setInputItem]);

  const enterToAddItem = (ev) => {
    if (ev.keyCode == 13) addItem();
  };

  //刪除已完成todo
  const deleteAllDoneItem = () =>
    setList((pre) => pre.filter((item) => item.done === false));

  return (
    <div>
      <input
        type="text"
        placeholder="待辦事項"
        onChange={(e) => setInputItem(e.target.value)}
        value={inputItem}
        onKeyUp={enterToAddItem}
        ref={inputRef}
      />
      <Button onClick={() => addItem()}>新增</Button>
      <Button variant="danger" onClick={deleteAllDoneItem}>
        刪除已完成
      </Button>
    </div>
  );
};

export default Edit;
