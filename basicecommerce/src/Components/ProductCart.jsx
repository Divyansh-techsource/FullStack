export default function ProductCart({product,addToCart}){
    return(
        <>
        <img src={product.image} alt={product.name}/>
        <h4>{product.name}</h4>
        <p>{product.price}</p>
        <button onClick={()=>addToCart(product)}>Add to Cart</button>
        </>
    );
}