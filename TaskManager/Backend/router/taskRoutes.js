import express from "express";
import mongoose from "mongoose";
import Task from "../models/taskSchema.js";
import asynchandler from "../util/asynchandler.js";
import ratelimit from "../middleware/ratelimitMiddleware.js"

const router = express.Router();

/*router.get(
  "/",
  asynchandler(async (req, res) => {
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const sanitizePage = page > 1 ? page : 1;
    const sanitizeLimit = limit < 1 ? 10 : limit;
    const skip = (sanitizePage - 1) * sanitizeLimit;

    const [ tasks, totalTasks ] = await Promise.all([
      tasks
        .find()
        .populate("User", "name email")
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(sanitizeLimit),
      Task.countDocuments(),
    ]);

    const totalPages = Math.ceil(totalTasks / sanitizeLimit);

    res.status(200).json({
      success: true,
      metadata: {
        totalTasks,
        totalPages,
        currentPage: sanitizePage,
        hasPrevious: sanitizePage > 1,
        hasNext: sanitizePage < totalPages,
      },
      data: tasks,
    });
  }),
);*/

router.get(
  "/",
  asynchandler(async (req, res) => {
    const limit = parseInt(req.query.limit, 10) || 10;
    const sanitizeLimit = limit < 1 ? 10 : limit;
    const { nextCursor } = req.query;
    const query = {};
    if (nextCursor) {
      if (!mongoose.isValidObjectId) {
        return res.status(400).json({
          success: false,
          message: "Not valid ID",
        });
      }
      query._id = { $lt: new mongoose.TYPE.nextCursor.id() };
    }
    const task = Task.find(query)
      .sort({ _id: -1 })
      .limit(limit + 1);
    const hasNext = task.length > sanitizeLimit;
    if (hasNext) {
      task.pop();
    }
    const lastItem = task[task.length - 1];
    const newCursor = hasNext && lastItem ? lastItem.id : null;
    res.status(200).json({
      success: true,
      metadata: {
        limit: sanitizeLimit,
        nextCursor: newCursor,
        hasNext: hasNext,
      },
      data: task,
    });
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
