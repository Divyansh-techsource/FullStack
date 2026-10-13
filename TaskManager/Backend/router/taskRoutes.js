import express from "express";
import mongoose from "mongoose";
import Task from "../models/taskSchema.js";

const router = express.Router();

// GET: Fetch all tasks
router.get("/", async (req, res) => {
  try {
    const tasks = await Task.find().sort({ _id: -1 });
    res.status(200).json(tasks);
  } catch (error) {
    console.error("Fetch tasks error:", error);
    res.status(500).json({
      message: "Failed to fetch tasks",
    });
  }
});

// POST: Add a new task
router.post("/", async (req, res) => {
  try {
    const { title, description } = req.body;

    if (typeof title !== "string" || !title.trim()) {
      return res.status(400).json({
        message: "Task title is required",
      });
    }

    const newTask = await Task.create({
      title: title.trim(),
      description: typeof description === "string" ? description.trim() : "",
    });

    return res.status(201).json(newTask);
  } catch (error) {
    console.error("Add task error:", error);
    return res.status(500).json({
      message: "Failed to add task",
    });
  }
});

// DELETE: Delete a task
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({
        message: "Invalid task ID",
      });
    }

    const deletedTask = await Task.findByIdAndDelete(id);

    if (!deletedTask) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    return res.status(200).json({
      message: "Task deleted successfully",
    });
  } catch (error) {
    console.error("Delete task error:", error);
    return res.status(500).json({
      message: "Failed to delete task",
    });
  }
});

export default router;
