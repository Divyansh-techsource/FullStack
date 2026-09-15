import mongoose from "mongoose";
const studentSchema = mongoose.Schema({
  user: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  course: {
    type: String,
    required: true,
  },
});

const student = mongoose.model("student", studentSchema);
export default student;
