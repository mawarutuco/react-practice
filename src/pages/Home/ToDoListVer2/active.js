export const 最底層 = 4;
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

export const checkFatherCheckBox = (tmpX, tmpY, tmpArr) => {
  for (let i = tmpY - 1; i >= 0; i--) {
    if (tmpArr[i].ToDoX < tmpX) {
      tmpArr[i].isChecked = false;
      tmpX = tmpArr[i].ToDoX;
    }
  }
};

export const deleteCountAndStart=(id,toDo)=>{
  let count = 1;
  let keep = true;
  let tmpIdx = toDo.findIndex((n) => n.id === id);
  let tmpToDoX = toDo[tmpIdx].ToDoX;
  toDo.forEach((item, index) => {
    if (keep && index > tmpIdx) {
      if (item.ToDoX > tmpToDoX) {
        count++;
      } else {
        keep = false;
      }
    }
  });
  return {count,tmpIdx}
}

export const deleteToDoItem = (count,tmpIdx,toDo,setToDo) => {
  let tmpArr = [...toDo];
  tmpArr.splice(tmpIdx, count);
  排Y(tmpArr);
  setToDo(tmpArr);
  console.log(tmpArr);
};

//未使用
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
    //不能只判斷樓下一位...贛
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

export const 往上搬移 = (toDo, setToDo, id) => {
  let tmpIdx = toDo.findIndex((item) => item.id === id);
  if (tmpIdx === 0) return;

  let tmpX = toDo[tmpIdx].ToDoX;
  let changeIdx;

  for (let i = tmpIdx - 1; i >= 0; i--) {
    if (toDo[i].ToDoX < tmpX) return;
    if (toDo[i].ToDoX === tmpX) {
      changeIdx = toDo[i].ToDoY;
      break;
    }
  }

  let tmpArr = [...toDo];
  let HYO = changeIdx;
  tmpArr[tmpIdx].ToDoY = HYO;
  HYO += 1;

  let keep = true;
  tmpArr.map((item, index) => {
    if (index > tmpIdx) {
      if (item.ToDoX <= tmpX) keep = false;
      if (keep) {
        item.ToDoY = HYO;
        HYO += 1;
      }
    }
  });

  tmpArr[changeIdx].ToDoY = HYO;
  HYO += 1;
  keep = true;
  tmpArr.map((item, index) => {
    if (index > changeIdx) {
      if (item.ToDoX <= tmpX) keep = false;
      if (keep) {
        item.ToDoY = HYO;
        HYO += 1;
      }
    }
    return item;
  });

  tmpArr.sort(function (a, b) {
    return a.ToDoY - b.ToDoY;
  });

  setToDo(tmpArr);
};

export const 往下搬移 = (toDo, setToDo, id) => {
  if (toDo[toDo.length - 1].id === id) return;
  let tmpIdx = toDo.findIndex((n) => n.id === id);
  let tmpItem = toDo[tmpIdx];
  let tmpX = tmpItem.ToDoX;

  //先找最近可換的
  let changeIdx = toDo.findIndex((n, index) => {
    return index > tmpIdx && n.ToDoX === tmpX;
  });
  if (changeIdx === -1) return;

  //防止跟別人家同階互換
  if (toDo[changeIdx - 1].ToDoX < tmpX) return;

  let HYO = tmpIdx;
  toDo[changeIdx].ToDoY = HYO;
  HYO += 1;

  let keep = true;
  let tmpArr = toDo.map((item, index) => {
    if (index > changeIdx) {
      if (item.ToDoX <= tmpX) keep = false;
      if (keep) {
        item.ToDoY = HYO;
        HYO += 1;
      }
    }
    return item;
  });

  toDo[tmpIdx].ToDoY = HYO;
  HYO += 1;
  keep = true;
  tmpArr.map((item, index) => {
    if (index > tmpIdx) {
      if (item.ToDoX <= tmpX) keep = false;
      if (keep) {
        item.ToDoY = HYO;
        HYO += 1;
      }
    }
    return item;
  });
  tmpArr.sort(function (a, b) {
    return a.ToDoY - b.ToDoY;
  });
  setToDo(tmpArr);
};

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
