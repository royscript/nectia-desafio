//--------IMPORTACIONES------------
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

const cookieParser = require('cookie-parser');
//---------MODELO-------------
const Usuarios = require('./controlador/usuario');
//----------------------------

//--------MIDDLEWARE-----------
app.use(cors());//Para intercambiar recursos entre cliente y servidor, el argumento no es obligacion
app.use(express.json());//Para los JSON
app.use(bodyParser.urlencoded({ extended : true }));//para enviar los formularios al servidor
app.use(cookieParser());//Para las cookies

//-------LLAMADAS API----------

//app.use(verificarJWT);//Los que estan bajo este middleware requeriran autenticacion
app.use('/api/usuario/', Usuarios);


//------SUBIR APP--------------
app.listen(process.env.PORT_NODE,()=>{
    console.log("Servidor Node JS "+process.env.PORT_NODE);
});
