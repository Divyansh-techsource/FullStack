import mongoose from "mongoose";
const teacherSchema = mongoose.Schema({
  user: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  dept: {
    type: String,
    required: true,
  },
});

const teacher = mongoose.model("teacher", teacherSchema);
export default teacher;
