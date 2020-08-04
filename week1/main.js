const fs = require('fs');
const path = require('path');

console.log('Before fs.readFile');
console.log(process.argv);

fs.readFile(path.join(__dirname,'./my-output.txt'),
   (err, data) => {

    if (err) {
        console.log('Error', err)
    } else {
        console.log(data.toString());
    }
	
    fs.writeFile(path.join(__dirname,'./writefile.txt'),
                 data.toString(),
                 (err1, data1) => {
        
        if (err1) {
            console.log('Error!', err1)
        } else {
            console.log('Success!')
            console.log('data 1', data1);
        }
      }
    );

    fs.appendFile(path.join(__dirname,'./writefile.txt'),
                 data.toString() + data.toString(),
                 (err2, data2) => {
            
        if (err2) {
            console.log('Error!', err2)
        } else {
            console.log('Success!')
            console.log('data 2', data2);
        }
      }
    );

  });

console.log('After fs.readFile');
