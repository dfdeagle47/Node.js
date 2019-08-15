const fs = require('fs')
const path = './my-output.txt'
console.log(process.argv);
const file = 'my-output.txt';

fs.access(file, fs.constants.F_OK, (err) => {
  console.log(`${file} ${err ? 'does not exist' : 'exists'}`);
  fs.unlink('my-output.txt', (err) => {
    if (err) throw err;
    console.log('my-output.txt was deleted');
  });

});



fs.writeFile('my-output.txt', 'my text content', 'utf8', (err) => {
  if (err) throw err;
  console.log('The text has been written!');
});
