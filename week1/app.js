const fs = require('fs');
const path = require('path');
fs.open(path.join(__dirname, process.argv[3]), 'r', (err, fd) => {
  if (err) {
    const data = new Uint8Array(Buffer.from(process.argv[2]));
    fs.writeFile(process.argv[3], data, err => {
      if (err) throw err;
      console.log('The new file has been saved');
    });
  } else {
    fs.unlink(process.argv[3], err => {
      if (err) {
        throw err;
      } else {
        fs.unlink(path.join(__dirname, process.argv[3]), (err, data) => {
          console.log('The file has been deleted');
        });
      }
    });
  }
});

//BASH
// if command line 3 argument file exist
// $ node main.js 'my text content' './my-output.txt'
// The file has been deleted

// if command line 3 argument file is NOT exist
// $ node main.js 'my text content' './my-output.txt'
// The new file has been saved
