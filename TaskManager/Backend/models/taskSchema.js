import mongoose, { Mongoose } from "mongoose";
// import User from "./userSchema.js"

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    trim: true,
    default: "",
  },
  // user: {
  //   type: Mongoose.Schema.type.Object,
  //   ref: "User",
  // },
});

const Task = mongoose.model("Task", taskSchema);

export default Task;
