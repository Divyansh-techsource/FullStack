// store.js
// Our "database" - an array of student objects kept in memory.
// Each student tracks presentCount and absentCount separately,
// so we can report both individual and aggregate summaries.

const students = [
  { id: 1, name: "Aarav Sharma", presentCount: 0, absentCount: 0 },
  { id: 2, name: "Priya Patel", presentCount: 0, absentCount: 0 },
  { id: 3, name: "Rohan Gupta", presentCount: 0, absentCount: 0 }
];

module.exports = { students };
