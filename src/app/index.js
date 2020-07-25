//reference: https://reacttraining.com/react-router/web/example/basic

import React from "react";

import DefaultLayout from "./DefaultLayout";
import Routes from "./Routes";

const App = props => {
  return (
    <DefaultLayout>
      <Routes {...props} />
    </DefaultLayout>
  );
};

export default App;
