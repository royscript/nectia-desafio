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
    const { rutusuario }= body;
    RouterRespuestas(
                    async ()=> await usuario.buscarPorRut(rutusuario),
                    res
                    );
});
router.put("/insertar",(req, res)=>{
    const { body } = req;
    const { nombreusuario,apellidousuario,emailusuario,rutusuario,contrasenausuario,idperfilusuario }= body;
    RouterRespuestas(
                    async ()=> await usuario.insertar(nombreusuario,apellidousuario,emailusuario,rutusuario,contrasenausuario,idperfilusuario),
                    res
                    );
});
router.put("/editar",(req, res)=>{
    const { body } = req;
    const { nombreusuario,apellidousuario,emailusuario,rutusuario,contrasenausuario,idusuario,idperfilusuario }= body;
    RouterRespuestas(
                    async ()=> await usuario.editar(nombreusuario,apellidousuario,emailusuario,rutusuario,contrasenausuario,idusuario,idperfilusuario),
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