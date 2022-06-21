import { useEffect, useState } from "react";
import {axiosPrivate} from "../../../api/axios";
import { Formik, Form } from "formik";
import Input from "../../../components/formulario/Input";
import Boton from "../../../components/formulario/Boton";
import Select from "../../../components/formulario/Select";
import TextArea from "../../../components/formulario/TextArea";

const FrmSolicitud = ({accionFormulario,setAccionFormulario,listarSolicitudes,valoresFormulario})=>{
    const [tipoSolicitud, setTipoSolicitud] = useState([]);
    const listarTipoSolicitud = async ()=>{
        try {
            const resulSet = await axiosPrivate.post('/tipo-solicitud/listar-todas-los-tipos-solicitudes');
            if(resulSet.status===200){
                setTipoSolicitud(resulSet.data);
            }else{
                alert("Status "+resulSet.status+": "+resulSet.statusText);
            }
        } catch (error) {
            return null;
        }
        
    }
    useEffect(()=>{
        listarTipoSolicitud();
    },[]);
    const [respuestaConsulta, setRespuestaConsulta] = useState();
    return (
        <>
            <Formik
                    initialValues={valoresFormulario || {idsolicitud   : '', 	idtiposolicitud: '', comentariosolicitantenegociacionsolicitud : '', fechainiciopropuesta : '',fechafinalpropuesta : ''}}
                    enableReinitialize
                    validate={
                        async (values) => {
                            const errors = {}
                            if(!values.idtiposolicitud) {
                                errors.idtiposolicitud = 'Requerido'
                            }
                            if(!values.comentariosolicitantenegociacionsolicitud) {
                                errors.comentariosolicitantenegociacionsolicitud = 'Requerido'
                            } else if (values.comentariosolicitantenegociacionsolicitud.length < 5) {
                                errors.comentariosolicitantenegociacionsolicitud = 'Ingresa un comentario de almenos 5 caracteres de largo, indicando el motivo'
                            }
                            if(!values.fechainiciopropuesta) {
                                errors.fechainiciopropuesta = 'Requerido'
                            }
                            if(!values.fechafinalpropuesta) {
                                errors.fechafinalpropuesta = 'Requerido'
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
                        if(accionFormulario==="agregar"){
                            axiosPrivate.put('/solicitud/insertar', { idtiposolicitud : values.idtiposolicitud, comentariosolicitantenegociacionsolicitud : values.comentariosolicitantenegociacionsolicitud, fechainiciopropuesta : values.fechainiciopropuesta, fechafinalpropuesta : values.fechafinalpropuesta })
                                .then(res => {
                                    if(res.status===200){
                                        resetForm({values: ''});
                                        listarSolicitudes();
                                        setAccionFormulario(null);
                                        setRespuestaConsulta(
                                            <div className="alert alert-success" role="alert">
                                                Datos Ingresados Correctamente
                                                <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close" onClick={()=>{
                                                                    setAccionFormulario(null)
                                                                    console.log("Cerrar");
                                                                }}></button>
                                            </div>);
                                    }
                            }, error =>{
                                if (error.response.status === 401) {
                                    setRespuestaConsulta(
                                        <div className="alert alert-danger" role="alert">
                                            Error : {error}
                                            <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close" onClick={()=>{
                                                                    setAccionFormulario(null)
                                                                    console.log("Cerrar");
                                                                }}></button>
                                        </div>);
                                }
                            }) 
                        }else{
                            axiosPrivate.put('/solicitud/editar', { idsolicitud   : values.idsolicitud  , idtiposolicitud : values.idtiposolicitud, comentariosolicitantenegociacionsolicitud : values.comentariosolicitantenegociacionsolicitud, fechainiciopropuesta : values.fechainiciopropuesta, fechafinalpropuesta : values.fechafinalpropuesta })
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
                        }
                                        
                    }}
                >
                <Form>
                    <div className="accordion" id="accordionExample">
                        <div className="accordion-item">
                            <h2 className="accordion-header" id="headingOne">
                            <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                Formulario Solicitud
                            </button>
                            </h2>
                            <div id="collapseOne" className="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                                <div className="accordion-body">
                                    <div className="card" style={{"width": "100%"}}>
                                        <div className="card-body">
                                            <Select name="idtiposolicitud" label="Tipo Solicitud">
                                                <option>Seleccione</option>
                                                {tipoSolicitud.map((value,key)=><option key={key+'-tipo-solicitud'} value={value.idtiposolicitud}>{value.nombretiposolicitud}</option>)}
                                            </Select>
                                            <TextArea  name="comentariosolicitantenegociacionsolicitud" label="Comentario : (Ingrese el motivo por el cual realiza la solicitud)"/>
                                            <Input type="date" name="fechainiciopropuesta" label="Fecha Inicio"/>
                                            <Input type="date" name="fechafinalpropuesta" label="Fecha Inicio"/>
                                        </div>
                                        <div className="card-footer">
                                            <div className="row">
                                                <div className="form-group">
                                                    <div className="input-group">
                                                        <Boton  label={accionFormulario==="agregar"?"Guardar":"Editar"} 
                                                                type={"Submit"} 
                                                                className={accionFormulario==="agregar"?"btn btn-success":"btn btn-warning"}/>
                                                        <Boton label={"Cancelar"} type="button" className="btn btn-danger"
                                                                onClick={()=>{
                                                                    setAccionFormulario(null)
                                                                }}/>
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
export default FrmSolicitud;