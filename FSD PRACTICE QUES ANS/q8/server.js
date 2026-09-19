// server.js
// Entry point - run with: node server.js

const express = require("express");
const areaRoutes = require("./routes");

const app = express();
const PORT = 8000;

// Lets us read JSON bodies sent in POST requests (req.body)
app.use(express.json());

// Mount the area calculation route under /api
app.use("/api", areaRoutes);

// ---------------------------------------------------------
// Safety net: catches anything thrown inside a route (e.g. a
// malformed JSON body) so the server responds with a clean
// JSON error instead of crashing. This satisfies task #5's
// server-stability requirement.
// Must be the LAST app.use() call.
// ---------------------------------------------------------
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong" });
});

app.listen(PORT, () => {
  console.log(`Geometry service running on port ${PORT}`);
});
