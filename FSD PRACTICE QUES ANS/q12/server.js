// server.js
// Entry point - run with: node server.js

const express = require("express");
const surveyRoutes = require("./routes");

const app = express();
const PORT = 8000;

// Lets us read JSON bodies sent in POST requests (req.body)
app.use(express.json());

// Mount all survey/feedback routes under /api
app.use("/api", surveyRoutes);

// ---------------------------------------------------------
// Safety net: catches anything thrown inside a route (including
// malformed JSON bodies) so the app responds with JSON instead
// of crashing - required by task #6.
// Must be the LAST app.use() call.
// ---------------------------------------------------------
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong" });
});

app.listen(PORT, () => {
  console.log(`Survey response service running on port ${PORT}`);
});
