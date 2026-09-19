// routes.js
// Defines all the /api/polls and /api/vote endpoints.

const express = require("express");
const router = express.Router();
const { polls } = require("./store");

// ---------------------------------------------------------
// Small helper: calculate the total number of responses
// for a poll by adding up the votes on every option.
// ---------------------------------------------------------
function getTotalResponses(poll) {
  return poll.options.reduce((sum, option) => sum + option.votes, 0);
}

// ---------------------------------------------------------
// 1. GET /api/polls -> return every poll with questions,
//    choices, and response counts.
// ---------------------------------------------------------
router.get("/polls", (req, res) => {
  return res.status(200).json({
    message: "Polls retrieved successfully",
    polls: polls
  });
});

// ---------------------------------------------------------
// 2. GET /api/polls/:id -> return one poll by id
// ---------------------------------------------------------
router.get("/polls/:id", (req, res) => {
  const pollId = Number(req.params.id);
  const poll = polls.find((p) => p.id === pollId);

  if (!poll) {
    return res.status(404).json({ message: "Poll not found" });
  }

  return res.status(200).json(poll);
});

// ---------------------------------------------------------
// 3. POST /api/vote -> cast a vote for an option
// ---------------------------------------------------------
router.post("/vote", (req, res) => {
  const { pollId, optionId } = req.body;

  // Step 1: both fields must be present.
  // We check for undefined/null rather than falsy, so pollId = 0
  // (if that were ever a valid id) wouldn't be wrongly rejected.
  if (pollId === undefined || pollId === null || optionId === undefined || optionId === null) {
    return res.status(400).json({ message: "pollId and optionId are required" });
  }

  // Step 2: the poll itself must exist.
  const poll = polls.find((p) => p.id === Number(pollId));
  if (!poll) {
    return res.status(404).json({ message: "Poll not found" });
  }

  // Step 3: the option must belong to THIS poll.
  const option = poll.options.find((o) => o.id === Number(optionId));
  if (!option) {
    return res.status(400).json({ message: "Invalid option" });
  }

  // Step 4: everything checks out - record the vote.
  option.votes += 1;

  return res.status(200).json({
    message: "Vote recorded successfully",
    poll: poll
  });
});

// ---------------------------------------------------------
// 4. GET /api/polls/:id/results -> counts per option + total
// ---------------------------------------------------------
router.get("/polls/:id/results", (req, res) => {
  const pollId = Number(req.params.id);
  const poll = polls.find((p) => p.id === pollId);

  if (!poll) {
    return res.status(404).json({ message: "Poll not found" });
  }

  return res.status(200).json({
    pollId: poll.id,
    question: poll.question,
    results: poll.options.map((o) => ({ optionId: o.id, text: o.text, votes: o.votes })),
    totalResponses: getTotalResponses(poll)
  });
});

module.exports = router;
