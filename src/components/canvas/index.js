import React from 'react';
import { compose, withHandlers, branch, withState} from "recompose";
import Tile from "../tile/index"
import { map } from "lodash";
import styled from 'styled-components';

import DIRECTIONS from '../../consts/directions';

const Wrapper = styled.div`
  width: 600px;
  display: grid;
  grid-gap: 0px;
  grid-template-columns: repeat(16, 30px);
  grid-template-rows: repeat(15, 30px);
  grid-auto-flow: row;
`;

const Canvas = ({cells, onCanvasKeyDown}) => {
  let tiles = [];
  cells.forEach((row, rowIndex) => {
    const rows = map(row, (cell, columnIndex) => (<Tile cell={cell} key={rowIndex*16 + columnIndex}/>));
    tiles.push(...rows);
  });

  return (
    <div>
      <Wrapper tabIndex={0} onKeyDown={(e) => {onCanvasKeyDown(e);} }>
        {tiles}
      </Wrapper>
    </div>
  );
};

const enhance = compose(
  branch(
    ({task}) => { return  !task;},
    () => () => {
      return <div>loading</div>
    }
  ),

  withState("cells", "updateCells", ({task}) => task.cells),
  withState("currX", "updateCurrX", ({task}) => task.currX),
  withState("currY", "updateCurrY", ({task}) => task.currY),
  withState("history", "updateHistory", []),

  withHandlers({
    onCanvasKeyDown: (props) => (e) => {
      let xflag = 0;
      let yflag = 0;
      let direct = 0;

      switch (e.key) {
        case "ArrowLeft":
          yflag = -1;
          direct = DIRECTIONS.LEFT;
          break;

        case "ArrowUp":
          xflag = -1;
          direct = DIRECTIONS.UP;
          break;

        case "ArrowRight":
          yflag = 1;
          direct = DIRECTIONS.RIGHT;
          break;

        case "ArrowDown":
          xflag = 1;
          direct = DIRECTIONS.DOWN;
          break;

        case "KeyU":
        case "F2":
           props.undo(); //TODO doesn't work
           return;
        default:
          return;
      }

      // current cell, next cell and next next cell.
      const cCell = props.cells[props.currX][props.currY];
      const nCell = props.cells[props.currX + xflag][props.currY + yflag];
      const nnCell = props.cells[props.currX + xflag + xflag][props.currY + yflag + yflag];

      // Can't move
      if (nCell.wall) {
        return;
      }

      if (nCell.box && (nnCell.box || nnCell.wall)) {
        return;
      }

      // Can move.
      cCell.spirit = false;
      nCell.spirit = true;
      nCell.action = direct;

      const position = {
        x: props.currX,
        y: props.currY,
        dir: direct,
        boxmoved: false
      };


      if (nCell.box) {
        nCell.box = false;
        nnCell.box = true;
        position.boxmoved = true;
      }

      props.history.push(position);

      props.updateCurrX(props.currX + xflag);
      props.updateCurrY(props.currY + yflag);
      props.updateCells(props.cells);
      props.updateHistory(props.history);
    }
  }),

  withHandlers({
    undo: (props) => {
      if (props.history.length === 0) {
        return;
      }

      const currX = props.currX;
      const currY = props.currY;

      //restore current position.
      props.cells[currX][currY].spirit = false;

      const pos = props.history.pop();
      let xflag = 0;
      let yflag = 0;

      if(pos.boxmoved) {
        props.cells[currX][currY].box = true;

        switch(pos.dir) {
          case DIRECTIONS.UP: //UP
            xflag = -1;
            break;

          case DIRECTIONS.RIGHT: //Right
            yflag = 1;
            break;

          case DIRECTIONS.DOWN: //Down;
            xflag = 1;
            break;

          case DIRECTIONS.LEFT: //Left
            yflag = -1;
            break;

          default:
            return;
        }
        props.cells[currX + xflag][currY + yflag].box = false;
      }

      //set new  position.
      props.cells[currX][currY].spirit = true;
      props.updateCurrX(pos.currX);
      props.updateCurrY(pos.currY);
      props.updateCells(props.cells.slice(0));
      props.updateHistory(props.history);
    }
  })
);

export default enhance(Canvas);