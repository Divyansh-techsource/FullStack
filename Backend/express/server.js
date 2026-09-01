import express from "express";
const app=express();
app.use(express.json());

/*app.get("/",(req,res)=>{
    res.send("Home");
});

app.get("/About",(req,res)=>{
    res.send("About");
});

app.get("/Contact",(req,res)=>{
    res.send("Contact");
});*/

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

app.get("/search",(req,res)=>{
    const course=req.query.course;
    if(!course){
        return res.status(404).json({
            message:"No course found"
        });
    }
    const filteredStudents=students.filter(student=>student.course.toLowerCase()===course.toLowerCase());
    res.status(200).json(filteredStudents);
});

/*app.get("/students",(req,res)=>{
    res.json(students);
});

app.get("/students/:id",(req,res)=>{
    const id=parseInt(req.params.id);
    const stud=students.find(student=>student.id===id);
    if(!stud){
        res.status(404).json({
            message:"Student not found"
        });
    }
    res.json(stud);
});*/

/*app.post("/students",(req,res)=>{
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

app.delete("/students/:id",(req,res)=>{
    const id=parseInt(req.params.id);
    const index=students.findIndex(student=>student.id===id);
    if(index===-1){
        res.status(404).json({
            message:"Student not found"
        });
    }
    students.splice(index,1);
    res.status(200).json({
        message:"Student deleted successfully"
    });
});*/

app.put("/students/:id",(req,res)=>{
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
    res.json(stud);
    res.status(200).json({
        message:"Student updated successfully",
        student:stud
    });
});

app.patch("/students/:id",(req,res)=>{
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

app.listen(3000,()=>{
    console.log("Server Started");
});