import React from "react";
import Game from "../app";

const TaskPage = ({ match }) => {
  const taskId = match.params.taskId;
  console.log("start to play taskId", taskId);
  return (
    <div>
      <Game taskId = {taskId}/>
    </div>
  );
};

export default TaskPage;