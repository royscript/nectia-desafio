const router = require('express').Router();
const Usuarios = require('../modelo/Usuarios');
const Perfil = require('../modelo/Perfil');
const usuario = new Usuarios();
const perfil = new Perfil();
const { signToken, tokenRefresh, perfilUsuario } = require('../auth/autenticar');
router.post("/autenticar",async (req, res)=>{
    const { body } = req;
    const { nombreusuario, contrasena }= body;
    const respuesta = await usuario.login(nombreusuario,contrasena);
    if(respuesta.length===0){
        res.status(200).json({
            respuesta : "Usuario o contraseña incorrectos",
            login : false
        });
    }else{
        const token = signToken(respuesta[0].idusuario);//Crearemos un token con el id del usuario que lo encriptaremos
        const perfilDelUsuario = await perfil.perfilDelUsuario(respuesta[0].idusuario);
        res.status(200).json({
            token,
            nombres : respuesta[0].nombreusuario+' '+respuesta[0].apellidousuario,
            perfil : perfilDelUsuario,
            login : true
        });
    }
});
router.post("/refrescar-token",async (req, res)=>{
    const { body } = req;
    const { token }= body;
    return await tokenRefresh(res,token);
});
router.post("/perfil-usuario",async (req, res)=>{
    const { body } = req;
    const { token }= body;
    return await perfilUsuario(res,token);
});
module.exports = router;