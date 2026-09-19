// server.js
// Entry point - run with: node server.js

const express = require("express");
const pollRoutes = require("./routes");

const app = express();
const PORT = 8000;

// Lets us read JSON bodies sent in POST requests (req.body)
app.use(express.json());

// Mount all poll/vote routes under /api
app.use("/api", pollRoutes);

// ---------------------------------------------------------
// Safety net: if anything throws inside a route, this catches
// it and returns a JSON error instead of crashing the server.
// Must be the LAST app.use() call.
// ---------------------------------------------------------
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong" });
});

app.listen(PORT, () => {
  console.log(`Poll service running on port ${PORT}`);
});
