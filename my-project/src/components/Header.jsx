// import "./Header.css"
export default function Header({title}){
    return(
        <>
        <h1>{title}</h1>
        <nav className="nav">
            <a href='#'>Home</a>
            <a href='#'> Contect Us </a>
            <a href='#'> Next Webpage </a>
        </nav>
        </>
    )
}