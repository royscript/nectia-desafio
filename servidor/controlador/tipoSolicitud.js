const router = require('express').Router();
const TipoSolicitud = require('../modelo/TipoSolicitud');
const RouterRespuestas = require('../utils/RouterRerspuestas');
const tipoSolicitud = new TipoSolicitud();

router.post("/listar-todas-los-tipos-solicitudes",(req, res)=>{
    RouterRespuestas(
                    async ()=> await tipoSolicitud.listarTodas(),
                    res
                    );
});
router.post("/listar",(req, res)=>{
    const { body } = req;
    const { pagSiguiente, cantPorPag, search }= body;
    RouterRespuestas(
                    async ()=> await tipoSolicitud.listarConFiltro(pagSiguiente, cantPorPag, search),
                    res
                    );
});
router.post("/buscar-solicitud-con-el-mismo-nombre",(req, res)=>{
    const { body } = req;
    const { nombretiposolicitud }= body;
    RouterRespuestas(
                    async ()=> await tipoSolicitud.buscarSolicitudConElMismoNombre(nombretiposolicitud),
                    res
                    );
});
router.put("/insertar",(req, res)=>{
    const { body } = req;
    const { nombretiposolicitud }= body;
    RouterRespuestas(
                    async ()=> await tipoSolicitud.insertar(nombretiposolicitud),
                    res
                    );
});
router.put("/editar",(req, res)=>{
    const { body } = req;
    const { nombretiposolicitud,idtiposolicitud }= body;
    RouterRespuestas(
                    async ()=> await tipoSolicitud.editar(nombretiposolicitud,idtiposolicitud ),
                    res
                    );
});
router.post("/eliminar",(req, res)=>{
    const { body } = req;
    const { id }= body;
    RouterRespuestas(
                    async ()=> await tipoSolicitud.eliminar(id),
                    res
                    );
});
module.exports = router;