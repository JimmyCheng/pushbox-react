const fs = require('fs');

const taskReader = (path, taskId) => {
  const fileName = `${path}/task${taskId}.tsk`;
  let buf = fs.readFileSync(fileName, null);
  let matrix = [];

  //build a 14*16 matrix
  if(buf.length === 224) {
    for (let i = 0; i < 14; i++) {
      let row = [];
      for(let j = 0; j< 16; j++) {
        const val = buf.readInt8(i * 16 + j);
        row.push(val);
      }
      matrix.push(row);
    }
  }
  return matrix;
};

const writeToJson = (matrixes, path) => {
  //to make it more readable, use following routine rather than JSON.stringify.
  let json =`{\n`;

  let count = 0;
  matrixes.forEach((matrix, key) => {
    count++;
    json = json.concat(`  "${key}": [\n`);
    for (let i = 0; i < 14; i++) {
      json = json.concat(`    [`);
      for (let j = 0; j < 15; j++) {
        json = json.concat(`${matrix[i][j]},`);
      }
      json = json.concat(`${matrix[i][15]}]`);

      if(i != 13){
        json = json.concat(`,`);
      }
      json = json.concat(`\n`);
    }
    if(count < matrixes.size) {
      json = json.concat(`  ],\n`);
    } else {
      json = json.concat(`  ]\n`);
    }
  });

  json = json.concat(`}\n`);

  fs.writeFile(`${path}/tasks.json`, json,
    function(err) {
    if (err) {
      return console.log(err);
    }
  });
};

//conver the binary tasks to one big json file task.json.
const generateJSON = () => {
  const matrices = new Map();

  for(let i=1; i<=100; i++) {
    const path = __dirname + "/task";
    const matrix = taskReader(path, i);
    matrices.set("task" +i, matrix);
  }

  writeToJson(matrices, __dirname);
};

generateJSON();

export default taskReader;

