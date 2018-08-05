import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';

import WithGame from "./container/game/index";

const HomePage = () => (
  <div>
    <h2>Home</h2>
  </div>
);

const AboutPage = () => (
  <div>
    <h2>About</h2>
  </div>
);

const TaskPage = ({ match }) => {
  const taskId = match.params.taskId;
  console.log("start to play taskId", taskId);
  return (
    <div>
      <h3>{taskId}</h3>
      <WithGame taskId = {taskId} key={taskId}/>
    </div>
  );
};

const TasksPage = ({ match }) => (
  <div>
    <h2>Tasks</h2>
    <ul>
      <li>
        <Link to={`${match.url}/1`}>
          Task1
        </Link>
      </li>
      <li>
        <Link to={`${match.url}/2`}>
          Task2
        </Link>
      </li>
      <li>
        <Link to={`${match.url}/3`}>
          Task3
        </Link>
      </li>
      <li>
        <Link to={`${match.url}/4`}>
          Task4
        </Link>
      </li>
      <li>
        <Link to={`${match.url}/5`}>
          Task5
        </Link>
      </li>
      <li>
        <Link to={`${match.url}/6`}>
          Task6
        </Link>
      </li>
      <li>
        <Link to={`${match.url}/7`}>
          Task7
        </Link>
      </li>
      <li>
        <Link to={`${match.url}/8`}>
          Task8
        </Link>
      </li>
    </ul>

    <Route path={`${match.path}/:taskId`} component={TaskPage}/>
    <Route exact path={match.path} render={() => (
      <h3>Please select a task.</h3>
    )}/>
  </div>
);

const App = () => (
  <Router>
    <div>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/tasks">Tasks</Link></li>
      </ul>

      <hr/>

      <Route exact path="/" component={HomePage}/>
      <Route path="/about" component={AboutPage}/>
      <Route path="/tasks" component={TasksPage}/>
    </div>
  </Router>
);

export default App;
