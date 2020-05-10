import React, { useState, useEffect, Fragment } from "react";

import tasks from "../../consts/tasks";
import Canvas from "../canvas/index";
import matrixParser from "../../utility/matrixParser";

const Game = ({ taskId }) => {
  const matrix = tasks[`task${taskId}`];
  const task = matrixParser(matrix);
  console.log("taskId is===>", taskId);
  console.log("matrix is===>", matrix);

  return (
    <div>
      <Canvas task={task} />
    </div>
  );
};

export default Game;
