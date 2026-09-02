import express from "express";
import StudentRoutes from "./router/StudentRoutes.js";
const app=express();
app.use(express.json());
app.use("/students",StudentRoutes);

app.listen(3000,()=>{
    console.log("Server Started");
});