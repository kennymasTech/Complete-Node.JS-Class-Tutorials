
const fs = require("fs");
const path = require("path");

fs.writeFile(path.join(__dirname, "reg", "node.txt"), `i greet you everyone`, (err) => {
    if (err) throw err;
    console.log("text completed");

    fs.rename(path.join(__dirname, "reg", "node.txt"), path.join(__dirname, "reg", "ten.txt"), (err) => {
        if (err) throw err;
        console.log();
    })
});

fs.readFile(path.join(__dirname, "reg", "text.txt"), "utf8", (err, data) => {
    if (err) throw err;
    console.log(data);
})