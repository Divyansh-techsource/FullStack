// routes.js
// Defines the /api/area endpoint.
//
// Like Q6/Q7, the practice-set document only gives the problem
// statement, not the actual broken starter file. This is the
// CORRECT, working version - comments call out the exact bugs that
// are typically planted in "selection logic" (shape switching)
// debug challenges like this one.

const express = require("express");
const router = express.Router();

// ---------------------------------------------------------
// Helper: same positive-number check used across the other
// calculator questions. Missing/non-numeric/zero/negative all fail.
// ---------------------------------------------------------
function isPositiveNumber(value) {
  if (value === undefined || value === null || value === "") {
    return false;
  }
  const num = Number(value);
  if (isNaN(num)) {
    return false;
  }
  return num > 0;
}

// ---------------------------------------------------------
// POST /api/area
// ---------------------------------------------------------
router.post("/area", (req, res) => {
  // Commonly planted bug: destructuring only "radius" or "side" and
  // forgetting "length"/"width", so rectangle requests silently read
  // undefined. We pull out everything we might need up front.
  const { shape, radius, length, width, side } = req.body;

  // Commonly planted bug: comparing shape with case-sensitive equality
  // against a badly-cased list, or using a plain if/else chain that
  // has a typo in one of the shape names (e.g. "recatangle").
  // Normalizing to lowercase avoids "Circle" vs "circle" mismatches.
  const normalizedShape = typeof shape === "string" ? shape.toLowerCase().trim() : "";
  const supportedShapes = ["circle", "rectangle", "square"];

  if (!supportedShapes.includes(normalizedShape)) {
    return res.status(400).json({ message: "Please provide valid input" });
  }

  let area;

  // Commonly planted bug: using "==" fallthrough in a switch without
  // "break", so a "circle" request accidentally also runs the
  // "rectangle" calculation below it. Each case here returns
  // immediately or is cleanly separated, so there's no fallthrough risk.
  switch (normalizedShape) {
    case "circle": {
      if (!isPositiveNumber(radius)) {
        return res.status(400).json({ message: "Please provide valid input" });
      }
      // Commonly planted bug: Math.PI * radius * 2 (perimeter formula)
      // instead of Math.PI * radius ** 2 (area formula).
      area = Math.PI * Math.pow(Number(radius), 2);
      break;
    }

    case "rectangle": {
      if (!isPositiveNumber(length) || !isPositiveNumber(width)) {
        return res.status(400).json({ message: "Please provide valid input" });
      }
      // Commonly planted bug: adding instead of multiplying
      // (length + width instead of length * width).
      area = Number(length) * Number(width);
      break;
    }

    case "square": {
      if (!isPositiveNumber(side)) {
        return res.status(400).json({ message: "Please provide valid input" });
      }
      // Commonly planted bug: side * 2 instead of side ** 2.
      area = Math.pow(Number(side), 2);
      break;
    }
  }

  return res.status(200).json({ shape: normalizedShape, area: area });
});

module.exports = router;
