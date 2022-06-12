const Boton = ({label, type, ...props})=>{
    return(
        <div className="col text-center">
            <button type={type} {...props}>{label}</button>
        </div>
    )
}
export default Boton;