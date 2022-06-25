import { useEffect, useState } from "react";
import axiosPrivate from "../../../api/axiosPrivate";
import { Formik, Form } from "formik";
import Input from "../../../components/formulario/Input";
import Boton from "../../../components/formulario/Boton";

const SolicitudSolicitante = ({accionFormulario,setAccionFormulario,listarUsuarios,valoresFormulario})=>{
    const [permisos, setPermisos] = useState([]);
    const [negociaciones,setNegociaciones] = useState([]);
    const [estadoSolicitud, setEstadoSolicitud] = useState([]);
    const listarEstadoSolicitud = async ()=>{
        try {
            const resulSet = await axiosPrivate.post('/estado-solicitud/listar');
            if(resulSet.status===200){
                setEstadoSolicitud(resulSet.data);
            }else{
                alert("Status "+resulSet.status+": "+resulSet.statusText);
            }
        } catch (error) {
            return null;
        }
        
    }
    const listarNegociaciones = async ()=>{
        try {
            const resulSet = await axiosPrivate.post('/negociacion/listar-negociaciones-del-usuario',{idsolicitud : valoresFormulario.idsolicitud});
            if(resulSet.status===200){
                setNegociaciones(resulSet.data);
                console.log(resulSet.data);
            }else{
                alert("Status "+resulSet.status+": "+resulSet.statusText);
            }
        } catch (error) {
            return null;
        }
        
    }
    const mostrarDatosNegociacion = ()=>{
        if(negociaciones.length>0){
            return (<>
                <b>Fecha Inicio Propuesta : </b> {negociaciones[0].fechainiciopropuestanegociacionsolicitud}<br/>
                <b>Fecha Final Propuesta : </b> {negociaciones[0].fechafinalpropuestanegociacionsolicitud}<br/>
                <b>Comentario Solicitante :</b> {negociaciones[0].comentariosolicitantenegociacionsolicitud}<br/>
                ------------<br/>
                <b>Fecha Inicio Aceptada : </b> {negociaciones[0].fechainiciocorregidanegociacionsolicitud}<br/>
                <b>Fecha Final Aceptada : </b> {negociaciones[0].fechafinalcorregidanegociacionsolicitud}<br/>
                <b>Comentario Administrador :</b> {negociaciones[0].comentariorespuestanegociacionsolicitud}
            </>);
        }
        return null;        
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
    useEffect(()=>{
        listarNegociaciones();
        listarEstadoSolicitud();
    },[])
    return (
        <>
            <div className="accordion" id="accordionExample">
                <div className="accordion-item">
                    <h2 className="accordion-header" id="headingOne">
                    <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                        <b>Solicitud # {valoresFormulario.idsolicitud} - Respuesta</b>
                    </button>
                    </h2>
                    <div id="collapseOne" className="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                        <div className="accordion-body">
                            <div className="card" style={{"width": "100%"}}>
                                <div className="card-body">
                                    <b>Solicitante :</b>{valoresFormulario.nombresCliente}<br/>
                                    <b>Tipo Solicitud : </b>{valoresFormulario.nombretiposolicitud}
                                    <div className="card" style={{"width": "100%"}}>
                                        <div className="card-body">
                                            { mostrarDatosNegociacion() }<br/>
                                            <b>Estado : </b>{bagdeEstadoSolicitud(valoresFormulario.idestadosolicitud,valoresFormulario.nombreestadosolicitud)}
                                        </div>
                                    </div> 
                                </div>
                                <div className="card-footer">
                                    <div className="row">
                                        <div className="form-group">
                                            <div className="input-group">
                                                <Boton label={"Cerrar"} type="button" className="btn btn-danger"
                                                        onClick={()=>{
                                                            setAccionFormulario(null)
                                                        }}/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
export default SolicitudSolicitante;