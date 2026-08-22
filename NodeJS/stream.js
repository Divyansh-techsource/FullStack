import fs from "fs";
import zlib from "zlib";

const readStream = fs.createReadStream("./Test.txt");

const gzip = zlib.createGzip();

const writeStream = fs.createWriteStream("./output.txt.gz");

readStream.pipe(gzip).pipe(writeStream);

readStream.on("data",(chunk)=>{
    console.log(chunk.toString());
});