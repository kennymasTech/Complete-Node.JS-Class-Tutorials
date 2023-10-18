
// import { readFile } from 'node:fs';


      //READ FILE
//  HOW TO READ FILES ON NODEJS

const fs = require ("fs")
const path = require("path");


// fs.readFile("./file/starter.txt", (err, data) => {
//   if (err) throw err;
//   console.log(data.toString());    // METHOD
// });

           // OR  

fs.readFile(path.join(__dirname, "file", "starter.txt"), "utf8", (err, data) => {
  if (err) throw err;
  console.log(data);             // ENCODED
});

          //   OR   

// const fs = require ("fs")
// fs.readFile("./file/starter.txt", "utf8", (err, data) => {
//   if (err) throw err;
//   console.log(data);           // ENCODED
// });







//  HOW TO WRITE FILES ON NODEJS
//       WRITE FILE
fs.writeFile(path.join(__dirname, "file", "text.txt"), `Here in DLTAfrica it's a new dawn`, (err) => {
  if (err) throw err;
  console.log("Write complited");

    // APPEND FILE
    fs.appendFile(path.join(__dirname, "file", "text.txt"), "\n\nTesting testing", (err) => {
      if (err) throw err;
      console.log("append done");
    });

    // RENAME FILE
      fs.rename(path.join(__dirname, "file", "text.txt"), path.join(__dirname, "file", "rename.txt"), (err) => {
        if (err) throw err;
        console.log("rename completed");
      })
});
  

  fs.readFile(path.join(__dirname, "file", "starter.txt"), "utf8", (err, data) => {
    if (err) throw err;
    console.log(data);             // ENCODED
  })


// EXITING UNCAUGHT ERROR

// process.on("uncaughtException", error => {
//     console.log(`there was an uncaught error: ${error}`), process.exit(1)
// });
// console.log("Hello.......");