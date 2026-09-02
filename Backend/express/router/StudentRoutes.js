import express from "express";
const router=express.Router();
router.use(express.json());

// router.get("/",(req,res)=>{
//     res.send("Home");
// });

router.get("/About",(req,res)=>{
    res.send("About");
});

router.get("/Contact",(req,res)=>{
    res.send("Contact");
});

let students=[
    {
        id:1,
        name:"John",
        age:20,
        course:"CS"
    },
    {
        id:2,
        name:"Doe",
        age:25,
        course:"ECE"
    }
];

router.get("/search",(req,res)=>{
    const course=req.query.course;
    if(!course){
        return res.status(404).json({
            message:"No course found"
        });
    }
    const filteredStudents=students.filter(student=>student.course.toLowerCase()===course.toLowerCase());
    res.status(200).json(filteredStudents);
});

router.get("/",(req,res)=>{
    res.json(students);
});

router.get("/:id",(req,res)=>{
    const id=parseInt(req.params.id);
    const stud=students.find(student=>student.id===id);
    if(!stud){
        return res.status(404).json({
            message:"Student not found"
        });
    }
    res.json(stud);
});

router.post("/",(req,res)=>{
    const newStudent={
        id:students.length+1,
        name:req.body.name,
        age:req.body.age,
        course:req.body.course
    };
    students.push(newStudent);
    res.status(201).json({
        message:"Student added successfully",
        student:newStudent
    });
});

router.delete("/:id",(req,res)=>{
    const id=parseInt(req.params.id);
    const index=students.findIndex(student=>student.id===id);
    if(index===-1){
        return res.status(404).json({
            message:"Student not found"
        });
    }
    students.splice(index,1);
    res.status(200).json({
        message:"Student deleted successfully"
    });
});

router.put("/:id",(req,res)=>{
    const id=parseInt(req.params.id);
    const stud=students.find(student=>student.id===id);
    if(!stud){
        res.status(404).json({
            message:"Student not found"
        });
    }
    stud.name=req.body.name;
    stud.course=req.body.course;
    stud.age=req.body.age;
    res.status(200).json({
        message:"Student updated successfully",
        student:stud
    });
});

router.patch("/:id",(req,res)=>{
    const id=parseInt(req.params.id);
    const stud=students.find(student=>student.id===id);
    if(!stud){
        return res.status(404).json({
            message:"Student Not found"
        })
    }
    if(req.body.name!==undefined){
        stud.name=req.body.name;
    }
    if(req.body.age!==undefined){
        stud.age=req.body.age;
    }
    if(req.body.course!==undefined){
        stud.course=req.body.course;
    }
    res.status(200).json({
        message:"Student updated",
        student:stud
    })
});

export default router;