import { useEffect, useState } from "react";
import axiosPrivate from "../../../api/axiosPrivate";
import { Formik, Form } from "formik";
import Input from "../../../components/formulario/Input";
import Boton from "../../../components/formulario/Boton";

const FrmUsuario = ({accionFormulario,setAccionFormulario,listarSolicitudes,valoresFormulario})=>{
    const buscarNombreTipoSolicitud = async (nombretiposolicitud)=>{
        try {
            return await axiosPrivate.post('/tipo-solicitud/buscar-solicitud-con-el-mismo-nombre', {nombretiposolicitud});
        } catch (error) {
            return null;
        }
        
    }
    const [respuestaConsulta, setRespuestaConsulta] = useState();
    return (
        <>
            <Formik
                    initialValues={valoresFormulario || {idtiposolicitud  : '', nombretiposolicitud: ''}}
                    enableReinitialize
                    validate={
                        async (values) => {
                            const errors = {}
                            if(!values.nombretiposolicitud) {
                                errors.nombretiposolicitud = 'Requerido'
                            } else if (values.nombretiposolicitud.length < 5) {
                                errors.nombretiposolicitud = 'Ingresa el Nombre de Usuario'
                            } else {
                                
                                const resp = await buscarNombreTipoSolicitud(values.nombretiposolicitud.trim());
                                //La unica forma de saber si estamos en modificar es mediante el id
                                //Si existe el id es porque es modificar, en caso contrario es agregar
                                if(values.idtiposolicitud===null || values.idtiposolicitud===''){
                                    if(resp.data.length>0){
                                        errors.nombretiposolicitud = 'El nombre del tipo de solicitud ya esta registrado';
                                    }
                                }else{
                                    const nombreTipoSolicitudEncontrada = resp.data[0];
                                    if(resp.data.length>0){
                                        //Si el nombre lo esta usando otra solicitud con un id diferente al del que estamos modificando
                                        if(nombreTipoSolicitudEncontrada.nombretiposolicitud===values.nombretiposolicitud && values.idtiposolicitud!==nombreTipoSolicitudEncontrada.idtiposolicitud){
                                            errors.rutusuario = 'El nombre del tipo de solicitud ya esta registrado';
                                        }
                                    }
                                }
                                
                            }
                            return errors
                        }
                    }
                    onChange = {(name, value, { props }) => {
                        props.handleFormChange(name, value); // call some method from parent 
                    }}
                    onSubmit={async (values,{resetForm,submitForm})=>{
                        if(accionFormulario==="agregar"){
                            axiosPrivate.put('/tipo-solicitud/insertar', { nombretiposolicitud : values.nombretiposolicitud })
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
                            axiosPrivate.put('/tipo-solicitud/editar', { idtiposolicitud  : values.idtiposolicitud , nombretiposolicitud : values.nombretiposolicitud })
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
                                Formulario
                            </button>
                            </h2>
                            <div id="collapseOne" className="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                                <div className="accordion-body">
                                    <div className="card" style={{"width": "100%"}}>
                                        <div className="card-body">
                                            <Input name="nombretiposolicitud" label="Nombre del Tipo de Solicitud" type="text"/>
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
export default FrmUsuario;