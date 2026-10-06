import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import StudentRoutes from "./router/StudentRoutes.js";
// import TeacherRoutes from "./router/TeacherRoutes.js";
import cookieParser from "cookie-parser";
const app = express();
app.use(express.json());
app.use(cookieParser());
const PORT = process.env.PORT || 3030;

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    console.log("Database Connected");
  })
  .catch((error) => {
    console.log("Database cannot be connected:", error);
  });

app.use((req, res, next) => {
  console.log("Request Coming from: ", req.originalUrl);
  console.log("Request Type: ", req.method);
  next();
});

app.use("/students", StudentRoutes);
// app.use("/teachers", TeacherRoutes);

app.listen(PORT, () => {
  console.log("Server Started");
});
