import express from "express";
import "dotenv/config";
import contactRoutes from "./routes/contactRoutes.js";

const app = express();
app.use(express.json());
app.use("/", contactRoutes);

const PORT = process.env.PORT || 3030;

app.listen(PORT, () => {
  console.log("Server started");
});
