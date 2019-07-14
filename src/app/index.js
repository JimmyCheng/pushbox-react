//reference: https://reacttraining.com/react-router/web/example/basic

import React from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import { Route, Switch } from "react-router-dom";

import HomePage from "../pages/HomePage";
import AboutPage from "../pages/AboutPage";
import TasksPage from "../pages/TasksPage";
import TaskPage from "../pages/TaskPage";
import AlbumPage from "../pages/Album";

const App = props => {
  return (
      <Router>
        <Switch>
          <Route exact path="/" render={({ match }) => {
            return <HomePage {...props} match={match} />;
          }}/>

          <Route exact path="/about" render={({ match }) => {
            return <AboutPage {...props} match={match} />;
          }}/>

          <Route exact path="/tasks" render={({ match }) => {
            return <TasksPage {...props} match={match} />;
          }}/>

            <Route exact path="/task/:id" render={({ match }) => {
                return <TaskPage {...props} match={match} />;
            }}/>
            <Route exact path="/album" render={({ match }) => {
                return <AlbumPage {...props} match={match} />;
            }}/>
        </Switch>
      </Router>
  );
};

export default App;
