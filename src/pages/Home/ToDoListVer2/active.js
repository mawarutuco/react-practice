export const 最底層 = 2;
export const putIndent = (ToDoX, toDo) => {
  const indent = "     ";
  let most = ToDoX > 最底層 ? 最底層 : ToDoX;
  return <pre>{indent.repeat(most)}</pre>;
};

export const focusNode = (id, detail, toDo) => {
  let idx = toDo.findIndex((n) => n.id === id);
  if (idx === -1) return;
  let newIdx = idx + detail;
  if (newIdx >= 0 && newIdx < toDo.length)
    document
      .querySelectorAll("input[class='ToDoListInput form-control']")
      [newIdx].focus();
};

export const getLastToDoY = (toDo) => {
  return toDo[toDo.length - 1].ToDoY + 1;
};

export const checkFatherCheckBox = (tmpY, tmpArr) => {
  let tmpIndent = tmpArr[tmpY].ToDoX;
  for (let i = tmpY - 1; i >= 0; i--) {
    if (tmpArr[i].ToDoX < tmpIndent) {
      tmpArr[i].isChecked = false;
      tmpIndent = tmpArr[i].ToDoX;
    }
  }
};

export const checkBrotherNotToBeFather = (tmpIdx, tmpArr) => {
  // let keep = true;
  // let tmpItem = tmpArr[tmpIdx];
  // let 下一個長輩同階 = tmpArr.findIndex(
  //   (item, index) => index > tmpIdx && item.ToDoX <= tmpItem.ToDoX - 1
  // );
  // let newTmpToDoY =
  //   (下一個長輩同階 === -1 ? tmpArr.length : 下一個長輩同階) - 1;
  // tmpItem.ToDoY = newTmpToDoY;
  // tmpArr.map((item, index) => {
  //   if (index === 下一個長輩同階) keep = false;
  //   if (keep && index > tmpIdx) item.ToDoY -= 1;
  // });
};

export const 縮排或取消縮排 = (tmpIdx, detail, tmpArr) => {
  let tmpItem = tmpArr[tmpIdx];
  let tmpX = tmpItem.ToDoX;

  tmpItem.ToDoX += detail;
  let keep = true;
  tmpArr.map((item, index) => {
    if (keep && index > tmpIdx) {
      if (item.ToDoX <= tmpX) {
        keep = false;
      } else {
        item.ToDoX += detail;
        if (detail > 0 && item.ToDoX > 最底層) item.ToDoX = 最底層;
      }
    }
    return item;
  });
};

export const 縮排=()=>{
  
}

export const 排Y = (tmpArr) => {
  let tmpToDoY = 0;
  tmpArr.map((item) => {
    item.ToDoY = tmpToDoY;
    ++tmpToDoY;
  });
};

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
