const fs = require('fs');

const taskReader = (path, taskId) => {
  const fileName = `${path}/task${taskId}.tsk`;
  console.log(fileName);

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

const writeToJson = (matrix, path, taskId) => {
  //to make it more readable, use following routine rather than JSON.stringify.
  let json =`{\n`;
  json = json.concat(`  "matrix": [\n`);

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
  json = json.concat(`  ]\n`);
  json = json.concat(`}\n`);

  fs.writeFile(`${path}/task${taskId}.json`, json,
    function(err) {
    if (err) {
      return console.log(err);
    }
  });
};

//conver the binary task to task.json.
// for(let i=1; i<=100; i++) {
//   writeToJson(taskReader(__dirname, i), __dirname, i);
// }

export default taskReader;

