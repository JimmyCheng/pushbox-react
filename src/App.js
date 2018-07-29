import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';

// import withGame from "./container/game";
// import Canvas from "./components/canvas/index";
//
// const CanvasWithGame = withGame('tasks/task88.json')(Canvas);

const Home = () => (
  <div>
    <h2>Home</h2>
  </div>
)

const About = () => (
  <div>
    <h2>About</h2>
  </div>
)

const Task = ({ match }) => (
  <div>
    <h3>{match.params.taskId}</h3>
  </div>
)

const Tasks = ({ match }) => (
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
    </ul>

    <Route path={`${match.path}/:taskId`} component={Task}/>
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
        <li><Link to="/tasks">Topics</Link></li>
      </ul>

      <hr/>

      <Route exact path="/" component={Home}/>
      <Route path="/about" component={About}/>
      <Route path="/tasks" component={Tasks}/>
    </div>
  </Router>
);

export default App;
