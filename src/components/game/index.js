import React from "react";
import Canvas from "../canvas/index";

const Game = props => {
  console.log("the props are===>", JSON.stringify(props, "", 2));
  return (
    <div>
      <h1>You are playing task: {props.taskId}</h1>
      <h1>You have moved steps: {props.steps}</h1>
      <Canvas {...props} />
    </div>
  );
};

export default Game;
