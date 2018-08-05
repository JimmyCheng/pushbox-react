import { compose, withState, lifecycle } from "recompose";
import matrixParser from "../../utility/matrixParser";
import Canvas from "../../components/canvas/index";

const axios = require('axios');

const withTask = compose(
  withState("task", "updateTask"),
  lifecycle ({
    componentWillMount() {
      const taskUrl = `task${this.props.taskId}.json`;
      axios.get(taskUrl)
        .then(response => {
          const matrix = response.data.matrix;
          this.props.updateTask(matrixParser(matrix));
        })
        .catch(function (error) {
          console.log(error);
        })
        .then(function () {
        });
    }
  })
);

export default withTask(Canvas);