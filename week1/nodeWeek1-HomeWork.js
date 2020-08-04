const fs = require('fs');

fs.open(process.argv[3], 'r', function(err, file) {
  if (err) {
    fs.writeFile(process.argv[3], 'this is the new text content', 'utf8', err3 => {
      if (err3) throw err;
      console.log('new text file is created');
    });
  } else {
    fs.unlink(process.argv[3], err2 => {
      if (err2) throw err;
      fs.unlink(process.argv[3], (err, data) => {
        console.log('The file has been deleted');
      });
    });
  }
});
