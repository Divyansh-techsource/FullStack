// import "./Header.css"
<<<<<<< HEAD
export default function Header({title}){
    return(
        <>
        <h1>{title}</h1>
=======
export default function Header({title,year,company}){
    return(
        <>
        <h1>{title}</h1>
        <h1>{year}</h1>
        <h1>{company}</h1>
>>>>>>> master
        <nav className="nav">
            <a href='#'>Home</a>
            <a href='#'> Contect Us </a>
            <a href='#'> Next Webpage </a>
        </nav>
        </>
    )
}