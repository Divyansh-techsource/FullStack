import {useState} from "react";
export default function Counter(){
    const [count,setCount]=useState(0);
    function handleIncrement(){
        if(count>=10){
            alert("Count cannot be greater than 10");
            return;
        }
        setCount(count=>count+1);
        console.log(count);
    }
    function handleDecrement(){
        if(count===0){
            alert("Count cannot be less than 0");
            return;
        }
        setCount(count=>count-1);
        console.log(count);
    }
    return(
        <>
        <h1>Counter App</h1>
        <h3>Count={count}</h3>
        <button onClick={handleIncrement}>+</button>
        <button onClick={handleDecrement}>-</button>
        </>
    );
}