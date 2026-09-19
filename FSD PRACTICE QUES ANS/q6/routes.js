// routes.js
// Defines the /api/simple-interest endpoint.
//
// This question is framed as a "debug challenge" - the buggy starter
// code isn't included in the practice-set document, so this is the
// CORRECT, working version. The comments call out the exact mistakes
// that are typically planted in these debug challenges, so you know
// what to look for if you're given broken code on the actual exam.

const express = require("express");
const router = express.Router();

// ---------------------------------------------------------
// Helper: checks that a value is a valid POSITIVE number.
// This one function covers three common bug spots at once:
//   BUG #1: using `if (!value)` to check "missing" - this wrongly
//           rejects the number 0, but ALSO wrongly treats an
//           actual 0 the same as "missing" instead of catching it
//           later as "must be positive". We handle both cases
//           explicitly below instead.
//   BUG #2: forgetting to convert strings like "50" to a real
//           number before comparing, so "50" > 0 could behave
//           unexpectedly with weird inputs like "50abc".
//   BUG #3: allowing zero or negative numbers through because the
//           check used `>= 0` instead of `> 0`.
// ---------------------------------------------------------
function isPositiveNumber(value) {
  if (value === undefined || value === null || value === "") {
    return false; // missing input
  }

  const num = Number(value);

  // isNaN catches non-numeric strings like "abc" or "50abc"
  if (isNaN(num)) {
    return false;
  }

  // Strictly greater than zero - rejects both zero AND negatives
  return num > 0;
}

// ---------------------------------------------------------
// POST /api/simple-interest
// ---------------------------------------------------------
router.post("/simple-interest", (req, res) => {
  const { principal, rate, time } = req.body;

  // BUG #4 that's commonly planted: validating only SOME of the
  // three fields (e.g. forgetting to check "time"). We check all
  // three here.
  const isPrincipalValid = isPositiveNumber(principal);
  const isRateValid = isPositiveNumber(rate);
  const isTimeValid = isPositiveNumber(time);

  if (!isPrincipalValid || !isRateValid || !isTimeValid) {
    // BUG #5 commonly planted: returning status 200 or 500 here
    // instead of 400 for bad input.
    return res.status(400).json({ message: "Please provide valid input" });
  }

  // Convert to numbers ONCE we know they're valid, then calculate.
  const principalNum = Number(principal);
  const rateNum = Number(rate);
  const timeNum = Number(time);

  // BUG #6 commonly planted: wrong formula order/parentheses, e.g.
  // principal * rate * (time / 100) which gives a different result
  // than (principal * rate * time) / 100 in edge cases with certain
  // number types, or dividing only "rate" by 100 twice.
  const interest = (principalNum * rateNum * timeNum) / 100;

  return res.status(200).json({ interest: interest });
});

module.exports = router;
