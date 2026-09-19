// routes.js
// Defines the /api/students, /api/attendance, and
// /api/attendance/:studentId endpoints.

const express = require("express");
const router = express.Router();
const { students } = require("./store");

const VALID_STATUSES = ["present", "absent"];

// ---------------------------------------------------------
// 1. GET /api/students -> everyone + their attendance count
// ---------------------------------------------------------
router.get("/students", (req, res) => {
  // "attendance count" = total number of days recorded so far
  // (present + absent), since that's the count of records taken.
  const studentsWithCount = students.map((s) => ({
    id: s.id,
    name: s.name,
    attendanceCount: s.presentCount + s.absentCount
  }));

  return res.status(200).json({
    message: "Students retrieved successfully",
    students: studentsWithCount
  });
});

// ---------------------------------------------------------
// 2. POST /api/attendance -> record a student's attendance
// ---------------------------------------------------------
router.post("/attendance", (req, res) => {
  const { studentId, status } = req.body;

  // Step 1: both fields must be present, AND status must be one of
  // the two allowed values. Treating an invalid status the same as
  // a "missing" status keeps this check simple and matches the
  // spirit of the spec (only "present"/"absent" are acceptable).
  const isStudentIdPresent = studentId !== undefined && studentId !== null;
  const isStatusValid = VALID_STATUSES.includes(status);

  if (!isStudentIdPresent || !isStatusValid) {
    return res.status(400).json({ message: "studentId and status are required" });
  }

  // Step 2: the student must exist.
  const student = students.find((s) => s.id === Number(studentId));
  if (!student) {
    return res.status(404).json({ message: "Student not found" });
  }

  // Step 3: only now, after validation has fully passed, do we
  // update the record.
  if (status === "present") {
    student.presentCount += 1;
  } else {
    student.absentCount += 1;
  }

  return res.status(200).json({
    message: "Attendance recorded successfully",
    student: student
  });
});

// ---------------------------------------------------------
// 3. GET /api/attendance/:studentId -> one student's summary
// ---------------------------------------------------------
router.get("/attendance/:studentId", (req, res) => {
  const studentId = Number(req.params.studentId);
  const student = students.find((s) => s.id === studentId);

  if (!student) {
    return res.status(404).json({ message: "Student not found" });
  }

  return res.status(200).json({
    id: student.id,
    name: student.name,
    presentCount: student.presentCount,
    absentCount: student.absentCount
  });
});

// ---------------------------------------------------------
// 4. GET /api/attendance -> aggregate counts across all students
// ---------------------------------------------------------
// NOTE: this route is declared AFTER "/attendance/:studentId" would
// normally matter for paths like "/attendance/summary", but since
// this exact path has no extra segment, Express matches it fine
// regardless of order here. It's still good practice to keep more
// specific/static routes above dynamic ":param" routes when in doubt.
router.get("/attendance", (req, res) => {
  const totals = students.reduce(
    (acc, s) => {
      acc.totalPresent += s.presentCount;
      acc.totalAbsent += s.absentCount;
      return acc;
    },
    { totalPresent: 0, totalAbsent: 0 }
  );

  return res.status(200).json(totals);
});

module.exports = router;
