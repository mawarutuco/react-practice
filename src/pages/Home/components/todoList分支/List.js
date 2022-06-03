import Item from "./Item";

const List = ({ listData, deleteData, submittingStatus }) => {
  return (
    <div>
      {listData.map((item) => {
        const { note, date, id, done } = item;

        return (
          <Item
          listData={listData}
            id={id}
            done={done}
            key={id}
            noteData={note}
            date={date}
            deleteData={deleteData}
            submittingStatus={submittingStatus}
          />
        );
      })}
    </div>
  );
};



export default List;
