// routes.js
// Defines the /api/books, /api/books/:id, /api/books/issue,
// and /api/books/return endpoints.

const express = require("express");
const router = express.Router();
const { books, getNextId } = require("./store");

// ---------------------------------------------------------
// 1. GET /api/books -> all books + their availability
// ---------------------------------------------------------
router.get("/books", (req, res) => {
  return res.status(200).json(books);
});

// ---------------------------------------------------------
// 2. GET /api/books/:id -> details for one book
// ---------------------------------------------------------
// NOTE: this dynamic route is declared BEFORE the static
// "/books/issue" and "/books/return" POST routes below it, but
// since those are POST requests and this is GET, there's no
// actual path-matching conflict between them. If you ever added
// a GET "/books/issue", you'd need that static route declared
// above this one to avoid Express treating "issue" as an :id.
router.get("/books/:id", (req, res) => {
  const bookId = Number(req.params.id);
  const book = books.find((b) => b.id === bookId);

  if (!book) {
    return res.status(404).json({ message: "Book not found" });
  }

  return res.status(200).json(book);
});

// ---------------------------------------------------------
// 3. POST /api/books -> add a new book
// ---------------------------------------------------------
router.post("/books", (req, res) => {
  const { title, author } = req.body;

  const isTitleValid = typeof title === "string" && title.trim().length > 0;
  const isAuthorValid = typeof author === "string" && author.trim().length > 0;

  if (!isTitleValid || !isAuthorValid) {
    return res.status(400).json({ message: "Please provide valid book details" });
  }

  const newBook = {
    id: getNextId(),
    title: title.trim(),
    author: author.trim(),
    available: true // new books always start out available
  };

  books.push(newBook);

  return res.status(201).json(newBook);
});

// ---------------------------------------------------------
// 4. POST /api/books/issue -> mark a book as issued
// ---------------------------------------------------------
router.post("/books/issue", (req, res) => {
  const { bookId } = req.body;

  if (bookId === undefined || bookId === null) {
    return res.status(400).json({ message: "bookId is required" });
  }

  const book = books.find((b) => b.id === Number(bookId));
  if (!book) {
    return res.status(404).json({ message: "Book not found" });
  }

  // Guard: can't issue a book that's already out.
  if (!book.available) {
    return res.status(400).json({ message: "Book is already issued" });
  }

  book.available = false;

  return res.status(200).json({
    message: "Book issued successfully",
    book: book
  });
});

// ---------------------------------------------------------
// 5. POST /api/books/return -> mark a book as available again
// ---------------------------------------------------------
router.post("/books/return", (req, res) => {
  const { bookId } = req.body;

  // Same validation pattern as /issue, kept consistent on purpose.
  if (bookId === undefined || bookId === null) {
    return res.status(400).json({ message: "bookId is required" });
  }

  const book = books.find((b) => b.id === Number(bookId));
  if (!book) {
    return res.status(404).json({ message: "Book not found" });
  }

  // Guard: a book that's already on the shelf can't be "returned" again.
  if (book.available) {
    return res.status(400).json({ message: "Book was not issued" });
  }

  book.available = true;

  return res.status(200).json({
    message: "Book returned successfully",
    book: book
  });
});

module.exports = router;
