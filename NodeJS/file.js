const fs = require("fs");
const FilePath = "./Test2.txt";
const Content = "Welcome to NodeJS Programming";
// fs.writeFileSync(FilePath,Content);
// console.log("Thanks");
// fs.writeFile(FilePath, Content, (err) => {
//     if (err) throw err;
//     console.log("The file has been saved!");
// });
// console.log("Thanks");
// const res=fs.readFileSync(FilePath,"UTF-8");
// console.log(res);
// console.log("Thanks");
// fs.readFile(FilePath, "UTF-8", (err,data) => {
//     if (err) throw err;
//     console.log(data);
// });
// console.log("Thanks");

// fs.appendFileSync(FilePath," Programming is fun");
// console.log("Thanks");
fs.appendFile(FilePath,"Programming is fun",(err)=>{
    if(err) throw err;
    console.log("File appended");
});
console.log("Thanks");
