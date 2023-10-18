const fs = require("fs");


fs.mkdir("./kenny", (err) => {
    if (err) throw err;
    console.log("new Dir")
});


if(!fs.existsSync("./new")) {
    fs.mkdir("./new", (err) => {
        if (err) throw err;
        console.log("new Dir")
    });

};


if(fs.existsSync("./new")) {
    fs.rmdir("./new", (err) => {
        if (err) throw err;
        console.log("Dir remove")
    });

}