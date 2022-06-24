

export const 最底層 = 2;
export const putIndent = (ToDoX, toDo) => {
  const indent = "     ";
  let most = ToDoX > 最底層 ? 最底層 : ToDoX;
  return <pre>{indent.repeat(most)}</pre>;
}

export const focusNode = (id, detail, toDo) => {
  let idx = toDo.findIndex((n) => n.id === id);
  if (idx === -1) return;
  let newIdx = idx + detail;
  if (newIdx >= 0 && newIdx < toDo.length)
    document.querySelectorAll("input[class='ToDoListInput form-control']")[newIdx].focus();
};

export const getLastToDoY = (toDo) => {
  return toDo[toDo.length - 1].ToDoY + 1
}

export const checkFaterCheckBox = (tmpY, tmpArr) => {
  let tmpIndent = tmpArr[tmpY].ToDoX
  for (let i = tmpY - 1; i >= 0; i--) {
    if (tmpArr[i].ToDoX < tmpIndent) {
      tmpArr[i].isChecked = false
      tmpIndent = tmpArr[i].ToDoX
    }
  }
}

export const 排Y = (tmpToDoY,tmpArr) => {
  tmpArr.map(item => {
    item.ToDoY = tmpToDoY
    ++tmpToDoY
  })
}


//import到index.js
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