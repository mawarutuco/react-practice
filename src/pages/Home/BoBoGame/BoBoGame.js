import { useState } from "react";
import "./all.css";

const BoBoGame = () => {
  const [newState, setNewStage] = useState();

  const ids = [];
  

  const Stage = () => {
    const stage = [];

    const reset = () => {};
    for (let i = 0; i < 25; i++) {
      ids.push(i);
      stage.push(<Ceil key={i} id={i} />);
    }
    stage.push(
      <button key={"reset"} onClick={() => reset()}>
        reset
      </button>
    );
    return stage;

    
  };

  const Ceil = (props) => {
    const [isClick, setClick] = useState("step");

    const getCeilNear = (id) => {
      console.log(id - 6);
      //   ids.map((el)=>{
      //     console.log('並觸發',el);
      //     if(el===id-6)setClick("step active");
      //     return
      //   })
    };

    //九宮格 -6~-4、-1、+1、+4~+6
    const active = (id) => {
      setClick("step active");
      ids.map((el) => {
        if (el === id - 6) {
          console.log(el, id);
          return;
        }
      });
    };

    const reset = () => {
      setClick("step");
    };

    return (
      <button onClick={() => active(props.id)} className={isClick}></button>
    );
  };

  return (
    <div className="outStage">
      <Stage />
    </div>
  );
};

export default BoBoGame;
