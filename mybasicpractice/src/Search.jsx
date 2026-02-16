import {useState} from "react";
export default function Search(){
    const [find,setFind]=useState("");
    const name=["Dennis","Ritchie","Paul","Frank"];
    const student=name.filter();
    return(
        <div>
            <h2>Demo to show search</h2>
            <input type="text" 
            placeholder="Enter key to search" 
            value={find} 
            onChange={(e)=>setFind(e.target.value)}/>
        </div>
    )
}