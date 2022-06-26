export const 最底層 = 4;

const indent = "     ";
export const putIndent = (ToDoX) => {
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
  if (toDo.length === 0) return 0;
  return toDo[toDo.length - 1].ToDoY + 1;
};

export const checkFatherCheckBox = (tmpX, tmpY, tmpArr) => {
  for (let i = tmpY - 1; i >= 0; i--) {
    if (tmpArr[i].ToDoX < tmpX) {
      tmpArr[i].isChecked = false;
      tmpX = tmpArr[i].ToDoX;
    }
  }
};

export const deleteCountAndStart = (id, toDo) => {
  let count = 1;
  let keep = true;
  let tmpIdx = toDo.findIndex((n) => n.id === id);
  let tmpX = toDo[tmpIdx].ToDoX;
  toDo.forEach((item, index) => {
    if (keep && index > tmpIdx) {
      item.ToDoX > tmpX ? count++ : (keep = false);
    }
  });
  return { count, tmpIdx };
};

export const 排Y = (tmpArr) => {
  let tmpY = 0;
  tmpArr.map((item) => {
    item.ToDoY = tmpY;
    ++tmpY;
  });
};

export const deleteToDoItem = (count, tmpIdx, toDo, setToDo) => {
  let tmpArr = [...toDo];
  tmpArr.splice(tmpIdx, count);
  排Y(tmpArr);
  setToDo(tmpArr);
};

export const 調整子階縮排 = (tmpIdx, detail, tmpArr) => {
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

export const 縮排 = (toDo, setToDo, id) => {
  let tmpIdx = toDo.findIndex((item) => item.id === id);
  let tmpItem = toDo[tmpIdx];

  if (tmpItem.ToDoX === 最底層 || tmpIdx === 0) return;
  if (toDo[tmpIdx - 1].ToDoX < tmpItem.ToDoX) return;

  let tmpArr = [...toDo];
  調整子階縮排(tmpIdx, 1, tmpArr);
  setToDo(tmpArr);
};

export const 取消縮排 = (toDo, setToDo, id) => {
  let tmpIdx = toDo.findIndex((item) => item.id === id);
  let tmpItem = toDo[tmpIdx];
  if (tmpItem.ToDoX === 0) return;
  let tmpArr = [...toDo];

  //如果A跟B同階為兄弟，A升級後不能成為B的爸爸，所以A升級後要扔到下一個長輩或同階的上面
  if (
    tmpIdx !== toDo.length - 1 &&
    tmpItem.ToDoX === toDo[tmpIdx + 1].ToDoX
    //不能只判斷樓下一位...
  ) {
    let keep = true;
    let tmpItem = tmpArr[tmpIdx];

    let 下一個長輩同階 = tmpArr.findIndex(
      (item, index) => index > tmpIdx && item.ToDoX <= tmpItem.ToDoX - 1
    );

    let newTmpToDoY =
      (下一個長輩同階 === -1 ? tmpArr.length : 下一個長輩同階) - 1;
    tmpItem.ToDoY = newTmpToDoY;
    tmpArr.map((item, index) => {
      if (index === 下一個長輩同階) keep = false;
      if (keep && index > tmpIdx) item.ToDoY -= 1;
    });
  }

  調整子階縮排(tmpIdx, -1, tmpArr);

  tmpArr.sort(function (a, b) {
    return a.ToDoY - b.ToDoY;
  });

  setToDo(tmpArr);
};

export const moveUp = (toDo, setToDo, id) => {
  let originalIdx = toDo.findIndex((item) => item.id === id);
  if (originalIdx === 0) return;

  let tmpArr = [...toDo];
  let tmpX = toDo[originalIdx].ToDoX;
  let changeIdx;

  //往上找最近可以換位置的，若碰到長輩就跳離
  for (let i = originalIdx - 1; i >= 0; i--) {
    let now = toDo[i];
    let nowX = now.ToDoX;
    if (nowX < tmpX) return;
    if (nowX === tmpX) {
      changeIdx = now.ToDoY;
      break;
    }
  }

  let currentIdx = changeIdx;
  tmpArr[originalIdx].ToDoY = currentIdx;
  let keep = true;
  tmpArr.map((item, index) => {
    if (index > originalIdx) {
      if (item.ToDoX <= tmpX) keep = false;
      if (keep) {
        ++currentIdx;
        item.ToDoY = currentIdx;
      }
    }
  });

  ++currentIdx;
  tmpArr[changeIdx].ToDoY = currentIdx;
  keep = true;
  tmpArr.map((item, index) => {
    if (index > changeIdx) {
      if (item.ToDoX <= tmpX) keep = false;
      if (keep) {
        ++currentIdx;
        item.ToDoY = currentIdx;
      }
    }
    return item;
  });

  tmpArr.sort((a, b) => {
    return a.ToDoY - b.ToDoY;
  });

  console.log(tmpArr);
  setToDo(tmpArr);
};

export const moveDown = (toDo, setToDo, id) => {
  if (toDo[toDo.length - 1].id === id) return;
  let originalIdx = toDo.findIndex((n) => n.id === id);
  let tmpItem = toDo[originalIdx];
  let tmpX = tmpItem.ToDoX;

  //往下找最近可以換位置的，找不到就跳離開
  let changeIdx = toDo.findIndex(
    (n, index) => index > originalIdx && n.ToDoX === tmpX
  );
  if (changeIdx === -1) return;

  //防止跟別人家同階互換
  if (toDo[changeIdx - 1].ToDoX < tmpX) return;

  let currentIdx = originalIdx;
  toDo[changeIdx].ToDoY = currentIdx;

  let keep = true;
  let tmpArr = toDo.map((item, index) => {
    if (index > changeIdx) {
      if (item.ToDoX <= tmpX) keep = false;
      if (keep) {
        currentIdx += 1;
        item.ToDoY = currentIdx;
      }
    }
    return item;
  });

  ++currentIdx;
  toDo[originalIdx].ToDoY = currentIdx;
  keep = true;
  tmpArr.map((item, index) => {
    if (index > originalIdx) {
      if (item.ToDoX <= tmpX) keep = false;
      if (keep) {
        ++currentIdx;
        item.ToDoY = currentIdx;
      }
    }
    return item;
  });

  tmpArr.sort((a, b) => {
    return a.ToDoY - b.ToDoY;
  });

  console.log(tmpArr);
  setToDo(tmpArr);
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
