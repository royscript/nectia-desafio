import { useEffect, useState } from "react";
import {axiosPrivate} from "../../api/axios";
import Footer from "../footer/Footer";
import NavBar from "../header/NavBar";
import TablePagination from '../../components/tablas/TablePagination';
import FrmTipoSolicitud from "./formularios/FrmTipoSolicitud";
const SolicitudSolicitante = ({usuarioLogeado})=>{
    const [tipoSolicitud, setTipoSolicitud] = useState([]);
    const [valoresFormulario, setValoresFormulario] = useState(null);
    const [accionFormulario,setAccionFormulario] = useState(null);
    const [pagSiguiente, setPagSiguiente] = useState(1);
    const [cantPorPag, setCantPorPag] = useState(5);
    const [estadoSolicitud,setEstadoSolicitud] = useState([]);
    const [estadoSolicitudSeleccionada,setEstadoSolicitudSeleccionada] = useState([]);
    const [fechaInicio, setFechaInicio] = useState(null);
    const [fechaFinal, setFechaFinal] = useState(null);
    const listarEstadoSolicitud = async ()=>{
        try {
            const resultSet = await axiosPrivate.post('/estado-solicitud/listar');
            if(resultSet.status===200){
                setEstadoSolicitud(resultSet.data);
            }else{
                alert("Error : "+resultSet.status);
            }
        } catch (error) {
            alert(error);
        }
        
    }
    const listarSolicitudes = async (search)=>{
        try {
            const resultSet = await axiosPrivate.post('/solicitud/listar-solicitudes-usuario', {pagSiguiente : pagSiguiente, cantPorPag : cantPorPag, search, estadoSolicitudSeleccionada, fechaInicio, fechaFinal});
            if(resultSet.status===200){
                setTipoSolicitud(resultSet.data);
            }else{
                alert("Error : "+resultSet.status);
            }
        } catch (error) {
            alert(error);
        }
        
    }
    /* Al utilizar el paginador realizamos la busqueda */
    useEffect(()=>{
        listarSolicitudes();
    },[pagSiguiente,cantPorPag])
    useEffect(()=>{
        listarEstadoSolicitud();
    },[])
    useEffect(()=>{
        listarSolicitudes();
    },[estadoSolicitud])
    if(accionFormulario==="agregar" || accionFormulario==="modificar"){
        return <FrmTipoSolicitud 
                            accionFormulario={accionFormulario} 
                            setAccionFormulario={setAccionFormulario}
                            listarSolicitudes={listarSolicitudes}
                            valoresFormulario={valoresFormulario}/>;
    }

    const bagdeEstadoSolicitud = (id,nombre)=>{
        switch (id) {
            case 3:
                return <span className="badge text-bg-warning">{nombre}</span>
                break;
            case 2:
                return <span className="badge text-bg-danger">{nombre}</span>
                break;
            case 1:
                return <span className="badge text-bg-success">{nombre}</span>
                break;
            default:
                break;
        }
    }
    return (
        <div className="container py-3">
            <NavBar nombreMantenedor="Mis Solicitudes" dondeEstoy="Solicitud" mensajeInicial="" usuarioLogeado={usuarioLogeado}/>
            <main>
                <button style={{"float":"right","marginTop":"-50px"}} 
                        className="btn btn-primary btn-sm"
                        onClick={()=>{
                            setValoresFormulario(null);
                            setAccionFormulario("agregar");
                        }}>Realizar Solicitud +</button>
            <TablePagination
                head={
                    <tr>
                        <th>#</th>
                        <th>Tipo</th>
                        <th>Administrador</th>
                        <th>Solicitante</th>
                        <th>Estado</th>
                        <th>Fecha Solicitud</th>
                        <th>Fecha Respuesta</th>
                        <th>Accion</th>
                    </tr>
                }
                mostrarDatos={
                    (value,index,eliminarRegistro)=>
                    <tr key={index+'fila'}>
                        <td>{value.idsolicitud }</td>
                        <td>{value.nombretiposolicitud}</td>
                        <td>{value.nombresAdministrador}</td>
                        <td>{value.nombresCliente }</td>
                        <td>{bagdeEstadoSolicitud(value.idestadosolicitud,value.nombreestadosolicitud)}</td>
                        <td>{value.fechaInicio}</td>
                        <td>{value.fechaFin}</td>
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
                                        var resp = window.confirm(`Desea eliminar esta solicitud? ${value.nombretiposolicitud}`);
                                        if(resp) eliminarRegistro(value.idsolicitud);
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
                data={tipoSolicitud}
                setCantPorPag={setCantPorPag}
                setPagSiguiente={setPagSiguiente}
                funcionDeDatos={listarSolicitudes}
                placeHolderSearch="Buscar tipo de solicitud"
                styleSearch={{"display":"none"}}
                eliminar={{
                    url : '/solicitud/eliminar'
                }}
                busquedaExtra={
                    <>
                        Estado <select style={{'width':'150px'}} onChange={(e)=>setEstadoSolicitudSeleccionada(e.target.value)}>
                            <option value="">Seleccione</option>
                            {estadoSolicitud.map((value,key)=><option key={key+'-estadoSolicitud'} value={value.idestadosolicitud}>{value.nombreestadosolicitud}</option>)}
                        </select>
                        Fecha Inicio <input type={"date"} onChange={(e)=>setFechaInicio(e.target.value)}/>
                        Fecha Final <input type={"date"} onChange={(e)=>setFechaFinal(e.target.value)}/>
                    </>
                }
            />
            </main>
            <Footer/>
            </div>
    );
}
export default SolicitudSolicitante;