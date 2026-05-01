import { BrowserRouter, Routes, Route } from "react-router-dom";
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
export default App;
