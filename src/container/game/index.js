import {
  compose,
  withProps,
  withState,
  withHandlers,
  shouldUpdate,
  withPropsOnChange
} from "recompose";

import { parseInt } from "lodash";
import tasks from "../../consts/tasks";
import matrixParser from "../../utility/matrixParser";
import Game from "../../components/game";

const withGameData = compose(
  withState("retry", "updateRetry", 1),
  withState("steps", "updateSteps", 0),

  shouldUpdate((props, nextProps) => {
    return (
      props.taskId !== nextProps.taskId ||
      props.retry !== nextProps.retry ||
      props.steps !== nextProps.steps
    );
  }),

  withState("grid", "updateGrid"),
  withState("currX", "updateCurrX"),
  withState("currY", "updateCurrY"),
  withState("boxCount", "updateBoxCount"),
  withState("history", "updateHistory", []),

  withPropsOnChange(["taskId", "retry"], props => {
    const {
      taskId,
      updateGrid,
      updateCurrX,
      updateCurrY,
      updateBoxCount,
      updateHistory,
      updateSteps
    } = props;
    if (taskId) {
      console.log("the task id is===>", taskId);
      const matrix = tasks[`task${taskId}`];
      console.log("the matrix is===>", matrix);
      const task = { ...matrixParser(matrix), isLoading: false };
      console.log("the task is===>", task);
      updateGrid(task.grid);
      updateCurrX(task.currX);
      updateCurrY(task.currY);
      updateBoxCount(task.boxCount);
      updateHistory([]);
      updateSteps(0);
    }
  })
);

export default withGameData(Game);
