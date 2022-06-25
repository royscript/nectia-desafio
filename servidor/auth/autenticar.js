const jwt = require('jsonwebtoken');
const Usuarios = require('../modelo/Usuarios');
const Perfil = require('../modelo/Perfil');
const usuario = new Usuarios();
const perfil = new Perfil();
const isAuthenticated = async(req,res,next)=>{
    const token = req.headers.authorization;
    if(!token){
        console.log("Error :"+token);
        return res.sendStatus(403);
    }
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRETO ,async (err,decoded)=>{
        try {
            const { id } = decoded;
            if(typeof id === 'undefined'){
                console.log("Error :"+id);
                return res.sendStatus(403);
            }
            const respuesta = await usuario.buscarPorId(id);
            if(respuesta.length===0){
                return res.sendStatus(403);
            }else{
                req.user = respuesta[0];
                req.profile = await perfil.perfilDelUsuario(id);
                next();
            }
        } catch (error) {
            console.log("Debe iniciar sesion");
            console.log(error);
            return res.sendStatus(403);
        }
    });
}
const tokenRefresh = async(res,token)=>{
    if(!token){
        return res.sendStatus(403);
    }
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRETO ,async (err,decoded)=>{
        try {
            const { id } = decoded;
            if(typeof id === 'undefined'){
                return res.sendStatus(403);
            }
            const respuesta = await usuario.buscarPorId(id);
            const perfilDelUsuario = await perfil.perfilDelUsuario(id);
            if(respuesta.length===0){
                return res.sendStatus(403);
            }else{
                return res.status(200).json({
                    token : signToken(respuesta[0].idusuario),
                    perfil : perfilDelUsuario,
                    nombres : respuesta[0].nombreusuario+' '+respuesta[0].apellidousuario,
                    login : true
                });
            }
        } catch (error) {
            console.log(error);
            return res.sendStatus(403);
        }
    });
}
const perfilUsuario = async(res,token)=>{
    if(!token){
        return res.sendStatus(403);
    }
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRETO ,async (err,decoded)=>{
        const { id } = decoded;
        const respuesta = await perfil.perfilDelUsuario(id);
        if(respuesta.length===0){
            return res.sendStatus(403);
        }else{
            return res.status(200).json({
                perfil : respuesta
            });
        }
    });
}
const hasRole = role =>(req, res, next) => {
    if(req.user.role === role){
        return next();
    }
    return res.sendStatus(403);
}

const signToken = (id)=>{
    return jwt.sign({id},process.env.ACCESS_TOKEN_SECRETO,{
        expiresIn: 60 * 60 * 24 * 365,
    });
}

module.exports = {
    isAuthenticated,
    hasRole,
    signToken,
    tokenRefresh,
    perfilUsuario
}