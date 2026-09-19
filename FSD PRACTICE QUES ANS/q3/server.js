// server.js
// Entry point - run with: node server.js

const express = require("express");
const eventRoutes = require("./routes");

const app = express();
const PORT = 8000;

// Lets us read JSON bodies sent in POST requests (req.body)
app.use(express.json());

// Mount all event/register/cancel routes under /api
app.use("/api", eventRoutes);

// ---------------------------------------------------------
// Safety net: catches anything thrown inside a route so the
// server keeps running and responds with JSON instead of
// crashing on malformed requests.
// Must be the LAST app.use() call.
// ---------------------------------------------------------
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong" });
});

app.listen(PORT, () => {
  console.log(`Workshop enrollment service running on port ${PORT}`);
});
