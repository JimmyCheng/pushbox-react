import React from 'react';
import { compose, withState, branch} from "recompose";

export default compose(
  branch(
    ({task}) => (!task),
    () => () => {return <div>loading</div>}
  ),
  withState("cells", "updateCells", ({task}) => task.cells),
  withState("currX", "updateCurrX", ({task}) => task.currX),
  withState("currY", "updateCurrY", ({task}) => task.currY),
  withState("history", "updateHistory", []),
);