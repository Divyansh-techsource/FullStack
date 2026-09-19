// routes.js
// Defines /candidates, /vote, and /result.
// NOTE: unlike most of the other practice questions, this spec does
// NOT put these routes under an "/api" prefix - they sit at the root
// path exactly as written (e.g. "/candidates", not "/api/candidates").

const express = require("express");
const router = express.Router();
const { candidates } = require("./store");

// ---------------------------------------------------------
// 1. GET /candidates -> every candidate + current vote count
// ---------------------------------------------------------
router.get("/candidates", (req, res) => {
  return res.status(200).json({
    message: "All candidates retrieved successfully",
    candidates: candidates
  });
});

// ---------------------------------------------------------
// 2. POST /vote -> cast a vote for a candidate
// ---------------------------------------------------------
router.post("/vote", (req, res) => {
  const { candidateId } = req.body;

  // Step 1: candidateId must be present.
  if (candidateId === undefined || candidateId === null) {
    return res.status(400).json({ message: "candidateId is required" });
  }

  // Step 2: it must match a real candidate.
  const candidate = candidates.find((c) => c.id === Number(candidateId));
  if (!candidate) {
    return res.status(404).json({ message: "Candidate not found" });
  }

  // Step 3: only now, after both checks pass, update the vote count.
  candidate.votes += 1;

  return res.status(200).json({
    message: "Vote cast successfully",
    candidate: candidate
  });
});

// ---------------------------------------------------------
// 3. GET /result -> current vote totals for everyone
// ---------------------------------------------------------
router.get("/result", (req, res) => {
  return res.status(200).json({
    message: "Voting result",
    candidates: candidates
  });
});

module.exports = router;
