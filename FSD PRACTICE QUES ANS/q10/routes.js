// routes.js
// Defines the /api/expenses, /api/expenses/category/:category,
// /api/expenses/summary, and DELETE /api/expenses/:id endpoints.

const express = require("express");
const router = express.Router();
const { expenses, getNextId } = require("./store");

// ---------------------------------------------------------
// 1. GET /api/expenses -> all stored expenses
// ---------------------------------------------------------
router.get("/expenses", (req, res) => {
  return res.status(200).json(expenses);
});

// ---------------------------------------------------------
// 2. POST /api/expenses -> create a new expense
// ---------------------------------------------------------
router.post("/expenses", (req, res) => {
  const { title, amount, category } = req.body;

  // All three fields are required...
  const isTitleValid = typeof title === "string" && title.trim().length > 0;
  const isCategoryValid = typeof category === "string" && category.trim().length > 0;

  // ...and amount specifically must be a POSITIVE number.
  const numericAmount = Number(amount);
  const isAmountValid = amount !== undefined && amount !== null && !isNaN(numericAmount) && numericAmount > 0;

  if (!isTitleValid || !isAmountValid || !isCategoryValid) {
    return res.status(400).json({ message: "Please provide valid expense details" });
  }

  const newExpense = {
    id: getNextId(),
    title: title.trim(),
    amount: numericAmount,
    category: category.trim()
  };

  expenses.push(newExpense);

  return res.status(201).json(newExpense);
});

// ---------------------------------------------------------
// 3. GET /api/expenses/category/:category -> filter by category
// ---------------------------------------------------------
// IMPORTANT ORDERING NOTE: this route (and the /summary route below)
// must be declared BEFORE any "/expenses/:id" style route, otherwise
// Express would try to match the word "category" or "summary" as an
// :id value instead of reaching these handlers. This file only has
// GET routes here plus a separate DELETE /:id below, so there's no
// conflict - but it's a common bug source worth remembering.
router.get("/expenses/category/:category", (req, res) => {
  const { category } = req.params;

  const filtered = expenses.filter(
    (e) => e.category.toLowerCase() === category.toLowerCase()
  );

  return res.status(200).json(filtered);
});

// ---------------------------------------------------------
// 4. GET /api/expenses/summary -> total amount + count
// ---------------------------------------------------------
router.get("/expenses/summary", (req, res) => {
  const totalAmount = expenses.reduce((sum, e) => sum + e.amount, 0);

  return res.status(200).json({
    totalAmount: totalAmount,
    count: expenses.length
  });
});

// ---------------------------------------------------------
// 5. DELETE /api/expenses/:id -> remove an expense
// ---------------------------------------------------------
router.delete("/expenses/:id", (req, res) => {
  const expenseId = Number(req.params.id);
  const index = expenses.findIndex((e) => e.id === expenseId);

  if (index === -1) {
    return res.status(404).json({ message: "Expense not found" });
  }

  expenses.splice(index, 1);

  return res.status(200).json({ message: "Expense deleted successfully" });
});

module.exports = router;
