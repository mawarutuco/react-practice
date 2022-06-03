import React from "react";
import ToDoList from "../Home/toDoListIndex";
import { Circle, Cross } from "react-awesome-shapes";
import BootstrapTest from "../Home/components/bootstrapTest";
import "../Home/i18nTest/i18n.js";
import TestTranslation from "../Home/i18nTest/testTranslation.js";

export {
  Title,
  ReactAwesomeShapes,
  ToDoListComponent,
  BootstrapTestComponent,
  Hyo,
  TestTranslationComponent,
};

const Title = (props) => {
  return <h1>{props.title}</h1>;
};

const ReactAwesomeShapes = () => {
  return (
    <div>
      <Circle
        color="linear-gradient(135deg, red, white)"
        size={["150px", "150px", "180px", "180px"]}
        zIndex={1}
      />
      <Cross size="50px" zIndex={2} color="#0ea5e9" />
    </div>
  );
};

const Hyo = () => {
  return <p>hyo</p>;
};

const ToDoListComponent = () => {
  return <ToDoList />;
};

const BootstrapTestComponent = () => {
  return <BootstrapTest />;
};
const TestTranslationComponent = () => {
  return <TestTranslation />;
};
