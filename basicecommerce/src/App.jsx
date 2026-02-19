import {useState} from "react"
import './App.css'

function App() {
  const [cart,setCart]=useState([]);
  const  product=[
    {
      id:1,
      name:"Laptop",
      price:50000,
      image:"https://m.media-amazon.com/images/I/71jG+e7roXL._SL1500_.jpg"
    },
    {
      id:2,
      name:"Mobile",
      price:30000,
      image:"https://media.istockphoto.com/id/2015603685/vector/realistic-smartphone-mockup-mobile-phone-vector-with-isolated-on-white-background-device.jpg?s=612x612&w=0&k=20&c=rGXt_Gdi8AEyZJ_U3O55GkOnZCQ1g8RPJ3zqxCggP3g="
    },
    {
      id:3,
      name:"Charger",
      price:1000,
      image:"https://cdn.shopify.com/s/files/1/1603/9553/files/Artboard_1_fefd9b6a-7533-4bf3-b8ab-61585e3f1570.jpg?v=1722427853"
    }
  ]
  function addToCart(product){
    setCart([...cart,product]);
  }
  function removeFromCart(index){
    const updateCart=cart.filter((_,i)=>i!=index);
    setCart(updateCart);
  }
  const totalAmount=cart.reduce((total, index)=>(total+index.price),0);
  return (
    <>
    <Header cart={cart.length}>
    {/* <ProductList/>
    <Cart/> */}
    </>
  );
}

export default App