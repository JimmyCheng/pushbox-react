import React from "react";
import Canvas from "../canvas/index";

const Game = ({ taskId }) => {
  return (
    <div>
      <Canvas taskId={taskId} />
    </div>
  );
};

export default Game;
