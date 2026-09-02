import express from "express";
const app=express();
app.use(express.json());
app.use((req,res,next)=>{
    console.log("Middleware Executed");
    next();
});

app.get("/",(req,res)=>{
    res.send("Home");
});

app.get("/Contact",(req,res)=>{
    res.send("Contact");
});

app.get("/About",(req,res)=>{
    res.send("About");
});

app.listen(3000,()=>{
    console.log("Server Started");
});