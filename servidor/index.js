//--------IMPORTACIONES------------
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const { isAuthenticated,hasRole } = require('./auth/autenticar');
const cookieParser = require('cookie-parser');
//---------CONTROLADOR-------------
const Usuarios = require('./controlador/usuario');
const Login = require('./controlador/login')
const Permiso = require('./controlador/perfil');
const TipoSolicitud = require('./controlador/tipoSolicitud');
const Solicitud = require('./controlador/solicitud');
const EstadoSolicitud = require('./controlador/estadoSolicitud');
//----------------------------

//--------MIDDLEWARE-----------
app.use(cors());//Para intercambiar recursos entre cliente y servidor, el argumento no es obligacion
app.use(express.json());//Para los JSON
app.use(bodyParser.urlencoded({ extended : true }));//para enviar los formularios al servidor
app.use(cookieParser());//Para las cookies

//-------LLAMADAS API----------
app.use('/api/login/', Login);
app.use(isAuthenticated);//Los que estan bajo este middleware requeriran autenticacion
app.use('/api/usuario/', Usuarios);
app.use('/api/permiso/', Permiso);
app.use('/api/tipo-solicitud/', TipoSolicitud);
app.use('/api/solicitud/', Solicitud);
app.use('/api/estado-solicitud/', EstadoSolicitud);


//------SUBIR APP--------------
app.listen(process.env.PORT_NODE,()=>{
    console.log("Servidor Node JS "+process.env.PORT_NODE);
});
