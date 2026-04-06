/*import './App.css'
import Header from './components/Header'
import Footer from './components/Footer'
import News from './components/News'
function App() {
  return (
    <>
    <h1 className='text-4xl font-bold text-blue-600'>Text</h1>
      <Header/>
      <News/>
      <Footer/>
    </>
  )
}

export default App
*/
import { useState } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import "./App.css";
import News from "./components/News";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Home from "./Components/Home";
import About from "./Components/About";

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/Home" element={<Home />} />
          <Route path="/About" element={<About />} />
        </Routes>
      </BrowserRouter>
      <Header />
      <News />
      <Footer />
    </>
  );
}

export default App;
