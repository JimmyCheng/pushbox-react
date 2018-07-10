const fs = require('fs');

const taskReader = (path, taskId) => {
  const fileName = `${path}/task${taskId}.tsk`;
  console.log(fileName);

  let buf = fs.readFileSync(fileName, null);
  let task = [];
  if(buf.length === 224) {
    for (let i = 0; i < 224; i++) {
      task.push(buf.readInt8(i));
    }
  }
  return task;
};

export default taskReader;

