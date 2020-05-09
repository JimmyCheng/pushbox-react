import React from "react";
import { useHistory } from "react-router-dom";
import { map, range } from "lodash";

const Task = ({ task, history }) => {
  const onClickTask = () => {
    history.push(`/task/${task}`);
  };

  return <button onClick={onClickTask}>task {task}</button>;
};
const HomePage = () => {
  const history = useHistory();
  const tasks = range(1, 101);

  return (
    <div>
      <h2>Home</h2>
      {map(tasks, task => (
        <Task key={task} history={history} task={task} />
      ))}
    </div>
  );
};

export default HomePage;
