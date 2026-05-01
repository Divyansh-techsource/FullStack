/*let promise=new Promise((resolve,reject)=>{
    let success=true;
    if(success){
        resolve("Data Connected");
    }
    else{
        reject("error in communication");
    }
});
//consuming promise
fetch("https://jsonplaceholder.typicode.com/users")
.then(response=>response.json())
.then(data=>console.log(data))
.catch(error=>console.log(error))
axios.get("https://jsonplaceholder.typicode.com/users")
.then(res=>console.log(res.data))
.catch(err=>console.log(err));
*/