import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import "dotenv/config";
import taskRoutes from "./router/taskRoutes.js";

const app = express();
const PORT = 5050;

app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  console.log("Request URL:", req.originalUrl);
  console.log("Request Method:", req.method);
  next();
});

app.use("/tasks", taskRoutes);

async function startServer() {
  try {
    if (!process.env.MONGODB_URL) {
      throw new Error("MONGODB_URL is missing from .env");
    }

    await mongoose.connect(process.env.MONGODB_URL);

    console.log("Database Connected");

    app.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
    });
  } catch (error) {
    console.error("Server startup failed:", error.message);
    process.exitCode = 1;
  }
}

startServer();
