export default function Product({data}){
    return(
        <>
        <h4>Name:{data.name}</h4>
        <p>DESC:{data.desc}</p>
        <p>Price:{data.price}</p>
        </>
    );
}