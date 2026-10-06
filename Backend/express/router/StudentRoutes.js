import express from "express";
import checkrole from "../middleware/roleMiddleware.js";
import Student from "../models/studentModel.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(authMiddleware());
router.use(express.json());

router.get("/Contact", async (req, res) => {
  try {
    res.status(200).send("Contact");
  } catch (error) {
    res.status(500).json({
      message: "Error fetching contact",
      error: error.message,
    });
  }
});

router.get("/search", checkrole("student", "teacher", "admin"),async (req, res) => {
    try {
      const { course } = req.query;
      if (!course) {
        return res.status(400).json({
          message: "Course is required",
        });
      }
      const students = await Student.find({
        course: { $regex: `^${course}$`, $options: "i" },
      });
      res.status(200).json(students);
    } catch (error) {
      res.status(500).json({
        message: "Error searching students",
        error: error.message,
      });
    }
  },
);

router.get("/", checkrole("student", "teacher", "admin"), async (req, res) => {
  try {
    const students = await Student.find();

    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching students",
      error: error.message,
    });
  }
});

router.get("/:id",checkrole("student", "teacher", "admin"),async (req, res) => {
    try {
      const id = req.params.id;

      const stud = await Student.findById(id);

      if (!stud) {
        return res.status(404).json({
          message: "Student not found",
        });
      }

      res.status(200).json(stud);
    } catch (error) {
      res.status(500).json({
        message: "Error fetching student",
        error: error.message,
      });
    }
  },
);

router.post("/", checkrole("teacher", "admin"), async (req, res) => {
  try {
    const newStudent = await Student.create({
      name: req.body.name,
      age: req.body.age,
      course: req.body.course,
    });

    res.status(201).json({
      message: "Student added successfully",
      student: newStudent,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error adding student",
      error: error.message,
    });
  }
});

router.delete("/:id", checkrole("admin"), async (req, res) => {
  try {
    const id = req.params.id;

    const deletedStudent = await Student.findByIdAndDelete(id);

    if (!deletedStudent) {
      return res.status(404).json({
        message: "Student not found",
      });
    }

    res.status(200).json({
      message: "Student deleted successfully",
      student: deletedStudent,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error deleting student",
      error: error.message,
    });
  }
});

router.put("/:id", checkrole("teacher", "admin"), async (req, res) => {
  try {
    const id = req.params.id;

    const updatedStudent = await Student.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatedStudent) {
      return res.status(404).json({
        message: "Student not found",
      });
    }

    res.status(200).json({
      message: "Student updated successfully",
      student: updatedStudent,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error updating student",
      error: error.message,
    });
  }
});

router.patch("/:id", checkrole("teacher", "admin"), async (req, res) => {
  try {
    const id = req.params.id;

    const updatedStudent = await Student.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatedStudent) {
      return res.status(404).json({
        message: "Student not found",
      });
    }

    res.status(200).json({
      message: "Student partially updated successfully",
      student: updatedStudent,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error partially updating student",
      error: error.message,
    });
  }
});

export default router;
