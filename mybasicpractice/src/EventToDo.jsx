// export default function EventToDo(){
//     // function handleClick({name}){
//     //     alert(`You pressed button ${name}`);
//     // }
//     function handleSubmit(e){
//         e.preventDefault();
//         const input=e.target.task;
//         const inputValue=input.value.trim();
//         if(inputValue===""){
//             alert("Task cannot be empty");
//             return;
//         }
//         const li=document.createElement("li");
//         li.innerHTML=`<span>${inputValue}</span>
//         <button class="deleteBtn">Delete</button>`;
//         document.getElementById("taskList").appendChild(li);
//     }
//     function handleClickList(e){
//         if(e.target.className==="deleteBtn"){
//             e.target.parentElement.remove();
//         }
//     }
//     return(
//         <>
//         {/* <h1>Event Handling</h1>
//         <button onClick={()=>handleClick({name:"KIET"})}>Click Me</button> */}
//         <h1>To Do App</h1>
//         <form onSubmit={handleSubmit}>
//             <input type="text" name="task" placeholder="Add your task here"/>
//             <button type="submit">Add Task</button>
//         </form>
//         <ul id="taskList" onClick={handleClickList}>
//             <li></li>
//         </ul>
//         </>
//     );
// }


export default function EventToDo(){
    // function handleClick({name}){
    //     alert(`You pressed button ${name}`);
    // }
    const[task,setTask]=useState("");
    const[tasks,setTasks]=useState([]);
    function handleSubmit(e){
        e.preventDefault();
        const input=e.target.task;
        const inputValue=input.value.trim();
        if(inputValue===""){
            alert("Task cannot be empty");
            return;
        }
        const li=document.createElement("li");
        li.innerHTML=`<span>${inputValue}</span>
        <button class="deleteBtn">Delete</button>`;
        document.getElementById("taskList").appendChild(li);
    }
    function handleClickList(e){
        if(e.target.className==="deleteBtn"){
            e.target.parentElement.remove();
        }
    }
    return(
        <>
        {/* <h1>Event Handling</h1>
        <button onClick={()=>handleClick({name:"KIET"})}>Click Me</button> */}
        <h1>To Do App</h1>
        <form onSubmit={handleSubmit}>
            <input type="text" name="task" placeholder="End Task"/>
            <button type="submit">Add Task</button>
        </form>
        <ul id="taskList" onClick={handleClickList}>
            <li></li>
        </ul>
        </>
    );
}