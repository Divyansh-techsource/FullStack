// store.js
// Our "database" - an array of candidate objects kept in memory.
// Each candidate starts with 0 votes.

const candidates = [
  { id: 1, name: "Candidate A", votes: 0 },
  { id: 2, name: "Candidate B", votes: 0 },
  { id: 3, name: "Candidate C", votes: 0 }
];

module.exports = { candidates };
