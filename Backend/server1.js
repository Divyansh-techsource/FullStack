import http from "http";
import fs from "fs";
const Filepath = "./log.txt";

const server = http.createServer((req, res) => {
    switch (req.url) {

        case "/":{
            const homeDate = new Date().toLocaleString("en-IN");
            fs.appendFile(Filepath, `[${homeDate}] Route: /\n`, (err) => {
                if (err) throw err;
            });
            res.end("Home");
            break;
        }

        case "/About":{
            const aboutDate = new Date().toLocaleString("en-IN");
            fs.appendFile(Filepath, `[${aboutDate}] Route: /About\n`, (err) => {
                if (err) throw err;
            });
            res.end("About");
            break;
        }

        case "/Contact":{
            const contactDate = new Date().toLocaleString("en-IN");
            fs.appendFile(Filepath, `[${contactDate}] Route: /Contact\n`, (err) => {
                if (err) throw err;
            });
            res.end("Contact");
            break;
        }

        default:{
            res.end("404 Not Found");
        }
    }
});

server.listen(PORT, () => {
    console.log("Server started");
});
