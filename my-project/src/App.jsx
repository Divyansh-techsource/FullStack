import './App.css'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
// import Registration from './components/registration.jsx'
function App() {
  const y=[2024,2025,2026];
  const c={
    name: "KIET",
    Location: "Ghaziabad",
    estdyear: 1998
  };
  return (
    <div>
      <Header title="My first React App"/>
    <h1>Hello World</h1>
    <h2>Welcome to ReactJS</h2>
    <Footer year={y} company={c}/>
    {/* <Registration /> */}
    </div>
  )
}

export default App