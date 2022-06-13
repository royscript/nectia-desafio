import NavBarLogin from "./header/NavBarLogin";
import axios from "../api/axios";
import Footer from "./footer/Footer";
import { useState } from "react";
import Usuario from "./CRUD/Usuario";
const Login = ()=>{
    const [nombreUsuario, setNombreUsuario] = useState("16.428.927-3");
    const [contrasena, setContrasena] = useState("164289273");
    const [logeado, setLogeado] = useState(false);
    const login = async (search)=>{
        if(nombreUsuario.length===0){
            alert("Escriba el nombre de usuario");
            return false;
        }
        if(contrasena.length===0){
            alert("Escriba la contraseña");
            return false;
        }
        try {
            const resultSet = await axios.post('/login/autenticar', {nombreUsuario,contrasena});
            console.log(resultSet.data);
            localStorage.clear();
            localStorage.setItem('token', resultSet.data.token);
            setLogeado(true);
            //setUsuarios(resultSet.data);
        } catch (error) {
            /*setRespuestaConsulta(
                <div className="alert alert-danger" role="alert">
                    {error}
                    <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                </div>);*/
        }
        
    }
    if(logeado===true){
       return <Usuario/>;
    }
    return (
        <div className="container py-3">
            <NavBarLogin nombreMantenedor="Login" dondeEstoy="" mensajeInicial="Ingresa tus datos para iniciar sesión"/>
            <main style={{"width":"450px"}}>
                <div className="align-content-lg-center">
                    <div className="mb-3">
                        <label htmlFor="exampleFormControlInput1" className="form-label"><b>Rut (**.***.***-*)</b></label>
                        <input type="text" className="form-control" id="exampleFormControlInput1" placeholder="rut" onChange={(e)=>setNombreUsuario(e.target.value)} value={nombreUsuario}/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleFormControlTextarea1" className="form-label"><b>Contraseña</b></label>
                        <input type="password" className="form-control" id="exampleFormControlInput1" placeholder="contarseña" onChange={(e)=>setContrasena(e.target.value)} value={contrasena}/>
                    </div>
                    <div className="mb-3">
                        <button type="button" className="btn btn-primary" onClick={()=>login()}>Login</button>
                    </div>
                </div>
            </main>
            <Footer/>
            </div>
    );
}
export default Login;