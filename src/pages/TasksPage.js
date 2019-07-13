import React from "react";
import { map } from "lodash";

const TasksPage = ({ match }) => {
  const games = Array.from({length: 100}, (v, k) => k+1);
  return (
    <div>
      {map(games, game => {
      <div>
        <a href = "game">{game}</a>
      </div>
    })}
    </div>
  );
};

export default TasksPage;