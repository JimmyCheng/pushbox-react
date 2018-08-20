import { compose, withState, withHandlers, shouldUpdate, withPropsOnChange } from "recompose";
import axios from 'axios';
import matrixParser from "../../utility/matrixParser";
import Game from "../../components/game/index";

const enhance = compose(
  withState("taskId", "updateTaskId", 1),
  withState("retry", "updateRetry", 1),
  withState("steps", "updateSteps", 0),
  withHandlers({
    handleNextTask: ({ updateTaskId}) => () => updateTaskId(n => n + 1),
    handlePrevTask: ({ updateTaskId }) => () => updateTaskId(n => n-1 > 0 ? n - 1: n),
    handleReplay: ({ updateRetry }) => () => updateRetry(n => n + 1),
    handleSteps: ({ updateSteps }) => () => updateSteps(n => n + 1),
  }),
  shouldUpdate(((props, nextProps) => {
    return props.taskId !== nextProps.taskId ||
      props.retry !== nextProps.retry ||
      props.steps !== nextProps.steps;
  })),

  withState("cells", "updateCells"),
  withState("currX", "updateCurrX"),
  withState("currY", "updateCurrY"),
  withState("boxCount", "updateBoxCount"),
  withState("history", "updateHistory", []),

  withPropsOnChange(["taskId", "retry"], props => {
    const { taskId, updateCells, updateCurrX, updateCurrY, updateBoxCount } = props;
    if(taskId) {
      const taskUrl = `task${taskId}.json`;
      return axios.get(taskUrl)
        .then(response => {
          const matrix = response.data.matrix;
          const task = {...matrixParser(matrix), isLoading: false};
          updateCells(task.cells);
          updateCurrX(task.currX);
          updateCurrY(task.currY);
          updateBoxCount(task.boxCount);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  })
);

export default enhance(Game);