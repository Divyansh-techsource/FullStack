// let a=10;
// console.log(a);
// a=20;
// console.log(a);

// var b=30;
// console.log(b);
// b=40;
// console.log(b);

// const c=50;
// console.log(c);
// c=60;
// console.log(c);

// console.log(a);
// const a=10;

// for(let i=1;i<=10;i++){
//     console.log("Divyansh");
// }

// let i=1;
// while(i<=10){
//     console.log(i);
//     i++;
// }

// let i=1;
// do{
//     console.log("Kaushik");
//     i++;
// }while(i<=10);

// console.log(5=='5');//true
// console.log(5==='5');//false strict checking

// for(let i=1;i<=10;i++){
//     if(i%2==0){
//         console.log("Even");
//     }
//     else{
//         console.log("Odd");
//     }
//     if(i=='5'){
//         console.log(5);
//     }
//     if(i==='5'){
//         console.log("f");
//     }
//     else{
//         console.log("t");
//     }
// }

// let num=10;//number
// let str='Hello';//string
// let arr=[1,2,3];//array object
// let obj={name:"Robin",age:10};//object
// let a;//undefined
// let emp=null;//object null
// let isok=true;//boolean
// console.log(typeof(isok));

// function sum(a,b){
//     console.log(a+b);
// }
// sum(10,20);

// let add=((a,b)=>{
//     console.log(a+b);
// });
// add(2,3);

// function greet(){
//     console.log("Hello");
// }
// greet();

// let sub=((a,b)=>{
//     console.log(a-b);
// });
// sub(4,2);

// function sum(a,b){
//     return a+b;
// }

// let add=sum(2,3);
// console.log(add);
// console.log(sum(4,5)-2);

// let i;
// let arr=[2,5,65,89,90,76,56,5,85,75,84]
// for(i=0;i<arr.length;i++){
//     if(arr[i]%2==0){
//         console.log(arr[i]);
//     }
// }

// const person={key:"Hello"};
// console.log(person.key);
// person.key="bye";
// console.log(person.key);

// const arr=["HTML","CSS","JavaScript"];
// console.log(arr);
// arr.push("Python");
// console.log(arr);

// const Sales="Toyota";

// function carType(name){
//     return name==="Honda"?name:"Sorry we don't sell this car";
// }
// const car={carn:"City",getCar:carType("Honda"),Special:Sales};
// console.log(car.carn);
// console.log(car.getCar);
// console.log(car.special);

// const color=["Red","Black","White"];
// color.forEach((i)=>console.log(i));

// const arr=[1,2,3,4,5,6];
// arr.forEach((i,a)=>console.log(i,a));
// arr.forEach((val,ind)=>{arr[ind]=val+3});
// for(const i in arr){
//     arr[i]+=3;
// }
// console.log(arr);

// for(const i in color){//for in loop
//     console.log(i,color[i]);
// }

// const user={name:"Rabins", age:25, Hobby:"Coding"};
// for(const i in user){
//     console.log(i,user[i]);
// }

// const lang=["Html","Css","JS"];
// for(const i in lang){
//     console.log(i);
// }
// for(const i of lang){
//     console.log(i);
// }
// greet("User");
// function greet(name){
//     // console.log("Hello"+" "+name);
//     console.log(`Hello ${name}`);
// }
// // greet("User");

const factorial=function(n)
{
    if(n==0||n==1)
        return 1;
    else
        return n*factorial(n-1);
}
console.log(factorial(5));