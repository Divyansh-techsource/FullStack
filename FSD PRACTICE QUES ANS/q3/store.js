// store.js
// Our "database" - an array of event/workshop objects kept in memory.
// Each event tracks its own registrationCount, starting at 0.

const events = [
  { id: 1, title: "Intro to Node.js", registrationCount: 0 },
  { id: 2, title: "React for Beginners", registrationCount: 0 },
  { id: 3, title: "Databases 101", registrationCount: 0 }
];

module.exports = { events };
