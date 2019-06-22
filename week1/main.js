const fs = require('fs');
const path= require('path');
const read = fs.readFileSync(path.join(__dirname,'myText.txt'), 'utf8');
const write = fs.writeFileSync('written1.txt', read);
const argv = process.argv.slice();
console.log(argv);

if (Process.argv.length <= 2) {
    console.log('Usage: ' + __filename + process.argv(2));
    process.exit(1);
}else{
    console.log('one param or more is expected');
}
const param = process.argv[2];
console.log('param: ' + param);
 
