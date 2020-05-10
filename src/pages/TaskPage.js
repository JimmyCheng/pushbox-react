import React from "react";
import { useRouteMatch, useHistory } from "react-router-dom";
import { get } from "lodash";
import Game from "../components/game";

const TaskPage = props => {
  const match = useRouteMatch("/task/:id");
  const taskId = match ? parseInt(match.params.id) : null;
  const history = useHistory();

  const handleNextTask = () => {
    if (taskId + 1 <= 101) {
      history.push(`/task/${taskId + 1}`);
    }
  };

  const handlePreviousTask = () => {
    if (taskId - 1 >= 0) {
      history.push(`/task/${taskId - 1}`);
    }
  };

  const handleReplay = () => history.push(`/task/${taskId}`);

  return (
    <div>
      <Game taskId={taskId} />
      <button onClick={handleNextTask}>Next</button>
      <button onClick={handlePreviousTask}>Prev</button>
      <button onClick={handleReplay}>Replay</button>
    </div>
  );
};

export default TaskPage;
