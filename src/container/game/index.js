import React from 'react';
import matrixParser from "../../utility/matrixParser";
const axios = require('axios');

const withGame = (taskUrl) => (WrappedComponent) => {
  return class TaskLoader extends React.Component {
    state = {
      task: null
    };

    async initialize() {
      const response = await axios.get(taskUrl);
      const matrix = response.data.matrix;
      this.setState({task: matrixParser(matrix)});
    }

    componentDidMount() {
      this.initialize();
    }

    render() {
      return (
        <WrappedComponent task={this.state.task}/>
      );
    }
  }
};

export default withGame;
