import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../../api/axios';
const NavBar = ({nombreMantenedor,dondeEstoy,mensajeInicial,usuarioLogeado})=>{
    const [perfil, setPerfil] = useState([]);
    const navigate = useNavigate();
    const cerrarSesion = ()=>{
        localStorage.clear();
        navigate("/Login");
    }
    const obtenerPerfilUsuario = async ()=>{
        let tokenStorage = localStorage.getItem('token');
        if(tokenStorage===null){
            //console.log("Sin token");
        }else{
            try {
                const resultSet = await axios.post('/login/perfil-usuario', {token : tokenStorage});
                setPerfil(resultSet.data.perfil);
            } catch (error) {
                alert(error);
            }
        }
    }
    useEffect(()=>{
        obtenerPerfilUsuario();
    },[])
    return (
        <header>
                <div className="d-flex flex-column flex-md-row align-items-center pb-3 mb-4 border-bottom">
                <div href="/" className="d-flex align-items-center text-dark text-decoration-none">
                    <span className="fs-4">Solicitudes</span>
                </div>
                <nav className="d-inline-flex mt-2 mt-md-0 ms-md-auto">
                    {perfil.map((data, index)=>{
                        var estilo = {"cursor":"pointer","color":"black"};
                        if(dondeEstoy===data.nombrepermiso){
                            estilo = {"cursor":"pointer","color":"red", "textDecorationLine":"underline"};
                        }
                        return <div className="me-3 py-2" style={estilo} onClick={()=>{
                            navigate("/"+data.nombrepermiso);
                        }} key={index+"-menu"}>{data.nombrepermiso}</div>
                    })}
                    
                    <div className="me-3 py-2 text-dark text-decoration-none" style={{"cursor":"pointer"}}>
                        <div className="btn-group">
                            <button className="btn btn-secondary btn-sm dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-justify" viewBox="0 0 16 16">
                                <path fillRule="evenodd" d="M2 12.5a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5zm0-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5zm0-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5zm0-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5z"/>
                            </svg>
                            </button>
                            <ul className="dropdown-menu">
                                <li><a className="dropdown-item" href="#">{usuarioLogeado}</a></li>
                                <li><hr className="dropdown-divider"/></li>
                                <li><a className="dropdown-item" href="#" onClick={()=>{
                                    cerrarSesion();
                                }}>Cerrar Sesion</a></li>
                            </ul>
                        </div>
                    </div>
                    
                </nav>
                </div>

                <div className="pricing-header p-3 pb-md-4 mx-auto text-center">
                <h1 className="display-4 fw-normal">{nombreMantenedor}</h1>
                <p className="fs-5 text-muted">{mensajeInicial}</p>
                </div>
            </header>
    );
}
export default NavBar;