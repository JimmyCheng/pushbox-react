import React from 'react';
import { compose, withHandlers} from "recompose";

import Tile from "../tile/index"
import { map } from "lodash";
import styled from 'styled-components';
import DIRECTIONS from "../../consts/directions";

const Wrapper = styled.div`
  width: 480px;
  display: grid;
  grid-gap: 0px;
  grid-template-columns: repeat(16, 30px);
  grid-template-rows: repeat(14, 30px);
  grid-auto-flow: row;
`;

const onCanvasKeyDown = (props) => (e) => {
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

    case "u":
    case "F2":
      undo(props);
      return;
    default:
      return;
  }

  // current cell, next cell and next next cell.
  const cCell = props.grid[props.currX][props.currY];
  const nCell = props.grid[props.currX + xflag][props.currY + yflag];
  const nnCell = props.grid[props.currX + xflag + xflag][props.currY + yflag + yflag];

  // Can't move
  if (nCell.wall) {
    return;
  }

  if (nCell.box && (nnCell.box || nnCell.wall)) {
    return;
  }

  // Can move.
  props.updateSteps(props.steps + 1);
  cCell.spirit = false;
  nCell.spirit = true;
  nCell.action = direct;

  const position = {
    x: props.currX,
    y: props.currY,
    dir: direct,
    boxmoved: false
  };

  //move box to the next position.
  if (nCell.box) {
    nCell.box = false;
    nnCell.box = true;
    position.boxmoved = true;
  }

  props.history.push(position);
  props.updateCurrX(props.currX + xflag);
  props.updateCurrY(props.currY + yflag);
  props.updateGrid(props.grid);
  props.updateHistory(props.history);
};

const undo = (props) => {
  if (props.history.length === 0) {
    return;
  }

  const currX = props.currX;
  const currY = props.currY;

  //restore current position.
  props.grid[currX][currY].spirit = false;

  const pos = props.history.pop();
  let xflag = 0;
  let yflag = 0;

  if(pos.boxmoved) {
    props.grid[currX][currY].box = true;

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
    props.grid[currX + xflag][currY + yflag].box = false;
  }

  props.updateSteps(props.steps + 1);
  //set new  position.
  props.grid[pos.x][pos.y].spirit = true;
  props.updateCurrX(pos.x);
  props.updateCurrY(pos.y);
  props.updateGrid(props.grid.slice(0));
  props.updateHistory(props.history);
};

const Canvas = ({grid, onCanvasKeyDown}) => {
  console.log("show the grid", grid);
  let tiles = [];
  if(grid && grid.length > 0) {
    grid.forEach((row, rowIndex) => {
      const rows = map(row, (cell, columnIndex) => (<Tile cell={cell} key={rowIndex * 16 + columnIndex}/>));
      tiles.push(...rows);
    });
  }

  return (
    <div>
      <Wrapper tabIndex={0} onKeyDown={e => onCanvasKeyDown(e) }>
        {tiles}
      </Wrapper>
    </div>
  );
};

const enhance = compose(
  withHandlers({onCanvasKeyDown})
);

export default enhance(Canvas);