const fs = require("fs");
const path = require("path");
console.log(process.argv);
fs.open("my-output.txt", "wx", (err) => {
  if (err) {
    if (err.code === "EEXIST") {
      console.error("my-output.txt already exists");
      fs.unlink("my-output.txt", err => {
        if (err) throw err;
        console.log("successfully deleted my-output.txt");
      });
      return;
    }

    throw err;
  }

});

fs.readFile(path.join(__dirname, "./my-output.txt"), (err, data) => {
  console.log("Calling the callback");

  if (err) {
    console.log("Error", err);
  } else {
    console.log('my text content:', data.toString());
  }
});
fs.writeFile('my-output.txt', 'my newtext content', 'utf8', (err) => {
  if (err) {
    console.log("Error", err);
  } else {
    console.log('Writing finished successfully');
  }
});
