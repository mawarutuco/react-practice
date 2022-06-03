import { useState, useEffect,useRef } from "react";
import { v4 } from "uuid";

const Edit = ({ add, submittingStatus }) => {
  const inputRef = useRef(null);

  const [note, setNote] = useState("");
  const changeNote = (e) => setNote(e.target.value);

  const [date, setDate] = useState("");
  const changeDate = (e) => setDate(e.target.value);

  const [onlyId, setId] = useState(2);

  const addItem = () => {
    const pushItem = (prev) => [
      { id: onlyId, note, date, done: false },
      ...prev,
    ];
    // submittingStatus.current = true;
    setId(onlyId + 1);
    add(pushItem);
    setNote("");

    inputRef.current.focus();
  };

  const enterToAddItem = (ev) => {
    if (ev.keyCode == 13) addItem();
  };

  return (
    <div>
      <p>記事：</p>
      <input
        ref={inputRef}
        type="text"
        value={note}
        onChange={changeNote}
        onKeyUp={enterToAddItem}
      ></input>
      <p>預計完成日：</p>
      <input
        type="date"
        value={date}
        onChange={changeDate}
        onKeyUp={enterToAddItem}
      ></input>

      <button onClick={addItem}>新增</button>
    </div>
  );
};

export default Edit;
