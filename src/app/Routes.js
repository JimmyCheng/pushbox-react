import React from "react";
import { Route, Switch } from "react-router-dom";

import HomePage from "../pages/HomePage";
import AboutPage from "../pages/AboutPage";
import TasksPage from "../pages/TasksPage";
import TaskPage from "../pages/TaskPage";

const Routes = props => {
  return (
    <Switch>
      <Route
        exact
        path="/"
        render={({ match }) => {
          return <HomePage {...props} match={match} />;
        }}
      />

      <Route
        exact
        path="/about"
        render={({ match }) => {
          return <AboutPage {...props} match={match} />;
        }}
      />

      <Route
        exact
        path="/tasks"
        render={({ match }) => {
          return <TasksPage {...props} match={match} />;
        }}
      />

      <Route
        exact
        path="/task/:id"
        render={({ match }) => {
          return <TaskPage {...props} match={match} />;
        }}
      />
    </Switch>
  );
};

export default Routes;
