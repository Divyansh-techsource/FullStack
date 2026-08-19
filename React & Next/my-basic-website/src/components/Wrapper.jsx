export default function Wrapper({title,children}){
    return(
        <>
        <h2>{title}</h2>
        <>
        {children}
        </>
        </>
    );
}