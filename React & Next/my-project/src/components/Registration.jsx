import "./Registration.css"
export default function Registration(){
    return(
        <>
        <form action="onSubmit" className="registration">
            <label></label>
            <input type="text" placeholder="Provide your name"></input>
        </form>
        <form action="onSubmit" className="registration">
            <label></label>
            <input type="text" placeholder="Phone Number"></input>
        </form>
        </>
    )
}