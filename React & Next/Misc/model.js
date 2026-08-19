export function sum(a,b){
    return a+b;
}
export function diff(a,b){
    return a-b;
}
export function mul(a,b){
    return a*b;
}
export function div(a,b){
    if(b==0){
        return "b can't be zero";
    }
    return a/b;
}
function exp(a,b){
    return a**b;
}
export function mod(a,b){
    return a%b;
}
// module.exports={sum,diff,mul,div,exp,mod};