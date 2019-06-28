/**
 * The goal of this exercice is to make a program with the following features
 * We start the program using an input like node main.js 'my text content' './my-output.txt'
 * It should retrieve the values for the file content (e.g. my text content) and the file path for the output (e.g. ./my-output.txt) that we passed when starting the program
 * It should check if the output file already exist
 * If it does, it should remove this file
 * It should write the text content (e.g. my text content) in the file defined by output path (e.g. ./my-output.txt)
 */

/**
 * Solution logic
 *
 * 1. Retrieve the parameters
 * 2. Check if the file exists  (fs.exist, fs.access, fs.stat, fs.open)
 *  If it exists (actionFileExists)
 *    1. Remove the file (fs.unlink)
 *    2. Write the content to the file (fs.writeFile)
 *  Else if it does NOT exist (actionFileNOTExist)
 *    1. Write the content to the file (fs.writeFile)
 */

/**
 * Take a good look at the callbacks and the order in which they are executed
 * and what they include.
 */

/**
 * Required NodeJS packages
 */

// 'fs' to manipulate the file system
const fs = require('fs');
// 'path' to manipulate file paths
const path = require('path');

/**
 * Extract data from the commmand line arguments
 */

// The content of the file
const contentFile = process.argv[2];
// The relative path of the file
const pathFile = process.argv[3];

// Ensure the parameters exists
if (!contentFile) {
  throw new Error('You have to specify the content of your file');
}
// Ensure the path of the file exists
if (!pathFile) {
  throw new Error('You have to specify the path of your file');
}

// The absolute path of the file
const realPathFile = path.join(__dirname, pathFile);

/**
 * Test if a file exists or not (multiple possibilities)
 * Choose only one possibility, do not run with all of them or it will crash
 * Comment unused possibility
 */

// Old possibility : fs.exists
fs.exists(realPathFile, (exists) => {
  // The file exists
  if (exists) {
    console.log('The file exists');
    actionFileExists();
  // The file does NOT exist
  } else {
    console.log('The file does NOT exist');
    actionFileNOTExist();
  }
});

// Possibility 1 : fs.access
fs.access(realPathFile, fs.constants.F_OK, (err) => {
  // An error occurred when we tried to access the file
  // This means the file does NOT exist
  if (err) {
    console.log('The file does NOT exist');
    actionFileNOTExist();
  // Otherwise the file exists
  } else {
    console.log('The file exists');
    actionFileExists();
  }
});

// Possibility 2 : fs.stat
fs.stat(realPathFile, (err) => {
  // An error occurred when we tried to obtain statistics about
  // the file, this means the file does NOT exist
  if (err) {
    console.log('The file does NOT exist');
    actionFileNOTExist();
  // Otherwise the file exists
  } else {
    console.log('The file exists');
    actionFileExists();
  }
});

// Possibility 3 : fs.open
fs.open(realPathFile, 'r', (err) => {
  // I told fs.open I want to read the file. It will thus have an error
  // if the file does NOT exist
  if (err) {
    console.log('The file does NOT exist');
    actionFileNOTExist();
    // Otherwise the file exists
  } else {
    console.log('The file exists');
    actionFileExists();
  }
});

/**
 * What to do when a file does NOT exist
 */

function actionFileNOTExist() {
  // Format the content of the file
  const data = new Uint8Array(Buffer.from(contentFile));
  // We want to write the content of the file to the file
  fs.writeFile(realPathFile, data, (err) => {
    // If an error occured, we want to know about it
    if (err) {
      throw err;
    // Otherwise everything went well
    } else {
      console.log('The content has been saved to the file');
    }
  });
}

/**
 * What to do when a file exists
 */

function actionFileExists() {
  // We want to delete the file
  fs.unlink(realPathFile, (err) => {
    // If an error occured, we want to know about it
    if (err) {
      throw err;
    // Otherwise everything went well
    } else {
      console.log('The file was deleted');
      // Now we want to write the content of the file to the file
      // Format the content of the file
      const data = new Uint8Array(Buffer.from(contentFile));
      // We want to write the content of the file to the file
      fs.writeFile(realPathFile, data, (err) => {
        // If an error occured, we want to know about it
        if (err) {
          throw err;
        // Otherwise everything went well
        } else {
          console.log('The content has been saved to the file');
        }
      });
    }
  });
}