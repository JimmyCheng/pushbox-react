import { compose, withState, withHandlers, shouldUpdate, withPropsOnChange } from "recompose";
import axios from 'axios';
import matrixParser from "../../utility/matrixParser";
import Game from "../../components/game/index";

const enhance = compose(
  withState("taskId", "updateTaskId", 1),
  withState("restarted", "updateRestarted", false),
  withHandlers({
    handleNextTask: ({ updateTaskId }) => () => updateTaskId(n => n + 1),
    handlePrevTask: ({ updateTaskId }) => () => updateTaskId(n => n-1 > 0 ? n - 1: n),
    handleReplay: ({ updateRestarted }) => () => updateRestarted(true),
  }),
  shouldUpdate(((props, nextProps) => {
    return props.taskId !== nextProps.taskId || nextProps.restarted;
  })),

  withState("cells", "updateCells"),
  withState("currX", "updateCurrX"),
  withState("currY", "updateCurrY"),
  withState("boxCount", "updateBoxCount"),
  withState("history", "updateHistory", []),

  withPropsOnChange(["taskId", "restarted"], props => {
    const { taskId, updateCells, updateCurrX, updateCurrY, updateBoxCount, updateRestarted } = props;
    if(taskId) {
      updateRestarted(false);
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