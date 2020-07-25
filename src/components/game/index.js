import React, { useState, useEffect } from "react";
import { map } from "lodash";
import styled from "styled-components";

import tasks from "../../consts/tasks";
import matrixParser from "../../utility/matrixParser";
import Tile from "../Tile/index";
import DIRECTIONS from "../../consts/directions";

const Wrapper = styled.div`
  width: 480px;
  display: grid;
  grid-gap: 0px;
  grid-template-columns: repeat(16, 30px);
  grid-template-rows: repeat(14, 30px);
  grid-auto-flow: row;
  visibility: visible;
`;

/**
 * Check whether the game has been finished.
 */
// const gameWin = props => {
//   let gameFinished = true;
//   for (let i = 0; i < 14; i++) {
//     for (let j = 0; j < 16; j++) {
//       const cell = grid[i][j];
//       if (cell.ball && !cell.box) {
//         gameFinished = false;
//         break;
//       }
//     }
//     if (!gameFinished) {
//       break;
//     }
//   }

//   if (gameFinished) {
//   }
// };

const Game = ({ taskId }) => {
  const [grid, updateGrid] = useState();
  const [currX, updateCurrX] = useState();
  const [currY, updateCurrY] = useState();
  const [history, updateHistory] = useState([]);
  const [steps, updateSteps] = useState(0);

  useEffect(() => {
    const matrix = tasks[`task${taskId}`];
    const task = matrixParser(matrix);
    updateGrid(task.grid);
    updateCurrX(task.currX);
    updateCurrY(task.currY);
    updateHistory([]);
    updateSteps(0);
  }, [taskId]);

  const undo = () => {
    if (history.length === 0) {
      return;
    }

    //restore current position.
    grid[currX][currY].spirit = false;

    const pos = history.pop();
    let xflag = 0;
    let yflag = 0;

    if (pos.boxmoved) {
      grid[currX][currY].box = true;

      switch (pos.dir) {
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
      grid[currX + xflag][currY + yflag].box = false;
    }

    updateSteps(steps + 1);
    //set new  position.
    grid[pos.x][pos.y].spirit = true;
    updateCurrX(pos.x);
    updateCurrY(pos.y);
    updateGrid(grid);
    updateHistory(history);
  };

  const handleKeyDown = e => {
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
        undo();
        return;
      default:
        return;
    }

    // current cell, next cell and next next cell.
    const cCell = grid[currX][currY];
    const nCell = grid[currX + xflag][currY + yflag];
    const nnCell = grid[currX + xflag + xflag][currY + yflag + yflag];

    // Can't move
    if (nCell.wall) {
      return;
    }

    if (nCell.box && (nnCell.box || nnCell.wall)) {
      return;
    }

    // Can move.
    updateSteps(steps + 1);
    cCell.spirit = false;
    nCell.spirit = true;
    nCell.action = direct;

    const position = {
      x: currX,
      y: currY,
      dir: direct,
      boxmoved: false
    };

    //move box to the next position.
    if (nCell.box) {
      nCell.box = false;
      nnCell.box = true;
      position.boxmoved = true;
    }

    history.push(position);
    updateHistory(history);
    updateCurrX(currX + xflag);
    updateCurrY(currY + yflag);
    updateGrid(grid);
  };

  const tiles = [];
  if (grid && grid.length > 0) {
    grid.forEach((row, rowIndex) => {
      const rows = map(row, (cell, columnIndex) => (
        <Tile cell={cell} key={rowIndex * 16 + columnIndex} />
      ));
      tiles.push(...rows);
    });
  }

  return (
    <div>
      <Wrapper tabIndex={0} onKeyDown={handleKeyDown}>
        {tiles}
      </Wrapper>
    </div>
  );
};

export default Game;
