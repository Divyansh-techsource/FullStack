// server.js
// Entry point - run with: node server.js

const express = require("express");
const interestRoutes = require("./routes");

const app = express();
const PORT = 8000;

// Lets us read JSON bodies sent in POST requests (req.body)
app.use(express.json());

// Mount the simple-interest route under /api
app.use("/api", interestRoutes);

// ---------------------------------------------------------
// Safety net: catches anything thrown inside a route (e.g. a
// malformed JSON body) so the app returns a JSON error instead
// of crashing. This directly satisfies task #5's requirement
// that "the application must not crash when invalid data is
// submitted."
// Must be the LAST app.use() call.
// ---------------------------------------------------------
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong" });
});

app.listen(PORT, () => {
  console.log(`Interest calculator running on port ${PORT}`);
});
