import { compose, withProps, withState, withHandlers, shouldUpdate, withPropsOnChange } from "recompose";
import tasks from "../../consts/tasks";
import matrixParser from "../../utility/matrixParser";
import Game from "../../components/game";

const withGameData = compose(
    withProps( ({match}) => {return {initialTask: match.params.id}}),
  withState("taskId", "updateTaskId", ({initialTask}) => initialTask),
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

  withState("grid", "updateGrid"),
  withState("currX", "updateCurrX"),
  withState("currY", "updateCurrY"),
  withState("boxCount", "updateBoxCount"),
  withState("history", "updateHistory", []),

  withPropsOnChange(["taskId", "retry"], props => {
    const { taskId, updateGrid, updateCurrX, updateCurrY, updateBoxCount, updateHistory, updateSteps } = props;
    if(taskId) {
      const matrix = tasks[`task${taskId}`];
      console.log("the matrix is===>", matrix);
      const task = {...matrixParser(matrix), isLoading: false};
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