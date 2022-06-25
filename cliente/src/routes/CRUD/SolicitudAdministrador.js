import { useEffect, useState } from "react";
import axiosPrivate from "../../api/axiosPrivate";
import Footer from "../footer/Footer";
import NavBar from "../header/NavBar";
import TablePagination from '../../components/tablas/TablePagination';
import FrmEvaluarSolicitud from "./formularios/FrmEvaluarSolicitud";
const SolicitudAdministrador = ({usuarioLogeado})=>{
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
            console.log(error);
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
    if(accionFormulario==="evaluar"){
        return <FrmEvaluarSolicitud 
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
            <NavBar nombreMantenedor="Administrar Solicitudes" dondeEstoy="AdministrarSolicitudes" mensajeInicial="" usuarioLogeado={usuarioLogeado}/>
            <main>
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
                                        setAccionFormulario("evaluar");
                                        
                                    }
                                }>
                                   <b>Evaluar</b> 
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
export default SolicitudAdministrador;