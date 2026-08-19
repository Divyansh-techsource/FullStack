/*import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Home from "./Components/Home";
import About from "./Components/About";
import Details from "./Components/Details";
const App = () => {
  return (
    <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path="/Home" element={<Home/>} />
        <Route path="/About" element={<About/>} />
        <Route path="/details/:id" element={<Details/>}/>
      </Routes>
    </BrowserRouter>
  );
};
export default App;*/
import React from 'react';
import ReactDOM from 'react-dom';

// Functional component with props
function Greet(props) {
  return <h2>Hello, {props.name}!</h2>;
}

// Rendering the component and passing a prop
ReactDOM.render(
  <Greet name="Alice" />,
  document.getElementById('root')
);
