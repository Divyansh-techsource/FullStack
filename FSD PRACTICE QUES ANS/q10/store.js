// store.js
// Our "database" - a plain array of expense objects, plus a counter
// used to hand out a unique id to every new expense.

let expenses = [];
let nextId = 1;

module.exports = {
  expenses,
  // Small helper to get + increment the id counter in one step.
  getNextId: function () {
    return nextId++;
  }
};
