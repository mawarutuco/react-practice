// import React, { useState, useEffect, useRef } from "react";
// import style from "./style/game.module.scss";
// export default () => {
//   const arr = [
//     [0, 1, 2],
//     [3, 4, 5],
//     [6, 7, 8],
//     [0, 3, 6],
//     [1, 4, 7],
//     [2, 5, 8],
//     [0, 4, 8],
//     [2, 4, 6],
//   ];

//   const [record, setRecord] = useState(Array.from({ length: 9 }));

//   const [player, setPlayer] = useState(1);
//   const canvasRef = useRef();

//   const caculation = () => {
//     let length = arr.length;
//     for (let i = 0; i < length; i++) {
//       let total = 0;
//       for (let k = 0; k < 3; k++) {
//         total += record[arr[i][k]];
//       }
//       if (Math.abs(total) === 3) {
//         getPos(arr[i]);
//         break;
//       }
//     }
//   };

//   const getPos = (arr) => {
//     let start = arr[0];
//     let end = arr[2];
//     let position = [50, 150, 250];
//     let obj = {
//       start: {
//         x: position[start % 3],
//         y: position[Math.floor(start / 3)],
//       },
//       end: {
//         x: position[end % 3],
//         y: position[Math.floor(end / 3)],
//       },
//     };
//     drawLine(obj);
//   };

//   const drawLine = (obj) => {
//     const canvas = canvasRef.current;
//     let ctx = canvas.getContext("2d");
//     ctx.beginPath();
//     ctx.moveTo(obj.start.x, obj.start.y);
//     ctx.lineTo(obj.end.x, obj.end.y);
//     ctx.lineWidth = 5;
//     ctx.stroke();
//     console.log(player + "player winner");
//   };

//   const handleClick = (event, index) => {
//     record[index] = player;
//     setRecord(record);
//     caculation();
//     setPlayer(player * -1);
//   };

//   const resetGame = () => {
//     setRecord(Array.from({ length: 9 }));
//     setPlayer(1);
//   };

//   return (
//     <div className={style.container}>
//       <canvas
//         width="300"
//         height="300"
//         className={style.myCanvas}
//         ref={canvasRef}
//       />
//       {record.map((vo, k) => {
//         return (
//           <div
//             className={style.item}
//             key={k}
//             onClick={(event) => handleClick(event, k)}
//           >
//             <span className={style.content}>
//               {vo > 0 ? "o" : vo < 0 ? "x" : ""}
//             </span>
//           </div>
//         );
//       })}
//       <button onClick={resetGame}>resetGame</button>
//     </div>
//   );
// };
