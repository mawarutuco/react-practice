import React from "react";
import ToDoList from './pages/Home/toDoListIndex'

export { Title, Home, About, Hyo };

const Title = (props) => {
  return <h1>{props.title}</h1>;
};

const Home = () => {
  return <p>這裡是首頁</p>;
};

const About = () => {
  return <ToDoList />;
};

const Hyo = () => {
  return <p>hyo</p>;
};
