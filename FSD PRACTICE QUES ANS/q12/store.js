// store.js
// Our "database" - the predefined survey questions (fixed, not
// created via the API), plus an array that collects every valid
// feedback submission as it comes in.

// Each question has a list of options the user can pick from.
// "questionId" and "optionId" in a submitted response must match
// one of these ids exactly.
const questions = [
  {
    id: 1,
    text: "How satisfied are you with the product?",
    options: [
      { id: 1, text: "Very satisfied" },
      { id: 2, text: "Satisfied" },
      { id: 3, text: "Neutral" },
      { id: 4, text: "Unsatisfied" }
    ]
  },
  {
    id: 2,
    text: "How likely are you to recommend us to a friend?",
    options: [
      { id: 1, text: "Very likely" },
      { id: 2, text: "Somewhat likely" },
      { id: 3, text: "Not likely" }
    ]
  }
];

// Each entry looks like: { userId, responses: [{ questionId, optionId }, ...] }
const feedbackSubmissions = [];

module.exports = { questions, feedbackSubmissions };
