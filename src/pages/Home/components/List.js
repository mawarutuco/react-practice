import Item from "./Item";

const List = ({ listData, deleteData, submittingStatus }) => {
  return (
    <div>
      {listData.map((item) => {
        const { note, date, id, isCompleted } = item;

        return (
          <Item
            id={id}
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
