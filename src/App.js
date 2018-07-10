import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import withGame from "./container/game";
import Canvas from "./components/canvas/index";

const CanvasWithGame = withGame('tasks/task88.json')(Canvas);

class App extends Component {
  render() {
    return (
      <div>
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h1 className="App-title">Welcome to React</h1>
          </header>
          <p className="App-intro">
            To get started, edit <code>src/App.js</code> and save to reload.
          </p>
        </div>

        <CanvasWithGame />
      </div>
    );
  }
}

export default App;
