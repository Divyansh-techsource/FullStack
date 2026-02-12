export default function eventToDo(){
    // function handleClick({name}){
    //     alert(`You pressed button ${name}`);
    // }
    function handleSubmit(e){
        e.preventDefault();
        const input=e.target.value;
        //if(input.length==0) return;
        const inputValue=input.trim();
        if(inputValue===""){
            alert("Task cannot be empty");
            return;
        }
        const li=document.createElement("li");
    }
    function handleClickList(){
        
    }
    return(
        <>
        {/* <h1>Event Handling</h1>
        <button onClick={()=>handleClick({name:"KIET"})}>Click Me</button> */}
        <h1>To Do App</h1>
        <form onSubmit={handleSubmit}>
            <input type="text" name="task" placeholder="Add your task here"/>
            <input type="submit">Add Task</input>
        </form>
        <ul id="task list" onClick={handleClickList}>
            <li></li>
        </ul>
        </>
    );
}