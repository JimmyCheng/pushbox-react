import React from 'react';
import Canvas from '../canvas/index';

const Game = props => {
  return (
    <div>
      <div>
        <button onClick={() => props.handleNextTask()}>Next</button>
        <button onClick={() => props.handlePrevTask()}>Prev</button>
        <button onClick={() => props.handleReplay()}>Replay</button>
      </div>
      <Canvas {...props}/>

    </div>
  );
};

export default Game;