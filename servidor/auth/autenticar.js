const jwt = require('jsonwebtoken');
const Usuarios = require('../modelo/Usuarios');
const usuario = new Usuarios();
const isAuthenticated = async(req,res,next)=>{
    const token = req.headers.authorization;
    if(!token){
        return res.sendStatus(403);
    }
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRETO ,async (err,decoded)=>{
        const { id } = decoded;
        const respuesta = await usuario.buscarPorId(id);
        if(respuesta.length===0){
            return res.sendStatus(403);
        }else{
            req.user = respuesta[0];
            next();
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
    signToken
}