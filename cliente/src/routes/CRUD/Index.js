import Footer from "../footer/Footer";
import NavBar from "../header/NavBar";
import axiosPrivate from "../../api/axiosPrivate";
import { useSelector } from "react-redux";
import { useEffect } from "react";
const Inicio = ()=>{
    const usuario = useSelector((state) => state);
    useEffect(()=>{
        //Como siempre la aplicacion comienza acá, desde este punto inicializamos el token para que sea utilizado en toda la aplicacion
        axiosPrivate.interceptors.request.use(
            (request) =>{
                request.headers["Content-Type"] = 'application/json';
                request.headers["authorization"] = localStorage.getItem('token');
                return request;
            },
            (err)=> err
        );
    },[])
    return (
        <div className="container py-3">
            <NavBar nombreMantenedor="Inicio" dondeEstoy="Inicio" mensajeInicial={"Bienvenido "+usuario.nombreCompleto}/>
            <main>
                
            
            </main>
            <Footer/>
            </div>
    );
}
export default Inicio;