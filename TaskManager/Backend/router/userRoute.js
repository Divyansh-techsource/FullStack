import express from "express";
import mongoose from "mongoose";
import User from "../models/userSchema.js";
const router = express.Router();

router.post("/user", async (req, res) => {
  try {
    const { name, email } = req.body;
    if (!name || !email) {
      return res.status(400).json({
        message: "Name and email are both required",
      });
    }
    const newUser = await User.create({
      name: name.trim(),
      email: email.trim(),
    });
    return res.status(200).json(newUser);
  } catch (error) {
    console.error("Add user error:", error);
    return res.status(500).json({
      message: "Failed to add user",
    });
  }
});
