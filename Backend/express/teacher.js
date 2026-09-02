import express from "express";
const app = express();
app.use(express.json());

const teachers = [
    {
        id: 101,
        name: "A",
        age: 35,
        dept: "CS"
    },
    {
        id: 102,
        name: "B",
        age: 40,
        dept: "CSE"
    },
    {
        id: 103,
        name: "C",
        age: 27,
        dept: "ECE"
    }
];

app.get("/search", (req, res) => {
    const dept = req.query.dept;
    if (!dept) {
        return res.status(400).json({
            message: "No dept found"
        });
    }
    const filteredTeachers = teachers.filter(
        teacher => teacher.dept.toLowerCase() === dept.toLowerCase()
    );
    res.status(200).json(filteredTeachers);
});

app.get("/teachers", (req, res) => {
    res.status(200).json(teachers);
});

app.get("/teachers/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const tech = teachers.find(teacher => teacher.id === id);
    if (!tech) {
        return res.status(404).json({
            message: "Teacher not found"
        });
    }
    res.status(200).json(tech);
});

app.post("/teachers", (req, res) => {
    const newId = Math.max(...teachers.map(teacher => teacher.id)) + 1;
    const newTeacher = {
        id: newId,
        name: req.body.name,
        age: req.body.age,
        dept: req.body.dept
    };
    teachers.push(newTeacher);
    res.status(201).json({
        message: "Teacher added successfully",
        teacher: newTeacher
    });
});

app.delete("/teachers/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const index = teachers.findIndex(teacher => teacher.id === id);
    if (index === -1) {
        return res.status(404).json({
            message: "Teacher not found"
        });
    }
    teachers.splice(index, 1);
    res.status(200).json({
        message: "Teacher deleted successfully"
    });
});

app.put("/teachers/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const tech = teachers.find(teacher => teacher.id === id);
    if (!tech) {
        return res.status(404).json({
            message: "Teacher not found"
        });
    }
    tech.name = req.body.name;
    tech.dept = req.body.dept;
    tech.age = req.body.age;
    res.status(200).json({
        message: "Teacher updated successfully",
        teacher: tech
    });
});

app.patch("/teachers/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const tech = teachers.find(teacher => teacher.id === id);
    if (!tech) {
        return res.status(404).json({
            message: "Teacher not found"
        });
    }
    if (req.body.name !== undefined) {
        tech.name = req.body.name;
    }
    if (req.body.age !== undefined) {
        tech.age = req.body.age;
    }
    if (req.body.dept !== undefined) {
        tech.dept = req.body.dept;
    }
    res.status(200).json({
        message: "Teacher updated successfully",
        teacher: tech
    });
});

app.listen(3000, () => {
    console.log("Server Started");
});
