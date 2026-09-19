// server.js
// Entry point - run with: node server.js

const express = require("express");
const productRoutes = require("./routes");

const app = express();
const PORT = 8000;

// Lets us read JSON bodies sent in POST requests (req.body)
app.use(express.json());

// Mount all product/rating routes under /api
app.use("/api", productRoutes);

// ---------------------------------------------------------
// Safety net: catches anything thrown inside a route so the
// server responds with JSON instead of crashing.
// Must be the LAST app.use() call.
// ---------------------------------------------------------
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong" });
});

app.listen(PORT, () => {
  console.log(`Product feedback service running on port ${PORT}`);
});
