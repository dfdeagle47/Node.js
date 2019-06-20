const fs = require('fs');
console.log(process.argv);

fs.access('./my-output.txt', fs.F_OK, (err) => {
    if(!err) {
        console.error('my output file exists. Deleting now...');
        fs.unlink('./my-output.txt', (err) => {
            if(err) 
            throw err; 
            console.log('file deleted successfully');
        });
    }
    else {
        console.log('File not found, so not deleting.')
    }
});
fs.writeFile('./my-output.txt', 'my text content', (err) => {
    if (err) {
      console.log('There was an error writing the file', err);
    } else {
      console.log('Writing finished successfully');
    }
  });
