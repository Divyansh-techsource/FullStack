import './App.css'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import {useState,useEffect} from 'react'
import axios from 'axios'

function App() {
  const [count,setCount]=useState(0);
  return (
    <>
    <Header/>
    <Footer/>
    </>
  )
}

export default App
