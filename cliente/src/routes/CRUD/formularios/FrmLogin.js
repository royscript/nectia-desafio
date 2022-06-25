import Footer from "../../footer/Footer";
import NavBarLogin from "../../header/NavBarLogin";
import { useState } from "react";
const FrmLogin = ({login})=>{
    const [nombreUsuario, setNombreUsuario] = useState("");
    const [contrasena, setContrasena] = useState("");
    const iniciarSesion = ()=>{
        login(nombreUsuario,contrasena);
    }
    return (
        <div className="container py-3">
            <NavBarLogin nombreMantenedor="Login" dondeEstoy="" mensajeInicial="Ingresa tus datos para iniciar sesión"/>
                <main style={{"width":"450px"}}>
                    <div className="align-content-lg-center">
                        <div className="mb-3">
                            <label className="form-label"><b>Rut (16428927-3)</b></label>
                            <input type="text" className="form-control" placeholder="rut" onChange={(e)=>setNombreUsuario(e.target.value)} value={nombreUsuario}/>
                        </div>
                        <div className="mb-3">
                            <label className="form-label"><b>Contraseña (164289273)</b></label>
                            <input type="password" className="form-control" placeholder="contraseña" onChange={(e)=>setContrasena(e.target.value)} value={contrasena}/>
                        </div>
                        <div className="mb-3">
                            <button type="button" className="btn btn-primary" onClick={()=>iniciarSesion()}>Login</button>
                        </div>
                    </div>
                </main>
            <Footer/>
        </div>
     );
}
export default FrmLogin;