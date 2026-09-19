// routes.js
// Defines the /api/products, /api/rate, and /api/ratings endpoints.

const express = require("express");
const router = express.Router();
const { products } = require("./store");

// ---------------------------------------------------------
// 1. GET /api/products -> all products with rating details
// ---------------------------------------------------------
router.get("/products", (req, res) => {
  return res.status(200).json({
    message: "Products retrieved successfully",
    products: products
  });
});

// ---------------------------------------------------------
// 2. POST /api/rate -> submit a rating for a product
// ---------------------------------------------------------
router.post("/rate", (req, res) => {
  const { productId, rating } = req.body;

  // Step 1: both fields must be present.
  if (productId === undefined || productId === null || rating === undefined || rating === null) {
    return res.status(400).json({ message: "productId and rating are required" });
  }

  // Step 2: the product must exist.
  const product = products.find((p) => p.id === Number(productId));
  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }

  // Step 3: rating must be a number (whole or decimal) between 1 and 5.
  // Number(rating) converts strings like "4" too; isNaN catches things
  // like "abc" that can't be converted to a number at all.
  const numericRating = Number(rating);
  const isValidRating = !isNaN(numericRating) && numericRating >= 1 && numericRating <= 5;

  if (!isValidRating) {
    return res.status(400).json({ message: "Rating must be between 1 and 5" });
  }

  // Step 4: update the running total and recompute the average.
  product.ratingCount += 1;
  product.ratingTotal += numericRating;
  product.average = product.ratingTotal / product.ratingCount;

  return res.status(200).json({
    message: "Rating submitted successfully",
    product: product
  });
});

// ---------------------------------------------------------
// 3. GET /api/ratings -> name, count, and average per product
// ---------------------------------------------------------
router.get("/ratings", (req, res) => {
  const ratingsSummary = products.map((p) => ({
    name: p.name,
    ratingCount: p.ratingCount,
    average: p.average
  }));

  return res.status(200).json({
    message: "Product ratings retrieved successfully",
    ratings: ratingsSummary
  });
});

module.exports = router;
