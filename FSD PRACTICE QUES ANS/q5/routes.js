// routes.js
// This file defines all the /api/tasks endpoints and their logic.
// Keeping routes in a separate file from server.js keeps things organized.

const express = require("express");
const router = express.Router();
const { tasks, VALID_STATUSES, getNextId } = require("./store");

// ---------------------------------------------------------
// 1. GET /api/tasks -> return all tasks
// ---------------------------------------------------------
router.get("/tasks", (req, res) => {
  // Just send back the whole array with a 200 OK status.
  return res.status(200).json(tasks);
});

// ---------------------------------------------------------
// 2. POST /api/tasks -> create a new task
// ---------------------------------------------------------
router.post("/tasks", (req, res) => {
  const { title, status } = req.body;

  // Validation rule: title is mandatory (must be a non-empty string)
  const isTitleValid = typeof title === "string" && title.trim().length > 0;

  // Validation rule: status must be one of the three allowed values
  const isStatusValid = VALID_STATUSES.includes(status);

  if (!isTitleValid || !isStatusValid) {
    return res.status(400).json({ message: "Please provide valid task details" });
  }

  // Build the new task object with a unique id
  const newTask = {
    id: getNextId(),
    title: title.trim(),
    status: status
  };

  tasks.push(newTask);

  // 201 would also be reasonable for "created", but the spec only
  // mentions 200 for GET, so we keep 201 here since it's a creation.
  return res.status(201).json(newTask);
});

// ---------------------------------------------------------
// 3. PATCH /api/tasks/:id -> update one or more fields
// ---------------------------------------------------------
router.patch("/tasks/:id", (req, res) => {
  // req.params.id always arrives as a string, so convert it to a number
  // to compare against our numeric task ids.
  const taskId = Number(req.params.id);

  const task = tasks.find((t) => t.id === taskId);

  if (!task) {
    return res.status(404).json({ message: "Task not found" });
  }

  const { title, status } = req.body;

  // If the client sent a status, it must be a valid one.
  // We check "status !== undefined" so that a PATCH which only
  // updates the title (and omits status) is still allowed.
  if (status !== undefined) {
    if (!VALID_STATUSES.includes(status)) {
      return res.status(400).json({ message: "Please provide valid task details" });
    }
    task.status = status;
  }

  // If the client sent a title, make sure it isn't empty before applying it.
  if (title !== undefined) {
    if (typeof title !== "string" || title.trim().length === 0) {
      return res.status(400).json({ message: "Please provide valid task details" });
    }
    task.title = title.trim();
  }

  return res.status(200).json(task);
});

// ---------------------------------------------------------
// 4. DELETE /api/tasks/:id -> remove a task
// ---------------------------------------------------------
router.delete("/tasks/:id", (req, res) => {
  const taskId = Number(req.params.id);
  const index = tasks.findIndex((t) => t.id === taskId);

  if (index === -1) {
    return res.status(404).json({ message: "Task not found" });
  }

  // Remove exactly one element at position "index"
  tasks.splice(index, 1);

  return res.status(200).json({ message: "Task deleted successfully" });
});

// ---------------------------------------------------------
// 5. GET /api/tasks/status/:status -> filter tasks by status
// ---------------------------------------------------------
// NOTE: This route must be declared in server.js AFTER any route like
// "/tasks/:id" would conflict, but since this path is "/tasks/status/:status"
// (a different shape), Express can tell it apart from "/tasks/:id" fine.
router.get("/tasks/status/:status", (req, res) => {
  const { status } = req.params;

  const filtered = tasks.filter((t) => t.status === status);

  return res.status(200).json(filtered);
});

module.exports = router;
