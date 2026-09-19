// store.js
// Our "database" - just an array of poll objects kept in memory.
// Each poll has:
//   id        -> unique number identifying the poll
//   question  -> the text of the poll question
//   options   -> array of { id, text, votes } - votes starts at 0

const polls = [
  {
    id: 1,
    question: "What is your favorite programming language?",
    options: [
      { id: 1, text: "JavaScript", votes: 0 },
      { id: 2, text: "Python", votes: 0 },
      { id: 3, text: "Java", votes: 0 }
    ]
  },
  {
    id: 2,
    question: "Which meal do you prefer?",
    options: [
      { id: 1, text: "Breakfast", votes: 0 },
      { id: 2, text: "Lunch", votes: 0 },
      { id: 3, text: "Dinner", votes: 0 }
    ]
  }
];

module.exports = { polls };
