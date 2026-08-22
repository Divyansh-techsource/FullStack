const http = require("http");

const server = http.createServer((req, res) => {
    if (req.url === "/" && req.method === "GET") {
        res.end("At home page");
    }
    else if (req.url === "/About" && req.method === "GET") {
        res.end("Code is about req and res");
    }
    else if (req.url === "/Contact" && req.method === "GET") {
        res.end("Code");
    }
    // res.end("Welcome to NodeJS Backend!!!!");
});

server.listen(, () => {
    console.log("Server started");
});
