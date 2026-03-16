let p=new Promise((resolve,reject)=>{
    let s=true;
    if(s){
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