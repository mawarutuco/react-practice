import { useState, useEffect } from "react";
import { v4 } from "uuid";

const Edit = ({ add, submittingStatus }) => {
  const [note, setNote] = useState("");
  const changeNote = (e) => setNote(e.target.value);

  const [date, setDate] = useState("");
  const changeDate = (e) => setDate(e.target.value);

  const addItem = () => {
    const pushItem = (prev) => [
      { id: v4(), note, date, },
      ...prev,
    ];
    submittingStatus.current = true;
    add(pushItem);
  };

  return (
    <div>
      <p>記事：</p>
      <input type="text" value={note} onChange={changeNote}></input>
      <p>預計完成日：</p>
      <input type="date" value={date} onChange={changeDate}></input>

      <button onClick={addItem}>新增</button>
    </div>
  );
};

export default Edit;
