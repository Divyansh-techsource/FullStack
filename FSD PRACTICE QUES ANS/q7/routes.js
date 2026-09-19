// routes.js
// Defines the /api/compound-interest endpoint.
//
// Like Q6, the practice-set document only gives the problem statement,
// not the actual broken starter file. This is the CORRECT, working
// version - comments call out the exact bug that's typically planted
// at each step, since that's what you'll need to spot on the real exam.

const express = require("express");
const router = express.Router();

// ---------------------------------------------------------
// Helper: checks that a value is a valid POSITIVE number.
// Same reasoning as the Interest Calculator question:
//   - reject missing values (undefined/null/empty string)
//   - convert to a real number before comparing
//   - use strict "> 0" so zero and negatives are both rejected
// A commonly planted bug here is using `>= 0`, which lets 0 slip
// through even though the task says "positive number".
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
// POST /api/compound-interest
// ---------------------------------------------------------
router.post("/compound-interest", (req, res) => {
  const { principal, rate, time } = req.body;

  // Commonly planted bug: validating with "&&" combined wrong, e.g.
  // `if (!principal && !rate && !time)` only fails when ALL THREE are
  // missing, instead of failing when ANY ONE is invalid. We check
  // each field independently below.
  const isPrincipalValid = isPositiveNumber(principal);
  const isRateValid = isPositiveNumber(rate);
  const isTimeValid = isPositiveNumber(time);

  if (!isPrincipalValid || !isRateValid || !isTimeValid) {
    // Commonly planted bug: returning 401 or 500 here, or even 200
    // with an error message in the body instead of an actual error
    // status code.
    return res.status(400).json({ message: "Please provide valid input" });
  }

  const principalNum = Number(principal);
  const rateNum = Number(rate);
  const timeNum = Number(time);

  // Formula: P * (1 + R/100)^T - P
  // Commonly planted bugs in this exact line:
  //   - forgetting to divide rate by 100 (using R instead of R/100)
  //   - using multiplication instead of Math.pow/** for the exponent,
  //     e.g. `(1 + rateNum / 100) * timeNum` which is wrong math
  //   - forgetting to subtract the original principal at the end,
  //     which would return the final total instead of the growth
  const compoundInterest = principalNum * Math.pow(1 + rateNum / 100, timeNum) - principalNum;

  return res.status(200).json({ compoundInterest: compoundInterest });
});

module.exports = router;
