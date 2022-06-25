import { useEffect, useState } from "react";
import axiosPrivate from "../../../api/axiosPrivate";
import { Formik, Form } from "formik";
import Input from "../../../components/formulario/Input";
import Boton from "../../../components/formulario/Boton";
import Select from "../../../components/formulario/Select";

const FrmUsuario = ({accionFormulario,setAccionFormulario,listarUsuarios,valoresFormulario})=>{
    const [permisos, setPermisos] = useState([]);
    const [respuestaConsulta, setRespuestaConsulta] = useState();
    const buscarUsuario = async (rutusuario)=>{
        try {
            return await axiosPrivate.post('/usuario/buscar-usuario', {rutusuario});
        } catch (error) {
            return null;
        }
        
    }
    const listarPermiso = async ()=>{
        const resultSet = await axiosPrivate.post('/permiso/listar');
        setPermisos(resultSet.data);
    }
    var Fn = {
        // Valida el rut con su cadena completa "XXXXXXXX-X"
        validaRut : function (rutCompleto) {
            if (!/^[0-9]+[-|‐]{1}[0-9kK]{1}$/.test( rutCompleto ))
                return false;
            var tmp 	= rutCompleto.split('-');
            var digv	= tmp[1]; 
            var rut 	= tmp[0];
            if ( digv == 'K' ) digv = 'k' ;
            return (Fn.dv(rut) == digv );
        },
        dv : function(T){
            var M=0,S=1;
            for(;T;T=Math.floor(T/10))
                S=(S+T%10*(9-M++%6))%11;
            return S?S-1:'k';
        }
    }
    useEffect(()=>{
        listarPermiso();
    },[])
    return (
        <>
            <Formik
                    initialValues={valoresFormulario || {idusuario : '', nombreusuario: '' , apellidousuario: '' , emailusuario: '' , rutusuario: '' , contrasenausuario: '', idperfilusuario: ''}}
                    enableReinitialize
                    validate={
                        async (values) => {
                            const errors = {}
                            if(!values.nombreusuario) {
                                errors.nombreusuario = 'Requerido'
                            } else if (values.nombreusuario.length < 5) {
                                errors.nombreusuario = 'Ingresa el Nombre de Usuario'
                            }
                            if(!values.apellidousuario) {
                                errors.apellidousuario = 'Requerido'
                            } else if (values.apellidousuario.length < 5) {
                                errors.apellidousuario = 'Ingresa los apellidos del usuario '
                            }
                            if(!values.emailusuario) {
                                errors.emailusuario = 'Requerido'
                            } else if (
                                !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(
                                    values.emailusuario
                                )
                              ) {
                                errors.emailusuario = 'E-mail inválido';
                            }
                            if(!values.rutusuario) {
                                errors.rutusuario = 'Requerido'
                            }else if(!Fn.validaRut(values.rutusuario)){
                                errors.rutusuario = 'Rut inválido'
                            } else if (values.rutusuario.length < 5) {
                                errors.rutusuario = 'Ingresa el rut del usuario'
                            } else {
                                
                                const resp = await buscarUsuario(values.rutusuario);
                                //La unica forma de saber si estamos en modificar es mediante el idusuario
                                //Si existe el idusuario es porque es modificar, en caso contrario es agregar
                                if(values.idusuario===null || values.idusuario===''){
                                    if(resp.data.length>0){
                                        errors.rutusuario = 'El rut ingresado corresponde a otro usuario';
                                    }
                                }else{
                                    const usuarioEncontrado = resp.data[0];
                                    if(resp.data.length>0){
                                        //Si el rut lo esta usando otra persona con un id diferente al del que estamos modificando
                                        if(usuarioEncontrado.rutusuario===values.rutusuario && values.idusuario!==usuarioEncontrado.idusuario){
                                            errors.rutusuario = 'El rut ingresado corresponde a otro usuario';
                                        }
                                    }
                                }
                                
                            }
                            if(!values.contrasenausuario) {
                                errors.contrasenausuario = 'Requerido'
                            } else if (values.contrasenausuario.length < 5) {
                                errors.contrasenausuario = 'Ingresa la contraseña del usuario '
                            }
                            if(!values.idperfilusuario) {
                                errors.idperfilusuario = 'Requerido'
                            }
                            return errors
                        }
                    }
                    onChange = {(name, value, { props }) => {
                        props.handleFormChange(name, value); // call some method from parent 
                    }}
                    onSubmit={async (values,{resetForm,submitForm})=>{
                        if(accionFormulario==="agregar"){
                            axiosPrivate.put('/usuario/insertar', { nombreusuario: values.nombreusuario , apellidousuario: values.apellidousuario , emailusuario: values.emailusuario , rutusuario: values.rutusuario , contrasenausuario: values.contrasenausuario, idperfilusuario : values.idperfilusuario })
                                .then(res => {
                                    if(res.status===200){
                                        resetForm({values: ''});
                                        listarUsuarios();
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
                            axiosPrivate.put('/usuario/editar', { idusuario : values.idusuario, nombreusuario: values.nombreusuario , apellidousuario: values.apellidousuario , emailusuario: values.emailusuario , rutusuario: values.rutusuario , contrasenausuario: values.contrasenausuario, idperfilusuario : values.idperfilusuario })
                            .then(res => {
                                if(res.status===200){
                                    resetForm({values: ''});
                                    listarUsuarios();
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
                                            <Input name="nombreusuario" label="Nombres del Usuario" type="text"/>
                                            <Input name="apellidousuario" label="Apellidos del Usuario" type="text"/>
                                            <Input name="emailusuario" label="E-mail del Usuario" type="text"/>
                                            <Input name="rutusuario" label="Rut del Usuario : (formato ########-#, sin punto, con guión)" type="text"/>
                                            <Input name="contrasenausuario" label="Contraseña del Usuario" type="text"/>
                                            <Select name="idperfilusuario" label="Permiso del Usuario">
                                                <option value={""}>Seleccione</option>
                                                {permisos.map((value,key)=><option key={key+'-permiso-del-usuario'} value={value.idperfilusuario}>{value.nombreperfilusuario}</option>)}
                                            </Select>
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