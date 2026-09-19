// store.js
// This file holds our "database" in memory.
// Since the task says "in-memory store", we just use a plain JavaScript array.
// Every time the server restarts, this data resets - that's expected here.

let tasks = [];       // array that will hold all task objects
let nextId = 1;       // simple counter used to generate unique task ids

// The only statuses a task is allowed to have.
// Keeping this in one place means every file can import and reuse it,
// instead of typing the same three strings everywhere.
const VALID_STATUSES = ["pending", "in-progress", "completed"];

module.exports = {
  tasks,
  nextId,
  VALID_STATUSES,
  // Small helper to get + increment the id counter in one step.
  getNextId: function () {
    return nextId++;
  }
};
