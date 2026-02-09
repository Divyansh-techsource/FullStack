import './App.css'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import main from './components/main.jsx'
import Registration from './components/registration.jsx'
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
    <card>
      <h4>This is Children Demo</h4>
      <p>This Demo talks about passing children props</p>
      <p>Thanks for reading</p>
    </card>
    <Footer year={y} company={c}/>
    <main />
    <Registration />
    </div>
  )
}

export default App