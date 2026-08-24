import http from "http";
import fs from "fs";
// const http = require("http");
// const fs=require("fs");
const Filepath="./log.txt";


const server = http.createServer((req, res) => {
    /*if (req.url === "/" && req.method === "GET") {
        fs.appendFile(Filepath,"Home ",(err)=>{
            if(err) throw err;
            console.log("Home appended");
        });
        res.end("At home page");
    }
    else if (req.url === "/About" && req.method === "GET") {
        fs.appendFile(Filepath,"About ",(err)=>{
            if(err) throw err;
            console.log("About appended");
        });
        res.end("Code is about req and res");
    }
    else if (req.url === "/Contact" && req.method === "GET") {
        fs.appendFile(Filepath,"Contact ",(err)=>{
            if(err) throw err;
            console.log("Contact appended");
        });
        res.end("Code");
    }*/
    switch(req.url){
        case "/": 
        const homeDate = new Date().toLocaleString("en-IN");
        fs.appendFile(Filepath,`[${homeDate}] Route: /\n`,(err) => {
            if (err) throw err;
        });
        res.end("Welcome to NodeJS Backend!!!!");
        // console.log(req.headers);
        // res.writeHead(200,{"content-type":"text/html"});
        break;
        case "/About":
        const user={
            id:1,
            name:"John"
        }
        res.end(JSON.stringify(user));
        break;
        case "/Contact": 
        res.end("Code");
        break;
        default:
            res.end("404 Not Found");
    }
});

server.listen(3000, () => {
    console.log("Server started");
});