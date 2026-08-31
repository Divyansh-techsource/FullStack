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

app.post("/students",(req,res)=>{
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
    res.json({
        message:"Student deleted successfully"
    });
});

app.listen(PORT,()=>{
    console.log("Server Started");
});