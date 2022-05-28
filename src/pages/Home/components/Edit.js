import { useState, useEffect } from "react";
import { v4 } from "uuid";

const Edit = ({ add, submittingStatus }) => {
  const [note, setNote] = useState("");

  function changeNote(e) {
    setNote(e.target.value);
  }

  const [date, setDate] = useState("");

  function changeDate(e) {
    setDate(e.target.value);
  }

  function addItem() {
    submittingStatus.current = true;
    add(function (prev) {
      setNote("");
      return [{ id: v4(), note, date, isCompleted: false }, ...prev];
    });
  }

  useEffect(() => {}, []);

  return (
    <div>
      <h1>ToDoList</h1>
      <p>記事：</p>
      <input type="text" value={note} onChange={changeNote}></input>
      <p>預計完成日：</p>
      <input type="date" value={date} onChange={changeDate}></input>

      <button onClick={addItem}>新增</button>
    </div>
  );
};

export default Edit;
