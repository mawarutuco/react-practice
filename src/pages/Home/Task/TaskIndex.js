import React, { useState } from "react";
import { Container, Button, Card } from "react-bootstrap";
import swal from "sweetalert";

const TaskIndex = () => {
  const [undone, setUndone] = useState([
    { id: 1, title: "undone", content: "undone", type: "day" },
    { id: 2, title: "undone2", content: "undone2", type: "week" },
  ]);
  const [ing, setIng] = useState([
    { id: 3, title: "ing", content: "ing", type: "day" },
    { id: 4, title: "ing2", content: "ing2", type: "week" },
  ]);
  const [done, setDone] = useState([
    { id: 5, title: "done", content: "done", type: "day" },
    { id: 6, title: "done2", content: "done2", type: "week" },
  ]);

  const Tasks = ({ page }) => {
    const UndoneTasks = () => {
      return undone.map((item) => (
        <Card border="dark" key={item.id}>
          <TaskItem item={item} />
          <Card.Footer>{TaskUndoneBtn(item)}</Card.Footer>
        </Card>
      ));
    };

    const IngTasks = () => {
      return ing.map((item) => (
        <Card border="dark" key={item.id}>
          <TaskItem item={item} />
          <Card.Footer>{TaskIngBtn(item)}</Card.Footer>
        </Card>
      ));
    };

    const DoneTasks = () => {
      return done.map((item) => (
        <Card border="dark" key={item.id}>
          <TaskItem item={item} />
        </Card>
      ));
    };

    const 顯示任務 = () => {
      const all = [...undone, ...ing, ...done];
      switch (page) {
        case "undone":
          return <UndoneTasks />;

        case "ing":
          return <IngTasks />;

        case "done":
          return <DoneTasks />;

        case "day": {
          return all.map((item) => (
            <Card border="dark" key={item.id}>
              {item.type === "day" && <TaskItem item={item} />}
            </Card>
          ));
        }

        case "week": {
          return all.map((item) => (
            <Card border="dark" key={item.id}>
              {item.type === "week" && <TaskItem item={item} />}
            </Card>
          ));
        }
      }
    };
    return <Card border="dark">{顯示任務()}</Card>;
  };

  const 移轉任務 = (從這裡, 到那裏, item) => {
    //從這裡 刪除
    從這裡((prev) => prev.filter((el) => el.id != item.id));
    //新增 到那裏
    到那裏((prev) => [item, ...prev]);
  };

  const TaskUndoneBtn = (item) => {
    const 自動翻頁 = () => {
      if (undone.length === 1) setPage("ing");
    };

    return (
      <Button
        onClick={() => {
          移轉任務(setUndone, setIng, item);
          自動翻頁();
        }}
      >
        領取任務
      </Button>
    );
  };

  const TaskIngBtn = (item) => {
    const [可否領獎勵, 設定可否領獎勵] = useState(false);

    const 完成某個東西 = () => 設定可否領獎勵(true);

    return (
      <>
        <Button
          disabled={可否領獎勵 ? false : true}
          onClick={() => {
            移轉任務(setIng, setDone, item);
            swal("獲得獎勵，XXX元", { icon: "success" });
          }}
        >
          {可否領獎勵 ? "領取獎勵" : "尚未完成"}
        </Button>
        <Button variant="outline-secondary" onClick={() => 完成某個東西()}>
          完成某個東西
        </Button>
      </>
    );
  };

  const TaskItem = ({ item }) => {
    const { title, content, type } = item;

    return (
      <>
        <Card.Header>
          <h3>{title}</h3>
          <span>{type}</span>
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
      <Button onClick={() => setPage("undone")}>未完成</Button>
      <Button onClick={() => setPage("ing")}>進行中</Button>
      <Button onClick={() => setPage("done")}>已完成</Button>
      <Button onClick={() => setPage("day")}>day</Button>
      <Button onClick={() => setPage("week")}>week</Button>
      <Tasks page={page} />
    </Container>
  );
};

export default TaskIndex;
