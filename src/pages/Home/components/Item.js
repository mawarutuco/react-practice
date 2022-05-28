import { useState } from "react";

const Item = ({
  id,
  noteData,
  date,
  deleteData,
  submittingStatus,
  isCompleted,
}) => {
  const [canModify, setCanModify] = useState('');
  
  function deleteItem() {
    submittingStatus.current = true;
    deleteData(function (pre) {
      return pre.filter((item) => item.id !== id);
    });
  }


  return (
    <div>
      <input type="checkbox"></input>
      <input id="doToItem" type="text" defaultValue={noteData}></input>
      {date}
      <button onClick={deleteItem}>刪除</button>
      <hr />
    </div>
  );
};

export default Item;
