import {useState} from "react"
import './App.css'
import Header from "./Components/Header";
import ProductList from "./Components/ProductList";
import Cart from "./Components/Cart";
import Search from "./Components/Search";
function App() {
  const [cart,setCart]=useState([]);
  const [totalAmt,setAmt]=useState(0);
  const  product=[
    {
      id:1,
      name:"Laptop",
      price:50000,
      image:"https://i.dell.com/is/image/DellContent/content/dam/ss2/product-images/dell-client-products/notebooks/dell/dell-15-intel-3530/media-gallery/laptop-dell-dc15250nt-sl-plastic-usbc-data-gallery-2.psd?fmt=png-alpha&pscan=auto&scl=1&hei=804&wid=1372&qlt=100,1&resMode=sharp2&size=1372,804&chrss=full"
    },
    {
      id:2,
      name:"Mobile",
      price:30000,
      image:"https://crdms.images.consumerreports.org/prod/products/cr/models/399694-smartphones-apple-iphone-11-10008711.png"
    },
    {
      id:3,
      name:"Charger",
      price:1000,
      image:"https://m.media-amazon.com/images/I/51VM2jCx6kL._AC_UF1000,1000_QL80_.jpg"
    }
  ]
  function addToCart(product){
    setCart([...cart,product]);
    setAmt(totalAmount+product.price);
  }
  // function removeFromCart(index){
  //   const updateCart=cart.filter((_,i)=>i!=index);
  //   setCart(updateCart);
  // }
  const totalAmount=cart.reduce((total, index)=>(total+index.price),0);
  return (
    <>
    <Header cart={cart.length} totalAmount={totalAmount}/>
    <Search/>
    <Cart cart={cart} totalAmount={totalAmount}/>
    <ProductList products={product} addToCart={addToCart}/>
    </>
  );
}

export default App;