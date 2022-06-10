import React, { useState } from "react";
import { Container, Button, Card } from "react-bootstrap";
import swal from "sweetalert";
import "./Task.css";

const TaskIndex = () => {
  const [undone, setUndone] = useState([
    { id: 1, title: "undone", content: "undone" },
    { id: 2, title: "undone2", content: "undone2" },
  ]);
  const [ing, setIng] = useState([
    { id: 3, title: "ing", content: "ing" },
    { id: 4, title: "ing2", content: "ing2" },
  ]);
  const [done, setDone] = useState([
    { id: 5, title: "done", content: "done" },
    { id: 6, title: "done2", content: "done2" },
  ]);

  const Tasks = ({ page }) => {
    return (
      <Card border="dark">
        {page === "undone" &&
          undone.map((item) => (
            <Card border="dark" key={item.id}>
              <TaskItem item={item} page={page} />
              <Card.Footer>{TaskUndoneBtn(item)}</Card.Footer>
            </Card>
          ))}
        {page === "ing" &&
          ing.map((item) => (
            <Card border="dark" key={item.id}>
              <TaskItem item={item} page={page} />
              <Card.Footer>{TaskIngBtn(item)}</Card.Footer>
            </Card>
          ))}
        {page === "done" &&
          done.map((item) => (
            <Card border="dark" key={item.id}>
              <TaskItem item={item} page={page} />
            </Card>
          ))}
      </Card>
    );
  };

  const 移轉任務所在地 = (從這裡, 到那裏, item) => {
    //從這裡 刪除
    從這裡((prev) => prev.filter((el) => el.id != item.id));
    //新增 到那裏
    到那裏((prev) => [item, ...prev]);
  };

  const TaskUndoneBtn = (item) => {
    return (
      <Button onClick={() => 移轉任務所在地(setUndone, setIng, item)}>
        領取任務
      </Button>
    );
  };

  const TaskIngBtn = (item) => {
    const [可否領獎勵, 設定可否領獎勵] = useState(true);
    return (
      <Button
        disabled={可否領獎勵 ? false : true}
        onClick={() => {
          移轉任務所在地(setIng, setDone, item);
          swal("獲得獎勵，XXX元", { icon: "success" });
        }}
      >
        {可否領獎勵 ? "領取獎勵" : "尚未完成"}
      </Button>
    );
  };

  const TaskItem = ({ item, page }) => {
    const { title, content } = item;

    return (
      <>
        <Card.Header>
          <h3>{title}</h3>
        </Card.Header>
        <Card.Body>
          <p>{content}</p>
        </Card.Body>
      </>
    );
  };

  const [page, setPage] = useState("ing");

  return (
    <Container>
      <Button onClick={() => console.log("完成某個東西")}>完成某個東西</Button>
      <hr />
      <Button onClick={() => setPage("undone")}>未完成</Button>
      <Button onClick={() => setPage("ing")}>進行中</Button>
      <Button onClick={() => setPage("done")}>已完成</Button>
      <Tasks page={page} />
    </Container>
  );
};

export default TaskIndex;
