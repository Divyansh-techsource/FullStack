// store.js
// Our "database" - an array of book objects kept in memory, plus a
// counter used to hand out a unique id to every new book.
// Every book has an "available" flag: true means it's on the shelf,
// false means it's currently issued to someone.

let books = [
  { id: 1, title: "Clean Code", author: "Robert C. Martin", available: true },
  { id: 2, title: "Eloquent JavaScript", author: "Marijn Haverbeke", available: true }
];
let nextId = 3; // continues after the two seeded books above

module.exports = {
  books,
  getNextId: function () {
    return nextId++;
  }
};
