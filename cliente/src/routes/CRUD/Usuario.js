import { useEffect, useState } from "react";
import axiosPrivate from "../../api/axiosPrivate";
import Footer from "../footer/Footer";
import NavBar from "../header/NavBar";
import TablePagination from '../../components/tablas/TablePagination';
import FrmUsuario from "./formularios/FrmUsuario";
const Usuario = ({usuarioLogeado})=>{
    const [usuarios, setUsuarios] = useState([]);
    const [valoresFormulario, setValoresFormulario] = useState(null);
    const [accionFormulario,setAccionFormulario] = useState(null);
    const [pagSiguiente, setPagSiguiente] = useState(1);
    const [cantPorPag, setCantPorPag] = useState(5);
    
    const listarUsuarios = async (search)=>{
        try {
            const resultSet = await axiosPrivate.post('/usuario/listar', {pagSiguiente : pagSiguiente, cantPorPag : cantPorPag, search});
            if(resultSet.status===200){
                setUsuarios(resultSet.data);
            }else{
                
                console.log("Error : "+resultSet.status);
            } 
        } catch (error) {
            
            console.log(error);
        }
        
    }
    /* Al utilizar el paginador realizamos la busqueda */
    useEffect(()=>{
        listarUsuarios();
    },[pagSiguiente,cantPorPag])
    useEffect(()=>{
        listarUsuarios();
    },[])
    if(accionFormulario==="agregar" || accionFormulario==="modificar"){
        return <FrmUsuario 
                            accionFormulario={accionFormulario} 
                            setAccionFormulario={setAccionFormulario}
                            listarUsuarios={listarUsuarios}
                            valoresFormulario={valoresFormulario}/>;
    }
    return (
        <div className="container py-3">
            <NavBar nombreMantenedor="Usuarios" dondeEstoy="Usuario" mensajeInicial="" usuarioLogeado={usuarioLogeado}/>
            <main>
                <button style={{"float":"right","marginTop":"-50px"}} 
                        className="btn btn-primary btn-sm"
                        onClick={()=>{
                            setValoresFormulario(null);
                            setAccionFormulario("agregar");
                        }}>Agregar +</button>
            <TablePagination
                head={
                    <tr>
                        <th>#</th>
                        <th>Nombres</th>
                        <th>Email</th>
                        <th>Rut</th>
                        <th>Accion</th>
                    </tr>
                }
                mostrarDatos={
                    (value,index,eliminarRegistro)=>
                    <tr key={index+'fila'}>
                        <td>{value.idusuario}</td>
                        <td>{value.nombreusuario+" "+value.apellidousuario}</td>
                        <td>{value.emailusuario}</td>
                        <td>{value.rutusuario}</td>
                        <td>
                            <div className="btn-group" role="group">
                                <button type="button" className="btn btn-warning" onClick={
                                    ()=>{
                                        setValoresFormulario(value);
                                        setAccionFormulario("modificar");
                                        
                                    }
                                }>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil" viewBox="0 0 16 16">
                                        <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"/>
                                    </svg>
                                </button>
                                <button type="button" className="btn btn-danger" onClick={
                                    ()=>{
                                        var resp = window.confirm(`Desea eliminar este usuario? ${value.nombreusuario}`);
                                        if(resp) eliminarRegistro(value.idusuario);
                                    }
                                }>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash-fill" viewBox="0 0 16 16">
                                        <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>
                                    </svg>
                                </button>
                            </div>
                        </td>
                    </tr>
                }
                data={usuarios}
                setCantPorPag={setCantPorPag}
                setPagSiguiente={setPagSiguiente}
                funcionDeDatos={listarUsuarios}
                placeHolderSearch="Buscar por nombres, apellidos o rut del usuario"
                eliminar={{
                    url : '/usuario/eliminar'
                }}
            />
            </main>
            <Footer/>
            </div>
    );
}
export default Usuario;