export default function UserCard({data}){
    return(
        <>
        <h4>Name:{data.name}</h4>
        <p>Role:{data.role}</p>
        <p>Country:{data.country}</p>
        </>
    );
}