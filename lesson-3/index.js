const fsPromises = require("fs").promises;
const path = require("path");

const fileOps = async () => {
  try {
    const data = await fsPromises.readFile(path.join(__dirname, "file", "starter.txt"),"utf8");
    console.log(data);
    
    // await fsPromises.unlink(path.join(__dirname, "file", "starter.txt"), "utf8");
    await fsPromises.writeFile(path.join(__dirname, "file", "index.txt"), 
    data);

    await fsPromises.appendFile(
      path.join(__dirname, "file", "index.txt"),
      "\n Tutor soliu said it was still mornnig when we wrote the afternoon text"
    );
    await fsPromises.rename(
      path.join(__dirname, "file", "index.txt"),
      path.join(__dirname, "file", "text.txt")
    );

    const newData = await fsPromises.readFile(
      path.join(__dirname, "file", "text.txt"),
      "utf8"
    );
    console.log(newData);
  } catch (err) {
    console.log(err);
  }
};
fileOps();
