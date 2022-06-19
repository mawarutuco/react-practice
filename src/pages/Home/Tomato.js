import React, { useState } from "react";
import { Container, Card, Button, Form,InputGroup } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import swal from "sweetalert";

let timer = "";
const Tomato = () => {
  const [btnState, setBtnState] = useState(true);
  let init = 10;
  const [min, setMin] = useState(init);
  const [sec, setSec] = useState(0);

  const 倒數 = () => {
    setMin((pre) => pre - 1);
    console.log(min);
    if (min === 0) {
      swal({ title: "時間到" });
      reset();
    }
  };

  const doClick = (state) => {
    clearInterval(timer);
    if (state) timer = setInterval(倒數, 500);
    setBtnState((pre) => (pre = !pre));
  };

  const reset = () => {
    clearInterval(timer);
    setMin(init);
    setBtnState(true);
  };

  const check = (e) => {
    let tmp = e.target.value;
    if (tmp < 0) tmp = 0;
    setMin(tmp);
  }

  return (
    <Container>
      <Card>
        <h1>番茄鐘</h1>
        <Card.Body>
          <br />
          <InputGroup>
            <Form.Control
              type="number"
              disabled={!btnState}
              value={min}
              onChange={(e) => check(e)}
            />
            <InputGroup.Text>min</InputGroup.Text>
          </InputGroup>
        </Card.Body>
        <Card.Footer>
          <Button onClick={() => doClick(btnState)}>
            {btnState ? "Start" : "Stop"}
          </Button>
          <Button onClick={reset}>reset</Button>
        </Card.Footer>
      </Card>
    </Container>
  );
};

export default Tomato;
