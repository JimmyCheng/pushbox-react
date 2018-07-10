import { compose, withState, withProps} from "recompose";
import matrixParser from "../../utility/matrixParser";
const axios = require('axios');

const initialize = () => {
  return axios.get(`/tasks/task1.tsk`)
    .then(response => {
      console.log("==>", response.data.url);
      console.log("-->", response.data.explanation);
      const matrix = response.data.matrix;
      const initState = matrixParser(matrix);
      return initState;
    })
    .catch(error => {
      console.log(error);
    });
  };

// async function initialize() {
//   try {
//     const response = await axios.get(`tasks/task1.json`);
//     const matrix = response.data.matrix;
//     const initState = matrixParser(matrix);
//
//     return initState;
//   } catch (e) {
//     console.log(e);
//   }
// }

const getTaskProps = (props) => {

  console.log("======>");


    const initState = initialize();

    console.log("======",initState);
    props.updateCells(initState.cells);
    props.updateCurrX(initState.currX);
    props.updateCurrY(initState.currY);

    return props;
};

const withTask = compose(
  withState("cells", "updateCells", []),
  withState("currX", "updateCurrX", 0),
  withState("currY", "updateCurrY", 0),
  withState("history", "updateHistory", []),
  withProps(getTaskProps)
);

export default withTask;

//---------------------------------
//I struggled to use the pure component but failed.
//refer to https://medium.com/@learnreact/container-components-c0e67432e005

// import React from 'react';
// import Canvas from "../../components/canvas/index";
// import matrixParser from "../../utility/matrixParser";
//
// const axios = require('axios');
// class GameTask extends React.Component {
//   constructor() {
//     super();
//     this.state = {
//       cells: [],
//       currX: 0,
//       currY: 0,
//       boxCount: 0
//     };
//   }
//
//   async initialize() {
//     try {
//       const response = await axios.get(`tasks/task1.json`);
//       const matrix = response.data.matrix;
//       const initState = matrixParser(matrix);
//
//       this.setState(initState);
//     } catch (e) {
//       console.log(e);
//     }
//   }
//
//   componentDidMount() {
//     this.initialize();
//   }
//
//   render() {
//     return (
//       <Canvas cells={this.state.cells} currX={this.state.currX} currY={this.state.currY} boxCount={this.state.boxCount} history={[]}/>
//     );
//   }
// }
//
// export  default GameTask;
