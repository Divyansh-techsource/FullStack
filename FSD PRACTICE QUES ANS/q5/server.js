// server.js
// This is the entry point of the application.
// Run it with: node server.js

const express = require("express");
const taskRoutes = require("./routes");

const app = express();
const PORT = 8000;

// express.json() lets us read JSON request bodies via req.body
app.use(express.json());

// All task-related routes are mounted under /api
app.use("/api", taskRoutes);

// ---------------------------------------------------------
// Safety net: catch any errors thrown inside routes so the
// server never crashes on a bad/malformed request.
// This must be defined AFTER app.use("/api", taskRoutes).
// ---------------------------------------------------------
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong" });
});

app.listen(PORT, () => {
  console.log(`Workboard service running on port ${PORT}`);
});
