
const fs = require('fs');
const data = new Uint8Array(Buffer.from(process.argv[2]));
fs.open(process.argv[3], 'wx', (err) => {
  if (err) {
    if (err.code === 'EEXIST') {
      console.error('the file already exists');
      return;
    }
    throw err;
  }
  fs.writeFile(process.argv[3], data, (err) => {
    if (err)
    throw err;
    console.log('The file has been saved!');
  });

});
