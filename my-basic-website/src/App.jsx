import Wrapper from "./components/wrapper.jsx";
import UserCard from "./components/UserCard.jsx"
export default function App(){
  const users=[
      {
        name:"Virat Kohli",
        role:"BatsMan",
        country:"India"
      },
      {
        name:"MS Dhoni",
        role:"WK-BatsMan",
        country:"India"
      },
      {
        name:"Rohit Sharma",
        role:"BatsMan",
        country:"India"
      },
    ]
  return(
    <>
    <h1>User DashBoard</h1>
    <h1>My dashboard</h1>
    <Wrapper title="User List">
      {
      users.map((data)=>(<UserCard data={data}/>))
      }
    </Wrapper>
    </>
  )
}