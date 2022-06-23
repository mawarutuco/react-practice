// import { dataList } from "./Index";
// let toDo = dataList;

// const toDoLen = toDo.length;
export const focusNode = (id, detail, toDo) => {
  let idx = toDo.findIndex((n) => n.id === id);
  if (idx === -1) return;
  let newIdx = idx + detail;
  if (newIdx >= 0 && newIdx < toDo.length)
    document.querySelectorAll("input[class='form-control']")[newIdx].focus();
};

export const showPage = (page, toDo) => {
  switch (page) {
    case "ShowAll":
      return toDo;
    case "ShowActive":
      return toDo.filter((item) => item.isChecked === false);
    case "ShowCompleted":
      return toDo.filter((item) => item.isChecked === true);
  }
};
