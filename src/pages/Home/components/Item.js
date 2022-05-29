const Item = ({
  id,
  noteData,
  date,
  deleteData,
  submittingStatus,
  isCompleted,
}) => {
  
  function deleteItem() {
    submittingStatus.current = true;
    deleteData(function (pre) {
      return pre.filter((item) => item.id !== id);
    });
  }


  return (
    <div>
      <input type="checkbox"></input>
      <input type="text" defaultValue={noteData}></input>
      {date}
      <button onClick={deleteItem}>刪除</button>
      <hr />
    </div>
  );
};

export default Item;
