import { useEffect, useState } from "react";
import axiosPrivate from "../../api/axiosPrivate";
import Footer from "../footer/Footer";
import NavBar from "../header/NavBar";
import TablePagination from '../../components/tablas/TablePagination';
import FrmSolicitud from "./formularios/FrmSolicitud";
import VistaSolicitudSolicitante from "./vistas/VistaSolicitudSolicitante";
const SolicitudSolicitante = ()=>{
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
                console.log("Error : "+resultSet.status);
            }
        } catch (error) {
            console.log(error);
        }
        
    }
    const listarSolicitudes = async (search)=>{
        try {
            const resultSet = await axiosPrivate.post('/solicitud/listar-solicitudes-usuario', {pagSiguiente : pagSiguiente, cantPorPag : cantPorPag, search, estadoSolicitudSeleccionada, fechaInicio, fechaFinal});
            if(resultSet.status===200){
                setTipoSolicitud(resultSet.data);
            }else{
                console.log("Error : "+resultSet.status);
            }
        } catch (error) {
            console.log(error);
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
    if(accionFormulario==="agregar"){
        return <FrmSolicitud 
                            accionFormulario={accionFormulario} 
                            setAccionFormulario={setAccionFormulario}
                            listarSolicitudes={listarSolicitudes}
                            valoresFormulario={valoresFormulario}/>;
    }
    if(accionFormulario==="mostrarRespuesta"){
        return <VistaSolicitudSolicitante 
                            accionFormulario={accionFormulario} 
                            setAccionFormulario={setAccionFormulario}
                            listarSolicitudes={listarSolicitudes}
                            valoresFormulario={valoresFormulario}/>;
    }

    const bagdeEstadoSolicitud = (id,nombre)=>{
        switch (id) {
            case 4:
                return <span className="badge text-bg-info text-dark">{nombre}</span>
                break;
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
            <NavBar nombreMantenedor="Mis Solicitudes" dondeEstoy="MisSolicitudes" mensajeInicial=""/>
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
                                        setAccionFormulario("mostrarRespuesta");
                                        setValoresFormulario(value);
                                    }
                                }>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-eye-fill" viewBox="0 0 16 16">
                                        <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z"/>
                                        <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z"/>
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
                        Fecha Solicitud <input type={"date"} onChange={(e)=>setFechaInicio(e.target.value)}/>
                        Fecha Respuesta <input type={"date"} onChange={(e)=>setFechaFinal(e.target.value)}/>
                    </>
                }
            />
            </main>
            <Footer/>
            </div>
    );
}
export default SolicitudSolicitante;