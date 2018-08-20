import DIRECTIONS from '../consts/directions';

const matrixParser = (matrix) => {
  const grid = [];
  let boxCount = 0;
  let currX = 0;
  let currY = 0;

  matrix.forEach((row, i) => {
    const rows = [];
    row.forEach( (val, j) =>{
      let cell = {
        black: false,
        wall: false,
        floor: false,
        box: false,
        ball: false,
        spirit: false,
        action: 0
      };

      // hardcoded data in task file.
      switch (val) {
        case 0:
          cell.black = true;
          break;

        case 1:
          cell.wall = true;
          break;

        case 2:
          cell.floor = true;
          break;

        case 3:
          cell.floor = true;
          cell.box = true;
          boxCount++;
          break;

        case 4:
          cell.ball = true;
          break;

        case 7: //box is full.
          cell.box = true;
          cell.ball = true;
          break;
        case 57:
        case 58:
          cell.floor = true;
          cell.spirit = true;
          cell.action = DIRECTIONS.DOWN;
          currX = i;
          currY = j;
          break;

        default:
          console.log("$$$$$$$$$$$$$$$$$$$$$$$$", val);

      }
      rows.push(cell);
    });

    grid.push(rows);
  });

  return {
    grid,
    boxCount,
    currX,
    currY
  };
};

export default matrixParser;
