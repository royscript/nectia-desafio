import NavBarLogin from "./header/NavBarLogin";
import axios from "../api/axios";
import Footer from "./footer/Footer";
import { useEffect, useState } from "react";
import Usuario from "./CRUD/Usuario";
import md5 from 'md5';
import { Routes, Route } from 'react-router';
import { useNavigate } from 'react-router-dom';
import Inicio from "./CRUD/Index";
import TipoSolicitud from "./CRUD/TipoSolicitud";
import SolicitudSolicitante from "./CRUD/SolicitudSolicitante";
import SolicitudAdministrador from "./CRUD/SolicitudAdministrador";
import { getToken, setToken } from '../auth/Token';
import { useSelector, useDispatch } from "react-redux";
const Login = ()=>{
    //--------REDUX-------------------------
    const usuario = useSelector((state) => state.usuarioReducer);
    const dispatch = useDispatch();
    //--------CONSTANTES--------------------
    const [nombreUsuario, setNombreUsuario] = useState("16428927-3");
    const [contrasena, setContrasena] = useState("164289273");
    const [logeado, setLogeado] = useState(false);
    const [usuarioLogeado, setUsuarioLogeado] = useState(null);
    const [perfil, setPerfil] = useState([]);
    const navigate = useNavigate();
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
            const resultSet = await axios.post('/login/autenticar', {nombreusuario : md5(nombreUsuario),contrasena : md5(contrasena)});
            //console.log(resultSet.data);
            if(resultSet.data.login===true){
                setToken(resultSet.data.token);
                setUsuarioLogeado(resultSet.data.nombres);
                dispatch({type : "cambiarToken",payload : resultSet.data.token});
                dispatch({type : "cambiarNombreCompleto",payload : resultSet.data.nombres});
                setPerfil(resultSet.data.perfil);
                iniciar();
            }else{
                alert(resultSet.data.respuesta);
            }
            //setUsuarios(resultSet.data);
        } catch (error) {
            console.log(error);
            navigate("/Login");
            /*setRespuestaConsulta(
                <div className="alert alert-danger" role="alert">
                    {error}
                    <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                </div>);*/
        }
        
    }
    const iniciar = async ()=>{
        const token = await getToken();
        console.log(token);
        if(!token){
            delete axios.defaults.headers.common['Authorization'];
            return false;
        }else{
            axios.defaults.headers.common['Authorization'] = token;
            setLogeado(true);
            navigate("/Inicio");
        }
    }   

    const refrescarToken = async ()=>{
        let tokenStorage = getToken();
        if(tokenStorage===null){
            //console.log("Sin token");
        }else{
            try {
                const resultSet = await axios.post('/login/refrescar-token', {token : tokenStorage});
                if(resultSet.data.login===true){
                    setToken(resultSet.data.token);
                    setUsuarioLogeado(resultSet.data.nombres);
                    dispatch({type : "cambiarToken",payload : resultSet.data.token});
                    dispatch({type : "cambiarNombreCompleto",payload : resultSet.data.nombres});
                    setPerfil(resultSet.data.perfil);
                    iniciar();
                }else{
                    alert(resultSet.data.respuesta);
                    navigate("/Login");
                }
            } catch (error) {
                console.log(error);
            }
        }
    }
    useEffect(()=>{
        iniciar();
        refrescarToken();
    },[])

    const FrmLogin = ()=>{
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
    
    const comprobarPerfil = (permiso)=>{
        //Si tiene el perfil y esta logeado
        if(perfil.findIndex( val => val.nombrepermiso === permiso) > -1 && logeado===true){
            return true;
        }else{
            return false;
        }
    }
    return (
        <Routes>
            {logeado &&(
                <Route 
                path="/Inicio" 
                element={<Inicio usuarioLogeado={usuarioLogeado}/>}/>
            )}
            {comprobarPerfil("Usuario") &&(
                <Route 
                path="/Usuario" 
                element={<Usuario usuarioLogeado={usuarioLogeado}/>}/>
            )}
            {comprobarPerfil("TipoSolicitud") &&(
                <Route 
                path="/TipoSolicitud" 
                element={<TipoSolicitud usuarioLogeado={usuarioLogeado}/>}/>
            )}
            {comprobarPerfil("MisSolicitudes") &&(
                <Route 
                path="/MisSolicitudes" 
                element={<SolicitudSolicitante usuarioLogeado={usuarioLogeado}/>}/>
            )}
            {comprobarPerfil("AdministrarSolicitudes") &&(
                <Route 
                path="/AdministrarSolicitudes" 
                element={<SolicitudAdministrador usuarioLogeado={usuarioLogeado}/>}/>
            )}
            <Route
            path="/Login"
            element={<FrmLogin/>}/>
            <Route
            path="*"
            element={<FrmLogin/>}
            />
        </Routes>
    );
    
    
}
export default Login;