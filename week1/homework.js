const path = require('path');
const fs = require('fs');
const contentFile = process.argv[2];
const pathFile = process.argv[3];
const realPathFile = path.join(__dirname, pathFile);
console.log(__dirname);
console.log(realPathFile);
