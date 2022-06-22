// export const focusNode = () => {
//   let idx = toDo.findIndex((n) => n.id === id);
//   if (idx === -1) return;
//   let newIdx = idx - 1;
//   document.querySelectorAll("input[class='form-control']")[newIdx].focus();
// };

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
