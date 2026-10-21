import express from "express";
import mongoose from "mongoose";
import Task from "../models/taskSchema.js";
import asynchandler from "../util/asynchandler.js";

const router = express.Router();

router.get(
  "/",
  asynchandler(async (req, res) => {
    const tasks = await Task.find().populate().sort({ _id: -1 });
    res.status(200).json(tasks);
  }),
);

router.post(
  "/",
  asynchandler(async (req, res) => {
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
  }),
);

router.delete(
  "/:id",
  asynchandler(async (req, res) => {
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
  }),
);

export default router;
