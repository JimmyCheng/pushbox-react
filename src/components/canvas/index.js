import React from 'react';
import { compose, withHandlers, shouldUpdate} from "recompose";
import Tile from "../tile/index"
import { map, isEqual } from "lodash";
import styled from 'styled-components';

import matrixParser from "../../utility/matrixParser";
import DIRECTIONS from '../../consts/directions';

const Wrapper = styled.div`
  width: 600px;
  display: grid;
  grid-gap: 0px;
  grid-template-columns: repeat(16, 30px);
  grid-template-rows: repeat(15, 30px);
  grid-auto-flow: row;
`;

const Canvas = (props) => {
  let tiles = [];
  props.cells.forEach(row => {
    const rows = map(row, cell => (<Tile cell={cell}/>));
    tiles.push(...rows);
  });

  console.log("re-rendering");

  return (
    <div>
      <Wrapper tabIndex={0} onKeyDown={(e) => {props.onCanvasKeyDown(e);} }>
        {tiles}
      </Wrapper>
    </div>
  );
};

const enhance = compose(
  // shouldUpdate((props, nextProps) => {
  //   return (
  //     !isEqual(props.cells, nextProps.cells)
  //   );
  // }),

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
           props.undo();
           return;
        default:
          return;
      }

      console.log("props===>", props);
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
      props.updateCells(props.cells);
      props.updateHistory(props.history);
    }
  })
);

export default enhance(Canvas);