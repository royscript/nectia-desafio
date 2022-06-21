import { useEffect, useState } from "react";
import {axiosPrivate} from "../../../api/axios";
import { Formik, Form } from "formik";
import Input from "../../../components/formulario/Input";
import Boton from "../../../components/formulario/Boton";
import TextArea from "../../../components/formulario/TextArea";
import Select from "../../../components/formulario/Select";

const FrmEvaluarSolicitud = ({accionFormulario,setAccionFormulario,listarSolicitudes,valoresFormulario})=>{
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
                <b>Comentario Solicitante :</b> {negociaciones[0].comentariosolicitantenegociacionsolicitud}
            </>);
        }
        return null;        
    }
    useEffect(()=>{
        listarNegociaciones();
        listarEstadoSolicitud();
    },[])
    const [respuestaConsulta, setRespuestaConsulta] = useState();
    return (
        <>
            <Formik
                    initialValues={valoresFormulario || {idsolicitud : valoresFormulario.idsolicitud, idnegociacionsolicitud : '',idestadosolicitud : '', comentariorespuestanegociacionsolicitud : '', fechafinalcorregidanegociacionsolicitud : '', fechainiciocorregidanegociacionsolicitud : ''}}
                    enableReinitialize
                    validate={
                        async (values) => {
                            const errors = {}
                            
                            if(!values.comentariorespuestanegociacionsolicitud) {
                                errors.comentariorespuestanegociacionsolicitud = 'Requerido'
                            } else if (values.comentariorespuestanegociacionsolicitud.length < 5) {
                                errors.comentariorespuestanegociacionsolicitud = 'Ingresa un comentario de almenos 5 caracteres de largo, indicando el motivo'
                            }
                            if(!values.fechainiciocorregidanegociacionsolicitud) {
                                errors.fechainiciocorregidanegociacionsolicitud = 'Requerido'
                            }
                            if(!values.fechafinalcorregidanegociacionsolicitud) {
                                errors.fechafinalcorregidanegociacionsolicitud = 'Requerido'
                            }
                            if(!values.idestadosolicitud){
                                errors.idestadosolicitud = 'Requerido'
                            }
                            /*if(!values.nombretiposolicitud) {
                                errors.nombretiposolicitud = 'Requerido'
                            }*/
                            return errors
                        }
                    }
                    onChange = {(name, value, { props }) => {
                        props.handleFormChange(name, value); // call some method from parent 
                    }}
                    onSubmit={async (values,{resetForm,submitForm})=>{
                        
                            axiosPrivate.put('/solicitud/evaluar', { idsolicitud : valoresFormulario.idsolicitud, idnegociacionsolicitud : negociaciones[0].idnegociacionsolicitud,idestadosolicitud : values.idestadosolicitud, comentariorespuestanegociacionsolicitud : values.comentariorespuestanegociacionsolicitud, fechafinalcorregidanegociacionsolicitud : values.fechafinalcorregidanegociacionsolicitud, fechainiciocorregidanegociacionsolicitud : values.fechainiciocorregidanegociacionsolicitud })
                            .then(res => {
                                if(res.status===200){
                                    resetForm({values: ''});
                                    listarSolicitudes();
                                    setAccionFormulario(null);
                                    setRespuestaConsulta(
                                        <div className="alert alert-warning" role="alert">
                                            Datos <b>modificados</b> Correctamente
                                            <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close" onClick={()=>{
                                                                    setAccionFormulario(null);
                                                                }}></button>
                                        </div>);
                                }
                        }, error =>{
                            if (error.response.status === 401) {
                                setRespuestaConsulta(
                                    <div className="alert alert-danger" role="alert">
                                        Error : {error}
                                    </div>);
                            }
                        }) 
                        
                                        
                    }}
                >
                <Form>
                    <div className="accordion" id="accordionExample">
                        <div className="accordion-item">
                            <h2 className="accordion-header" id="headingOne">
                            <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                Formulario Evaluar Solicitud
                            </button>
                            </h2>
                            <div id="collapseOne" className="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                                <div className="accordion-body">
                                    <div className="card" style={{"width": "100%"}}>
                                        <div className="card-body">
                                            <Input type={"Text"} name="nombreSolicitante" label="Nombre Solicitante" value={valoresFormulario.nombresCliente} readOnly="readOnly"/>
                                            <Input type={"Text"} name="nombreTipoSolicitud" label="Tipo de Solicitud" value={valoresFormulario.nombretiposolicitud} readOnly="readOnly"/> 
                                            <div className="card" style={{"width": "100%"}}>
                                                <div className="card-body">
                                                    { mostrarDatosNegociacion() }
                                                    <Input type="date" name="fechainiciocorregidanegociacionsolicitud" label="Fecha Inicio Permiso"/>
                                                    <Input type="date" name="fechafinalcorregidanegociacionsolicitud" label="Fecha Inicio Permiso"/>
                                                    <TextArea  name="comentariorespuestanegociacionsolicitud" label="Respuesta : "/>
                                                    <Select name="idestadosolicitud" label="Estado Solicitud">
                                                        <option>Seleccione</option>
                                                        {estadoSolicitud.map((value,key)=><option key={key+'-estado-solicitud'} value={value.idestadosolicitud}>{value.nombreestadosolicitud}</option>)}
                                                    </Select>
                                                </div>
                                            </div>  
                                        </div>
                                        <div className="card-footer">
                                            <div className="row">
                                                <div className="form-group">
                                                    <div className="input-group">
                                                        <Boton  label={"Guardar Respuesta"} 
                                                                type={"Submit"} 
                                                                className={"btn btn-warning"}/>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row">
                                                {respuestaConsulta}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Form>
            </Formik>
        </>
    );
}
export default FrmEvaluarSolicitud;