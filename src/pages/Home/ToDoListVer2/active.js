export const 最底層 = 3;

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

const 排Y = (tmpArr) => {
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

const 計算範圍 = (x, y, toDo) => {
  let count = 1
  let keep = true
  toDo.forEach((item, index) => {
    if (keep && index > y) {
      if (x < item.ToDoX) count++
      if (x >= item.ToDoX) keep = false
    }
  })
  return count
}

const 移動 = (前, 前count, 後, 後count, arr) => {
  arr.map((item, index) => {
    if (index >= 前 && index < 後) { item.ToDoY += 後count }
    if (index >= 後 && index < (後 + 後count)) { item.ToDoY -= 前count }
  })
}

export const 取消縮排 = (toDo, setToDo, id) => {
  let tmpIdx = toDo.findIndex((item) => item.id === id);
  let tmpItem = toDo[tmpIdx];
  let { ToDoX: tmpX, ToDoY: tmpY } = tmpItem
  if (tmpX === 0) return;
  let tmpArr = [...toDo];

  let 前count = 計算範圍(tmpX, tmpY, toDo)
  let 下一位Y = (tmpY + 前count)

  if (toDo[下一位Y] !== undefined && tmpX <= toDo[下一位Y].ToDoX) {
    let 後count = 計算範圍((tmpX - 1), 下一位Y, toDo)
    移動(tmpIdx, 前count, 下一位Y, 後count, tmpArr)
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
let tmpArr=[...toDo]
  let 前count = 計算範圍(tmpX, originalIdx, toDo)
  let 下一位Y = (originalIdx + 前count)
  let 後count = 計算範圍(tmpX, 下一位Y, toDo)
  console.log(originalIdx,前count,下一位Y,後count);
  移動(originalIdx,前count,下一位Y,後count,tmpArr)
 
  tmpArr.sort((a, b) => {
    return a.ToDoY - b.ToDoY;
  });

  console.log(tmpArr);
  setToDo(tmpArr);
};

//import到index.js
export const showPage = (page, toDo) => {
  switch (page) {
    case "All":
      return toDo;
    case "Active":
      return toDo.filter((item) => item.isChecked === false);
    case "Completed":
      return toDo.filter((item) => item.isChecked === true);
  }
};

// 計算範圍 x,y
// 執行縮排 2
// 執行移動 2