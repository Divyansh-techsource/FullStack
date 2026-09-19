// routes.js
// Defines /api/questions, /api/feedback, /api/feedback/:userId,
// and /api/feedback/summary.

const express = require("express");
const router = express.Router();
const { questions, feedbackSubmissions } = require("./store");

// ---------------------------------------------------------
// 1. GET /api/questions -> every question + its choices
// ---------------------------------------------------------
router.get("/questions", (req, res) => {
  return res.status(200).json(questions);
});

// ---------------------------------------------------------
// Helper: checks one single { questionId, optionId } entry against
// the real question list. Returns true only if:
//   - the object has both fields
//   - questionId matches a real question
//   - optionId matches one of THAT question's real options
// Kept as its own function since this check is the heart of the
// whole endpoint's validation and is easier to read in isolation.
// ---------------------------------------------------------
function isValidResponseEntry(entry) {
  if (typeof entry !== "object" || entry === null) {
    return false;
  }

  const { questionId, optionId } = entry;
  if (questionId === undefined || optionId === undefined) {
    return false;
  }

  const question = questions.find((q) => q.id === Number(questionId));
  if (!question) {
    return false;
  }

  const optionExists = question.options.some((o) => o.id === Number(optionId));
  return optionExists;
}

// ---------------------------------------------------------
// 2. POST /api/feedback -> submit answers to the survey
// ---------------------------------------------------------
router.post("/feedback", (req, res) => {
  const { userId, responses } = req.body;

  // Step 1: userId must be present, and responses must be a
  // non-empty array. Array.isArray guards against someone sending
  // responses as an object or a string instead of an array, which
  // would otherwise crash a later .every()/.map() call.
  const isUserIdValid = userId !== undefined && userId !== null && userId !== "";
  const isResponsesArray = Array.isArray(responses) && responses.length > 0;

  if (!isUserIdValid || !isResponsesArray) {
    return res.status(400).json({ message: "Please provide valid feedback" });
  }

  // Step 2: every single entry in the array must reference a real
  // question and a real option belonging to that question.
  const allEntriesValid = responses.every(isValidResponseEntry);

  if (!allEntriesValid) {
    // We deliberately return the SAME generic message as above,
    // rather than saying exactly which entry/field was wrong -
    // task #6 says not to expose internal validation details.
    return res.status(400).json({ message: "Please provide valid feedback" });
  }

  // Step 3: only store the submission once every check has passed.
  const submission = {
    userId: userId,
    responses: responses.map((r) => ({
      questionId: Number(r.questionId),
      optionId: Number(r.optionId)
    }))
  };

  feedbackSubmissions.push(submission);

  return res.status(201).json({ message: "Feedback submitted successfully" });
});

// ---------------------------------------------------------
// 3. GET /api/feedback/summary -> submission count per option
// ---------------------------------------------------------
// IMPORTANT: this route MUST be declared BEFORE "/feedback/:userId"
// below. Express matches routes top-to-bottom, so if the :userId
// route came first, a request to "/api/feedback/summary" would be
// wrongly captured by it (with userId = "summary") and never reach
// this handler at all. This exact ordering mistake is one of the
// most common bugs in these practice questions.
router.get("/feedback/summary", (req, res) => {
  // Build the summary starting from the question list, so every
  // option shows up even if it has zero submissions so far.
  const summary = questions.map((question) => ({
    questionId: question.id,
    text: question.text,
    options: question.options.map((option) => {
      const count = feedbackSubmissions.reduce((total, submission) => {
        const matched = submission.responses.some(
          (r) => r.questionId === question.id && r.optionId === option.id
        );
        return matched ? total + 1 : total;
      }, 0);

      return { optionId: option.id, text: option.text, count: count };
    })
  }));

  return res.status(200).json(summary);
});

// ---------------------------------------------------------
// 4. GET /api/feedback/:userId -> this user's submitted responses
// ---------------------------------------------------------
router.get("/feedback/:userId", (req, res) => {
  const { userId } = req.params;

  // A user might submit more than once, so we collect every
  // submission that matches rather than assuming there's only one.
  const userSubmissions = feedbackSubmissions.filter(
    (s) => String(s.userId) === userId
  );

  return res.status(200).json(userSubmissions);
});

module.exports = router;
