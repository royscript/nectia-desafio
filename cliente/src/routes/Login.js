import axios from "../api/axios";
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
import FrmLogin from "./CRUD/formularios/FrmLogin";
const Login = ()=>{
    //--------REDUX-------------------------
    const usuario = useSelector((state) => state.usuarioReducer);
    const dispatch = useDispatch();
    //--------CONSTANTES--------------------
    const [logeado, setLogeado] = useState(false);
    const [usuarioLogeado, setUsuarioLogeado] = useState(null);
    const [perfil, setPerfil] = useState([]);
    const navigate = useNavigate();
    const login = async (nombreUsuario,contrasena)=>{
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
                element={<Inicio/>}/>
            )}
            {comprobarPerfil("Usuario") &&(
                <Route 
                path="/Usuario" 
                element={<Usuario/>}/>
            )}
            {comprobarPerfil("TipoSolicitud") &&(
                <Route 
                path="/TipoSolicitud" 
                element={<TipoSolicitud/>}/>
            )}
            {comprobarPerfil("MisSolicitudes") &&(
                <Route 
                path="/MisSolicitudes" 
                element={<SolicitudSolicitante/>}/>
            )}
            {comprobarPerfil("AdministrarSolicitudes") &&(
                <Route 
                path="/AdministrarSolicitudes" 
                element={<SolicitudAdministrador/>}/>
            )}
            <Route
            path="/Login"
            element={<FrmLogin login={login}/>}/>
            <Route
            path="*"
            element={<FrmLogin login={login}/>}
            />
        </Routes>
    );
    
    
}
export default Login;