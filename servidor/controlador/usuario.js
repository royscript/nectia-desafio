const router = require('express').Router();
const Usuarios = require('../modelo/Usuarios');
const RouterRespuestas = require('../utils/RouterRerspuestas');
const usuario = new Usuarios();

router.get("/listar",(req, res)=>{
    RouterRespuestas(
                    async ()=> await usuario.listar(),
                    res
                    );
});
router.post("/listar",(req, res)=>{
    const { body } = req;
    const { pagSiguiente, cantPorPag, search }= body;
    RouterRespuestas(
                    async ()=> await usuario.listarConFiltro(pagSiguiente, cantPorPag, search),
                    res
                    );
});
router.post("/buscar-usuario",(req, res)=>{
    const { body } = req;
    const { rutUsuario }= body;
    RouterRespuestas(
                    async ()=> await usuario.buscarPorRut(rutUsuario),
                    res
                    );
});
router.put("/insertar",(req, res)=>{
    const { body } = req;
    const { nombreUsuario,apellidoUsuario,emailUsuario,rutUsuario,contrasenaUsuario,direccionUsuario,telefonoUsuario,Permiso_idPermiso }= body;
    RouterRespuestas(
                    async ()=> await usuario.insertar(nombreUsuario,apellidoUsuario,emailUsuario,rutUsuario,contrasenaUsuario,direccionUsuario,telefonoUsuario,Permiso_idPermiso),
                    res
                    );
});
router.put("/editar",(req, res)=>{
    const { body } = req;
    const { nombreUsuario,apellidoUsuario,emailUsuario,rutUsuario,contrasenaUsuario,direccionUsuario,telefonoUsuario,Permiso_idPermiso,idUsuario }= body;
    RouterRespuestas(
                    async ()=> await usuario.editar(nombreUsuario,apellidoUsuario,emailUsuario,rutUsuario,contrasenaUsuario,direccionUsuario,telefonoUsuario,Permiso_idPermiso,idUsuario),
                    res
                    );
});
router.post("/eliminar",(req, res)=>{
    const { body } = req;
    const { id }= body;
    RouterRespuestas(
                    async ()=> await usuario.eliminar(id),
                    res
                    );
});
module.exports = router;