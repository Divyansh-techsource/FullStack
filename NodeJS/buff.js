/*const buffer=Buffer.from("Hello, World!");
console.log(buffer.toString());
console.log(buffer);
console.log(buffer.length);
console.log(buffer[1]);
console.log(String.fromCharCode(buffer[1]));*/

/*const buff=Buffer.alloc(10);
buff.fill("Hello");
console.log(buff);
console.log(buff.toString());
console.log(buff.includes("e"));
console.log(buff.toString());*/

import fs from "fs";

const readStream=fs.createReadStream("./sample.txt");
const writeStream=fs.createWriteStream("./output.txt");
readStream.on("data",(chunk)=>{
    console.log(chunk);
    console.log(chunk.toString());
    writeStream.write(chunk);
});

readStream.on("end",()=>{
    console.log("File reading completed");
    writeStream.close();
})