// server.js
// Entry point - run with: node server.js

const express = require("express");
const attendanceRoutes = require("./routes");

const app = express();
const PORT = 8000;

// Lets us read JSON bodies sent in POST requests (req.body)
app.use(express.json());

// Mount all student/attendance routes under /api
app.use("/api", attendanceRoutes);

// ---------------------------------------------------------
// Safety net: catches anything thrown inside a route so the
// server keeps responding with JSON instead of crashing on
// malformed requests.
// Must be the LAST app.use() call.
// ---------------------------------------------------------
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong" });
});

app.listen(PORT, () => {
  console.log(`Student attendance service running on port ${PORT}`);
});
