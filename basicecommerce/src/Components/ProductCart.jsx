export default function ProductCart({product,addToCart}){
    return(
        <>
        <img src={product.image} alt={product.name}/>
        <h4>{product.name}</h4>
        <p>{product.price}</p>
        <button onClick={()=>addToCart}>Add to Cart</button>
        </>
    );
}