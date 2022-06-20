const router = require('express').Router();
const Solicitud = require('../modelo/Solicitud');
const RouterRespuestas = require('../utils/RouterRerspuestas');
const solicitud = new Solicitud();

router.post("/listar",(req, res)=>{
    const { body } = req;
    const { pagSiguiente, cantPorPag, search }= body;
    RouterRespuestas(
                    async ()=> await solicitud.listarConFiltro(pagSiguiente, cantPorPag, search),
                    res
                    );
});
router.post("/listar-solicitudes-usuario",(req, res)=>{
    const { user, body } = req;
    const { pagSiguiente, cantPorPag, search, estadoSolicitudSeleccionada, fechaInicio, fechaFinal }= body;
    RouterRespuestas(
                    async ()=> await solicitud.buscarSolicitudesDelUsuario(pagSiguiente, cantPorPag, search,user.idusuario, estadoSolicitudSeleccionada, fechaInicio, fechaFinal),
                    res
                    );
});
router.post("/buscar-solicitud-usuario",(req, res)=>{
    const { body } = req;
    const { idsolicitud }= body;
    RouterRespuestas(
                    async ()=> await solicitud.buscarSolicitudDelUsuario(idsolicitud),
                    res
                    );
});
router.put("/insertar",(req, res)=>{
    const { body } = req;
    const { idtiposolicitud,idusuario,usu_idusuario,idestadosolicitud,fechasolicitud,fecharespuesta,fechainiciosolicitud,fechafinalsolicitud }= body;
    RouterRespuestas(
                    async ()=> await solicitud.insertar(idtiposolicitud,idusuario,usu_idusuario,idestadosolicitud,fechasolicitud,fecharespuesta,fechainiciosolicitud,fechafinalsolicitud),
                    res
                    );
});
router.put("/editar",(req, res)=>{
    const { body } = req;
    const { idtiposolicitud,idusuario,usu_idusuario,idestadosolicitud,fechasolicitud,fecharespuesta,fechainiciosolicitud,fechafinalsolicitud,idsolicitud }= body;
    RouterRespuestas(
                    async ()=> await solicitud.editar(idtiposolicitud,idusuario,usu_idusuario,idestadosolicitud,fechasolicitud,fecharespuesta,fechainiciosolicitud,fechafinalsolicitud,idsolicitud),
                    res
                    );
});
router.post("/eliminar",(req, res)=>{
    const { body } = req;
    const { id }= body;
    RouterRespuestas(
                    async ()=> await solicitud.eliminar(id),
                    res
                    );
});
module.exports = router;