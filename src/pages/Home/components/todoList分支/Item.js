const Item = ({ done,id, noteData, date, deleteData, submittingStatus }) => {
  function deleteItem(id) {
    submittingStatus.current = true;
    deleteData(function (pre) {
      return pre.filter((item) => item.id !== id);
    });
  }

  //打勾完成事項
  const completeHandler = (id) => {
    // const nowStateList = list.map((toDoItem) => {
    //   if (toDoItem.id === id) toDoItem.done = !toDoItem.done;
    //   return toDoItem;
    // });
    // setList(nowStateList);
  };

  const modifyToDoItem = (id) => {
    // const nowStateList = list.map((toDoItem) => {
    //   if (toDoItem.id === id) toDoItem.item = prompt("編輯");
    //   return toDoItem;
    // });
    // setList(nowStateList);
  };

  return (
    <div>
      <input type="checkbox" checked={done} onChange={completeHandler}></input>
      <span type="text" value={noteData}></span>
      {date}
      <button onClick={()=>modifyToDoItem(id)}>修改</button>
      <button onClick={()=>deleteItem(id)}>刪除</button>
      <hr />
    </div>
  );
};

export default Item;
