import React from "react";
import Canvas from "../canvas/index";

const Game = props => {
  console.log("the props are===>", JSON.stringify(props, "", 2));
  return (
    <div>
      <h1>You are playing task: {props.taskId}</h1>
      <h1>You have moved steps: {props.steps}</h1>
      <div>
        <button onClick={() => props.handleNextTask()}>Next</button>
        <button onClick={() => props.handlePrevTask()}>Prev</button>
        <button onClick={() => props.handleReplay()}>Replay</button>
        <button onClick={() => props.handleSteps()}>Steps</button>
      </div>
      <Canvas {...props} />
    </div>
  );
};

export default Game;
