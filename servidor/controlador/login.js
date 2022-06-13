const router = require('express').Router();
const Usuarios = require('../modelo/Usuarios');
const usuario = new Usuarios();
const { signToken } = require('../auth/autenticar');
router.post("/autenticar",async (req, res)=>{
    const { body } = req;
    const { nombreUsuario, contrasena }= body;
    const respuesta = await usuario.login(nombreUsuario,contrasena);
    if(respuesta.length===0){
        res.status(200).json({
            respuesta : "Usuario o contraseña incorrectos",
            login : false
        });
    }else{
        const token = signToken(respuesta[0].idUsuario);//Crearemos un token con el id del usuario que lo encriptaremos
        res.status(200).json({
            token,
            login : true
        });
    }
});
module.exports = router;